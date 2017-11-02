// Copyright (c) 2017 Open Text. All Rights Reserved.

'use strict';

var namespaces = {
    stl: "http://developer.opentext.com/schemas/storyteller/layout",
    xp: "http://developer.opentext.com/schemas/storyteller/xmlpreprocessor"
};

function xml_escaper(pattern) {
    var he = require('he');
    
    function encoder(c) {
        switch (c) {
        case '<':
            return '&lt;';
        case '>':
            return '&gt;';
        case '&':
            return '&amp;';
        case '"':
            return '&quot;';
        default:
            return '&#' + c.charCodeAt() + ';';
        }
    }
    return function (value) {
        return he.encode(value.replace(pattern, encoder));
    };
}


function namespace_stack() {
    var aliases = [];
    var uris = [];

    function push(attrs) {
        Object.keys(attrs).forEach(function (key) {
            if (key === 'xmlns' || key.startsWith('xmlns:')) {
                // prepend uri and alias
                aliases.unshift(key.substring(6));
                uris.unshift(attrs[key]);
            }
        });
    }

    function pop(attrs) {
        Object.keys(attrs).reverse().forEach(function (key) {
            if (key === 'xmlns' || key.startsWith('xmlns:')) {
                if (key.substring(6) !== aliases[0] || attrs[key] !== uris[0]) {
                    throw new Error("Inconsistent namespaces");
                }
                aliases.shift();
                uris.shift();
            }
        });
    }

    function lookup(alias) {
        var i = aliases.indexOf(alias);
        return (i === -1)
            ? null
            : uris[i];
    }

    function current() {
        var result = {};
        aliases.forEach(function (alias, index) {
            result[alias] = uris[index];
        });
        return result;
    }

    return {
        push: push,
        pop: pop,
        lookup: lookup,
        current: current
    };
}

function element_stack(nsmap, next) {
    var elements = [];

    function current() {
        return elements[elements.length - 1];
    }
    function start(el) {
        elements.push(el);
        nsmap.push(el.attributes);
        next.start(el.name, el.attributes);
    }
    function end() {
        var el = current();
        next.end(el.name, el.attributes);
        nsmap.pop(el.attributes);
        elements.pop();
    }
    function text(data) {
        next.text(data);
    }
    function finalize() {
        if (elements.length) {
            throw new Error("Remaining elements");
        }
        next.finalize();
    }

    return {
        start: start,
        end: end,
        text: text,
        finalize: finalize,
        current: current
    };
}

//////////////////////////////////////////////////////////////////////////////////

function ignorant() {
    function ignore_() {
        return;
    }

    return {
        start: ignore_,
        end: ignore_,
        text: ignore_,
        finalize: ignore_
    };
}

function empty_checker() {
    return {
        start: function (tag) {
            throw new Error("Element not expected:" + tag);
        },
        end: function (tag) {
            throw new Error("Element not expected:" + tag);
        },
        text: function (data) {
            if (data.trim()) {
                throw new Error("Data not expected:" + data);
            }
        },
        finalize: function () {
            return;
        }
    };
}

function text_accumulator(callback) {
    var accumulated = '';
    return {
        start: function () {
            throw new Error("Subelements not supported");
        },
        end: function () {
            throw new Error("Subelements not supported");
        },
        text: function (data) {
            accumulated += data;
        },
        finalize: function () {
            callback(accumulated);
        }
    };
}

function xml_accumulator(callback, dont_escape) {
    var accumulated = '';

    var attr_escape = (data) => data;
    var text_escape = (data) => data;
    if (!dont_escape) {
        attr_escape = xml_escaper(/[<&"]/g);
        text_escape = xml_escaper(/[<&]/g);
    }

    return {
        start: function (tag, attrs) {
            accumulated += '<' + tag;
            Object.keys(attrs).forEach(function (key) {
                accumulated += ' ' + key + '="' + attr_escape(attrs[key]) + '"';
            });
            accumulated += '>';
        },
        end: function (tag) {
            accumulated += '</' + tag + '>';
        },
        text: function (data) {
            accumulated += text_escape(data);
        },
        finalize: function () {
            callback(accumulated);
        }
    };
}

///////////////////////////////////////////////////////////////////////////////////////////////

function preprocessor(nsmap, next, callback) {
    callback = callback || function () {
        throw new Error("Fixtures not supported");
    };
    var fixture = null;

    function is_fixture(tag) {
        var split = tag.split(':', 2);
        var alias = split.length === 1
            ? ''
            : split[0];
        var name = split.length === 1
            ? split[0]
            : split[1];
        if (name === 'fixture') {
            var ns = nsmap.lookup(alias);
            return (ns === namespaces.xp);
        }
        return false;
    }

    function get_next() {
        return fixture || next;
    }

    function start(name, attrs) {
        if (is_fixture(name)) {
            var src = attrs.src;
            if (src) {
                callback(attrs, require('streams').stream(src).read());
                fixture = empty_checker();
            } else {
                fixture = xml_accumulator(function (data) {
                    callback(attrs, data);
                });
            }
        } else {
            get_next().start(name, attrs);
        }
    }
    function end(name, attrs) {
        if (is_fixture(name)) {
            fixture.finalize();
            fixture = null;
            callback(attrs);
        } else {
            get_next().end(name, attrs);
        }
    }
    function text(data) {
        get_next().text(data);
    }
    function finalize() {
        if (fixture) {
            throw new Error("Unclosed fixture");
        }
        next.finalize();
    }
    return {
        start: start,
        end: end,
        text: text,
        finalize: finalize
    };
}

function normalizer(next) {
    var data = '';
    var last_start = true;

    function normalize_space(str, left_trim, right_trim) {
        if (str) {
            str = str.replace(/\s+/g, ' ');
            if (left_trim) {
                str = str.replace(/^\s+/, '');
            }
            if (right_trim) {
                str = str.replace(/\s+$/, '');
            }
        }
        return str;
    }

    function flush(start) {
        data = normalize_space(data, last_start, !start);
        if (data) {
            next.text(data);
            data = '';
        }
        last_start = start;
    }

    function start(name, attrs) {
        flush(true);
        next.start(name, attrs);
    }

    function end(name, attrs) {
        flush(false);
        next.end(name, attrs);
    }

    function text(txt) {
        data += txt;
    }

    function finalize() {
        if (data.trim()) {
            throw new Error("Dangling text: " + data);
        }
    }

    return {
        start: start,
        end: end,
        text: text,
        finalize: finalize
    };
}

function dispatch_stack(next) {
    var dispatchers = [next];

    function current() {
        return dispatchers[dispatchers.length - 1];
    }
    function start(tag, attrs) {
        dispatchers.push(current().start(tag, attrs) || current());
    }
    function end(tag, attrs) {
        if (dispatchers.length < 2) {
            throw new Error("Inconsistent start/end");
        }
        var curr = dispatchers.pop();
        var prev = current();
        if (curr !== prev) {
            curr.finalize();
        }
        prev.end(tag, attrs);
    }
    function text(data) {
        current().text(data);
    }
    function finalize() {
        if (dispatchers.length !== 1 || dispatchers[0] !== next) {
            throw new Error("Inconsistent dispatcher state");
        }
        next.finalize();
    }

    return {
        start: start,
        end: end,
        text: text,
        finalize: finalize
    };
}

function handler_dispatcher(nsmap, handler) {
    function split_and_check(tag) {
        var split = tag.split(':', 2);
        var alias = split.length === 1
            ? ''
            : split[0];
        var ns = nsmap.lookup(alias);
        if (ns !== namespaces.stl) {
            throw new Error("Unsupported namespace in element: " + tag);
        }
        return split[split.length - 1];
    }
    function lookup(tag) {
        var key = split_and_check(tag) + '_';
        var method = handler[key];
        if (!method) {
            throw new Error("Handler method not found for tag: " + tag);
        }
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
    return {
        start: start,
        end: end,
        text: text,
        finalize: finalize
    };
}

//////////////////////////////////////////////////////////////////////////////////////

function sax_parser(nsmap, builder, cfg) {
    cfg = cfg || {};
    var sax = require('sax');

    var dispatcher = dispatch_stack(handler_dispatcher(nsmap, builder));
    var preprocess = preprocessor(nsmap, dispatcher, cfg.fixture);
    var normalize = normalizer(preprocess);
    var elements = element_stack(nsmap, normalize);

    var parser = sax.parser(true);
    parser.onopentag = elements.start;
    parser.ontext = elements.text;
    parser.onclosetag = elements.end;
    parser.onend = elements.finalize;

    return parser;
}

//////////////////////////////////////////////////////////////////////////////////////

function make_indenter(indent, default_indent) {
    var util = require('util');
    if (util.isFunction(indent)) {
        return indent;
    }
    if (indent) {
        if (util.isBoolean(indent)) {
            indent = default_indent || '  ';
        }
        if (util.isNumber(indent)) {
            indent = ' '.repeat(indent);
        }
        if (util.isString(indent)) {
            return () => indent;
        }
        throw new Error("Unsupported indent: " + indent);
    }
    return () => '';
}

function xml_writer(indenter) {
    var tags = [];
    var no_children;
    var content = '';
    var attr_escape = xml_escaper(/[<&"]/g);
    var text_escape = xml_escaper(/[<&]/g);
    
    function format_start(tag, attrs) {
        attrs = attrs || {};
        var result = '<' + tag;
        var keys = Object.keys(attrs).filter((key) => attrs[key] !== undefined);
        if (keys.length) {
            result += ' ' + keys.map(function(key) {
                return key + '="' + attr_escape(attrs[key]) + '"'; 
            }).join(' ');
        }
        return result + '>';
    }

    function format_end(tag) {
        return '</' + tag + '>';
    }

    function flush() {
        content += cache;
        cache = '';
    }
    
    function start(tag, attrs) {
        var line = format_start(tag, attrs);
        var indent = indenter(tag, tags, true);
        if (indent) {
            line = '\n' + indent.repeat(tags.length) + line;
        }
        content += line;
        no_children = true;
        tags.push(tag);
    }

    function end(tag) {
        var top = tags.pop();
        if (top !== tag) {
            throw new Error("Tag mismatch (trying to close '" + tag + "' while top element is '" + top + "')");
        }
        if (no_children) {
            content = content.slice(0, -1) + '/>';
            no_children = false;
        } else {
            var line = format_end(tag);
            var indent = indenter(tag, tags, false);
            if (indent) {
                line = '\n' + indent.repeat(tags.length) + line;
            }
            content += line;            
        }
    }
    
    function text(data) {
        if (!tags.length) {
            throw new Error("Cannot write text '" + data + "' outside elements");
        }
        no_children = false;
        content += text_escape(data);
    }

    function finalize() {
        return content;
    }

    return {
        start: start,
        end: end,
        text: text,
        finalize: finalize
    };
}

function stl_writer(indent) {
    var writer = xml_writer(make_indenter(indent));

    function start(tag, attrs) {
        if (attrs && attrs.style === '') {
            delete attrs.style;
        }
        writer.start('stl:' + tag, attrs);
    }

    function end(tag) {
        writer.end('stl:' + tag);
    }

    function text(data) {
        writer.text(data);
    }

    function finalize() {
        end('stl');
        var content = writer.finalize();
        writer = null;
        return content;
    }

    var attrs = {
        'xmlns:stl': exports.namespaces.stl,
        version: exports.version
    };
    start('stl', attrs);
    return {
        start: start,
        end: end,
        text: text,
        finalize: finalize
    };
}

exports.version = '0.1';
exports.namespaces = namespaces;
exports.namespace_stack = namespace_stack;
exports.handler_dispatcher = handler_dispatcher;
exports.ignorant = ignorant;
exports.empty_checker = empty_checker;
exports.text_accumulator = text_accumulator;
exports.xml_accumulator = xml_accumulator;
exports.parser = sax_parser;
exports.xml_escaper = xml_escaper;

exports.make_indenter = make_indenter;
exports.xml_writer = xml_writer;
exports.stl_writer = stl_writer;
