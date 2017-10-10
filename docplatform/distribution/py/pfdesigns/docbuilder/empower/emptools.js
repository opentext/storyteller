// Copyright (c) 2017 Open Text. All Rights Reserved.
'use strict';

exports.empower_item = function empower_item(input, options) {
    options = options || {};

    var empower = require('empower');
    var streams = require('streams');
    var services = require('services');
    var item = require('layout').item();
    // initialize src and dst streams
    var json = streams.stream('wd:/input/'+input+'.json');
    var stl = streams.stream(options.dump ? 'wd:/output/'+input+'.xml' : 'local:');
    var indent = options.dump ? '  ' : false;
    var opts = {
        uris: function(uri) {
            // temporarily replace CAS URI with a local URI 
            return uri.replace(/cas:[a-zA-Z0-9+\/_=]+/, 'wd:/opentext.png')
        },
        indent: indent,
        page: !!options.raster
    };
    // convert empower JSON to STL
    empower.emp2stl(json, stl, opts);
    // log name and resulting STL
    console.log(input);
    console.log(stl.read());
    if (options.raster) {
        // raster STL to a raster file
        var st = services.st(stl);
        var options = {
            selector: options.raster, // e.g. '/item[1]' for the page, or '/item[1]/item[1]' for text
            driver: {type: 'png', dpi: 96, pagemode: 'auto', compression: 6, background: 'white'},
            output: 'wd:/output/'+input+'.png'
        };
        st(options);
    }

    if (options.reverse) {
        var json2 = streams.stream(options.dump ? 'wd:/output/'+input+'.json' : 'local:');
        empower.stl2emp(stl, json2, {indent: indent});
        console.log(json2.read());
    }
    item.Uri = stl.uri;
};
