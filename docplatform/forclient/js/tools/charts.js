var util = require('util');
var xmldom = require('xmldom');
var data = require('data');
var repo = require('repo');
var layout = require('layout');

var g_scd_ns = "http://developer.opentext.com/schemas/storyteller/chart/definition";

function namespace_stack() {
    var aliases = [];
    var uris = [];

    function push(attrs) {
        if(attrs){
            for (var i = 0; i < attrs.length; i++) {
                var key = attrs[i].name;
                if (key === 'xmlns' || key.startsWith('xmlns:')) {
                    // prepend uri and alias
                    aliases.unshift(key.substring(6));
                    uris.unshift(attrs[i].nodeValue);
                }
            }
        }
    }

    function pop(attrs) {
        if(attrs){
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
    }

    function lookup(alias) {
        var i = aliases.indexOf(alias);
        if (i === -1)
            return null;
        return uris[i];
    }

    function current() {
        var result = {};
        aliases.forEach( function(alias, index) {
            result[alias] = uris[index];
        } );
        return result;
    }

    return { push: push, pop: pop, lookup: lookup, current: current };
}

function process_option(key, option) {
    if ( ( key === 'x' || key === 'y' ) && util.isString(option) ) {
        return node => data.string(option, node);
    }
    return option;
}

function process_options( chart, options ) {
    function is_property( prop ) {
        try {
            prop();
            return true;
        }
        catch(e) {
            return false;
        }
    }

    for (var key in options) {
        if (options.hasOwnProperty(key)) {
            var prop = chart[key];
            if (!prop)
                throw new Error("Invalid chart option: " + key );
            if ( is_property( prop ) )
                prop(process_option(key, options[key]));
            else
                process_options( prop, options[key] );
        }
    }
}

function process_data(series, what, cursor) {
    cursor = cursor || require('data');
    series.forEach( function(serie) {
        if (util.isString(serie[what]))
            serie[what] = [].slice.call( cursor.nodes(serie[what]) );
    });
    return series;
}

function is_valid(obj){
    return (typeof obj !== "undefined" && obj !== null);
}

function get_value(cell) {
    if (cell) {
        return util.isString(cell)
            ? cell
            : cell["_"];
    }
    return '';
}

function get_value_x(type, cell_x, cell_label) {
    if (type == 'pieChart' || type == 'discreteBarChart' || type == 'multiBarHorizontalChart')
        return get_value(cell_label)

    return Number(get_value(cell_x));
}

function get_style_property(style, property, default_value) {
    var dummy = document.createElement('div');
    if( default_value != null )
        dummy.style[property] = default_value;

    if( style != "" )
        dummy.style.cssText += style;

    return dummy.style[property];
}

function get_style_property_from_node(node, attribute, property, default_value){
    var value = default_value;
    if( is_valid(node.singleNodeValue.attributes[attribute]) )
    {
        value = get_style_property(node.singleNodeValue.attributes[attribute].nodeValue, property, value);
    }

    return value;
}

function get_attribute_value_from_node(node, attribute) {
    if (is_valid(node.singleNodeValue) && is_valid(node.singleNodeValue.attributes) && is_valid(node.singleNodeValue.attributes[attribute]))
        return node.singleNodeValue.attributes[attribute].nodeValue;

    return null;
}

function set_svg_text_style( text, style){
    text.style['fill'] = style.fill;
    text.style['font-family'] = style.font_family;
    text.style['font-style'] = style.font_style;
    text.style['font-weight'] = style.font_weight;
    text.style['font-size'] = style.font_size;
}

function get_svg_text_style( text_style, default_style){
    var ret = {};
    ret.fill = get_style_property(text_style, "color", default_style.fill);
    ret.font_family = get_style_property(text_style, "font-family", default_style.font_family);
    ret.font_style = get_style_property(text_style, "font-style", default_style.font_style);
    ret.font_weight = get_style_property(text_style, "font-weight", default_style.font_weight);
    ret.font_size = get_style_property(text_style, "font-size", default_style.font_size);

    return ret;
}

function get_default_text_style(chart_object){
    return get_svg_text_style(chart_object.default_style, {});
}

function set_text_style(svg, chart_object, values, text_style){
    d3.select(svg).selectAll('.nv-label text')
          .each(function(d,i){
              var cell_label = data.get_node("ddi:cell[" + chart_object.columns[0].label + "]", values[i]);

              var label_style = {
                  fill: get_style_property_from_node(cell_label, "data_style", "color", text_style.fill),
                  font_family: get_style_property_from_node(cell_label, "data_style", "font-family", text_style.font_family),
                  font_style: get_style_property_from_node(cell_label, "data_style", "font-style", text_style.font_style),
                  font_weight: get_style_property_from_node(cell_label, "data_style", "font-weight", text_style.font_weight),
                  font_size: get_style_property_from_node(cell_label, "data_style", "font-size", text_style.font_size)
              }
              set_svg_text_style( d3.select(this).node(), label_style );
          });

    text_style = get_svg_text_style(chart_object.legend_style, text_style);

    d3.select(svg).selectAll('.nv-legend-text')
          .each(function(d,i){
              set_svg_text_style( d3.select(this).node(), text_style )
          });
}

function set_legend_style(svg, chart_object, default_style) {
    var text_style = get_svg_text_style(chart_object.legend_style, default_style);

    d3.select(svg).selectAll('.nv-legend-text')
          .each(function (d, i) {
              var legend_text = d3.select(this);
              set_svg_text_style(legend_text.node(), text_style)
              });

    return text_style;
}

function remove_support_lines(svg) {
    d3.select(svg).selectAll('.nv-axis .tick line')
          .each(function (d, i) {
              var tick = d3.select(this);
              tick.node().setAttribute("style", "display:none");
          });

}

function add_title(svg, chart_object) {
    if (chart_object.title == "")
        return;

    var text_style = get_svg_text_style(chart_object.title_style, get_svg_text_style(chart_object.default_style, {}));
    
    if( !text_style.font_size )
        text_style.font_size = "10pt";

    var text = document.createElementNS("http://www.w3.org/2000/svg", "text");

    var offset_y = parseInt(text_style.font_size, 10);
    if (chart_object.title_position == "bottom")
        offset_y = svg.clientHeight;
    
    if( !offset_y )
        offset_y = 0;

    text.setAttributeNS(null, "transform", "translate(" + svg.clientWidth / 2 + ", " + offset_y + ")");
    text.setAttributeNS(null, "text-anchor", "middle");

    if( text_style && text_style != "" )
        set_svg_text_style(text, text_style);

    var text_node = document.createTextNode(chart_object.title);
    text.appendChild(text_node);
    svg.appendChild(text);
}

function chart_update(svg, chart_object) {
    if( chart_object.title_position === "top" ){
        d3.select(svg).selectAll('.nv-pieChart')
                .attr("transform", "translate(0,40)");
    }
}

function get_label(data_series, x){
    var i, j;
    var len = data_series.length;
    for( i = 0; i < len; i++){
        var values_len = data_series[i].values.length;
        for( j = 0; j < values_len; j++){
            if( data_series[i].values[j].x == x ){
                return data_series[i].values[j].label;
            }
        }
    }
}

function stl2nvd3_chart(chart_object, svg, chart_data) {
    nv.addGraph(function () {        
        var creator = nv.models[chart_object.type];
        if (!creator)
            throw new Error("Invalid chart type: ", chart_object.type);
        var chart = creator()
                .width(svg.parentNode.clientWidth)
                .height(svg.parentNode.clientHeight);

        process_options(chart, chart_object.options);
        process_chart_object(chart, chart_object, chart_data);

        if (chart_object.type == "lineChart") {
            chart.xAxis.tickFormat(function(d) {
                // do all you stuff and return an array
                return get_label(chart_data, d);
            });
        }
        d3.select(svg)
            .datum(chart_data)
            .call(chart);

        nv.utils.windowResize(function(){
            chart.update();
            chart_update(svg, chart_object);
        });

        post_process_chart_object(svg, chart, chart_object);

        //if (chart_object.type == 'pieChart')
        //    set_text_style(svg, chart_object, data_series[0].values);
        //else
        //    set_text_style(svg, chart_object, data_series);

        // add_title is duplicated
        // add_title(svg, chart_object);
        chart.update();
        chart_update(svg, chart_object);
       
        return chart;
    });
}

function split_and_check(tag, nsmap) {
    if (tag == '#text')
        return null;

    var split = tag.split(':',2);
    var alias = split.length === 1 ? '' : split[0];

    var ns = nsmap.lookup(alias);

    //if (ns !== g_scd_ns)
    //    throw new Error("Unsupported namespace in element: " + tag);
    return split[split.length-1];
}

function forEachElement(ns, node_list, element_parser) {
    for (var i = 0; i < node_list.length; i++) {
        var node = node_list[i];
        var key = split_and_check(node.nodeName, ns) + '_';
        var handler = element_parser[key];
        if (is_valid(handler))
            handler(node);
    }
}

function process_chart_object(chart, chart_object, series) {
    if (chart_object == null)
        return;

    if (chart_object.type === "discreteBarChart") {
        if (chart_object.options.showYAxis === false)
            chart.showValues(true);
    }
    else if (chart_object.type === "multiBarHorizontalChart") {
        chart.showValues(true);
    }
    else if (chart_object.type === "lineChart" || chart_object.type === "multiBarChart") {
        chart.xAxis.tickFormat(function (d) {
            return get_label(series, d);
        });
    }

    if (chart_object.type !== "linePlusBarChart" && chart_object.type !== "pieChart" ) {
        if (chart_object.axisY && chart.yAxis && chart_object.axisY.length > 0 && is_valid(chart_object.axisY[0].label)) {
            chart.yAxis.axisLabel(chart_object.axisY[0].label);
        }
        if (chart_object.axisY && chart.yAxis && chart_object.axisY.length > 0 && is_valid(chart_object.axisY[0].mask)) {
            chart.yAxis.tickFormat(d3.format(chart_object.axisY[0].mask));
        }
        if (chart_object.axisX && chart.xAxis && chart_object.axisX.length > 0 && is_valid(chart_object.axisX[0].label)) {
            chart.xAxis.axisLabel(chart_object.axisX[0].label);
        }
        if (chart_object.axisX && chart.xAxis && chart_object.axisX.length > 0 && is_valid(chart_object.axisX[0].rotate)) {
            chart.xAxis.rotateLabels(chart_object.axisX[0].rotate);
        }
    }

    if (chart_object.stacked) {
        chart.stacked(true);
    }
}

function post_process_chart_object(svg, chart, chart_object) {
    if (chart_object == null)
        return;

    var default_style = get_default_text_style(chart_object);
    ///set_text_style(svg, chart_object, chart_object.data_series[0].values, default_style);
    var legend_style = set_legend_style(svg, chart_object, default_style);

    add_title(svg, chart_object);
    chart.update();
    if(!chart_object.showSupportLines)
        remove_support_lines(svg);

    // temporary transformation due to bug with margins and legend in pie charts
    if (chart_object.title_position === "top" && chart_object.type === "pieChart") {
        d3.select(svg).selectAll('.nv-pieChart')
            .attr("transform", "translate(0,40)");
    }

    // set color
    ///if (legend_style.fill.length > 0) {
    ///    d3.select(svg).selectAll('.nv-legend-text')
    ///        .attr("fill", legend_style.fill);
    ///}
}

function layer_parser(columns) {


    attribute_handlers = {
        'col_x': function (column_series, value) { column_series.x = value; },
        'col_y': function (column_series, value) { column_series.y = value; },
        'col_label': function (column_series, value) { column_series.label = value; },
        'col_legend': function (column_series, value) { column_series.legend = value; }
    };

    function series_(node) {
        var column_series = {};
        for (var i = 0; i < node.attributes.length; i++) {
            attr_handler = attribute_handlers[node.attributes[i].name];
            if (is_valid(attr_handler))
                attr_handler(column_series, node.attributes[i].value);
        }
        columns.push(column_series);
    }

    return {
        'series_': series_,
    };
}

function chart_parser(ns, chart_object) {

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

        margin.left = parseInt(get_style_property(style, "margin-left", 0));
        margin.right = parseInt(get_style_property(style, "margin-right", 0));
        margin.top = parseInt(get_style_property(style, "margin-top", 0));
        margin.bottom = parseInt(get_style_property(style, "margin-bottom", 0));

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
        if( node.hasAttribute("text") )
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
        var layer_type_handlers = {
            'pie': function() {
                chart_object.type = "pieChart";
            },
            'bar': function() {
                chart_object.type = "discreteBarChart";
            },
            'line': function() {
                chart_object.type = "lineChart";
            },
            'stackedBar': function () {
                chart_object.type = "multiBarChart";
                chart_object.stacked = true;
            },
            'stackedArea': function () {
                chart_object.type = "stackedAreaChart";
            },
        }
    
        var nv_type_handlers = {
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
                if (start_angle != "") {
                    chart_object.options.startAngle = d => d.startAngle + ((Number(start_angle) + 90) * (Math.PI / 180));
                    chart_object.options.endAngle = d => d.endAngle + ((Number(start_angle) + 90) * (Math.PI / 180));
                }

                chart_object.options.showLabels = true;
                var labels_offset = node.getAttribute("labels_offset");
                if (labels_offset != null && labels_offset < 0)
                    chart_object.options.labelsOutside = false;
                else
                    chart_object.options.labelsOutside = true;

                if (chart_object.legend_position != null)
                    chart_object.options.legendPosition = chart_object.legend_position;
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

        var layer_type_handler = layer_type_handlers[type_val];
        if( is_valid(layer_type_handler) )
            layer_type_handler();
        else
            chart_object.type = type_val;

        if (chart_object.type === "") {
            chart_object.type = "linePlusBarChart";
        }

        var type_handler = nv_type_handlers[chart_object.type];
        if( is_valid(type_handler) )
            type_handler();

        //console.log(chart_object);
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

function parse_scd(ns, node) {

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

    forEachElement(ns, node.childNodes, chart_parser(ns, chart_object));

    return chart_object;
}

function parse_chart_xml(xml) {
    var xmldom = require('xmldom');
    parser = new xmldom.DOMParser();
    var chart_object = {};

    var dom = parser.parseFromString(xml, 'text/xml');

    for (var i = 0; i < dom.childNodes.length; i++) {
        var node = dom.childNodes[i];
        var ns = namespace_stack();
        ns.push(node.attributes);

        var key = split_and_check(node.nodeName, ns);
        if (key == "scd")
            chart_object = parse_scd(ns, node);
        else
            throw new Error("Unknown chart definition!");

        ns.pop(node.attributes);
    }

    return chart_object;
}

function xmlUnEscape(str) {
    return String(str)
		.replace(/&amp;/g, '&')
		.replace(/@apos;/g, "'")
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>');
}; 

module.exports = {

    d3chart : function( type, series, options ) {
        var elem = layout.item();
        var svg = elem.firstChild;
        var creator = nv.models[type];
        if (!creator)
            throw new Error("Invalid chart type: ", options.type);
        var chart = creator()
            .width(svg.offsetWidth)
            .height(svg.offsetHeight)
        ;
        process_options( chart, options );

        var data_series = process_data(series, "values");
        if ( type === 'pieChart' ){
            data_series = data_series[0].values;
        }

        nv.addGraph(function() {
            d3.select(svg)
                .datum(data_series)
                .call(chart);
            nv.utils.windowResize(chart.update);
            return chart;
        });
    },

    stlchart : function(xml_def) {
        var chart_object = parse_chart_xml(repo.load(xml_def));
        var elem = layout.item();
        stl2nvd3_chart(chart_object, elem.firstChild);
    },

    stlchartnew: function (scd, cursor, svgelem) {        
        function convert_data(chart_object, chart_data) {
            function convert_cell(row, ix, iy, ilabel) {
                var cells = row["ddi:cell"];
                var cell_x = cells[ix];
                var cell_y = cells[iy];
                return {
                    color: get_style_property(cell_y.data_style, "fill"),
                    x: get_value_x(chart_object.type, cell_x, cells[ilabel]),
                    y: Number(get_value(cell_y)),
                    label: ilabel ? get_value(cells[ilabel]) : get_value(cell_x)
                };
            }

            function convert_column_layer(series_column, chart_data_root) {
                var ix = series_column.x - 1;
                var iy = series_column.y - 1;
                var ilabel = series_column.label - 1;                
                var header_cell_y = chart_data_root["ddi:header"]["ddi:cell"][iy];
                return {
                    key: get_value(header_cell_y),
                    color: get_style_property(header_cell_y.data_style, "stroke"),
                    values: (chart_data_root["ddi:row"] || []).map((row) => convert_cell(row, ix, iy, ilabel))
                };
            }

            function convert_column(series_column) {
                return Object.keys(chart_data)
                    .filter((name) => chart_data[name]["ddi:header"])
                    .map((name) => convert_column_layer(series_column, chart_data[name]));
            }
            
            var converted_data = [].concat(...chart_object.columns.map(convert_column));
            return (chart_object.type == 'pieChart')
                ? converted_data[0].values
                : converted_data;
        }

        var chart_object = parse_chart_xml(scd);
        chart_data = cursor.js('.');
        var converted_data = convert_data(chart_object, chart_data);
        //console.log(chart_object);
        //console.log(converted_data);
        stl2nvd3_chart(chart_object, svgelem, converted_data);
    }    
};

module.exports.time = d3.time;
module.exports.format = d3.format;
