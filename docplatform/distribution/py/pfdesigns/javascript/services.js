"use strict";

var repo = require('repo');
var util = require('util');
var url = require('url');

exports.cache = function (url) {
    var data = repo.load(url);
    return repo.upload(data);
};

//
// Simple UML diagrams online
//
// see http://yuml.me/
//

exports.diagram = function (yuml, options) {
    options = options || {};
    var type = options.type || "usecase";
    var scale = options.scale || 100;
    var style = options.style || "plain";

    var baseuri = "http://yuml.me/diagram/";
    var uri = baseuri + style + ";scale:" + scale + "/" + type + "/" + yuml;
    return uri;
};


//
// LaTeX formulas
//
// see http://latex.codecogs.com/
//

exports.formula = function (latex, options) {
    function normalize(s) {
        return s.replace(/^\s+|\s+$/g, '').replace(/\s+/g, ' ');
    }

    var qs = require('querystring');
    options = options || {};
    var format = options.format || 'png';

    var baseurl = 'http://latex.codecogs.com/';
    var query = '';
    if (options.dpi) {
        query += '\\dpi{' + options.dpi + '} ';
    }
    if (options.background) {
        query += '\\bg_' + options.background + ' ';
    }
    if (options.inline) {
        query += '\\inline ';
    }
    query += normalize(latex);
    return baseurl + format + '.latex?' + qs.escape(query);
};

//
// Google Image Charts
//
// see https://developers.google.com/chart/image/
//

function joiner(sep, prefix) {
    return function (values) {
        prefix = prefix || '';
        return prefix + (util.isArray(values)
            ? values.join(sep)
            : values);
    };
}

var chart_types = {
    map: 'map',
    qr: 'qr',
    pie: 'p',
    pie3d: 'p3',
    concentric_pie: 'pc',
    venn: 'v',
    line: 'lc',
    sparkline: 'ls',
    line_xy: 'lxy',
    line_noaxes: 'lc[:nda]',
    scatter: 's',
    radar: 'r',
    radar_curved: 'rs',
    bar_grouped_horiz: 'bhg',
    bar_grouped_vert: 'bvg',
    bar_stacked_horiz: 'bhs',
    bar_stacked_vert: 'bvs',
    bar_overlapped: 'bvo'
};

var chart_handlers = {
    output_format: {key: 'chof'},
    title: {key: 'chtt'},
    title_style: {key: 'chts'},
    type: {key: 'cht', fn: function (t) {
        return chart_types[t] || t;
    }},
    dimension: {key: 'chs'},
    qrdata: {key: 'chl'},
    region: {key: 'chld', fn: joiner('|')},
    margins: {key: 'chma'},
    solid_fill: {key: 'chf', fn: joiner('|')},
    data_scale: {key: 'chds', fn: joiner(',')},
    label: {key: 'chl', fn: joiner('|')},
    grid: {key: 'chg'},
    fill: {key: 'chf'},
    bar_width: {key: 'chbh'},
    marker: {key: 'chm', fn: joiner('|')},
    icon_markers: {key: 'chem'},
    icon_type: {key: 'chst'},
    zero_line: {key: 'chp'},
    series_func: {key: 'chfd', fn: joiner('|')},
    series_line: {key: 'chls', fn: joiner('|')},
    series_data: {key: 'chd', fn: joiner('|', 't:')},
    series_label: {key: 'chdl', fn: joiner('|')},
    series_color: {key: 'chco', fn: joiner(',')},
    visible_axes: {key: 'chxt'},
    axis_label: {key: 'chxl', fn: joiner(',')},
    axis_range: {key: 'chxr', fn: joiner('|')}
};

exports.chart = function (options) {
    var query = {};
    Object.keys(options).forEach(function (key) {
        var rec = chart_handlers[key];
        if (!rec) {
            throw new Error('Unknown key: ' + key);
        }
        var val = options[key];
        if (rec.fn) {
            val = rec.fn(val);
        }
        query[rec.key] = val;
    });
    return url.format({
        protocol: 'http',
        host: 'chart.googleapis.com',
        pathname: 'chart',
        query: query
    });
};

