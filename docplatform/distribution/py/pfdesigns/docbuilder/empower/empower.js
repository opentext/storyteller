'use strict';

exports.convert = function convert(input, dump, raster) {
    //dump = true;
    //raster = true;
	var emp2stl = require('wd:/emp2stl');
	var streams = require('streams');
	var services = require('services');
	// load empower JSON from file to string
	var json = streams.stream('wd:/input/'+input+'.json').read();
	// convert empower JSON to STL
	var stl = emp2stl(json, {indent: dump ? '  ' : false, page: raster});
	// this is just a hack - replace CAS URI with a local URI 
	stl = stl.replace(
		'cas:Y3hyOi8_aWQ9Y2ZlMDkwN2UtZWFlMi00ZDlkLWFkNzQtYjUzYTA2ODAwYzliO3Y9MTt0PTdjNjk4ZTFlLTdhMDUtZjA5Ny00NTYwLTdjYTc0ZWIyOGZhYw==',
		'wd:/opentext.png');
	// log name and resulting STL
	console.log(input);
	console.log(stl);
	// write STL to a file
	stl = streams.stream(dump ? 'wd:/output/'+input+'.xml' : 'local:').write(stl);
    if (raster) {
	    // raster STL to a raster file
	    var st = services.st(stl);
	    var options = {
		    selector: '/item[1]', // select text item (first child of the first page)
		    driver: {type: 'png', dpi: 96, pagemode: 'auto', compression: 6, background: 'white'},
		    output: 'wd:/output/'+input+'.png'
	    };
	    st(options);
    }
    return stl.uri;
};

    
