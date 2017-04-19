'use strict';

var data = require('data');
var streams = require('streams');
var services = require('services');
//var jsdom = require('jsdom');
var cheerio = require('cheerio');
var sha1 = require('js-sha1');
var sax = require('sax');
var parser = sax.parser(true);

var g_stl_ns = "http://developer.opentext.com/schemas/storyteller/layout";
var g_xp_ns = "http://developer.opentext.com/schemas/storyteller/xmlpreprocessor";

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
        return empty_checker();
    }
    else
        return xml_accumulator(callback);
}

function linked_or_embeded_uri(ctx, attrs, callback) {
    var src = attrs['src'];
    if (src) {
        //if (!src.startsWith('link:')) {
        //    src = inject_fixture(ctx.doc, streams.stream(src).read(), {});
        //}
        callback(src);
        return empty_checker();
    }
    else {
        return xml_accumulator(function(data) {
            var src = inject_fixture(ctx.doc, data.trim(), {});
            callback(src);
        });
    }
}

//////////////////////////////////////////////////////////////////////////////////

function namespace_stack() {
    var aliases = [];
    var uris = [];

    function push(attrs) {
        Object.keys(attrs).forEach(function(key) {
            if (key === 'xmlns' || key.startsWith('xmlns:')) {
                // prepend uri and alias
                aliases.unshift(key.substring(6));
                uris.unshift(attrs[key]);
            }
        });
    }

    function pop(attrs) {
        Object.keys(attrs).reverse().forEach(function(key) {
            if (key === 'xmlns' || key.startsWith('xmlns:')) {
                if (key.substring(6) !== aliases[0] || attrs[key] != uris[0])
                    throw new Error("Inconsistent namespaces");
                aliases.shift();
                uris.shift();
            }
        });
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

function element_stack(ctx, next) {
    var elements = [];

    function start(el) {
        elements.push(el);
        ctx.ns.push(el.attributes);
        next.start(el.name, el.attributes);
    }
    function end() {
        var el = current();
        next.end(el.name, el.attributes);
        ctx.ns.pop(el.attributes);
        elements.pop();
    }
    function text(data) {
        next.text(data);
    }
    function finalize() {
        if (elements.length)
            throw new Error("Remaining elements");
        next.finalize();
    }
    function current() {
        return elements[elements.length-1];
    }
    return { start: start, end: end, text: text, finalize: finalize, current: current };
}

function preprocessor(ctx, next) {
    var fixture = null;

    function is_fixture(tag) {
        var split = tag.split(':',2);
        var alias = split.length === 1 ? '' : split[0];
        var name = split.length === 1 ? split[0] : split[1];
        if (name === 'fixture') {
            var ns = ctx.ns.lookup(alias);
            return (ns === g_xp_ns);
        }
        return false;          
    }

    function start(name, attrs) {
        if (is_fixture(name)) {
            ctx.doc.select('#stl-fixtures');
            //push_element(ctx.doc, name, attrs);
            var src = attrs['src'];
            if (src) {
                inject_fixture(ctx.doc, streams.stream(src).read(), attrs);
                fixture = empty_checker();
            }
            else
                fixture = xml_accumulator(function(data) {
                    inject_fixture(ctx.doc, data, attrs);
                });
        }
        else
            (fixture ? fixture : next).start(name, attrs);
    }
    function end(name, attrs) {
        if (is_fixture(name)) {
            fixture.finalize();
            fixture = null;
            ctx.doc.pop();
            ctx.doc.pop();
        }
        else
            (fixture ? fixture : next).end(name, attrs);
    }
    function text(data) {
        (fixture ? fixture : next).text(data);
    }
    function finalize() {
        if (fixture)
            throw new Error("Unclosed fixture");
        next.finalize();
    }
    return { start: start, end: end, text: text, finalize: finalize };
}

function dispatch_stack(next) {
    var dispatchers = [next];

    function start(tag, attrs) {
        var curr = dispatchers[dispatchers.length-1];
        var next = curr.start(tag, attrs);
        dispatchers.push(next ? next : curr);
    }
    function end(tag, attrs) {
        if (dispatchers.length < 2)
            throw new Error("Inconsistent start/end");
        var curr = dispatchers.pop();
        var prev = dispatchers[dispatchers.length-1];
        if (curr !== prev)
            curr.finalize();
        prev.end(tag, attrs);
    }
    function text(data) {
        var curr = dispatchers[dispatchers.length-1];
        curr.text(data);
    }
    function finalize() {
        if (dispatchers.length !== 1 || dispatchers[0] !== next )
            throw new Error("Inconsistent dispatcher state");
        next.finalize();
    }

    return { start: start, end: end, text: text, finalize: finalize };
}

function handler_dispatcher(ctx, handler) {
    function split_and_check(tag, nsmap) {
        var split = tag.split(':',2);
        var alias = split.length === 1 ? '' : split[0];
        var ns = nsmap.lookup(alias);
        if (ns !== g_stl_ns)
            throw new Error("Unsupported namespace in element: " + tag);
        return split[split.length-1];
    }
    function lookup(tag) {
        var key = split_and_check(tag, ctx.ns)+'_';
        var method = handler[key];
        if (!method)
            throw new Error("Handler method not found for tag: "+tag);
        return method;
    }
    function start(tag, attrs) {
        return lookup(tag)(true, attrs);
    }
    function end(tag, attrs) {
        return lookup(tag)(false, attrs);
    }
    function text(data) {
        handler.text(data);
    }
    function finalize() {
        handler.finalize();
    }
    return { start: start, end: end, text: text, finalize: finalize };
}

//////////////////////////////////////////////////////////////////////////////////

function ignorant() {
    function start(tag, attrs) {
    }
    function end(tag, attrs) {
    }
    function text(data) {
    }
    function finalize() {
    }
    return { start: start, end: end, text: text, finalize: finalize };
}

function empty_checker() {
    function start(tag, attrs) {
        throw new Error("Element not expected:" + tag);
    }
    function end(tag, attrs) {
        throw new Error("Element not expected:" + tag);
    }
    function text(data) {
        if (data.trim())
            throw new Error("Data not expected:" + data);
    }
    function finalize() {
    }
    return { start: start, end: end, text: text, finalize: finalize };
}

function text_accumulator(callback) {
    var accumulated = '';

    function start(tag, attrs) {
        throw new Error("Subelements not supported");
    }
    function end(tag, attrs) {
        throw new Error("Subelements not supported");
    }
    function text(data) {
        accumulated += data;
    }
    function finalize() {
        callback(accumulated);
    }
    return { start: start, end: end, text: text, finalize: finalize };
}

function xml_accumulator(callback, dont_escape) {
    var accumulated = '';

    function escaper(value, pattern) {
        function encoder(c){
	        return c == '<' && '&lt;' ||
                c == '>' && '&gt;' ||
                c == '&' && '&amp;' ||
                c == '"' && '&quot;' ||
                '&#'+c.charCodeAt()+';'
        }
        return value.replace(pattern,encoder);
    }
    var escape = dont_escape ? (data) => data : escaper;

    function start(tag, attrs) {
        accumulated += '<'+tag;
        Object.keys(attrs).forEach(function(key) {
            accumulated += ' '+key+'="'+escape(attrs[key], /[<&"]/g)+'"';
        });
        accumulated +='>';
    }
    function end(tag, attrs) {
        accumulated += '</'+tag+'>';
    }
    function text(data) {
        accumulated += escape(data, /[<&]/g);
    }
    function finalize() {
        callback(accumulated);
    }
    return { start: start, end: end, text: text, finalize: finalize };
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
            return handler_dispatcher(ctx, story_builder(ctx))
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
        return handler_dispatcher(ctx, table_builder(ctx))
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
            return text_accumulator(function(script) { ctx.doc.attr(key, script); });
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
                return ignorant();
            ctx.doc.select('body');
            ctx.doc.css('padding', '20pt');
            ctx.doc.css('margin', '0px auto');
            if (attrs['max-width'])
                ctx.doc.css('max-width', attrs['max-width'] );
            return handler_dispatcher(ctx, story_builder(ctx))
        }
        else
            ctx.doc.pop();
    }
    function page_(start, attrs) {
        if (start)
            return ignorant();
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
            return handler_dispatcher(ctx, data_builder(ctx));
    }

    function fixtures_(start, attrs) {
        if (start){
            ctx.doc.select('#stl-fixtures');
            var el = ctx.element();
            push_element(ctx.doc, el.name, el.attributes, ctx.ns.current() );
        }
        else {
            ctx.doc.pop();
            ctx.doc.pop();
        }
    }

    function style_(start, attrs) {
        if (start) {
            if (!attrs.src)
                return text_accumulator(function(css) { 
                    inject_text(ctx.doc, '#stl-style', css); 
                });
            else
                inject_text(ctx.doc, "#stl-style", streams.stream(attrs.src).read());
        }
    }
    function document_(start, attrs) {
        if (start)
            return handler_dispatcher(ctx, doc_builder(ctx));
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
        ns: namespace_stack(),
        doc: document_sink( cheerio.load(template.read()) )
    };

    var root = root_builder(ctx);
    var dispatcher = dispatch_stack(handler_dispatcher(ctx, root));
    var preprocess = preprocessor(ctx, dispatcher);
    var elements = element_stack(ctx, preprocess);
    ctx.element = elements.current;

    parser.onopentag = elements.start;
    parser.ontext = elements.text;
    parser.onclosetag = elements.end;
    parser.onend = elements.finalize;
    
    var stl = streams.stream(config.stl);
    parser.write(stl.read()).close();
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
