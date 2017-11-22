// Copyright (c) 2017 Open Text. All Rights Reserved.
/*jslint
  bitwise:true
*/

'use strict';

const util = require('util');
const stl = require('stl');
const defs = require('./html.json');

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

function simple_stack(item) {
    var items = [];
    if (item !== undefined)
        items.push(item);
    return {
        push: (item) => items.push(item),
        pop: () => items.pop(),
        top: () => items[items.length-1],
        length: () => items.length
    };
}

function check_options(options) {
    options = options || {};
    options.maps = options.maps || {};
    options.maps.uri = options.maps.uri || ((uri) => uri);
    options.maps.xpath = options.maps.xpath || ((xpath) => xpath);
    options.maps.font = options.maps.font || ((font) => font);
    if (options.output && !util.isStream(options.output)) {
        throw new Error("Invalid 'output' parameter, stream expected");
    }
    return options;
}

function check_input(input) {
    if (util.isStream(input)) {
        input = input.read();
    }
    if (!util.isString(input)) {
        throw new Error("Invalid 'input' parameter, string or stream expected");
    }
    return input;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
//
// STL -> HTML
//
/////////////////////////////////////////////////////////////////////////////////////////////////////

function html_writer(indent) {
    function shortener(tag) {
        return tag === 'div'
            ? '><br/></'+tag+'>'
            : '></'+tag+'>';
    }
    
    var writer = stl.xml_writer({indent: indent, shortener: shortener});

    function start(tag, attrs) {
        writer.start(tag, attrs);
    }

    function end(tag) {
        writer.end(tag);
    }

    function text(data) {
        writer.text(data);
    }

    function inject(data) {
        return writer.inject(data);
    }
    
    function finalize() {
        end('html');
        var content = writer.finalize();
        writer = null;
        return content;
    }

    start('html');
    return {
        start: start,
        end: end,
        text: text,
        inject: inject,
        finalize: finalize
    };
}

function indent_strings(strings, indent) {
    var sep = '\n'+(indent||'    ');
    return sep+strings.join(sep)+sep;
}
    
function css_postprocess(css) {
    function isNumberingRule(rule) {
        return Object.keys(rule).filter((prop) => prop.startsWith('-stl-list-')).length > 0;
    }

    function collectCounters(rules) {
        var result = {};
        Object.keys(rules).forEach(function(key) {
            var counter = rules[key]['-stl-list-counter'];
            if (counter)
                result[counter] = true;
        });
        return Object.keys(result);
    }

    function splitMask(mask) {
        return mask.replace(/^['"]|['"]$/gm,'').split('" "');
    }
    
    function formatMask(mask, counter, level) {
        function preprocessMask(mask, level) {
            var pmask = mask.replace(/\{(.*?(%([0-9]+)![1RrAa]).*?)\}/g, function(match, all, _, index) {
                return (index && +index<=level)
                    ? all
                    : '';
            });
            pmask = pmask.replace(/(%([0-9]+)![1RrAa])/g, function (match, all, index) {
                return (index && +index<=level)
                    ? all
                    : '';
            });
            return pmask;
        }

        function compileMask(mask, level) {
            var masks = splitMask(mask);
            var mask = level < masks.length
                ? masks[level]
                : masks[masks.length-1];
            var pmask = preprocessMask(mask, level);
            console.log(mask, level, '->', pmask);
            return pmask;
        }
        
        var format = {
            '1': 'decimal',
            'A': 'upper-alpha',
            'a': 'lower-alpha',
            'R' : 'upper-roman',
            'r': 'lower-roman'
        };
        return compileMask(mask, level).replace(/%((\d+)!([1aArR]))|([^%]+)/gm, function(match, p1, p2, p3) {
            if (p2)
                return 'counter('+counter+'-'+p2+','+format[p3]+') ';
            return '"'+match+'" ';
        }).trim();
    }
    
    function maxLevel(mask) {
        var regex = /%(\d+)!/g;
        var max = -1;
        // analyze numbering mask
        var result;
        while ( (result = regex.exec(mask)) ) {
            var level = +result[1];
            if (level > max) max = level;
        }
        return max === -1
            ? splitMask(mask).length // bullet mask
            : max;
    }

    function genNumberingStyles(key, props, level) {
        if (level === undefined)
            level = props.level;
        var css = [];
        if (props.counter) {
            css.push(key + ' {');
            css.push('  counter-reset: ' + props.counter + '-' + (level+1) + ';');
            css.push('  counter-increment: ' + props.counter + '-' + level + ';');
            css.push('}');
        }
        if (props.mask || props.marker) {
            css.push('' + key + '::before {');
            css.push('  content: ' + formatMask(props.mask, props.counter, level) + ';');
            Object.keys(props.marker || {}).forEach(function(prop) {
                css.push('  '+prop+': ' + props.marker[prop] + ';');
            });
            css.push('}');
        }
        return css;
    }

    function getNumberingProps(rule) {
        var props = {};
        function get_prop(key) {
            var p = rule['-stl-list-'+key];
            if (p) {
                props[key] = p;
            }
        }
        
        get_prop('counter');
        get_prop('level');
        get_prop('mask');
        get_prop('marker');
        if (Object.keys(props).length) {
            if (!props.mask || props.mask === 'default') {
                props.mask = props.counter
                    ? '"{%0!1.}{%1!1.}{%2!1.}{%3!1.} "'
                    : '"\u2022 " "\u25e6 " "\u25aa "';
            }
            return props;
        }
        return null;
    }

    var styles = stl.css_parse(css);
    var new_css = [];
    var counters = collectCounters(styles);
    if (counters.length) {
        new_css.push('body {');
        new_css.push('  counter-reset: ' + counters.join('-0 ') + '-0;');
        new_css.push('}');
        new_css.push('ol {');
        new_css.push('  list-style-type: none;');
        new_css.push('  padding-left: 1em;');
        new_css.push('  margin: 0em;');
        new_css.push('}');
    }
    Object.keys(styles).forEach(function(key) {
        var rule = styles[key];
        var props = getNumberingProps(rule);
        if (props) {
            if (props.level !== undefined) {
                new_css.concat(genNumberingStyles(key, props));
            } else {
                var max = maxLevel(props.mask);
                for (var level=0; level<=max; ++level) {
                    key = 'ol ' + key;
                    new_css.concat(genNumberingStyles(key, props, level));
                }
            }
        }
    });
    return new_css;
}

function html_builder(nsmap, writer, options) {
    var ctx = {
        stylesheet: null
    };
    
    const unsupported = function (item) {
        var message = "Unsupported " + item;
        if (options.permissive) {
            console.error(message + " (ignored)");
            return stl.ignorant();
        }
        throw new Error(message);
    };
    const unexpected = function(tag, what) {
        var message = "Unexpected " + what + " inside " + tag;
        if (options.permissive) {
            console.error(message + " (ignored)");
        }
        throw new Error(message);
    }

    var multipliers = {
        'pt': 1,
        'px': 72/96,
        'in': 72,
        'pc': 72/6,
        'mm': 72/25.4,
        'cm': 72/2.54
    };

    function convert_length(len) {
        var matches = /([0-9\.]+)(pt|px|in|pc|mm|cm|em|%)/.exec(len);
        if (!matches)
            throw new Error("Invalid length: " + len);
        var multiplier = multipliers[matches[2]];
        if (!multiplier)
            throw new Error("Unsupported unit: " + matches[2]);
        return Math.round(parseFloat(matches[1]) * multiplier);
    }

    function len2pt(l) {
        return (l === undefined)
            ? 0
            : convert_length(l);
    }

    function resize2pt(l) {
        return (l === undefined || l === 'max')
            ? null
            : convert_length(l);
    }

    function pt2len(l) {
        return l + 'pt';
    }
    
    function unexpected_text(data) {
        if (data.trim())
            return unexpected("stl:stl", "text");
    }

    function handle_resize(cls, css, options) {
        function css_property(name) {
            var val = css[name];
            if (val === undefined && ctx.stylesheet) {
                var def = ctx.stylesheet['.'+cls];
                if (def) {
                    val = def[name];
                }
            }
            return val;
        }
        
        function set_boundaries(growth, shrink, key) {
            function set_boundary(base, boundary, coef, key) {
                switch(boundary) {
                case 0:
                    css[key] = pt2len(base);
                    break;
                case null:
                    break;
                default:
                    css[key] = pt2len(base+coef*boundary);
                }
            }
            var base = len2pt(css_property(key));
            var minkey = 'min-' + key;
            var maxkey = 'max-' + key;
            set_boundary(base, resize2pt(growth), 1, maxkey);
            set_boundary(base, resize2pt(shrink), -1, minkey);
            if (css[minkey] && css[maxkey] && css[minkey] === css[maxkey]) {
                delete css[minkey];
                delete css[maxkey];
            } else {
                css[key] = 'auto'; //delete css[key];
            }
        }

        var resize = css_property('-stl-shape-resize') || 'fixed';
        resize = resize.split(' ');
        switch (resize[0]) {
        case 'fixed':
            break;
        case 'free':
            if (!options || options.width)
                set_boundaries(resize[1], resize[3], 'width');
            if (!options || options.height)
                set_boundaries(resize[2], resize[4], 'height');
            break;
        case 'proportional':
        default:
            throw new Error('Unsupported resize mode: ' + mode);
        }
    }

    function table_builder(writer) {
        var row = 0;
        var cell = 0;
        var widths = [];
            
        function row_(start, attrs) {
            if (start) {
                cell = 0;
                var css = stl.css_split(attrs.style);
                css.height = attrs.h;
                handle_resize(attrs['class'], css, {height: true});
                writer.start('tr', {
                    'class': attrs['class'],
                    'data-stl-class': 'stl:row',
                    style: stl.css_format(css)
                });
            } else {
                row += 1;
                writer.end('tr');
            }
        }

        function cell_(start, attrs) {
            if (start) {
                if (row === 0) {
                    widths.push(attrs.w);
                }
                var css = stl.css_split(attrs.style);
                css.width = widths[cell];
                writer.start('td', {
                    'class': attrs['class'],
                    'data-stl-class': 'stl:cell',
                    colspan: attrs.colspan,
                    style: stl.css_format(css)
                });
                return stl.handler_dispatcher(nsmap, story_builder(writer));
            } else {
                cell += 1;
                writer.end('td');
            }
        }

        function story_(start, attrs) {
            if (start) {
                writer.start('tbody', {
                    'class': attrs['class'],
                    'data-stl-class': 'stl:story'
                });
            } else {
                writer.end('tbody');
            }
        }
        
        return { 
            story_: story_,
            row_: row_,
            cell_: cell_,
            repeater_: () => unsupported("stl:repeater"),
            text: unexpected_text,
            finalize: () => {}
        };
    }

    function convert_html(markup) {
        return markup
            .replace(/<body( [^>]*)?>/, '')
            .replace('</body>', '')
            .replace('<p>', '<div>')
            .replace('<p ', '<div ')
            .replace('</p>', '</div>');
    }
    
    function item_builder(writer, inside) {
        const inline = inside !== undefined;
        inside = inside || {};
        
        function start_item(attrs) {
            if (inline) {
                writer.start('div', {
                    'class': 'stl-inline-item',
                });
            }
            inside.object = true;
        }

        function end_item() {
            if (inline) {
                writer.end('div');
            }
            inside.object = false;
        }

        function convert_css(attrs) {
            var css = stl.css_split(attrs.style);
            if (attrs.x || attrs.y) {
                css.position = 'absolute';
                if (attrs.x)
                    css.left = attrs.x;
                if (attrs.y)
                    css.top = attrs.y;
            }
            css.width = attrs.w;
            css.height = attrs.h;
            if (!css['background-color'])
                css['background-color'] = css.fill;
            css.transform = attrs.transform;
            return css;
        }
        
        function image_(start, attrs) {
            if (start) {
                start_item(attrs);
                var css = convert_css(attrs);
                writer.start('div', {
                    'class': attrs['class'],
                    'data-stl-class': 'stl:image',
                    style: stl.css_format(css)
                });
                writer.start('img', {
                    'class': 'stl-image',
                    src: attrs.src
                });
                return stl.empty_checker();
            } else {
                writer.end('img'); 
                writer.end('div');
                end_item();
            }
        }
        
        function table_(start, attrs) {
            if (start) {
                start_item(attrs);
                var css = convert_css(attrs);
                writer.start('table', {
                    'class': attrs['class'],
                    'data-stl-class': 'stl:table',
                    style: stl.css_format(css)
                });
                return stl.handler_dispatcher(nsmap, table_builder(writer));
            } else {
                writer.end('table');
                end_item();
            }
        }

        function text_(start, attrs) {
            if (start) {
                start_item(attrs);
                var css = convert_css(attrs);
                handle_resize(attrs['class'], css);
                writer.start('div', {
                    'class': attrs['class'],
                    'data-stl-class': 'stl:text',
                    'data-stl-story': attrs.story,
                    style: stl.css_format(css)
                });
            } else {
                writer.end('div');
                end_item();
            }
        }

        function story_(start, attrs) {
            if (inside.object) {
                if (start) {
                    writer.start('div', {
                        'class': attrs['class'],
                        'data-stl-class': 'stl:story'
                    });
                    return attrs.format === 'XHTML'
                        ? stl.xml_accumulator( (markup) => writer.inject(convert_html(markup)), true)
                        : stl.handler_dispatcher(nsmap, story_builder(writer));
                } else {
                    writer.end('div');
                }
            } else {
                return unsupported("stl:story nesting");
            }
        }
        
        return { 
            text_: text_,
            image_: image_,
            table_: table_,
            story_: story_,
            fragment_: () => unsupported("stl:fragment"),
            chart_: () => unsupported("stl:chart"),
            barcode_: () => unsupported("stl:barcode"),
            script_: () => unsupported("stl:script"),
            text: unexpected_text, 
            finalize: () => {}
        };
    }

    function story_builder(writer) {
        var inside = {};
        var list_level = 0;
        var inline_items = item_builder(writer, inside);
        
        function block_(start, attrs) {
            if (start) {
                writer.start('div', {
                    'class': attrs['class'],
                    'data-stl-class': 'stl:block',
                    style: attrs.style
                });
            } else {
                writer.end('div');
            }
        }

        function list_(start, attrs) {
            if (start) {
                list_level += 1;
                writer.start('ol', {
                    'class': attrs['class'],
                    'data-stl-class': 'stl:list',
                    style: attrs.style
                });
            } else {
                writer.end('ol');
                list_level -= 1;
            }
        }
        
        function p_(start, attrs) {
            if (start) {
                // consider conditional use of 'li'
                writer.start('div', {
                    'class': attrs['class'],
                    'data-stl-class': 'stl:p',
                    style: attrs.style
                });
                if (inside.paragraph)
                    return unsupported('stl:p nesting');
                inside.paragraph = true;
            } else {
                writer.end('div');
                inside.paragraph = false;
            }
        }

        function story_(start, attrs) {
            if (inside.hyperlink) {
                if (start) {
                    writer.start('span', {
                        'class': attrs['class'],
                        'data-stl-class': 'stl:story'
                    });
                } else {
                    writer.end('span');
                }
            } else {
                return inline_items.story_(start, attrs);
            }
        }
        
        function scope_(start, attrs) {
            if (start) {
                if (!attrs.hyperlink)
                    return unsupported("stl:scope");
                if (inside.hyperlink)
                    return unsupported("stl:scope nesting");
                writer.start('a', {
                    'class': attrs['class'],
                    'data-stl-class': 'stl:scope',
                    href: attrs.hyperlink
                });
                inside.hyperlink = true;
            } else {
                inside.hyperlink = false;
                writer.end('a');
            }
        }
        
        function span_(start, attrs) {
            if (start) {
                writer.start('span', {
                    'class': attrs['class'],
                    'data-stl-class': 'stl:span',
                    style: attrs.style
                });
            } else {
                writer.end('span');
            }
        }

        
        function text(data) {
            if (data) {
                if (inside.paragraph) {
                    writer.text(data);
                } else if (data.trim()) {
                    return unsupported("text outside paragraph");
                }
            }
        }

        function finalize() {
            inline_items.finalize();
        }

        return {
            list_: list_,
            p_: p_,
            span_: span_,
            block_: block_,
            scope_: scope_,
            story_: story_,
            field_: () => unsupported("stl:field"),
            image_: inline_items.image_,
            table_: inline_items.table_,
            text_: inline_items.text_,
            chart_: inline_items.chart_,
            fragment_: inline_items.fragment_,
            barcode_: inline_items.barcode_,
            script_: inline_items.script_,
            text: text, 
            finalize: finalize
        };
    }

    function doc_builder(writer) {
        function story_(start, attrs) {
            if (start) {
                writer.start('div', {
                    'class': attrs['class'],
                    'data-stl-class': 'stl:story',
                    'data-stl-name': attrs.name,
                });
                return attrs.format === 'XHTML'
                    ? stl.xml_accumulator( (markup) => writer.inject(convert_html(markup)), true)
                    : stl.handler_dispatcher(nsmap, story_builder(writer));
            } else {
                writer.end('div');
            }
        }

        function page_(start, attrs) {
            if (start) {
                var css = {};
                css.width = attrs.w;
                css.height = attrs.h;
                writer.start('div', {
                    'class': attrs['class'],
                    'data-stl-class': 'stl:page',
                    'data-stl-name': attrs.name,
                    style: stl.css_format(css)
                });
                return stl.handler_dispatcher(nsmap, item_builder(writer));
            } else {
                writer.end('div');
            }
        }

        return { 
            story_: story_,
            page_: page_,
            text: unexpected_text, 
            finalize: () => {}
        };
    }
    
    function root_builder(writer) {
        var inside;

        function section(name) {
            if (inside !== name) {
                if (inside)
                    writer.end(inside);
                inside = name;
                writer.start(name);
            }
        }

        function finalize() {
            if (inside) {
                writer.end(inside);
            }
        }
        
        function document_(start, attrs) {
            if (start) {
                section('body');
                writer.start('div', {'data-stl-class': 'stl:document'});
                return stl.handler_dispatcher(nsmap, doc_builder(writer));
            } else {
                writer.end('div');
            }
        }

        function style_(start, attrs) {
            function set_stylesheet(css) {
                if (ctx.stylesheet) {
                    return unsupported('multiple stylesheets');
                }
                ctx.stylesheet = stl.css_parse(css);
                writer.start('style');
                writer.text(css);
                writer.end('style');
                var new_css = css_postprocess(css);
                if (new_css.length) {
                    writer.start('style');
                    writer.text(indent_strings(new_css));
                    writer.end('style');
                }
            }
            
            if (start) {
                section('head');
                if (attrs.src) {
                    set_stylesheet(require('streams').stream(attrs.src).read());
                } else {
                    return stl.text_accumulator(set_stylesheet);
                }
            }
        }

        section('head');
        writer.start('meta', {charset: "UTF-8"});
        writer.end('meta');
        writer.start('style');
        writer.text(indent_strings(defs.css));
        writer.end('style');
        
        return {
            stl_: () => {},
            data_: () => unsupported("stl:data"), 
            fixtures_: () => unsupported("stl:fixtures"),
            style_: style_,
            document_: document_,
            text: unexpected_text, 
            finalize: finalize
        };
    }

    return root_builder(writer);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
 *  stl2html( input: string|stream [, options: object] ) : string|stream 
 *
 *  Parses _STL_ fragment and generates corresponding _HTML_ markup
 *
 *  Parameters:
 *    - `input` ... input stream containing _STL_
 *    - `options` ... following options are currently supported:
 *      - `output` ... optional output stream to be filled with resulting _HTML_
 *      - `indent` ... bool or a string used for indentation
 *      - `maps` ... object containing hooks for mapping various entities
 *        - `font` ... optional remap callback for font
 *        - `xpath` ... optional remap callback for XPath
 *        - `uri` ... optional remap callback for URI
 *    - `@return` ... output stream (if provided as `options.output`) or string
 */
exports.stl2html = function stl2html(input, options) {
    input = check_input(input);
    options = check_options(options);
        
    var nsmap = stl.namespace_stack();
    var writer = html_writer(options.indent);
    var builder = html_builder(nsmap, writer, options);
    var parser = stl.parser(nsmap, builder);
    parser.write(input).close();
    var output = writer.finalize();
    if (!options.output) {
        return output;  // return the string directly
    }
    options.output.write(output);
    return options.output;
};


