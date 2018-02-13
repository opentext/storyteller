// Copyright (c) 2016 Open Text. All Rights Reserved.
'use strict';

// This module is experimental and represents a proof-of-concept of D3 based charts integration.
// The implementation as well as interface of this module can (anl likely will) change in future.

var d3 = require('d3');
var jsdom = require('jsdom');
var juice = require('juice2');
var nv = require('nvd3');
var repo = require('repo');
var layout = require('layout');
var data = require('data');
var xpath = require('xpath');
var util = require('util');
var css = repo.load(__filename.replace('.js', '.css'));

var g_scd_ns = "http://developer.opentext.com/schemas/storyteller/chart/definition";

function namespace_stack() {
    var aliases = [];
    var uris = [];

    function push(attrs) {
        for (var i = 0; i < attrs.length; i++) {
            var key = attrs[i].name;
            if (key === 'xmlns' || key.startsWith('xmlns:')) {
                // prepend uri and alias
                aliases.unshift(key.substring(6));
                uris.unshift(attrs[i].nodeValue);
            }
        }
    }

    function pop(attrs) {
        for (var i = 0; i < attrs.length; i++) {
            var key = attrs[i].name;
            if (key === 'xmlns' || key.startsWith('xmlns:')) {
                if (key.substring(6) !== aliases[0] || attrs[i].nodeValue != uris[0])
                    throw new Error("Inconsistent namespaces");
                aliases.shift();
                uris.shift();
            }
        }
    }

    function lookup(alias) {
        var i = aliases.indexOf(alias);
        if (i === -1)
            return null;
        return uris[i];
    }

    function current() {
        var result = {};
        aliases.forEach(function (alias, index) {
            result[alias] = uris[index];
        });
        return result;
    }

    return { push: push, pop: pop, lookup: lookup, current: current };
}

function process_option(key, option) {
    return ((key === 'x' || key === 'y' ) && util.isString(option))
        ? (node) => xpath(node, 'string(' + option + ')')
        : option;
}

function process_options(chart, options) {
    function is_property(prop) {
        try {
            prop();
            return true;
        } catch (ignore) {
            return false;
        }
    }

    Object.keys(options).forEach(function (key) {
        var prop = chart[key];
        if (!prop) {
            throw new Error("Invalid chart option: " + key);
        }
        if (is_property(prop)) {
            prop(process_option(key, options[key]));
        } else {
            process_options(prop, options[key]);
        }
    });
}

function process_data(series, what) {
    series.forEach(function (serie) {
        if (util.isString(serie[what])) {
            var arr = [];
            serie[what] = arr.slice.call(data.dom(serie[what]).node.lastChild.childNodes);
        }
    });
    return series;
}

function disable_interactivity(chart) {
    try{
        chart
            .duration(0);
    } catch (ignore) {}

    chart.tooltip.enabled(false);
    if (chart.interactive) {
        chart.interactive(false);
    }
    if (chart.stacked) {
        var scatter = chart.stacked.scatter;
        if (scatter) {
            scatter.interactive(false);
            scatter.pointActive(() => false);
        }
    }
    if (chart.clipEdge) {
        chart.clipEdge(false);
    }
    if (chart.showControls) {
        chart.showControls(false);
    }
}

function generator(document, type, series, options, chart_object) {

    //console.time("generator");

    options = options || {};
    if (!xpath) {
        throw new Error('Missing base data xpath');
    }
    var box = layout.item().Box;
    var creator = nv.models[type];
    if (!creator) {
        throw new Error("Invalid chart type: ", type);
    }

    var width = box.W * 96.0 / 72.0;
    var height = box.H * 96.0 / 72.0;

    var chart = creator()
        .width(width)
        .height(height);
    disable_interactivity(chart);
    process_options(chart, options);
    process_chart_object(chart, chart_object, series);

    var svg = d3.select(document.body).append('svg')
        .attr('xmlns', 'http://www.w3.org/2000/svg')
        .attr('width', box.W + 'pt')
        .attr('height', box.H + 'pt');

    //console.time("call(chart)");
    svg.datum(series).call(chart);
    //console.timeEnd("call(chart)");

    post_process_chart_object(document, svg, chart, chart_object, width, height);

    //console.timeEnd("generator");

    return svg;
}

function finalizer(document, svg) {
    //console.time("finalizer");

    // make all CSS styles inline
    juice.inlineDocument(document, css, {});
    //console.log( svg.node().outerHTML );
    //repo.save('wd:/error.svg', svg.node().outerHTML );
    //repo.save('file:///tmp/test.html', document.documentElement.outerHTML );

    var uri = repo.upload(svg.node().outerHTML);
    //console.log("svg uri: ", uri);
    layout.item().Uri = uri;
    //svg.node().remove();
    //document.defaultView.close();

    //console.timeEnd("finalizer");

}

function is_valid(obj) {
    return (typeof obj !== "undefined" && obj !== null);
}

function get_label(data_series, x) {
    var len = data_series.length;
    for (var i = 0; i < len; i++) {
        var values_len = data_series[i].values.length;
        for (var j = 0; j < values_len; j++) {
            if (data_series[i].values[j].x == x) {
                return data_series[i].values[j].label;
            }
        }
    }
}

function split_and_check(tag, nsmap) {
    if (tag == '#text')
        return null;

    var split = tag.split(':', 2);
    var alias = split.length === 1 ? '' : split[0];

    var ns = nsmap.lookup(alias);

    if (ns !== g_scd_ns)
        throw new Error("Unsupported namespace in element: " + tag);
    return split[split.length - 1];
}

function forEachElement(ns, node_list, element_parser) {
    for (var i = 0; i < node_list.length; i++) {
        var node = node_list[i];
        var key = split_and_check(node.nodeName, ns) + '_';
        var handler = element_parser[key];
        if (is_valid(handler)) {
            handler(node);
        }
    }
}

function process_chart_object(chart, chart_object, series) {
    if (chart_object == null)
        return;

    if (chart_object.type === "discreteBarChart") {
        if (chart_object.options.showYAxis === false)
            chart.showValues(true);
    }
    if (chart_object.type === "multiBarHorizontalChart") {
        chart.showValues(true);
    }
    if (chart_object.type === "lineChart" || chart_object.type === "multiBarChart" || chart_object.type === "stackedAreaChart") {
        chart.xAxis.tickFormat(function (d) {
            return get_label(series, d);
        });
    }

    if (chart_object.type !== "linePlusBarChart") {
        if (chart_object.axisY.length > 0 && is_valid(chart_object.axisY[0].label)) {
            chart.yAxis.axisLabel(chart_object.axisY[0].label);
        }
        if (chart_object.axisY.length > 0 && is_valid(chart_object.axisY[0].mask)) {
            chart.yAxis.tickFormat(d3.format(chart_object.axisY[0].mask));
        }
        if (chart_object.axisX.length > 0 && is_valid(chart_object.axisX[0].label)) {
            chart.xAxis.axisLabel(chart_object.axisX[0].label);
        }
        if (chart_object.type !== "pieChart" && chart_object.axisX.length > 0 && is_valid(chart_object.axisX[0].rotate)) {
            chart.xAxis.rotateLabels(chart_object.axisX[0].rotate);
        }
    }

    if (chart_object.stacked) {
        chart.stacked(true);
    }
}

function post_process_chart_object(document, svg, chart, chart_object, width, height) {
    if (chart_object == null)
        return;

    var default_style = get_default_text_style(document, chart_object);
    set_text_style(document, svg, chart_object, chart_object.data_series[0].values, default_style);
    var legend_style = set_legend_style(document, svg, chart_object, chart_object.data_series[0].values, default_style);

    add_title(document, svg, chart_object, width, height);
    chart.update();
    if (!chart_object.showSupportLines)
        remove_support_lines(document);

    // temporary transformation due to bug with margins and legend in pie charts
    if (chart_object.title_position === "top" && chart_object.type === "pieChart") {
        d3.select(document.body).selectAll('.nv-pieChart')
            .attr("transform", "translate(0,40)");
    }

    // set color
    if (legend_style.fill.length > 0) {
        d3.select(document.body).selectAll('.nv-legend-text')
            .attr("fill", legend_style.fill);
    }
}

function layer_parser(columns) {

    var attribute_handlers = {
        'col_x': function (column_series, value) { column_series.x = value; },
        'col_y': function (column_series, value) { column_series.y = value; },
        'col_label': function (column_series, value) { column_series.label = value; },
        'col_legend': function (column_series, value) { column_series.legend = value; }
    };

    function series_(node) {
        var column_series = {};
        for (var i = 0; i < node.attributes.length; i++) {
            var attr_handler = attribute_handlers[node.attributes[i].name];
            if (is_valid(attr_handler))
                attr_handler(column_series, node.attributes[i].value);
        }
        columns.push(column_series);
    }

    return {
        'series_': series_,
    };
}

function chart_parser(document, ns, chart_object) {
    var chart_types = {
        "pie": "pieChart",
        "bar": "discreteBarChart",
        "line": "lineChart",
        "stackedBar": "stackedBar",
        "stackedArea": "stackedAreaChart"
    };

    function get_chart_type(value, columns_series) {
        var type = chart_types[value];
        if (!is_valid(type))
            return value;
        if( value === "bar" && columns_series.length > 1 )
            return "multiBarChart";

        return type;
    }

    function get_chart_margin(style) {
        var margin = {}

        margin.left = parseInt(get_style_property(document, style, "margin-left", 0));
        margin.right = parseInt(get_style_property(document, style, "margin-right", 0));
        margin.top = parseInt(get_style_property(document, style, "margin-top", 0));
        margin.bottom = parseInt(get_style_property(document, style, "margin-bottom", 0));

        return margin;
    }

    function get_logical_coord(node, key_low, key_high) {
        var force = [, ];
        var low = node.getAttribute(key_low);
        if (is_valid(low) && low !== "") {
            force[0] = Number(low);
        }

        var high = node.getAttribute(key_high);
        if (is_valid(high) && high !== "") {
            force[1] = Number(high);
        }

        if (!is_valid(force[0]) && !is_valid(force[1]))
            return null;

        return force;
    }

    function get_logical_coord_x(node) {
        var coord_x = get_logical_coord(node, "logical_x_low", "logical_x_high");
        if (coord_x !== null) {
            chart_object.options.forceX = coord_x;
        }
    }

    function get_logical_coord_y(node) {
        var coord_y = get_logical_coord(node, "logical_y_low", "logical_y_high");
        if (coord_y !== null)
            chart_object.options.forceY = coord_y;
    }


    function title_(node) {
        if (node.hasAttribute("text"))
            chart_object.title = node.getAttribute("text");
        chart_object.title_style = node.getAttribute("style");
        chart_object.title_position = node.getAttribute("position");
    }

    function legend_(node) {
        chart_object.legend = true;
        chart_object.legend_style = node.getAttribute("style");;
        var align_h = node.getAttribute("alignment_h");
        if (align_h == "right")
            chart_object.legend_position = align_h;
    }

    function plot_(node) {
        var style = node.getAttribute("style");
        chart_object.options.margin = get_chart_margin(style);
        get_logical_coord_x(node);
        get_logical_coord_y(node);
    }

    function axis_x_(node) {
        chart_object.options.showXAxis = true;
        var axis = { label: node.getAttribute("label") };
        chart_object.axisX.push(axis);
        get_logical_coord_x(node);
    }

    function axis_y_(node) {
        chart_object.options.showYAxis = true;
        var axis = { label: node.getAttribute("label") };
        chart_object.axisY.push(axis);
        get_logical_coord_y(node);
    }

    function support_lines_(node) {
        chart_object.showSupportLines = true;
        //chart_object.options.showYAxis = true;
        if (chart_object.axisY.length == 0) {
            chart_object.axisY.push({});
        }
        chart_object.axisY[0].mask = node.getAttribute("mask");
        get_logical_coord_y(node);
    }

    function layer_(node) {

        var type_handlers = {
            'pieChart': function () {
                delete chart_object.options.showXAxis;
                delete chart_object.options.showYAxis;
                var donut = 'false';
                var donut_ratio = node.getAttribute("donut_ratio");
                if (donut_ratio != "" && donut_ratio > 0)
                    donut = 'true';
                chart_object.options.donut = donut;
                if (donut_ratio != null)
                    chart_object.options.donutRatio = donut_ratio;

                var start_angle = node.getAttribute("start_angle");
                if (start_angle == "")
                    start_angle = "0";
                
                chart_object.options.startAngle = d => d.startAngle + ((-Number(start_angle) + 90) * (Math.PI / 180));
                chart_object.options.endAngle = d => d.endAngle + ((-Number(start_angle) + 90) * (Math.PI / 180));

                chart_object.options.showLabels = true;
                var labels_offset = node.getAttribute("labels_offset");
                if (labels_offset != null && labels_offset < 0)
                    chart_object.options.labelsOutside = false;
                else
                    chart_object.options.labelsOutside = true;

                if (chart_object.legend_position != null)
                    chart_object.options.legendPosition = chart_object.legend_position;
            },
            'discreteBarChart': function () {
                delete chart_object.options.forceX;
            },
            'stackedBar': function () {
                chart_object.type = "multiBarChart";
                chart_object.stacked = true;
                var gap = node.getAttribute("gap");
                var width = node.getAttribute("bar_width");
                if (gap != "" && (width != "" || width != 0))
                    chart_object.options.groupSpacing = Number(gap) / (Number(width) + Number(gap));
            },
            'multiBarChart': function () {
                var gap = node.getAttribute("gap");
                var width = node.getAttribute("bar_width");
                if (gap != "" && (width != "" || width != 0))
                    chart_object.options.groupSpacing = Number(gap) / (Number(width) + Number(gap));
            },
            'linePlusBarChart': function () {
                delete chart_object.options.showXAxis;
                delete chart_object.options.showYAxis;
            }
        };


        chart_object.xpath = node.getAttribute("xpath");
        var type_val = node.getAttribute("type");
        chart_object.area = node.getAttribute("area");

        chart_object.options.showLegend = chart_object.legend;

        forEachElement(ns, node.childNodes, layer_parser(chart_object.columns));

        if (chart_object.type !== "") {
            chart_object.type = "linePlusBarChart";
        }
        else {
            chart_object.type = get_chart_type(type_val, chart_object.columns);
        }

        //console.log(chart_object);

        var type_handler = type_handlers[chart_object.type];
        if( is_valid(type_handler) )
            type_handler();
    }

    return {
        'title_': title_,
        'legend_': legend_,
        'plot_' : plot_,
        'axis_x_': axis_x_,
        'axis_y_': axis_y_,
        'support_lines_': support_lines_,
        'layer_': layer_,
    };
}

function parse_scd(document, ns, node) {

    var chart_object = {
        type: "",
        default_style: node.getAttribute("style"),
        title: "",
        title_style: "",
        title_position: "top",
        legend: false,
        legend_style: "",
        legend_position: "top",
        labels_offset: 0,
        stacked: false,
        xpath: '',
        columns: [],
        showSupportLines: false,
        axisX: [],
        axisY: [],
        options: {
            showXAxis: false,
            showYAxis: false
        }
    };

    forEachElement(ns, node.childNodes, chart_parser(document, ns, chart_object));

    return chart_object;
}

function parse_chart_xml(document, xml) {
    var xmldom = require('xmldom');
    var parser = new xmldom.DOMParser();
    var chart_object = {};

    var dom = parser.parseFromString(xml, 'text/xml');

    for (var i = 0; i < dom.childNodes.length; i++) {
        var node = dom.childNodes[i];
        var ns = namespace_stack();
        ns.push(node.attributes);

        var key = split_and_check(node.nodeName, ns);
        if (key == "scd")
            chart_object = parse_scd(document, ns, node);
        else
            throw new Error("Unknown chart definition!");
         
        ns.pop(node.attributes);
    }

    return chart_object;
}

function get_value(node) {
    if (is_valid(node) && is_valid(node.lastChild) && is_valid(node.lastChild.nodeValue) ) {
        return node.lastChild.nodeValue;
    }

    return '';
}

function get_value_x(type, cell_x, cell_label){
    if (type == 'pieChart' || type == 'discreteBarChart' || type == 'multiBarHorizontalChart') {
        return get_value(cell_label);
    }

    return get_value(cell_x);
}

function get_style_property(document, style, property, default_value) {
    var dummy = document.createElement('div');
    if (default_value != null)
        dummy.style[property] = default_value;

    if (style != "")
        dummy.style.cssText += style;

    return dummy.style[property];
}

function get_style_property_from_node(document, node, attribute, property, default_value) {
    var value = default_value;

    for (var i = 0; i < node.attributes.length; i++) {
        if (node.attributes[i].name == attribute) {
            value = get_style_property(document, node.attributes[i].nodeValue, property, value);
        }
    }

    return value;
}

function get_attribute_value_from_node(document, node, attribute) {
    if (!is_valid(node.attributes))
        return null;

    for (var i = 0; i < node.attributes.length; i++) {
        if (node.attributes[i].name == attribute) {
            return  node.attributes[i].nodeValue;
        }
    }

    return null;
}

function set_svg_text_style(text, style) {
    text.removeAttribute('fill');
    text.style['fill'] = style.fill;
    text.style['font-family'] = style.font_family;
    text.style['font-style'] = style.font_style;
    text.style['font-weight'] = style.font_weight;
    text.style['font-size'] = style.font_size;
}

function get_svg_text_style(document, text_style, default_style) {
    var ret = {};
    ret.fill = get_style_property(document, text_style, "color", default_style.fill);
    ret.font_family = get_style_property(document, text_style, "font-family", default_style.font_family);
    ret.font_style = get_style_property(document, text_style, "font-style", default_style.font_style);
    ret.font_weight = get_style_property(document, text_style, "font-weight", default_style.font_weight);
    ret.font_size = get_style_property(document, text_style, "font-size", default_style.font_size);

    return ret;
}

function get_default_text_style(document, chart_object){
    return get_svg_text_style(document, chart_object.default_style, {});
}

function set_text_style(document, svg, chart_object, values, text_style) {
    d3.select(document.body).selectAll('.nv-label text')
          .each(function (d, i) {
              var row_node = chart_object.data_series[0].values[i];
              var cell_label = row_node.childNodes[chart_object.columns[0].label - 1];
              if (!is_valid(cell_label)) {
                  cell_label = row_node.childNodes[chart_object.columns[0].x - 1];
              }

              var label_style = {
                  fill: get_style_property_from_node(document, cell_label, "data_style", "color", text_style.fill),
                  font_family: get_style_property_from_node(document, cell_label, "data_style", "font-family", text_style.font_family),
                  font_style: get_style_property_from_node(document, cell_label, "data_style", "font-style", text_style.font_style),
                  font_weight: get_style_property_from_node(document, cell_label, "data_style", "font-weight", text_style.font_weight),
                  font_size: get_style_property_from_node(document, cell_label, "data_style", "font-size", text_style.font_size)
              }
              set_svg_text_style(d3.select(this).node(), label_style);
          });
}

function set_legend_style(document, svg, chart_object, values, default_style) {
    var text_style = get_svg_text_style(document, chart_object.legend_style, default_style);

    d3.select(document.body).selectAll('.nv-legend-text')
          .each(function (d, i) {
              var legend_text = d3.select(this);
              set_svg_text_style(legend_text.node(), text_style)
          });

    return text_style;

}

function remove_support_lines(document) {

    //d3.select(document.body).selectAll('.nv-axis .tick line')
    //      .each(function (d, i) {
    //          var tick = d3.select(this);
    //          tick.node().setAttribute("style", "display:none");
    //      });

}

function add_title(document, svg, chart_object, width, height) {
    if (chart_object.title == "")
        return;

    var text_style = get_svg_text_style(document, chart_object.title_style, get_svg_text_style(document, chart_object.default_style, {}));

    var offset_y = parseInt(text_style.font_size, 10);
    if (chart_object.title_position == "bottom")
        offset_y = height;

    var offset_x = width;

    var text = svg.append("text")
        .attr("transform", "translate(" + offset_x / 2 + ", " + offset_y + ")")
        .attr("text-anchor", "middle")
        .text(chart_object.title);
        
    set_svg_text_style(text.node(), text_style);
}


function prepare_data(document, chart_object) {
    var type = chart_object.type;
    var data_series = chart_object.data_series;
    var series_columns = chart_object.columns;

    var chart_data = [];

    for (var c = 0; c < series_columns.length; c++) {
        var chart_series = [];

        for (var i = 0; i < data_series[0].values.length; i++) {
            var row_node = data_series[0].values[i];
            var cell_label = row_node.childNodes[series_columns[c].label - 1];
            if (chart_object.axisX.length == 0) {
                chart_object.axisX.push({});
            }
            if (!is_valid(cell_label)) {
                cell_label = row_node.childNodes[series_columns[c].x - 1];
            }
            if (is_valid(cell_label)) {
                chart_object.axisX[0].rotate = get_attribute_value_from_node(document, cell_label, "label_rotation");
            }

            var cell_x = row_node.childNodes[series_columns[c].x - 1];
            var cell_y = row_node.childNodes[series_columns[c].y - 1];
            var fill_color = get_style_property_from_node(document, cell_y, "data_style", "fill");
            var chart_series_item = { color: fill_color, x: get_value_x(type, cell_x, cell_label), y: Number(get_value(cell_y)), label: get_value(cell_label) };
            //console.log("chart_series_item", chart_series_item);

            chart_series.push(chart_series_item);
        }

        if (type == 'pieChart')
            return chart_series;

        var header_node = data_series[0].key[0];
        var header_y = header_node.childNodes[series_columns[c].y - 1];
        var stroke_color = get_style_property_from_node(document, header_y, "data_style", "stroke");

        var chart_data_item = { key: get_value(header_y), color: stroke_color, values: chart_series };
        if (is_valid(chart_object.area) && chart_object.area === "true" )
            chart_data_item.area = is_valid(chart_object.area);

        chart_data.push(chart_data_item);
    }
    return chart_data;
}

module.exports = {
    
    d3chart : function(type, series, options) {
        var doc = jsdom.jsdom();

        var data_series = process_data(series, "values");
        data_series = (type === 'pieChart')
                        ? series[0].values
                        : series;

        nv.addGraph(
            () => generator(doc, type, data_series, options, null),
            (svg) => finalizer(doc, svg)
        );
    },

    stlchart : function(xml_def) {
        var doc = jsdom.jsdom();

        //console.time("scd parsing");

        var chart_object = parse_chart_xml(doc, repo.load(xml_def));

        //console.timeEnd("scd parsing");

        //console.time("data parsing");

        var header_xpath = '/data' + chart_object.xpath + '/ddi:header';
        var data_xpath = '/data' + chart_object.xpath + '/ddi:row';
        var data_series = [{ key: header_xpath, values: data_xpath }];

        chart_object.data_series = process_data(process_data(data_series, "values"), "key");

        var chart_data = prepare_data(doc, chart_object);

        //console.timeEnd("data parsing");

        //console.time("addGraph");

        nv.addGraph(
            () => generator(doc, chart_object.type, chart_data, chart_object.options, chart_object),
            (svg) => finalizer(doc, svg)
        );

        //console.timeEnd("addGraph");

    },

    stlchartxml : function (xml_def) {
        var doc = jsdom.jsdom();

        console.log('stlchartxml');

        //console.time("scd parsing");

        var chart_object = parse_chart_xml(doc, xml_def);

        //console.timeEnd("scd parsing");

        //console.time("data parsing");

        var header_xpath = '/data' + chart_object.xpath + '/ddi:header';
        var data_xpath = '/data' + chart_object.xpath + '/ddi:row';
        var data_series = [{ key: header_xpath, values: data_xpath }];

        //chart_object.data_series = process_data(process_data(data_series, "values"), "key");

        //var chart_data = prepare_data(doc, chart_object);

        var chart_data = [{
            "color": "#a215af", "key": "Products", "area": true, "values": [
                { "y": 10, "x": 0 }, 
                { "y": 10, "x": 1 }, 
                { "y": 11, "x": 2 }, 
                { "y": 6, "x": 3 }, 
                { "y": 12, "x": 4 }, 
                { "y": 10, "x": 5 }, 
                { "y": 13, "x": 6 }]
        }, 
        {
            "color": "#0015af", "key": "prices", "area": true, "values": [
                { "y": 22, "x": 0 }, 
                { "y": 34, "x": 1 }, 
                { "y": 110, "x": 2 },
                { "y": 63, "x": 3 }, 
                { "y": 12, "x": 4 },
                { "y": 100, "x": 5 },
                { "y": 130, "x": 6 }]
        }]; 


        //console.timeEnd("data parsing");

        //console.time("addGraph");

        nv.addGraph(
            () => generator(doc, chart_object.type, chart_data, chart_object.options, chart_object),
            (svg) => finalizer(doc, svg)
        );

        //console.timeEnd("addGraph");

    }

};

module.exports.time = d3.time;
module.exports.format = d3.format;
