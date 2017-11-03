// Copyright (c) 2017 Open Text. All Rights Reserved.
/*jslint
  bitwise:true
*/

'use strict';

const util = require('util');
const stl = require('stl');

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
    var writer = stl.xml_writer(stl.make_indenter(indent));

    function start(tag, attrs) {
        writer.start(tag, attrs);
    }

    function end(tag) {
        writer.end(tag);
    }

    function text(data) {
        writer.text(data);
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
        finalize: finalize
    };
}

function css_format(css) {
    return Object.keys(css).filter(function (key) {
        return css[key] !== null;
    }).map(function (key) {
        return key + ': ' + css[key];
    }).join('; ');
}

function css_split(style, css) {
    css = css || {};
    if (style) {
        style.trim().split(';').forEach(function(property) {
            var parts = property.trim().split(':');
            if (parts.length === 2) {
                css[parts[0].trim()] = parts[1].trim();
            } else if (parts[0].length) {
                throw new Error("Invalid CSS property: "+parts[0]);
            }
        });
    }
    return css;
}


function html_builder(nsmap, writer, options) {
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

    function handle_resize(css, options) {            
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
            var base = len2pt(css[key]);
            var minkey = 'min-' + key;
            var maxkey = 'max-' + key;
            set_boundary(base, resize2pt(growth), 1, maxkey);
            set_boundary(base, resize2pt(shrink), -1, minkey);
            if (css[minkey] && css[maxkey] && css[minkey] === css[maxkey]) {
                delete css[minkey];
                delete css[maxkey];
            } else {
                delete css[key];
            }
        }

        var resize = css['-stl-shape-resize'] || 'free';
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
                var css = css_split(attrs.style);
                css.height = attrs.h;
                handle_resize(css, {height: true});
                writer.start('tr', {style: css_format(css)});
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
                var css = css_split(attrs.style);
                css.width = widths[cell];
                writer.start('td', {colspan: attrs.colspan, style: css_format(css)});
                return stl.handler_dispatcher(nsmap, story_builder(writer));
            } else {
                cell += 1;
                writer.end('td');
            }
        }

        return { 
            story_: () => {},
            row_: row_,
            cell_: cell_,
            repeater_: () => unsupported("stl:repeater"),
            text: unexpected_text,
            finalize: () => {}
        };
    }
    
    function story_builder(writer) {
        var inside = {};

        function css_classes(cls1, cls2) {
            if (cls1) {
                if (cls2) {
                    return cls1 + ' ' + cls2;
                }
                return cls1;
            } else if (cls2) {
                return cls2;
            }
        }
        
        function block_(start, attrs) {
            if (start) {
                writer.start('div', {'class': css_classes('stl-block', attrs['class']), style: attrs.style});
            } else {
                writer.end('div');
            }
        }

        function p_(start, attrs) {
            if (start) {
                writer.start('div', {'class': css_classes('stl-p', attrs['class']), style: attrs.style});
                inside.paragraph = true;
            } else {
                writer.end('div');
                inside.paragraph = false;
            }
        }

        function story_(start, attrs) {
            if (start) {
                if (inside.object)
                    return stl.handler_dispatcher(nsmap, story_builder(writer));
                if (!inside.hyperlink)
                    return unsupported("stl:story nesting");
            }
        }
        
        function scope_(start, attrs) {
            if (start) {
                if (!attrs.hyperlink)
                    return unsupported("stl:scope");
                if (inside.hyperlink)
                    return unsupported("stl:scope nesting");
                writer.start('a', {href: attrs.hyperlink});
                inside.hyperlink = true;
            } else {
                inside.hyperlink = false;
                writer.end('a');
            }
        }
        
        function span_(start, attrs) {
            if (start) {
                writer.start('span', {'class': css_classes('stl-span', attrs['class']), style: attrs.style});
            } else {
                writer.end('span');
            }
        }

        function image_(start, attrs) {
            if (start) {
                writer.start('img', {'class': css_classes('stl-image', attrs['class']), width: attrs.w, height: attrs.h, src: attrs.src});
                return stl.empty_checker();
            } else {
                writer.end('img');
            }
        }
        
        function table_(start, attrs) {
            if (start) {
                writer.start('table', {'class': css_classes('stl-table', attrs['class']), style: attrs.style});
                return stl.handler_dispatcher(nsmap, table_builder(writer));
            } else {
                writer.end('table');
            }
        }

        function text_(start, attrs) {
            if (start) {
                if (attrs.story)
                    return unsupported("stl:story reference");
                var css = css_split(attrs.style);
                css.display = 'inline-block';
                css['box-sizing'] = 'border-box';
                css.width = attrs.w;
                css.height = attrs.h;
                handle_resize(css);
                css.transform = attrs.transform;
                writer.start('div', {'class': 'stl-wrap', style: 'display: inline-block; vertical-align: text-bottom'});
                writer.start('div', {'class': css_classes('stl-text', attrs['class']), style: css_format(css)});
                inside.object = true;
            } else {
                writer.end('div');
                writer.end('div');
                inside.object = false;
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
        }

        return { 
            p_: p_,
            span_: span_,
            block_: block_,
            scope_: scope_,
            story_: story_,
            image_: image_,
            table_: table_,
            text_: text_,
            field_: () => unsupported("stl:field"),
            chart_: () => unsupported("stl:chart"),
            fragment_: () => unsupported("stl:fragment"),
            script_: () => unsupported("stl:script"),
            text: text, 
            finalize: finalize
        };
    }

    function doc_builder(writer) {
        function story_(start, attrs) {
            if (start) {
                return stl.handler_dispatcher(nsmap, story_builder(writer));
            }
        }
        
        return { 
            story_: story_,
            page_: () => unsupported("stl:page"),
            text: unexpected_text, 
            finalize: () => {}
        };
    }
    
    function root_builder(writer) {
        function document_(start, attrs) {
            if (start) {
                writer.start('body');
                return stl.handler_dispatcher(nsmap, doc_builder(writer));
            } else {
                writer.end('body');
            }
        }

        function style_(start, attrs) {
            if (start) {
                writer.start('head');
                if (attrs.src) {
                    writer.start('link', {rel: 'stylesheet', type: 'text/css', href: attrs.src});
                    writer.end('link');
                } else {
                    writer.start('style');
                    return stl.text_accumulator(function(css) {
                        writer.text(css);
                        writer.end('style');
                    });
                }
            }
            else {
                writer.end('head');
            }
        }
        
        return {
            stl_: () => {},
            data_: () => unsupported("stl:data"), 
            fixtures_: () => unsupported("stl:fixtures"),
            style_: style_,
            document_: document_,
            text: unexpected_text, 
            finalize: () => {}
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


