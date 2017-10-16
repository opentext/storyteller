// Copyright (c) 2017 Open Text. All Rights Reserved.
'use strict';

function pretty_indenter(tag, tags, start) {
    if (start) {
        if (tag === 'stl:span' && tags[tags.length - 1] === 'stl:span') {
            return '';
        }
    } else {
        if (tag === 'stl:span') {
            return '';
        }
    }
    return '  ';
}

function correct_indenter(tag, tags, start) {
    function is_flat(t) {
        return t === 'stl:span' || t === 'stl:p';
    }

    if (start) {
        if (tag === 'stl:span' || !tags.length || is_flat(tags[tags.length - 1])) {
            return '';
        }
    } else {
        if (is_flat(tag)) {
            return '';
        }
    }
    return '  ';
}

exports.empower_item = function empower_item(input, options) {
    options = options || {};
    options.dump = true;
    options.indent = correct_indenter; //pretty_indenter;

    function get_uri(dir, extension, blob) {
        return blob
            ? 'local:'
            : 'wd:/' + dir + '/' + input + '.' + extension;
    }

    var empower = require('empower');
    var streams = require('streams');
    var services = require('services');
    var item = require('layout').item();
    // initialize src and dst streams
    var json = streams.stream(get_uri('input', 'json'));
    var stl = streams.stream(get_uri('output', 'xml', !options.dump));

    var input_options = {
        uris: (uri) => uri.replace(/^(cas:)/, 'wd:/cas/'),
        indent: options.indent,
        page: !!options.raster
    };
    // convert empower JSON to STL
    empower.emp2stl(json, stl, input_options);

    // log name and resulting STL
    console.log(input);
    console.log(stl.read());

    if (options.reverse) {
        var json2 = streams.stream(get_uri('output', 'json', !options.dump));
        var output_options = {
            uris: (uri) => uri.replace(/^(wd:\/cas\/)/, 'cas:'),
            indent: options.indent
                ? '  '
                : ''
        };
        empower.stl2emp(stl, json2, output_options);
        //console.log(json2.read());

        var stl2 = streams.stream(get_uri('output', 'xml', true));
        // convert generated empower JSON back to STL
        empower.emp2stl(json2, stl2, input_options);
        console.log(stl2.read());
        stl = stl2;
    }

    if (options.raster) {
        // raster STL to a raster file
        var st = services.st(stl);
        var st_options = {
            selector: options.raster, // e.g. '/item[1]' for the page, or '/item[1]/item[1]' for text
            driver: {type: 'png', dpi: 96, pagemode: 'auto', compression: 6, background: 'white'},
            output: get_uri('output', 'png')
        };
        st(st_options);
    }

    item.Uri = stl.uri;
};
