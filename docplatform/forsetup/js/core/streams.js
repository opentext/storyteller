// Copyright (c) 2017 Open Text. All Rights Reserved.
'use strict';

var repo = require('repo');
var util = require('util');

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

exports.stream = function stream(stream_uri) {
    var uri_ = stream_uri || null;
    var content_ = '';
    var self_ = {
        get uri() {
            return uri_;
        },
        set uri(new_uri) {
            _check(new_uri);
            uri_ = new_uri;
            content_ = null;
        },
        inspect: _inspect,
        stat: _stat,
        read: _read,
        write: _write
    };

    function _outuri(uri) {
        if (uri) {
            if (uri.startsWith('local:')) {
                return 'local:';
            }
            if (uri.startsWith('data:')) {
                return 'data:';
            }
        }
        return uri;
    }

    function _check(uri) {
        var stat = repo.stat(uri);
        if (!stat || stat.type !== 'STREAM') {
            throw new Error("No such stream: '" + uri + "'");
        }
    }

    function _stat() {
        if (uri_) {
            var stat = repo.stat(uri_);
            return stat || {type: 'STREAM', uri: uri_};
        }
        return {type: 'STREAM', size: Buffer.byteLength(content_)};
    }

    function _write(data, encoding) {
        var uri = _outuri(uri_);
        if (uri) {
            uri_ = repo.save(uri, data, encoding);
        } else {
            content_ = _prepareBuffer(data, encoding);
        }
        return self_;
    }

    function _read(encoding) {
        encoding = _checkEncoding(encoding);
        if (encoding === 'utf8' && uri_) {
            return repo.load(uri_, encoding);
        }
        var content = uri_
            ? new Buffer(repo.load(uri_, null))
            : content_;
        return (encoding)
            ? content.toString(encoding)
            : content;
    }

    function _shorten(str, length) {
        if (str.length > length) {
            str = str.substring(0, length / 2) + '...' + str.substring(str.length - length / 2);
        }
        return str;
    }
    function _inspect() {
        var stat = _stat();
        if (stat.uri) {
            stat.uri = _shorten(stat.uri, 100);
        }
        delete stat.type;
        return "[Stream " + util.inspect(stat) + " ]";
    }

    return self_;
};

