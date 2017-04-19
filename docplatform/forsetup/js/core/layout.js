// Copyright (c) 2016 Open Text. All Rights Reserved.
/*jslint
  bitwise:true, this:true
*/

'use strict';

var util = require('util');

function register_property(item, name, options) {
    function find_key(obj, val) {
        return Object.keys(obj).filter(function (key) {
            return obj[key] === val;
        })[0];
    }

    function get_filters(map, numeric) {
        var get = null;
        var set = null;
        if (util.isArray(map)) {
            get = function (val) {
                return map[val];
            };
            set = function (val) {
                return find_key(map, val);
            };
        } else if (util.isObject(map)) {
            get = function (val) {
                return map[val];
            };
            set = function (val) {
                return map.indexOf(val);
            };
        } else {
            get = function (val) {
                return val;
            };
            set = function (val) {
                return val;
            };
        }
        if (numeric) {
            get = (function (get) {
                return function (val) {
                    return +get(val);
                };
            }(get));
        }
        return {get: get, set: set};
    }

    if (util.isString(options)) {
        options = {key: options};
    }
    var filters = get_filters(options.map, options.numeric);
    var get = options.get || function () {
        var key = options.key;
        if (options.index) {
            key += ',' + this.index;
        }
        return filters.get(__bindings.properties.get(key));
    };
    var set = options.set || (options.get
        ? undefined
        : function (value) {
            var key = options.key;
            if (options.index) {
                key += ',' + this.index;
            }
            __bindings.properties.set(key, filters.set(value));
        });
    Object.defineProperty(item, name, {get: get, set: set, enumerable: true});
}

function register_properties(item, map) {
    Object.keys(map).forEach(function (name) {
        register_property(item, name, map[name]);
    });
}

var assert = require('assert');

//----------------- class Base --------------------
function Base() {
    assert(this instanceof Base);
}

Object.defineProperty(Base.prototype, "Class", {get: function () {
    return this.constructor.name;
}});

Base.prototype.inspect = function () {
    return '{' + this.Class + '}';
};

//----------------- class Brush --------------------
function Fill() {
    assert(this instanceof Fill);
}
util.inherits(Fill, Base);

register_properties(Fill.prototype, {
    Type: {key: "Style/Brush/Type", map: ['Solid', 'Linear', 'Radial', 'Gradient']},
    Color: "Style/Brush/Color",
    SecondaryColor: "Style/Brush/SecondaryColor"
});

Fill.prototype.inspect = function () {
    return '{' + this.Class + ' [' + this.Type + ', ' + this.Color + ']}';
};

//----------------- class Border --------------------
function Border() {
    assert(this instanceof Border);
}
util.inherits(Border, Base);

register_properties(Border.prototype, {
    Color: "Style/Pen/Brush/Color",
    Thickness: {key: "Style/Pen/Thickness", numeric: true}
});

Border.prototype.inspect = function () {
    return '{' + this.Class + ' [' + this.Color + ']}';
};

//----------------- class Box --------------------
function Box() {
    assert(this instanceof Box);
}
util.inherits(Box, Base);

register_properties(Box.prototype, {
    X: {key: "Position,2/x", numeric: true},
    Y: {key: "Position,2/y", numeric: true},
    W: {key: "ObjectDimension,2/x", numeric: true},
    H: {key: "ObjectDimension,2/y", numeric: true}
});

Box.prototype.inspect = function () {
    return '{' + this.Class + ' [' + this.X + ', ' + this.Y + ', ' + this.W + ', ' + this.H + ']}';
};

//----------------- class Item --------------------
function Item() {
    assert(this instanceof Item);
}
util.inherits(Item, Base);

register_properties(Item.prototype, {
    Name: "Name",
    Description: "Description",
    Empty: {
        get: function () {
            return __bindings.properties.get("ItemEmpty") !== '';
        }
    }
});

Item.prototype.inspect = function () {
    return '{' + this.Class + ' "' + this.Name + '"}';
};

//----------------- class LayoutItem --------------------
function LayoutItem() {
    assert(this instanceof LayoutItem);
}
util.inherits(LayoutItem, Item);

register_properties(LayoutItem.prototype, {
    Rotation: {key: "Rotation,2", numeric: true},
    Visibility: {key: "Visibility", map: ['Visible', 'Hidden', 'Invisible']}
});

LayoutItem.prototype.Box = Object.freeze(new Box());
LayoutItem.prototype.Border = Object.freeze(new Border());
LayoutItem.prototype.Fill = Object.freeze(new Fill());

// Deprecated, missing use cases
// Positioning: "Positioning",
// Alignment: "Alignment",
// SizeMode: { key: "SizeMode", map: [ 'Unknown', 'Fixed', 'Free', 'Proportional' ] },
// ScaleMode: { key: "ScaleMode", map: [ 'Unknown', 'Fixed', 'Free', 'Proportional' ] },
// AlignmentMode: "Style/AlignmentMode",
// AlignmentVRatio: "Style/AlignmentVRatio",
// AlignmentHRatio: "Style/AlignmentHRatio",
// PlacementVRatio: "Style/PlacementVRatio",
// PlacementHRatio: "Style/PlacementHRatio",
// EmergencyMode:  "Style/FormattingMode",

// ContentVShrink: "Style/ContentVShrink",
// ContentVGrowth: "Style/ContentVGrowth",
// ContentHShrink: "Style/ContentHShrink",
// ContentHGrowth: "Style/ContentHGrowth",
// ShapeVShrink: "Style/ShapeVShrink",
// ShapeVGrowth: "Style/ShapeVGrowth",
// ShapeHShrink: "Style/ShapeHShrink",
// ShapeHGrowth: "Style/ShapeHGrowth",

//----------------- class Image --------------------
function Image() {
    assert(this instanceof Image);
}
util.inherits(Image, LayoutItem);

register_properties(Image.prototype, {
    Uri: "Uri",
    Moniker: {
        get: function () {
            var page = __bindings.properties.get("Image/Page");
            var uri = __bindings.properties.get("Uri");
            return uri + '!' + page;
        },
        set: function (value) {
            var parts = value.split('!');
            if (parts.length !== 2) {
                throw new Error("Invalid moniker");
            }
            __bindings.properties.set("Image/Page", 0);
            __bindings.properties.set("Uri", parts[0]);
            __bindings.properties.set("Image/Page", parts[1]);
        }
    },
    PageCount: {
        get: function () {
            return +__bindings.properties.get("Image/PageCount");
        }
    },
    Selector: {key: "Image/Page"}
});

// Missing use cases
// ImageFormat: "Image/Format",
// ImageBitDepth: "Image/BitDepth",
// ImagePixelWidth: "Image/Columns",
// ImagePixelHeight: "Image/Rows",
// ImageResolutionX: "Image/ResolutionX",
// ImageResolutionY: "Image/ResolutionY",

// Unnecessary (can be parsed from uri)
// AssetName: "AssetName",
// AssetUriType: "UriType",
// AssetId: "Id",
// AssetConnection: "Connection",
// AssetFolder: "Folder",
// AssetVersion: "Version",
// AssetUseLatestVersion: "UseLatestVersion",

// HyperlinkAddress: "Address",
// HyperlinkTip: "ScreenTip",

//----------------- class Box --------------------
function Transformation() {
    assert(this instanceof Transformation);
}
util.inherits(Transformation, Base);

function validate_map_key(key) {
    if (key.search(/[:\|\&]/) !== -1) {
        throw new Error("Invalid map key");
    }
}

function encode_value_map(values) {
    function escape_prop_value(s) {
        return s.replace("&", "&amp;").replace(":", "&#58;").replace("|", "&#124;");
    }
    function encode_pair(key) {
        validate_map_key(key);
        return '' + key + ':' + escape_prop_value('' + values[key]);
    }
    return Object.keys(values).map(encode_pair).join('|');
}

function decode_value_map(value) {
    function unescape_prop_value(s) {
        return s.replace("&#124;", "|").replace("&#58;", ":").replace("&amp;", "&");
    }
    var result = {};
    if (value) {
        value.split("|").forEach(function (p) {
            var pair = p.split(":");
            if (pair.length !== 2) {
                throw new Error("Invalid map format");
            }
            validate_map_key(pair[0]);
            result[pair[0]] = unescape_prop_value(pair[1]);
        });
    }
    return result;
}

register_properties(Transformation.prototype, {
    Parameters: {
        get: function () {
            var params = __bindings.properties.get("TransformParams");
            return decode_value_map(params);
        },
        set: function (params) {
            var str = encode_value_map(params);
            __bindings.properties.set("TransformParams", str);
        }
    }
});

Transformation.prototype.inspect = function () {
    return '{' + this.Class + '}';
};

//----------------- class Fragment --------------------
function Fragment() {
    assert(this instanceof Fragment);
}
util.inherits(Fragment, LayoutItem);

register_properties(Fragment.prototype, {
    Uri: {
        get: function () {
            var moniker = __bindings.properties.get("Fragment/Moniker");
            return moniker
                ? moniker.split('!')[0]
                : '';
        },
        set: function (value) {
            var moniker = __bindings.properties.get("Fragment/Moniker");
            var parts = moniker.split('!');
            parts[0] = value;
            __bindings.properties.set("Fragment/Moniker", parts.join('!'));
        }
    },
    PageCount: {
        get: function () {
            return +__bindings.properties.get("Fragment/PageCount");
        }
    },
    Moniker: "Fragment/Moniker",
    Selector: {key: "Selector"}
});

Fragment.prototype.Transformation = Object.freeze(new Transformation());

// Unnecessary (can be parsed from moniker)
// FragmentItemId: "Fragment/MonikerItemId",
// FragmentItemName: "Fragment/MonikerItemName",
// FragmentMoniker: "Fragment/Moniker",
// FragmentSelector: "Selector",

//----------------- class Barcode --------------------
function Barcode() {
    assert(this instanceof Barcode);
}
util.inherits(Barcode, LayoutItem);

register_properties(Barcode.prototype, {
    Type: "Barcode/Name",
    Data: "Data"
});

//----------------- class Text --------------------
function Text() {
    assert(this instanceof Text);
}
util.inherits(Text, LayoutItem);

// TextHeightGrow: "VerticalGrow", ... Deprecated

//----------------- class Chart --------------------
function Chart() {
    assert(this instanceof Chart);
}
util.inherits(Chart, LayoutItem);

register_properties(Chart.prototype, {
    Direction: {key: "Direction", map: ['None', 'L2R', 'R2L']},
    BidiAndShaping: "Chart/BidiAndShaping"
});

//----------------- class Group --------------------
function Group() {
    assert(this instanceof Group);
}
util.inherits(Group, LayoutItem);

//----------------- class Shape --------------------
function Shape() {
    assert(this instanceof Shape);
}
util.inherits(Shape, LayoutItem);

//----------------- class TableColumn --------------------
function TableColumn(index) {
    assert(this instanceof TableColumn);
    this.index = index;
}
util.inherits(TableColumn, Base);

register_properties(TableColumn.prototype, {
    Width: {key: "ColumnWidth", index: true, numeric: true}
});

TableColumn.prototype.inspect = function () {
    return '{' + this.Class + ' #' + this.index + '}';
};

//----------------- class Table --------------------
function Table() {
    assert(this instanceof Table);
}
util.inherits(Table, LayoutItem);

register_properties(Table.prototype, {
    Direction: {key: "Direction", map: ['None', 'L2R', 'R2L']},
    Columns: {
        get: function () {
            var range = require('range');
            var count = __bindings.properties.get("ColumnsCount");
            var columns = range(count).map(function (i) {
                return Object.freeze(new TableColumn(i));
            });
            return Object.freeze(columns);
        }
    }
});

//----------------- class TableCell --------------------
function TableCell(index) {
    assert(this instanceof TableCell);
    this.index = index;
}
util.inherits(TableCell, Base);

register_properties(TableCell.prototype, {
    ColumnSpan: {key: "CellColSpan", index: true, numeric: true}
});

TableCell.prototype.inspect = function () {
    return '{' + this.Class + ' #' + this.index + '}';
};

//"Cells[]/Fill" :            "CellFill",
//"Cells[]/FillType" :        "CellFillType",
//"Cells[]/FillColor" :       "CellFillColor",
//"Cells[]/FillSecondColor" : "CellFillSecondColor",
//
//"Cells[]/LineThickness" :       "CellLineThickness",
//"Cells[]/TopLineThickness" :    "CellTopLineThickness",
//"Cells[]/LeftLineThickness" :   "CellLeftLineThickness",
//"Cells[]/RightLineThickness" :  "CellRightLineThickness",
//"Cells[]/BottomLineThickness" : "CellBottomLineThickness",
//
//"Cells[]/LineColor" :       "CellLineColor",
//"Cells[]/TopLineColor" :    "CellTopLineColor",
//"Cells[]/LeftLineColor" :   "CellLeftLineColor",
//"Cells[]/RightLineColor" :  "CellRightLineColor",
//"Cells[]/BottomLineColor" : "CellBottomLineColor",
//"Cells[]/EmergencyMode" :         "CellFormattingMode",

//----------------- class TableRow --------------------
function TableRow() {
    assert(this instanceof TableRow);
}
util.inherits(TableRow, LayoutItem);

register_properties(TableRow.prototype, {
    Cells: {
        get: function () {
            var range = require('range');
            var count = __bindings.properties.get("CellsCount");
            var cells = range(count).map(function (i) {
                return Object.freeze(new TableCell(i));
            });
            return Object.freeze(cells);
        }
    }
});

//----------------- class Page --------------------
function Page() {
    assert(this instanceof Page);
}
util.inherits(Page, LayoutItem);

//----------------- class Document --------------------
function Document() {
    assert(this instanceof Document);
}
util.inherits(Document, Base);

//----------------- class Repeater --------------------
function Repeater() {
    assert(this instanceof Repeater);
}
util.inherits(Repeater, Item);

//----------------- class Switch --------------------
function Switch() {
    assert(this instanceof Switch);
}
util.inherits(Switch, Item);

//----------------- class Substitution --------------------
function Substitution() {
    assert(this instanceof Substitution);
}
util.inherits(Substitution, Item);

// http://stackoverflow.com/questions/3425637/xpath-attribute-quoting-in-javascript
function make_xpath_string_literal(s) {
    if (s.indexOf('"') === -1) {
        return '"' + s + '"';
    }
    if (s.indexOf("'") === -1) {
        return "'" + s + "'";
    }
    return 'concat("' + s.replace(/"/g, '",\'"\',"') + '")';
}

function is_extern_content() {
    return __bindings.properties.get("SubstType") === "4";
}

register_properties(Substitution.prototype, {
    Uri: {
        get: function () {
            if (is_extern_content()) {
                var moniker = __bindings.properties.get("Moniker");
                return moniker
                    ? moniker.split('!')[0]
                    : '';
            }
            return __bindings.properties.get("Uri");
        },
        set: function (value) {
            if (is_extern_content()) {
                var moniker = __bindings.properties.get("Moniker");
                var parts = moniker.split('!');
                if (parts.length !== 2) {
                    throw new Error("Invalid moniker");
                }
                parts[0] = value;
                __bindings.properties.set("Moniker", parts.join('!'));
                return;
            }
            __bindings.properties.set("URI", value);
        }
    },
    Moniker: "Moniker",
    Mask: "Mask",
    Data: {
        set: function (value) {
            __bindings.properties.set("DataLink", make_xpath_string_literal(value));
        }
    }
//  ExternalStoryURI: "MonikerUri",
//  ExternalStoryName: "MonikerStory",
//  ExternalStoryMoniker: "Moniker",
//  LookupKey: "LookupKey",
//  KeepWithNext: "KeepWithNext",
});

// ------------------------------------------------------

const OBJECT_CATEGORY_MASK = (1 << 15) - 1;

const proxy_types = [
    null, // 0
    null, // 1: 'DOCUMENT',
    Object.freeze(new Page()),
    Object.freeze(new Group()),
    Object.freeze(new Shape()),
    Object.freeze(new Image()),
    Object.freeze(new Fragment()),
    Object.freeze(new Text()),
    Object.freeze(new Barcode()),
    Object.freeze(new Chart()),
    null, // 10: 'SURFACE',
    null, // 11: 'STORY',
    Object.freeze(new Document()),
    null, //  13: 'DOC_STRUCTURE_PAGE',
    null, //  14: 'DOC_STRUCTURE_GROUP',
    null, //  15: 'HYPERLINK',
    Object.freeze(new Substitution()),
    Object.freeze(new Repeater()),
    null, //  18: 'STORYREF',
    Object.freeze(new Table()),
    Object.freeze(new TableRow()),
    null, //  21: 'CELL',
    null, //  22: 'TABLE_STORY',
    Object.freeze(new Switch()),
    null, //  24: 'INTERACTIVE',
    null
];

if (__bindings.properties.get) {
    exports.item = function current_item() {
        var type = null;
        try {
            type = +__bindings.properties.get('ItemType');
        } catch (err) {
            throw new Error("No item available!\n" + err);
        }
        type &= OBJECT_CATEGORY_MASK;
        var proxy = proxy_types[type];
        if (!proxy) {
            throw new Error("Unsupported item type " + type + '!');
        }
        return proxy;
    };
}

if (__bindings.properties.cursor) {
    exports.cursor = function current_cursor(absolute) {
        return __bindings.properties.cursor(absolute
            ? 'COORD_PAGE'
            : null);
    };
}
