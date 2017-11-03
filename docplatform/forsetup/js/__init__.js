// Copyright (c) 2016 Open Text. All Rights Reserved.
"use strict";

var module_cache = {};
var repo = __bindings.repository;
var func = __bindings.functions;

var global_keys = {
    filename: '__filename',
    dirname: '__dirname',
    bindings: '__bindings'
};

// Core modules are always preferentially loaded if their identifier is passed to require().
// For instance, require('layout') will always return the built-in 'layout' module, even if there
// is a file by that name
var settings = JSON.parse(repo.load(__filename.replace('.js', '.json'), false));

var jslint = null;
var suppressions = null;

function dirname(path) {
    return path.match( /.*\// );
}

function basename(path) {
     return path.replace( /.*\//, "" );
}

function normalize_uri(uri) {
    return repo.norm( uri )
}

// The resolve() function returns the exact filename that will be loaded when require() is called
function resolve(uri, parent) {
    function replace_prefix(path, from, to) {
        if (path.startsWith(from)) {
            path = to + path.substr(from.length);
        }
        return path;
    }

    function append_suffix(uri, suffixes) {
        var STREAM = 3;
        var stats = null;
        var new_uri;
        if (suffixes.some(function (suffix) {
            stats = repo.stat(uri + suffix);
            return (stats && stats.type === STREAM);
        })) {
            return stats.uri;
        }
        throw new Error('Invalid module path: ' + uri);
    }

    function check_uri(uri) {
        if (!uri)
            throw new Error( 'Undefined or empty uris are not allowed' );
        //if (uri.startsWith('..'))
        //    throw new Error( 'Relative uris outside working tree are not allowed (uri: "' + uri + '")');
        if (uri.match(/\\/))
            throw new Error( 'Backslash separator not supported, use slash on all platforms' );
    }

    var orig_uri = uri;
    try {
        // core modules get special treatment
        if (settings.modules.core[uri] !== undefined) {
            uri = settings.modules.core[uri];
        }

        // check the input validity
        check_uri(uri);

        // combine with current path prefix
        uri = replace_prefix(uri, './', dirname(parent));

        // combine with current path prefix
        uri = replace_prefix(uri, '../', dirname(parent) + '../');

        // append suffix and resolve paths relative to parent module
        uri = append_suffix(uri, settings.modules.suffixes);

        // remove duplicate slashes, dots and interpret double dots
        uri = normalize_uri(uri);
    } catch(e) {
        throw new Error('Resolve of the path "' + orig_uri + '" failed.\n' + e.stack );
    }
    return uri;
}

function report_jslint(uri, warnings) {
    var result = '';
    warnings.forEach(function (w) {
        result += '  ' + uri + ':' + (+w.line + 1) + ':' + (+w.column + 1) + ' ' + w.name + ': ' + w.message + '\n';
    });
    return result;
}

function handle_jslint(uri, src) {
    if (jslint && exports.console) {
        if (!uri.match(suppressions)) {
            var report = jslint(src, settings.jslint.options, ['__bindings']);
            if (report.warnings.length) {
                exports.console.warn(report_jslint(basename(uri), report.warnings));
            }
        }
    }
}

// The require() function provides a way to load a module
function require(id, parent) {
    parent = parent || __filename;

    function dir_prefix( uri ) {
        var split = uri.match(/.*\//);
        return split ? split[0] : '';
    }

    function ends_with(str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }

    function copy_attrs(src, dst) {
        Object.keys(src).forEach(function (attr) {
            dst[attr] = src[attr];
        });
    }

    function prepare_globals(id, uri) {
        var globals = {};
        if (settings.modules.core[id] !== undefined) {
            // prefetched core modules need access to require and console before
            // they get propagated to global environment
            copy_attrs(exports, globals);
            // core modules get access to platform bindings
            globals[global_keys.bindings] = __bindings;
        }
        // 'bind' the module id
        globals.require = function (id) {
            return require(id, uri);
        };
        globals.require.cache = module_cache;
        globals.require.resolve = function (id) {
            return resolve(id, uri);
        };

        globals.module = new_module;
        globals.exports = new_module.exports;
        globals[global_keys.filename] = uri;
        globals[global_keys.dirname] = dir_prefix( uri );
        return globals;
    }

    // 1) resolve given id to file uri
    var uri = resolve(id, parent);

    // 2) use resolved uri as a key to lookup the module in the cache
    var new_module = module_cache[uri];

    if (new_module === undefined) {
        // 3) load module source code
        var src = repo.load(uri, false);

        // 4) register half-finalized module to prevent infinite loop in case of cyclic dependencies
        new_module = {id: uri, filename: uri, loaded: false, exports: {}};
        module_cache[uri] = new_module;

        if (ends_with(uri, '.json')) {
            // 5a) parse JSON file and inject it to the module's exports
            new_module.exports = JSON.parse(src);
        } else {
            // 5b) evaluate the source code in prepared 'global' environment
            handle_jslint(uri, src);
            func.eval(src, uri, prepare_globals(id, uri));
        }
        new_module.loaded = true;
    }
    // X) return module's exports back to caller
    return new_module.exports;
}

if (settings.jslint.enabled) {
    jslint = require('jslint');
    var stats;
    var suppress = [];
    settings.jslint.suppress.forEach(function (p) {
        stats = repo.stat(p);
        if (!stats)
            throw new Error('Invalid suppression: ' + p);
        suppress.push(normalize_uri(stats.uri)+'.*');
    });
    suppressions = new RegExp(suppress.join('|'));
}

// require implementation is similar to one from node.js
// (it is simplified a lot - no directory imports, no json imports, etc.)
exports.require = function (id) {
    return require(id, settings.modules.basepath);
};

// require's cache is public - it allows clients to reload a particular module
exports.require.cache = module_cache;

// resolve is also public - clients can find out where the module resides without actually loading it
exports.require.resolve = function( uri, parent ) {
    parent = parent || settings.modules.basepath;
    return resolve( uri, parent );
};

// global variables are preserved here
//exports.global = {};

// Node.js like Buffer
exports.Buffer = require('buffer').Buffer;

// we fake node.js process (this allows us to use console.js from node.js without any changes)
exports.process = require('process');

// we initialize console right away - using the node.js implementation
exports.console = require('console');
