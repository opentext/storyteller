// Copyright (c) 2017 Open Text. All Rights Reserved.
'use strict';

exports.empower_item = function empower_item(input, options) {
    options = options || {};

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
    var resources = JSON.parse(streams.stream('wd:/resources.json').read());

    var input_options = {
        output: stl,
        maps: {
            uri: (uri) => uri.replace(/^(cas:)/, 'wd:/cas/')
        },
        indent: options.indent,
        page: !!options.raster,
        resources: resources
    };
    // convert empower JSON to STL
    empower.emp2stl(json, input_options);

    // log name and resulting STL
    console.log(input);
    console.log(stl.read());

    if (options.roundtrip) {
        var json2 = streams.stream(get_uri('output', 'json', !options.dump));
        var output_options = {
            output: json2,
            maps: {
                uri: (uri) => uri.replace(/^(wd:\/cas\/)/, 'cas:')
            },
            indent: options.indent
                ? '  '
                : '',
            permissive: !!options.raster,
            resources: resources
        };
        empower.stl2emp(stl, output_options);
        //console.log(json2.read());

        var stl2 = streams.stream(get_uri('output', 'xml', true));
        // convert generated empower JSON back to STL
        input_options.output = stl2;
        empower.emp2stl(json2, input_options);
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
