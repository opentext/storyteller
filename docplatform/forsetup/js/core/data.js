// Copyright (c) 2016 Open Text. All Rights Reserved.
'use strict';

// xmldom library is loaded lazily
var parser = null;
var writer = null;

const settings = require('__init__').data;
const xml_header = '<?xml version="1.0" encoding="UTF-8"?>\n';
const xml_prefix = xml_header + '<' + settings.xml.root + ' ' + settings.xml.alias + '="' + settings.xml.ns + '">';
const xml_suffix = '</' + settings.xml.root + '>\n';

const xml2js_defaults = settings.xml2js.defaults;

function copy_attrs(src, dst) {
    Object.keys(src).forEach(function (key) {
        dst[key] = src[key];
    });
}

function is_document(node) {
    return node.ownerDocument === null;
}

function is_node(node) {
    return !!node.ownerDocument;
}

function node_write(node) {
    if (!is_node(node) && !is_document(node)) {
        return node;
    }
    if (!writer) {
        var xmldom = require('xmldom');
        writer = new xmldom.XMLSerializer();
    }
    if (is_node(node)) {
        return writer.serializeToString(node);
    }
    return writer.serializeToString(node).replace('?><', '?>\n<') + '\n';
}

function dom_write(nodes) {
    if (Array.isArray(nodes) && nodes.length > 0) {
        var result = '';
        nodes.forEach(function (node) {
            result += node_write(node);
        });
        if (nodes.length > 1 || is_node(nodes[0])) {
            result = xml_prefix + result + xml_suffix;
        }
        return result;
    }
    return nodes;
}

function js_parse(xml, options) {
    var result = xml;
    if (xml.startsWith(xml_header) && xml.endsWith('>\n')) {
        var xml2js = require('xml2js');
        options = options || {};
        var merged_options = {};
        copy_attrs(xml2js_defaults, merged_options);
        copy_attrs(options, merged_options);
        xml2js.parseString(xml, merged_options, function (err, js) {
            if (err) {
                throw new Error('XML parsing failed.');
            }
            result = js;
        });
    }
    return result;
}

function convert_xml_dump(xml, func) {
    if (xml === '') {
        // empty nodeset represented as empty string
        return [];
    }
    if (xml.startsWith("'") && xml.endsWith("'")) {
        // plain string value
        return xml.substring(1, xml.length - 1);
    }
    if (xml === 'true') {
        // true boolean value
        return true;
    }
    if (xml === 'false') {
        // false boolean value
        return false;
    }
    // numeric value
    var n = Number(xml);
    if (!Number.isNaN(n)) {
        return n;
    }
    return func !== undefined
        ? func(xml)
        : xml;
}

function dom_parse(xml) {
    function node_proxy(xpath_ctx) {
        function select(xpath_ctx, xpath_selector) {
            return require('xpath')(xpath_ctx, xpath_selector);
        }

        return {
            node: xpath_ctx.contextNode,
            dump: function dump_xml(xpath) {
                return dom_write(select(xpath_ctx, xpath));
            },
            js: function select_js(xpath, options) {
                var result = select(xpath_ctx, xpath);
                if (Array.isArray(result) && result.length > 0) {
                    result = js_parse(dom_write(result), options);
                }
                return result;
            },
            dom: function select_dom(xpath) {
                var result = select(xpath_ctx, xpath);
                if (Array.isArray(result)) {
                    result = result.map(function (n, index, arr) {
                        return node_proxy({contextNode: n, contextSize: arr.length, contextPosition: index + 1});
                    });
                    if (result.length) {
                        // augment single-item array with methods to allow direct selection chaining
                        result.node = result[0].node;
                        result.dump = result[0].dump;
                        result.js = result[0].js;
                        result.dom = result[0].dom;
                    }
                }
                return result;
            }
        };
    }
    // in generic case we have to really parse the XML tree
    if (!parser) {
        var xmldom = require('xmldom');
        parser = new xmldom.DOMParser();
    }
    var dom = parser.parseFromString(xml, 'text/xml');
    return node_proxy({contextNode: dom, contextSize: 1, contextPosition: 1});
}

function st_proxy(data) {
    return {
        dump: function build_xml(xpath) {
            return convert_xml_dump(data.select(xpath));
        },
        js: function build_js(xpath, options) {
            return convert_xml_dump(data.select(xpath), function (dump) {
                return js_parse(dump, options);
            });
        },
        dom: function build_dom(xpath) {
            return convert_xml_dump(data.select(xpath), function (dump) {
                return dom_parse(dump);
            });
        }
    };
}

function bind(proxy) {
    if (require('util').isString(proxy)) {
        proxy = dom_parse(proxy);
    }
    exports.dump = proxy.dump;
    exports.js = proxy.js;
    exports.dom = proxy.dom;
}

exports.xml2js = js_parse;
exports.xml2dom = dom_parse;

if (typeof(__bindings) !== "undefined" && __bindings.data.select) {
    // bind current data message automatically
    bind(st_proxy(__bindings.data));
} else {
    exports.bind = bind;
}
