// Copyright (c) 2017 Open Text. All Rights Reserved.

'use strict';

var streams = require('streams');

var namespaces = {
    stl: "http://developer.opentext.com/schemas/storyteller/layout",
    xp: "http://developer.opentext.com/schemas/storyteller/xmlpreprocessor"
};

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

    function escaper(value, pattern) {
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
        return value.replace(pattern, encoder);
    }
    var escape = dont_escape
        ? (data) => data
        : escaper;
    return {
        start: function (tag, attrs) {
            accumulated += '<' + tag;
            Object.keys(attrs).forEach(function (key) {
                accumulated += ' ' + key + '="' + escape(attrs[key], /[<&"]/g) + '"';
            });
            accumulated += '>';
        },
        end: function (tag) {
            accumulated += '</' + tag + '>';
        },
        text: function (data) {
            accumulated += escape(data, /[<&]/g);
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
                callback(attrs, streams.stream(src).read());
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

exports.version = '0.1';
exports.namespaces = namespaces;
exports.namespace_stack = namespace_stack;
exports.handler_dispatcher = handler_dispatcher;
exports.ignorant = ignorant;
exports.empty_checker = empty_checker;
exports.text_accumulator = text_accumulator;
exports.xml_accumulator = xml_accumulator;
exports.parser = sax_parser;