// Copyright (c) 2017 Open Text. All Rights Reserved.
/*jslint
  bitwise:true
*/

'use strict';

const util = require('util');
const stl = require('stl');
const defs = require('./html.json');
const charts = require('charts');

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
                new_css = new_css.concat(genNumberingStyles(key, props));
            } else {
                var max = maxLevel(props.mask);
                for (var level=0; level<=max; ++level) {
                    key = 'ol ' + key;
                    new_css = new_css.concat(genNumberingStyles(key, props, level));
                }
            }
        }
    });
    return new_css;
}

function html_builder(nsmap, writer, options) {
    var ctx = {
        stylesheet: null,
        chartidx: 0
    };
    
    const unsupported = function (tag, ...args) {
        var message = util.format('Unsupported', tag, ...args);
        if (options.permissive) {
            console.error(message, '(ignored)');
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
        var widths = [];
        var inside = {
            story: 0,
            row: 0,
            cell: 0,
            rep_index: 0,
            row_index: null
        };

        function repeater_(start, attrs) {
            if (start) {
                if (inside.repeater)
                    throw new Error("Table row repeater nesting not supported");
                inside.repeater = true;
                inside.rep_index += 1;
                inside.row_index = 0;
                writer.start('tbody', {
                    'data-stl-class': 'stl:repeater',
                    'data-stl-opath': 'stl:story['+inside.story+']/stl:repeater['+inside.rep_index+']',
                    'data-stl-xpath': attrs.xpath
                });
            } else {
                writer.end('tbody');
                inside.repeater = false;
            }
        }            
        
        function row_(start, attrs) {
            if (start) {
                inside.cell = 0;
                inside.row_index += 1;
                var css = stl.css_split(attrs.style);
                css.height = attrs.h;
                handle_resize(attrs['class'], css, {height: true});
                writer.start('tr', {
                    'class': attrs['class'],
                    'data-stl-class': 'stl:row',
                    'data-stl-opath': inside.repeater
                        ? undefined
                        : 'stl:story['+inside.story+']/stl:row['+inside.row_index+']',
                    style: stl.css_format(css)
                });
            } else {
                inside.row += 1;
                writer.end('tr');
            }
        }

        function cell_(start, attrs) {
            if (start) {
                if (inside.row === 0) {
                    widths.push(attrs.w);
                }
                var css = stl.css_split(attrs.style);
                css.width = widths[inside.cell];
                writer.start('td', {
                    'class': attrs['class'],
                    'data-stl-class': 'stl:cell',
                    colspan: attrs.colspan,
                    style: stl.css_format(css)
                });
                return stl.handler_dispatcher(nsmap, story_builder(writer, false));
            } else {
                inside.cell += 1;
                writer.end('td');
            }
        }

        function story_(start, attrs) {
            if (start) {
                inside.story += 1;
            }
        }
        
        return { 
            story_: story_,
            row_: row_,
            cell_: cell_,
            repeater_: repeater_,
            text: unexpected_text,
            finalize: () => {}
        };
    }

    function text_builder(writer, text_attrs) {
        function story_(start, attrs) {
            if (text_attrs.story)
                return unsupported("referenced and own stl:story");
            if (start) {
                writer.start('div', {
                    'class': attrs['class'],
                    'data-stl-class': 'stl:story'
                });
                return attrs.format === 'XHTML'
                    ? stl.xml_accumulator( (markup) => writer.inject(convert_html(markup)), true)
                    : stl.handler_dispatcher(nsmap, story_builder(writer, false));
            } else {
                writer.end('div');
            }
        }
        
        function shape_(start, attrs) {
            if (start) {
                return stl.ignorant();
            }
        }
        
        return { 
            story_: story_,
            shape_: shape_,
            script_: () => unsupported("stl:script"),
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

    function convert_css(attrs, inside) {
        var css = stl.css_split(attrs.style);
        switch(inside.paragraph) {
        case true:
            // inline item
            css.display = 'inline-block';
            break;
        case false:
            // paragraph item
            break;
        case undefined:
            // page item
            css.position = 'absolute';
            if (attrs.x || attrs.y) {
                if (attrs.x)
                    css.left = attrs.x;
                if (attrs.y)
                    css.top = attrs.y;
            }
            break;
        default:
            throw new Error("Unsupported inside paragraph mode: ", inside.paragraph);
        }
        css.width = attrs.w;
        css.height = attrs.h;
        if (!css['background-color'])
            css['background-color'] = css.fill;
        css.transform = attrs.transform;
        return css;
    }
    
    function item_builder(writer, inside) {
        inside = inside || {};
        var chart_object = {};
        
        function start_item(attrs) {
            //if (inside.paragraph) {
            //    writer.start('div', {
            //        'class': 'stl-inline-item',
            //    });
            //}
            inside.object = true;
        }

        function end_item() {
            //if (inside.paragraph) {
            //    writer.end('div');
            //}
            inside.object = false;
        }
        
        function image_(start, attrs) {
            if (start) {
                start_item(attrs);
                var css = convert_css(attrs, inside);
                writer.start('img', {
                    'class': attrs['class'],
                    'data-stl-class': 'stl:image',
                    src: options.maps.uri(attrs.src),
                    style: stl.css_format(css)
                });
                return stl.empty_checker();
            } else {
                writer.end('img');
                end_item();
            }
        }
        
        function table_(start, attrs) {
            if (start) {
                start_item(attrs);
                var css = convert_css(attrs, inside);
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

        function group_(start, attrs) {
            if (start) {
                start_item(attrs);
                var css = convert_css(attrs, inside);
                writer.start('div', {
                    'class': attrs['class'],
                    'data-stl-class': 'stl:group',
                    style: stl.css_format(css)
                });
            } else {
                writer.end('div');
                end_item();
            }
        }

        function input_(start, attrs) {
            if (start) {
                start_item(attrs);
                var css = convert_css(attrs, inside);
                var att = {
                        'class': attrs['class'],
                        style: stl.css_format(css),
                        'data-stl-class': 'stl:input',
                        'data-stl-type': attrs.type,
                        'data-stl-xpath': attrs.xpath
                };           
                switch(attrs.type) {
                case 'text':
                    att.type = 'text';
                    writer.start('input', att);
                    break;
                case 'radio':
                    att.type = 'radio';
                    writer.start('input', att);
                    break;
                case 'checkbox':
                    att.type = 'checkbox';
                    writer.start('input', att);
                    break;
                case 'submit':
                    att.type = 'submit';
                    writer.start('input', att);
                    break;
                case 'listbox':
                    att.multiple = 'true';
                case 'dropdown':
                    writer.start('select', att);
                    break;
                default:
                    throw new Error('Unsupported input type: ' + attrs.type);
                }
            } else {
                switch(attrs.type) {
                case 'text':
                case 'radio':
                case 'checkbox':
                case 'submit':
                    writer.end('input');
                    break;
                case 'listbox':
                case 'dropdown':
                    writer.end('select');
                    break;
                default:
                    throw new Error('Unsupported input type: ' + attrs.type);
                }
                end_item();
            }
        }
        
        function box_(start, attrs) {
            if (start) {
                start_item(attrs);
                var css = convert_css(attrs, inside);
                writer.start('div', {
                    'class': attrs['class'],
                    'data-stl-class': 'stl:box',
                    style: stl.css_format(css)
                });
            } else {
                writer.end('div');
                end_item();
            }
        }

        function shape_(start, attrs) {
            if (start) {
                var css = convert_css(attrs, inside);
                writer.start('div', {
                    'class': attrs['class'],
                    'data-stl-class': 'stl:shape',
                    style: stl.css_format(css)
                });
                
                return stl.xml_accumulator( function (markup) {
                    writer.start('svg', {
                        width: attrs.w,
                        height: attrs.h,
                        xmlns: 'http://www.w3.org/2000/svg',
                        version: '1.1',
                    });
                    writer.inject(markup);
                    writer.end('svg');
                }, true);
            } else {
                writer.end('div');
            }
        }
        
        function text_(start, attrs) {
            if (start) {
                start_item(attrs);
                var css = convert_css(attrs, inside);
                handle_resize(attrs['class'], css);
                writer.start('div', {
                    'class': attrs['class'],
                    'data-stl-story': attrs.story,
                    'data-stl-class': 'stl:text',
                    style: stl.css_format(css)
                });
                return stl.handler_dispatcher(nsmap, text_builder(writer, attrs));
            } else {
                writer.end('div');
                end_item();
            }
        }

        function chart_(start, attrs) {
            if (start) {
                start_item(attrs);
                var xpaths = [];
                var collect = {
                    start: function (tag, attrs) {
                        if (attrs.xpath)
                            xpaths.push(attrs.xpath);
                    },
                    end: () => {},
                    text: () => {},
                    finalize: () => {}
                };
                var accu = stl.xml_accumulator(function (scd) {
                    if (!xpaths.length)
                        throw new Error("stl:chart - missing data xpath");
                    if (xpaths.length>1)
                        throw new Error("stl:chart - multiple data xpaths not supported");
                    var css = convert_css(attrs, inside);
                    writer.start('div', {
                        'class': attrs['class'],
                        'data-stl-class': 'stl:chart',
                        'data-stl-xpath': xpaths[0],
                        style: stl.css_format(css)
                    });
                    
                    writer.start('script', {type: "text/xmldata"});
                    writer.inject(scd.replace('<scd:scd>', '<scd:scd xmlns:scd="'+stl.namespaces.scd+'">'));
                    writer.end('script');

                    writer.end('div');
                }, true);
                return stl.fork(collect, accu);
            } else {
                end_item();
            }
        }

        return { 
            box_: box_,
            group_: group_,
            input_: input_,
            text_: text_,
            shape_: shape_,
            image_: image_,
            table_: table_,
            fragment_: () => unsupported("stl:fragment"),
            chart_: chart_,
            barcode_: () => unsupported("stl:barcode"),
            script_: () => unsupported("stl:script"),
            text: unexpected_text, 
            finalize: () => {}
        };
    }

    function story_builder(writer, inside_paragraph) {
        var inside = {
            paragraph: inside_paragraph
        };
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
            if (inside.hyperlink || inside.form || inside.repeater || inside.switch_case || inside.story_ref) {
                var tag = inside.paragraph ? 'span' : 'div';
                if (start) {
                    writer.start(tag, {
                        'class': attrs['class'],
                        'data-stl-class': 'stl:story'
                    });
                    return attrs.format === 'XHTML'
                        ? stl.xml_accumulator( (markup) => writer.inject(convert_html(markup)), true)
                        : stl.handler_dispatcher(nsmap, story_builder(writer, inside.paragraph));
                } else {
                    writer.end(tag);
                }
            } else {
                return unsupported('stl:story');
            }
        }
        
        function scope_(start, attrs) {
            if (attrs.relation) {
                if (start) {
                    var css = convert_css(attrs, inside);
                    if (inside.form)
                        return unsupported("form nesting");
                    writer.start('form', {
                        'class': attrs['class'],
                        'data-stl-class': 'stl:scope',
                        'data-stl-xpath': attrs.relation,
                        style: stl.css_format(css)
                    });
                    inside.form = true;
                } else {
                    inside.form = false;
                    writer.end('form');
                }
            } else if (attrs.hyperlink) {
                if (start) {
                    if (inside.hyperlink)
                        return unsupported("hyperlink nesting");
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
            } else {
                var tag = inside.paragraph ? 'span' : 'div';
                if (start) {
                    if (inside.story_ref)
                        return unsupported("story ref nesting");
                    writer.start(tag, {
                        'data-stl-class': 'stl:scope',
                        'data-stl-story': attrs.story,
                    });
                    inside.story_ref = true;
                } else {
                    writer.end(tag);
                    inside.story_ref = false;
                }
            }
        }

        function switch_(start, attrs) {
            var tag = inside.paragraph ? 'span' : 'div';
            if (start) {
                if (inside.switcher)
                    return unsupported("stl:switch nesting");
                writer.start(tag, {
                    'data-stl-class': 'stl:switch',
                    'data-stl-xpath': attrs.xpath
                });
                inside.switcher = true;                
            } else {
                inside.switcher = false;
                writer.end(tag);
            }
        }

        function case_(start, attrs) {
            var tag = inside.paragraph ? 'span' : 'div';
            if (start) {
                if (inside.switch_case)
                    return unsupported("stl:case nesting");
                if (!inside.switcher)
                    return unsupported("stl:case outside an stl:switch");
                writer.start(tag, {
                    'data-stl-class': 'stl:case',
                    'data-stl-key': attrs.key,
                    'data-stl-story': attrs.story,
                });
                inside.switch_case = true;                
            } else {
                inside.switch_case = false;
                writer.end(tag);
            }
        }
        
        function repeater_(start, attrs) {
            var tag = inside.paragraph ? 'span' : 'div';
            if (start) {
                if (inside.repeater)
                    return unsupported("stl:repeater nesting");
                writer.start(tag, {
                    'data-stl-class': 'stl:repeater',
                    'data-stl-xpath': attrs.xpath
                });
                inside.repeater = true;
            } else {
                inside.repeater = false;
                writer.end(tag);
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

        function break_(start, attrs) {
            if (start) {
                writer.start('span', {'data-stl-class': 'stl:break'});
                writer.inject('<br/>');
                return stl.empty_checker();
            } else {
                writer.end('span');
            }
        }

        function space_(start, attrs) {
            if (start) {
                writer.inject('&nbsp;');
                return stl.empty_checker();
            }
        }

        function field_(start, attrs) {
            if (start) {
                if (!attrs.xpath)
                    return unsupported("stl:field with no xpath not supported");
                writer.start('span', {
                    'data-stl-class': 'stl:field',
                    'data-stl-xpath': attrs.xpath,
                });
                var data = attrs.sample || attrs.xpath;
                writer.text(data);
                return stl.empty_checker();
            } else {
                writer.end('span');
            }
        }

        function text(data) {
            if (data) {
                switch(inside.paragraph) {
                case undefined:
                    inside.paragraph = true;
                    // intentional fallthrough
                case true:
                    writer.text(data);
                    break;
                case false:
                    if (data.trim()) {
                        return unsupported("text outside paragraph");
                    }
                    break;
                default:
                    throw new Error("Unsupported inside paragraph mode: ", inside.paragraph);
                    break;
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
            break_: break_,
            space_: space_,
            block_: block_,
            scope_: scope_,
            repeater_: repeater_,
            switch_: switch_,
            case_: case_,
            story_: story_,
            field_: field_,
            image_: inline_items.image_,
            table_: inline_items.table_,
            group_: inline_items.group_,
            input_: inline_items.input_,
            text_: inline_items.text_,
            shape_: inline_items.shape_,
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
                    'data-stl-background': attrs.background,
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
        var inside = {};
        var handlers = options.handlers || {};

        function section(name) {
            if (inside.section !== name) {
                if (inside.section)
                    writer.end(inside.section);
                inside.section = name;
                writer.start(name);
            }
        }

        function finalize() {
            if (inside.section) {
                writer.end(inside.section);
            }
        }

        function data_(start, attrs) {
            if (start) {
                inside.data = {
                    template: null,
                    source: { '_default': '<data/>' },
                    rules: {}
                };
            } else {
                if (!handlers.data) {
                    throw new Error("stl::data not supported");
                }
                handlers.data(inside.data);
                inside.data = null;
            }
        }

        function source_(start, attrs) {
            if (start) {
                return stl.xml_accumulator( (markup) => inside.data.source[attrs.key || '_default'] = markup, true);
            }
        }

        function transformation_(start, attrs) {
            if (start) {
                return stl.xml_accumulator( (markup) => inside.data.rules[attrs.key || '_default'] = markup, true);
            }
        }
        
        function template_(start, attrs) {
            if (start) {
                return stl.xml_accumulator( (markup) => inside.data.template = markup, true);
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
            data_: data_,
            source_: source_,
            transformation_: transformation_,
            template_: template_,
            fixtures_: () => {}, // xp:fixture is handled in preprocessor
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
 *      - `handlers` ... object containing other handlers
 *        - `fixture` ... optional callback for stl:fixture stream
 *        - `data` ... optional callback for stl:data hierarchy (source, rules and template) 
 *    - `@return` ... output stream (if provided as `options.output`) or string
 */
exports.stl2html = function stl2html(input, options) {
    input = check_input(input);
    options = check_options(options);
        
    var nsmap = stl.namespace_stack();
    var writer = html_writer(options.indent);
    var builder = html_builder(nsmap, writer, options);
    var parser = stl.parser(nsmap, builder, options);
    parser.write(input).close();
    var output = writer.finalize();
    if (!options.output) {
        return output;  // return the string directly
    }
    options.output.write(output);
    return options.output;
};


