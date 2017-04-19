// Copyright (c) 2016 Open Text. All Rights Reserved.
"use strict";

// Here we fake the node.js process 
// (this allows us to use console.js from node.js without any changes) 

var process = __bindings.process;

function detect_platform() {
    var inst_folder = __bindings.repository.stat('stinst:/').uri;
    return inst_folder.match(/^file:\/\/\/[a-zA-Z]:\/([^\/]+[\/])*$/) ? 'win32' : 'linux';
}

exports.platform = detect_platform(); // 'win32' or 'linux'

// no access to actual environment variables yet
exports.env = {};

exports.cwd = function cwd() { 
    var uri = __bindings.repository.stat('wd:/').uri;
    uri = uri.replace(/^file:\/\//, '').replace(/\/$/,'');
	if (exports.platform === 'win32') {
	    uri = uri.replace(/\//g, '\\');
	}
	return uri;
}

var streams = require('streams');

exports.stdin = streams.stream('stdin:');
exports.stdout = streams.stream('stdout:');
exports.stdinfo = streams.stream('stdinfo:');
exports.stdwarn = streams.stream('stdwarn:');
exports.stderr = streams.stream('stderr:');

exports.getProp = function get(key) {
    return process.getProp(key);
};

exports.setProp = function set(key, val) {
    process.setProp(key, val);
};
