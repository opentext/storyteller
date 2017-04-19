// Copyright (c) 2016 Open Text. All Rights Reserved.
'use strict';

var repo = __bindings.repository;
var util = require('util');

var uri_types = [
    'UNKNOWN',
    'INVALID',
    'FOLDER',
    'STREAM',
    'MONIKER',
    'HOST',
    'PROTOCOL',
    'GENERIC',
    'NOPROTOCOL'
];


function _checkEncoding(encoding) {
    if (encoding === undefined) {
        return 'utf8';
    }
    if (encoding && !Buffer.isEncoding(encoding)) {
        throw new Error("Unknown encoding: '" + encoding + "'");
    }
    return encoding;
}

function _prepareBuffer(data, encoding) {
    if (util.isString(data)) {
        return new Buffer(data, encoding);
    }
    if (encoding) {
        throw new Error("Encoding argument allowed only for string data");
    }
    if (util.isNumber(data)) {
        return '' + data;
    }
    return new Buffer(data);
}

function _prepareData(data, encoding) {
    return (util.isString(data) && (!encoding || encoding === 'utf8'))
        ? data
        : _prepareBuffer(data, encoding);
}

function _loadData(uri, encoding) {
    encoding = _checkEncoding(encoding);
    if (encoding === 'utf8') {
        return repo.load(uri, false);
    }
    var buffer = new Buffer(repo.load(uri, true));
    if (encoding) {
        buffer = buffer.toString(encoding);
    }
    return buffer;
}

exports.load = function load_data(uri, encoding) {
    return _loadData(uri, encoding);
};

exports.save = function save_data(uri, data, encoding) {
    return repo.save(_prepareData(data, encoding), uri);
};

exports.upload = function upload_data(data, encoding) {
    return repo.save(_prepareData(data, encoding), 'local:');
};

exports.stat = function get_uri_stats(uri) {
    var stat = repo.stat(uri) || null;
    if (stat) {
        stat.type = uri_types[stat.type] || '?';
    }
    return stat;
};

exports.loadInput = function load_stdin(encoding) {
    return _loadData('stdin:', encoding);
};

exports.saveOutput = function save_stdout(data, encoding) {
    return repo.save(_prepareData(data, encoding), 'stdout:');
};

