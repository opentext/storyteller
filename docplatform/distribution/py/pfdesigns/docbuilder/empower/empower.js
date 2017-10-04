// Copyright (c) 2017 Open Text. All Rights Reserved.
'use strict';

var util = require('util');
var streams = require('streams');

function STLWriter(indent) {
    var XMLWriter = require('wd:/xml-writer');
    var uri_stl = 'http://developer.opentext.com/schemas/storyteller/layout';
    var self = null;
    var xw = null;
    var tags = [];
    
    function start(tag, attrs) {
        //console.log('<'+tag+'>');
        tags.push(tag);
        xw.startElementNS('stl', tag, uri_stl);
        if (attrs) {
            xw.startAttributes();
            Object.keys(attrs).forEach( function(key) {
                xw.writeAttribute(key, attrs[key]);
            });
            xw.endAttributes();
        }
        return self;
    }
    
    function end(tag) {
        //console.log('</'+tag+'>');
        var top = tags.pop();
        if (top !== tag)
            throw new Error("Tag mismatch (trying to close '" + tag + "' while top element is '" + top + "')" ); 
        xw.endElement();
        return self;
    }

    function text(data) {
        //console.log("'" + data + "'");
        if (!tags.length)
            throw new Error("Cannot write text '" + data + "' outside elements");
        xw.text(data);
        return self;
    }
    
    function init() {
        xw = new XMLWriter(indent);
        //xw.startDocument();
        var attrs = {
            'xmlns:stl': uri_stl,
            version: '0.1'
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

    return self = {
        init: init,
        finish: finish,
        
        start : start,
        end: end,
        text: text
    };
}

function css_format(css) {
    return Object.keys(css).filter(function(key) {
        return css[key] !== null;
    }).map(function(key) {
        return key + ': ' + css[key]
    }).join('; ');
}

function CSSConverter(resolution, options) {
    
    function convert_color(col, map_black_as_null) {
        function hex(d) {
            return  ('0'+(d.toString(16))).slice(-2).toUpperCase();
        }

        if (col.m_eColorModel !== 0)
            throw new Error("Unsupported color model: " + col.m_eColorModel);
        var r = col.m_lColor & 0xff;
        var g = (col.m_lColor>>8) & 0xff;
        var b = (col.m_lColor>>16) & 0xff;
        if (map_black_as_null && !r && !b && !g)
            return null;
        return '#'+hex(r)+hex(g)+hex(b);
    }

    function convert_length(v) {
        return v/resolution+'in';
    }

    function convert_pos(rect, attrs) {
        attrs = attrs || {};
        if (rect.left)
            attrs.x = convert_length(rect.left);
        if (rect.top)
            attrs.y = convert_length(rect.top);
        return attrs;
    }

    function convert_dim(rect, attrs) {
        attrs = attrs || {};
        if (rect.right)
            attrs.w = convert_length(rect.right - rect.left);
        if (rect.bottom)
            attrs.h = convert_length(rect.bottom - rect.top);
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
            '-stl-alignment': null,
        };
    }

    function convert_parstyle(ps, css) {   
        css = css || css_reset();
        if (ps.iJustification)
            css['text-align'] = ['left', 'right', 'center', 'justify'][ps.iJustification];
        if (ps.iLeftIndent)
            css['margin-left'] = convert_length(ps.iLeftIndent);
        if (ps.iRightIndent)
            css['margin-right'] = convert_length(ps.iRightIndent);
        if (ps.iSpaceBefore)
            css['margin-top'] = convert_length(ps.iSpaceBefore);
        if (ps.iSpaceAfter)
            css['margin-bottom'] = convert_length(ps.iSpaceAfter);
        
        switch(ps.iNumbering) {
        case 0: // no list
            break;
        case 1: // bullets
            var level = ps.iNumberIndent-1;
            var format = ['•', '◦', '▪'][level%3];
            css['-stl-list-mask'] = format + '\\9';
            css['-stl-list-level'] = level;
            css['-stl-tabs'] = convert_length(250*(level+1));
            css['margin-left'] = convert_length(250*level);
            break;
        case 2: // numbering
            var level = ps.iNumberIndent-1;
            var format = ['1.', '1.', 'r.', '1)'][level%4];
            css['-stl-list-counter'] = 'default_counter';
            css['-stl-list-mask'] = '%' + level + '!' + format + '\\9';
            css['-stl-list-level'] = level;
            css['-stl-tabs'] = convert_length(250*(level+1));
            css['margin-left'] = convert_length(250*level);
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
        if (cs.bBold)
            css['font-weight'] = 'bold';
        if (cs.bItalic)
            css['font-style'] = 'italic';
        if (cs.bUnderline)
            css['text-decoration'] = 'underline';
        if (cs.bStrikeThru)
            css['text-decoration'] = 'line-through';
        return css;
    }

    function convert_pen(thickness, style, color) {
        function pen_style(src) {
            switch(src) {
            case 0: return 'solid';
            case 1: return 'dashed';
            case 3: return 'dotted';
            default:
                throw new Error('Unsupported pen style: ' + src);
            }
        }

        var thickness = thickness ? convert_length(thickness) : '1px';
        return thickness + ' ' + pen_style(style) + ' ' + convert_color(color);
    }

    function convert_padding(src, css) {
        css = css || css_reset();
        if (src.m_iLeftMargin)
            css['padding-left'] = convert_length(src.m_iLeftMargin);
        if (src.m_iRightMargin)
            css['padding-right'] = convert_length(src.m_iRightMargin);
        if (src.m_iTopMargin)
            css['padding-top'] = convert_length(src.m_iTopMargin);
        if (src.m_iBottomMargin)
            css['padding-bottom'] = convert_length(src.m_iBottomMargin);
        return css;
    }

    function convert_item_style(src, css) {
        css = css || css_reset();
        if (src.m_bPen === true)
            css.border = convert_pen(src.m_iPenWidth, src.m_iPenStyle, src.m_clrPen);
        if (src.m_bBackGroundTransparent === false)
            css.fill = convert_color(src.m_clrBackGround);
        convert_padding(src, css);
        if (src.m_bAutoSizeX || src.m_bAutoSizeY) {
            css['-stl-shape-resize'] = 'free';
            var x = src.m_bAutoSizeX ? 'max' : '0pt';
            var y = src.m_bAutoSizeY ? 'max' : '0pt';
            css['-stl-shape-growth'] = x + ' ' + y;
            css['-stl-shape-shrink'] = '-' + x + ' -' + y;
        }
        switch(src.m_eVertJust) {
        case undefined: // top
        case 0: // top
            css['-stl-alignment'] = null;
            break;
        case 1: // center
            css['-stl-alignment'] = 'vertical 0.5';
            break;
        case 2: // bottom
            css['-stl-alignment'] = 'vertical 1';
            break;
        default:
            throw new Error("Unsupported vertical justification: " + src.m_eVertJust);
        }
        return css;
    }

    function convert_cell_border(cell, row, column, css) {
        css = css || css_reset();
        if (row.m_iLineAbove !== -1)
            css['border-top'] = convert_pen(row.m_iWeightAbove, row.m_iLineAbove, row.m_clrAbove);
        if (row.m_iLineBelow !== -1)
            css['border-bottom'] = convert_pen(row.m_iWeightBelow, row.m_iLineBelow, row.m_clrBelow);
        if (column.m_iLineLeft !== -1)
            css['border-left'] = convert_pen(column.m_iWeightLeft, column.m_iLineLeft, column.m_clrLeft);
        if (column.m_iLineRight !== -1)
            css['border-right'] = convert_pen(column.m_iWeightRight, column.m_iLineRight, column.m_clrRight);
        cell.m_FrameSegShape.m_ppSegments.forEach(function(segment) {
            if (segment.m_estType === 1 && segment.m_bVisible) {
                var pen = convert_pen(segment.m_iLineWeight, segment.m_iLineStyle, segment.m_clrLine);
                switch(segment.m_elpPosition) {
                case 1: css['border-top'] = pen; break;
                case 2: css['border-right'] = pen; break;
                case 4: css['border-bottom'] = pen; break;
                case 8: css['border-left'] = pen; break;
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
        charstyle : convert_charstyle,
        item_style: convert_item_style,
        cell_border: convert_cell_border,
    };
}

function ContentInserter(writer) {
    var CLOSED = 0;
    var CACHED = 1;
    var OPEN = 2;
    
    var style = {
        state: CLOSED,
        css : {}
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
        if (style.state === OPEN) {
            writer.end('span');
        }
        style.state = CACHED;
    }
    
    function style_change(css) {
        var modified = false;
        Object.keys(css).forEach(function(key) {
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
        if (paragraph === true)
            throw new Error("Paragraph nesting not supported");
        push('p', {style: css_format(css)});
        paragraph = true;
    }

    function paragraph_end() {
        if (paragraph === null)
            return;
        if (paragraph === false)
            throw new Error("Paragraph already closed");
        pop('p');
        paragraph = false;
    }
    
    function character(ch) {
        if (style.state === CACHED) {
            writer.start('span', {style: css_format(style.css)});
            style.state = OPEN;
            blackspace = null;
        }
            
        if (/\s/.test(ch)) {
            if (!blackspace) {
                padding();
            }
            blackspace = false;
        }
        else
            blackspace = true;
        writer.text(ch);
    }

    return {
        style_change: style_change,
        paragraph_start: paragraph_start,
        paragraph_end: paragraph_end,
        character: character,
        push: push,
        pop: pop,
    }
}

exports.emp2stl = function emp2stl(src, dst, options) {
    dst = dst || streams.stream();
    options = options || {};
    
    if (!util.isStream(src) || !util.isStream(dst))
        throw new Error("Invalid argument, stream expected");

    var contents = JSON.parse(src.read()).contents;
    var converter = CSSConverter(contents.m_lResolution, options);
    var writer = STLWriter(options.indent);

    function convert_object(type, src, inserter) {
        inserter = inserter || ContentInserter(writer);
        
        switch(type) {
        case 5:  // table
            // we do not convert table width & height, we convert row/column dimensions instead
            var attrs = converter.pos(src.m_rectPosition);
            var css = converter.item_style(src);
            attrs.style = css_format(css);
            inserter.push('table', attrs);
            inserter.push('story');
            src.m_Rows.forEach(function(row, r) {
                inserter.push('row', converter.rowbox(row));
                src.m_Columns.forEach(function(column, c) {
                    var cell = src.m_Cells.find(function(cell) {
                        return cell.m_iColumn === c && cell.m_iRow === r;
                    });
                    var attrs = {};
                    if (r === 0)
                        attrs.w = converter.length(column.m_iWidth);
                    var css = converter.item_style(cell.m_pTextDraw);
                    converter.cell_border(cell, row, column, css);
                    attrs.style = css_format(css);
                    inserter.push('cell', attrs);
                    convert_content(cell.m_pTextDraw);
                    inserter.pop('cell');
                });
                inserter.pop('row');
            });
            inserter.pop('story');
            inserter.pop('table');
            break;
        case 6:  // image
            var attrs = converter.bbox(src.m_rectPosition);
            var uri = 'cas:' + src.m_pDbBitmap.m_strCASId;
            attrs.src = options.uris ? options.uris(uri) : uri;
            inserter.push('image', attrs);
            inserter.pop('image');
            break;
        case 14: // text
            var attrs = converter.bbox(src.m_rectPosition);
            var css = converter.item_style(src);
            attrs.style = css_format(css);
            inserter.push('text', attrs);
            inserter.push('story');
            convert_content(src);
            inserter.pop('story');
            inserter.pop('text');
            break;
        default:
            throw new Error("Unsupported object type: " + type);
        }
    }

    function convert_content(src, inserter) {    
        inserter = inserter || ContentInserter(writer);
        src.m_cChars.forEach(function(code, index) {
            var cmd = src.m_sXPos[index];
            switch(cmd) {
            case -252: // hyperlink start
                var link = src.m_Links[code];
                inserter.push('scope', {'hyperlink': link.msLink});
                inserter.push('story');
                break;
            case -251: // object start
                var type = src.m_Objs[code].m_iObjType;
                var obj = src.m_pObjs[code];
                convert_object(type, obj, inserter);
                break;
            case -244: // paragraph start
                inserter.paragraph_end();
                var ps = src.m_ParaValues[src.m_sXPos[index+1]];
                inserter.paragraph_start(converter.parstyle(ps));
                break;
            case -240: // superscript
                inserter.style_change({'vertical-align': 'super'});
                break;
            case -239: // subscript
                inserter.style_change({'vertical-align': 'sub'});
                break;
            case -109: // hyperlink end
                inserter.pop('story');
                inserter.pop('scope');
                break;
            case -106: // object end
                break;
            case -64:  // content end
                inserter.paragraph_end();
                break;
            case -63: // set color
                inserter.style_change({'color': converter.color(src.m_Colors[code], true)});
                break;
            case -62:  // font change
                inserter.style_change(converter.charstyle(src.m_TextFonts[code]));
                break;
            case -58: // end of subscript
            case -59: // end of superscript
                inserter.style_change({'vertical-align': null});
                break;
            default:
                if (cmd>=0 && code>0) {
                    inserter.character(String.fromCharCode(code));
                }
                break;
            }
        });
    }
    
    function convert_text(contents) {
        var text = contents.m_pTextDraw;
        
        writer.start('story', {name: 'Main'});
        convert_content(text);
        writer.end('story');
        var attrs = converter.bbox(text.m_rectPosition);
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

    function convert_canvas(contents) {
        var attrs = {
            w: converter.length(contents.m_lWidth),
            h: converter.length(contents.m_lHeight)
        };
        writer.start('page', attrs);
        contents.m_DrawFront.forEach(function(obj) {
            convert_object(obj.m_eComponentType, obj.m_pDrawObj);
        });
        writer.end('page');
    }

    writer.init();
    writer.start('document');

    if (contents.m_bTextOnly) {
        convert_text(contents);
    } else {
        convert_canvas(contents);
    }
    writer.end('document');
    dst.write(writer.finish());
}








// TextDraw.handleCopy -> HTML
// TextBox._textDraw -> TextDraw
// TextboxWidget.textRenderable -> TextBox
//
// TextMessageWidget
//a.prototype.save = function() {
//    var a = this.serialize();
//    console.log(this.textRenderable._textDraw.exportSTL());
//    this.messageJson.contents.m_oiLanguage = 0;
//    this.messageJson.contents.m_pTextDraw = a;
//    this.serializeRule(this.messageJson);
//    return this.messageJson
//};

// TextDraw
//a.prototype.exportSTL = function() {
//    var c = this._cursor;
//    c.selectAll();
//    return (new exporters.HtmlExporter).exportAsString(this, c.getSelRangeInOrder())
//};
