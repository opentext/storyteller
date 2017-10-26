// Copyright (c) 2017 Open Text. All Rights Reserved.
/*jslint
  bitwise:true
*/

'use strict';

const util = require('util');
const stl = require('stl');
const defs = require('empower.json');
const enums = defs.enums;

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
// JSON -> STL
//
/////////////////////////////////////////////////////////////////////////////////////////////////////

function make_indenter(indent, default_indent) {
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
    var attr_escape = stl.xml_escaper(/[<&"]/g);
    var text_escape = stl.xml_escaper(/[<&]/g);
    
    function format_start(tag, attrs) {
        attrs = attrs || {};
        var result = '<' + tag;
        var keys = Object.keys(attrs);
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
        'xmlns:stl': stl.namespaces.stl,
        version: stl.version
    };
    start('stl', attrs);
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

function css_converter(resolution, options) {

    function convert_color(col, map_black_as_null) {
        function hex(d) {
            return ('0' + (d.toString(16))).slice(-2).toUpperCase();
        }

        if (col.m_eColorModel !== 0) {
            throw new Error("Unsupported color model: " + col.m_eColorModel);
        }
        var r = col.m_lColor & 0xff;
        var g = (col.m_lColor >> 8) & 0xff;
        var b = (col.m_lColor >> 16) & 0xff;
        return (map_black_as_null && !r && !b && !g)
            ? null
            : '#' + hex(r) + hex(g) + hex(b);
    }

    function convert_length(v) {
        return v / resolution + 'in';
    }

    function convert_pos(rect, attrs) {
        attrs = attrs || {};
        if (rect.left) {
            attrs.x = convert_length(rect.left);
        }
        if (rect.top) {
            attrs.y = convert_length(rect.top);
        }
        return attrs;
    }

    function convert_dim(rect, attrs) {
        attrs = attrs || {};
        if (rect.right) {
            attrs.w = convert_length(rect.right - rect.left);
        }
        if (rect.bottom) {
            attrs.h = convert_length(rect.bottom - rect.top);
        }
        return attrs;
    }

    function convert_bbox(rect, attrs) {
        attrs = attrs || {};
        convert_pos(rect, attrs);
        convert_dim(rect, attrs);
        return attrs;
    }

    function convert_rowbox(row, attrs) {
        attrs = attrs || {};
        attrs.h = convert_length(row.m_iHeight);
        if (!row.m_bFixedSize) {
            var css = {
                '-stl-shape-resize': 'free 0pt max 0pt max'
            };
            attrs.style = css_format(css);
        }
        return attrs;
    }

    function css_reset() {
        return {
            'font-family': null,
            'font-size': null,
            'font-weight': null,
            'font-style': null,
            'text-decoration': null,
            'text-align': null,
            'margin-left': null,
            'margin-right': null,
            'margin-top': null,
            'margin-bottom': null,
            'padding-left': null,
            'padding-right': null,
            'padding-top': null,
            'padding-bottom': null,
            'border': null,
            'border-top': null,
            'border-right': null,
            'border-bottom': null,
            'border-left': null,
            'fill': null,
            '-stl-list-counter': null,
            '-stl-list-mask': null,
            '-stl-list-level': null,
            '-stl-tabs': null,
            '-stl-shape-resize': null,
            '-stl-alignment': null
            // handled specially (@todo fixit)
            // 'color': null,
            // 'vertical-align': null
        };
    }

    function convert_parstyle(ps, css) {
        css = css || css_reset();
        var alignments = ['left', 'right', 'center', 'justify'];
        if (ps.iJustification) {
            css['text-align'] = alignments[ps.iJustification];
        }
        if (ps.iFirstIndent) {
            css['text-indent'] = convert_length(ps.iFirstIndent);
        }
        if (ps.iLeftIndent) {
            css['margin-left'] = convert_length(ps.iLeftIndent);
        }
        if (ps.iRightIndent) {
            css['margin-right'] = convert_length(ps.iRightIndent);
        }
        if (ps.iSpaceBefore) {
            css['margin-top'] = convert_length(ps.iSpaceBefore);
        }
        if (ps.iSpaceAfter) {
            css['margin-bottom'] = convert_length(ps.iSpaceAfter);
        }
        if (ps.eSpacing) {
            if (ps.eSpacing !== enums.linespacing.EXACT) {
                throw new Error("Unsupported line spacing mode: " + ps.eSpacing);
            }
            css['line-height'] = convert_length(ps.iSpaceBetween);
        }
        var level;
        var format;
        switch (ps.iNumbering) {
        case enums.list.NONE:
            break;
        case enums.list.BULLETS:
            level = ps.iNumberIndent - 1;
            format = enums.defaults.bullets[level % 3];
            css['-stl-list-mask'] = format + '\\9';
            css['-stl-list-level'] = level;
            css['-stl-tabs'] = convert_length(250 * (level + 1));
            css['margin-left'] = convert_length(250 * level);
            break;
        case enums.list.NUMBERING:
            level = ps.iNumberIndent - 1;
            format = enums.numbering[ps.eNumberType];
            if (format === undefined) {
                throw new Error("Unknown eNumberType: " + ps.eNumberType);
            }
            css['-stl-list-counter'] = 'default_counter';
            css['-stl-list-mask'] = '%' + level + '!' + format + '\\9';
            css['-stl-list-level'] = level;
            css['-stl-tabs'] = convert_length(250 * (level + 1));
            css['margin-left'] = convert_length(250 * level);
            break;
        default:
            throw new Error('Unsupported numbering mode: ' + ps.iNumbering);
        }
        return css;
    }

    function convert_charstyle(cs, css) {
        css = css || css_reset();
        css['font-family'] = options.maps.font(cs.strName);
        css['font-size'] = cs.iFontHeight10X / 10 + 'pt';
        if (cs.bBold) {
            css['font-weight'] = 'bold';
        }
        if (cs.bItalic) {
            css['font-style'] = 'italic';
        }
        if (cs.bUnderline) {
            css['text-decoration'] = 'underline';
        }
        if (cs.bStrikeThru) {
            css['text-decoration'] = 'line-through';
        }
        return css;
    }

    function convert_pen(thickness, style, color) {
        function pen_style(src) {
            var key = getKeyByValue(enums.pen, src);
            if (!key) {
                throw new Error('Unsupported pen style: ' + src);
            }
            return key.toLowerCase();
        }

        thickness = thickness
            ? convert_length(thickness)
            : '1px';
        return thickness + ' ' + pen_style(style) + ' ' + convert_color(color);
    }

    function convert_padding(draw, css) {
        css = css || css_reset();
        if (draw.m_iLeftMargin) {
            css['padding-left'] = convert_length(draw.m_iLeftMargin);
        }
        if (draw.m_iRightMargin) {
            css['padding-right'] = convert_length(draw.m_iRightMargin);
        }
        if (draw.m_iTopMargin) {
            css['padding-top'] = convert_length(draw.m_iTopMargin);
        }
        if (draw.m_iBottomMargin) {
            css['padding-bottom'] = convert_length(draw.m_iBottomMargin);
        }
        return css;
    }

    function convert_item_style(draw, css) {
        css = css || css_reset();
        if (draw.m_bPen === true) {
            css.border = convert_pen(draw.m_iPenWidth, draw.m_iPenStyle, draw.m_clrPen);
        }
        if (draw.m_bBackGroundTransparent === false) {
            css.fill = convert_color(draw.m_clrBackGround);
        }
        convert_padding(draw, css);
        if (draw.m_bAutoSizeX || draw.m_bAutoSizeY) {
            var x = draw.m_bAutoSizeX
                ? 'max'
                : '0pt';
            var y = draw.m_bAutoSizeY
                ? 'max'
                : '0pt';
            css['-stl-shape-resize'] = ['free', x, y, x, y].join(' ');
        }
        switch (draw.m_eVertJust) {
        case undefined:
        case enums.valign.TOP:
            css['-stl-alignment'] = null;
            break;
        case enums.valign.CENTER:
            css['-stl-alignment'] = 'vertical 0.5';
            break;
        case enums.valign.BOTTOM:
            css['-stl-alignment'] = 'vertical 1';
            break;
        default:
            throw new Error("Unsupported vertical justification: " + draw.m_eVertJust);
        }
        return css;
    }

    function convert_cell_border(cell, row, column, css) {
        css = css || css_reset();
        if (row.m_iLineAbove !== -1) {
            css['border-top'] = convert_pen(row.m_iWeightAbove, row.m_iLineAbove, row.m_clrAbove);
        }
        if (row.m_iLineBelow !== -1) {
            css['border-bottom'] = convert_pen(row.m_iWeightBelow, row.m_iLineBelow, row.m_clrBelow);
        }
        if (column.m_iLineLeft !== -1) {
            css['border-left'] = convert_pen(column.m_iWeightLeft, column.m_iLineLeft, column.m_clrLeft);
        }
        if (column.m_iLineRight !== -1) {
            css['border-right'] = convert_pen(column.m_iWeightRight, column.m_iLineRight, column.m_clrRight);
        }
        cell.m_FrameSegShape.m_ppSegments.forEach(function (segment) {
            if (segment.m_estType === 1 && segment.m_bVisible) {
                var pen = convert_pen(segment.m_iLineWeight, segment.m_iLineStyle, segment.m_clrLine);
                switch (segment.m_elpPosition) {
                case enums.segmentpos.TOP:
                    css['border-top'] = pen;
                    break;
                case enums.segmentpos.RIGHT:
                    css['border-right'] = pen;
                    break;
                case enums.segmentpos.BOTTOM:
                    css['border-bottom'] = pen;
                    break;
                case enums.segmentpos.LEFT:
                    css['border-left'] = pen;
                    break;
                default:
                    // is it a mask?
                    throw new Error("Unsupported segment position: " + segment.m_elpPosition);
                }
            }
        });
        return css;
    }

    return {
        length: convert_length,
        pos: convert_pos,
        dim: convert_dim,
        bbox: convert_bbox,
        rowbox: convert_rowbox,
        color: convert_color,
        parstyle: convert_parstyle,
        charstyle: convert_charstyle,
        item_style: convert_item_style,
        cell_border: convert_cell_border
    };
}

function content_inserter(writer) {
    const states = {
        CLOSED: 0,
        CACHED: 1,
        OPEN: 2
    };
    var style = {
        state: states.CLOSED,
        css: {}
    };
    var blackspace = null;
    var paragraph = null;

    function padding() { // generate empty span to avoid whitespace trim
        writer.start('span');
        writer.end('span');
    }

    function flush() {
        if (blackspace === false && paragraph) {
            padding();
        }
        if (style.state === states.OPEN) {
            writer.end('span');
        }
        style.state = states.CACHED;
    }

    function style_change(css) {
        var modified = false;
        Object.keys(css).forEach(function (key) {
            var value = css[key];
            if (style.css[key] !== value) {
                style.css[key] = value;
                modified = true;
            }
        });
        if (modified) {
            flush();
        }
    }

    function push(tag, attrs) {
        flush();
        blackspace = null;
        writer.start(tag, attrs);
    }

    function pop(tag) {
        flush();
        writer.end(tag);
    }

    function paragraph_start(css) {
        if (paragraph === true) {
            throw new Error("Paragraph nesting not supported");
        }
        push('p', {style: css_format(css)});
        paragraph = true;
    }

    function paragraph_end() {
        if (paragraph === null) {
            return;
        }
        if (paragraph === false) {
            throw new Error("Paragraph already closed");
        }
        pop('p');
        paragraph = false;
    }

    function character(ch) {
        if (style.state === states.CACHED) {
            writer.start('span', {style: css_format(style.css)});
            style.state = states.OPEN;
            blackspace = null;
        }

        if (/\s/.test(ch)) {
            if (!blackspace) {
                padding();
            }
            blackspace = false;
        } else {
            blackspace = true;
        }
        writer.text(ch);
    }

    return {
        style_change: style_change,
        paragraph_start: paragraph_start,
        paragraph_end: paragraph_end,
        character: character,
        push: push,
        pop: pop
    };
}

function build_stl(contents, writer, options) {
    var converter = css_converter(contents.m_lResolution, options);

    var convert_object;

    function var_args(id) {
        function find_var(resources, id) {
            return resources
                ? resources.resourcePack.variables.find((v) => v.m_oi === id)
                : null;
        }
        
        var variable = find_var(options.resources, id);
        if (variable) {
            return { xpath: options.maps.xpath('string($' + variable.m_strName + ')'), sample: variable.nickname };
        }
        var name = 'empower_variable_' + id;
        return { xpath: options.maps.xpath('string($' + name + ')') };
    }
    
    function convert_content(draw, inserter) {
        inserter = inserter || content_inserter(writer);
        draw.m_cChars.forEach(function (code, index) {
            var cmd = draw.m_sXPos[index];
            var id = draw.m_sXPos[index + 1];
            switch (cmd) {
            case enums.content.VARIABLE_START:
                inserter.push('field', var_args(id));
                break;
            case enums.content.VARIABLE_END:
            inserter.pop('field');
                break;
            case enums.content.HYPERLINK_START:
                inserter.push('scope', {'hyperlink': draw.m_Links[id].msLink});
                inserter.push('story');
                break;
            case enums.content.OBJECT_START:
                convert_object(draw.m_Objs[id].m_iObjType, draw.m_pObjs[id], inserter);
                break;
            case enums.content.PARAGRAPH_BREAK:
                inserter.paragraph_end();
                inserter.paragraph_start(converter.parstyle(draw.m_ParaValues[id]));
                break;
            case enums.content.SUPERSCRIPT_START:
                inserter.style_change({'vertical-align': 'super'});
                break;
            case enums.content.SUBSCRIPT_START:
                inserter.style_change({'vertical-align': 'sub'});
                break;
            case enums.content.HYPERLINK_END:
                inserter.pop('story');
                inserter.pop('scope');
                break;
            case enums.content.OBJECT_END:
                break;
            case enums.content.CONTENT_END:
                inserter.paragraph_end();
                break;
            case enums.content.COLOR_CHANGE:
                inserter.style_change({'color': converter.color(draw.m_Colors[code], true)});
                break;
            case enums.content.FONT_CHANGE:
                inserter.style_change(converter.charstyle(draw.m_TextFonts[code]));
                break;
            case enums.content.SUBSCRIPT_END:
            case enums.content.SUPERSCRIPT_END:
                inserter.style_change({'vertical-align': null});
                break;
            default:
                if (cmd >= 0 && code > 0) {
                    inserter.character(String.fromCharCode(code));
                }
                break;
            }
        });
    }

    function convert_table(draw, inserter) {
        function convert_row(row, r) {
            inserter.push('row', converter.rowbox(row));
            draw.m_Columns.forEach(function (column, c) {
                var cell = draw.m_Cells.find(function (cell) {
                    return cell.m_iColumn === c && cell.m_iRow === r;
                });
                var attrs = {};
                if (r === 0) {
                    attrs.w = converter.length(column.m_iWidth);
                }
                var css = converter.item_style(cell.m_pTextDraw);
                converter.cell_border(cell, row, column, css);
                attrs.style = css_format(css);
                inserter.push('cell', attrs);
                convert_content(cell.m_pTextDraw);
                inserter.pop('cell');
            });
            inserter.pop('row');
        }

        // we do not convert table width & height, we convert row/column dimensions instead
        var attrs = converter.pos(draw.m_rectPosition);
        var css = converter.item_style(draw);
        attrs.style = css_format(css);
        inserter.push('table', attrs);
        inserter.push('story');
        draw.m_Rows.forEach(convert_row);
        inserter.pop('story');
        inserter.pop('table');
    }

    function convert_image(draw, inserter) {
        var attrs = converter.bbox(draw.m_rectPosition);
        var uri = 'cas:' + draw.m_pDbBitmap.m_strCASId;
        attrs.src = options.maps.uri(uri);
        inserter.push('image', attrs);
        inserter.pop('image');
    }

    function convert_text(draw, inserter) {
        var attrs = converter.bbox(draw.m_rectPosition);
        var css = converter.item_style(draw);
        attrs.style = css_format(css);
        inserter.push('text', attrs);
        inserter.push('story');
        convert_content(draw);
        inserter.pop('story');
        inserter.pop('text');
    }

    convert_object = function (type, draw, inserter) {
        inserter = inserter || content_inserter(writer);
        switch (type) {
        case enums.item.TABLE:
            convert_table(draw, inserter);
            break;
        case enums.item.IMAGE:
            convert_image(draw, inserter);
            break;
        case enums.item.TEXT:
            convert_text(draw, inserter);
            break;
        default:
            throw new Error("Unsupported object type: " + type);
        }
    };

    function convert_text_message(contents) {
        var draw = contents.m_pTextDraw;
        var attrs = converter.bbox(draw.m_rectPosition);
        writer.start('story', {name: 'Main', w: attrs.w});
        convert_content(draw);
        writer.end('story');
        if (options.page) {
            writer.start('page', attrs);
            var css = converter.item_style(draw);
            attrs.style = css_format(css);
            attrs.story = 'Main';
            writer.start('text', attrs);
            writer.end('text');
            writer.end('page');
        }
    }

    function convert_canvas_message(contents) {
        var attrs = {
            w: converter.length(contents.m_lWidth),
            h: converter.length(contents.m_lHeight)
        };
        writer.start('page', attrs);
        contents.m_DrawFront.forEach(function (obj) {
            convert_object(obj.m_eComponentType, obj.m_pDrawObj);
        });
        writer.end('page');
    }

    writer.start('document');

    if (contents.m_bTextOnly) {
        convert_text_message(contents);
    } else {
        convert_canvas_message(contents);
    }
    writer.end('document');    
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
//
// STL -> JSON
//
/////////////////////////////////////////////////////////////////////////////////////////////////////

function css2rgb(input) {
    var m = input.match(/^#([0-9a-f]{3})$/i);
    if(m) {
        // in three-character format, each value is multiplied by 0x11 to give an
        // even scale from 0x00 to 0xff
        return [
            parseInt(m[1].charAt(0),16)*0x11,
            parseInt(m[1].charAt(1),16)*0x11,
            parseInt(m[1].charAt(2),16)*0x11
        ];
    }

    m = input.match(/^#([0-9a-f]{6})$/i);
    if(m) {
        return [
            parseInt(m[1].substr(0,2),16),
            parseInt(m[1].substr(2,2),16),
            parseInt(m[1].substr(4,2),16)
        ];
    }

    m = input.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
    if(m) {
        return [m[1],m[2],m[3]];
    }

    // @todo: color names, rgba, hsl, ...
    throw new Error("Unsupported color format: " + input);
}

function json_factory(options) {
    var id = 0;
    var factory = initialize();
    var resolution = options.resolution || 1000;
    var multipliers = {
        'pt': 1,
        'px': 72/96,
        'in': 72,
        'pc': 72/6,
        'mm': 72/25.4,
        'cm': 72/2.54
    };
    
    function convert_length(len, scale) {
        scale = scale || resolution/72;
        var matches = /([0-9\.]+)(pt|px|in|pc|mm|cm|em|%)/.exec(len);
        if (!matches)
            throw new Error("Invalid length: " + len);
        var multiplier = multipliers[matches[2]];
        if (!multiplier)
            throw new Error("Unsupported unit: " + matches[2]);
        return Math.round(parseFloat(matches[1]) * multiplier * scale);
    }

    function convert_bbox(attrs) {
        var x = convert_length(attrs.x || '0in');
        var y = convert_length(attrs.y || '0in');
        var w = convert_length(attrs.w || '1in');
        var h = convert_length(attrs.h || '1in');
        return {
            left: x,
            right: x+w,
            top: y,
            bottom: y+h
        };
    }

    function is_autosize(css) {
        var result = [false, false];
        if (css['-stl-shape-resize']) {
            var mode = css['-stl-shape-resize'].split(' ');
            if (mode[0] === 'free') {
                result[0] = (mode.length === 1) || (mode[1] === 'max');
                result[1] = (mode.length === 1) || (mode[2] === 'max');
            }
        }
        return result;
    }

    function initialize() {
        if (!json_factory.cache) {
            var factory = defs.factory;
            var instance = {};
            Object.keys(factory).forEach(function(key) {
                var src = null;
                instance[key] = function clone() {
                    if (src == null) {
                        src = JSON.stringify(factory[key]);
                    }
                    return JSON.parse(src);
                };
            });
            json_factory.cache = instance;
        }
        return json_factory.cache;
    }
        
    function color(css_color) {
        var rgb = css2rgb(css_color || '#000');
        var c = factory.color();
        c.m_lColor = rgb[0] | (rgb[1] << 8) | (rgb[2] << 16);
        return c;
    }
    
    function font(css) {
        css = css || {};
        var f = factory.font();
        f.clrFontColor = color();
        f.strName = options.maps.font(css['font-family'] || "Lato");
        f.iFontHeight10X = convert_length(css['font-size'] || '10pt', 10);
        f.bBold = css['font-weight'] === 'bold';
        f.bItalic = css['font-style'] === 'italic';
        f.bUnderline = css['text-decoration'] === 'underline';
        f.bStrikeThru = css['text-decoration'] === 'line-through';
        return f;
    }
    
    function paragraph(css) {
        function convert_prop(property, par, key) {
            if (property) {
                par[key] = convert_length(property);
            }
        }
        function get_numbering_type(level, mask) {
            if (mask) {
                var match = /%\d!(.+)\\9/.exec(mask);
                var mask = match
                    ? match[1]
                    : enums.defaults.numberings[level];
                var type = getKeyByValue(enums.numbering, mask);
                if (type) {
                    return +type;
                }
            }
            throw new Error("XXX Unsupported numbering mask: " + mask);
        }
        
        var p = factory.paragraph();
        p.iDefaultTab = resolution/4;
        p.iBulletFont = -1;
        
        var alignments = ['left', 'right', 'center', 'justify'];
        var align = alignments.indexOf(css['text-align']);
        if (align !== -1)
            p.iJustification = align;
        convert_prop(css['text-indent'], p, 'iFirstIndent');
        convert_prop(css['margin-left'], p, 'iLeftIndent');
        convert_prop(css['margin-right'], p, 'iRightIndent');
        convert_prop(css['margin-top'], p, 'iSpaceBefore');
        convert_prop(css['margin-bottom'], p, 'iSpaceAfter');
        if (css['line-height'] !== undefined) {
            p.eSpacing = enums.linespacing.EXACT;
            p.iSpaceBetween = convert_length(css['line-height']);
        }
        
        if (css['-stl-list-level']) {
            var level = parseInt(css['-stl-list-level']);
            p.iNumberIndent = level + 1;
            p.iLeftIndent += p.iDefaultTab;
            p.bUserSetType = false;
            p.iNumberColor = 0;
            p.eUserSetNumber = 0;
            if (css['-stl-list-counter']) {
                p.iNumbering = enums.list.NUMBERING;
                p.bUserSetColor =  false;
                p.eNumberType = get_numbering_type(level, css['-stl-list-mask']);
            } else {
                p.iNumbering = enums.list.BULLETS;
                p.iBulletFont = 2;
                p.pszNumberString = 168;
            }
        } else {
            p.iNumbering = enums.list.NONE;
        }
        Object.keys(p).forEach(function (key) {
            if (p[key] === null) {
                delete p[key];
            }
        });
        return p;
    }

    function link(attrs) {
        var l = factory.link();
        l.msLink = attrs.hyperlink;
        return l;
    }
    
    function objref(type) {
        var r = factory.objref();
        r.m_iObjType = type;
        return r;
    }
    
    function textprops() {
        return factory.textprops();
    }

    function varprops() {
        var vp = factory.varprops();
        vp.clrFrameLine = color();
        return vp;
    }
    
    function tableprops() {
        var p = factory.tableprops();
        p.m_eEditChangeType = 1;
        p.m_bCanChangeFormat = true;
        p.m_bCanType = true;
        p.m_eTextField = 3;
        p.m_ePromptType = 1;
        p.m_FormFieldInfoLocal.m_clrLine = color();
        p.m_FormFieldInfoLocal.m_clrFill = color('#c4c4c4');
        p.m_iTabOrderID = 3;
        return p;
    }

    function columnprops() {
        var p = factory.tableprops();
        p.m_eEditChangeType = 0;
        p.m_bCanChangeFormat = false;
        p.m_bCanType = false;
        p.m_eTextField = 0;
        p.m_ePromptType = 0;
        p.m_FormFieldInfoLocal.m_clrLine = color();
        p.m_FormFieldInfoLocal.m_clrFill = color('#c4c4c4');
        p.m_iTabOrderID = 0;
        return p;
    }
    
    function rowprops() {
        return columnprops();
    }
    
    function image(attrs) {
        id += 2;
        var img = factory.image();
        var uri = options.maps.uri(attrs.src);
        var casid = uri.replace(/^(cas:)/,'');
        var draw = img.m_pDrawObj;
        draw.m_oiID = id-1;
        draw.m_UNITSPERINCH = resolution;
        draw.m_pDbBitmap.m_oiDB = id-2;
        draw.m_pDbBitmap.m_strCASId = casid; 
        draw.m_rectPosition = convert_bbox(attrs);
        return img;
    }

    function convert_pen(border) {
        var parts = border.split(' ');
        var style = enums.pen[parts[1].toUpperCase()];
        if (style === undefined) {
            throw new Error("Unsupported pen style: " + parts[1]);
        }
        var result = {
            style: style,
            color: color(parts[2])
        };
        if (parts[0] !== '1px') { // handle thickness device dependent specially (@todo fixme)
            result.thickness = convert_length(parts[0]);
        }
        return result;
    }
    
    function apply_item_style(draw, css) {        
        function convert_alignment(alignment) {
            if (!alignment) {
                return enums.valign.TOP;
            }
            var parts = alignment.split(' ');
            if (parts[0] === 'vertical') {
                switch (+(parts[1])) {
                case 0:
                    return enums.valign.TOP;
                case 0.5:
                    return enums.valign.CENTER;
                case 1:
                    return enums.valign.BOTTOM;
                }
            }
            throw new Error("Unsupported alignment: ", alignment);
        }

        if (css.border) {
            var pen = convert_pen(css.border);
            draw.m_iPenWidth = pen.thickness;
            draw.m_iPenStyle = pen.style;
            draw.m_clrPen = pen.color;
            draw.m_bPen = true;
        }
        if (css.fill) {
            draw.m_clrBackGround = color(css.fill);
            draw.m_bBackGroundTransparent = false;
        }
        if (css['padding-left']) {
            draw.m_iLeftMargin = convert_length(css['padding-left']);
        }
        if (css['padding-right']) {
             draw.m_iRightMargin = convert_length(css['padding-right']);
        }
        if (css['padding-top']) {
             draw.m_iTopMargin = convert_length(css['padding-top']);
        }
        if (css['padding-bottom']) {
             draw.m_iBottomMargin = convert_length(css['padding-bottom']);
        }
        var as = is_autosize(css);
        draw.m_bAutoSizeX = as[0];
        draw.m_bAutoSizeY = as[1];
        draw.m_eVertJust = convert_alignment(css['-stl-alignment']);
    }

    function apply_cell_borders(shape, css) {
        function convert_edge(border, pos) {
            var edge = factory.cell_edge();
            edge.m_elpPosition = pos;
            if (border) {
                var pen = convert_pen(border);
                edge.m_iLineWeight = pen.thickness;
                edge.m_iLineStyle = pen.style;
                edge.m_clrLine = pen.color;
                edge.m_bVisible = true;
            } else {
                edge.m_iLineWeight = 0;
                edge.m_iLineStyle = enums.pen.SOLID;
                edge.m_clrLine = color();
                edge.m_bVisible = false;
            }
            return edge;
        }

        function convert_corner(pos) {
            var corner = factory.cell_corner();
            corner.m_iLineStyle = enums.pen.SOLID;
            corner.m_iLineWeight = 0;
            corner.m_clrLine = color();
            corner.m_ecpCorner = 2;
            return corner;
        }
        
        var segments = shape.m_ppSegments;
        segments.push(convert_corner(enums.segmentpos.TOP));
        segments.push(convert_edge(css['border-top'], enums.segmentpos.TOP));
        segments.push(convert_corner(enums.segmentpos.RIGHT));
        segments.push(convert_edge(css['border-right'], enums.segmentpos.RIGHT));
        segments.push(convert_corner(enums.segmentpos.BOTTOM));
        segments.push(convert_edge(css['border-bottom'], enums.segmentpos.BOTTOM));
        segments.push(convert_corner(enums.segmentpos.LEFT));
        segments.push(convert_edge(css['border-left'], enums.segmentpos.LEFT));
    }
    
    function text(attrs, css) {        
        id += 1;
        var txt = factory.text();
        var draw = txt.m_pDrawObj;
        draw.m_oiID = id-1;
        draw.m_rectPosition = convert_bbox(attrs);
        draw.m_pEditableProps = textprops();
        draw.m_UNITSPERINCH = resolution,
        draw.m_iLogicalRes = resolution,
        draw.m_iDesignRes = resolution,
        draw.m_clrPen = color();
        draw.m_iMaxWidthDes = (draw.m_rectPosition.right - draw.m_rectPosition.left);
        draw.m_Colors.push(color());
        draw.m_Colors.push(color('#00ffc0'));
        draw.m_Colors.push(color('#f00'));
        apply_item_style(draw, css);
        return txt;
    }

    function column(attrs) {
        var col = factory.column();
        col.m_iWidth = convert_length(attrs.w);
        col.m_clrLeft = color();
        col.m_clrRight = color();
        col.m_pEditableProps = columnprops();
        return col;
    }

    function row(attrs, css) {
        var row = factory.row();
        row.m_iHeight = convert_length(attrs.h);
        row.m_clrAbove = color();
        row.m_clrBelow = color();
        row.m_colorLegend = color();
        row.m_pEditableProps = rowprops();
        var as = is_autosize(css);
        row.m_bFixedSize = !(as[0] || as[1]);
        return row;
    }

    function cell(css, c, r, width, height) {
        id += 1;
        var draw = factory.text().m_pDrawObj;
        draw.m_oiID = id-1;
        draw.m_bAutoSizeX = false;
        draw.m_bAutoSizeY = false;
        draw.m_rectPosition.left = 0;
        draw.m_rectPosition.top = 0;
        draw.m_rectPosition.right = width;
        draw.m_rectPosition.bottom = height;
        draw.m_pEditableProps = textprops();
        draw.m_UNITSPERINCH = resolution,
        draw.m_iLogicalRes = resolution,
        draw.m_iDesignRes = resolution,
        draw.m_clrPen = color();
        draw.m_iMaxWidthDes = width;
        draw.m_Colors.push(color());
        draw.m_Colors.push(color('#00ffc0'));
        draw.m_Colors.push(color('#f00'));
        apply_item_style(draw, css);

        var cell = factory.cell();
        cell.m_pTextDraw = draw;
        cell.m_iColumn = c;
        cell.m_iRow = r;
        apply_cell_borders(cell.m_FrameSegShape, css);
        
        return cell;
    }
    
    function table(attrs, css) {
        id += 1;
        var tbl = factory.table();
        var draw = tbl.m_pDrawObj;
        draw.m_oiID = id;
        draw.m_rectPosition = convert_bbox(attrs);
        draw.m_UNITSPERINCH = resolution;
        draw.m_clrPen = color();
        draw.m_clrBrushFill = color('#00c0c0');
        draw.m_clrShadow = color('#00c0c0');
        draw.m_pEditableProps = tableprops();
        draw.m_colorLegendFrame = color();
        apply_item_style(draw, css);
        return tbl;
    }

    function canvas(root, template_id, attrs) {
        const width = convert_length(attrs.w);
        const height = convert_length(attrs.h);
        root.m_ePageType = 1;
        root.m_Size.width = width;
        root.m_Size.height = height;
        root.m_scopedMessageTemplate = template_id;
        delete root.m_oi;
        delete root.m_scopedMessageType;
        delete root.m_bCanSplitText;
        delete root.m_iWidowOrphan;
        delete root.m_bRenumberText;
        delete root.m_lBottomFlowMargin;
        delete root.m_lTopFlowMargin ;
        root.contents = factory.canvas();
        root.contents.m_lResolution = resolution;
        root.contents.m_lWidth = width;
        root.contents.m_lHeight = height;
        root.contents.m_lGrowMaxY = height;
        root.contents.m_lTopMargin = 0;
        root.contents.m_lBottomMargin = 0;
        return root.contents;
    }

    function content(root, template_id, attrs) {
        const css = {
            '-stl-shape-resize': 'free 0pt max 0pt max',
        };
        root.m_oi = 0;
        root.m_ePageType = 0;
        root.m_scopedMessageType = template_id;
        delete root.m_Size;
        delete root.m_scopedMessageTemplate;
        root.contents = factory.content();
        root.contents.m_lResolution = resolution;
        root.contents.m_pTextDraw = text(attrs, css).m_pDrawObj;
        root.rule = null;
        return root.contents;
    }

    function root() {
        var r = factory.root();
        r.m_iDesignResolution = resolution;
        return r;
    }
    
    return {
        color: color,
        font: font,
        paragraph: paragraph,
        link: link,
        varprops: varprops,
        objref: objref,
        image: image,
        text: text,
        table: table,
        row: row,
        column: column,
        cell: cell,
        content: content,
        canvas: canvas,
        root: root
    };
}

function json_builder(nsmap, factory, root, options) {
    const unsupported = function (item) {
        var message = "Unsupported " + item;
        if (options.permissive) {
            console.error(message + " (ignored)");
            return stl.ignorant();
        }
        throw new Error(message);
    };
    const unexpected = function(tag, what) {
        var message = "Unexpected " + text + " inside " + tag;
        if (options.permissive) {
            console.error(message + " (ignored)");
        }
        throw new Error(message);
    }
    
    function unexpected_text(data) {
        if (data.trim())
            unexpected("stl:stl", "text");
    }

    function clone_css(css) {
        return JSON.parse(JSON.stringify(css));
    }
    function split_css(style, css) {
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
    
    function table_builder(draw) {
        var columns = [];
        var rows = [];
        var cells = [];
        var column = 0;
            
        function row_(start, attrs) {
            if (start) {
                column = 0;
                var css = split_css(attrs.style);
                rows.push(factory.row(attrs, css));
            }
        }

        function cell_(start, attrs) {
            if (start) {
                if (rows.length === 1) {
                    columns.push(factory.column(attrs));
                }
                var row = rows.length - 1;
                var css = split_css(attrs.style);               
                var cell = factory.cell(css, column, row, columns[column].m_iWidth, rows[row].m_iHeight);
                cells.push(cell);
                return stl.handler_dispatcher(nsmap, story_builder(cell.m_pTextDraw));
            } else {
                column += 1;
            }
        }

        function finalize() {
            draw.m_Rows = rows;
            draw.m_Columns = columns;
            draw.m_Cells = cells;
            // we override table w,h with a sum of column widths and row heights
            var width = columns.reduce((acc,el) => acc+el.m_iWidth, 0);;
            var height = rows.reduce((acc,el) => acc+el.m_iHeight, 0);
            draw.m_rectPosition.right = width;
            draw.m_rectPosition.bottom = height;
        }

        return { 
            story_: () => {},
            row_: row_,
            cell_: cell_,
            repeater_: () => unsupported("stl:repeater"),
            text: unexpected_text,
            finalize: finalize,
        };
    }
    
    function story_builder(draw) {
        var paragraphs = draw.m_ParaValues;
        var colors = draw.m_Colors;
        var fonts = draw.m_TextFonts;
        var chars = draw.m_cChars;
        var commands = draw.m_sXPos;
        var objrefs = draw.m_Objs;
        var objs = draw.m_pObjs;
        var links = draw.m_Links;
        var varprops = draw.m_VarProps;
        var styles = simple_stack({});
        styles.dirty = true;
        var inside = {};

        function insert_resource(resources, resource) {
            var id;
            var strres = JSON.stringify(resource);
            resources.find(function (element, index) {
                if (JSON.stringify(element) === strres) {
                    id = index;
                    return true;
                }
                return false;
            });
            if (id === undefined) {
                id = resources.length;
                resources.push(resource);
            }
            return id;
        }
        
        function insert_pstyle() {
            commands.push(enums.content.PARAGRAPH_BREAK);
            commands.push(paragraphs.length);
            chars.push(enums.content.NULL);
            chars.push(enums.content.NULL);
            var css = styles.top();
            paragraphs.push(factory.paragraph(css));
        }
        
        function flush_cstyle() {
            if (styles.dirty) {
                var css = styles.top();
                commands.push(enums.content.FONT_CHANGE);
                chars.push(insert_resource(fonts, factory.font(css)));
                commands.push(enums.content.COLOR_CHANGE);
                chars.push(insert_resource(colors, factory.color(css['color'])));
                styles.dirty = false;
            }
        }

        function object_start(obj) {
            if (inside.object)
                return unsupported("object nesting");
            var draw = obj.m_pDrawObj;
            inside.object = draw;
            objrefs.push(factory.objref(obj.m_eComponentType));
            objs.push(draw);
            commands.push(enums.content.OBJECT_START);
            chars.push(enums.content.NULL);
            commands.push(objrefs.length-1);
            chars.push(enums.content.NULL);
            return draw;
        }

        function object_end() {
            if (!inside.object)
                throw new Error("inconsistent object start/end");
            commands.push(enums.content.OBJECT_END);
            chars.push(enums.content.NULL);
            commands.push(enums.content.NULL);
            chars.push(enums.content.NULL);
            inside.object = null;
        }

        function vertical_align(oldalign, newalign) {
            if (oldalign !== newalign) {
                switch(oldalign) {
                case 'super':
                    commands.push(enums.content.SUPERSCRIPT_END);
                    chars.push(enums.content.NULL);
                    break;
                case 'sub':
                    commands.push(enums.content.SUBSCRIPT_END);
                    chars.push(enums.content.NULL);
                    break;
                default:
                    break;
                }
                switch(newalign) {
                case 'super':
                    commands.push(enums.content.SUPERSCRIPT_START);
                    chars.push(enums.content.NULL);
                    commands.push(enums.content.NULL);
                    chars.push(enums.content.NULL);
                    break;
                case 'sub':
                    commands.push(enums.content.SUBSCRIPT_START);
                    chars.push(enums.content.NULL);
                    commands.push(enums.content.NULL);
                    chars.push(enums.content.NULL);
                    break;
                default:
                    break;
                }
            }
        }

        function add_variable(id) {
            var vp = factory.varprops();
            varprops.push(vp);
            
            commands.push(enums.content.VARIABLE_START);
            chars.push(enums.content.NULL);
            commands.push(id);
            chars.push(enums.content.NULL);
            commands.push(enums.content.NULL);
            chars.push(enums.content.NULL);
            commands.push(varprops.length);
            chars.push(enums.content.NULL);
            commands.push(enums.content.VARIABLE_END);
            chars.push(enums.content.NULL);
            commands.push(enums.content.NULL);
            chars.push(enums.content.NULL);

            return stl.empty_checker();
        }
        
        ///////////////////////////////////////////////////////////////////

        function block_(start, attrs) {
            if (start) {
                styles.push(split_css(attrs.style, clone_css(styles.top())));
            } else {
                styles.pop();
            }
        }

        function p_(start, attrs) {
            if (start) {
                styles.push(split_css(attrs.style, clone_css(styles.top())));
                insert_pstyle();
                inside.paragraph = true;
            } else {
                styles.pop();
                inside.paragraph = false;
            }
        }

        function story_(start, attrs) {
            if (start) {
                if (inside.object)
                    return stl.handler_dispatcher(nsmap, story_builder(inside.object));
                if (!inside.hyperlink)
                    return unsupported("stl:story");
            }
        }
        
        function scope_(start, attrs) {
            if (start) {
                if (!attrs.hyperlink)
                    return unsupported("stl:scope");
                if (inside.hyperlink)
                    return unsupported("stl:scope nesting");
                links.push(factory.link(attrs));
                commands.push(enums.content.HYPERLINK_START);
                chars.push(enums.content.NULL);
                commands.push(links.length-1);
                chars.push(enums.content.NULL);
                inside.hyperlink = true;
            } else {
                inside.hyperlink = false;
                commands.push(enums.content.HYPERLINK_END);
                chars.push(enums.content.NULL);
                commands.push(enums.content.NULL);
                chars.push(enums.content.NULL);
            }
        }
        
        function field_(start, attrs) {
            function find_var(resources, name) {
                return resources
                    ? resources.resourcePack.variables.find((v) => v.m_strName === name)
                    : null;
            }
            
            function parse_variable(xpath) {
                var match = /^string\(\$([a-zA-Z0-9_]+)\)$/.exec(xpath);
                if (match) {
                    var name = match[1];
                    match = /^empower_variable_(\d+)$/.exec(name);
                    return match
                        ? +match[1]
                        : name;
                }
                return null;
            }
            
            if (start) {
                var xpath = attrs.xpath;
                if (xpath) {
                    var v = parse_variable(options.maps.xpath(xpath));
                    if (v === null) {
                        return unsupported("non-variable stl:field");
                    }
                    if (util.isString(v)) {
                        var spec = find_var(options.resources, v);
                        if (spec === null) {
                            throw new Error("Variable " + v + "not found");
                        }
                        v = spec.m_oi;
                    }
                    return add_variable(v);
                }
            }
        }
        
        function span_(start, attrs) {
            if (Object.keys(attrs).length) { // treat empty span as a special case
                var oldcss;
                styles.dirty = true;
                if (start) {
                    oldcss = styles.top();
                    styles.push(split_css(attrs.style, clone_css(styles.top())));
                } else {
                    oldcss = styles.pop();
                }
                vertical_align(oldcss['vertical-align'], styles.top()['vertical-align']);
            }
        }

        function image_(start, attrs) {
            if (start) {
                object_start(factory.image(attrs));
                return stl.empty_checker();
            } else {
                object_end();
            }
        }
        
        function table_(start, attrs) {
            if (start) {
                var css = split_css(attrs.style);
                var draw = object_start(factory.table(attrs, css));
                return stl.handler_dispatcher(nsmap, table_builder(draw));
            } else {
                object_end();
            }
        }

        function text_(start, attrs) {
            if (start) {
                if (attrs.story)
                    return unsupported("stl:story reference");
                var css = split_css(attrs.style);
                object_start(factory.text(attrs, css));
            } else {
                object_end();
            }
        }
        
        function text(data) {
            if (data) {
                if (inside.paragraph) {
                    flush_cstyle();
                    for (var i=0; i<data.length; i++) {
                        chars.push(data.charCodeAt(i));
                        commands.push(enums.content.NULL);
                    }
                } else if (data.trim()) {
                    return unexpected("text outside paragraph");
                }
            }
        }

        function finalize() {
            commands.push(enums.content.CONTENT_END);
            chars.push(enums.content.NULL);
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
            field_: field_,
            chart_: () => unsupported("stl:chart"),
            fragment_: () => unsupported("stl:fragment"),
            script_: () => unsupported("stl:script"),
            text: text, 
            finalize: finalize
        };
    }

    function item_builder(objects) {
        var inside = {};

        function object_start(obj) {
            if (inside.object)
                return unsupported("object nesting");
            objects.push(obj);
            var draw = obj.m_pDrawObj;
            inside.object = draw;
            return draw;
        }

        function object_end() {
            if (!inside.object)
                throw new Error("inconsistent object start/end");
            inside.object = null;
        }
        
        function story_(start, attrs) {
            if (start) {
                if (inside.object)
                    return stl.handler_dispatcher(nsmap, story_builder(inside.object));
                return unsupported("stl:story");
            }
        }
        
        function text_(start, attrs) {
            if (start) {
                if (attrs.story)
                    return unsupported("stl:story reference");
                var css = split_css(attrs.style);
                object_start(factory.text(attrs, css));
            } else {
                object_end();
            }            
        }

        function image_(start, attrs) {
            if (start) {
                object_start(factory.image(attrs));
                return stl.empty_checker();
            } else {
                object_end();
            }
        }

        function table_(start, attrs) {
            if (start) {
                var css = split_css(attrs.style);
                var draw = object_start(factory.table(attrs, css));
                return stl.handler_dispatcher(nsmap, table_builder(draw));
            } else {
                object_end();
            }
        }
        
        return {
            story_: story_,
            text_: text_,
            image_: image_,
            table_: table_,
            barcode_: () => unsupported("stl:barcode"),
            chart_: () => unsupported("stl:chart"),
            fragment_: () => unsupported("stl:fragment"),
            text: unexpected_text, 
            finalize: () => {}
        };
    }
    
    function doc_builder() {
        function story_(start, attrs) {
            if (start) {
                if (root.contents)
                    return unsupported("multiple stl:story");
                var contents = factory.content(root, 4, attrs);
                return stl.handler_dispatcher(nsmap, story_builder(contents.m_pTextDraw));
            }
        }

        function page_(start, attrs) {
            if (start) {
                if (root.contents)
                    return unsupported("multiple stl:page");
                var contents = factory.canvas(root, 1, attrs);
                return stl.handler_dispatcher(nsmap, item_builder(contents.m_DrawFront));
            }
        }
        
        return { 
            story_: story_,
            page_: page_,
            text: unexpected_text, 
            finalize: () => {}
        };
    }
    
    function root_builder() {
        function document_(start, attrs) {
            if (start)
                return stl.handler_dispatcher(nsmap, doc_builder());
        }
        return {
            stl_: () => {},
            data_: () => unsupported("stl:data"), 
            fixtures_: () => unsupported("stl:fixtures"),
            style_: () => unsupported("stl:style"),
            document_: document_,
            text: unexpected_text, 
            finalize: () => {}
        };
    }

    return root_builder();
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
 * emp2stl( input: string|stream [, options: object] ) : string|stream
 *
 * Parses _Empower JSON_ fragment and generates corresponding  _STL_ fragment
 *
 * Parameters:
 *    - `input` ... input string or stream containing _Empower JSON_
 *    - `options` ... following options are currently supported:
 *      - `output` ... optional output stream to be filled with resulting _STL_
 *      - `indent` ... bool, string or a function(tag, tags, is_start) used for indentation
 *      - `page` ... bool determining whether page type should be generated
 *      - `resources` ... optional object representing resources (typically parsed from `designpack.json`)
 *      - `maps` ... object containing hooks for mapping various entities
 *        - `font` ... optional remap callback for font
 *        - `xpath` ... optional remap callback for XPath
 *        - `uri` ... optional remap callback for URI
 *    - `@return` ... output stream (if provided as `options.output`) or string
 */
exports.emp2stl = function emp2stl(input, options) {
    input = check_input(input);
    options = check_options(options);

    var contents = JSON.parse(input).contents;
    var writer = stl_writer(options.indent);
    build_stl(contents, writer, options);
    var stl = writer.finalize();
    if (!options.output) {
        return stl; // return the string directly
    }
    options.output.write(stl);
    return options.output;
};

/*
 *  stl2emp( input: string|stream [, options: object] ) : string|stream 
 *
 *  Parses _STL_ fragment and generates corresponding _Empower JSON_ fragment
 *
 *  Parameters:
 *    - `input` ... input stream containing _STL_
 *    - `options` ... following options are currently supported:
 *      - `output` ... optional output stream to be filled with resulting _Empower JSON_
 *      - `indent` ... bool or a string used for indentation
 *      - `permissive` ... determines whether the conversion fails or ignores unsupported constructs
 *      - `resources` ... optional object representing resources (typically parsed from `designpack.json`)
 *      - `maps` ... object containing hooks for mapping various entities
 *        - `font` ... optional remap callback for font
 *        - `xpath` ... optional remap callback for XPath
 *        - `uri` ... optional remap callback for URI
 *    - `@return` ... output stream (if provided as `options.output`) or string
 */
exports.stl2emp = function emp2stl(input, options) {
    input = check_input(input);
    options = check_options(options);
        
    var nsmap = stl.namespace_stack();
    var factory = json_factory(options);
    var root = factory.root();
    var builder = json_builder(nsmap, factory, root, options);
    var parser = stl.parser(nsmap, builder);
    parser.write(input).close();
    var json = JSON.stringify(root, null, options.indent);
    if (!options.output) {
        return json;  // return the string directly
    }
    options.output.write(json);
    return options.output;
};


