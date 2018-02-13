// Copyright (c) 2017 Open Text. All Rights Reserved.

'use strict';

var util = require('util');

const namespaces = {
    stl: "http://developer.opentext.com/schemas/storyteller/layout",
    xp: "http://developer.opentext.com/schemas/storyteller/xmlpreprocessor",
    scd: "http://developer.opentext.com/schemas/storyteller/chart/definition",
    ddi: "http://developer.opentext.com/schemas/storyteller/layout/ddi/v1"
};

function xml_escaper(pattern) {
    function encoder(c) {
        switch (c) {
        case '<':
            return '&lt;';
        case '>':
            return '&gt;';
        case '&':
            return '&amp;';
        case '"':
            return '&quot;';
        default:
            return fallback(c);
        }
    }
    return function (value) {
        return value.replace(pattern, encoder);
    };
}

const attr_escape = xml_escaper(/[<>&"]/g);
const text_escape = xml_escaper(/[<>&]/g);

function namespace_stack() {
    var aliases = [];
    var uris = [];

    function push(attrs) {
        Object.keys(attrs).forEach(function (key) {
            if (key === 'xmlns' || key.startsWith('xmlns:')) {
                // prepend uri and alias
                aliases.unshift(key.substring(6));
                uris.unshift(attrs[key]);
            }
        });
    }

    function pop(attrs) {
        Object.keys(attrs).reverse().forEach(function (key) {
            if (key === 'xmlns' || key.startsWith('xmlns:')) {
                if (key.substring(6) !== aliases[0] || attrs[key] !== uris[0]) {
                    throw new Error("Inconsistent namespaces");
                }
                aliases.shift();
                uris.shift();
            }
        });
    }

    function lookup(alias) {
        var i = aliases.indexOf(alias);
        return (i === -1)
            ? null
            : uris[i];
    }

    function current() {
        var result = {};
        aliases.forEach(function (alias, index) {
            result[alias] = uris[index];
        });
        return result;
    }

    return {
        push: push,
        pop: pop,
        lookup: lookup,
        current: current
    };
}

function element_stack(nsmap, next) {
    var elements = [];

    function current() {
        return elements[elements.length - 1];
    }
    function start(el) {
        elements.push(el);
        nsmap.push(el.attributes);
        next.start(el.name, el.attributes);
    }
    function end() {
        var el = current();
        next.end(el.name, el.attributes);
        nsmap.pop(el.attributes);
        elements.pop();
    }
    function text(data) {
        next.text(data);
    }
    function finalize() {
        if (elements.length) {
            throw new Error("Remaining elements");
        }
        next.finalize();
    }

    return {
        start: start,
        end: end,
        text: text,
        finalize: finalize,
        current: current
    };
}

function is_element(tag, nsmap, expected_ns, expected_name) {
    var split = tag.split(':', 2);
    var alias = split.length === 1
        ? ''
        : split[0];
    var name = split.length === 1
        ? split[0]
        : split[1];
    if (name === expected_name) {
        var ns = nsmap.lookup(alias);
        return (ns === expected_ns);
    }
    return false;
}

//////////////////////////////////////////////////////////////////////////////////

function ignorant() {
    function ignore_() {
        return;
    }

    return {
        start: ignore_,
        end: ignore_,
        text: ignore_,
        finalize: ignore_
    };
}

function empty_checker() {
    return {
        start: function (tag) {
            throw new Error("Element not expected:" + tag);
        },
        end: function (tag) {
            throw new Error("Element not expected:" + tag);
        },
        text: function (data) {
            if (data.trim()) {
                throw new Error("Data not expected:" + data);
            }
        },
        finalize: function () {
            return;
        }
    };
}

function text_accumulator(callback) {
    var accumulated = '';
    return {
        start: function () {
            throw new Error("Subelements not supported");
        },
        end: function () {
            throw new Error("Subelements not supported");
        },
        text: function (data) {
            accumulated += data;
        },
        finalize: function () {
            callback(accumulated);
        }
    };
}

function xml_accumulator(callback, dont_escape) {
    var accumulated = '';

    var aEscape = (data) => data;
    var tEscape = (data) => data;
    if (!dont_escape) {
        aEscape = attr_escape;
        tEscape = text_escape;
    }

    return {
        start: function (tag, attrs) {
            accumulated += '<' + tag;
            Object.keys(attrs).forEach(function (key) {
                accumulated += ' ' + key + '="' + aEscape(attrs[key]) + '"';
            });
            accumulated += '>';
        },
        end: function (tag) {
            accumulated += '</' + tag + '>';
        },
        text: function (data) {
            accumulated += tEscape(data);
        },
        finalize: function () {
            callback(accumulated);
        }
    };
}

function fork() {
    var next = Array.prototype.slice.call(arguments);
    return {
        start: (tag, attrs) => next.forEach((n) => n.start(tag, attrs)),
        end: (tag) => next.forEach((n) => n.end(tag)),
        text: (data) => next.forEach((n) => n.text(data)),
        finalize: (data) => next.forEach((n) => n.finalize()),
    };
}

///////////////////////////////////////////////////////////////////////////////////////////////

function preprocessor(nsmap, next, handlers) {
    handlers = handlers || {};

    var streams = require('streams');   
    var callback = handlers.fixture || function () {
        throw new Error("stl::fixture not supported");
    };
    var fixture = null;

    function is_fixture(tag) {
        return is_element(tag, nsmap, namespaces.xp, 'fixture');
    }

    function get_next() {
        return fixture || next;
    }

    function start(name, attrs) {
        if (is_fixture(name)) {
            var src = attrs.src;
            if (src) {
                callback(attrs, streams.stream(src));
                fixture = empty_checker();
            } else {
                fixture = xml_accumulator(function (data) {
                    callback(attrs, streams.stream().write(data));
                });
            }
        } else {
            get_next().start(name, attrs);
        }
    }
    function end(name, attrs) {
        if (is_fixture(name)) {
            fixture.finalize();
            fixture = null;
        } else {
            get_next().end(name, attrs);
        }
    }
    function text(data) {
        get_next().text(data);
    }
    function finalize() {
        if (fixture) {
            throw new Error("Unclosed fixture");
        }
        next.finalize();
    }
    return {
        start: start,
        end: end,
        text: text,
        finalize: finalize
    };
}

function stl_normalizer(nsmap, next) {
    var data = '';
    var last_start = true;
    var story_depth = 0;

    function is_story(tag) {
        return is_element(tag, nsmap, namespaces.stl, 'story');
    }
    
    function normalize_space(str, left_trim, right_trim) {
        if (str) {
            str = str.replace(/\s+/g, ' ');
            if (left_trim) {
                str = str.replace(/^\s+/, '');
            }
            if (right_trim) {
                str = str.replace(/\s+$/, '');
            }
        }
        return str;
    }

    function flush(start) {
        if (story_depth) {
            data = normalize_space(data, last_start, !start);
        }
        if (data) {
            next.text(data);
            data = '';
        }
        last_start = start;
    }

    function start(name, attrs) {
        flush(true);
        next.start(name, attrs);
        if (is_story(name)) {
            story_depth += 1;
        }
    }

    function end(name, attrs) {
        flush(false);
        next.end(name, attrs);
        if (is_story(name)) {
            story_depth -= 1;
        }
    }

    function text(txt) {
        data += txt;
    }

    function finalize() {
        if (data.trim()) {
            throw new Error("Dangling text: " + data);
        }
        next.finalize();
    }

    return {
        start: start,
        end: end,
        text: text,
        finalize: finalize
    };
}

function dispatch_stack(next) {
    var dispatchers = [next];

    function current() {
        return dispatchers[dispatchers.length - 1];
    }
    function start(tag, attrs) {
        dispatchers.push(current().start(tag, attrs) || current());
    }
    function end(tag, attrs) {
        if (dispatchers.length < 2) {
            throw new Error("Inconsistent start/end");
        }
        var curr = dispatchers.pop();
        var prev = current();
        if (curr !== prev) {
            curr.finalize();
        }
        prev.end(tag, attrs);
    }
    function text(data) {
        current().text(data);
    }
    function finalize() {
        if (dispatchers.length !== 1 || dispatchers[0] !== next) {
            throw new Error("Inconsistent dispatcher state");
        }
        next.finalize();
    }

    return {
        start: start,
        end: end,
        text: text,
        finalize: finalize
    };
}

function handler_dispatcher(nsmap, handler) {
    function split_and_check(tag) {
        var split = tag.split(':', 2);
        var alias = split.length === 1
            ? ''
            : split[0];
        var ns = nsmap.lookup(alias);
        if (ns !== namespaces.stl) {
            throw new Error("Unsupported namespace in element: " + tag);
        }
        return split[split.length - 1];
    }
    function lookup(tag) {
        var key = split_and_check(tag) + '_';
        var method = handler[key];
        if (!method) {
            throw new Error("Handler method not found for tag: " + tag);
        }
        return method;
    }
    function start(tag, attrs) {
        return lookup(tag)(true, attrs);
    }
    function end(tag, attrs) {
        return lookup(tag)(false, attrs);
    }
    function text(data) {
        handler.text(data);
    }
    function finalize() {
        handler.finalize();
    }
    return {
        start: start,
        end: end,
        text: text,
        finalize: finalize
    };
}

//////////////////////////////////////////////////////////////////////////////////////

function sax_parser(nsmap, builder, options) {
    options = options || {};
    var sax = require('sax');

    var dispatcher = dispatch_stack(handler_dispatcher(nsmap, builder));
    var preprocess = preprocessor(nsmap, dispatcher, options.handlers);
    var normalize = stl_normalizer(nsmap, preprocess);
    var elements = element_stack(nsmap, normalize);

    var parser = sax.parser(true);
    parser.onopentag = elements.start;
    parser.ontext = elements.text;
    parser.onclosetag = elements.end;
    parser.onend = elements.finalize;

    return parser;
}

//////////////////////////////////////////////////////////////////////////////////////

function make_indenter(indent, default_indent) {
    if (util.isFunction(indent)) {
        return indent;
    }
    if (indent) {
        if (util.isBoolean(indent)) {
            indent = default_indent || '  ';
        }
        if (util.isNumber(indent)) {
            indent = ' '.repeat(indent);
        }
        if (util.isString(indent)) {
            return () => indent;
        }
        throw new Error("Unsupported indent: " + indent);
    }
    return () => '';
}

function xml_writer(options, initial_tags) {
    initial_tags = initial_tags || [];
    var indenter = make_indenter(options.indent);
    var tags = initial_tags.slice();
    var no_children;
    var content = '';
    
    function format_start(tag, attrs) {
        attrs = attrs || {};
        var result = '<' + tag;
        var keys = Object.keys(attrs).filter((key) => attrs[key] !== undefined);
        if (keys.length) {
            result += ' ' + keys.map(function(key) {
                return key + '="' + attr_escape(attrs[key]) + '"'; 
            }).join(' ');
        }
        return result + '>';
    }

    function format_end(tag) {
        return '</' + tag + '>';
    }

    function start(tag, attrs) {
        var line = format_start(tag, attrs);
        var indent = indenter(tag, tags, true);
        if (indent) {
            line = '\n' + indent.repeat(tags.length) + line;
        }
        content += line;
        no_children = true;
        tags.push(tag);
    }

    function end(tag) {
        var top = tags.pop();
        if (top !== tag) {
            throw new Error("Tag mismatch (trying to close '" + tag + "' while top element is '" + top + "')");
        }
        if (options.shortener && no_children) {
            content = content.slice(0, -1) + options.shortener(tag);
            no_children = false;
        } else {
            var line = format_end(tag);
            var indent = indenter(tag, tags, false);
            if (indent) {
                line = '\n' + indent.repeat(tags.length) + line;
            }
            content += line;            
        }
    }
    
    function text(data) {
        if (!tags.length) {
            throw new Error("Cannot write text '" + data + "' outside elements");
        }
        no_children = false;
        content += text_escape(data);
    }

    function inject(markup) {
        no_children = false;
        content += markup;
    }
    
    function finalize() {
        if (tags.length != initial_tags.length)
            throw new Error("xml_writer parity mismatch");
        var result = content;
        content = '';
        return result;
    }

    return {
        start: start,
        end: end,
        text: text,
        inject: inject,
        finalize: finalize
    };
}

function css_map(normalize) {
    var categories = {};
    
    function cls(style, tag) {
        tag = tag || 'cls';
        if (normalize) {
            style = style.split(';').map(function (s) {
                return s.split(':').map(p => p.trim()).join(':');
            }).sort().join(';');
        }
        if (!style)
            return null;
        var category = categories[tag];
        if (category === undefined) {
            category = categories[tag] = [];
        }
        var i = category.indexOf(style);
        if (i === -1) {
            i = category.length;
            category.push(style);
        }
        return tag + (i + 1);
    }

    function all() {
        var result = {};
        Object.keys(categories).forEach(function (cat) {
            categories[cat].forEach(function (style, index) {
                result[cat + (index + 1)] = style;
            });
        });
        return Object.keys(result).length ? result : null;
    }

    return {
        cls: cls,
        all: all
    };
}

function stl_writer(indent, css) {
    var writer = xml_writer({indent: indent, shortener: () => '/>'}, ['stl:stl']);
    var cssmap = css ? css_map(true) : null;

    function start(tag, attrs) {
        if (attrs && attrs.style !== undefined) {
            if (cssmap) {
                var cls = cssmap.cls(attrs.style, 'stl-'+tag);
                delete attrs.style;
                if (cls !== null) {
                    attrs['class'] = cls;
                }
            } else {
                if (attrs.style.trim() === '')
                    delete attrs.style;
            }
        }
        writer.start('stl:' + tag, attrs);
    }

    function end(tag) {
        writer.end('stl:' + tag);
    }

    function text(data) {
        writer.text(data);
    }

    function finalize() {
        function stylesheet(styles) {
            var content = '';
            Object.keys(styles).forEach(function (style, index) {
                content += '\n.'+style+' {\n  ';
                content += styles[style].split(';').map(s => s.replace(':', ': ')).join(';\n  ');
                content += '\n}';
            });
            return content;
        }
        
        var content = writer.finalize();
        writer = xml_writer({indent: indent, shortener: () => '/>'});
        var attrs = {
            'xmlns:stl': exports.namespaces.stl,
            version: exports.version
        };
        writer.start('stl:stl', attrs);
        if (cssmap) {
            var styles = cssmap.all();
            if (styles) {
                var ss = stylesheet(styles);
                if (util.isStream(css)) {
                    css.write(ss);
                    writer.start('stl:style', {src: css.uri});
                    writer.end('stl:style');
                } else {
                    writer.start('stl:style');
                    writer.text(ss.replace(/\n/g, '\n    '));
                    writer.end('stl:style');
                }
            }
        }
        writer.inject(content);
        writer.end('stl:stl');
        content = writer.finalize();
        writer = null;
        return content;
    }

    return {
        start: start,
        end: end,
        text: text,
        finalize: finalize
    };
}

////////////////////////////////////////////////////////////////////////////

function css_parse(css) {
    function compileProps(rules, selector, styles) {
        var result = (styles && styles[selector]) || {};
        rules.forEach(function(rule) {
            if (rule.selectors.indexOf(selector) !== -1) {
                rule.declarations.filter((decl) => decl.type === 'declaration').forEach(function(decl) {
                    result[decl.property] = decl.value;
                });
            }
        });
        return result;
    }

    function compileStylesheet(rules, styles) {
        styles = styles || {};
        rules.forEach(function(rule) {
            rule.selectors.filter((sel) => sel.startsWith('.') && !sel.endsWith('::marker')).forEach(function(selector) {
                styles[selector] = compileProps(rules, selector, styles);
                var marker = compileProps(rules, selector+'::marker');
                if (Object.keys(marker).length)
                    styles[selector]['-stl-list-marker'] = marker;
            });
        });
        return styles;
    }

    var parse = require('css').parse;
    var rules = parse(css).stylesheet.rules.filter((rule) => rule.type === 'rule');
    var styles = compileStylesheet(rules);
    return styles;
}

function css_split(style, css) {
    css = css || {};
    if (style) {
        style.trim().split(';').forEach(function(property) {
            var parts = property.trim().split(':');
            if (parts.length === 2) {
                css[parts[0].trim()] = parts[1].trim();
            } else if (parts[0].length) {
                throw new Error("Invalid CSS property: "+parts[0]);
            }
        });
    }
    return css;
}

function css_format(css) {
    return Object.keys(css).filter(function (key) {
        var v = css[key];
        return v !== null && v !== undefined;
    }).map(function (key) {
        return key + ': ' + css[key];
    }).join('; ');
}

function css_lookup(stylesheet, attrs, basecss) {
    function clone_css(css) {
        return JSON.parse(JSON.stringify(css));
    }
    
    var css = basecss ? clone_css(basecss) : {};
    var cls = attrs['class'];
    if (cls && stylesheet) {
        var style = stylesheet['.'+cls];
        if (style) {
            Object.keys(style).forEach(function (prop) {
                css[prop] = style[prop];
            });
        }
    }
    css_split(attrs.style, css);
    return css;
}

exports.version = '0.1';
exports.namespaces = namespaces;
exports.namespace_stack = namespace_stack;
exports.handler_dispatcher = handler_dispatcher;
exports.ignorant = ignorant;
exports.empty_checker = empty_checker;
exports.text_accumulator = text_accumulator;
exports.xml_accumulator = xml_accumulator;
exports.fork = fork;
exports.parser = sax_parser;
exports.xml_escaper = xml_escaper;
exports.attr_escape = attr_escape;
exports.text_escape = text_escape;

exports.make_indenter = make_indenter;
exports.xml_writer = xml_writer;
exports.stl_writer = stl_writer;
exports.css_parse = css_parse;
exports.css_lookup = css_lookup;
exports.css_split = css_split;
exports.css_format = css_format;
