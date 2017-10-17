'use strict';

var data = require('data');
var streams = require('streams');
var services = require('services');
//var jsdom = require('jsdom');
var cheerio = require('cheerio');
var sha1 = require('js-sha1');

var stl = require('stl');

function inject_text(doc, selector, data) {
    doc.select(selector);
    doc.text(data);
    doc.pop();
}

function push_element(doc, name, attrs, ns) {
    ns = ns || {};
    doc.push(name);
    Object.keys(ns).forEach(function(alias) {
        doc.attr(alias ? 'xmlns:'+alias : 'xmlns', ns[alias]); 
    });
    Object.keys(attrs).forEach(function(name) {
        if(name != 'xmlns' && !name.startsWith('xmlns:'))
            doc.attr(name, attrs[name]);
    });
}

function inject_element(doc, selector, name, attrs, ns, data) {
    doc.select(selector);
    push_element(doc, name, attrs, ns);
    doc.text(data);
    doc.pop();
    doc.pop();
}

function append_elem(doc, start, tag, attrs, custom ) {
    custom = custom || {};
    if (start) {
        doc.push(tag);
        if (attrs['class'])
            doc.attr('class', attrs['class']);
        if (attrs['style'])
            doc.attr('style', attrs['style']);
        if (attrs['w'])
            doc.css('width', attrs['w']);
        Object.keys(custom).forEach(function(key) {
            doc.attr(key, custom[key]);
        });
    }
    else
        doc.pop();
}

function inject_fixture(doc, data, attrs) {
    if (!attrs.key)
        attrs = Object.assign({key: 'local:'+sha1(data)}, attrs);
    var el = doc.select('#stl-fixtures > *', null);
    push_element(doc, 'stl:fixture', attrs);
    doc.text(data);
    doc.pop();
    doc.pop();
    return attrs.key;
}

function document_sink($) {
    var elements = [$.root()];

    function html() {
        return $.html();
    }

    function context() {
        return elements[elements.length-1];
    }

    function current() {
        return $(context());
    }

    function select(selector, ctx) {
        var el = $(selector, ctx === undefined ? context() : null);
        elements.push(el);
        return el;
    }
    function push(tag) {
        current().append('<'+tag+'/>');
        elements.push( current().children().last() ); // there is probably a better way to do this
    }
    function pop() {
        elements.pop();
    }
    function attr(name, value) {
        current().attr(name, value);
    }
    function css(name, value) {
        current().css(name, value);
    }
    function text(data) {
        current().append(data);
    }
    return { html: html, select: select, push: push, pop: pop, attr: attr, css: css, text: text }
}

function linked_or_embeded_data(attrs, callback) {
    var src = attrs['src'];
    if (src) {
        callback(streams.stream(src).read());
        return stl.empty_checker();
    }
    else
        return stl.xml_accumulator(callback);
}

function linked_or_embeded_uri(ctx, attrs, callback) {
    var src = attrs['src'];
    if (src) {
        //if (!src.startsWith('link:')) {
        //    src = inject_fixture(ctx.doc, streams.stream(src).read(), {});
        //}
        callback(src);
        return stl.empty_checker();
    }
    else {
        return stl.xml_accumulator(function(data) {
            var src = inject_fixture(ctx.doc, data.trim(), {});
            callback(src);
        });
    }
}

//////////////////////////////////////////////////////////////////////////////////

function data_builder(ctx) {
    function source_(start, attrs) {
        if (start)
            return linked_or_embeded_data(attrs, function(xml) { 
                inject_text(ctx.doc, '#stl-data', xml ); 
            });
    }
    function template_(start, attrs) {
        if (start)
            return linked_or_embeded_data(attrs, function(xml) {
                ctx.data.template = streams.stream();
                ctx.data.template.write(xml.trim());
            });
    }
    function transformation_(start, attrs) {
        if (start)
            return linked_or_embeded_data(attrs, function(xml) {
                ctx.data.rules = streams.stream();
                ctx.data.rules.write(xml.trim());
            });
    }
    function text(data) {
        if (data.trim())
            throw new Error("Text data not allowed in data_builder");
    }
    function finalize() {
    }
    return { 
        source_: source_,
        transformation_: transformation_, 
        template_: template_, 
        text: text, 
        finalize: finalize 
    };
}

function table_builder(ctx) {
    function story_(start, attrs) {
    }

    function repeater_(start, attrs) {
        append_elem(ctx.doc, start, 'tbody', attrs, { 'data-stl-type': 'repeater', 'data-stl-xpath': attrs.xpath });
    }

    function row_(start, attrs) {
        append_elem(ctx.doc, start, 'tr', attrs);
    }

    function cell_(start, attrs) {
        append_elem(ctx.doc, start, 'td', attrs);
        if (start) {
            if (attrs['colspan'])
                ctx.doc.attr('colspan', attrs['colspan']);
            return stl.handler_dispatcher(ctx.ns, story_builder(ctx))
        }
    }

    function text(data) {
        ctx.doc.text(data);
    }

    function finalize() {
    }

    return { 
        story_: story_,
        repeater_: repeater_,
        row_: row_,
        cell_: cell_,
        text: text, 
        finalize: finalize 
    };
}

function story_builder(ctx) {

    function p_(start, attrs) {
        append_elem(ctx.doc, start, 'p', attrs);
    }

    function field_(start, attrs) {
        append_elem(ctx.doc, start, 'span', attrs, { 'data-stl-type': 'datasource', 'data-stl-xpath': attrs.xpath } );
    }

    function span_(start, attrs) {
        append_elem(ctx.doc, start, 'span', attrs);
    }

    function block_(start, attrs) {
        append_elem(ctx.doc, start, 'div', attrs);
    }

    function image_(start, attrs) {
        append_elem(ctx.doc, start, 'img', attrs, { 'data-stl-type': 'image', 'data-stl-source': attrs['src'] });
    }

    function chart_(start, attrs) {
        if (start) {
            return linked_or_embeded_uri(ctx, attrs, function (uri) {
                append_elem(ctx.doc, start, 'span', attrs, { 'data-stl-type': 'chart', 'data-stl-source': uri });
            });
        }
        else {
            ctx.doc.push('svg');
            ctx.doc.css('display', 'inline');
            ctx.doc.css('width', attrs.w);
            ctx.doc.css('height', attrs.h);
            ctx.doc.pop();

            ctx.doc.pop();
        }
    }

    function table_(start, attrs) {
        append_elem(ctx.doc, start, 'table', attrs);
        return stl.handler_dispatcher(ctx.ns, table_builder(ctx))
    }

    function fragment_(start, attrs) {
        if (start) {
            ctx.doc.push('span');
            ctx.doc.css('display', 'inline');
            ctx.doc.css('margin', '0 auto');
            ctx.doc.push('svg');
            ctx.doc.css('display', 'inline');
            ctx.doc.css('width', attrs.w);
            ctx.doc.css('height', attrs.h);
            ctx.doc.pop();
        }
        else {
            ctx.doc.pop();
        }
    }

    function script_(start, attrs) {
        if (start) {
            if (attrs.language !== 'js')
                throw new Error("Invalid script language: " + attrs.language);
            var key = { 'before': 'data-stl-script-before', 'after': 'data-stl-script-after' }[attrs.when];
            if (!key)
                throw new Error("Invalid script when directive: "+attrs.when ); 
            return stl.text_accumulator(function(script) { ctx.doc.attr(key, script); });
        }
    }

    function text(data) {
        ctx.doc.text(data);
    }

    function finalize() {
    }

    return { 
        p_: p_,
        field_: field_,
        span_: span_,
        block_: block_,
        image_: image_,
        chart_: chart_,
        table_: table_,
        fragment_: fragment_,
        script_: script_,
        text: text, 
        finalize: finalize 
    };
}

function doc_builder(ctx) {
    function story_(start, attrs) {
        if (start) {
            if (attrs.name !== 'Main')
                return stl.ignorant();
            ctx.doc.select('body');
            ctx.doc.css('padding', '20pt');
            ctx.doc.css('margin', '0px auto');
            if (attrs['max-width'])
                ctx.doc.css('max-width', attrs['max-width'] );
            return stl.handler_dispatcher(ctx.ns, story_builder(ctx))
        }
        else
            ctx.doc.pop();
    }
    function page_(start, attrs) {
        if (start)
            return stl.ignorant();
    }    
    function text(data) {
        if (data.trim())
            throw new Error("Text data not allowed in document_builder");
    }
    function finalize() {
    }

    return { 
        story_: story_,
        page_: page_,
        text: text, 
        finalize: finalize 
    };
}


function root_builder(ctx) {
    function stl_(start, attrs) {
    }

    function data_(start, attrs) {
        if (start)
            return stl.handler_dispatcher(ctx.ns, data_builder(ctx));
    }

    function fixtures_(start, attrs) {
        if (start){
            ctx.doc.select('#stl-fixtures');
            var ns = ctx.ns.current();
            var prefix = Object.keys(ns).find(key => ns[key] === stl.namespaces.stl);
            var name = prefix + ':fixtures';
            push_element(ctx.doc, name, attrs, ctx.ns.current() );
        }
        else {
            ctx.doc.pop();
            ctx.doc.pop();
        }
    }

    function style_(start, attrs) {
        if (start) {
            if (!attrs.src)
                return stl.text_accumulator(function(css) { 
                    inject_text(ctx.doc, '#stl-style', css); 
                });
            else
                inject_text(ctx.doc, "#stl-style", streams.stream(attrs.src).read());
        }
    }
    function document_(start, attrs) {
        if (start)
            return stl.handler_dispatcher(ctx.ns, doc_builder(ctx));
    }
    function text(data) {
        if (data.trim())
            throw new Error("Text data not allowed in root_builder");
    }
    function finalize() {
    }

    return { 
        stl_: stl_,
        data_: data_, 
        fixtures_: fixtures_, 
        style_: style_, 
        document_: document_, 
        text: text, 
        finalize: finalize 
    };
}

//////////////////////////////////////////////////////////////////////////////////


function convert_design(config) {
    var template = streams.stream(config.template);

    var ctx = { 
        data: {},
        ns: stl.namespace_stack(),
        doc: document_sink( cheerio.load(template.read()) )
    };

    var root = root_builder(ctx);
    var parser = stl.parser(
        ctx.ns,
        root,
        {
            fixture: function(attrs, data) {
                if (data !== undefined) {
                    //push_element(ctx.doc, name, attrs);
                    ctx.doc.select('#stl-fixtures');
                    inject_fixture(ctx.doc, data, attrs);
                } else {
                    ctx.doc.pop();
                    ctx.doc.pop();
                }
            }
        }
    );
    
    var input = streams.stream(config.stl);
    parser.write(input.read()).close();
    return { doc: ctx.doc, data: ctx.data };
}

module.exports = function (config) {
    // perform complete STL -> cheerio DOM conversion
    var ctx = convert_design(config);
    // conditionally instantiate TDT transformer
    var tdt;
    if (ctx.data && ctx.data.rules && ctx.data.template)
        tdt = services.tdt(ctx.data.template, ctx.data.rules);
 
    function invoke(input, output) {
        // perform TDT if it was specified in the STL, otherwise inject the input data
        var data = tdt
          ? tdt(input, streams.stream())
          : input;
        inject_text(ctx.doc, "#stl-data", data.read());
        // dump cheerio DOM to HTML markup
        output.write(ctx.doc.html());
    }
    return invoke;
};
