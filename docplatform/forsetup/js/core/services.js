// Copyright (c) 2016 Open Text. All Rights Reserved.
'use strict';

var util = require('util');
var streams = require('streams');

function _getInput(stream, output_stream) {
    if (util.isStream(stream)) {
        return output_stream
            ? stream.uri
            : stream.uri || stream.read(null);
    }
    throw new Error('Invalid argument, stream expected');
}

function _setOutput(stream, result) {
    if (stream.uri) {
        stream.uri = result;
    } else {
        stream.write(result);
    }
    return stream;
}

function _mapOutStream(val) {
    var stream;
    if (util.isString(val)) {
        // uri
        stream = streams.stream(val);
    } else {
        // content
        stream = streams.stream().write(val);
    }
    return stream;
}

exports.xslt = function xslt_transformer(xslt) {
    xslt = _getInput(xslt);
    return function transform(src, dst, params) {
        params = params || {};
        src = _getInput(src);
        var result = __bindings.services.xslt(xslt, src, _getInput(dst, true), params);
        return _setOutput(dst, result);
    };
};

exports.tdt = function tdt_transformer(template, rules, mode) {
    rules = _getInput(rules);
    template = _getInput(template);
    return function transform(src, dst, params) {
        src = _getInput(src);
        var options = {
            mode: mode,
            params: params || {}
        };
        var result = __bindings.services.tdt(src, template, rules, _getInput(dst, true), options);
        return _setOutput(dst, result);
    };
};

exports.xp = function xml_processor() {
    return function process(src, dst, options) {
        src = _getInput(src);
        var result = __bindings.services.xp(src, _getInput(dst, true), options || {});
        return _setOutput(dst, result);
    };
};

exports.xsd = function xsd_validator(xsd) {
    return function validate(xml, options) {
        xml = _getInput(xml);
        var errors = __bindings.services.xsd(xml, xsd, options || {});
        if (errors.length)
            throw new Error(errors);
    };
};

if (__bindings.services.st) {
    exports.st = function storyteller(design) {
        var design_input = _getInput(design);
        return function format(options) {
            var opt_data = options.data || null;
            var data = (!opt_data || util.isString(opt_data))
                ? opt_data
                : _getInput(opt_data);
            delete options.data;
            var output = __bindings.services.st(design_input, options, data);
            return {
                design: design,
                data: opt_data,
                options: options,
                output: util.isArray(output)
                    ? output.map(_mapOutStream)
                    : _mapOutStream(output)
            };
        };
    };
}
