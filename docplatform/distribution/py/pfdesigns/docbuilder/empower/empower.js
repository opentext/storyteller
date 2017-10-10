// Copyright (c) 2017 Open Text. All Rights Reserved.
/*jslint
  bitwise:true
*/

'use strict';

const util = require('util');
const streams = require('streams');
const stl = require('stl');
const range = require('range');

const enums = {
    item: {
        TABLE: 5,
        IMAGE: 6,
        TEXT: 14
    },
    content: {
        NULL: 0,
        HYPERLINK_START: -252,
        OBJECT_START: -251,
        PARAGRAPH_BREAK: -244,
        SUPERSCRIPT_START: -240,
        SUBSCRIPT_START: -239,
        HYPERLINK_END: -109,
        OBJECT_END: -106,
        CONTENT_END: -64,
        COLOR_CHANGE: -63,
        FONT_CHANGE: -62,
        SUBSCRIPT_END: -58,
        SUPERSCRIPT_END: -59
    },
    list: {
        NONE: 0,
        BULLETS: 1,
        NUMBERING: 2
    },
    pen: {
        SOLID: 0,
        DASHED: 1,
        DOTTED: 3
    },
    valign: {
        TOP: 0,
        CENTER: 1,
        BOTTOM: 2
    },
    segmentpos: {
        TOP: 1,
        RIGHT: 2,
        BOTTOM: 4,
        LEFT: 8
    }
};

function stl_writer(indent) {
    const XMLWriter = require('xml-writer');
    var xw = null;
    var tags = [];
    var self;

    function start(tag, attrs) {
        //console.log('<'+tag+'>');
        tags.push(tag);
        xw.startElementNS('stl', tag, stl.namespaces.stl);
        if (attrs) {
            xw.startAttributes();
            Object.keys(attrs).forEach(function (key) {
                xw.writeAttribute(key, attrs[key]);
            });
            xw.endAttributes();
        }
        return self;
    }

    function end(tag) {
        //console.log('</'+tag+'>');
        var top = tags.pop();
        if (top !== tag) {
            throw new Error("Tag mismatch (trying to close '" + tag + "' while top element is '" + top + "')");
        }
        xw.endElement();
        return self;
    }

    function text(data) {
        //console.log("'" + data + "'");
        if (!tags.length) {
            throw new Error("Cannot write text '" + data + "' outside elements");
        }
        xw.text(data);
        return self;
    }

    function init() {
        xw = new XMLWriter(indent);
        //xw.startDocument();
        var attrs = {
            'xmlns:stl': stl.namespaces.stl,
            version: stl.version
        };
        self.start('stl', attrs);
        return self;
    }

    function finish() {
        //xw.endDocument();
        var markup = xw.toString();
        xw = null;
        return markup;
    }

    self = {
        init: init,
        finish: finish,
        start: start,
        end: end,
        text: text
    };
    return self;
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
        if (row.m_bFixedSize) {
            attrs.h = convert_length(row.m_iHeight);
        } else {
            attrs.h = '0pt';
            var css = {};
            css['-stl-shape-resize'] = 'free';
            css['-stl-shape-growth'] = '0pt max';
            css['-stl-shape-shrink'] = '0pt -max';
            attrs.style = css_format(css);
        }
        return attrs;
    }

    function css_reset() {
        return {
            'color': null,
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
            'vertical-align': null,
            '-stl-list-counter': null,
            '-stl-list-mask': null,
            '-stl-list-level': null,
            '-stl-tabs': null,
            '-stl-shape-resize': null,
            '-stl-shape-growth': null,
            '-stl-shape-shrink': null,
            '-stl-alignment': null
        };
    }

    function convert_parstyle(ps, css) {
        css = css || css_reset();
        var alignments = ['left', 'right', 'center', 'justify'];
        if (ps.iJustification) {
            css['text-align'] = alignments[ps.iJustification];
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
        var bullets = ['•', '◦', '▪'];
        var numberings = ['1.', '1.', 'r.', '1)'];
        var level;
        var format;
        switch (ps.iNumbering) {
        case enums.list.NONE:
            break;
        case enums.list.BULLETS:
            level = ps.iNumberIndent - 1;
            format = bullets[level % 3];
            css['-stl-list-mask'] = format + '\\9';
            css['-stl-list-level'] = level;
            css['-stl-tabs'] = convert_length(250 * (level + 1));
            css['margin-left'] = convert_length(250 * level);
            break;
        case enums.list.NUMBERING:
            level = ps.iNumberIndent - 1;
            format = numberings[level % 4];
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

    function convert_font(name) {
        return options.fonts
            ? options.fonts(name)
            : name;
    }

    function convert_charstyle(cs, css) {
        css = css || css_reset();
        css['font-family'] = convert_font(cs.strName);
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
            switch (src) {
            case enums.pen.SOLID:
                return 'solid';
            case enums.pen.DASHED:
                return 'dashed';
            case enums.pen.DOTTED:
                return 'dotted';
            default:
                throw new Error('Unsupported pen style: ' + src);
            }
        }

        thickness = thickness
            ? convert_length(thickness)
            : '1px';
        return thickness + ' ' + pen_style(style) + ' ' + convert_color(color);
    }

    function convert_padding(src, css) {
        css = css || css_reset();
        if (src.m_iLeftMargin) {
            css['padding-left'] = convert_length(src.m_iLeftMargin);
        }
        if (src.m_iRightMargin) {
            css['padding-right'] = convert_length(src.m_iRightMargin);
        }
        if (src.m_iTopMargin) {
            css['padding-top'] = convert_length(src.m_iTopMargin);
        }
        if (src.m_iBottomMargin) {
            css['padding-bottom'] = convert_length(src.m_iBottomMargin);
        }
        return css;
    }

    function convert_item_style(src, css) {
        css = css || css_reset();
        if (src.m_bPen === true) {
            css.border = convert_pen(src.m_iPenWidth, src.m_iPenStyle, src.m_clrPen);
        }
        if (src.m_bBackGroundTransparent === false) {
            css.fill = convert_color(src.m_clrBackGround);
        }
        convert_padding(src, css);
        if (src.m_bAutoSizeX || src.m_bAutoSizeY) {
            css['-stl-shape-resize'] = 'free';
            var x = src.m_bAutoSizeX
                ? 'max'
                : '0pt';
            var y = src.m_bAutoSizeY
                ? 'max'
                : '0pt';
            css['-stl-shape-growth'] = x + ' ' + y;
            css['-stl-shape-shrink'] = '-' + x + ' -' + y;
        }
        switch (src.m_eVertJust) {
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
            throw new Error("Unsupported vertical justification: " + src.m_eVertJust);
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
        if (blackspace === false) {
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

exports.emp2stl = function emp2stl(src, dst, options) {
    dst = dst || streams.stream();
    options = options || {};

    if (!util.isStream(src) || !util.isStream(dst)) {
        throw new Error("Invalid argument, stream expected");
    }
    var contents = JSON.parse(src.read()).contents;
    var converter = css_converter(contents.m_lResolution, options);
    var writer = stl_writer(options.indent);
    var convert_object;

    function convert_content(src, inserter) {
        inserter = inserter || content_inserter(writer);
        src.m_cChars.forEach(function (code, index) {
            var cmd = src.m_sXPos[index];
            switch (cmd) {
            case enums.content.HYPERLINK_START:
                inserter.push('scope', {'hyperlink': src.m_Links[code].msLink});
                inserter.push('story');
                break;
            case enums.content.OBJECT_START:
                convert_object(src.m_Objs[code].m_iObjType, src.m_pObjs[code], inserter);
                break;
            case enums.content.PARAGRAPH_BREAK:
                inserter.paragraph_end();
                inserter.paragraph_start(converter.parstyle(src.m_ParaValues[src.m_sXPos[index + 1]]));
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
                inserter.style_change({'color': converter.color(src.m_Colors[code], true)});
                break;
            case enums.content.FONT_CHANGE:
                inserter.style_change(converter.charstyle(src.m_TextFonts[code]));
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

    function convert_table(src, inserter) {
        function convert_row(row, r) {
            inserter.push('row', converter.rowbox(row));
            src.m_Columns.forEach(function (column, c) {
                var cell = src.m_Cells.find(function (cell) {
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
        var attrs = converter.pos(src.m_rectPosition);
        var css = converter.item_style(src);
        attrs.style = css_format(css);
        inserter.push('table', attrs);
        inserter.push('story');
        src.m_Rows.forEach(convert_row);
        inserter.pop('story');
        inserter.pop('table');
    }

    function convert_image(src, inserter) {
        var attrs = converter.bbox(src.m_rectPosition);
        var uri = 'cas:' + src.m_pDbBitmap.m_strCASId;
        attrs.src = options.uris
            ? options.uris(uri)
            : uri;
        inserter.push('image', attrs);
        inserter.pop('image');
    }

    function convert_text(src, inserter) {
        var attrs = converter.bbox(src.m_rectPosition);
        var css = converter.item_style(src);
        attrs.style = css_format(css);
        inserter.push('text', attrs);
        inserter.push('story');
        convert_content(src);
        inserter.pop('story');
        inserter.pop('text');
    }

    convert_object = function (type, src, inserter) {
        inserter = inserter || content_inserter(writer);
        switch (type) {
        case enums.item.TABLE:
            convert_table(src, inserter);
            break;
        case enums.item.IMAGE:
            convert_image(src, inserter);
            break;
        case enums.item.TEXT:
            convert_text(src, inserter);
            break;
        default:
            throw new Error("Unsupported object type: " + type);
        }
    };

    function convert_text_message(contents) {
        var text = contents.m_pTextDraw;
        var attrs = converter.bbox(text.m_rectPosition);
        writer.start('story', {name: 'Main', w: attrs.w});
        convert_content(text);
        writer.end('story');
        if (options.page) {
            writer.start('page', attrs);
            var css = converter.item_style(text);
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

    writer.init();
    writer.start('document');

    if (contents.m_bTextOnly) {
        convert_text_message(contents);
    } else {
        convert_canvas_message(contents);
    }
    writer.end('document');
    dst.write(writer.finish());
};


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
    
    function initialize() {
        if (!json_factory.cache) {
            var factory = require('empower.json').factory;
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
        f.strName = css['font-family'] || "Lato";
        f.iFontHeight10X = convert_length(css['font-size'] || '10pt', 10);
        f.bBold = css['font-weight'] === 'bold';
        f.bItalic = css['font-style'] === 'italic';
        f.bUnderline = css['text-decoration'] === 'underline';
        f.bStrikeThru = css['text-decoration'] === 'strike-through';
        return f;
    }
    
    function paragraph() {
        var p = factory.paragraph();
        p.iDefaultTab = resolution/4;
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
        var casid = attrs.src.split(':')[1];
        var width = convert_length(attrs.w);
        var height = convert_length(attrs.h);
        img.m_pDrawObj.m_oiID = id-1;
        img.m_pDrawObj.m_UNITSPERINCH = resolution;
        img.m_pDrawObj.m_pDbBitmap.m_oiDB = id-2;
        img.m_pDrawObj.m_pDbBitmap.m_strCASId = casid;
        img.m_pDrawObj.m_rectPosition.left = 0;
        img.m_pDrawObj.m_rectPosition.top = 0;
        img.m_pDrawObj.m_rectPosition.bottom = height;
        img.m_pDrawObj.m_rectPosition.right = width;
        return img;
    }
    
    function text(width, height, asX, asY) {
        id += 1;
        width = convert_length(width);
        height = convert_length(height);
        var txt = factory.text();
        txt.m_pDrawObj.m_oiID = id-1;
        txt.m_pDrawObj.m_bAutoSizeX = asX;
        txt.m_pDrawObj.m_bAutoSizeY = asY;
        txt.m_pDrawObj.m_rectPosition.left = 0;
        txt.m_pDrawObj.m_rectPosition.top = 0;
        txt.m_pDrawObj.m_rectPosition.right = width;
        txt.m_pDrawObj.m_rectPosition.bottom = height;
        txt.m_pDrawObj.m_pEditableProps = textprops();
        txt.m_pDrawObj.m_UNITSPERINCH = resolution,
        txt.m_pDrawObj.m_iLogicalRes = resolution,
        txt.m_pDrawObj.m_iDesignRes = resolution,
        txt.m_pDrawObj.m_clrPen = color();
        txt.m_pDrawObj.m_iMaxWidthDes = width;
        txt.m_pDrawObj.m_Colors.push(color());
        txt.m_pDrawObj.m_Colors.push(color('#00ffc0'));
        txt.m_pDrawObj.m_Colors.push(color('#f00'));
        return txt;
    }

    function table(rows, columns, widths, heights) {
        function column(c) {
            var col = factory.column();
            col.m_iWidth = widths[c];
            col.m_clrLeft = color();
            col.m_clrRight = color();
            col.m_pEditableProps = columnprops();
            return col;
        }

        function row(r) {
            var r = factory.row();
            r.m_clrAbove = color();
            r.m_clrBelow = color();
            r.m_colorLegend = color();
            r.m_pEditableProps = rowprops();
            return r;
        }

        function cell(c, r) {
            var cell = factory.cell();
            cell.m_pTextDraw = factory.text(widths[c], heights[r], false, false).m_pDrawObj;
            cell.m_iColumn = c;
            cell.m_iRow = r;
            return c;
        }

        function sum(values) {
            return values.reduce((a, b) => a + b, 0);            
        }
        
        id += 1;
        var tbl = factory.table();
        tbl.m_pDrawObj.m_oiID = id;
        tbl.m_pDrawObj.m_rectPosition.left = 0;
        tbl.m_pDrawObj.m_rectPosition.top = 0;
        tbl.m_pDrawObj.m_rectPosition.right = sum(widths);
        tbl.m_pDrawObj.m_rectPosition.bottom = sum(heights);
        tbl.m_pDrawObj.m_UNITSPERINCH = resolution;
        tbl.m_pDrawObj.m_clrPen = color();
        tbl.m_pDrawObj.m_clrBrushFill = color('#00c0c0');
        tbl.m_pDrawObj.m_clrShadow = color('#00c0c0');
        tbl.m_pDrawObj.m_pEditableProps = tableprops();
        tbl.m_pDrawObj.m_colorLegendFrame = color();
        
        rows = range(rows);
        columns = range(rows);
        rows.forEach(function(r) {
            tbl.m_pDrawObj.m_Rows.push(factory.row(r));
            columns.forEach(function(c) {
                if (r === 0) {
                    tbl.m_pDrawObj.m_Columns.push(factory.column(c));
                }
                tbl.m_pDrawObj.m_Cells.push(factory.cell(c, r));
            });
        });
        return tbl;
    }

    function canvas(template_id, width, height) {
        var c = factory.canvas();
        c.m_iDesignResolution = resolution;
        c.m_scopedMessageTemplate = template_id; 
        c.m_Size.width = width;
        c.m_Size.height = height;
        c.contents.m_lResolution = resolution;
        c.contents.m_lWidth = width;
        c.contents.m_lHeight = height;
        c.contents.m_lGrowMaxY = height;
        c.contents.m_lTopMargin = 0;
        c.contents.m_lBottomMargin = 0;
        return c;
    }

    function content(template_id, width, height) {
        height = height || '1in';
        
        var c = factory.content();
        c.m_iDesignResolution = resolution;
        c.m_scopedMessageType = template_id;
        c.contents.m_lResolution = resolution;
        c.contents.m_pTextDraw = text(width, height, false, true).m_pDrawObj;
        return c;
    }

    return {
        color: color,
        font: font,
        paragraph: paragraph,
        link: link,
        objref: objref,
        image: image,
        content: content
    };
}

function simple_stack(item) {
    var items = [];
    if (item !== undefined)
        items.push(item);
    return {
        push: items.push,
        pop: items.pop,
        top: () => items[items.length-1]
    };
}

function json_builder(nsmap, factory, stack, options) {
    const unsupported = function (item) {
        var message = "Unsupported " + item;
        if (options.permissive) {
            console.error(message + " (ignored)");
            return ignorant();
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
    
    function table_builder() {
        function story_(start, attrs) {
        }

        function repeater_(start, attrs) {
            return unsupported("Repeater");
        }

        function row_(start, attrs) {
        }

        function cell_(start, attrs) {
            if (start)
                return stl.handler_dispatcher(nsmap, story_builder());
        }

        function text(data) {
        }

        function finalize() {
        }

        return { 
            story_: story_,
            row_: row_,
            cell_: cell_,
            repeater_: () => unsupported("stl:repeater"),
            text: unexpected_text,
            finalize: () => {},
        };
    }
    
    function story_builder(textdraw) {
        var paragraphs = textdraw.m_ParaValues;
        var colors = textdraw.m_Colors;
        var fonts = textdraw.m_TextFonts;
        var chars = textdraw.m_cChars;
        var commands = textdraw.m_sXPos;
        var objrefs = textdraw.m_Objs;
        var objs = textdraw.m_pObjs;
        var links = textdraw.m_Links;
        var styles = simple_stack({});

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
            paragraphs.push(factory.paragraph());
        }
        
        function insert_cstyle(css) {
            commands.push(enums.content.FONT_CHANGE);
            chars.push(insert_resource(fonts, factory.font(css)));
            commands.push(enums.content.COLOR_CHANGE);
            chars.push(insert_resource(colors, factory.color(css['color'])));
        }

        ///////////////////////////////////////////////////////////////////

        
        function block_(start, attrs) {
            styles.dirty = true;
            if (start) {
                styles.push(split_css(attrs.style, styles.top()));
            } else {
                styles.pop();
            }
        }

        function p_(start, attrs) {
            styles.dirty = true;
            if (start) {
                insert_pstyle();
                styles.push(split_css(attrs.style, styles.top()));
            } else {
                styles.pop();
            }
        }

        function story_(start, attrs) {
            if (start) {
                if (!inside_hyperlink)
                    return unsupported("stl:story");
            }
        }
        
        function scope_(start, attrs) {
            if (start) {
                if (!attrs.hyperlink)
                    return unsupported("stl:scope");
                if (inside_hyperlink)
                    return unsupported("stl:scope nesting");
                links.push(factory.link(attrs));
                commands.push(enums.content.HYPERLINK_START);
                chars.push(enums.content.NULL);
                commands.push(links.length-1);
                chars.push(enums.content.NULL);
                inside_hyperlink = true;
            } else {
                inside_hyperlink = false;
                commands.push(enums.content.HYPERLINK_END);
                chars.push(enums.content.NULL);
                commands.push(enums.content.NULL);
                chars.push(enums.content.NULL);
            }
        }

        function span_(start, attrs) {
            styles.dirty = true;
            if (start) {
                styles.push(split_css(attrs.style, styles.top()));
            } else {
                styles.pop();
            }
        }

        function image_(start, attrs) {
            if (start) {
                var img = factory.image(attrs);
                objrefs.push(factory.objref(img.m_eComponentType));
                objs.push(img.m_pDrawObj);
                commands.push(enums.content.OBJECT_START);
                chars.push(enums.content.NULL);
                commands.push(objrefs.length-1);
                chars.push(enums.content.NULL);
                return stl.empty_checker();
            } else {
                commands.push(enums.content.OBJECT_END);
                chars.push(enums.content.NULL);
                commands.push(enums.content.NULL);
                chars.push(enums.content.NULL);
            }
        }

        function table_(start, attrs) {
            if (start)
                return stl.handler_dispatcher(nsmap, table_builder());
        }

        function text_(start, attrs) {
            return stl.ignorant();
        }
        
        function text(data) {
            data = data.trim();
            if (data.length) {
                if (styles.dirty) {
                    insert_cstyle(styles.top());
                    styles.dirty = false;
                }
                range(data.length).forEach(function(index) {
                    chars.push(data.charCodeAt(index));
                    commands.push(enums.content.NULL);
                });
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
    
    function doc_builder() {
        function story_(start, attrs) {
            if (start) {
                var root = factory.content(4, attrs.w);
                stack.push(root);
                return stl.handler_dispatcher(nsmap, story_builder(root.contents.m_pTextDraw));
            } else {
                //stack.pop();
            }
        }

        return { 
            story_: story_,
            page_: () => unsupported("stl:page"),
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

exports.stl2emp = function emp2stl(src, dst, options) {
    options = options || {};
        
    var nsmap = stl.namespace_stack();
    var factory = json_factory(options);
    var stack = simple_stack();
    var root = json_builder(nsmap, factory, stack, options);
    var parser = stl.parser(nsmap, root);
    parser.write(src.read()).close();
    dst.write(JSON.stringify(stack.pop(), null, options.indent));
};


