'use strict';

exports.empower_item = function empower_item(input, options) {
    options = options || {};

    var empower = require('wd:/empower');
    var streams = require('streams');
    var services = require('services');
    var item = require('layout').item();
    // initialize src and dst streams
    var json = streams.stream('wd:/input/'+input+'.json');
    var stl = streams.stream(options.dump ? 'wd:/output/'+input+'.xml' : 'local:');
    // convert empower JSON to STL
    empower.emp2stl(json, stl, {indent: options.dump ? '  ' : false, page: !!options.raster});
    // this is just a hack - replace CAS URI with a local URI 
    stl.write(stl.read().replace(/cas:[a-zA-Z0-9+\/_=]+/g, 'wd:/opentext.png'));
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
    item.Uri = stl.uri;
};
