'use strict';

exports.convert = function convert(input, options) {
    options = options || {};

    var emp2stl = require('wd:/emp2stl');
    var streams = require('streams');
    var services = require('services');
    // load empower JSON from file to string
    var json = streams.stream('wd:/input/'+input+'.json').read();
    // convert empower JSON to STL
    var stl = emp2stl(json, {indent: options.dump ? '  ' : false, page: !!options.raster});
    // this is just a hack - replace CAS URI with a local URI 
    stl = stl.replace(/cas:[a-zA-Z0-9+\/_=]+/g, 'wd:/opentext.png');
    // log name and resulting STL
    console.log(input);
    console.log(stl);
    // write STL to a file
    stl = streams.stream(options.dump ? 'wd:/output/'+input+'.xml' : 'local:').write(stl);
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
    return stl.uri;
};
