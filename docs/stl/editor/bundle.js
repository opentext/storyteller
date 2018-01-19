require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./empower.json":[function(require,module,exports){
module.exports={
    "enums": {
        "item": {
            "TABLE": 5,
            "IMAGE": 6,
            "TEXT": 14
        },
        "content": {
            "NULL": 0,
            "VARIABLE_START": -384,
            "HYPERLINK_START": -252,
            "OBJECT_START": -251,
            "PARAGRAPH_BREAK": -244,
            "SUPERSCRIPT_START": -240,
            "SUBSCRIPT_START": -239,
            "VARIABLE_END": -111,
            "HYPERLINK_END": -109,
            "OBJECT_END": -106,
            "CONTENT_END": -64,
            "COLOR_CHANGE": -63,
            "FONT_CHANGE": -62,
            "SUBSCRIPT_END": -58,
            "SUPERSCRIPT_END": -59
        },
        "list": {
            "NONE": 0,
            "BULLETS": 1,
            "NUMBERING": 2
        },
        "numbering": {
            "0": "1.",
            "2": "A.",
            "3": "a.",
            "4": "R.",
            "5": "r.",
            "6": "1)",
            "7": "A)",
            "8": "a)",
            "9": "R)",
            "10": "r)",
            "15": "(1)",
            "16": "(A)",
            "17": "(a)",
            "18": "(R)",
            "19": "(r)"
        },
        "linespacing": {
            "SINGLE": 0,
            "EXACT": 4
        },
        "pen": {
            "SOLID": 0,
            "DASHED": 1,
            "DOTTED": 3
        },
        "valign": {
            "TOP": 0,
            "CENTER": 1,
            "BOTTOM": 2
        },
        "segmentpos": {
            "TOP": 1,
            "RIGHT": 2,
            "BOTTOM": 4,
            "LEFT": 8
        },
        "defaults": {
            "bullets": ["•", "◦", "▪"],
            "numberings": ["1.", "1.", "r.", "1)"]
        }
    },
    "factory": {
        "color": {
            "m_eColorModel": 0,
            "m_lColor": null
        },
        "font": {
            "strName": null,
            "iTracking": 0,
            "clrFontColor": null,
            "iFontHeight10X": null,
            "bBold": null,
            "bItalic": null,
            "bUnderline": null,
            "bStrikeThru": null
        },
        "paragraph": {
            "m_iEditAreaNdx": -1,
            "iNumbering": null,
            "iDefaultTab": null,
            "iBulletFont": null,
            "iNumberIndent": null,
            "iLeftIndent": null,
            "bUserSetType": null,
            "iNumberColor": null,
            "bUserSetColor": null,
            "eNumberType": null,
            "eUserSetNumber": null
        },
        "link": {
            "eLinkType": 0,
            "msLink": null,
            "oiVariable": -1,
            "bNewWindow": true
        },
        "textprops": {
            "m_eEditChangeType": 1,
            "m_bCanType": true,
            "m_eTextField": 3,
            "m_bCanChangeFormat": true,
            "m_bCanChangeProperties": false,
            "m_iCanDoObjProps": 0,
            "m_msLink": "",
            "m_eLinkType": 1,
            "m_oiLink": 0
        },
        "varprops" : {
            "iArrayUse": 0,
            "iArrayNdx": 0,
            "iFormat": 1,
            "msCustom": "",
            "iNumDigits": 2,
            "iConvMask": 0,
            "bConvYen": false,
            "iLength": 0,
            "eJustify": 0,
            "ePadChar": 0,
            "iSizeType": 0,
            "iHeight": 0,
            "iWidth": 0,
            "iOffset": 0,
            "m_eEncoding": 0,
            "msDisplay": "",
            "iFrameStyle": 0,
            "iFrameWt": 0,
            "clrFrameLine": null,
            "iFrameLineStyle": 0,
            "iRotate": 0,
            "oiLocSearchKey": 0,
            "eSubstitutionTime": -1,
            "eAggregateDataVarUse": 0,
            "m_eFitting": 0,
            "m_oiFittingVar": 0,
            "m_eAlignFrom": 0,
            "m_oiAlignFromVar": 0,
            "m_bSnapBoundingBoxToImage": false,
            "m_bUseAspectRatio": false
        },
        "objref": {
            "m_iObjType": null,
            "m_eAnchor": 6
        },
        "image": {
            "iVersion": 1101,
            "m_eComponentType": 6,
            "m_eDynamic": 168,
            "m_pDrawObj": {
                "m_oiID": null,
                "m_UNITSPERINCH": 1000,
                "m_bPen": 0,
                "m_pDbBitmap": {
                    "m_oiDB": null,
                    "m_strCASId": null
                },
                "m_oiLayer": 0,
                "m_rectPosition": {
                    "left": null,
                    "top": null,
                    "bottom": null,
                    "right": null
                }
            }
        },
        "text": {
            "m_eComponentType": 14,
            "m_eDynamic": 40,
            "m_pDrawObj": {
                "m_bAutoSizeX": null,
                "m_bAutoSizeY": null,
                "m_rectPosition": {
                    "left": null,
                    "right": null,
                    "top": null,
                    "bottom": null
                },
                "m_pEditableProps": null,
                "m_UNITSPERINCH": 1000,
                "m_iLogicalRes": 1000,
                "m_iDesignRes": 1000,
                "m_bPen": false,
                "m_iPenWidth": 0,
                "m_eFrameStyle": 0,
                "m_iPenStyle": 0,
                "m_clrPen": null,
                "m_iFrameStyleExtent": 0,
                "m_iLeftMargin": 0,
                "m_iRightMargin": 0,
                "m_iTopMargin": 0,
                "m_iBottomMargin": 0,
                "m_bBackGroundTransparent": true,
                "m_bHideEmpty": false,
                "m_ParaValues": [],
                "m_TextFonts": [],
                "m_Colors": [],
                "m_cChars": [],
                "m_sXPos": [],
                "m_oiLayer": 0,
                "m_pObjs": [],
                "m_Objs": [],
                "m_Links": [],
                "m_iWidth": null,
                "m_iMaxWidthDes": null,
                "m_oiID": null,
                "m_VarProps": [],
                "m_ppEditableAreas": [],
                "m_Rules": []
            }
        },
        "tableprops": {
            "iVersion": 121,
            "m_eCanBeHidden": 0,
            "m_bCanBeResized": false,
            "m_bCanBeMoved": false,
            "m_eEditChangeType": null,
            "m_bCanChangeFormat": null,
            "m_bCanType": null,
            "m_bCanChangeProperties": false,
            "m_eValidation, enumLiveValidation": 0,
            "m_oiContentVariable": 0,
            "m_iBegin": 0,
            "m_iEnd": 0,
            "m_eContentPickType": 6,
            "m_iCanDoObjProps": 0,
            "m_eListListType": 0,
            "m_msToolTip": "",
            "m_oiListReturnVariable": 0,
            "m_bLinkVisited": false,
            "m_oiListDisplayVariable": 0,
            "m_bAllowMultiselect": false,
            "m_bUseSortedList": false,
            "m_ListItems": {
                "iVersion": 101,
                "m_pListItems": []
            },
            "m_oiEnableVariable": 0,
            "m_bChanged": false,
            "m_msLink": "",
            "m_bCanBeRotated": false,
            "m_eTextField": null,
            "m_iMinimumTextWidth": 100,
            "m_msName": "",
            "m_oiSelectionVariable": 0,
            "m_ePromptType": null,
            "m_msSelectionValue": "",
            "m_bHiddenByUser": false,
            "m_bValid": true,
            "m_iContentVarIndex": 0,
            "m_eLinkType": 0,
            "m_oiLink": 0,
            "m_msFormMask": "",
            "m_eFormFieldSource": 0,
            "m_oiFormField": 0,
            "m_FormFieldInfoLocal": {
                "iVersion": 102,
                "m_eCombType": 1,
                "m_clrLine": null,
                "m_clrFill": null,
                "m_iLineWidth": 1,
                "m_bFill": false,
                "m_bAutoSize": true,
                "m_iFormSpace": 10,
                "m_iFormHeight": 200,
                "m_iFormWidth": 100,
                "m_bAllowFormInsert": true
            },
            "m_oiStartButtonFunction": 0,
            "m_oiEndButtonFunction": 0,
            "m_msLiveCaption": "",
            "m_eInheritance": 1,
            "m_iTabOrderID": null,
            "m_bShowTabInDesigner": 1,
            "m_bAllowTabStop": 1,
            "m_msUploadPrompt": "",
            "m_bInLibrary": false,
            "m_lTableNumber": 270,
            "m_oi": 0,
            "m_strName": "",
            "m_dtExpires": {
                "m_dt": 0,
                "m_status": 2
            },
            "m_bIsDBCSMode": false,
            "m_ownsObjectRefMetadata": [],
            "m_bExcludeFromOutlineTree": false,
            "m_bCanChangeTextProperties": false,
            "m_bRequireComment": false,
            "m_oiObjPropsVarOIs": [0, 0, 0, 0, 0, 0, 0, 0],
            "m_ePageNameMethod": 0,
            "m_oiPageNameVariable": 0,
            "m_msPageNameStatic": ""            
        },
        "table": {
            "m_eComponentType": 5,
            "m_eDynamic": 41,
            "m_pDrawObj": {
                "iDbDrawObjVersion": -174,
                "m_oiID": null,
                "m_rectPosition": {
                    "left": null,
                    "top": null,
                    "right": null,
                    "bottom": null
                },
                "m_iCurrentAngle": 0,
                "m_bFlipH": false,
                "m_bFlipV": false,
                "m_bHAutoSize": false,
                "m_bVAutoSize": true,
                "m_eUserSizable": 3,
                "m_UNITSPERINCH": 1000,
                "m_ePosRelToAbove": 0,
                "m_iRelPosReqdY": 0,
                "m_bPen": true,
                "m_iPenStyle": 0,
                "m_iPenWidth": 1,
                "m_clrPen": null,
                "m_bBrush": false,
                "m_iBrushFillType": 0,
                "m_clrBrushFill": null,
                "m_iBrushHatch": 0,
                "m_bDuplex": false,
                "m_oiRef1": 0,
                "m_oiRef2": 0,
                "m_bCanSplit": false,
                "m_eFlowTargetType": 1,
                "m_iSizeMinimum": 0,
                "m_iSizeMaximum": 11000,
                "m_clrShadow": null,
                "m_eShadow": 0,
                "m_iShadowFill": 0,
                "m_bDragProportional": false,
                "m_eFlowAround": 0,
                "m_eFlowBreak": 0,
                "m_eAnchor": 0,
                "m_eLocked": 0,
                "bRule": false,
                "m_eDynamic": 41,
                "m_eDelayComp": 0,
                "m_sName": "Table",
                "m_eIgnoreRelative": 1,
                "m_iFlowBreakMargin": 0,
                "m_bEnableChecksum": false,
                "m_sHyperlink": "",
                "m_eHyperlinkType": 0,
                "m_oiHyperlinkVar": 0,
                "m_bHyperlinkNewWindow": false,
                "m_iOwnedBy": 5177914,
                "m_iMinFlowSize": 0,
                "m_eEmbedInfo": 0,
                "m_oiAssociatedObjectID": 0,
                "m_oiLayer": 0,
                "m_cOverlapFlags": 0,
                "m_aSubscribe": [],
                "m_bHidden": false,
                "m_oiVisibleVariable": 0,
                "m_bIsLiveEditable": true,
                "m_pEditableProps": null,
                "m_bLightenOnHoverOver": false,
                "m_iTabOrder": 2,
                "m_iNextEditAreaID": 4,
                "m_iTabObjectID": 5,
                "m_iCurrentVarIndex": 0,
                "m_bNoFillAbove": false,
                "m_bNoFillBelow": false,
                "m_bNoFillBetween": false,
                "bCanHaveMetaData": true,
                "m_pMetaProps": {
                    "iVersion": 103,
                    "m_iOrder": 1,
                    "m_eMetaOpts": 2,
                    "m_strAltText": "",
                    "m_eMetaLanguage": 0,
                    "m_ePDFTag": 0
                },
                "m_refManyMetadata": [],
                "m_oiCommentRevision": 0,
                "m_pPdfBookmarkEntry": null,
                "m_iDesignVarIndex": 0,
                "m_bForceDynamicFlow": false,
                "m_bProductOfDxfImport": false,
                "m_eLateCompose": 0,
                "m_bInAvailableObjects": false,
                "m_oiHyperlinkAnchorVar": 0,
                "iVersionDbDrawTable": -108,
                "m_eTitlePos": 0,
                "m_iTitleHeight": 300,
                "m_bAlternateFill": false,
                "m_bRemoveEmptyRows": false,
                "m_Cells": [],
                "m_Columns": [],
                "m_Rows": [],
                "m_oiSortVar": 0,
                "m_ndxSortVar": 1,
                "m_eFrameStyle": 0,
                "m_bEnableLegendBoxes": false,
                "m_iLegendBoxPos": 200,
                "m_iLegendBoxPosY": 100,
                "m_iLegendBoxSize": 150,
                "m_eLegendFrameStyle": 0,
                "m_colorLegendFrame": null,
                "m_pAllPageTotalVarInfo": [],
                "m_bKeepGroupsTogether": false,
                "m_eTableType": 1,
                "m_bEnableDataSections": true,
                "m_eBreakFlowHorz": 0,
                "m_bAutoFitWidth": false,
                "m_iAutoWidth": 6E3,
                "m_iTableBreakDelta": 0,
                "m_bUsesSysTableCol": false,
                "m_iFrameStyleExtent": 1,
                "m_bIgnoreOrphansWithSerpentineRows": false,
                "m_bRTFTable": false
            }
        },
        "column": {
            "iVersion": -103,
            "m_iWidth": null,
            "m_iLineLeft": -1,
            "m_iLineRight": -1,
            "m_clrLeft": null,
            "m_clrRight": null,
            "m_iWeightLeft": 1,
            "m_iWeightRight": 1,
            "m_oiRuleSaved": 0,
            "m_eAutoWidth": 0,
            "m_iMaxAutoWidth": 1E5,
            "m_iMinAutoWidth": 0,
            "m_eAutoColumnType": 0,
            "m_eRepeatMethod": 0,
            "m_iNumRepeat": 1,
            "m_oiRepeatVar": 0,
            "m_bPageBegin": false,
            "m_iOrphanColumns": 0,
            "m_oiBreakVar": 0,
            "m_bGrouped": false,
            "m_iGroupedColumnMode": 0,
            "m_eRuleStatus": 0,
            "m_pEditableProps": null
        },
        "row": {
            "iVersion": -109,
            "m_iHeight": null,
            "m_iLineAbove": -1,
            "m_iLineBelow": -1,
            "m_clrAbove": null,
            "m_clrBelow": null,
            "m_iWeightAbove": 1,
            "m_iWeightBelow": 1,
            "m_eJoined": 0,
            "m_bRowSplit": false,
            "m_bCellsSized": false,
            "m_eRowType": 0,
            "m_eAutoSize": 0,
            "m_iRepeatVarCount": 1,
            "m_iSerpentineCells": 1,
            "m_eSectionUse": 0,
            "m_sSectionName": "",
            "m_oiSectionRefVar": 0,
            "m_bPageBegin": false,
            "m_eSpecialRowProps": 0,
            "m_oiRuleSaved": 0,
            "m_bGrouped": false,
            "m_eColumnFlow": 2,
            "m_bFixedSize": null,
            "m_iGroupedRowMode": 0,
            "m_sFilter": "",
            "m_bLegBox": false,
            "m_colorLegend": null,
            "m_styleLegend": 0,
            "m_eOverlap": 0,
            "m_pTableCells": [],
            "m_bSectionCollapsed": false,
            "m_iRepeatVarIndex": false,
            "m_iNumDivRepeatRows": 4,
            "m_pRowIncludeInfo": [],
            "m_pEditableProps": null
        },
        "cell": {
            "m_pTextDraw": null,
            "iVersionDbTableCell": -105,
            "m_iColumn": null,
            "m_iRow": null,
            "m_sCellRule": "",
            "m_lFrameStyle": 0,
            "m_numCols": 1,
            "m_bOverlapCell": false,
            "m_iCellWidth": 0,
            "m_eComposeTime": 0,
            "m_eCellTotalVarUse": 0,
            "m_eCellSplit": 0,
            "m_eCellOverlapHdrPosition": 0,
            "m_oiAutoJoinEqual": 0,
            "m_FrameSegShape": {
                "iVersion": 101,
                "m_eShape": -1,
                "m_rect": {
                    "left": 0,
                    "top": 0,
                    "right": 0,
                    "bottom": 0
                },
                "m_ecpCornerMask": 0,
                "m_ppSegments": []
            },
            "m_iCurrentVarIndex": 0,
            "m_pMetaProps": {
                "iVersion": 103,
                "m_iOrder": 1,
                "m_eMetaOpts": 2,
                "m_strAltText": "",
                "m_eMetaLanguage": 0,
                "m_ePDFTag": 0
            }
        },
        "cell_corner": {
            "iSegmentVersion": 101,
            "m_estType": 2,
            "m_iLineStyle": null,
            "m_iLineWeight": null,
            "m_clrLine": null,
            "m_bVisible": false,
            "iCornerVersion": 101,
            "m_ecpCorner": null,
            "m_ecsStyle": 0,
            "m_iRadius": 0
        },
        "cell_edge": {
            "iSegmentVersion": 101,
            "m_estType": 1,
            "m_iLineStyle": null,
            "m_iLineWeight": null,
            "m_clrLine": null,
            "m_bVisible": false,
            "iLineVersion": 101,
            "m_elpPosition": null
        },
        "content": {
            "m_lResolution": 1000,
            "m_pTextDraw": null,
            "m_bTextOnly": true,
            "m_oiLanguage": 0
        },
        "canvas": {
            "m_lResolution": null,
            "m_bTextOnly": false,
            "m_lWidth": null,
            "m_lHeight": null,
            "m_lTopMargin": null,
            "m_lBottomMargin": null,
            "m_lGrowMaxY": null,
            "m_bHasDynamicBottom": false,
            "m_bAllStatic": false,
            "m_bHasStatic": false,
            "m_iGrowth": 0,
            "m_DrawFront": [],
            "m_FrontRelNdx": [],
            "m_iFrontBottomMin": 101,
            "m_iFrontStaticBottom": 750,
            "m_iFrontDynBottom": 750,
            "m_bHasFlowLists": false,
            "m_FrontFlowControls": []
        },
        "root": {
            "m_lTableNumber": 21,
            "m_oi": null,
            "m_strName": "",
            "m_ePageType": null,
            "m_iDesignResolution": null,
            "m_Size": {
                "width": null,
                "height": null
            },
            "m_bSendDefault": true,
            "m_refUsageRule": 0,
            "m_scopedMessageTemplate": null,
            "m_scopedMessageType": null,
            "m_bCanSplitText": false,
            "m_iWidowOrphan": 0,
            "m_bRenumberText": false,
            "m_lBottomFlowMargin": 0,
            "m_lTopFlowMargin": 0,
            "contents": null,
            "rule": null
        }
    }
}

},{}],"/forsetup/js/core/xml2js/bom.js":[function(require,module,exports){
// Generated by CoffeeScript 1.10.0
(function() {
  "use strict";
  exports.stripBOM = function(str) {
    if (str[0] === '\uFEFF') {
      return str.substring(1);
    } else {
      return str;
    }
  };

}).call(this);

},{}],"/forsetup/js/core/xml2js/processors.js":[function(require,module,exports){
// Generated by CoffeeScript 1.10.0
(function() {
  "use strict";
  var prefixMatch;

  prefixMatch = new RegExp(/(?!xmlns)^.*:/);

  exports.normalize = function(str) {
    return str.toLowerCase();
  };

  exports.firstCharLowerCase = function(str) {
    return str.charAt(0).toLowerCase() + str.slice(1);
  };

  exports.stripPrefix = function(str) {
    return str.replace(prefixMatch, '');
  };

  exports.parseNumbers = function(str) {
    if (!isNaN(str)) {
      str = str % 1 === 0 ? parseInt(str, 10) : parseFloat(str);
    }
    return str;
  };

  exports.parseBooleans = function(str) {
    if (/^(?:true|false)$/i.test(str)) {
      str = str.toLowerCase() === 'true';
    }
    return str;
  };

}).call(this);

},{}],"/forsetup/js/core/xmldom/dom.js":[function(require,module,exports){
/*
 * DOM Level 2
 * Object DOMException
 * @see http://www.w3.org/TR/REC-DOM-Level-1/ecma-script-language-binding.html
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/ecma-script-binding.html
 */

function copy(src,dest){
	for(var p in src){
		dest[p] = src[p];
	}
}
/**
^\w+\.prototype\.([_\w]+)\s*=\s*((?:.*\{\s*?[\r\n][\s\S]*?^})|\S.*?(?=[;\r\n]));?
^\w+\.prototype\.([_\w]+)\s*=\s*(\S.*?(?=[;\r\n]));?
 */
function _extends(Class,Super){
	function t(){};
	var pt = Class.prototype;
	if(Object.create){
		var ppt = Object.create(Super.prototype)
		pt.__proto__ = ppt;
	}
	if(!(pt instanceof Super)){
		t.prototype = Super.prototype;
		t = new t();
		copy(pt,t);
		Class.prototype = pt = t;
	}
	if(pt.constructor != Class){
		if(typeof Class != 'function'){
			console.error("unknow Class:"+Class)
		}
		pt.constructor = Class
	}
}
var htmlns = 'http://www.w3.org/1999/xhtml' ;
// Node Types
var NodeType = {}
var ELEMENT_NODE                = NodeType.ELEMENT_NODE                = 1;
var ATTRIBUTE_NODE              = NodeType.ATTRIBUTE_NODE              = 2;
var TEXT_NODE                   = NodeType.TEXT_NODE                   = 3;
var CDATA_SECTION_NODE          = NodeType.CDATA_SECTION_NODE          = 4;
var ENTITY_REFERENCE_NODE       = NodeType.ENTITY_REFERENCE_NODE       = 5;
var ENTITY_NODE                 = NodeType.ENTITY_NODE                 = 6;
var PROCESSING_INSTRUCTION_NODE = NodeType.PROCESSING_INSTRUCTION_NODE = 7;
var COMMENT_NODE                = NodeType.COMMENT_NODE                = 8;
var DOCUMENT_NODE               = NodeType.DOCUMENT_NODE               = 9;
var DOCUMENT_TYPE_NODE          = NodeType.DOCUMENT_TYPE_NODE          = 10;
var DOCUMENT_FRAGMENT_NODE      = NodeType.DOCUMENT_FRAGMENT_NODE      = 11;
var NOTATION_NODE               = NodeType.NOTATION_NODE               = 12;

// ExceptionCode
var ExceptionCode = {}
var ExceptionMessage = {};
var INDEX_SIZE_ERR              = ExceptionCode.INDEX_SIZE_ERR              = ((ExceptionMessage[1]="Index size error"),1);
var DOMSTRING_SIZE_ERR          = ExceptionCode.DOMSTRING_SIZE_ERR          = ((ExceptionMessage[2]="DOMString size error"),2);
var HIERARCHY_REQUEST_ERR       = ExceptionCode.HIERARCHY_REQUEST_ERR       = ((ExceptionMessage[3]="Hierarchy request error"),3);
var WRONG_DOCUMENT_ERR          = ExceptionCode.WRONG_DOCUMENT_ERR          = ((ExceptionMessage[4]="Wrong document"),4);
var INVALID_CHARACTER_ERR       = ExceptionCode.INVALID_CHARACTER_ERR       = ((ExceptionMessage[5]="Invalid character"),5);
var NO_DATA_ALLOWED_ERR         = ExceptionCode.NO_DATA_ALLOWED_ERR         = ((ExceptionMessage[6]="No data allowed"),6);
var NO_MODIFICATION_ALLOWED_ERR = ExceptionCode.NO_MODIFICATION_ALLOWED_ERR = ((ExceptionMessage[7]="No modification allowed"),7);
var NOT_FOUND_ERR               = ExceptionCode.NOT_FOUND_ERR               = ((ExceptionMessage[8]="Not found"),8);
var NOT_SUPPORTED_ERR           = ExceptionCode.NOT_SUPPORTED_ERR           = ((ExceptionMessage[9]="Not supported"),9);
var INUSE_ATTRIBUTE_ERR         = ExceptionCode.INUSE_ATTRIBUTE_ERR         = ((ExceptionMessage[10]="Attribute in use"),10);
//level2
var INVALID_STATE_ERR        	= ExceptionCode.INVALID_STATE_ERR        	= ((ExceptionMessage[11]="Invalid state"),11);
var SYNTAX_ERR               	= ExceptionCode.SYNTAX_ERR               	= ((ExceptionMessage[12]="Syntax error"),12);
var INVALID_MODIFICATION_ERR 	= ExceptionCode.INVALID_MODIFICATION_ERR 	= ((ExceptionMessage[13]="Invalid modification"),13);
var NAMESPACE_ERR            	= ExceptionCode.NAMESPACE_ERR           	= ((ExceptionMessage[14]="Invalid namespace"),14);
var INVALID_ACCESS_ERR       	= ExceptionCode.INVALID_ACCESS_ERR      	= ((ExceptionMessage[15]="Invalid access"),15);


function DOMException(code, message) {
	if(message instanceof Error){
		var error = message;
	}else{
		error = this;
		Error.call(this, ExceptionMessage[code]);
		this.message = ExceptionMessage[code];
		if(Error.captureStackTrace) Error.captureStackTrace(this, DOMException);
	}
	error.code = code;
	if(message) this.message = this.message + ": " + message;
	return error;
};
DOMException.prototype = Error.prototype;
copy(ExceptionCode,DOMException)
/**
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-536297177
 * The NodeList interface provides the abstraction of an ordered collection of nodes, without defining or constraining how this collection is implemented. NodeList objects in the DOM are live.
 * The items in the NodeList are accessible via an integral index, starting from 0.
 */
function NodeList() {
};
NodeList.prototype = {
	/**
	 * The number of nodes in the list. The range of valid child node indices is 0 to length-1 inclusive.
	 * @standard level1
	 */
	length:0, 
	/**
	 * Returns the indexth item in the collection. If index is greater than or equal to the number of nodes in the list, this returns null.
	 * @standard level1
	 * @param index  unsigned long 
	 *   Index into the collection.
	 * @return Node
	 * 	The node at the indexth position in the NodeList, or null if that is not a valid index. 
	 */
	item: function(index) {
		return this[index] || null;
	}
};
function LiveNodeList(node,refresh){
	this._node = node;
	this._refresh = refresh
	_updateLiveList(this);
}
function _updateLiveList(list){
	var inc = list._node._inc || list._node.ownerDocument._inc;
	if(list._inc != inc){
		var ls = list._refresh(list._node);
		//console.log(ls.length)
		__set__(list,'length',ls.length);
		copy(ls,list);
		list._inc = inc;
	}
}
LiveNodeList.prototype.item = function(i){
	_updateLiveList(this);
	return this[i];
}

_extends(LiveNodeList,NodeList);
/**
 * 
 * Objects implementing the NamedNodeMap interface are used to represent collections of nodes that can be accessed by name. Note that NamedNodeMap does not inherit from NodeList; NamedNodeMaps are not maintained in any particular order. Objects contained in an object implementing NamedNodeMap may also be accessed by an ordinal index, but this is simply to allow convenient enumeration of the contents of a NamedNodeMap, and does not imply that the DOM specifies an order to these Nodes.
 * NamedNodeMap objects in the DOM are live.
 * used for attributes or DocumentType entities 
 */
function NamedNodeMap() {
};

function _findNodeIndex(list,node){
	var i = list.length;
	while(i--){
		if(list[i] === node){return i}
	}
}

function _addNamedNode(el,list,newAttr,oldAttr){
	if(oldAttr){
		list[_findNodeIndex(list,oldAttr)] = newAttr;
	}else{
		list[list.length++] = newAttr;
	}
	if(el){
		newAttr.ownerElement = el;
		var doc = el.ownerDocument;
		if(doc){
			oldAttr && _onRemoveAttribute(doc,el,oldAttr);
			_onAddAttribute(doc,el,newAttr);
		}
	}
}
function _removeNamedNode(el,list,attr){
	var i = _findNodeIndex(list,attr);
	if(i>=0){
		var lastIndex = list.length-1
		while(i<lastIndex){
			list[i] = list[++i]
		}
		list.length = lastIndex;
		if(el){
			var doc = el.ownerDocument;
			if(doc){
				_onRemoveAttribute(doc,el,attr);
				attr.ownerElement = null;
			}
		}
	}else{
		throw DOMException(NOT_FOUND_ERR,new Error())
	}
}
NamedNodeMap.prototype = {
	length:0,
	item:NodeList.prototype.item,
	getNamedItem: function(key) {
//		if(key.indexOf(':')>0 || key == 'xmlns'){
//			return null;
//		}
		var i = this.length;
		while(i--){
			var attr = this[i];
			if(attr.nodeName == key){
				return attr;
			}
		}
	},
	setNamedItem: function(attr) {
		var el = attr.ownerElement;
		if(el && el!=this._ownerElement){
			throw new DOMException(INUSE_ATTRIBUTE_ERR);
		}
		var oldAttr = this.getNamedItem(attr.nodeName);
		_addNamedNode(this._ownerElement,this,attr,oldAttr);
		return oldAttr;
	},
	/* returns Node */
	setNamedItemNS: function(attr) {// raises: WRONG_DOCUMENT_ERR,NO_MODIFICATION_ALLOWED_ERR,INUSE_ATTRIBUTE_ERR
		var el = attr.ownerElement, oldAttr;
		if(el && el!=this._ownerElement){
			throw new DOMException(INUSE_ATTRIBUTE_ERR);
		}
		oldAttr = this.getNamedItemNS(attr.namespaceURI,attr.localName);
		_addNamedNode(this._ownerElement,this,attr,oldAttr);
		return oldAttr;
	},

	/* returns Node */
	removeNamedItem: function(key) {
		var attr = this.getNamedItem(key);
		_removeNamedNode(this._ownerElement,this,attr);
		return attr;
		
		
	},// raises: NOT_FOUND_ERR,NO_MODIFICATION_ALLOWED_ERR
	
	//for level2
	removeNamedItemNS:function(namespaceURI,localName){
		var attr = this.getNamedItemNS(namespaceURI,localName);
		_removeNamedNode(this._ownerElement,this,attr);
		return attr;
	},
	getNamedItemNS: function(namespaceURI, localName) {
		var i = this.length;
		while(i--){
			var node = this[i];
			if(node.localName == localName && node.namespaceURI == namespaceURI){
				return node;
			}
		}
		return null;
	}
};
/**
 * @see http://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-102161490
 */
function DOMImplementation(/* Object */ features) {
	this._features = {};
	if (features) {
		for (var feature in features) {
			 this._features = features[feature];
		}
	}
};

DOMImplementation.prototype = {
	hasFeature: function(/* string */ feature, /* string */ version) {
		var versions = this._features[feature.toLowerCase()];
		if (versions && (!version || version in versions)) {
			return true;
		} else {
			return false;
		}
	},
	// Introduced in DOM Level 2:
	createDocument:function(namespaceURI,  qualifiedName, doctype){// raises:INVALID_CHARACTER_ERR,NAMESPACE_ERR,WRONG_DOCUMENT_ERR
		var doc = new Document();
		doc.implementation = this;
		doc.childNodes = new NodeList();
		doc.doctype = doctype;
		if(doctype){
			doc.appendChild(doctype);
		}
		if(qualifiedName){
			var root = doc.createElementNS(namespaceURI,qualifiedName);
			doc.appendChild(root);
		}
		return doc;
	},
	// Introduced in DOM Level 2:
	createDocumentType:function(qualifiedName, publicId, systemId){// raises:INVALID_CHARACTER_ERR,NAMESPACE_ERR
		var node = new DocumentType();
		node.name = qualifiedName;
		node.nodeName = qualifiedName;
		node.publicId = publicId;
		node.systemId = systemId;
		// Introduced in DOM Level 2:
		//readonly attribute DOMString        internalSubset;
		
		//TODO:..
		//  readonly attribute NamedNodeMap     entities;
		//  readonly attribute NamedNodeMap     notations;
		return node;
	}
};


/**
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-1950641247
 */

function Node() {
};

Node.prototype = {
	firstChild : null,
	lastChild : null,
	previousSibling : null,
	nextSibling : null,
	attributes : null,
	parentNode : null,
	childNodes : null,
	ownerDocument : null,
	nodeValue : null,
	namespaceURI : null,
	prefix : null,
	localName : null,
	// Modified in DOM Level 2:
	insertBefore:function(newChild, refChild){//raises 
		return _insertBefore(this,newChild,refChild);
	},
	replaceChild:function(newChild, oldChild){//raises 
		this.insertBefore(newChild,oldChild);
		if(oldChild){
			this.removeChild(oldChild);
		}
	},
	removeChild:function(oldChild){
		return _removeChild(this,oldChild);
	},
	appendChild:function(newChild){
		return this.insertBefore(newChild,null);
	},
	hasChildNodes:function(){
		return this.firstChild != null;
	},
	cloneNode:function(deep){
		return cloneNode(this.ownerDocument||this,this,deep);
	},
	// Modified in DOM Level 2:
	normalize:function(){
		var child = this.firstChild;
		while(child){
			var next = child.nextSibling;
			if(next && next.nodeType == TEXT_NODE && child.nodeType == TEXT_NODE){
				this.removeChild(next);
				child.appendData(next.data);
			}else{
				child.normalize();
				child = next;
			}
		}
	},
  	// Introduced in DOM Level 2:
	isSupported:function(feature, version){
		return this.ownerDocument.implementation.hasFeature(feature,version);
	},
    // Introduced in DOM Level 2:
    hasAttributes:function(){
    	return this.attributes.length>0;
    },
    lookupPrefix:function(namespaceURI){
    	var el = this;
    	while(el){
    		var map = el._nsMap;
    		//console.dir(map)
    		if(map){
    			for(var n in map){
    				if(map[n] == namespaceURI){
    					return n;
    				}
    			}
    		}
    		el = el.nodeType == 2?el.ownerDocument : el.parentNode;
    	}
    	return null;
    },
    // Introduced in DOM Level 3:
    lookupNamespaceURI:function(prefix){
    	var el = this;
    	while(el){
    		var map = el._nsMap;
    		//console.dir(map)
    		if(map){
    			if(prefix in map){
    				return map[prefix] ;
    			}
    		}
    		el = el.nodeType == 2?el.ownerDocument : el.parentNode;
    	}
    	return null;
    },
    // Introduced in DOM Level 3:
    isDefaultNamespace:function(namespaceURI){
    	var prefix = this.lookupPrefix(namespaceURI);
    	return prefix == null;
    }
};


function _xmlEncoder(c){
	return c == '<' && '&lt;' ||
         c == '>' && '&gt;' ||
         c == '&' && '&amp;' ||
         c == '"' && '&quot;' ||
         '&#'+c.charCodeAt()+';'
}


copy(NodeType,Node);
copy(NodeType,Node.prototype);

/**
 * @param callback return true for continue,false for break
 * @return boolean true: break visit;
 */
function _visitNode(node,callback){
	if(callback(node)){
		return true;
	}
	if(node = node.firstChild){
		do{
			if(_visitNode(node,callback)){return true}
        }while(node=node.nextSibling)
    }
}



function Document(){
}
function _onAddAttribute(doc,el,newAttr){
	doc && doc._inc++;
	var ns = newAttr.namespaceURI ;
	if(ns == 'http://www.w3.org/2000/xmlns/'){
		//update namespace
		el._nsMap[newAttr.prefix?newAttr.localName:''] = newAttr.value
	}
}
function _onRemoveAttribute(doc,el,newAttr,remove){
	doc && doc._inc++;
	var ns = newAttr.namespaceURI ;
	if(ns == 'http://www.w3.org/2000/xmlns/'){
		//update namespace
		delete el._nsMap[newAttr.prefix?newAttr.localName:'']
	}
}
function _onUpdateChild(doc,el,newChild){
	if(doc && doc._inc){
		doc._inc++;
		//update childNodes
		var cs = el.childNodes;
		if(newChild){
			cs[cs.length++] = newChild;
		}else{
			//console.log(1)
			var child = el.firstChild;
			var i = 0;
			while(child){
				cs[i++] = child;
				child =child.nextSibling;
			}
			cs.length = i;
		}
	}
}

/**
 * attributes;
 * children;
 * 
 * writeable properties:
 * nodeValue,Attr:value,CharacterData:data
 * prefix
 */
function _removeChild(parentNode,child){
	var previous = child.previousSibling;
	var next = child.nextSibling;
	if(previous){
		previous.nextSibling = next;
	}else{
		parentNode.firstChild = next
	}
	if(next){
		next.previousSibling = previous;
	}else{
		parentNode.lastChild = previous;
	}
	_onUpdateChild(parentNode.ownerDocument,parentNode);
	return child;
}
/**
 * preformance key(refChild == null)
 */
function _insertBefore(parentNode,newChild,nextChild){
	var cp = newChild.parentNode;
	if(cp){
		cp.removeChild(newChild);//remove and update
	}
	if(newChild.nodeType === DOCUMENT_FRAGMENT_NODE){
		var newFirst = newChild.firstChild;
		if (newFirst == null) {
			return newChild;
		}
		var newLast = newChild.lastChild;
	}else{
		newFirst = newLast = newChild;
	}
	var pre = nextChild ? nextChild.previousSibling : parentNode.lastChild;

	newFirst.previousSibling = pre;
	newLast.nextSibling = nextChild;
	
	
	if(pre){
		pre.nextSibling = newFirst;
	}else{
		parentNode.firstChild = newFirst;
	}
	if(nextChild == null){
		parentNode.lastChild = newLast;
	}else{
		nextChild.previousSibling = newLast;
	}
	do{
		newFirst.parentNode = parentNode;
	}while(newFirst !== newLast && (newFirst= newFirst.nextSibling))
	_onUpdateChild(parentNode.ownerDocument||parentNode,parentNode);
	//console.log(parentNode.lastChild.nextSibling == null)
	if (newChild.nodeType == DOCUMENT_FRAGMENT_NODE) {
		newChild.firstChild = newChild.lastChild = null;
	}
	return newChild;
}
function _appendSingleChild(parentNode,newChild){
	var cp = newChild.parentNode;
	if(cp){
		var pre = parentNode.lastChild;
		cp.removeChild(newChild);//remove and update
		var pre = parentNode.lastChild;
	}
	var pre = parentNode.lastChild;
	newChild.parentNode = parentNode;
	newChild.previousSibling = pre;
	newChild.nextSibling = null;
	if(pre){
		pre.nextSibling = newChild;
	}else{
		parentNode.firstChild = newChild;
	}
	parentNode.lastChild = newChild;
	_onUpdateChild(parentNode.ownerDocument,parentNode,newChild);
	return newChild;
	//console.log("__aa",parentNode.lastChild.nextSibling == null)
}
Document.prototype = {
	//implementation : null,
	nodeName :  '#document',
	nodeType :  DOCUMENT_NODE,
	doctype :  null,
	documentElement :  null,
	_inc : 1,
	
	insertBefore :  function(newChild, refChild){//raises 
		if(newChild.nodeType == DOCUMENT_FRAGMENT_NODE){
			var child = newChild.firstChild;
			while(child){
				var next = child.nextSibling;
				this.insertBefore(child,refChild);
				child = next;
			}
			return newChild;
		}
		if(this.documentElement == null && newChild.nodeType == 1){
			this.documentElement = newChild;
		}
		
		return _insertBefore(this,newChild,refChild),(newChild.ownerDocument = this),newChild;
	},
	removeChild :  function(oldChild){
		if(this.documentElement == oldChild){
			this.documentElement = null;
		}
		return _removeChild(this,oldChild);
	},
	// Introduced in DOM Level 2:
	importNode : function(importedNode,deep){
		return importNode(this,importedNode,deep);
	},
	// Introduced in DOM Level 2:
	getElementById :	function(id){
		var rtv = null;
		_visitNode(this.documentElement,function(node){
			if(node.nodeType == 1){
				if(node.getAttribute('id') == id){
					rtv = node;
					return true;
				}
			}
		})
		return rtv;
	},
	
	//document factory method:
	createElement :	function(tagName){
		var node = new Element();
		node.ownerDocument = this;
		node.nodeName = tagName;
		node.tagName = tagName;
		node.childNodes = new NodeList();
		var attrs	= node.attributes = new NamedNodeMap();
		attrs._ownerElement = node;
		return node;
	},
	createDocumentFragment :	function(){
		var node = new DocumentFragment();
		node.ownerDocument = this;
		node.childNodes = new NodeList();
		return node;
	},
	createTextNode :	function(data){
		var node = new Text();
		node.ownerDocument = this;
		node.appendData(data)
		return node;
	},
	createComment :	function(data){
		var node = new Comment();
		node.ownerDocument = this;
		node.appendData(data)
		return node;
	},
	createCDATASection :	function(data){
		var node = new CDATASection();
		node.ownerDocument = this;
		node.appendData(data)
		return node;
	},
	createProcessingInstruction :	function(target,data){
		var node = new ProcessingInstruction();
		node.ownerDocument = this;
		node.tagName = node.target = target;
		node.nodeValue= node.data = data;
		return node;
	},
	createAttribute :	function(name){
		var node = new Attr();
		node.ownerDocument	= this;
		node.name = name;
		node.nodeName	= name;
		node.localName = name;
		node.specified = true;
		return node;
	},
	createEntityReference :	function(name){
		var node = new EntityReference();
		node.ownerDocument	= this;
		node.nodeName	= name;
		return node;
	},
	// Introduced in DOM Level 2:
	createElementNS :	function(namespaceURI,qualifiedName){
		var node = new Element();
		var pl = qualifiedName.split(':');
		var attrs	= node.attributes = new NamedNodeMap();
		node.childNodes = new NodeList();
		node.ownerDocument = this;
		node.nodeName = qualifiedName;
		node.tagName = qualifiedName;
		node.namespaceURI = namespaceURI;
		if(pl.length == 2){
			node.prefix = pl[0];
			node.localName = pl[1];
		}else{
			//el.prefix = null;
			node.localName = qualifiedName;
		}
		attrs._ownerElement = node;
		return node;
	},
	// Introduced in DOM Level 2:
	createAttributeNS :	function(namespaceURI,qualifiedName){
		var node = new Attr();
		var pl = qualifiedName.split(':');
		node.ownerDocument = this;
		node.nodeName = qualifiedName;
		node.name = qualifiedName;
		node.namespaceURI = namespaceURI;
		node.specified = true;
		if(pl.length == 2){
			node.prefix = pl[0];
			node.localName = pl[1];
		}else{
			//el.prefix = null;
			node.localName = qualifiedName;
		}
		return node;
	}
};
_extends(Document,Node);


function Element() {
	this._nsMap = {};
};
Element.prototype = {
	nodeType : ELEMENT_NODE,
	hasAttribute : function(name){
		return this.getAttributeNode(name)!=null;
	},
	getAttribute : function(name){
		var attr = this.getAttributeNode(name);
		return attr && attr.value || '';
	},
	getAttributeNode : function(name){
		return this.attributes.getNamedItem(name);
	},
	setAttribute : function(name, value){
		var attr = this.ownerDocument.createAttribute(name);
		attr.value = attr.nodeValue = "" + value;
		this.setAttributeNode(attr)
	},
	removeAttribute : function(name){
		var attr = this.getAttributeNode(name)
		attr && this.removeAttributeNode(attr);
	},
	
	//four real opeartion method
	appendChild:function(newChild){
		if(newChild.nodeType === DOCUMENT_FRAGMENT_NODE){
			return this.insertBefore(newChild,null);
		}else{
			return _appendSingleChild(this,newChild);
		}
	},
	setAttributeNode : function(newAttr){
		return this.attributes.setNamedItem(newAttr);
	},
	setAttributeNodeNS : function(newAttr){
		return this.attributes.setNamedItemNS(newAttr);
	},
	removeAttributeNode : function(oldAttr){
		return this.attributes.removeNamedItem(oldAttr.nodeName);
	},
	//get real attribute name,and remove it by removeAttributeNode
	removeAttributeNS : function(namespaceURI, localName){
		var old = this.getAttributeNodeNS(namespaceURI, localName);
		old && this.removeAttributeNode(old);
	},
	
	hasAttributeNS : function(namespaceURI, localName){
		return this.getAttributeNodeNS(namespaceURI, localName)!=null;
	},
	getAttributeNS : function(namespaceURI, localName){
		var attr = this.getAttributeNodeNS(namespaceURI, localName);
		return attr && attr.value || '';
	},
	setAttributeNS : function(namespaceURI, qualifiedName, value){
		var attr = this.ownerDocument.createAttributeNS(namespaceURI, qualifiedName);
		attr.value = attr.nodeValue = "" + value;
		this.setAttributeNode(attr)
	},
	getAttributeNodeNS : function(namespaceURI, localName){
		return this.attributes.getNamedItemNS(namespaceURI, localName);
	},
	
	getElementsByTagName : function(tagName){
		return new LiveNodeList(this,function(base){
			var ls = [];
			_visitNode(base,function(node){
				if(node !== base && node.nodeType == ELEMENT_NODE && (tagName === '*' || node.tagName == tagName)){
					ls.push(node);
				}
			});
			return ls;
		});
	},
	getElementsByTagNameNS : function(namespaceURI, localName){
		return new LiveNodeList(this,function(base){
			var ls = [];
			_visitNode(base,function(node){
				if(node !== base && node.nodeType === ELEMENT_NODE && (namespaceURI === '*' || node.namespaceURI === namespaceURI) && (localName === '*' || node.localName == localName)){
					ls.push(node);
				}
			});
			return ls;
		});
	}
};
Document.prototype.getElementsByTagName = Element.prototype.getElementsByTagName;
Document.prototype.getElementsByTagNameNS = Element.prototype.getElementsByTagNameNS;


_extends(Element,Node);
function Attr() {
};
Attr.prototype.nodeType = ATTRIBUTE_NODE;
_extends(Attr,Node);


function CharacterData() {
};
CharacterData.prototype = {
	data : '',
	substringData : function(offset, count) {
		return this.data.substring(offset, offset+count);
	},
	appendData: function(text) {
		text = this.data+text;
		this.nodeValue = this.data = text;
		this.length = text.length;
	},
	insertData: function(offset,text) {
		this.replaceData(offset,0,text);
	
	},
	appendChild:function(newChild){
		//if(!(newChild instanceof CharacterData)){
			throw new Error(ExceptionMessage[3])
		//}
		return Node.prototype.appendChild.apply(this,arguments)
	},
	deleteData: function(offset, count) {
		this.replaceData(offset,count,"");
	},
	replaceData: function(offset, count, text) {
		var start = this.data.substring(0,offset);
		var end = this.data.substring(offset+count);
		text = start + text + end;
		this.nodeValue = this.data = text;
		this.length = text.length;
	}
}
_extends(CharacterData,Node);
function Text() {
};
Text.prototype = {
	nodeName : "#text",
	nodeType : TEXT_NODE,
	splitText : function(offset) {
		var text = this.data;
		var newText = text.substring(offset);
		text = text.substring(0, offset);
		this.data = this.nodeValue = text;
		this.length = text.length;
		var newNode = this.ownerDocument.createTextNode(newText);
		if(this.parentNode){
			this.parentNode.insertBefore(newNode, this.nextSibling);
		}
		return newNode;
	}
}
_extends(Text,CharacterData);
function Comment() {
};
Comment.prototype = {
	nodeName : "#comment",
	nodeType : COMMENT_NODE
}
_extends(Comment,CharacterData);

function CDATASection() {
};
CDATASection.prototype = {
	nodeName : "#cdata-section",
	nodeType : CDATA_SECTION_NODE
}
_extends(CDATASection,CharacterData);


function DocumentType() {
};
DocumentType.prototype.nodeType = DOCUMENT_TYPE_NODE;
_extends(DocumentType,Node);

function Notation() {
};
Notation.prototype.nodeType = NOTATION_NODE;
_extends(Notation,Node);

function Entity() {
};
Entity.prototype.nodeType = ENTITY_NODE;
_extends(Entity,Node);

function EntityReference() {
};
EntityReference.prototype.nodeType = ENTITY_REFERENCE_NODE;
_extends(EntityReference,Node);

function DocumentFragment() {
};
DocumentFragment.prototype.nodeName =	"#document-fragment";
DocumentFragment.prototype.nodeType =	DOCUMENT_FRAGMENT_NODE;
_extends(DocumentFragment,Node);


function ProcessingInstruction() {
}
ProcessingInstruction.prototype.nodeType = PROCESSING_INSTRUCTION_NODE;
_extends(ProcessingInstruction,Node);
function XMLSerializer(){}
XMLSerializer.prototype.serializeToString = function(node){
	var buf = [];
	serializeToString(node,buf);
	return buf.join('');
}
Node.prototype.toString =function(){
	return XMLSerializer.prototype.serializeToString(this);
}
function serializeToString(node,buf){
	switch(node.nodeType){
	case ELEMENT_NODE:
		var attrs = node.attributes;
		var len = attrs.length;
		var child = node.firstChild;
		var nodeName = node.tagName;
		var isHTML = htmlns === node.namespaceURI
		buf.push('<',nodeName);
		for(var i=0;i<len;i++){
			serializeToString(attrs.item(i),buf,isHTML);
		}
		if(child || isHTML && !/^(?:meta|link|img|br|hr|input|button)$/i.test(nodeName)){
			buf.push('>');
			//if is cdata child node
			if(isHTML && /^script$/i.test(nodeName)){
				if(child){
					buf.push(child.data);
				}
			}else{
				while(child){
					serializeToString(child,buf);
					child = child.nextSibling;
				}
			}
			buf.push('</',nodeName,'>');
		}else{
			buf.push('/>');
		}
		return;
	case DOCUMENT_NODE:
	case DOCUMENT_FRAGMENT_NODE:
		var child = node.firstChild;
		while(child){
			serializeToString(child,buf);
			child = child.nextSibling;
		}
		return;
	case ATTRIBUTE_NODE:
		return buf.push(' ',node.name,'="',node.value.replace(/[<&"]/g,_xmlEncoder),'"');
	case TEXT_NODE:
		return buf.push(node.data.replace(/[<&]/g,_xmlEncoder));
	case CDATA_SECTION_NODE:
		return buf.push( '<![CDATA[',node.data,']]>');
	case COMMENT_NODE:
		return buf.push( "<!--",node.data,"-->");
	case DOCUMENT_TYPE_NODE:
		var pubid = node.publicId;
		var sysid = node.systemId;
		buf.push('<!DOCTYPE ',node.name);
		if(pubid){
			buf.push(' PUBLIC "',pubid);
			if (sysid && sysid!='.') {
				buf.push( '" "',sysid);
			}
			buf.push('">');
		}else if(sysid && sysid!='.'){
			buf.push(' SYSTEM "',sysid,'">');
		}else{
			var sub = node.internalSubset;
			if(sub){
				buf.push(" [",sub,"]");
			}
			buf.push(">");
		}
		return;
	case PROCESSING_INSTRUCTION_NODE:
		return buf.push( "<?",node.target," ",node.data,"?>");
	case ENTITY_REFERENCE_NODE:
		return buf.push( '&',node.nodeName,';');
	//case ENTITY_NODE:
	//case NOTATION_NODE:
	default:
		buf.push('??',node.nodeName);
	}
}
function importNode(doc,node,deep){
	var node2;
	switch (node.nodeType) {
	case ELEMENT_NODE:
		node2 = node.cloneNode(false);
		node2.ownerDocument = doc;
		//var attrs = node2.attributes;
		//var len = attrs.length;
		//for(var i=0;i<len;i++){
			//node2.setAttributeNodeNS(importNode(doc,attrs.item(i),deep));
		//}
	case DOCUMENT_FRAGMENT_NODE:
		break;
	case ATTRIBUTE_NODE:
		deep = true;
		break;
	//case ENTITY_REFERENCE_NODE:
	//case PROCESSING_INSTRUCTION_NODE:
	////case TEXT_NODE:
	//case CDATA_SECTION_NODE:
	//case COMMENT_NODE:
	//	deep = false;
	//	break;
	//case DOCUMENT_NODE:
	//case DOCUMENT_TYPE_NODE:
	//cannot be imported.
	//case ENTITY_NODE:
	//case NOTATION_NODE：
	//can not hit in level3
	//default:throw e;
	}
	if(!node2){
		node2 = node.cloneNode(false);//false
	}
	node2.ownerDocument = doc;
	node2.parentNode = null;
	if(deep){
		var child = node.firstChild;
		while(child){
			node2.appendChild(importNode(doc,child,deep));
			child = child.nextSibling;
		}
	}
	return node2;
}
//
//var _relationMap = {firstChild:1,lastChild:1,previousSibling:1,nextSibling:1,
//					attributes:1,childNodes:1,parentNode:1,documentElement:1,doctype,};
function cloneNode(doc,node,deep){
	var node2 = new node.constructor();
	for(var n in node){
		var v = node[n];
		if(typeof v != 'object' ){
			if(v != node2[n]){
				node2[n] = v;
			}
		}
	}
	if(node.childNodes){
		node2.childNodes = new NodeList();
	}
	node2.ownerDocument = doc;
	switch (node2.nodeType) {
	case ELEMENT_NODE:
		var attrs	= node.attributes;
		var attrs2	= node2.attributes = new NamedNodeMap();
		var len = attrs.length
		attrs2._ownerElement = node2;
		for(var i=0;i<len;i++){
			node2.setAttributeNode(cloneNode(doc,attrs.item(i),true));
		}
		break;;
	case ATTRIBUTE_NODE:
		deep = true;
	}
	if(deep){
		var child = node.firstChild;
		while(child){
			node2.appendChild(cloneNode(doc,child,deep));
			child = child.nextSibling;
		}
	}
	return node2;
}

function __set__(object,key,value){
	object[key] = value
}

function getTextContent(node){
	switch(node.nodeType){
	case 1:
	case 11:
		var buf = [];
		node = node.firstChild;
		while(node){
			if(node.nodeType!==7 && node.nodeType !==8){
				buf.push(getTextContent(node));
			}
			node = node.nextSibling;
		}
		return buf.join('');
	default:
		return node.nodeValue;
	}
}

//do dynamic
try{
	if(Object.defineProperty){
		Object.defineProperty(LiveNodeList.prototype,'length',{
			get:function(){
				_updateLiveList(this);
				return this.$$length;
			}
		});
		Object.defineProperty(Node.prototype,'textContent',{
			get:function(){
				return getTextContent(this);
			},
			set:function(data){
				switch(this.nodeType){
				case 1:
				case 11:
					while(this.firstChild){
						this.removeChild(this.firstChild);
					}
					if(data || String(data)){
						this.appendChild(this.ownerDocument.createTextNode(data));
					}
					break;
				default:
					//TODO:
					this.data = data;
					this.value = value;
					this.nodeValue = data;
				}
			}
		})
		
		__set__ = function(object,key,value){
			//console.log(value)
			object['$$'+key] = value
		}
	}
}catch(e){//ie8
}

if(typeof require == 'function'){
	exports.DOMImplementation = DOMImplementation;
	exports.XMLSerializer = XMLSerializer;
	exports.isNode = function(n) { return n instanceof Node; };
}

},{}],"/forsetup/js/core/xmldom/sax.js":[function(require,module,exports){
//[4]   	NameStartChar	   ::=   	":" | [A-Z] | "_" | [a-z] | [#xC0-#xD6] | [#xD8-#xF6] | [#xF8-#x2FF] | [#x370-#x37D] | [#x37F-#x1FFF] | [#x200C-#x200D] | [#x2070-#x218F] | [#x2C00-#x2FEF] | [#x3001-#xD7FF] | [#xF900-#xFDCF] | [#xFDF0-#xFFFD] | [#x10000-#xEFFFF]
//[4a]   	NameChar	   ::=   	NameStartChar | "-" | "." | [0-9] | #xB7 | [#x0300-#x036F] | [#x203F-#x2040]
//[5]   	Name	   ::=   	NameStartChar (NameChar)*
var nameStartChar = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]///\u10000-\uEFFFF
var nameChar = new RegExp("[\\-\\.0-9"+nameStartChar.source.slice(1,-1)+"\u00B7\u0300-\u036F\\ux203F-\u2040]");
var tagNamePattern = new RegExp('^'+nameStartChar.source+nameChar.source+'*(?:\:'+nameStartChar.source+nameChar.source+'*)?$');
//var tagNamePattern = /^[a-zA-Z_][\w\-\.]*(?:\:[a-zA-Z_][\w\-\.]*)?$/
//var handlers = 'resolveEntity,getExternalSubset,characters,endDocument,endElement,endPrefixMapping,ignorableWhitespace,processingInstruction,setDocumentLocator,skippedEntity,startDocument,startElement,startPrefixMapping,notationDecl,unparsedEntityDecl,error,fatalError,warning,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,comment,endCDATA,endDTD,endEntity,startCDATA,startDTD,startEntity'.split(',')

//S_TAG,	S_ATTR,	S_EQ,	S_V
//S_ATTR_S,	S_E,	S_S,	S_C
var S_TAG = 0;//tag name offerring
var S_ATTR = 1;//attr name offerring 
var S_ATTR_S=2;//attr name end and space offer
var S_EQ = 3;//=space?
var S_V = 4;//attr value(no quot value only)
var S_E = 5;//attr value end and no space(quot end)
var S_S = 6;//(attr value end || tag end ) && (space offer)
var S_C = 7;//closed el<el />

function XMLReader(){
	
}

XMLReader.prototype = {
	parse:function(source,defaultNSMap,entityMap){
		var domBuilder = this.domBuilder;
		domBuilder.startDocument();
		_copy(defaultNSMap ,defaultNSMap = {})
		parse(source,defaultNSMap,entityMap,
				domBuilder,this.errorHandler);
		domBuilder.endDocument();
	}
}
function parse(source,defaultNSMapCopy,entityMap,domBuilder,errorHandler){
  function fixedFromCharCode(code) {
		// String.prototype.fromCharCode does not supports
		// > 2 bytes unicode chars directly
		if (code > 0xffff) {
			code -= 0x10000;
			var surrogate1 = 0xd800 + (code >> 10)
				, surrogate2 = 0xdc00 + (code & 0x3ff);

			return String.fromCharCode(surrogate1, surrogate2);
		} else {
			return String.fromCharCode(code);
		}
	}
	function entityReplacer(a){
		var k = a.slice(1,-1);
		if(k in entityMap){
			return entityMap[k]; 
		}else if(k.charAt(0) === '#'){
			return fixedFromCharCode(parseInt(k.substr(1).replace('x','0x')))
		}else{
			errorHandler.error('entity not found:'+a);
			return a;
		}
	}
	function appendText(end){//has some bugs
		var xt = source.substring(start,end).replace(/&#?\w+;/g,entityReplacer);
		locator&&position(start);
		domBuilder.characters(xt,0,end-start);
		start = end
	}
	function position(start,m){
		while(start>=endPos && (m = linePattern.exec(source))){
			startPos = m.index;
			endPos = startPos + m[0].length;
			locator.lineNumber++;
			//console.log('line++:',locator,startPos,endPos)
		}
		locator.columnNumber = start-startPos+1;
	}
	var startPos = 0;
	var endPos = 0;
	var linePattern = /.+(?:\r\n?|\n)|.*$/g
	var locator = domBuilder.locator;
	
	var parseStack = [{currentNSMap:defaultNSMapCopy}]
	var closeMap = {};
	var start = 0;
	while(true){
		var i = source.indexOf('<',start);
		if(i<0){
			if(!source.substr(start).match(/^\s*$/)){
				var doc = domBuilder.document;
    			var text = doc.createTextNode(source.substr(start));
    			doc.appendChild(text);
    			domBuilder.currentElement = text;
			}
			return;
		}
		if(i>start){
			appendText(i);
		}
		switch(source.charAt(i+1)){
		case '/':
			var end = source.indexOf('>',i+3);
			var tagName = source.substring(i+2,end);
			var config = parseStack.pop();
			var localNSMap = config.localNSMap;
			
	        if(config.tagName != tagName){
	            errorHandler.fatalError("end tag name: "+tagName+' is not match the current start tagName:'+config.tagName );
	        }
			domBuilder.endElement(config.uri,config.localName,tagName);
			if(localNSMap){
				for(var prefix in localNSMap){
					domBuilder.endPrefixMapping(prefix) ;
				}
			}
			end++;
			break;
			// end elment
		case '?':// <?...?>
			locator&&position(i);
			end = parseInstruction(source,i,domBuilder);
			break;
		case '!':// <!doctype,<![CDATA,<!--
			locator&&position(i);
			end = parseDCC(source,i,domBuilder,errorHandler);
			break;
		default:
			try{
				locator&&position(i);
				
				var el = new ElementAttributes();
				
				//elStartEnd
				var end = parseElementStartPart(source,i,el,entityReplacer,errorHandler);
				var len = el.length;
				//position fixed
				if(len && locator){
					var backup = copyLocator(locator,{});
					for(var i = 0;i<len;i++){
						var a = el[i];
						position(a.offset);
						a.offset = copyLocator(locator,{});
					}
					copyLocator(backup,locator);
				}
				if(!el.closed && fixSelfClosed(source,end,el.tagName,closeMap)){
					el.closed = true;
					if(!entityMap.nbsp){
						errorHandler.warning('unclosed xml attribute');
					}
				}
				appendElement(el,domBuilder,parseStack);
				
				
				if(el.uri === 'http://www.w3.org/1999/xhtml' && !el.closed){
					end = parseHtmlSpecialContent(source,end,el.tagName,entityReplacer,domBuilder)
				}else{
					end++;
				}
			}catch(e){
				errorHandler.error('element parse error: '+e);
				end = -1;
			}

		}
		if(end<0){
			//TODO: 这里有可能sax回退，有位置错误风险
			appendText(i+1);
		}else{
			start = end;
		}
	}
}
function copyLocator(f,t){
	t.lineNumber = f.lineNumber;
	t.columnNumber = f.columnNumber;
	return t;
	
}

/**
 * @see #appendElement(source,elStartEnd,el,selfClosed,entityReplacer,domBuilder,parseStack);
 * @return end of the elementStartPart(end of elementEndPart for selfClosed el)
 */
function parseElementStartPart(source,start,el,entityReplacer,errorHandler){
	var attrName;
	var value;
	var p = ++start;
	var s = S_TAG;//status
	while(true){
		var c = source.charAt(p);
		switch(c){
		case '=':
			if(s === S_ATTR){//attrName
				attrName = source.slice(start,p);
				s = S_EQ;
			}else if(s === S_ATTR_S){
				s = S_EQ;
			}else{
				//fatalError: equal must after attrName or space after attrName
				throw new Error('attribute equal must after attrName');
			}
			break;
		case '\'':
		case '"':
			if(s === S_EQ){//equal
				start = p+1;
				p = source.indexOf(c,start)
				if(p>0){
					value = source.slice(start,p).replace(/&#?\w+;/g,entityReplacer);
					el.add(attrName,value,start-1);
					s = S_E;
				}else{
					//fatalError: no end quot match
					throw new Error('attribute value no end \''+c+'\' match');
				}
			}else if(s == S_V){
				value = source.slice(start,p).replace(/&#?\w+;/g,entityReplacer);
				//console.log(attrName,value,start,p)
				el.add(attrName,value,start);
				//console.dir(el)
				errorHandler.warning('attribute "'+attrName+'" missed start quot('+c+')!!');
				start = p+1;
				s = S_E
			}else{
				//fatalError: no equal before
				throw new Error('attribute value must after "="');
			}
			break;
		case '/':
			switch(s){
			case S_TAG:
				el.setTagName(source.slice(start,p));
			case S_E:
			case S_S:
			case S_C:
				s = S_C;
				el.closed = true;
			case S_V:
			case S_ATTR:
			case S_ATTR_S:
				break;
			//case S_EQ:
			default:
				throw new Error("attribute invalid close char('/')")
			}
			break;
		case ''://end document
			//throw new Error('unexpected end of input')
			errorHandler.error('unexpected end of input');
		case '>':
			switch(s){
			case S_TAG:
				el.setTagName(source.slice(start,p));
			case S_E:
			case S_S:
			case S_C:
				break;//normal
			case S_V://Compatible state
			case S_ATTR:
				value = source.slice(start,p);
				if(value.slice(-1) === '/'){
					el.closed  = true;
					value = value.slice(0,-1)
				}
			case S_ATTR_S:
				if(s === S_ATTR_S){
					value = attrName;
				}
				if(s == S_V){
					errorHandler.warning('attribute "'+value+'" missed quot(")!!');
					el.add(attrName,value.replace(/&#?\w+;/g,entityReplacer),start)
				}else{
					errorHandler.warning('attribute "'+value+'" missed value!! "'+value+'" instead!!')
					el.add(value,value,start)
				}
				break;
			case S_EQ:
				throw new Error('attribute value missed!!');
			}
//			console.log(tagName,tagNamePattern,tagNamePattern.test(tagName))
			return p;
		/*xml space '\x20' | #x9 | #xD | #xA; */
		case '\u0080':
			c = ' ';
		default:
			if(c<= ' '){//space
				switch(s){
				case S_TAG:
					el.setTagName(source.slice(start,p));//tagName
					s = S_S;
					break;
				case S_ATTR:
					attrName = source.slice(start,p)
					s = S_ATTR_S;
					break;
				case S_V:
					var value = source.slice(start,p).replace(/&#?\w+;/g,entityReplacer);
					errorHandler.warning('attribute "'+value+'" missed quot(")!!');
					el.add(attrName,value,start)
				case S_E:
					s = S_S;
					break;
				//case S_S:
				//case S_EQ:
				//case S_ATTR_S:
				//	void();break;
				//case S_C:
					//ignore warning
				}
			}else{//not space
//S_TAG,	S_ATTR,	S_EQ,	S_V
//S_ATTR_S,	S_E,	S_S,	S_C
				switch(s){
				//case S_TAG:void();break;
				//case S_ATTR:void();break;
				//case S_V:void();break;
				case S_ATTR_S:
					errorHandler.warning('attribute "'+attrName+'" missed value!! "'+attrName+'" instead!!')
					el.add(attrName,attrName,start);
					start = p;
					s = S_ATTR;
					break;
				case S_E:
					errorHandler.warning('attribute space is required"'+attrName+'"!!')
				case S_S:
					s = S_ATTR;
					start = p;
					break;
				case S_EQ:
					s = S_V;
					start = p;
					break;
				case S_C:
					throw new Error("elements closed character '/' and '>' must be connected to");
				}
			}
		}
		p++;
	}
}
/**
 * @return end of the elementStartPart(end of elementEndPart for selfClosed el)
 */
function appendElement(el,domBuilder,parseStack){
	var tagName = el.tagName;
	var localNSMap = null;
	var currentNSMap = parseStack[parseStack.length-1].currentNSMap;
	var i = el.length;
	while(i--){
		var a = el[i];
		var qName = a.qName;
		var value = a.value;
		var nsp = qName.indexOf(':');
		if(nsp>0){
			var prefix = a.prefix = qName.slice(0,nsp);
			var localName = qName.slice(nsp+1);
			var nsPrefix = prefix === 'xmlns' && localName
		}else{
			localName = qName;
			prefix = null
			nsPrefix = qName === 'xmlns' && ''
		}
		//can not set prefix,because prefix !== ''
		a.localName = localName ;
		//prefix == null for no ns prefix attribute 
		if(nsPrefix !== false){//hack!!
			if(localNSMap == null){
				localNSMap = {}
				//console.log(currentNSMap,0)
				_copy(currentNSMap,currentNSMap={})
				//console.log(currentNSMap,1)
			}
			currentNSMap[nsPrefix] = localNSMap[nsPrefix] = value;
			a.uri = 'http://www.w3.org/2000/xmlns/'
			domBuilder.startPrefixMapping(nsPrefix, value) 
		}
	}
	var i = el.length;
	while(i--){
		a = el[i];
		var prefix = a.prefix;
		if(prefix){//no prefix attribute has no namespace
			if(prefix === 'xml'){
				a.uri = 'http://www.w3.org/XML/1998/namespace';
			}if(prefix !== 'xmlns'){
				a.uri = currentNSMap[prefix]
				
				//{console.log('###'+a.qName,domBuilder.locator.systemId+'',currentNSMap,a.uri)}
			}
		}
	}
	var nsp = tagName.indexOf(':');
	if(nsp>0){
		prefix = el.prefix = tagName.slice(0,nsp);
		localName = el.localName = tagName.slice(nsp+1);
	}else{
		prefix = null;//important!!
		localName = el.localName = tagName;
	}
	//no prefix element has default namespace
	var ns = el.uri = currentNSMap[prefix || ''];
	domBuilder.startElement(ns,localName,tagName,el);
	//endPrefixMapping and startPrefixMapping have not any help for dom builder
	//localNSMap = null
	if(el.closed){
		domBuilder.endElement(ns,localName,tagName);
		if(localNSMap){
			for(prefix in localNSMap){
				domBuilder.endPrefixMapping(prefix) 
			}
		}
	}else{
		el.currentNSMap = currentNSMap;
		el.localNSMap = localNSMap;
		parseStack.push(el);
	}
}
function parseHtmlSpecialContent(source,elStartEnd,tagName,entityReplacer,domBuilder){
	if(/^(?:script|textarea)$/i.test(tagName)){
		var elEndStart =  source.indexOf('</'+tagName+'>',elStartEnd);
		var text = source.substring(elStartEnd+1,elEndStart);
		if(/[&<]/.test(text)){
			if(/^script$/i.test(tagName)){
				//if(!/\]\]>/.test(text)){
					//lexHandler.startCDATA();
					domBuilder.characters(text,0,text.length);
					//lexHandler.endCDATA();
					return elEndStart;
				//}
			}//}else{//text area
				text = text.replace(/&#?\w+;/g,entityReplacer);
				domBuilder.characters(text,0,text.length);
				return elEndStart;
			//}
			
		}
	}
	return elStartEnd+1;
}
function fixSelfClosed(source,elStartEnd,tagName,closeMap){
	//if(tagName in closeMap){
	var pos = closeMap[tagName];
	if(pos == null){
		//console.log(tagName)
		pos = closeMap[tagName] = source.lastIndexOf('</'+tagName+'>')
	}
	return pos<elStartEnd;
	//} 
}
function _copy(source,target){
	for(var n in source){target[n] = source[n]}
}
function parseDCC(source,start,domBuilder,errorHandler){//sure start with '<!'
	var next= source.charAt(start+2)
	switch(next){
	case '-':
		if(source.charAt(start + 3) === '-'){
			var end = source.indexOf('-->',start+4);
			//append comment source.substring(4,end)//<!--
			if(end>start){
				domBuilder.comment(source,start+4,end-start-4);
				return end+3;
			}else{
				errorHandler.error("Unclosed comment");
				return -1;
			}
		}else{
			//error
			return -1;
		}
	default:
		if(source.substr(start+3,6) == 'CDATA['){
			var end = source.indexOf(']]>',start+9);
			domBuilder.startCDATA();
			domBuilder.characters(source,start+9,end-start-9);
			domBuilder.endCDATA() 
			return end+3;
		}
		//<!DOCTYPE
		//startDTD(java.lang.String name, java.lang.String publicId, java.lang.String systemId) 
		var matchs = split(source,start);
		var len = matchs.length;
		if(len>1 && /!doctype/i.test(matchs[0][0])){
			var name = matchs[1][0];
			var pubid = len>3 && /^public$/i.test(matchs[2][0]) && matchs[3][0]
			var sysid = len>4 && matchs[4][0];
			var lastMatch = matchs[len-1]
			domBuilder.startDTD(name,pubid && pubid.replace(/^(['"])(.*?)\1$/,'$2'),
					sysid && sysid.replace(/^(['"])(.*?)\1$/,'$2'));
			domBuilder.endDTD();
			
			return lastMatch.index+lastMatch[0].length
		}
	}
	return -1;
}



function parseInstruction(source,start,domBuilder){
	var end = source.indexOf('?>',start);
	if(end){
		var match = source.substring(start,end).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);
		if(match){
			var len = match[0].length;
			domBuilder.processingInstruction(match[1], match[2]) ;
			return end+2;
		}else{//error
			return -1;
		}
	}
	return -1;
}

/**
 * @param source
 */
function ElementAttributes(source){
	
}
ElementAttributes.prototype = {
	setTagName:function(tagName){
		if(!tagNamePattern.test(tagName)){
			throw new Error('invalid tagName:'+tagName)
		}
		this.tagName = tagName
	},
	add:function(qName,value,offset){
		if(!tagNamePattern.test(qName)){
			throw new Error('invalid attribute:'+qName)
		}
		this[this.length++] = {qName:qName,value:value,offset:offset}
	},
	length:0,
	getLocalName:function(i){return this[i].localName},
	getOffset:function(i){return this[i].offset},
	getQName:function(i){return this[i].qName},
	getURI:function(i){return this[i].uri},
	getValue:function(i){return this[i].value}
//	,getIndex:function(uri, localName)){
//		if(localName){
//			
//		}else{
//			var qName = uri
//		}
//	},
//	getValue:function(){return this.getValue(this.getIndex.apply(this,arguments))},
//	getType:function(uri,localName){}
//	getType:function(i){},
}




function _set_proto_(thiz,parent){
	thiz.__proto__ = parent;
	return thiz;
}
if(!(_set_proto_({},_set_proto_.prototype) instanceof _set_proto_)){
	_set_proto_ = function(thiz,parent){
		function p(){};
		p.prototype = parent;
		p = new p();
		for(parent in thiz){
			p[parent] = thiz[parent];
		}
		return p;
	}
}

function split(source,start){
	var match;
	var buf = [];
	var reg = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
	reg.lastIndex = start;
	reg.exec(source);//skip <
	while(match = reg.exec(source)){
		buf.push(match);
		if(match[1])return buf;
	}
}

if(typeof require == 'function'){
	exports.XMLReader = XMLReader;
}


},{}],"/forsetup/js/tools/html.json":[function(require,module,exports){
module.exports={
    "css": [
        "html {",
        "  box-sizing: border-box;",
        "}",
        "*, *:before, *:after {",
        "  box-sizing: inherit;",
        "}",
        ".stl-inline-item {",
        "  display: inline-block;",
        "  vertical-align: text-bottom;",
        "}",
        "*[data-stl-class=\"stl:page\"] {",
        "  position: relative;",
        "}",
        "*[data-stl-class=\"stl:text\"] {",
        "  overflow: hidden;",
        "}",
        "*[data-stl-class=\"stl:table\"] {",
        "  border-collapse: collapse;",
        "}"
    ]
}

},{}],"__init__":[function(require,module,exports){
module.exports={
    "data" : {
        "xml2js" : {
            "defaults" : {
                "async": false,
                "explicitRoot": false,
                "explicitArray": false,
                "mergeAttrs": true,
                "parseNumbers": true
            }
        },
        "xml" : {
            "root" : "tdt:root",
            "alias" : "xmlns:tdt",
            "ns": "http://developer.opentext.com/schemas/storyteller/transformation/tdt"
        }
    }
}

},{}],"base64-js":[function(require,module,exports){
var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

;(function (exports) {
  'use strict'

  var Arr = (typeof Uint8Array !== 'undefined')
    ? Uint8Array
    : Array

  var PLUS = '+'.charCodeAt(0)
  var SLASH = '/'.charCodeAt(0)
  var NUMBER = '0'.charCodeAt(0)
  var LOWER = 'a'.charCodeAt(0)
  var UPPER = 'A'.charCodeAt(0)
  var PLUS_URL_SAFE = '-'.charCodeAt(0)
  var SLASH_URL_SAFE = '_'.charCodeAt(0)

  function decode (elt) {
    var code = elt.charCodeAt(0)
    if (code === PLUS || code === PLUS_URL_SAFE) return 62 // '+'
    if (code === SLASH || code === SLASH_URL_SAFE) return 63 // '/'
    if (code < NUMBER) return -1 // no match
    if (code < NUMBER + 10) return code - NUMBER + 26 + 26
    if (code < UPPER + 26) return code - UPPER
    if (code < LOWER + 26) return code - LOWER + 26
  }

  function b64ToByteArray (b64) {
    var i, j, l, tmp, placeHolders, arr

    if (b64.length % 4 > 0) {
      throw new Error('Invalid string. Length must be a multiple of 4')
    }

    // the number of equal signs (place holders)
    // if there are two placeholders, than the two characters before it
    // represent one byte
    // if there is only one, then the three characters before it represent 2 bytes
    // this is just a cheap hack to not do indexOf twice
    var len = b64.length
    placeHolders = b64.charAt(len - 2) === '=' ? 2 : b64.charAt(len - 1) === '=' ? 1 : 0

    // base64 is 4/3 + up to two characters of the original data
    arr = new Arr(b64.length * 3 / 4 - placeHolders)

    // if there are placeholders, only get up to the last complete 4 chars
    l = placeHolders > 0 ? b64.length - 4 : b64.length

    var L = 0

    function push (v) {
      arr[L++] = v
    }

    for (i = 0, j = 0; i < l; i += 4, j += 3) {
      tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
      push((tmp & 0xFF0000) >> 16)
      push((tmp & 0xFF00) >> 8)
      push(tmp & 0xFF)
    }

    if (placeHolders === 2) {
      tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
      push(tmp & 0xFF)
    } else if (placeHolders === 1) {
      tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
      push((tmp >> 8) & 0xFF)
      push(tmp & 0xFF)
    }

    return arr
  }

  function uint8ToBase64 (uint8) {
    var i
    var extraBytes = uint8.length % 3 // if we have 1 byte left, pad 2 bytes
    var output = ''
    var temp, length

    function encode (num) {
      return lookup.charAt(num)
    }

    function tripletToBase64 (num) {
      return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
    }

    // go through the array every three bytes, we'll deal with trailing stuff later
    for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
      temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
      output += tripletToBase64(temp)
    }

    // pad the end with zeros, but make sure to not forget the extra bytes
    switch (extraBytes) {
      case 1:
        temp = uint8[uint8.length - 1]
        output += encode(temp >> 2)
        output += encode((temp << 4) & 0x3F)
        output += '=='
        break
      case 2:
        temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
        output += encode(temp >> 10)
        output += encode((temp >> 4) & 0x3F)
        output += encode((temp << 2) & 0x3F)
        output += '='
        break
      default:
        break
    }

    return output
  }

  exports.toByteArray = b64ToByteArray
  exports.fromByteArray = uint8ToBase64
}(typeof exports === 'undefined' ? (this.base64js = {}) : exports))

},{}],"buffer":[function(require,module,exports){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

var base64 = require('base64-js')
var ieee754 = require('ieee754')
var isArray = Array.isArray; //require('is-array')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50
Buffer.poolSize = 8192 // not used by this implementation

var kMaxLength = 0x3fffffff
var rootParent = {}

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Note:
 *
 * - Implementation must support adding new properties to `Uint8Array` instances.
 *   Firefox 4-29 lacked support, fixed in Firefox 30+.
 *   See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *  - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *  - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *    incorrect length in some situations.
 *
 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they will
 * get the Object implementation, which is slower but will work correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = (function () {
  try {
    var buf = new ArrayBuffer(0)
    var arr = new Uint8Array(buf)
    arr.foo = function () { return 42 }
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        new Uint8Array(1).subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
})()

/**
 * Class: Buffer
 * =============
 *
 * The Buffer constructor returns instances of `Uint8Array` that are augmented
 * with function properties for all the node `Buffer` API functions. We use
 * `Uint8Array` so that square bracket notation works as expected -- it returns
 * a single octet.
 *
 * By augmenting the instances, we can avoid modifying the `Uint8Array`
 * prototype.
 */
function Buffer (arg) {
  if (!(this instanceof Buffer)) {
    // Avoid going through an ArgumentsAdaptorTrampoline in the common case.
    if (arguments.length > 1) return new Buffer(arg, arguments[1])
    return new Buffer(arg)
  }

  this.length = 0
  this.parent = undefined

  // Common case.
  if (typeof arg === 'number') {
    return fromNumber(this, arg)
  }

  // Slightly less common case.
  if (typeof arg === 'string') {
    return fromString(this, arg, arguments.length > 1 ? arguments[1] : 'utf8')
  }

  // Unusual.
  return fromObject(this, arg)
}

function fromNumber (that, length) {
  that = allocate(that, length < 0 ? 0 : checked(length) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < length; i++) {
      that[i] = 0
    }
  }
  return that
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') encoding = 'utf8'

  // Assumption: byteLength() return value is always < kMaxLength.
  var length = byteLength(string, encoding) | 0
  that = allocate(that, length)

  that.write(string, encoding)
  return that
}

function fromObject (that, object) {
  if (Buffer.isBuffer(object)) return fromBuffer(that, object)

  if (isArray(object)) return fromArray(that, object)

  if (object == null) {
    throw new TypeError('must start with number, buffer, array or string')
  }

  if (typeof ArrayBuffer !== 'undefined' && object.buffer instanceof ArrayBuffer) {
    return fromTypedArray(that, object)
  }

  if (object.length) return fromArrayLike(that, object)

  return fromJsonObject(that, object)
}

function fromBuffer (that, buffer) {
  var length = checked(buffer.length) | 0
  that = allocate(that, length)
  buffer.copy(that, 0, 0, length)
  return that
}

function fromArray (that, array) {
  var length = checked(array.length) | 0
  that = allocate(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

// Duplicate of fromArray() to keep fromArray() monomorphic.
function fromTypedArray (that, array) {
  var length = checked(array.length) | 0
  that = allocate(that, length)
  // Truncating the elements is probably not what people expect from typed
  // arrays with BYTES_PER_ELEMENT > 1 but it's compatible with the behavior
  // of the old Buffer constructor.
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayLike (that, array) {
  var length = checked(array.length) | 0
  that = allocate(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

// Deserialize { type: 'Buffer', data: [1,2,3,...] } into a Buffer object.
// Returns a zero-length buffer for inputs that don't conform to the spec.
function fromJsonObject (that, object) {
  var array
  var length = 0

  if (object.type === 'Buffer' && isArray(object.data)) {
    array = object.data
    length = checked(array.length) | 0
  }
  that = allocate(that, length)

  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function allocate (that, length) {
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = Buffer._augment(new Uint8Array(length))
  } else {
    // Fallback: Return an object instance of the Buffer class
    that.length = length
    that._isBuffer = true
  }

  var fromPool = length !== 0 && length <= Buffer.poolSize >>> 1
  if (fromPool) that.parent = rootParent

  return that
}

function checked (length) {
  // Note: cannot use `length < kMaxLength` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (subject, encoding) {
  if (!(this instanceof SlowBuffer)) return new SlowBuffer(subject, encoding)

  var buf = new Buffer(subject, encoding)
  delete buf.parent
  return buf
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  var i = 0
  var len = Math.min(x, y)
  while (i < len) {
    if (a[i] !== b[i]) break

    ++i
  }

  if (i !== len) {
    x = a[i]
    y = b[i]
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'binary':
    case 'base64':
    case 'raw':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) throw new TypeError('list argument must be an Array of Buffers.')

  if (list.length === 0) {
    return new Buffer(0)
  } else if (list.length === 1) {
    return list[0]
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; i++) {
      length += list[i].length
    }
  }

  var buf = new Buffer(length)
  var pos = 0
  for (i = 0; i < list.length; i++) {
    var item = list[i]
    item.copy(buf, pos)
    pos += item.length
  }
  return buf
}

function byteLength (string, encoding) {
  if (typeof string !== 'string') string = String(string)

  if (string.length === 0) return 0

  switch (encoding || 'utf8') {
    case 'ascii':
    case 'binary':
    case 'raw':
      return string.length
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return string.length * 2
    case 'hex':
      return string.length >>> 1
    case 'utf8':
    case 'utf-8':
      return utf8ToBytes(string).length
    case 'base64':
      return base64ToBytes(string).length
    default:
      return string.length
  }
}
Buffer.byteLength = byteLength

// pre-set for values that may exist in the future
Buffer.prototype.length = undefined
Buffer.prototype.parent = undefined

// toString(encoding, start=0, end=buffer.length)
Buffer.prototype.toString = function toString (encoding, start, end) {
  var loweredCase = false

  start = start | 0
  end = end === undefined || end === Infinity ? this.length : end | 0

  if (!encoding) encoding = 'utf8'
  if (start < 0) start = 0
  if (end > this.length) end = this.length
  if (end <= start) return ''

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'binary':
        return binarySlice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return 0
  return Buffer.compare(this, b)
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset) {
  if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff
  else if (byteOffset < -0x80000000) byteOffset = -0x80000000
  byteOffset >>= 0

  if (this.length === 0) return -1
  if (byteOffset >= this.length) return -1

  // Negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = Math.max(this.length + byteOffset, 0)

  if (typeof val === 'string') {
    if (val.length === 0) return -1 // special case: looking for empty string always fails
    return String.prototype.indexOf.call(this, val, byteOffset)
  }
  if (Buffer.isBuffer(val)) {
    return arrayIndexOf(this, val, byteOffset)
  }
  if (typeof val === 'number') {
    if (Buffer.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === 'function') {
      return Uint8Array.prototype.indexOf.call(this, val, byteOffset)
    }
    return arrayIndexOf(this, [ val ], byteOffset)
  }

  function arrayIndexOf (arr, val, byteOffset) {
    var foundIndex = -1
    for (var i = 0; byteOffset + i < arr.length; i++) {
      if (arr[byteOffset + i] === val[foundIndex === -1 ? 0 : i - foundIndex]) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === val.length) return byteOffset + foundIndex
      } else {
        foundIndex = -1
      }
    }
    return -1
  }

  throw new TypeError('val must be string, number or Buffer')
}

// `get` will be removed in Node 0.13+
Buffer.prototype.get = function get (offset) {
  console.log('.get() is deprecated. Access using array indexes instead.')
  return this.readUInt8(offset)
}

// `set` will be removed in Node 0.13+
Buffer.prototype.set = function set (v, offset) {
  console.log('.set() is deprecated. Access using array indexes instead.')
  return this.writeUInt8(v, offset)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new Error('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; i++) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) throw new Error('Invalid hex string')
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function binaryWrite (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    var swap = encoding
    encoding = offset
    offset = length | 0
    length = swap
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'binary':
        return binaryWrite(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  var res = ''
  var tmp = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    if (buf[i] <= 0x7F) {
      res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i])
      tmp = ''
    } else {
      tmp += '%' + buf[i].toString(16)
    }
  }

  return res + decodeUtf8Char(tmp)
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function binarySlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; i++) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = Buffer._augment(this.subarray(start, end))
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; i++) {
      newBuf[i] = this[i + start]
    }
  }

  if (newBuf.length) newBuf.parent = this.parent || this

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('value is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = value
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = value
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = value
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = value
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = value < 0 ? 1 : 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = value < 0 ? 1 : 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = value
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = value
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = value
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (value > max || value < min) throw new RangeError('value is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('index out of range')
  if (offset < 0) throw new RangeError('index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start

  if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < len; i++) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    target._set(this.subarray(start, start + len), targetStart)
  }

  return len
}

// fill(value, start=0, end=buffer.length)
Buffer.prototype.fill = function fill (value, start, end) {
  if (!value) value = 0
  if (!start) start = 0
  if (!end) end = this.length

  if (end < start) throw new RangeError('end < start')

  // Fill 0 bytes; we're done
  if (end === start) return
  if (this.length === 0) return

  if (start < 0 || start >= this.length) throw new RangeError('start out of bounds')
  if (end < 0 || end > this.length) throw new RangeError('end out of bounds')

  var i
  if (typeof value === 'number') {
    for (i = start; i < end; i++) {
      this[i] = value
    }
  } else {
    var bytes = utf8ToBytes(value.toString())
    var len = bytes.length
    for (i = start; i < end; i++) {
      this[i] = bytes[i % len]
    }
  }

  return this
}

/**
 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
 */
Buffer.prototype.toArrayBuffer = function toArrayBuffer () {
  if (typeof Uint8Array !== 'undefined') {
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      return (new Buffer(this)).buffer
    } else {
      var buf = new Uint8Array(this.length)
      for (var i = 0, len = buf.length; i < len; i += 1) {
        buf[i] = this[i]
      }
      return buf.buffer
    }
  } else {
    throw new TypeError('Buffer.toArrayBuffer not supported in this browser')
  }
}

// HELPER FUNCTIONS
// ================

var BP = Buffer.prototype

/**
 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
 */
Buffer._augment = function _augment (arr) {
  arr.constructor = Buffer
  arr._isBuffer = true

  // save reference to original Uint8Array set method before overwriting
  arr._set = arr.set

  // deprecated, will be removed in node 0.13+
  arr.get = BP.get
  arr.set = BP.set

  arr.write = BP.write
  arr.toString = BP.toString
  arr.toLocaleString = BP.toString
  arr.toJSON = BP.toJSON
  arr.equals = BP.equals
  arr.compare = BP.compare
  arr.indexOf = BP.indexOf
  arr.copy = BP.copy
  arr.slice = BP.slice
  arr.readUIntLE = BP.readUIntLE
  arr.readUIntBE = BP.readUIntBE
  arr.readUInt8 = BP.readUInt8
  arr.readUInt16LE = BP.readUInt16LE
  arr.readUInt16BE = BP.readUInt16BE
  arr.readUInt32LE = BP.readUInt32LE
  arr.readUInt32BE = BP.readUInt32BE
  arr.readIntLE = BP.readIntLE
  arr.readIntBE = BP.readIntBE
  arr.readInt8 = BP.readInt8
  arr.readInt16LE = BP.readInt16LE
  arr.readInt16BE = BP.readInt16BE
  arr.readInt32LE = BP.readInt32LE
  arr.readInt32BE = BP.readInt32BE
  arr.readFloatLE = BP.readFloatLE
  arr.readFloatBE = BP.readFloatBE
  arr.readDoubleLE = BP.readDoubleLE
  arr.readDoubleBE = BP.readDoubleBE
  arr.writeUInt8 = BP.writeUInt8
  arr.writeUIntLE = BP.writeUIntLE
  arr.writeUIntBE = BP.writeUIntBE
  arr.writeUInt16LE = BP.writeUInt16LE
  arr.writeUInt16BE = BP.writeUInt16BE
  arr.writeUInt32LE = BP.writeUInt32LE
  arr.writeUInt32BE = BP.writeUInt32BE
  arr.writeIntLE = BP.writeIntLE
  arr.writeIntBE = BP.writeIntBE
  arr.writeInt8 = BP.writeInt8
  arr.writeInt16LE = BP.writeInt16LE
  arr.writeInt16BE = BP.writeInt16BE
  arr.writeInt32LE = BP.writeInt32LE
  arr.writeInt32BE = BP.writeInt32BE
  arr.writeFloatLE = BP.writeFloatLE
  arr.writeFloatBE = BP.writeFloatBE
  arr.writeDoubleLE = BP.writeDoubleLE
  arr.writeDoubleBE = BP.writeDoubleBE
  arr.fill = BP.fill
  arr.inspect = BP.inspect
  arr.toArrayBuffer = BP.toArrayBuffer

  return arr
}

var INVALID_BASE64_RE = /[^+\/0-9A-z\-]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []
  var i = 0

  for (; i < length; i++) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (leadSurrogate) {
        // 2 leads in a row
        if (codePoint < 0xDC00) {
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          leadSurrogate = codePoint
          continue
        } else {
          // valid surrogate pair
          codePoint = leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00 | 0x10000
          leadSurrogate = null
        }
      } else {
        // no lead yet

        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else {
          // valid lead
          leadSurrogate = codePoint
          continue
        }
      }
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
      leadSurrogate = null
    }

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x200000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; i++) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function decodeUtf8Char (str) {
  try {
    return decodeURIComponent(str)
  } catch (err) {
    return String.fromCharCode(0xFFFD) // UTF 8 invalid char
  }
}

},{"base64-js":"base64-js","ieee754":"ieee754"}],"charts":[function(require,module,exports){
var util = require('util');
var xmldom = require('xmldom');
var data = require('data');
var repo = require('repo');
var layout = require('layout');

var g_scd_ns = "http://developer.opentext.com/schemas/storyteller/chart/definition";

function namespace_stack() {
    var aliases = [];
    var uris = [];

    function push(attrs) {
        if(attrs){
            for (var i = 0; i < attrs.length; i++) {
                var key = attrs[i].name;
                if (key === 'xmlns' || key.startsWith('xmlns:')) {
                    // prepend uri and alias
                    aliases.unshift(key.substring(6));
                    uris.unshift(attrs[i].nodeValue);
                }
            }
        }
    }

    function pop(attrs) {
        if(attrs){
            for (var i = 0; i < attrs.length; i++) {
                var key = attrs[i].name;
                if (key === 'xmlns' || key.startsWith('xmlns:')) {
                    if (key.substring(6) !== aliases[0] || attrs[i].nodeValue != uris[0])
                        throw new Error("Inconsistent namespaces");
                    aliases.shift();
                    uris.shift();
                }
            }
        }
    }

    function lookup(alias) {
        var i = aliases.indexOf(alias);
        if (i === -1)
            return null;
        return uris[i];
    }

    function current() {
        var result = {};
        aliases.forEach( function(alias, index) {
            result[alias] = uris[index];
        } );
        return result;
    }

    return { push: push, pop: pop, lookup: lookup, current: current };
}

function process_option(key, option) {
    if ( ( key === 'x' || key === 'y' ) && util.isString(option) ) {
        return node => data.string(option, node);
    }
    return option;
}

function process_options( chart, options ) {
    function is_property( prop ) {
        try {
            prop();
            return true;
        }
        catch(e) {
            return false;
        }
    }

    for (var key in options) {
        if (options.hasOwnProperty(key)) {
            var prop = chart[key];
            if (!prop)
                throw new Error("Invalid chart option: " + key );
            if ( is_property( prop ) )
                prop(process_option(key, options[key]));
            else
                process_options( prop, options[key] );
        }
    }
}

function process_data(series, what, cursor) {
    cursor = cursor || require('data');
    series.forEach( function(serie) {
        if (util.isString(serie[what]))
            serie[what] = [].slice.call( cursor.nodes(serie[what]) );
    });
    return series;
}

function is_valid(obj){
    return (typeof obj !== "undefined" && obj !== null);
}

function get_value(cell) {
    if (cell) {
        return util.isString(cell)
            ? cell
            : cell["_"];
    }
    return '';
}

function get_value_x(type, cell_x, cell_label) {
    if (type == 'pieChart' || type == 'discreteBarChart' || type == 'multiBarHorizontalChart')
        return get_value(cell_label)

    return Number(get_value(cell_x));
}

function get_style_property(style, property, default_value) {
    var dummy = document.createElement('div');
    if( default_value != null )
        dummy.style[property] = default_value;

    if( style != "" )
        dummy.style.cssText += style;

    return dummy.style[property];
}

function get_style_property_from_node(node, attribute, property, default_value){
    var value = default_value;
    if( is_valid(node.singleNodeValue.attributes[attribute]) )
    {
        value = get_style_property(node.singleNodeValue.attributes[attribute].nodeValue, property, value);
    }

    return value;
}

function get_attribute_value_from_node(node, attribute) {
    if (is_valid(node.singleNodeValue) && is_valid(node.singleNodeValue.attributes) && is_valid(node.singleNodeValue.attributes[attribute]))
        return node.singleNodeValue.attributes[attribute].nodeValue;

    return null;
}

function set_svg_text_style( text, style){
    text.style['fill'] = style.fill;
    text.style['font-family'] = style.font_family;
    text.style['font-style'] = style.font_style;
    text.style['font-weight'] = style.font_weight;
    text.style['font-size'] = style.font_size;
}

function get_svg_text_style( text_style, default_style){
    var ret = {};
    ret.fill = get_style_property(text_style, "color", default_style.fill);
    ret.font_family = get_style_property(text_style, "font-family", default_style.font_family);
    ret.font_style = get_style_property(text_style, "font-style", default_style.font_style);
    ret.font_weight = get_style_property(text_style, "font-weight", default_style.font_weight);
    ret.font_size = get_style_property(text_style, "font-size", default_style.font_size);

    return ret;
}

function get_default_text_style(chart_object){
    return get_svg_text_style(chart_object.default_style, {});
}

function set_text_style(svg, chart_object, values, text_style){
    d3.select(svg).selectAll('.nv-label text')
          .each(function(d,i){
              var cell_label = data.get_node("ddi:cell[" + chart_object.columns[0].label + "]", values[i]);

              var label_style = {
                  fill: get_style_property_from_node(cell_label, "data_style", "color", text_style.fill),
                  font_family: get_style_property_from_node(cell_label, "data_style", "font-family", text_style.font_family),
                  font_style: get_style_property_from_node(cell_label, "data_style", "font-style", text_style.font_style),
                  font_weight: get_style_property_from_node(cell_label, "data_style", "font-weight", text_style.font_weight),
                  font_size: get_style_property_from_node(cell_label, "data_style", "font-size", text_style.font_size)
              }
              set_svg_text_style( d3.select(this).node(), label_style );
          });

    text_style = get_svg_text_style(chart_object.legend_style, text_style);

    d3.select(svg).selectAll('.nv-legend-text')
          .each(function(d,i){
              set_svg_text_style( d3.select(this).node(), text_style )
          });
}

function set_legend_style(svg, chart_object, default_style) {
    var text_style = get_svg_text_style(chart_object.legend_style, default_style);

    d3.select(svg).selectAll('.nv-legend-text')
          .each(function (d, i) {
              var legend_text = d3.select(this);
              set_svg_text_style(legend_text.node(), text_style)
              });

    return text_style;
}

function remove_support_lines(svg) {
    d3.select(svg).selectAll('.nv-axis .tick line')
          .each(function (d, i) {
              var tick = d3.select(this);
              tick.node().setAttribute("style", "display:none");
          });

}

function add_title(svg, chart_object) {
    if (chart_object.title == "")
        return;

    var text_style = get_svg_text_style(chart_object.title_style, get_svg_text_style(chart_object.default_style, {}));
    
    if( !text_style.font_size )
        text_style.font_size = "10pt";

    var text = document.createElementNS("http://www.w3.org/2000/svg", "text");

    var offset_y = parseInt(text_style.font_size, 10);
    if (chart_object.title_position == "bottom")
        offset_y = svg.clientHeight;
    
    if( !offset_y )
        offset_y = 0;

    text.setAttributeNS(null, "transform", "translate(" + svg.clientWidth / 2 + ", " + offset_y + ")");
    text.setAttributeNS(null, "text-anchor", "middle");

    if( text_style && text_style != "" )
        set_svg_text_style(text, text_style);

    var text_node = document.createTextNode(chart_object.title);
    text.appendChild(text_node);
    svg.appendChild(text);
}

function chart_update(svg, chart_object) {
    if( chart_object.title_position === "top" ){
        d3.select(svg).selectAll('.nv-pieChart')
                .attr("transform", "translate(0,40)");
    }
}

function get_label(data_series, x){
    var i, j;
    var len = data_series.length;
    for( i = 0; i < len; i++){
        var values_len = data_series[i].values.length;
        for( j = 0; j < values_len; j++){
            if( data_series[i].values[j].x == x ){
                return data_series[i].values[j].label;
            }
        }
    }
}

function stl2nvd3_chart(chart_object, svg, chart_data) {
    nv.addGraph(function () {        
        var creator = nv.models[chart_object.type];
        if (!creator)
            throw new Error("Invalid chart type: ", chart_object.type);
        var chart = creator()
                .width(svg.parentNode.clientWidth)
                .height(svg.parentNode.clientHeight);

        process_options(chart, chart_object.options);
        process_chart_object(chart, chart_object, chart_data);

        if (chart_object.type == "lineChart") {
            chart.xAxis.tickFormat(function(d) {
                // do all you stuff and return an array
                return get_label(chart_data, d);
            });
        }
        d3.select(svg)
            .datum(chart_data)
            .call(chart);

        nv.utils.windowResize(function(){
            chart.update();
            chart_update(svg, chart_object);
        });

        post_process_chart_object(svg, chart, chart_object);

        //if (chart_object.type == 'pieChart')
        //    set_text_style(svg, chart_object, data_series[0].values);
        //else
        //    set_text_style(svg, chart_object, data_series);

        // add_title is duplicated
        // add_title(svg, chart_object);
        chart.update();
        chart_update(svg, chart_object);
       
        return chart;
    });
}

function split_and_check(tag, nsmap) {
    if (tag == '#text')
        return null;

    var split = tag.split(':',2);
    var alias = split.length === 1 ? '' : split[0];

    var ns = nsmap.lookup(alias);

    //if (ns !== g_scd_ns)
    //    throw new Error("Unsupported namespace in element: " + tag);
    return split[split.length-1];
}

function forEachElement(ns, node_list, element_parser) {
    for (var i = 0; i < node_list.length; i++) {
        var node = node_list[i];
        var key = split_and_check(node.nodeName, ns) + '_';
        var handler = element_parser[key];
        if (is_valid(handler))
            handler(node);
    }
}

function process_chart_object(chart, chart_object, series) {
    if (chart_object == null)
        return;

    if (chart_object.type === "discreteBarChart") {
        if (chart_object.options.showYAxis === false)
            chart.showValues(true);
    }
    else if (chart_object.type === "multiBarHorizontalChart") {
        chart.showValues(true);
    }
    else if (chart_object.type === "lineChart" || chart_object.type === "multiBarChart") {
        chart.xAxis.tickFormat(function (d) {
            return get_label(series, d);
        });
    }

    if (chart_object.type !== "linePlusBarChart" && chart_object.type !== "pieChart" ) {
        if (chart_object.axisY && chart.yAxis && chart_object.axisY.length > 0 && is_valid(chart_object.axisY[0].label)) {
            chart.yAxis.axisLabel(chart_object.axisY[0].label);
        }
        if (chart_object.axisY && chart.yAxis && chart_object.axisY.length > 0 && is_valid(chart_object.axisY[0].mask)) {
            chart.yAxis.tickFormat(d3.format(chart_object.axisY[0].mask));
        }
        if (chart_object.axisX && chart.xAxis && chart_object.axisX.length > 0 && is_valid(chart_object.axisX[0].label)) {
            chart.xAxis.axisLabel(chart_object.axisX[0].label);
        }
        if (chart_object.axisX && chart.xAxis && chart_object.axisX.length > 0 && is_valid(chart_object.axisX[0].rotate)) {
            chart.xAxis.rotateLabels(chart_object.axisX[0].rotate);
        }
    }

    if (chart_object.stacked) {
        chart.stacked(true);
    }
}

function post_process_chart_object(svg, chart, chart_object) {
    if (chart_object == null)
        return;

    var default_style = get_default_text_style(chart_object);
    ///set_text_style(svg, chart_object, chart_object.data_series[0].values, default_style);
    var legend_style = set_legend_style(svg, chart_object, default_style);

    add_title(svg, chart_object);
    chart.update();
    if(!chart_object.showSupportLines)
        remove_support_lines(svg);

    // temporary transformation due to bug with margins and legend in pie charts
    if (chart_object.title_position === "top" && chart_object.type === "pieChart") {
        d3.select(svg).selectAll('.nv-pieChart')
            .attr("transform", "translate(0,40)");
    }

    // set color
    ///if (legend_style.fill.length > 0) {
    ///    d3.select(svg).selectAll('.nv-legend-text')
    ///        .attr("fill", legend_style.fill);
    ///}
}

function layer_parser(columns) {


    attribute_handlers = {
        'col_x': function (column_series, value) { column_series.x = value; },
        'col_y': function (column_series, value) { column_series.y = value; },
        'col_label': function (column_series, value) { column_series.label = value; },
        'col_legend': function (column_series, value) { column_series.legend = value; }
    };

    function series_(node) {
        var column_series = {};
        for (var i = 0; i < node.attributes.length; i++) {
            attr_handler = attribute_handlers[node.attributes[i].name];
            if (is_valid(attr_handler))
                attr_handler(column_series, node.attributes[i].value);
        }
        columns.push(column_series);
    }

    return {
        'series_': series_,
    };
}

function chart_parser(ns, chart_object) {

    function get_chart_type(value, columns_series) {
        var type = chart_types[value];
        if (!is_valid(type))
            return value;
        if( value === "bar" && columns_series.length > 1 )
            return "multiBarChart";

        return type;
    }

    function get_chart_margin(style) {
        var margin = {}

        margin.left = parseInt(get_style_property(style, "margin-left", 0));
        margin.right = parseInt(get_style_property(style, "margin-right", 0));
        margin.top = parseInt(get_style_property(style, "margin-top", 0));
        margin.bottom = parseInt(get_style_property(style, "margin-bottom", 0));

        return margin;
    }

    function get_logical_coord(node, key_low, key_high) {
        var force = [, ];
        var low = node.getAttribute(key_low);
        if (is_valid(low) && low !== "") {
            force[0] = Number(low);
        }

        var high = node.getAttribute(key_high);
        if (is_valid(high) && high !== "") {
            force[1] = Number(high);
        }

        if (!is_valid(force[0]) && !is_valid(force[1]))
            return null;

        return force;
    }

    function get_logical_coord_x(node) {
        var coord_x = get_logical_coord(node, "logical_x_low", "logical_x_high");
        if (coord_x !== null) {
            chart_object.options.forceX = coord_x;
        }
    }

    function get_logical_coord_y(node) {
        var coord_y = get_logical_coord(node, "logical_y_low", "logical_y_high");
        if (coord_y !== null)
            chart_object.options.forceY = coord_y;
    }

    function title_(node) {
        if( node.hasAttribute("text") )
            chart_object.title = node.getAttribute("text");
        chart_object.title_style = node.getAttribute("style");
        chart_object.title_position = node.getAttribute("position");
    }

    function legend_(node) {
        chart_object.legend = true;
        chart_object.legend_style = node.getAttribute("style");;
        var align_h = node.getAttribute("alignment_h");
        if (align_h == "right")
            chart_object.legend_position = align_h;
    }

    function plot_(node) {
        var style = node.getAttribute("style");
        chart_object.options.margin = get_chart_margin(style);
        get_logical_coord_x(node);
        get_logical_coord_y(node);
    }

    function axis_x_(node) {
        chart_object.options.showXAxis = true;
        var axis = { label: node.getAttribute("label") };
        chart_object.axisX.push(axis);
        get_logical_coord_x(node);
    }

    function axis_y_(node) {
        chart_object.options.showYAxis = true;
        var axis = { label: node.getAttribute("label") };
        chart_object.axisY.push(axis);
        get_logical_coord_y(node);
    }

    function support_lines_(node) {
        chart_object.showSupportLines = true;
        //chart_object.options.showYAxis = true;
        if (chart_object.axisY.length == 0) {
            chart_object.axisY.push({});
        }
        chart_object.axisY[0].mask = node.getAttribute("mask");
        get_logical_coord_y(node);
    }

    function layer_(node) {
        var layer_type_handlers = {
            'pie': function() {
                chart_object.type = "pieChart";
            },
            'bar': function() {
                chart_object.type = "discreteBarChart";
            },
            'line': function() {
                chart_object.type = "lineChart";
            },
            'stackedBar': function () {
                chart_object.type = "multiBarChart";
                chart_object.stacked = true;
            },
            'stackedArea': function () {
                chart_object.type = "stackedAreaChart";
            },
        }
    
        var nv_type_handlers = {
            'pieChart': function () {
                delete chart_object.options.showXAxis;
                delete chart_object.options.showYAxis;
                var donut = 'false';
                var donut_ratio = node.getAttribute("donut_ratio");
                if (donut_ratio != "" && donut_ratio > 0)
                    donut = 'true';
                chart_object.options.donut = donut;
                if (donut_ratio != null)
                    chart_object.options.donutRatio = donut_ratio;

                var start_angle = node.getAttribute("start_angle");
                if (start_angle != "") {
                    chart_object.options.startAngle = d => d.startAngle + ((Number(start_angle) + 90) * (Math.PI / 180));
                    chart_object.options.endAngle = d => d.endAngle + ((Number(start_angle) + 90) * (Math.PI / 180));
                }

                chart_object.options.showLabels = true;
                var labels_offset = node.getAttribute("labels_offset");
                if (labels_offset != null && labels_offset < 0)
                    chart_object.options.labelsOutside = false;
                else
                    chart_object.options.labelsOutside = true;

                if (chart_object.legend_position != null)
                    chart_object.options.legendPosition = chart_object.legend_position;
            },
            'multiBarChart': function () {
                var gap = node.getAttribute("gap");
                var width = node.getAttribute("bar_width");
                if (gap != "" && (width != "" || width != 0))
                    chart_object.options.groupSpacing = Number(gap) / (Number(width) + Number(gap));
            },
            'linePlusBarChart': function () {
                delete chart_object.options.showXAxis;
                delete chart_object.options.showYAxis;
            }
        };


        chart_object.xpath = node.getAttribute("xpath");
        var type_val = node.getAttribute("type");
        chart_object.area = node.getAttribute("area");

        chart_object.options.showLegend = chart_object.legend;
        
        forEachElement(ns, node.childNodes, layer_parser(chart_object.columns));

        var layer_type_handler = layer_type_handlers[type_val];
        if( is_valid(layer_type_handler) )
            layer_type_handler();
        else
            chart_object.type = type_val;

        if (chart_object.type === "") {
            chart_object.type = "linePlusBarChart";
        }

        var type_handler = nv_type_handlers[chart_object.type];
        if( is_valid(type_handler) )
            type_handler();

        //console.log(chart_object);
    }

    return {
        'title_': title_,
        'legend_': legend_,
        'plot_' : plot_,
        'axis_x_': axis_x_,
        'axis_y_': axis_y_,
        'support_lines_': support_lines_,
        'layer_': layer_,
    };
}

function parse_scd(ns, node) {

    var chart_object = {
        type: "",
        default_style: node.getAttribute("style"),
        title: "",
        title_style: "",
        title_position: "top",
        legend: false,
        legend_style: "",
        legend_position: "top",
        labels_offset: 0,
        stacked: false,
        xpath: '',
        columns: [],
        showSupportLines: false,
        axisX: [],
        axisY: [],
        options: {
            showXAxis: false,
            showYAxis: false
        }
    };

    forEachElement(ns, node.childNodes, chart_parser(ns, chart_object));

    return chart_object;
}

function parse_chart_xml(xml) {
    var xmldom = require('xmldom');
    parser = new xmldom.DOMParser();
    var chart_object = {};

    var dom = parser.parseFromString(xml, 'text/xml');

    for (var i = 0; i < dom.childNodes.length; i++) {
        var node = dom.childNodes[i];
        var ns = namespace_stack();
        ns.push(node.attributes);

        var key = split_and_check(node.nodeName, ns);
        if (key == "scd")
            chart_object = parse_scd(ns, node);
        else
            throw new Error("Unknown chart definition!");

        ns.pop(node.attributes);
    }

    return chart_object;
}

function xmlUnEscape(str) {
    return String(str)
		.replace(/&amp;/g, '&')
		.replace(/@apos;/g, "'")
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>');
}; 

module.exports = {

    d3chart : function( type, series, options ) {
        var elem = layout.item();
        var svg = elem.firstChild;
        var creator = nv.models[type];
        if (!creator)
            throw new Error("Invalid chart type: ", options.type);
        var chart = creator()
            .width(svg.offsetWidth)
            .height(svg.offsetHeight)
        ;
        process_options( chart, options );

        var data_series = process_data(series, "values");
        if ( type === 'pieChart' ){
            data_series = data_series[0].values;
        }

        nv.addGraph(function() {
            d3.select(svg)
                .datum(data_series)
                .call(chart);
            nv.utils.windowResize(chart.update);
            return chart;
        });
    },

    stlchart : function(xml_def) {
        var chart_object = parse_chart_xml(repo.load(xml_def));
        var elem = layout.item();
        stl2nvd3_chart(chart_object, elem.firstChild);
    },

    stlchartnew: function (scd, cursor, svgelem) {        
        function convert_data(chart_object, chart_data) {
            function convert_cell(row, ix, iy, ilabel) {
                var cells = row["ddi:cell"];
                var cell_x = cells[ix];
                var cell_y = cells[iy];
                return {
                    color: get_style_property(cell_y.data_style, "fill"),
                    x: get_value_x(chart_object.type, cell_x, cells[ilabel]),
                    y: Number(get_value(cell_y)),
                    label: ilabel ? get_value(cells[ilabel]) : get_value(cell_x)
                };
            }

            function convert_column_layer(series_column, chart_data_root) {
                var ix = series_column.x - 1;
                var iy = series_column.y - 1;
                var ilabel = series_column.label - 1;                
                var header_cell_y = chart_data_root["ddi:header"]["ddi:cell"][iy];
                return {
                    key: get_value(header_cell_y),
                    color: get_style_property(header_cell_y.data_style, "stroke"),
                    values: (chart_data_root["ddi:row"] || []).map((row) => convert_cell(row, ix, iy, ilabel))
                };
            }

            function convert_column(series_column) {
                return Object.keys(chart_data)
                    .filter((name) => chart_data[name]["ddi:header"])
                    .map((name) => convert_column_layer(series_column, chart_data[name]));
            }
            
            var converted_data = [].concat(...chart_object.columns.map(convert_column));
            return (chart_object.type == 'pieChart')
                ? converted_data[0].values
                : converted_data;
        }

        var chart_object = parse_chart_xml(scd);
        chart_data = cursor.js('.');
        var converted_data = convert_data(chart_object, chart_data);
        //console.log(chart_object);
        //console.log(converted_data);
        stl2nvd3_chart(chart_object, svgelem, converted_data);
    }    
};

module.exports.time = d3.time;
module.exports.format = d3.format;

},{"data":"data","layout":"layout","repo":false,"util":"util","xmldom":"xmldom"}],"css":[function(require,module,exports){
// http://www.w3.org/TR/CSS21/grammar.html
// https://github.com/visionmedia/css-parse/pull/49#issuecomment-30088027
var commentre = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g

exports.parse = function(css, options){
  options = options || {};

  /**
   * Positional.
   */

  var lineno = 1;
  var column = 1;

  /**
   * Update lineno and column based on `str`.
   */

  function updatePosition(str) {
    var lines = str.match(/\n/g);
    if (lines) lineno += lines.length;
    var i = str.lastIndexOf('\n');
    column = ~i ? str.length - i : column + str.length;
  }

  /**
   * Mark position and patch `node.position`.
   */

  function position() {
    var start = { line: lineno, column: column };
    return function(node){
      node.position = new Position(start);
      whitespace();
      return node;
    };
  }

  /**
   * Store position information for a node
   */

  function Position(start) {
    this.start = start;
    this.end = { line: lineno, column: column };
    this.source = options.source;
  }

  /**
   * Non-enumerable source string
   */

  Position.prototype.content = css;

  /**
   * Error `msg`.
   */

  var errorsList = [];

  function error(msg) {
    var err = new Error(options.source + ':' + lineno + ':' + column + ': ' + msg);
    err.reason = msg;
    err.filename = options.source;
    err.line = lineno;
    err.column = column;
    err.source = css;

    if (options.silent) {
      errorsList.push(err);
    } else {
      throw err;
    }
  }

  /**
   * Parse stylesheet.
   */

  function stylesheet() {
    var rulesList = rules();

    return {
      type: 'stylesheet',
      stylesheet: {
        source: options.source,
        rules: rulesList,
        parsingErrors: errorsList
      }
    };
  }

  /**
   * Opening brace.
   */

  function open() {
    return match(/^{\s*/);
  }

  /**
   * Closing brace.
   */

  function close() {
    return match(/^}/);
  }

  /**
   * Parse ruleset.
   */

  function rules() {
    var node;
    var rules = [];
    whitespace();
    comments(rules);
    while (css.length && css.charAt(0) != '}' && (node = atrule() || rule())) {
      if (node !== false) {
        rules.push(node);
        comments(rules);
      }
    }
    return rules;
  }

  /**
   * Match `re` and return captures.
   */

  function match(re) {
    var m = re.exec(css);
    if (!m) return;
    var str = m[0];
    updatePosition(str);
    css = css.slice(str.length);
    return m;
  }

  /**
   * Parse whitespace.
   */

  function whitespace() {
    match(/^\s*/);
  }

  /**
   * Parse comments;
   */

  function comments(rules) {
    var c;
    rules = rules || [];
    while (c = comment()) {
      if (c !== false) {
        rules.push(c);
      }
    }
    return rules;
  }

  /**
   * Parse comment.
   */

  function comment() {
    var pos = position();
    if ('/' != css.charAt(0) || '*' != css.charAt(1)) return;

    var i = 2;
    while ("" != css.charAt(i) && ('*' != css.charAt(i) || '/' != css.charAt(i + 1))) ++i;
    i += 2;

    if ("" === css.charAt(i-1)) {
      return error('End of comment missing');
    }

    var str = css.slice(2, i - 2);
    column += 2;
    updatePosition(str);
    css = css.slice(i);
    column += 2;

    return pos({
      type: 'comment',
      comment: str
    });
  }

  /**
   * Parse selector.
   */

  function selector() {
    var m = match(/^([^{]+)/);
    if (!m) return;
    /* @fix Remove all comments from selectors
     * http://ostermiller.org/findcomment.html */
    return trim(m[0])
      .replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*\/+/g, '')
      .replace(/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'/g, function(m) {
        return m.replace(/,/g, '\u200C');
      })
      .split(/\s*(?![^(]*\)),\s*/)
      .map(function(s) {
        return s.replace(/\u200C/g, ',');
      });
  }

  /**
   * Parse declaration.
   */

  function declaration() {
    var pos = position();

    // prop
    var prop = match(/^(\*?[-#\/\*\\\w]+(\[[0-9a-z_-]+\])?)\s*/);
    if (!prop) return;
    prop = trim(prop[0]);

    // :
    if (!match(/^:\s*/)) return error("property missing ':'");

    // val
    var val = match(/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^\)]*?\)|[^};])+)/);

    var ret = pos({
      type: 'declaration',
      property: prop.replace(commentre, ''),
      value: val ? trim(val[0]).replace(commentre, '') : ''
    });

    // ;
    match(/^[;\s]*/);

    return ret;
  }

  /**
   * Parse declarations.
   */

  function declarations() {
    var decls = [];

    if (!open()) return error("missing '{'");
    comments(decls);

    // declarations
    var decl;
    while (decl = declaration()) {
      if (decl !== false) {
        decls.push(decl);
        comments(decls);
      }
    }

    if (!close()) return error("missing '}'");
    return decls;
  }

  /**
   * Parse keyframe.
   */

  function keyframe() {
    var m;
    var vals = [];
    var pos = position();

    while (m = match(/^((\d+\.\d+|\.\d+|\d+)%?|[a-z]+)\s*/)) {
      vals.push(m[1]);
      match(/^,\s*/);
    }

    if (!vals.length) return;

    return pos({
      type: 'keyframe',
      values: vals,
      declarations: declarations()
    });
  }

  /**
   * Parse keyframes.
   */

  function atkeyframes() {
    var pos = position();
    var m = match(/^@([-\w]+)?keyframes\s*/);

    if (!m) return;
    var vendor = m[1];

    // identifier
    var m = match(/^([-\w]+)\s*/);
    if (!m) return error("@keyframes missing name");
    var name = m[1];

    if (!open()) return error("@keyframes missing '{'");

    var frame;
    var frames = comments();
    while (frame = keyframe()) {
      frames.push(frame);
      frames = frames.concat(comments());
    }

    if (!close()) return error("@keyframes missing '}'");

    return pos({
      type: 'keyframes',
      name: name,
      vendor: vendor,
      keyframes: frames
    });
  }

  /**
   * Parse supports.
   */

  function atsupports() {
    var pos = position();
    var m = match(/^@supports *([^{]+)/);

    if (!m) return;
    var supports = trim(m[1]);

    if (!open()) return error("@supports missing '{'");

    var style = comments().concat(rules());

    if (!close()) return error("@supports missing '}'");

    return pos({
      type: 'supports',
      supports: supports,
      rules: style
    });
  }

  /**
   * Parse host.
   */

  function athost() {
    var pos = position();
    var m = match(/^@host\s*/);

    if (!m) return;

    if (!open()) return error("@host missing '{'");

    var style = comments().concat(rules());

    if (!close()) return error("@host missing '}'");

    return pos({
      type: 'host',
      rules: style
    });
  }

  /**
   * Parse media.
   */

  function atmedia() {
    var pos = position();
    var m = match(/^@media *([^{]+)/);

    if (!m) return;
    var media = trim(m[1]);

    if (!open()) return error("@media missing '{'");

    var style = comments().concat(rules());

    if (!close()) return error("@media missing '}'");

    return pos({
      type: 'media',
      media: media,
      rules: style
    });
  }


  /**
   * Parse custom-media.
   */

  function atcustommedia() {
    var pos = position();
    var m = match(/^@custom-media\s+(--[^\s]+)\s*([^{;]+);/);
    if (!m) return;

    return pos({
      type: 'custom-media',
      name: trim(m[1]),
      media: trim(m[2])
    });
  }

  /**
   * Parse paged media.
   */

  function atpage() {
    var pos = position();
    var m = match(/^@page */);
    if (!m) return;

    var sel = selector() || [];

    if (!open()) return error("@page missing '{'");
    var decls = comments();

    // declarations
    var decl;
    while (decl = declaration()) {
      decls.push(decl);
      decls = decls.concat(comments());
    }

    if (!close()) return error("@page missing '}'");

    return pos({
      type: 'page',
      selectors: sel,
      declarations: decls
    });
  }

  /**
   * Parse document.
   */

  function atdocument() {
    var pos = position();
    var m = match(/^@([-\w]+)?document *([^{]+)/);
    if (!m) return;

    var vendor = trim(m[1]);
    var doc = trim(m[2]);

    if (!open()) return error("@document missing '{'");

    var style = comments().concat(rules());

    if (!close()) return error("@document missing '}'");

    return pos({
      type: 'document',
      document: doc,
      vendor: vendor,
      rules: style
    });
  }

  /**
   * Parse font-face.
   */

  function atfontface() {
    var pos = position();
    var m = match(/^@font-face\s*/);
    if (!m) return;

    if (!open()) return error("@font-face missing '{'");
    var decls = comments();

    // declarations
    var decl;
    while (decl = declaration()) {
      decls.push(decl);
      decls = decls.concat(comments());
    }

    if (!close()) return error("@font-face missing '}'");

    return pos({
      type: 'font-face',
      declarations: decls
    });
  }

  /**
   * Parse import
   */

  var atimport = _compileAtrule('import');

  /**
   * Parse charset
   */

  var atcharset = _compileAtrule('charset');

  /**
   * Parse namespace
   */

  var atnamespace = _compileAtrule('namespace');

  /**
   * Parse non-block at-rules
   */


  function _compileAtrule(name) {
    var re = new RegExp('^@' + name + '\\s*([^;]+);');
    return function() {
      var pos = position();
      var m = match(re);
      if (!m) return;
      var ret = { type: name };
      ret[name] = m[1].trim();
      return pos(ret);
    }
  }

  /**
   * Parse at rule.
   */

  function atrule() {
    if (css[0] != '@') return;

    return atkeyframes()
      || atmedia()
      || atcustommedia()
      || atsupports()
      || atimport()
      || atcharset()
      || atnamespace()
      || atdocument()
      || atpage()
      || athost()
      || atfontface();
  }

  /**
   * Parse rule.
   */

  function rule() {
    var pos = position();
    var sel = selector();

    if (!sel) return error('selector missing');
    comments();

    return pos({
      type: 'rule',
      selectors: sel,
      declarations: declarations()
    });
  }

  return addParent(stylesheet());
};

/**
 * Trim `str`.
 */

function trim(str) {
  return str ? str.replace(/^\s+|\s+$/g, '') : '';
}

/**
 * Adds non-enumerable parent node reference to each node.
 */

function addParent(obj, parent) {
  var isNode = obj && typeof obj.type === 'string';
  var childParent = isNode ? obj : parent;

  for (var k in obj) {
    var value = obj[k];
    if (Array.isArray(value)) {
      value.forEach(function(v) { addParent(v, childParent); });
    } else if (value && typeof value === 'object') {
      addParent(value, childParent);
    }
  }

  if (isNode) {
    Object.defineProperty(obj, 'parent', {
      configurable: true,
      writable: true,
      enumerable: false,
      value: parent || null
    });
  }

  return obj;
}

},{}],"data":[function(require,module,exports){
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

},{"__init__":"__init__","util":"util","xml2js":"xml2js","xmldom":"xmldom","xpath":"xpath"}],"empower":[function(require,module,exports){
// Copyright (c) 2017 Open Text. All Rights Reserved.
/*jslint
  bitwise:true
*/

'use strict';

const util = require('util');
const stl = require('stl');
const defs = require('./empower.json');
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

function check_emp(input) {
    if (util.isStream(input)) {
        input = input.read();
    }
    if (util.isString(input)) {
        input = JSON.parse(input)
    }
    if (util.isObject(input)) {
        input = input.contents;
    }
    if (!input) {
        throw new Error("Invalid 'input' parameter, stream, string or object (with contents) expected");
    }
    return input;
}

function check_stl(input) {
    if (util.isStream(input)) {
        input = input.read();
    }
    if (!util.isString(input)) {
        throw new Error("Invalid 'input' parameter, stream or string expected");
    }
    return input;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
//
// JSON -> STL
//
/////////////////////////////////////////////////////////////////////////////////////////////////////


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
            attrs.style = stl.css_format(css);
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
            'background-color': null,
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
            css['background-color'] = convert_color(draw.m_clrBackGround);
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
        push('p', {style: stl.css_format(css)});
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
            writer.start('span', {style: stl.css_format(style.css)});
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
                attrs.style = stl.css_format(css);
                inserter.push('cell', attrs);
                convert_content(cell.m_pTextDraw);
                inserter.pop('cell');
            });
            inserter.pop('row');
        }

        // we do not convert table width & height, we convert row/column dimensions instead
        var attrs = converter.pos(draw.m_rectPosition);
        var css = converter.item_style(draw);
        css.display = 'table';
        attrs.style = stl.css_format(css);
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
        attrs.style = stl.css_format(css);
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
            attrs.style = stl.css_format(css);
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
        if (css['background-color']) {
            draw.m_clrBackGround = color(css['background-color']);
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

        if (css['border-top'] || css['border-right'] || css['border-bottom'] || css['border-left']) {
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
        draw.m_iWidth = width;
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
    
    function unexpected_text(data) {
        if (data.trim())
            unexpected("stl:stl", "text");
    }
    
    function get_css(attrs, basecss) {
        return stl.css_lookup(ctx.stylesheet, attrs, basecss);
    }
    
    function table_builder(draw) {
        var columns = [];
        var rows = [];
        var cells = [];
        var column = 0;
            
        function row_(start, attrs) {
            if (start) {
                column = 0;
                var css = get_css(attrs);
                rows.push(factory.row(attrs, css));
            }
        }

        function cell_(start, attrs) {
            if (start) {
                if (rows.length === 1) {
                    columns.push(factory.column(attrs));
                }
                var row = rows.length - 1;
                var css = get_css(attrs);               
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
            draw.m_rectPosition.right = draw.m_rectPosition.left+width;
            draw.m_rectPosition.bottom = draw.m_rectPosition.top+height;
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
            flush_cstyle();
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
                styles.push(get_css(attrs, styles.top()));
            } else {
                styles.pop();
            }
        }

        function p_(start, attrs) {
            if (start) {
                if (inside.paragraph)
                    return unsupported("stl:p nesting");
                styles.push(get_css(attrs, styles.top()));
                insert_pstyle();
                inside.paragraph = true;
            } else {
                flush_cstyle();
                styles.pop();
                inside.paragraph = false;
            }
        }

        function story_(start, attrs) {
            if (start) {
                if (inside.object)
                    return stl.handler_dispatcher(nsmap, story_builder(inside.object));
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
                    styles.push(get_css(attrs, styles.top()));
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
                var css = get_css(attrs);
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
                var css = get_css(attrs);
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
                var css = get_css(attrs);
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
                var css = get_css(attrs);
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

        function style_(start, attrs) {
            function set_stylesheet(css) {
                if (ctx.stylesheet) {
                    return unsupported('multiple stylesheets');
                }
                ctx.stylesheet = stl.css_parse(css);
            }
            
            if (start) {
                if (attrs.src) {
                    set_stylesheet(require('streams').stream(attrs.src).read());
                } else {
                    return stl.text_accumulator(set_stylesheet);
                }
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
 *      - `css` ... `false` => inline styles, `true` => internal stylesheet, `stream` => external stylesheet
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
    input = check_emp(input);
    options = check_options(options);

    var writer = stl.stl_writer(options.indent, options.css);
    build_stl(input, writer, options);
    var output = writer.finalize();
    if (!options.output) {
        return output; // return the string directly
    }
    options.output.write(output);
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
    input = check_stl(input);
    options = check_options(options);
        
    var nsmap = stl.namespace_stack();
    var factory = json_factory(options);
    var root = factory.root();
    var builder = json_builder(nsmap, factory, root, options);
    var parser = stl.parser(nsmap, builder);
    parser.write(input).close();
    var output = JSON.stringify(root, null, options.indent);
    if (!options.output) {
        return output;  // return the string directly
    }
    options.output.write(output);
    return options.output;
};



},{"./empower.json":"./empower.json","stl":"stl","streams":"streams","util":"util"}],"events":[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var domain;
var util = require('util');

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.usingDomains = false;

EventEmitter.prototype.domain = undefined;
EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

EventEmitter.init = function() {
  this.domain = null;
  if (EventEmitter.usingDomains) {
    // if there is an active domain, then attach to it.
    domain = domain || require('domain');
    if (domain.active && !(this instanceof domain.Domain)) {
      this.domain = domain.active;
    }
  }

  if (!this._events || this._events === Object.getPrototypeOf(this)._events)
    this._events = {};

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (!util.isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function emit(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error' && !this._events.error) {
    er = arguments[1];
    if (this.domain) {
      if (!er)
        er = new Error('Uncaught, unspecified "error" event.');
      er.domainEmitter = this;
      er.domain = this.domain;
      er.domainThrown = false;
      this.domain.emit('error', er);
    } else if (er instanceof Error) {
      throw er; // Unhandled 'error' event
    } else {
      throw Error('Uncaught, unspecified "error" event.');
    }
    return false;
  }

  handler = this._events[type];

  if (util.isUndefined(handler))
    return false;
  var process = require('process');
  if (this.domain && this !== process)
    this.domain.enter();

  if (util.isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        handler.apply(this, args);
    }
  } else if (util.isObject(handler)) {
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i];

    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  if (this.domain && this !== process)
    this.domain.exit();

  return true;
};

EventEmitter.prototype.addListener = function addListener(type, listener) {
  var m;

  if (!util.isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              util.isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (util.isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (util.isObject(this._events[type]) && !this._events[type].warned) {
    var m;
    if (!util.isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      var console = require('console');
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d %s listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length, type);
      console.trace();
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function once(type, listener) {
  if (!util.isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
  var list, position, length, i;

  if (!util.isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (util.isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (util.isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (util.isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (Array.isArray(listeners)) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function listeners(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (util.isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (util.isFunction(emitter._events[type]))
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

},{"console":false,"domain":false,"process":false,"util":"util"}],"html":[function(require,module,exports){
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
                return stl.handler_dispatcher(nsmap, story_builder(writer));
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
        var chart_object = {};
        
        function start_item(attrs) {
            //if (inline) {
            //    writer.start('div', {
            //        'class': 'stl-inline-item',
            //    });
            //}
            inside.object = true;
        }

        function end_item() {
            //if (inline) {
            //    writer.end('div');
            //}
            inside.object = false;
        }

        function convert_css(attrs) {
            var css = stl.css_split(attrs.style);
            if (inline) {
                css.display = 'inline-block';
            } else {
                css.position = 'absolute';
                if (attrs.x || attrs.y) {
                    if (attrs.x)
                        css.left = attrs.x;
                    if (attrs.y)
                        css.top = attrs.y;
                }
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

        function group_(start, attrs) {
            if (start) {
                start_item(attrs);
                var css = convert_css(attrs);
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
                var css = convert_css(attrs);
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
                var css = convert_css(attrs);
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
                var css = convert_css(attrs);
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
                var css = convert_css(attrs);
                handle_resize(attrs['class'], css);
                writer.start('div', {
                    'class': attrs['class'],
                    'data-stl-story': attrs.story,
                    'data-stl-class': 'stl:text',
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
                    var css = convert_css(attrs);
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
            story_: story_,
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
            if (inside.hyperlink || inside.form || inside.repeater || inside.switch_case) {
                var tag = inside.paragraph ? 'span' : 'div';
                if (start) {
                    writer.start(tag, {
                        'class': attrs['class'],
                        'data-stl-class': 'stl:story'
                    });
                    if (inside.repeater) {
                        return attrs.format === 'XHTML'
                            ? stl.xml_accumulator( (markup) => writer.inject(convert_html(markup)), true)
                            : stl.handler_dispatcher(nsmap, story_builder(writer, inside.paragraph));
                    }
                } else {
                    writer.end(tag);
                }
            } else {
                return inline_items.story_(start, attrs);
            }
        }
        
        function scope_(start, attrs) {
            if (start) {
                if (attrs.relation) {
                    if (inside.form)
                        return unsupported("form nesting");
                    writer.start('form', {
                        'class': attrs['class'],
                        'data-stl-class': 'stl:scope',
                        'data-stl-xpath': attrs.relation
                    });
                    inside.form = true;                    
                } else if (attrs.hyperlink) {
                    if (inside.hyperlink)
                        return unsupported("hyperlink nesting");
                    writer.start('a', {
                        'class': attrs['class'],
                        'data-stl-class': 'stl:scope',
                        href: attrs.hyperlink
                    });
                    inside.hyperlink = true;                    
                } else {
                    return unsupported("stl:scope");
                }
            } else {
                if (attrs.relation) {
                    inside.form = false;
                    writer.end('form');
                } else if (attrs.hyperlink) {
                    inside.hyperlink = false;
                    writer.end('a');
                } else {
                    return unsupported("stl:scope");
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
            break_: break_,
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



},{"./html.json":"/forsetup/js/tools/html.json","charts":"charts","stl":"stl","streams":"streams","util":"util"}],"ieee754":[function(require,module,exports){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],"layout":[function(require,module,exports){
function current_item() {
    var layout = window.stl.layout;
    return layout.elements[layout.elements.length-1];
}

exports.item = current_item;

},{}],"sax":[function(require,module,exports){
(function (Buffer){
// wrapper for non-node envs
;(function (sax) {

sax.parser = function (strict, opt) { return new SAXParser(strict, opt) }
sax.SAXParser = SAXParser
sax.SAXStream = SAXStream
sax.createStream = createStream

// When we pass the MAX_BUFFER_LENGTH position, start checking for buffer overruns.
// When we check, schedule the next check for MAX_BUFFER_LENGTH - (max(buffer lengths)),
// since that's the earliest that a buffer overrun could occur.  This way, checks are
// as rare as required, but as often as necessary to ensure never crossing this bound.
// Furthermore, buffers are only tested at most once per write(), so passing a very
// large string into write() might have undesirable effects, but this is manageable by
// the caller, so it is assumed to be safe.  Thus, a call to write() may, in the extreme
// edge case, result in creating at most one complete copy of the string passed in.
// Set to Infinity to have unlimited buffers.
sax.MAX_BUFFER_LENGTH = 64 * 1024

var buffers = [
  "comment", "sgmlDecl", "textNode", "tagName", "doctype",
  "procInstName", "procInstBody", "entity", "attribName",
  "attribValue", "cdata", "script"
]

sax.EVENTS = // for discoverability.
  [ "text"
  , "processinginstruction"
  , "sgmldeclaration"
  , "doctype"
  , "comment"
  , "attribute"
  , "opentag"
  , "closetag"
  , "opencdata"
  , "cdata"
  , "closecdata"
  , "error"
  , "end"
  , "ready"
  , "script"
  , "opennamespace"
  , "closenamespace"
  ]

function SAXParser (strict, opt) {
  if (!(this instanceof SAXParser)) return new SAXParser(strict, opt)

  var parser = this
  clearBuffers(parser)
  parser.q = parser.c = ""
  parser.bufferCheckPosition = sax.MAX_BUFFER_LENGTH
  parser.opt = opt || {}
  parser.opt.lowercase = parser.opt.lowercase || parser.opt.lowercasetags
  parser.looseCase = parser.opt.lowercase ? "toLowerCase" : "toUpperCase"
  parser.tags = []
  parser.closed = parser.closedRoot = parser.sawRoot = false
  parser.tag = parser.error = null
  parser.strict = !!strict
  parser.noscript = !!(strict || parser.opt.noscript)
  parser.state = S.BEGIN
  parser.ENTITIES = Object.create(sax.ENTITIES)
  parser.attribList = []

  // namespaces form a prototype chain.
  // it always points at the current tag,
  // which protos to its parent tag.
  if (parser.opt.xmlns) parser.ns = Object.create(rootNS)

  // mostly just for error reporting
  parser.trackPosition = parser.opt.position !== false
  if (parser.trackPosition) {
    parser.position = parser.line = parser.column = 0
  }
  emit(parser, "onready")
}

if (!Object.create) Object.create = function (o) {
  function f () { this.__proto__ = o }
  f.prototype = o
  return new f
}

if (!Object.getPrototypeOf) Object.getPrototypeOf = function (o) {
  return o.__proto__
}

if (!Object.keys) Object.keys = function (o) {
  var a = []
  for (var i in o) if (o.hasOwnProperty(i)) a.push(i)
  return a
}

function checkBufferLength (parser) {
  var maxAllowed = Math.max(sax.MAX_BUFFER_LENGTH, 10)
    , maxActual = 0
  for (var i = 0, l = buffers.length; i < l; i ++) {
    var len = parser[buffers[i]].length
    if (len > maxAllowed) {
      // Text/cdata nodes can get big, and since they're buffered,
      // we can get here under normal conditions.
      // Avoid issues by emitting the text node now,
      // so at least it won't get any bigger.
      switch (buffers[i]) {
        case "textNode":
          closeText(parser)
        break

        case "cdata":
          emitNode(parser, "oncdata", parser.cdata)
          parser.cdata = ""
        break

        case "script":
          emitNode(parser, "onscript", parser.script)
          parser.script = ""
        break

        default:
          error(parser, "Max buffer length exceeded: "+buffers[i])
      }
    }
    maxActual = Math.max(maxActual, len)
  }
  // schedule the next check for the earliest possible buffer overrun.
  parser.bufferCheckPosition = (sax.MAX_BUFFER_LENGTH - maxActual)
                             + parser.position
}

function clearBuffers (parser) {
  for (var i = 0, l = buffers.length; i < l; i ++) {
    parser[buffers[i]] = ""
  }
}

function flushBuffers (parser) {
  closeText(parser)
  if (parser.cdata !== "") {
    emitNode(parser, "oncdata", parser.cdata)
    parser.cdata = ""
  }
  if (parser.script !== "") {
    emitNode(parser, "onscript", parser.script)
    parser.script = ""
  }
}

SAXParser.prototype =
  { end: function () { end(this) }
  , write: write
  , resume: function () { this.error = null; return this }
  , close: function () { return this.write(null) }
  , flush: function () { flushBuffers(this) }
  }

try {
  var Stream = require("stream").Stream
} catch (ex) {
  var Stream = function () {}
}


var streamWraps = sax.EVENTS.filter(function (ev) {
  return ev !== "error" && ev !== "end"
})

function createStream (strict, opt) {
  return new SAXStream(strict, opt)
}

function SAXStream (strict, opt) {
  if (!(this instanceof SAXStream)) return new SAXStream(strict, opt)

  Stream.apply(this)

  this._parser = new SAXParser(strict, opt)
  this.writable = true
  this.readable = true


  var me = this

  this._parser.onend = function () {
    me.emit("end")
  }

  this._parser.onerror = function (er) {
    me.emit("error", er)

    // if didn't throw, then means error was handled.
    // go ahead and clear error, so we can write again.
    me._parser.error = null
  }

  this._decoder = null;

  streamWraps.forEach(function (ev) {
    Object.defineProperty(me, "on" + ev, {
      get: function () { return me._parser["on" + ev] },
      set: function (h) {
        if (!h) {
          me.removeAllListeners(ev)
          return me._parser["on"+ev] = h
        }
        me.on(ev, h)
      },
      enumerable: true,
      configurable: false
    })
  })
}

SAXStream.prototype = Object.create(Stream.prototype,
  { constructor: { value: SAXStream } })

SAXStream.prototype.write = function (data) {
  if (typeof Buffer === 'function' &&
      typeof Buffer.isBuffer === 'function' &&
      Buffer.isBuffer(data)) {
    if (!this._decoder) {
      var SD = require('string_decoder').StringDecoder
      this._decoder = new SD('utf8')
    }
    data = this._decoder.write(data);
  }

  this._parser.write(data.toString())
  this.emit("data", data)
  return true
}

SAXStream.prototype.end = function (chunk) {
  if (chunk && chunk.length) this.write(chunk)
  this._parser.end()
  return true
}

SAXStream.prototype.on = function (ev, handler) {
  var me = this
  if (!me._parser["on"+ev] && streamWraps.indexOf(ev) !== -1) {
    me._parser["on"+ev] = function () {
      var args = arguments.length === 1 ? [arguments[0]]
               : Array.apply(null, arguments)
      args.splice(0, 0, ev)
      me.emit.apply(me, args)
    }
  }

  return Stream.prototype.on.call(me, ev, handler)
}



// character classes and tokens
var whitespace = "\r\n\t "
  // this really needs to be replaced with character classes.
  // XML allows all manner of ridiculous numbers and digits.
  , number = "0124356789"
  , letter = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
  // (Letter | "_" | ":")
  , quote = "'\""
  , entity = number+letter+"#"
  , attribEnd = whitespace + ">"
  , CDATA = "[CDATA["
  , DOCTYPE = "DOCTYPE"
  , XML_NAMESPACE = "http://www.w3.org/XML/1998/namespace"
  , XMLNS_NAMESPACE = "http://www.w3.org/2000/xmlns/"
  , rootNS = { xml: XML_NAMESPACE, xmlns: XMLNS_NAMESPACE }

// turn all the string character sets into character class objects.
whitespace = charClass(whitespace)
number = charClass(number)
letter = charClass(letter)

// http://www.w3.org/TR/REC-xml/#NT-NameStartChar
// This implementation works on strings, a single character at a time
// as such, it cannot ever support astral-plane characters (10000-EFFFF)
// without a significant breaking change to either this  parser, or the
// JavaScript language.  Implementation of an emoji-capable xml parser
// is left as an exercise for the reader.
var nameStart = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/

var nameBody = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040\.\d-]/

quote = charClass(quote)
entity = charClass(entity)
attribEnd = charClass(attribEnd)

function charClass (str) {
  return str.split("").reduce(function (s, c) {
    s[c] = true
    return s
  }, {})
}

function isRegExp (c) {
  return Object.prototype.toString.call(c) === '[object RegExp]'
}

function is (charclass, c) {
  return isRegExp(charclass) ? !!c.match(charclass) : charclass[c]
}

function not (charclass, c) {
  return !is(charclass, c)
}

var S = 0
sax.STATE =
{ BEGIN                     : S++
, TEXT                      : S++ // general stuff
, TEXT_ENTITY               : S++ // &amp and such.
, OPEN_WAKA                 : S++ // <
, SGML_DECL                 : S++ // <!BLARG
, SGML_DECL_QUOTED          : S++ // <!BLARG foo "bar
, DOCTYPE                   : S++ // <!DOCTYPE
, DOCTYPE_QUOTED            : S++ // <!DOCTYPE "//blah
, DOCTYPE_DTD               : S++ // <!DOCTYPE "//blah" [ ...
, DOCTYPE_DTD_QUOTED        : S++ // <!DOCTYPE "//blah" [ "foo
, COMMENT_STARTING          : S++ // <!-
, COMMENT                   : S++ // <!--
, COMMENT_ENDING            : S++ // <!-- blah -
, COMMENT_ENDED             : S++ // <!-- blah --
, CDATA                     : S++ // <![CDATA[ something
, CDATA_ENDING              : S++ // ]
, CDATA_ENDING_2            : S++ // ]]
, PROC_INST                 : S++ // <?hi
, PROC_INST_BODY            : S++ // <?hi there
, PROC_INST_ENDING          : S++ // <?hi "there" ?
, OPEN_TAG                  : S++ // <strong
, OPEN_TAG_SLASH            : S++ // <strong /
, ATTRIB                    : S++ // <a
, ATTRIB_NAME               : S++ // <a foo
, ATTRIB_NAME_SAW_WHITE     : S++ // <a foo _
, ATTRIB_VALUE              : S++ // <a foo=
, ATTRIB_VALUE_QUOTED       : S++ // <a foo="bar
, ATTRIB_VALUE_CLOSED       : S++ // <a foo="bar"
, ATTRIB_VALUE_UNQUOTED     : S++ // <a foo=bar
, ATTRIB_VALUE_ENTITY_Q     : S++ // <foo bar="&quot;"
, ATTRIB_VALUE_ENTITY_U     : S++ // <foo bar=&quot;
, CLOSE_TAG                 : S++ // </a
, CLOSE_TAG_SAW_WHITE       : S++ // </a   >
, SCRIPT                    : S++ // <script> ...
, SCRIPT_ENDING             : S++ // <script> ... <
}

sax.ENTITIES =
{ "amp" : "&"
, "gt" : ">"
, "lt" : "<"
, "quot" : "\""
, "apos" : "'"
, "AElig" : 198
, "Aacute" : 193
, "Acirc" : 194
, "Agrave" : 192
, "Aring" : 197
, "Atilde" : 195
, "Auml" : 196
, "Ccedil" : 199
, "ETH" : 208
, "Eacute" : 201
, "Ecirc" : 202
, "Egrave" : 200
, "Euml" : 203
, "Iacute" : 205
, "Icirc" : 206
, "Igrave" : 204
, "Iuml" : 207
, "Ntilde" : 209
, "Oacute" : 211
, "Ocirc" : 212
, "Ograve" : 210
, "Oslash" : 216
, "Otilde" : 213
, "Ouml" : 214
, "THORN" : 222
, "Uacute" : 218
, "Ucirc" : 219
, "Ugrave" : 217
, "Uuml" : 220
, "Yacute" : 221
, "aacute" : 225
, "acirc" : 226
, "aelig" : 230
, "agrave" : 224
, "aring" : 229
, "atilde" : 227
, "auml" : 228
, "ccedil" : 231
, "eacute" : 233
, "ecirc" : 234
, "egrave" : 232
, "eth" : 240
, "euml" : 235
, "iacute" : 237
, "icirc" : 238
, "igrave" : 236
, "iuml" : 239
, "ntilde" : 241
, "oacute" : 243
, "ocirc" : 244
, "ograve" : 242
, "oslash" : 248
, "otilde" : 245
, "ouml" : 246
, "szlig" : 223
, "thorn" : 254
, "uacute" : 250
, "ucirc" : 251
, "ugrave" : 249
, "uuml" : 252
, "yacute" : 253
, "yuml" : 255
, "copy" : 169
, "reg" : 174
, "nbsp" : 160
, "iexcl" : 161
, "cent" : 162
, "pound" : 163
, "curren" : 164
, "yen" : 165
, "brvbar" : 166
, "sect" : 167
, "uml" : 168
, "ordf" : 170
, "laquo" : 171
, "not" : 172
, "shy" : 173
, "macr" : 175
, "deg" : 176
, "plusmn" : 177
, "sup1" : 185
, "sup2" : 178
, "sup3" : 179
, "acute" : 180
, "micro" : 181
, "para" : 182
, "middot" : 183
, "cedil" : 184
, "ordm" : 186
, "raquo" : 187
, "frac14" : 188
, "frac12" : 189
, "frac34" : 190
, "iquest" : 191
, "times" : 215
, "divide" : 247
, "OElig" : 338
, "oelig" : 339
, "Scaron" : 352
, "scaron" : 353
, "Yuml" : 376
, "fnof" : 402
, "circ" : 710
, "tilde" : 732
, "Alpha" : 913
, "Beta" : 914
, "Gamma" : 915
, "Delta" : 916
, "Epsilon" : 917
, "Zeta" : 918
, "Eta" : 919
, "Theta" : 920
, "Iota" : 921
, "Kappa" : 922
, "Lambda" : 923
, "Mu" : 924
, "Nu" : 925
, "Xi" : 926
, "Omicron" : 927
, "Pi" : 928
, "Rho" : 929
, "Sigma" : 931
, "Tau" : 932
, "Upsilon" : 933
, "Phi" : 934
, "Chi" : 935
, "Psi" : 936
, "Omega" : 937
, "alpha" : 945
, "beta" : 946
, "gamma" : 947
, "delta" : 948
, "epsilon" : 949
, "zeta" : 950
, "eta" : 951
, "theta" : 952
, "iota" : 953
, "kappa" : 954
, "lambda" : 955
, "mu" : 956
, "nu" : 957
, "xi" : 958
, "omicron" : 959
, "pi" : 960
, "rho" : 961
, "sigmaf" : 962
, "sigma" : 963
, "tau" : 964
, "upsilon" : 965
, "phi" : 966
, "chi" : 967
, "psi" : 968
, "omega" : 969
, "thetasym" : 977
, "upsih" : 978
, "piv" : 982
, "ensp" : 8194
, "emsp" : 8195
, "thinsp" : 8201
, "zwnj" : 8204
, "zwj" : 8205
, "lrm" : 8206
, "rlm" : 8207
, "ndash" : 8211
, "mdash" : 8212
, "lsquo" : 8216
, "rsquo" : 8217
, "sbquo" : 8218
, "ldquo" : 8220
, "rdquo" : 8221
, "bdquo" : 8222
, "dagger" : 8224
, "Dagger" : 8225
, "bull" : 8226
, "hellip" : 8230
, "permil" : 8240
, "prime" : 8242
, "Prime" : 8243
, "lsaquo" : 8249
, "rsaquo" : 8250
, "oline" : 8254
, "frasl" : 8260
, "euro" : 8364
, "image" : 8465
, "weierp" : 8472
, "real" : 8476
, "trade" : 8482
, "alefsym" : 8501
, "larr" : 8592
, "uarr" : 8593
, "rarr" : 8594
, "darr" : 8595
, "harr" : 8596
, "crarr" : 8629
, "lArr" : 8656
, "uArr" : 8657
, "rArr" : 8658
, "dArr" : 8659
, "hArr" : 8660
, "forall" : 8704
, "part" : 8706
, "exist" : 8707
, "empty" : 8709
, "nabla" : 8711
, "isin" : 8712
, "notin" : 8713
, "ni" : 8715
, "prod" : 8719
, "sum" : 8721
, "minus" : 8722
, "lowast" : 8727
, "radic" : 8730
, "prop" : 8733
, "infin" : 8734
, "ang" : 8736
, "and" : 8743
, "or" : 8744
, "cap" : 8745
, "cup" : 8746
, "int" : 8747
, "there4" : 8756
, "sim" : 8764
, "cong" : 8773
, "asymp" : 8776
, "ne" : 8800
, "equiv" : 8801
, "le" : 8804
, "ge" : 8805
, "sub" : 8834
, "sup" : 8835
, "nsub" : 8836
, "sube" : 8838
, "supe" : 8839
, "oplus" : 8853
, "otimes" : 8855
, "perp" : 8869
, "sdot" : 8901
, "lceil" : 8968
, "rceil" : 8969
, "lfloor" : 8970
, "rfloor" : 8971
, "lang" : 9001
, "rang" : 9002
, "loz" : 9674
, "spades" : 9824
, "clubs" : 9827
, "hearts" : 9829
, "diams" : 9830
}

Object.keys(sax.ENTITIES).forEach(function (key) {
    var e = sax.ENTITIES[key]
    var s = typeof e === 'number' ? String.fromCharCode(e) : e
    sax.ENTITIES[key] = s
})

for (var S in sax.STATE) sax.STATE[sax.STATE[S]] = S

// shorthand
S = sax.STATE

function emit (parser, event, data) {
  parser[event] && parser[event](data)
}

function emitNode (parser, nodeType, data) {
  if (parser.textNode) closeText(parser)
  emit(parser, nodeType, data)
}

function closeText (parser) {
  parser.textNode = textopts(parser.opt, parser.textNode)
  if (parser.textNode) emit(parser, "ontext", parser.textNode)
  parser.textNode = ""
}

function textopts (opt, text) {
  if (opt.trim) text = text.trim()
  if (opt.normalize) text = text.replace(/\s+/g, " ")
  return text
}

function error (parser, er) {
  closeText(parser)
  if (parser.trackPosition) {
    er += "\nLine: "+parser.line+
          "\nColumn: "+parser.column+
          "\nChar: "+parser.c
  }
  er = new Error(er)
  parser.error = er
  emit(parser, "onerror", er)
  return parser
}

function end (parser) {
  if (!parser.closedRoot) strictFail(parser, "Unclosed root tag")
  if ((parser.state !== S.BEGIN) && (parser.state !== S.TEXT)) error(parser, "Unexpected end")
  closeText(parser)
  parser.c = ""
  parser.closed = true
  emit(parser, "onend")
  SAXParser.call(parser, parser.strict, parser.opt)
  return parser
}

function strictFail (parser, message) {
  if (typeof parser !== 'object' || !(parser instanceof SAXParser))
    throw new Error('bad call to strictFail');
  if (parser.strict) error(parser, message)
}

function newTag (parser) {
  if (!parser.strict) parser.tagName = parser.tagName[parser.looseCase]()
  var parent = parser.tags[parser.tags.length - 1] || parser
    , tag = parser.tag = { name : parser.tagName, attributes : {} }

  // will be overridden if tag contails an xmlns="foo" or xmlns:foo="bar"
  if (parser.opt.xmlns) tag.ns = parent.ns
  parser.attribList.length = 0
}

function qname (name, attribute) {
  var i = name.indexOf(":")
    , qualName = i < 0 ? [ "", name ] : name.split(":")
    , prefix = qualName[0]
    , local = qualName[1]

  // <x "xmlns"="http://foo">
  if (attribute && name === "xmlns") {
    prefix = "xmlns"
    local = ""
  }

  return { prefix: prefix, local: local }
}

function attrib (parser) {
  if (!parser.strict) parser.attribName = parser.attribName[parser.looseCase]()

  if (parser.attribList.indexOf(parser.attribName) !== -1 ||
      parser.tag.attributes.hasOwnProperty(parser.attribName)) {
    return parser.attribName = parser.attribValue = ""
  }

  if (parser.opt.xmlns) {
    var qn = qname(parser.attribName, true)
      , prefix = qn.prefix
      , local = qn.local

    if (prefix === "xmlns") {
      // namespace binding attribute; push the binding into scope
      if (local === "xml" && parser.attribValue !== XML_NAMESPACE) {
        strictFail( parser
                  , "xml: prefix must be bound to " + XML_NAMESPACE + "\n"
                  + "Actual: " + parser.attribValue )
      } else if (local === "xmlns" && parser.attribValue !== XMLNS_NAMESPACE) {
        strictFail( parser
                  , "xmlns: prefix must be bound to " + XMLNS_NAMESPACE + "\n"
                  + "Actual: " + parser.attribValue )
      } else {
        var tag = parser.tag
          , parent = parser.tags[parser.tags.length - 1] || parser
        if (tag.ns === parent.ns) {
          tag.ns = Object.create(parent.ns)
        }
        tag.ns[local] = parser.attribValue
      }
    }

    // defer onattribute events until all attributes have been seen
    // so any new bindings can take effect; preserve attribute order
    // so deferred events can be emitted in document order
    parser.attribList.push([parser.attribName, parser.attribValue])
  } else {
    // in non-xmlns mode, we can emit the event right away
    parser.tag.attributes[parser.attribName] = parser.attribValue
    emitNode( parser
            , "onattribute"
            , { name: parser.attribName
              , value: parser.attribValue } )
  }

  parser.attribName = parser.attribValue = ""
}

function openTag (parser, selfClosing) {
  if (parser.opt.xmlns) {
    // emit namespace binding events
    var tag = parser.tag

    // add namespace info to tag
    var qn = qname(parser.tagName)
    tag.prefix = qn.prefix
    tag.local = qn.local
    tag.uri = tag.ns[qn.prefix] || ""

    if (tag.prefix && !tag.uri) {
      strictFail(parser, "Unbound namespace prefix: "
                       + JSON.stringify(parser.tagName))
      tag.uri = qn.prefix
    }

    var parent = parser.tags[parser.tags.length - 1] || parser
    if (tag.ns && parent.ns !== tag.ns) {
      Object.keys(tag.ns).forEach(function (p) {
        emitNode( parser
                , "onopennamespace"
                , { prefix: p , uri: tag.ns[p] } )
      })
    }

    // handle deferred onattribute events
    // Note: do not apply default ns to attributes:
    //   http://www.w3.org/TR/REC-xml-names/#defaulting
    for (var i = 0, l = parser.attribList.length; i < l; i ++) {
      var nv = parser.attribList[i]
      var name = nv[0]
        , value = nv[1]
        , qualName = qname(name, true)
        , prefix = qualName.prefix
        , local = qualName.local
        , uri = prefix == "" ? "" : (tag.ns[prefix] || "")
        , a = { name: name
              , value: value
              , prefix: prefix
              , local: local
              , uri: uri
              }

      // if there's any attributes with an undefined namespace,
      // then fail on them now.
      if (prefix && prefix != "xmlns" && !uri) {
        strictFail(parser, "Unbound namespace prefix: "
                         + JSON.stringify(prefix))
        a.uri = prefix
      }
      parser.tag.attributes[name] = a
      emitNode(parser, "onattribute", a)
    }
    parser.attribList.length = 0
  }

  parser.tag.isSelfClosing = !!selfClosing

  // process the tag
  parser.sawRoot = true
  parser.tags.push(parser.tag)
  emitNode(parser, "onopentag", parser.tag)
  if (!selfClosing) {
    // special case for <script> in non-strict mode.
    if (!parser.noscript && parser.tagName.toLowerCase() === "script") {
      parser.state = S.SCRIPT
    } else {
      parser.state = S.TEXT
    }
    parser.tag = null
    parser.tagName = ""
  }
  parser.attribName = parser.attribValue = ""
  parser.attribList.length = 0
}

function closeTag (parser) {
  if (!parser.tagName) {
    strictFail(parser, "Weird empty close tag.")
    parser.textNode += "</>"
    parser.state = S.TEXT
    return
  }

  if (parser.script) {
    if (parser.tagName !== "script") {
      parser.script += "</" + parser.tagName + ">"
      parser.tagName = ""
      parser.state = S.SCRIPT
      return
    }
    emitNode(parser, "onscript", parser.script)
    parser.script = ""
  }

  // first make sure that the closing tag actually exists.
  // <a><b></c></b></a> will close everything, otherwise.
  var t = parser.tags.length
  var tagName = parser.tagName
  if (!parser.strict) tagName = tagName[parser.looseCase]()
  var closeTo = tagName
  while (t --) {
    var close = parser.tags[t]
    if (close.name !== closeTo) {
      // fail the first time in strict mode
      strictFail(parser, "Unexpected close tag")
    } else break
  }

  // didn't find it.  we already failed for strict, so just abort.
  if (t < 0) {
    strictFail(parser, "Unmatched closing tag: "+parser.tagName)
    parser.textNode += "</" + parser.tagName + ">"
    parser.state = S.TEXT
    return
  }
  parser.tagName = tagName
  var s = parser.tags.length
  while (s --> t) {
    var tag = parser.tag = parser.tags.pop()
    parser.tagName = parser.tag.name
    emitNode(parser, "onclosetag", parser.tagName)

    var x = {}
    for (var i in tag.ns) x[i] = tag.ns[i]

    var parent = parser.tags[parser.tags.length - 1] || parser
    if (parser.opt.xmlns && tag.ns !== parent.ns) {
      // remove namespace bindings introduced by tag
      Object.keys(tag.ns).forEach(function (p) {
        var n = tag.ns[p]
        emitNode(parser, "onclosenamespace", { prefix: p, uri: n })
      })
    }
  }
  if (t === 0) parser.closedRoot = true
  parser.tagName = parser.attribValue = parser.attribName = ""
  parser.attribList.length = 0
  parser.state = S.TEXT
}

function parseEntity (parser) {
  var entity = parser.entity
    , entityLC = entity.toLowerCase()
    , num
    , numStr = ""
  if (parser.ENTITIES[entity])
    return parser.ENTITIES[entity]
  if (parser.ENTITIES[entityLC])
    return parser.ENTITIES[entityLC]
  entity = entityLC
  if (entity.charAt(0) === "#") {
    if (entity.charAt(1) === "x") {
      entity = entity.slice(2)
      num = parseInt(entity, 16)
      numStr = num.toString(16)
    } else {
      entity = entity.slice(1)
      num = parseInt(entity, 10)
      numStr = num.toString(10)
    }
  }
  entity = entity.replace(/^0+/, "")
  if (numStr.toLowerCase() !== entity) {
    strictFail(parser, "Invalid character entity")
    return "&"+parser.entity + ";"
  }

  return String.fromCodePoint(num)
}

function write (chunk) {
  var parser = this
  if (this.error) throw this.error
  if (parser.closed) return error(parser,
    "Cannot write after close. Assign an onready handler.")
  if (chunk === null) return end(parser)
  var i = 0, c = ""
  while (parser.c = c = chunk.charAt(i++)) {
    if (parser.trackPosition) {
      parser.position ++
      if (c === "\n") {
        parser.line ++
        parser.column = 0
      } else parser.column ++
    }
    switch (parser.state) {

      case S.BEGIN:
        if (c === "<") {
          parser.state = S.OPEN_WAKA
          parser.startTagPosition = parser.position
        } else if (not(whitespace,c)) {
          // have to process this as a text node.
          // weird, but happens.
          strictFail(parser, "Non-whitespace before first tag.")
          parser.textNode = c
          parser.state = S.TEXT
        }
      continue

      case S.TEXT:
        if (parser.sawRoot && !parser.closedRoot) {
          var starti = i-1
          while (c && c!=="<" && c!=="&") {
            c = chunk.charAt(i++)
            if (c && parser.trackPosition) {
              parser.position ++
              if (c === "\n") {
                parser.line ++
                parser.column = 0
              } else parser.column ++
            }
          }
          parser.textNode += chunk.substring(starti, i-1)
        }
        if (c === "<") {
          parser.state = S.OPEN_WAKA
          parser.startTagPosition = parser.position
        } else {
          if (not(whitespace, c) && (!parser.sawRoot || parser.closedRoot))
            strictFail(parser, "Text data outside of root node.")
          if (c === "&") parser.state = S.TEXT_ENTITY
          else parser.textNode += c
        }
      continue

      case S.SCRIPT:
        // only non-strict
        if (c === "<") {
          parser.state = S.SCRIPT_ENDING
        } else parser.script += c
      continue

      case S.SCRIPT_ENDING:
        if (c === "/") {
          parser.state = S.CLOSE_TAG
        } else {
          parser.script += "<" + c
          parser.state = S.SCRIPT
        }
      continue

      case S.OPEN_WAKA:
        // either a /, ?, !, or text is coming next.
        if (c === "!") {
          parser.state = S.SGML_DECL
          parser.sgmlDecl = ""
        } else if (is(whitespace, c)) {
          // wait for it...
        } else if (is(nameStart,c)) {
          parser.state = S.OPEN_TAG
          parser.tagName = c
        } else if (c === "/") {
          parser.state = S.CLOSE_TAG
          parser.tagName = ""
        } else if (c === "?") {
          parser.state = S.PROC_INST
          parser.procInstName = parser.procInstBody = ""
        } else {
          strictFail(parser, "Unencoded <")
          // if there was some whitespace, then add that in.
          if (parser.startTagPosition + 1 < parser.position) {
            var pad = parser.position - parser.startTagPosition
            c = new Array(pad).join(" ") + c
          }
          parser.textNode += "<" + c
          parser.state = S.TEXT
        }
      continue

      case S.SGML_DECL:
        if ((parser.sgmlDecl+c).toUpperCase() === CDATA) {
          emitNode(parser, "onopencdata")
          parser.state = S.CDATA
          parser.sgmlDecl = ""
          parser.cdata = ""
        } else if (parser.sgmlDecl+c === "--") {
          parser.state = S.COMMENT
          parser.comment = ""
          parser.sgmlDecl = ""
        } else if ((parser.sgmlDecl+c).toUpperCase() === DOCTYPE) {
          parser.state = S.DOCTYPE
          if (parser.doctype || parser.sawRoot) strictFail(parser,
            "Inappropriately located doctype declaration")
          parser.doctype = ""
          parser.sgmlDecl = ""
        } else if (c === ">") {
          emitNode(parser, "onsgmldeclaration", parser.sgmlDecl)
          parser.sgmlDecl = ""
          parser.state = S.TEXT
        } else if (is(quote, c)) {
          parser.state = S.SGML_DECL_QUOTED
          parser.sgmlDecl += c
        } else parser.sgmlDecl += c
      continue

      case S.SGML_DECL_QUOTED:
        if (c === parser.q) {
          parser.state = S.SGML_DECL
          parser.q = ""
        }
        parser.sgmlDecl += c
      continue

      case S.DOCTYPE:
        if (c === ">") {
          parser.state = S.TEXT
          emitNode(parser, "ondoctype", parser.doctype)
          parser.doctype = true // just remember that we saw it.
        } else {
          parser.doctype += c
          if (c === "[") parser.state = S.DOCTYPE_DTD
          else if (is(quote, c)) {
            parser.state = S.DOCTYPE_QUOTED
            parser.q = c
          }
        }
      continue

      case S.DOCTYPE_QUOTED:
        parser.doctype += c
        if (c === parser.q) {
          parser.q = ""
          parser.state = S.DOCTYPE
        }
      continue

      case S.DOCTYPE_DTD:
        parser.doctype += c
        if (c === "]") parser.state = S.DOCTYPE
        else if (is(quote,c)) {
          parser.state = S.DOCTYPE_DTD_QUOTED
          parser.q = c
        }
      continue

      case S.DOCTYPE_DTD_QUOTED:
        parser.doctype += c
        if (c === parser.q) {
          parser.state = S.DOCTYPE_DTD
          parser.q = ""
        }
      continue

      case S.COMMENT:
        if (c === "-") parser.state = S.COMMENT_ENDING
        else parser.comment += c
      continue

      case S.COMMENT_ENDING:
        if (c === "-") {
          parser.state = S.COMMENT_ENDED
          parser.comment = textopts(parser.opt, parser.comment)
          if (parser.comment) emitNode(parser, "oncomment", parser.comment)
          parser.comment = ""
        } else {
          parser.comment += "-" + c
          parser.state = S.COMMENT
        }
      continue

      case S.COMMENT_ENDED:
        if (c !== ">") {
          strictFail(parser, "Malformed comment")
          // allow <!-- blah -- bloo --> in non-strict mode,
          // which is a comment of " blah -- bloo "
          parser.comment += "--" + c
          parser.state = S.COMMENT
        } else parser.state = S.TEXT
      continue

      case S.CDATA:
        if (c === "]") parser.state = S.CDATA_ENDING
        else parser.cdata += c
      continue

      case S.CDATA_ENDING:
        if (c === "]") parser.state = S.CDATA_ENDING_2
        else {
          parser.cdata += "]" + c
          parser.state = S.CDATA
        }
      continue

      case S.CDATA_ENDING_2:
        if (c === ">") {
          if (parser.cdata) emitNode(parser, "oncdata", parser.cdata)
          emitNode(parser, "onclosecdata")
          parser.cdata = ""
          parser.state = S.TEXT
        } else if (c === "]") {
          parser.cdata += "]"
        } else {
          parser.cdata += "]]" + c
          parser.state = S.CDATA
        }
      continue

      case S.PROC_INST:
        if (c === "?") parser.state = S.PROC_INST_ENDING
        else if (is(whitespace, c)) parser.state = S.PROC_INST_BODY
        else parser.procInstName += c
      continue

      case S.PROC_INST_BODY:
        if (!parser.procInstBody && is(whitespace, c)) continue
        else if (c === "?") parser.state = S.PROC_INST_ENDING
        else parser.procInstBody += c
      continue

      case S.PROC_INST_ENDING:
        if (c === ">") {
          emitNode(parser, "onprocessinginstruction", {
            name : parser.procInstName,
            body : parser.procInstBody
          })
          parser.procInstName = parser.procInstBody = ""
          parser.state = S.TEXT
        } else {
          parser.procInstBody += "?" + c
          parser.state = S.PROC_INST_BODY
        }
      continue

      case S.OPEN_TAG:
        if (is(nameBody, c)) parser.tagName += c
        else {
          newTag(parser)
          if (c === ">") openTag(parser)
          else if (c === "/") parser.state = S.OPEN_TAG_SLASH
          else {
            if (not(whitespace, c)) strictFail(
              parser, "Invalid character in tag name")
            parser.state = S.ATTRIB
          }
        }
      continue

      case S.OPEN_TAG_SLASH:
        if (c === ">") {
          openTag(parser, true)
          closeTag(parser)
        } else {
          strictFail(parser, "Forward-slash in opening tag not followed by >")
          parser.state = S.ATTRIB
        }
      continue

      case S.ATTRIB:
        // haven't read the attribute name yet.
        if (is(whitespace, c)) continue
        else if (c === ">") openTag(parser)
        else if (c === "/") parser.state = S.OPEN_TAG_SLASH
        else if (is(nameStart, c)) {
          parser.attribName = c
          parser.attribValue = ""
          parser.state = S.ATTRIB_NAME
        } else strictFail(parser, "Invalid attribute name")
      continue

      case S.ATTRIB_NAME:
        if (c === "=") parser.state = S.ATTRIB_VALUE
        else if (c === ">") {
          strictFail(parser, "Attribute without value")
          parser.attribValue = parser.attribName
          attrib(parser)
          openTag(parser)
        }
        else if (is(whitespace, c)) parser.state = S.ATTRIB_NAME_SAW_WHITE
        else if (is(nameBody, c)) parser.attribName += c
        else strictFail(parser, "Invalid attribute name")
      continue

      case S.ATTRIB_NAME_SAW_WHITE:
        if (c === "=") parser.state = S.ATTRIB_VALUE
        else if (is(whitespace, c)) continue
        else {
          strictFail(parser, "Attribute without value")
          parser.tag.attributes[parser.attribName] = ""
          parser.attribValue = ""
          emitNode(parser, "onattribute",
                   { name : parser.attribName, value : "" })
          parser.attribName = ""
          if (c === ">") openTag(parser)
          else if (is(nameStart, c)) {
            parser.attribName = c
            parser.state = S.ATTRIB_NAME
          } else {
            strictFail(parser, "Invalid attribute name")
            parser.state = S.ATTRIB
          }
        }
      continue

      case S.ATTRIB_VALUE:
        if (is(whitespace, c)) continue
        else if (is(quote, c)) {
          parser.q = c
          parser.state = S.ATTRIB_VALUE_QUOTED
        } else {
          strictFail(parser, "Unquoted attribute value")
          parser.state = S.ATTRIB_VALUE_UNQUOTED
          parser.attribValue = c
        }
      continue

      case S.ATTRIB_VALUE_QUOTED:
        if (c !== parser.q) {
          if (c === "&") parser.state = S.ATTRIB_VALUE_ENTITY_Q
          else parser.attribValue += c
          continue
        }
        attrib(parser)
        parser.q = ""
        parser.state = S.ATTRIB_VALUE_CLOSED
      continue

      case S.ATTRIB_VALUE_CLOSED:
        if (is(whitespace, c)) {
          parser.state = S.ATTRIB
        } else if (c === ">") openTag(parser)
        else if (c === "/") parser.state = S.OPEN_TAG_SLASH
        else if (is(nameStart, c)) {
          strictFail(parser, "No whitespace between attributes")
          parser.attribName = c
          parser.attribValue = ""
          parser.state = S.ATTRIB_NAME
        } else strictFail(parser, "Invalid attribute name")
      continue

      case S.ATTRIB_VALUE_UNQUOTED:
        if (not(attribEnd,c)) {
          if (c === "&") parser.state = S.ATTRIB_VALUE_ENTITY_U
          else parser.attribValue += c
          continue
        }
        attrib(parser)
        if (c === ">") openTag(parser)
        else parser.state = S.ATTRIB
      continue

      case S.CLOSE_TAG:
        if (!parser.tagName) {
          if (is(whitespace, c)) continue
          else if (not(nameStart, c)) {
            if (parser.script) {
              parser.script += "</" + c
              parser.state = S.SCRIPT
            } else {
              strictFail(parser, "Invalid tagname in closing tag.")
            }
          } else parser.tagName = c
        }
        else if (c === ">") closeTag(parser)
        else if (is(nameBody, c)) parser.tagName += c
        else if (parser.script) {
          parser.script += "</" + parser.tagName
          parser.tagName = ""
          parser.state = S.SCRIPT
        } else {
          if (not(whitespace, c)) strictFail(parser,
            "Invalid tagname in closing tag")
          parser.state = S.CLOSE_TAG_SAW_WHITE
        }
      continue

      case S.CLOSE_TAG_SAW_WHITE:
        if (is(whitespace, c)) continue
        if (c === ">") closeTag(parser)
        else strictFail(parser, "Invalid characters in closing tag")
      continue

      case S.TEXT_ENTITY:
      case S.ATTRIB_VALUE_ENTITY_Q:
      case S.ATTRIB_VALUE_ENTITY_U:
        switch(parser.state) {
          case S.TEXT_ENTITY:
            var returnState = S.TEXT, buffer = "textNode"
          break

          case S.ATTRIB_VALUE_ENTITY_Q:
            var returnState = S.ATTRIB_VALUE_QUOTED, buffer = "attribValue"
          break

          case S.ATTRIB_VALUE_ENTITY_U:
            var returnState = S.ATTRIB_VALUE_UNQUOTED, buffer = "attribValue"
          break
        }
        if (c === ";") {
          parser[buffer] += parseEntity(parser)
          parser.entity = ""
          parser.state = returnState
        }
        else if (is(entity, c)) parser.entity += c
        else {
          strictFail(parser, "Invalid character entity")
          parser[buffer] += "&" + parser.entity + c
          parser.entity = ""
          parser.state = returnState
        }
      continue

      default:
        throw new Error(parser, "Unknown state: " + parser.state)
    }
  } // while
  // cdata blocks can get very big under normal conditions. emit and move on.
  // if (parser.state === S.CDATA && parser.cdata) {
  //   emitNode(parser, "oncdata", parser.cdata)
  //   parser.cdata = ""
  // }
  if (parser.position >= parser.bufferCheckPosition) checkBufferLength(parser)
  return parser
}

/*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
if (!String.fromCodePoint) {
        (function() {
                var stringFromCharCode = String.fromCharCode;
                var floor = Math.floor;
                var fromCodePoint = function() {
                        var MAX_SIZE = 0x4000;
                        var codeUnits = [];
                        var highSurrogate;
                        var lowSurrogate;
                        var index = -1;
                        var length = arguments.length;
                        if (!length) {
                                return '';
                        }
                        var result = '';
                        while (++index < length) {
                                var codePoint = Number(arguments[index]);
                                if (
                                        !isFinite(codePoint) || // `NaN`, `+Infinity`, or `-Infinity`
                                        codePoint < 0 || // not a valid Unicode code point
                                        codePoint > 0x10FFFF || // not a valid Unicode code point
                                        floor(codePoint) != codePoint // not an integer
                                ) {
                                        throw RangeError('Invalid code point: ' + codePoint);
                                }
                                if (codePoint <= 0xFFFF) { // BMP code point
                                        codeUnits.push(codePoint);
                                } else { // Astral code point; split in surrogate halves
                                        // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
                                        codePoint -= 0x10000;
                                        highSurrogate = (codePoint >> 10) + 0xD800;
                                        lowSurrogate = (codePoint % 0x400) + 0xDC00;
                                        codeUnits.push(highSurrogate, lowSurrogate);
                                }
                                if (index + 1 == length || codeUnits.length > MAX_SIZE) {
                                        result += stringFromCharCode.apply(null, codeUnits);
                                        codeUnits.length = 0;
                                }
                        }
                        return result;
                };
                if (Object.defineProperty) {
                        Object.defineProperty(String, 'fromCodePoint', {
                                'value': fromCodePoint,
                                'configurable': true,
                                'writable': true
                        });
                } else {
                        String.fromCodePoint = fromCodePoint;
                }
        }());
}

})(typeof exports === "undefined" ? sax = {} : exports);

}).call(this,require("buffer").Buffer)
},{"buffer":"buffer","stream":false,"string_decoder":false}],"services":[function(require,module,exports){
'use strict';

function storytellerProxy(server_url, onPing) {
    var status = 'unknown';
    
    function hash2uri(hash) {
        return server_url + '/files/' + hash + '/contents';
    }

    function onError(callback) {
        function parseText(text) {
            var parsed;
            try {
                parsed = JSON.parse(text);
            } catch (e) {
                return text;
            }
            return parsed ? parsed.error : parsed;
        }
        
        return function (jqXHR, textStatus, errorMessage) {
            var response = {
                status: 'failure',
                error: errorMessage
            };
            if (jqXHR.responseText) {
                response.error = parseText(jqXHR.responseText);
            }
            callback(response);
        };
    }

    function ping(callback) {
        $.ajax({
            url: server_url + '/ping',
            type: 'GET',
            data: '',
            dataType: 'json',
            contentType: 'application/json',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: callback,
            error: onError(callback)
        });
    }
    
    function upload(name, content, mime, callback) {
        var form = new FormData();
        var blob = new Blob([content], {type: mime});
        form.append("fileToUpload", blob, name);
        $.ajax({
            url: server_url + '/files',
            type: 'POST',
            data: form,
            dataType: 'json',
            contentType: false,
            processData: false,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: callback,
            error: onError(callback)
        });
    }
    
    function content(hash, callback) {
        $.ajax({
            url: hash2uri(hash),
            type: 'GET',
            contentType: false,
            processData: false,
            cache: true,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function (data, textStatus, jqXHR) {
                callback(jqXHR.responseText);
            },
            error: function(jqXHR, textStatus, errorMessage) {
                console.error(errorMessage);
            }
        });
    }

    function call(method, inputs, callback) {
        $.ajax({
            url: server_url + '/' + method,
            type: 'POST',
            data: JSON.stringify(inputs),
            dataType: 'json',
            contentType: 'application/json',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: callback,
            error: onError(callback)
        });
    }

    ping(function (response) {
        status = response.status;
        if (onPing) {
            onPing(response);
        }
    });

    return {
        status: () => status,
        hash2uri: hash2uri,
        upload: upload,
        ping: ping,
        content: content,
        tdt: function (inputs, callback) {
            return call('tdt', inputs, callback);
        },
        stl: function (inputs, callback) {
            return call('stl', inputs, callback);
        },
    };
}

function tdtWrapper(proxy) {
    var inputs = {};
    
    function combinedCall(key, data, callback) {
        proxy.upload(key+'.xml', data, 'text/xml', function (response) {
            inputs[key] = response.result[0].id;
            if (inputs.source && inputs.rules && inputs.template) {
                proxy.tdt(inputs, function (response) {
                    proxy.content(response.result.id, callback );
                });
            }
        });
    };
    return combinedCall;
}

function stlWrapper(proxy) {

    function combinedCall(inputs, callback) {
        proxy.upload('design.xml', design, 'text/xml', function (response) {
            var inputs = {
                design: response.result[0].id,
                options: options
            };
            proxy.stl(inputs, callback );
        });
    };
    return combinedCall;
}


/*
  function memoize(func) {
  var memo = {};
  var slice = Array.prototype.slice;

  return function() {
  var args = slice.call(arguments);

  if (args in memo)
  return memo[args];
  else
  return (memo[args] = func.apply(this, args));

  }
  }
*/  
function coalesce(func, timeframe) {
	if (timeframe === undefined)
        timeframe = 150;
    var slice = Array.prototype.slice;

    function bind(args) {
        return function() {
			func.apply(this, args);
        }
    }
   
    var lock;
    return (timeframe === 0)
        ? func
        : function () {
            clearTimeout(lock);
            lock = setTimeout(bind(slice.call(arguments)), timeframe);
        };
}

exports.proxy = storytellerProxy;
exports.tdtWrapper = tdtWrapper;
exports.stlWrapper = stlWrapper;
exports.coalesce = coalesce;


},{}],"stl":[function(require,module,exports){
// Copyright (c) 2017 Open Text. All Rights Reserved.

'use strict';

var util = require('util');

const namespaces = {
    stl: "http://developer.opentext.com/schemas/storyteller/layout",
    xp: "http://developer.opentext.com/schemas/storyteller/xmlpreprocessor",
    scd: "http://developer.opentext.com/schemas/storyteller/chart/definition",
    ddi: "http://developer.opentext.com/schemas/storyteller/layout/ddi/v1"
};

function xml_escaper(pattern) {
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
            return fallback(c);
        }
    }
    return function (value) {
        return value.replace(pattern, encoder);
    };
}

const attr_escape = xml_escaper(/[<>&"]/g);
const text_escape = xml_escaper(/[<>&]/g);

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

function is_element(tag, nsmap, expected_ns, expected_name) {
    var split = tag.split(':', 2);
    var alias = split.length === 1
        ? ''
        : split[0];
    var name = split.length === 1
        ? split[0]
        : split[1];
    if (name === expected_name) {
        var ns = nsmap.lookup(alias);
        return (ns === expected_ns);
    }
    return false;
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

    var aEscape = (data) => data;
    var tEscape = (data) => data;
    if (!dont_escape) {
        aEscape = attr_escape;
        tEscape = text_escape;
    }

    return {
        start: function (tag, attrs) {
            accumulated += '<' + tag;
            Object.keys(attrs).forEach(function (key) {
                accumulated += ' ' + key + '="' + aEscape(attrs[key]) + '"';
            });
            accumulated += '>';
        },
        end: function (tag) {
            accumulated += '</' + tag + '>';
        },
        text: function (data) {
            accumulated += tEscape(data);
        },
        finalize: function () {
            callback(accumulated);
        }
    };
}

function fork() {
    var next = Array.prototype.slice.call(arguments);
    return {
        start: (tag, attrs) => next.forEach((n) => n.start(tag, attrs)),
        end: (tag) => next.forEach((n) => n.end(tag)),
        text: (data) => next.forEach((n) => n.text(data)),
        finalize: (data) => next.forEach((n) => n.finalize()),
    };
}

///////////////////////////////////////////////////////////////////////////////////////////////

function preprocessor(nsmap, next, handlers) {
    handlers = handlers || {};

    var streams = require('streams');   
    var callback = handlers.fixture || function () {
        throw new Error("stl::fixture not supported");
    };
    var fixture = null;

    function is_fixture(tag) {
        return is_element(tag, nsmap, namespaces.xp, 'fixture');
    }

    function get_next() {
        return fixture || next;
    }

    function start(name, attrs) {
        if (is_fixture(name)) {
            var src = attrs.src;
            if (src) {
                callback(attrs, streams.stream(src));
                fixture = empty_checker();
            } else {
                fixture = xml_accumulator(function (data) {
                    callback(attrs, streams.stream().write(data));
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

function stl_normalizer(nsmap, next) {
    var data = '';
    var last_start = true;
    var story_depth = 0;

    function is_story(tag) {
        return is_element(tag, nsmap, namespaces.stl, 'story');
    }
    
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
        if (story_depth) {
            data = normalize_space(data, last_start, !start);
        }
        if (data) {
            next.text(data);
            data = '';
        }
        last_start = start;
    }

    function start(name, attrs) {
        flush(true);
        next.start(name, attrs);
        if (is_story(name)) {
            story_depth += 1;
        }
    }

    function end(name, attrs) {
        flush(false);
        next.end(name, attrs);
        if (is_story(name)) {
            story_depth -= 1;
        }
    }

    function text(txt) {
        data += txt;
    }

    function finalize() {
        if (data.trim()) {
            throw new Error("Dangling text: " + data);
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

function sax_parser(nsmap, builder, options) {
    options = options || {};
    var sax = require('sax');

    var dispatcher = dispatch_stack(handler_dispatcher(nsmap, builder));
    var preprocess = preprocessor(nsmap, dispatcher, options.handlers);
    var normalize = stl_normalizer(nsmap, preprocess);
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

function xml_writer(options, initial_tags) {
    initial_tags = initial_tags || [];
    var indenter = make_indenter(options.indent);
    var tags = initial_tags.slice();
    var no_children;
    var content = '';
    
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
        if (options.shortener && no_children) {
            content = content.slice(0, -1) + options.shortener(tag);
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

    function inject(markup) {
        no_children = false;
        content += markup;
    }
    
    function finalize() {
        if (tags.length != initial_tags.length)
            throw new Error("xml_writer parity mismatch");
        var result = content;
        content = '';
        return result;
    }

    return {
        start: start,
        end: end,
        text: text,
        inject: inject,
        finalize: finalize
    };
}

function css_map(normalize) {
    var categories = {};
    
    function cls(style, tag) {
        tag = tag || 'cls';
        if (normalize) {
            style = style.split(';').map(function (s) {
                return s.split(':').map(p => p.trim()).join(':');
            }).sort().join(';');
        }
        if (!style)
            return null;
        var category = categories[tag];
        if (category === undefined) {
            category = categories[tag] = [];
        }
        var i = category.indexOf(style);
        if (i === -1) {
            i = category.length;
            category.push(style);
        }
        return tag + (i + 1);
    }

    function all() {
        var result = {};
        Object.keys(categories).forEach(function (cat) {
            categories[cat].forEach(function (style, index) {
                result[cat + (index + 1)] = style;
            });
        });
        return Object.keys(result).length ? result : null;
    }

    return {
        cls: cls,
        all: all
    };
}

function stl_writer(indent, css) {
    var writer = xml_writer({indent: indent, shortener: () => '/>'}, ['stl:stl']);
    var cssmap = css ? css_map(true) : null;

    function start(tag, attrs) {
        if (attrs && attrs.style !== undefined) {
            if (cssmap) {
                var cls = cssmap.cls(attrs.style, 'stl-'+tag);
                delete attrs.style;
                if (cls !== null) {
                    attrs['class'] = cls;
                }
            } else {
                if (attrs.style.trim() === '')
                    delete attrs.style;
            }
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
        function stylesheet(styles) {
            var content = '';
            Object.keys(styles).forEach(function (style, index) {
                content += '\n.'+style+' {\n  ';
                content += styles[style].split(';').map(s => s.replace(':', ': ')).join(';\n  ');
                content += '\n}';
            });
            return content;
        }
        
        var content = writer.finalize();
        writer = xml_writer({indent: indent, shortener: () => '/>'});
        var attrs = {
            'xmlns:stl': exports.namespaces.stl,
            version: exports.version
        };
        writer.start('stl:stl', attrs);
        if (cssmap) {
            var styles = cssmap.all();
            if (styles) {
                var ss = stylesheet(styles);
                if (util.isStream(css)) {
                    css.write(ss);
                    writer.start('stl:style', {src: css.uri});
                    writer.end('stl:style');
                } else {
                    writer.start('stl:style');
                    writer.text(ss.replace(/\n/g, '\n    '));
                    writer.end('stl:style');
                }
            }
        }
        writer.inject(content);
        writer.end('stl:stl');
        content = writer.finalize();
        writer = null;
        return content;
    }

    return {
        start: start,
        end: end,
        text: text,
        finalize: finalize
    };
}

////////////////////////////////////////////////////////////////////////////

function css_parse(css) {
    function compileProps(rules, selector, styles) {
        var result = (styles && styles[selector]) || {};
        rules.forEach(function(rule) {
            if (rule.selectors.indexOf(selector) !== -1) {
                rule.declarations.filter((decl) => decl.type === 'declaration').forEach(function(decl) {
                    result[decl.property] = decl.value;
                });
            }
        });
        return result;
    }

    function compileStylesheet(rules, styles) {
        styles = styles || {};
        rules.forEach(function(rule) {
            rule.selectors.filter((sel) => sel.startsWith('.') && !sel.endsWith('::marker')).forEach(function(selector) {
                styles[selector] = compileProps(rules, selector, styles);
                var marker = compileProps(rules, selector+'::marker');
                if (Object.keys(marker).length)
                    styles[selector]['-stl-list-marker'] = marker;
            });
        });
        return styles;
    }

    var parse = require('css').parse;
    var rules = parse(css).stylesheet.rules.filter((rule) => rule.type === 'rule');
    var styles = compileStylesheet(rules);
    return styles;
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

function css_format(css) {
    return Object.keys(css).filter(function (key) {
        var v = css[key];
        return v !== null && v !== undefined;
    }).map(function (key) {
        return key + ': ' + css[key];
    }).join('; ');
}

function css_lookup(stylesheet, attrs, basecss) {
    function clone_css(css) {
        return JSON.parse(JSON.stringify(css));
    }
    
    var css = basecss ? clone_css(basecss) : {};
    var cls = attrs['class'];
    if (cls && stylesheet) {
        var style = stylesheet['.'+cls];
        if (style) {
            Object.keys(style).forEach(function (prop) {
                css[prop] = style[prop];
            });
        }
    }
    css_split(attrs.style, css);
    return css;
}

exports.version = '0.1';
exports.namespaces = namespaces;
exports.namespace_stack = namespace_stack;
exports.handler_dispatcher = handler_dispatcher;
exports.ignorant = ignorant;
exports.empty_checker = empty_checker;
exports.text_accumulator = text_accumulator;
exports.xml_accumulator = xml_accumulator;
exports.fork = fork;
exports.parser = sax_parser;
exports.xml_escaper = xml_escaper;
exports.attr_escape = attr_escape;
exports.text_escape = text_escape;

exports.make_indenter = make_indenter;
exports.xml_writer = xml_writer;
exports.stl_writer = stl_writer;
exports.css_parse = css_parse;
exports.css_lookup = css_lookup;
exports.css_split = css_split;
exports.css_format = css_format;

},{"css":"css","sax":"sax","streams":"streams","util":"util"}],"streams":[function(require,module,exports){
(function (Buffer){
// Copyright (c) 2017 Open Text. All Rights Reserved.
'use strict';

var repo = require('repo');
var util = require('util');

function _checkEncoding(encoding) {
    if (encoding === undefined) {
        return 'utf8';
    }
    if (encoding && !Buffer.isEncoding(encoding)) {
        throw new Error("Unknown encoding: '" + encoding + "'");
    }
    return encoding;
}

function _prepareBuffer(data, encoding) {
    if (util.isString(data)) {
        return new Buffer(data, encoding);
    }
    if (encoding) {
        throw new Error("Encoding argument allowed only for string data");
    }
    if (util.isNumber(data)) {
        return '' + data;
    }
    return new Buffer(data);
}

exports.stream = function stream(stream_uri) {
    var uri_ = stream_uri || null;
    var content_ = '';
    var self_ = {
        get uri() {
            return uri_;
        },
        set uri(new_uri) {
            _check(new_uri);
            uri_ = new_uri;
            content_ = null;
        },
        inspect: _inspect,
        stat: _stat,
        read: _read,
        write: _write
    };

    function _outuri(uri) {
        if (uri) {
            if (uri.startsWith('local:')) {
                return 'local:';
            }
            if (uri.startsWith('data:')) {
                return 'data:';
            }
        }
        return uri;
    }

    function _check(uri) {
        var stat = repo.stat(uri);
        if (!stat || stat.type !== 'STREAM') {
            throw new Error("No such stream: '" + uri + "'");
        }
    }

    function _stat() {
        if (uri_) {
            var stat = repo.stat(uri_);
            return stat || {type: 'STREAM', uri: uri_};
        }
        return {type: 'STREAM', size: Buffer.byteLength(content_)};
    }

    function _write(data, encoding) {
        var uri = _outuri(uri_);
        if (uri) {
            uri_ = repo.save(uri, data, encoding);
        } else {
            content_ = _prepareBuffer(data, encoding);
        }
        return self_;
    }

    function _read(encoding) {
        encoding = _checkEncoding(encoding);
        if (encoding === 'utf8' && uri_) {
            return repo.load(uri_, encoding);
        }
        var content = uri_
            ? new Buffer(repo.load(uri_, null))
            : content_;
        return (encoding)
            ? content.toString(encoding)
            : content;
    }

    function _shorten(str, length) {
        if (str.length > length) {
            str = str.substring(0, length / 2) + '...' + str.substring(str.length - length / 2);
        }
        return str;
    }
    function _inspect() {
        var stat = _stat();
        if (stat.uri) {
            stat.uri = _shorten(stat.uri, 100);
        }
        delete stat.type;
        return "[Stream " + util.inspect(stat) + " ]";
    }

    return self_;
};


}).call(this,require("buffer").Buffer)
},{"buffer":"buffer","repo":false,"util":"util"}],"util":[function(require,module,exports){
// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
var isArray = exports.isArray = Array.isArray;

function isStream(obj) {
  return isObject(obj) && obj.uri !== undefined && isFunction(obj.read) && isFunction(obj.write) && isFunction(obj.stat);
}
exports.isStream = isStream;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

},{}],"xml2js":[function(require,module,exports){
// Generated by CoffeeScript 1.10.0
(function() {
  "use strict";
  var bom, builder, escapeCDATA, events, isEmpty, processName, processors, requiresCDATA, sax, setImmediate, wrapCDATA,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  sax = require('sax');

  events = require('events');

  //builder = require('xmlbuilder');

  bom = require('./bom');

  processors = require('./processors');

  //setImmediate = require('timers').setImmediate;

  isEmpty = function(thing) {
    return typeof thing === "object" && (thing != null) && Object.keys(thing).length === 0;
  };

  processName = function(processors, processedName) {
    var i, len, process;
    for (i = 0, len = processors.length; i < len; i++) {
      process = processors[i];
      processedName = process(processedName);
    }
    return processedName;
  };

  requiresCDATA = function(entry) {
    return entry.indexOf('&') >= 0 || entry.indexOf('>') >= 0 || entry.indexOf('<') >= 0;
  };

  wrapCDATA = function(entry) {
    return "<![CDATA[" + (escapeCDATA(entry)) + "]]>";
  };

  escapeCDATA = function(entry) {
    return entry.replace(']]>', ']]]]><![CDATA[>');
  };

  exports.processors = processors;

  exports.defaults = {
    "0.1": {
      explicitCharkey: false,
      trim: true,
      normalize: true,
      normalizeTags: false,
      attrkey: "@",
      charkey: "#",
      explicitArray: false,
      ignoreAttrs: false,
      mergeAttrs: false,
      explicitRoot: false,
      validator: null,
      xmlns: false,
      explicitChildren: false,
      childkey: '@@',
      charsAsChildren: false,
      includeWhiteChars: false,
      async: false,
      strict: true,
      attrNameProcessors: null,
      attrValueProcessors: null,
      tagNameProcessors: null,
      valueProcessors: null,
      emptyTag: ''
    },
    "0.2": {
      explicitCharkey: false,
      trim: false,
      normalize: false,
      normalizeTags: false,
      attrkey: "$",
      charkey: "_",
      explicitArray: true,
      ignoreAttrs: false,
      mergeAttrs: false,
      explicitRoot: true,
      validator: null,
      xmlns: false,
      explicitChildren: false,
      preserveChildrenOrder: false,
      childkey: '$$',
      charsAsChildren: false,
      includeWhiteChars: false,
      async: false,
      strict: true,
      attrNameProcessors: null,
      attrValueProcessors: null,
      tagNameProcessors: null,
      valueProcessors: null,
      rootName: 'root',
      xmldec: {
        'version': '1.0',
        'encoding': 'UTF-8',
        'standalone': true
      },
      doctype: null,
      renderOpts: {
        'pretty': true,
        'indent': '  ',
        'newline': '\n'
      },
      headless: false,
      chunkSize: 10000,
      emptyTag: '',
      cdata: false
    }
  };

  exports.ValidationError = (function(superClass) {
    extend(ValidationError, superClass);

    function ValidationError(message) {
      this.message = message;
    }

    return ValidationError;

  })(Error);

  // exports.Builder = (function() {
  //   function Builder(opts) {
  //     var key, ref, value;
  //     this.options = {};
  //     ref = exports.defaults["0.2"];
  //     for (key in ref) {
  //       if (!hasProp.call(ref, key)) continue;
  //       value = ref[key];
  //       this.options[key] = value;
  //     }
  //     for (key in opts) {
  //       if (!hasProp.call(opts, key)) continue;
  //       value = opts[key];
  //       this.options[key] = value;
  //     }
  //   }

  //   Builder.prototype.buildObject = function(rootObj) {
  //     var attrkey, charkey, render, rootElement, rootName;
  //     attrkey = this.options.attrkey;
  //     charkey = this.options.charkey;
  //     if ((Object.keys(rootObj).length === 1) && (this.options.rootName === exports.defaults['0.2'].rootName)) {
  //       rootName = Object.keys(rootObj)[0];
  //       rootObj = rootObj[rootName];
  //     } else {
  //       rootName = this.options.rootName;
  //     }
  //     render = (function(_this) {
  //       return function(element, obj) {
  //         var attr, child, entry, index, key, value;
  //         if (typeof obj !== 'object') {
  //           if (_this.options.cdata && requiresCDATA(obj)) {
  //             element.raw(wrapCDATA(obj));
  //           } else {
  //             element.txt(obj);
  //           }
  //         } else {
  //           for (key in obj) {
  //             if (!hasProp.call(obj, key)) continue;
  //             child = obj[key];
  //             if (key === attrkey) {
  //               if (typeof child === "object") {
  //                 for (attr in child) {
  //                   value = child[attr];
  //                   element = element.att(attr, value);
  //                 }
  //               }
  //             } else if (key === charkey) {
  //               if (_this.options.cdata && requiresCDATA(child)) {
  //                 element = element.raw(wrapCDATA(child));
  //               } else {
  //                 element = element.txt(child);
  //               }
  //             } else if (Array.isArray(child)) {
  //               for (index in child) {
  //                 if (!hasProp.call(child, index)) continue;
  //                 entry = child[index];
  //                 if (typeof entry === 'string') {
  //                   if (_this.options.cdata && requiresCDATA(entry)) {
  //                     element = element.ele(key).raw(wrapCDATA(entry)).up();
  //                   } else {
  //                     element = element.ele(key, entry).up();
  //                   }
  //                 } else {
  //                   element = render(element.ele(key), entry).up();
  //                 }
  //               }
  //             } else if (typeof child === "object") {
  //               element = render(element.ele(key), child).up();
  //             } else {
  //               if (typeof child === 'string' && _this.options.cdata && requiresCDATA(child)) {
  //                 element = element.ele(key).raw(wrapCDATA(child)).up();
  //               } else {
  //                 if (child == null) {
  //                   child = '';
  //                 }
  //                 element = element.ele(key, child.toString()).up();
  //               }
  //             }
  //           }
  //         }
  //         return element;
  //       };
  //     })(this);
  //     rootElement = builder.create(rootName, this.options.xmldec, this.options.doctype, {
  //       headless: this.options.headless,
  //       allowSurrogateChars: this.options.allowSurrogateChars
  //     });
  //     return render(rootElement, rootObj).end(this.options.renderOpts);
  //   };

  //   return Builder;

  // })();

  exports.Parser = (function(superClass) {
    extend(Parser, superClass);

    function Parser(opts) {
      this.parseString = bind(this.parseString, this);
      this.reset = bind(this.reset, this);
      this.assignOrPush = bind(this.assignOrPush, this);
      this.processAsync = bind(this.processAsync, this);
      var key, ref, value;
      if (!(this instanceof exports.Parser)) {
        return new exports.Parser(opts);
      }
      this.options = {};
      ref = exports.defaults["0.2"];
      for (key in ref) {
        if (!hasProp.call(ref, key)) continue;
        value = ref[key];
        this.options[key] = value;
      }
      for (key in opts) {
        if (!hasProp.call(opts, key)) continue;
        value = opts[key];
        this.options[key] = value;
      }
      if (this.options.xmlns) {
        this.options.xmlnskey = this.options.attrkey + "ns";
      }
      if (this.options.normalizeTags) {
        if (!this.options.tagNameProcessors) {
          this.options.tagNameProcessors = [];
        }
        this.options.tagNameProcessors.unshift(processors.normalize);
      }
      this.reset();
    }

    Parser.prototype.processAsync = function() {
      var chunk, err, error1;
      try {
        if (this.remaining.length <= this.options.chunkSize) {
          chunk = this.remaining;
          this.remaining = '';
          this.saxParser = this.saxParser.write(chunk);
          return this.saxParser.close();
        } else {
          chunk = this.remaining.substr(0, this.options.chunkSize);
          this.remaining = this.remaining.substr(this.options.chunkSize, this.remaining.length);
          this.saxParser = this.saxParser.write(chunk);
          return setImmediate(this.processAsync);
        }
      } catch (error1) {
        err = error1;
        if (!this.saxParser.errThrown) {
          this.saxParser.errThrown = true;
          return this.emit(err);
        }
      }
    };

    Parser.prototype.assignOrPush = function(obj, key, newValue) {
      if (!(key in obj)) {
        if (!this.options.explicitArray) {
          return obj[key] = newValue;
        } else {
          return obj[key] = [newValue];
        }
      } else {
        if (!(obj[key] instanceof Array)) {
          obj[key] = [obj[key]];
        }
        return obj[key].push(newValue);
      }
    };

    Parser.prototype.reset = function() {
      var attrkey, charkey, ontext, stack;
      this.removeAllListeners();
      this.saxParser = sax.parser(this.options.strict, {
        trim: false,
        normalize: false,
        xmlns: this.options.xmlns
      });
      this.saxParser.errThrown = false;
      this.saxParser.onerror = (function(_this) {
        return function(error) {
          _this.saxParser.resume();
          if (!_this.saxParser.errThrown) {
            _this.saxParser.errThrown = true;
            return _this.emit("error", error);
          }
        };
      })(this);
      this.saxParser.onend = (function(_this) {
        return function() {
          if (!_this.saxParser.ended) {
            _this.saxParser.ended = true;
            return _this.emit("end", _this.resultObject);
          }
        };
      })(this);
      this.saxParser.ended = false;
      this.EXPLICIT_CHARKEY = this.options.explicitCharkey;
      this.resultObject = null;
      stack = [];
      attrkey = this.options.attrkey;
      charkey = this.options.charkey;
      this.saxParser.onopentag = (function(_this) {
        return function(node) {
          var key, newValue, obj, processedKey, ref;
          obj = {};
          obj[charkey] = "";
          if (!_this.options.ignoreAttrs) {
            ref = node.attributes;
            for (key in ref) {
              if (!hasProp.call(ref, key)) continue;
              if (!(attrkey in obj) && !_this.options.mergeAttrs) {
                obj[attrkey] = {};
              }
              newValue = _this.options.attrValueProcessors ? processName(_this.options.attrValueProcessors, node.attributes[key]) : node.attributes[key];
              processedKey = _this.options.attrNameProcessors ? processName(_this.options.attrNameProcessors, key) : key;
              if (_this.options.mergeAttrs) {
                _this.assignOrPush(obj, processedKey, newValue);
              } else {
                obj[attrkey][processedKey] = newValue;
              }
            }
          }
          obj["#name"] = _this.options.tagNameProcessors ? processName(_this.options.tagNameProcessors, node.name) : node.name;
          if (_this.options.xmlns) {
            obj[_this.options.xmlnskey] = {
              uri: node.uri,
              local: node.local
            };
          }
          return stack.push(obj);
        };
      })(this);
      this.saxParser.onclosetag = (function(_this) {
        return function() {
          var cdata, emptyStr, err, error1, key, node, nodeName, obj, objClone, old, s, xpath;
          obj = stack.pop();
          nodeName = obj["#name"];
          if (!_this.options.explicitChildren || !_this.options.preserveChildrenOrder) {
            delete obj["#name"];
          }
          if (obj.cdata === true) {
            cdata = obj.cdata;
            delete obj.cdata;
          }
          s = stack[stack.length - 1];
          if (obj[charkey].match(/^\s*$/) && !cdata) {
            emptyStr = obj[charkey];
            delete obj[charkey];
          } else {
            if (_this.options.trim) {
              obj[charkey] = obj[charkey].trim();
            }
            if (_this.options.normalize) {
              obj[charkey] = obj[charkey].replace(/\s{2,}/g, " ").trim();
            }
            obj[charkey] = _this.options.valueProcessors ? processName(_this.options.valueProcessors, obj[charkey]) : obj[charkey];
            if (Object.keys(obj).length === 1 && charkey in obj && !_this.EXPLICIT_CHARKEY) {
              obj = obj[charkey];
            }
          }
          if (isEmpty(obj)) {
            obj = _this.options.emptyTag !== '' ? _this.options.emptyTag : emptyStr;
          }
          if (_this.options.validator != null) {
            xpath = "/" + ((function() {
              var i, len, results;
              results = [];
              for (i = 0, len = stack.length; i < len; i++) {
                node = stack[i];
                results.push(node["#name"]);
              }
              return results;
            })()).concat(nodeName).join("/");
            try {
              obj = _this.options.validator(xpath, s && s[nodeName], obj);
            } catch (error1) {
              err = error1;
              _this.emit("error", err);
            }
          }
          if (_this.options.explicitChildren && !_this.options.mergeAttrs && typeof obj === 'object') {
            if (!_this.options.preserveChildrenOrder) {
              node = {};
              if (_this.options.attrkey in obj) {
                node[_this.options.attrkey] = obj[_this.options.attrkey];
                delete obj[_this.options.attrkey];
              }
              if (!_this.options.charsAsChildren && _this.options.charkey in obj) {
                node[_this.options.charkey] = obj[_this.options.charkey];
                delete obj[_this.options.charkey];
              }
              if (Object.getOwnPropertyNames(obj).length > 0) {
                node[_this.options.childkey] = obj;
              }
              obj = node;
            } else if (s) {
              s[_this.options.childkey] = s[_this.options.childkey] || [];
              objClone = {};
              for (key in obj) {
                if (!hasProp.call(obj, key)) continue;
                objClone[key] = obj[key];
              }
              s[_this.options.childkey].push(objClone);
              delete obj["#name"];
              if (Object.keys(obj).length === 1 && charkey in obj && !_this.EXPLICIT_CHARKEY) {
                obj = obj[charkey];
              }
            }
          }
          if (stack.length > 0) {
            return _this.assignOrPush(s, nodeName, obj);
          } else {
            if (_this.options.explicitRoot) {
              old = obj;
              obj = {};
              obj[nodeName] = old;
            }
            _this.resultObject = obj;
            _this.saxParser.ended = true;
            return _this.emit("end", _this.resultObject);
          }
        };
      })(this);
      ontext = (function(_this) {
        return function(text) {
          var charChild, s;
          s = stack[stack.length - 1];
          if (s) {
            s[charkey] += text;
            if (_this.options.explicitChildren && _this.options.preserveChildrenOrder && _this.options.charsAsChildren && (_this.options.includeWhiteChars || text.replace(/\\n/g, '').trim() !== '')) {
              s[_this.options.childkey] = s[_this.options.childkey] || [];
              charChild = {
                '#name': '__text__'
              };
              charChild[charkey] = text;
              if (_this.options.normalize) {
                charChild[charkey] = charChild[charkey].replace(/\s{2,}/g, " ").trim();
              }
              s[_this.options.childkey].push(charChild);
            }
            return s;
          }
        };
      })(this);
      this.saxParser.ontext = ontext;
      return this.saxParser.oncdata = (function(_this) {
        return function(text) {
          var s;
          s = ontext(text);
          if (s) {
            return s.cdata = true;
          }
        };
      })(this);
    };

    Parser.prototype.parseString = function(str, cb) {
      var err, error1;
      if ((cb != null) && typeof cb === "function") {
        this.on("end", function(result) {
          this.reset();
          return cb(null, result);
        });
        this.on("error", function(err) {
          this.reset();
          return cb(err);
        });
      }
      try {
        str = str.toString();
        if (str.trim() === '') {
          this.emit("end", null);
          return true;
        }
        str = bom.stripBOM(str);
        if (this.options.async) {
          this.remaining = str;
          setImmediate(this.processAsync);
          return this.saxParser;
        }
        return this.saxParser.write(str).close();
      } catch (error1) {
        err = error1;
        if (!(this.saxParser.errThrown || this.saxParser.ended)) {
          this.emit('error', err);
          return this.saxParser.errThrown = true;
        } else if (this.saxParser.ended) {
          throw err;
        }
      }
    };

    return Parser;

  })(events.EventEmitter);

  exports.parseString = function(str, a, b) {
    var cb, options, parser;
    if (b != null) {
      if (typeof b === 'function') {
        cb = b;
      }
      if (typeof a === 'object') {
        options = a;
      }
    } else {
      if (typeof a === 'function') {
        cb = a;
      }
      options = {};
    }
    parser = new exports.Parser(options);
    return parser.parseString(str, cb);
  };

}).call(this);

},{"./bom":"/forsetup/js/core/xml2js/bom.js","./processors":"/forsetup/js/core/xml2js/processors.js","events":"events","sax":"sax"}],"xmldom":[function(require,module,exports){
function DOMParser(options){
	this.options = options ||{locator:{}};
	
}
DOMParser.prototype.parseFromString = function(source,mimeType){	
	var options = this.options;
	var sax =  new XMLReader();
	var domBuilder = options.domBuilder || new DOMHandler();//contentHandler and LexicalHandler
	var errorHandler = options.errorHandler;
	var locator = options.locator;
	var defaultNSMap = options.xmlns||{};
	var entityMap = {'lt':'<','gt':'>','amp':'&','quot':'"','apos':"'"}
	if(locator){
		domBuilder.setDocumentLocator(locator)
	}
	
	sax.errorHandler = buildErrorHandler(errorHandler,domBuilder,locator);
	sax.domBuilder = options.domBuilder || domBuilder;
	if(/\/x?html?$/.test(mimeType)){
		entityMap.nbsp = '\xa0';
		entityMap.copy = '\xa9';
		defaultNSMap['']= 'http://www.w3.org/1999/xhtml';
	}
	if(source){
		sax.parse(source,defaultNSMap,entityMap);
	}else{
		sax.errorHandler.error("invalid document source");
	}
	return domBuilder.document;
}
function buildErrorHandler(errorImpl,domBuilder,locator){
	if(!errorImpl){
		if(domBuilder instanceof DOMHandler){
			return domBuilder;
		}
		errorImpl = domBuilder ;
	}
	var errorHandler = {}
	var isCallback = errorImpl instanceof Function;
	locator = locator||{}
	function build(key){
		var fn = errorImpl[key];
		if(!fn){
			if(isCallback){
				fn = errorImpl.length == 2?function(msg){errorImpl(key,msg)}:errorImpl;
			}else{
				var i=arguments.length;
				while(--i){
					if(fn = errorImpl[arguments[i]]){
						break;
					}
				}
			}
		}
		errorHandler[key] = fn && function(msg){
			fn(msg+_locator(locator));
		}||function(){};
	}
	build('warning','warn');
	build('error','warn','warning');
	build('fatalError','warn','warning','error');
	return errorHandler;
}
/**
 * +ContentHandler+ErrorHandler
 * +LexicalHandler+EntityResolver2
 * -DeclHandler-DTDHandler 
 * 
 * DefaultHandler:EntityResolver, DTDHandler, ContentHandler, ErrorHandler
 * DefaultHandler2:DefaultHandler,LexicalHandler, DeclHandler, EntityResolver2
 * @link http://www.saxproject.org/apidoc/org/xml/sax/helpers/DefaultHandler.html
 */
function DOMHandler() {
    this.cdata = false;
}
function position(locator,node){
	node.lineNumber = locator.lineNumber;
	node.columnNumber = locator.columnNumber;
}
/**
 * @see org.xml.sax.ContentHandler#startDocument
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ContentHandler.html
 */ 
DOMHandler.prototype = {
	startDocument : function() {
    	this.document = new DOMImplementation().createDocument(null, null, null);
    	if (this.locator) {
        	this.document.documentURI = this.locator.systemId;
    	}
	},
	startElement:function(namespaceURI, localName, qName, attrs) {
		var doc = this.document;
	    var el = doc.createElementNS(namespaceURI, qName||localName);
	    var len = attrs.length;
	    appendElement(this, el);
	    this.currentElement = el;
	    
		this.locator && position(this.locator,el)
	    for (var i = 0 ; i < len; i++) {
	        var namespaceURI = attrs.getURI(i);
	        var value = attrs.getValue(i);
	        var qName = attrs.getQName(i);
			var attr = doc.createAttributeNS(namespaceURI, qName);
			if( attr.getOffset){
				position(attr.getOffset(1),attr)
			}
			attr.value = attr.nodeValue = value;
			el.setAttributeNode(attr)
	    }
	},
	endElement:function(namespaceURI, localName, qName) {
		var current = this.currentElement
	    var tagName = current.tagName;
	    this.currentElement = current.parentNode;
	},
	startPrefixMapping:function(prefix, uri) {
	},
	endPrefixMapping:function(prefix) {
	},
	processingInstruction:function(target, data) {
	    var ins = this.document.createProcessingInstruction(target, data);
	    this.locator && position(this.locator,ins)
	    appendElement(this, ins);
	},
	ignorableWhitespace:function(ch, start, length) {
	},
	characters:function(chars, start, length) {
		chars = _toString.apply(this,arguments)
		//console.log(chars)
		if(this.currentElement && chars){
			if (this.cdata) {
				var charNode = this.document.createCDATASection(chars);
				this.currentElement.appendChild(charNode);
			} else {
				var charNode = this.document.createTextNode(chars);
				this.currentElement.appendChild(charNode);
			}
			this.locator && position(this.locator,charNode)
		}
	},
	skippedEntity:function(name) {
	},
	endDocument:function() {
		this.document.normalize();
	},
	setDocumentLocator:function (locator) {
	    if(this.locator = locator){// && !('lineNumber' in locator)){
	    	locator.lineNumber = 0;
	    }
	},
	//LexicalHandler
	comment:function(chars, start, length) {
		chars = _toString.apply(this,arguments)
	    var comm = this.document.createComment(chars);
	    this.locator && position(this.locator,comm)
	    appendElement(this, comm);
	},
	
	startCDATA:function() {
	    //used in characters() methods
	    this.cdata = true;
	},
	endCDATA:function() {
	    this.cdata = false;
	},
	
	startDTD:function(name, publicId, systemId) {
		var impl = this.document.implementation;
	    if (impl && impl.createDocumentType) {
	        var dt = impl.createDocumentType(name, publicId, systemId);
	        this.locator && position(this.locator,dt)
	        appendElement(this, dt);
	    }
	},
	/**
	 * @see org.xml.sax.ErrorHandler
	 * @link http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
	 */
	warning:function(error) {
		console.warn(error,_locator(this.locator));
	},
	error:function(error) {
		console.error(error,_locator(this.locator));
	},
	fatalError:function(error) {
		console.error(error,_locator(this.locator));
	    throw error;
	}
}
function _locator(l){
	if(l){
		return '\n@'+(l.systemId ||'')+'#[line:'+l.lineNumber+',col:'+l.columnNumber+']'
	}
}
function _toString(chars,start,length){
	if(typeof chars == 'string'){
		return chars.substr(start,length)
	}else{//java sax connect width xmldom on rhino(what about: "? && !(chars instanceof String)")
		if(chars.length >= start+length || start){
			return new java.lang.String(chars,start,length)+'';
		}
		return chars;
	}
}

/*
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/LexicalHandler.html
 * used method of org.xml.sax.ext.LexicalHandler:
 *  #comment(chars, start, length)
 *  #startCDATA()
 *  #endCDATA()
 *  #startDTD(name, publicId, systemId)
 *
 *
 * IGNORED method of org.xml.sax.ext.LexicalHandler:
 *  #endDTD()
 *  #startEntity(name)
 *  #endEntity(name)
 *
 *
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/DeclHandler.html
 * IGNORED method of org.xml.sax.ext.DeclHandler
 * 	#attributeDecl(eName, aName, type, mode, value)
 *  #elementDecl(name, model)
 *  #externalEntityDecl(name, publicId, systemId)
 *  #internalEntityDecl(name, value)
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/EntityResolver2.html
 * IGNORED method of org.xml.sax.EntityResolver2
 *  #resolveEntity(String name,String publicId,String baseURI,String systemId)
 *  #resolveEntity(publicId, systemId)
 *  #getExternalSubset(name, baseURI)
 * @link http://www.saxproject.org/apidoc/org/xml/sax/DTDHandler.html
 * IGNORED method of org.xml.sax.DTDHandler
 *  #notationDecl(name, publicId, systemId) {};
 *  #unparsedEntityDecl(name, publicId, systemId, notationName) {};
 */
"endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g,function(key){
	DOMHandler.prototype[key] = function(){return null}
})

/* Private static helpers treated below as private instance methods, so don't need to add these to the public API; we might use a Relator to also get rid of non-standard public properties */
function appendElement (hander,node) {
    if (!hander.currentElement) {
        hander.document.appendChild(node);
    } else {
        hander.currentElement.appendChild(node);
    }
}//appendChild and setAttributeNS are preformance key

if(typeof require == 'function'){
	var XMLReader = require('./sax').XMLReader;
	var DOMImplementation = exports.DOMImplementation = require('./dom').DOMImplementation;
	exports.XMLSerializer = require('./dom').XMLSerializer ;
	exports.DOMParser = DOMParser;
	exports.isNode = require('./dom').isNode ;
}

},{"./dom":"/forsetup/js/core/xmldom/dom.js","./sax":"/forsetup/js/core/xmldom/sax.js"}],"xpath":[function(require,module,exports){
/*
 * xpath.js
 *
 * An XPath 1.0 library for JavaScript.
 *
 * Cameron McCormack <cam (at) mcc.id.au>
 *
 * This work is licensed under the Creative Commons Attribution-ShareAlike
 * License. To view a copy of this license, visit
 * 
 *   http://creativecommons.org/licenses/by-sa/2.0/
 *
 * or send a letter to Creative Commons, 559 Nathan Abbott Way, Stanford,
 * California 94305, USA.
 *
 * Revision 20: April 26, 2011
 *   Fixed a typo resulting in FIRST_ORDERED_NODE_TYPE results being wrong,
 *   thanks to <shi_a009 (at) hotmail.com>.
 *
 * Revision 19: November 29, 2005
 *   Nodesets now store their nodes in a height balanced tree, increasing
 *   performance for the common case of selecting nodes in document order,
 *   thanks to Sébastien Cramatte <contact (at) zeninteractif.com>.
 *   AVL tree code adapted from Raimund Neumann <rnova (at) gmx.net>.
 *
 * Revision 18: October 27, 2005
 *   DOM 3 XPath support.  Caveats:
 *     - namespace prefixes aren't resolved in XPathEvaluator.createExpression,
 *       but in XPathExpression.evaluate.
 *     - XPathResult.invalidIteratorState is not implemented.
 *
 * Revision 17: October 25, 2005
 *   Some core XPath function fixes and a patch to avoid crashing certain
 *   versions of MSXML in PathExpr.prototype.getOwnerElement, thanks to
 *   Sébastien Cramatte <contact (at) zeninteractif.com>.
 *
 * Revision 16: September 22, 2005
 *   Workarounds for some IE 5.5 deficiencies.
 *   Fixed problem with prefix node tests on attribute nodes.
 *
 * Revision 15: May 21, 2005
 *   Fixed problem with QName node tests on elements with an xmlns="...".
 *
 * Revision 14: May 19, 2005
 *   Fixed QName node tests on attribute node regression.
 *
 * Revision 13: May 3, 2005
 *   Node tests are case insensitive now if working in an HTML DOM.
 *
 * Revision 12: April 26, 2005
 *   Updated licence.  Slight code changes to enable use of Dean
 *   Edwards' script compression, http://dean.edwards.name/packer/ .
 *
 * Revision 11: April 23, 2005
 *   Fixed bug with 'and' and 'or' operators, fix thanks to
 *   Sandy McArthur <sandy (at) mcarthur.org>.
 *
 * Revision 10: April 15, 2005
 *   Added support for a virtual root node, supposedly helpful for
 *   implementing XForms.  Fixed problem with QName node tests and
 *   the parent axis.
 *
 * Revision 9: March 17, 2005
 *   Namespace resolver tweaked so using the document node as the context
 *   for namespace lookups is equivalent to using the document element.
 *
 * Revision 8: February 13, 2005
 *   Handle implicit declaration of 'xmlns' namespace prefix.
 *   Fixed bug when comparing nodesets.
 *   Instance data can now be associated with a FunctionResolver, and
 *     workaround for MSXML not supporting 'localName' and 'getElementById',
 *     thanks to Grant Gongaware.
 *   Fix a few problems when the context node is the root node.
 *   
 * Revision 7: February 11, 2005
 *   Default namespace resolver fix from Grant Gongaware
 *   <grant (at) gongaware.com>.
 *
 * Revision 6: February 10, 2005
 *   Fixed bug in 'number' function.
 *
 * Revision 5: February 9, 2005
 *   Fixed bug where text nodes not getting converted to string values.
 *
 * Revision 4: January 21, 2005
 *   Bug in 'name' function, fix thanks to Bill Edney.
 *   Fixed incorrect processing of namespace nodes.
 *   Fixed NamespaceResolver to resolve 'xml' namespace.
 *   Implemented union '|' operator.
 *
 * Revision 3: January 14, 2005
 *   Fixed bug with nodeset comparisons, bug lexing < and >.
 *
 * Revision 2: October 26, 2004
 *   QName node test namespace handling fixed.  Few other bug fixes.
 *   
 * Revision 1: August 13, 2004
 *   Bug fixes from William J. Edney <bedney (at) technicalpursuit.com>.
 *   Added minimal licence.
 *
 * Initial version: June 14, 2004
 */

// XPathParser ///////////////////////////////////////////////////////////////

XPathParser.prototype = new Object();
XPathParser.prototype.constructor = XPathParser;
XPathParser.superclass = Object.prototype;

function XPathParser() {
	this.init();
}

XPathParser.prototype.init = function() {
	this.reduceActions = [];

	this.reduceActions[3] = function(rhs) {
		return new OrOperation(rhs[0], rhs[2]);
	};
	this.reduceActions[5] = function(rhs) {
		return new AndOperation(rhs[0], rhs[2]);
	};
	this.reduceActions[7] = function(rhs) {
		return new EqualsOperation(rhs[0], rhs[2]);
	};
	this.reduceActions[8] = function(rhs) {
		return new NotEqualOperation(rhs[0], rhs[2]);
	};
	this.reduceActions[10] = function(rhs) {
		return new LessThanOperation(rhs[0], rhs[2]);
	};
	this.reduceActions[11] = function(rhs) {
		return new GreaterThanOperation(rhs[0], rhs[2]);
	};
	this.reduceActions[12] = function(rhs) {
		return new LessThanOrEqualOperation(rhs[0], rhs[2]);
	};
	this.reduceActions[13] = function(rhs) {
		return new GreaterThanOrEqualOperation(rhs[0], rhs[2]);
	};
	this.reduceActions[15] = function(rhs) {
		return new PlusOperation(rhs[0], rhs[2]);
	};
	this.reduceActions[16] = function(rhs) {
		return new MinusOperation(rhs[0], rhs[2]);
	};
	this.reduceActions[18] = function(rhs) {
		return new MultiplyOperation(rhs[0], rhs[2]);
	};
	this.reduceActions[19] = function(rhs) {
		return new DivOperation(rhs[0], rhs[2]);
	};
	this.reduceActions[20] = function(rhs) {
		return new ModOperation(rhs[0], rhs[2]);
	};
	this.reduceActions[22] = function(rhs) {
		return new UnaryMinusOperation(rhs[1]);
	};
	this.reduceActions[24] = function(rhs) {
		return new BarOperation(rhs[0], rhs[2]);
	};
	this.reduceActions[25] = function(rhs) {
		return new PathExpr(undefined, undefined, rhs[0]);
	};
	this.reduceActions[27] = function(rhs) {
		rhs[0].locationPath = rhs[2];
		return rhs[0];
	};
	this.reduceActions[28] = function(rhs) {
		rhs[0].locationPath = rhs[2];
		rhs[0].locationPath.steps.unshift(new Step(Step.DESCENDANTORSELF, new NodeTest(NodeTest.NODE, undefined), []));
		return rhs[0];
	};
	this.reduceActions[29] = function(rhs) {
		return new PathExpr(rhs[0], [], undefined);
	};
	this.reduceActions[30] = function(rhs) {
		if (Utilities.instance_of(rhs[0], PathExpr)) {
			if (rhs[0].filterPredicates == undefined) {
				rhs[0].filterPredicates = [];
			}
			rhs[0].filterPredicates.push(rhs[1]);
			return rhs[0];
		} else {
			return new PathExpr(rhs[0], [rhs[1]], undefined);
		}
	};
	this.reduceActions[32] = function(rhs) {
		return rhs[1];
	};
	this.reduceActions[33] = function(rhs) {
		return new XString(rhs[0]);
	};
	this.reduceActions[34] = function(rhs) {
		return new XNumber(rhs[0]);
	};
	this.reduceActions[36] = function(rhs) {
		return new FunctionCall(rhs[0], []);
	};
	this.reduceActions[37] = function(rhs) {
		return new FunctionCall(rhs[0], rhs[2]);
	};
	this.reduceActions[38] = function(rhs) {
		return [ rhs[0] ];
	};
	this.reduceActions[39] = function(rhs) {
		rhs[2].unshift(rhs[0]);
		return rhs[2];
	};
	this.reduceActions[43] = function(rhs) {
		return new LocationPath(true, []);
	};
	this.reduceActions[44] = function(rhs) {
		rhs[1].absolute = true;
		return rhs[1];
	};
	this.reduceActions[46] = function(rhs) {
		return new LocationPath(false, [ rhs[0] ]);
	};
	this.reduceActions[47] = function(rhs) {
		rhs[0].steps.push(rhs[2]);
		return rhs[0];
	};
	this.reduceActions[49] = function(rhs) {
		return new Step(rhs[0], rhs[1], []);
	};
	this.reduceActions[50] = function(rhs) {
		return new Step(Step.CHILD, rhs[0], []);
	};
	this.reduceActions[51] = function(rhs) {
		return new Step(rhs[0], rhs[1], rhs[2]);
	};
	this.reduceActions[52] = function(rhs) {
		return new Step(Step.CHILD, rhs[0], rhs[1]);
	};
	this.reduceActions[54] = function(rhs) {
		return [ rhs[0] ];
	};
	this.reduceActions[55] = function(rhs) {
		rhs[1].unshift(rhs[0]);
		return rhs[1];
	};
	this.reduceActions[56] = function(rhs) {
		if (rhs[0] == "ancestor") {
			return Step.ANCESTOR;
		} else if (rhs[0] == "ancestor-or-self") {
			return Step.ANCESTORORSELF;
		} else if (rhs[0] == "attribute") {
			return Step.ATTRIBUTE;
		} else if (rhs[0] == "child") {
			return Step.CHILD;
		} else if (rhs[0] == "descendant") {
			return Step.DESCENDANT;
		} else if (rhs[0] == "descendant-or-self") {
			return Step.DESCENDANTORSELF;
		} else if (rhs[0] == "following") {
			return Step.FOLLOWING;
		} else if (rhs[0] == "following-sibling") {
			return Step.FOLLOWINGSIBLING;
		} else if (rhs[0] == "namespace") {
			return Step.NAMESPACE;
		} else if (rhs[0] == "parent") {
			return Step.PARENT;
		} else if (rhs[0] == "preceding") {
			return Step.PRECEDING;
		} else if (rhs[0] == "preceding-sibling") {
			return Step.PRECEDINGSIBLING;
		} else if (rhs[0] == "self") {
			return Step.SELF;
		}
		return -1;
	};
	this.reduceActions[57] = function(rhs) {
		return Step.ATTRIBUTE;
	};
	this.reduceActions[59] = function(rhs) {
		if (rhs[0] == "comment") {
			return new NodeTest(NodeTest.COMMENT, undefined);
		} else if (rhs[0] == "text") {
			return new NodeTest(NodeTest.TEXT, undefined);
		} else if (rhs[0] == "processing-instruction") {
			return new NodeTest(NodeTest.PI, undefined);
		} else if (rhs[0] == "node") {
			return new NodeTest(NodeTest.NODE, undefined);
		}
		return new NodeTest(-1, undefined);
	};
	this.reduceActions[60] = function(rhs) {
		return new NodeTest(NodeTest.PI, rhs[2]);
	};
	this.reduceActions[61] = function(rhs) {
		return rhs[1];
	};
	this.reduceActions[63] = function(rhs) {
		rhs[1].absolute = true;
		rhs[1].steps.unshift(new Step(Step.DESCENDANTORSELF, new NodeTest(NodeTest.NODE, undefined), []));
		return rhs[1];
	};
	this.reduceActions[64] = function(rhs) {
		rhs[0].steps.push(new Step(Step.DESCENDANTORSELF, new NodeTest(NodeTest.NODE, undefined), []));
		rhs[0].steps.push(rhs[2]);
		return rhs[0];
	};
	this.reduceActions[65] = function(rhs) {
		return new Step(Step.SELF, new NodeTest(NodeTest.NODE, undefined), []);
	};
	this.reduceActions[66] = function(rhs) {
		return new Step(Step.PARENT, new NodeTest(NodeTest.NODE, undefined), []);
	};
	this.reduceActions[67] = function(rhs) {
		return new VariableReference(rhs[1]);
	};
	this.reduceActions[68] = function(rhs) {
		return new NodeTest(NodeTest.NAMETESTANY, undefined);
	};
	this.reduceActions[69] = function(rhs) {
		var prefix = rhs[0].substring(0, rhs[0].indexOf(":"));
		return new NodeTest(NodeTest.NAMETESTPREFIXANY, prefix);
	};
	this.reduceActions[70] = function(rhs) {
		return new NodeTest(NodeTest.NAMETESTQNAME, rhs[0]);
	};
};

XPathParser.actionTable = [
	" s s        sssssssss    s ss  s  ss",
	"                 s                  ",
	"r  rrrrrrrrr         rrrrrrr rr  r  ",
	"                rrrrr               ",
	" s s        sssssssss    s ss  s  ss",
	"rs  rrrrrrrr s  sssssrrrrrr  rrs rs ",
	" s s        sssssssss    s ss  s  ss",
	"                            s       ",
	"                            s       ",
	"r  rrrrrrrrr         rrrrrrr rr rr  ",
	"r  rrrrrrrrr         rrrrrrr rr rr  ",
	"r  rrrrrrrrr         rrrrrrr rr rr  ",
	"r  rrrrrrrrr         rrrrrrr rr rr  ",
	"r  rrrrrrrrr         rrrrrrr rr rr  ",
	"  s                                 ",
	"                            s       ",
	" s           s  sssss          s  s ",
	"r  rrrrrrrrr         rrrrrrr rr  r  ",
	"a                                   ",
	"r       s                    rr  r  ",
	"r      sr                    rr  r  ",
	"r   s  rr            s       rr  r  ",
	"r   rssrr            rss     rr  r  ",
	"r   rrrrr            rrrss   rr  r  ",
	"r   rrrrrsss         rrrrr   rr  r  ",
	"r   rrrrrrrr         rrrrr   rr  r  ",
	"r   rrrrrrrr         rrrrrs  rr  r  ",
	"r   rrrrrrrr         rrrrrr  rr  r  ",
	"r   rrrrrrrr         rrrrrr  rr  r  ",
	"r  srrrrrrrr         rrrrrrs rr sr  ",
	"r  srrrrrrrr         rrrrrrs rr  r  ",
	"r  rrrrrrrrr         rrrrrrr rr rr  ",
	"r  rrrrrrrrr         rrrrrrr rr rr  ",
	"r  rrrrrrrrr         rrrrrrr rr rr  ",
	"r   rrrrrrrr         rrrrrr  rr  r  ",
	"r   rrrrrrrr         rrrrrr  rr  r  ",
	"r  rrrrrrrrr         rrrrrrr rr  r  ",
	"r  rrrrrrrrr         rrrrrrr rr  r  ",
	"                sssss               ",
	"r  rrrrrrrrr         rrrrrrr rr sr  ",
	"r  rrrrrrrrr         rrrrrrr rr  r  ",
	"r  rrrrrrrrr         rrrrrrr rr rr  ",
	"r  rrrrrrrrr         rrrrrrr rr rr  ",
	"                             s      ",
	"r  srrrrrrrr         rrrrrrs rr  r  ",
	"r   rrrrrrrr         rrrrr   rr  r  ",
	"              s                     ",
	"                             s      ",
	"                rrrrr               ",
	" s s        sssssssss    s sss s  ss",
	"r  srrrrrrrr         rrrrrrs rr  r  ",
	" s s        sssssssss    s ss  s  ss",
	" s s        sssssssss    s ss  s  ss",
	" s s        sssssssss    s ss  s  ss",
	" s s        sssssssss    s ss  s  ss",
	" s s        sssssssss    s ss  s  ss",
	" s s        sssssssss    s ss  s  ss",
	" s s        sssssssss    s ss  s  ss",
	" s s        sssssssss    s ss  s  ss",
	" s s        sssssssss    s ss  s  ss",
	" s s        sssssssss    s ss  s  ss",
	" s s        sssssssss    s ss  s  ss",
	" s s        sssssssss    s ss  s  ss",
	" s s        sssssssss    s ss  s  ss",
	" s s        sssssssss      ss  s  ss",
	" s s        sssssssss    s ss  s  ss",
	" s           s  sssss          s  s ",
	" s           s  sssss          s  s ",
	"r  rrrrrrrrr         rrrrrrr rr rr  ",
	" s           s  sssss          s  s ",
	" s           s  sssss          s  s ",
	"r  rrrrrrrrr         rrrrrrr rr sr  ",
	"r  rrrrrrrrr         rrrrrrr rr sr  ",
	"r  rrrrrrrrr         rrrrrrr rr  r  ",
	"r  rrrrrrrrr         rrrrrrr rr rr  ",
	"                             s      ",
	"r  rrrrrrrrr         rrrrrrr rr rr  ",
	"r  rrrrrrrrr         rrrrrrr rr rr  ",
	"                             rr     ",
	"                             s      ",
	"                             rs     ",
	"r      sr                    rr  r  ",
	"r   s  rr            s       rr  r  ",
	"r   rssrr            rss     rr  r  ",
	"r   rssrr            rss     rr  r  ",
	"r   rrrrr            rrrss   rr  r  ",
	"r   rrrrr            rrrss   rr  r  ",
	"r   rrrrr            rrrss   rr  r  ",
	"r   rrrrr            rrrss   rr  r  ",
	"r   rrrrrsss         rrrrr   rr  r  ",
	"r   rrrrrsss         rrrrr   rr  r  ",
	"r   rrrrrrrr         rrrrr   rr  r  ",
	"r   rrrrrrrr         rrrrr   rr  r  ",
	"r   rrrrrrrr         rrrrr   rr  r  ",
	"r   rrrrrrrr         rrrrrr  rr  r  ",
	"                                 r  ",
	"                                 s  ",
	"r  srrrrrrrr         rrrrrrs rr  r  ",
	"r  srrrrrrrr         rrrrrrs rr  r  ",
	"r  rrrrrrrrr         rrrrrrr rr  r  ",
	"r  rrrrrrrrr         rrrrrrr rr  r  ",
	"r  rrrrrrrrr         rrrrrrr rr  r  ",
	"r  rrrrrrrrr         rrrrrrr rr  r  ",
	"r  rrrrrrrrr         rrrrrrr rr rr  ",
	"r  rrrrrrrrr         rrrrrrr rr rr  ",
	" s s        sssssssss    s ss  s  ss",
	"r  rrrrrrrrr         rrrrrrr rr rr  ",
	"                             r      "
];

XPathParser.actionTableNumber = [
	" 1 0        /.-,+*)('    & %$  #  \"!",
	"                 J                  ",
	"a  aaaaaaaaa         aaaaaaa aa  a  ",
	"                YYYYY               ",
	" 1 0        /.-,+*)('    & %$  #  \"!",
	"K1  KKKKKKKK .  +*)('KKKKKK  KK# K\" ",
	" 1 0        /.-,+*)('    & %$  #  \"!",
	"                            N       ",
	"                            O       ",
	"e  eeeeeeeee         eeeeeee ee ee  ",
	"f  fffffffff         fffffff ff ff  ",
	"d  ddddddddd         ddddddd dd dd  ",
	"B  BBBBBBBBB         BBBBBBB BB BB  ",
	"A  AAAAAAAAA         AAAAAAA AA AA  ",
	"  P                                 ",
	"                            Q       ",
	" 1           .  +*)('          #  \" ",
	"b  bbbbbbbbb         bbbbbbb bb  b  ",
	"                                    ",
	"!       S                    !!  !  ",
	"\"      T\"                    \"\"  \"  ",
	"$   V  $$            U       $$  $  ",
	"&   &ZY&&            &XW     &&  &  ",
	")   )))))            )))\\[   ))  )  ",
	".   ....._^]         .....   ..  .  ",
	"1   11111111         11111   11  1  ",
	"5   55555555         55555`  55  5  ",
	"7   77777777         777777  77  7  ",
	"9   99999999         999999  99  9  ",
	":  c::::::::         ::::::b :: a:  ",
	"I  fIIIIIIII         IIIIIIe II  I  ",
	"=  =========         ======= == ==  ",
	"?  ?????????         ??????? ?? ??  ",
	"C  CCCCCCCCC         CCCCCCC CC CC  ",
	"J   JJJJJJJJ         JJJJJJ  JJ  J  ",
	"M   MMMMMMMM         MMMMMM  MM  M  ",
	"N  NNNNNNNNN         NNNNNNN NN  N  ",
	"P  PPPPPPPPP         PPPPPPP PP  P  ",
	"                +*)('               ",
	"R  RRRRRRRRR         RRRRRRR RR aR  ",
	"U  UUUUUUUUU         UUUUUUU UU  U  ",
	"Z  ZZZZZZZZZ         ZZZZZZZ ZZ ZZ  ",
	"c  ccccccccc         ccccccc cc cc  ",
	"                             j      ",
	"L  fLLLLLLLL         LLLLLLe LL  L  ",
	"6   66666666         66666   66  6  ",
	"              k                     ",
	"                             l      ",
	"                XXXXX               ",
	" 1 0        /.-,+*)('    & %$m #  \"!",
	"_  f________         ______e __  _  ",
	" 1 0        /.-,+*)('    & %$  #  \"!",
	" 1 0        /.-,+*)('    & %$  #  \"!",
	" 1 0        /.-,+*)('    & %$  #  \"!",
	" 1 0        /.-,+*)('    & %$  #  \"!",
	" 1 0        /.-,+*)('    & %$  #  \"!",
	" 1 0        /.-,+*)('    & %$  #  \"!",
	" 1 0        /.-,+*)('    & %$  #  \"!",
	" 1 0        /.-,+*)('    & %$  #  \"!",
	" 1 0        /.-,+*)('    & %$  #  \"!",
	" 1 0        /.-,+*)('    & %$  #  \"!",
	" 1 0        /.-,+*)('    & %$  #  \"!",
	" 1 0        /.-,+*)('    & %$  #  \"!",
	" 1 0        /.-,+*)('    & %$  #  \"!",
	" 1 0        /.-,+*)('      %$  #  \"!",
	" 1 0        /.-,+*)('    & %$  #  \"!",
	" 1           .  +*)('          #  \" ",
	" 1           .  +*)('          #  \" ",
	">  >>>>>>>>>         >>>>>>> >> >>  ",
	" 1           .  +*)('          #  \" ",
	" 1           .  +*)('          #  \" ",
	"Q  QQQQQQQQQ         QQQQQQQ QQ aQ  ",
	"V  VVVVVVVVV         VVVVVVV VV aV  ",
	"T  TTTTTTTTT         TTTTTTT TT  T  ",
	"@  @@@@@@@@@         @@@@@@@ @@ @@  ",
	"                             \x87      ",
	"[  [[[[[[[[[         [[[[[[[ [[ [[  ",
	"D  DDDDDDDDD         DDDDDDD DD DD  ",
	"                             HH     ",
	"                             \x88      ",
	"                             F\x89     ",
	"#      T#                    ##  #  ",
	"%   V  %%            U       %%  %  ",
	"'   'ZY''            'XW     ''  '  ",
	"(   (ZY((            (XW     ((  (  ",
	"+   +++++            +++\\[   ++  +  ",
	"*   *****            ***\\[   **  *  ",
	"-   -----            ---\\[   --  -  ",
	",   ,,,,,            ,,,\\[   ,,  ,  ",
	"0   00000_^]         00000   00  0  ",
	"/   /////_^]         /////   //  /  ",
	"2   22222222         22222   22  2  ",
	"3   33333333         33333   33  3  ",
	"4   44444444         44444   44  4  ",
	"8   88888888         888888  88  8  ",
	"                                 ^  ",
	"                                 \x8a  ",
	";  f;;;;;;;;         ;;;;;;e ;;  ;  ",
	"<  f<<<<<<<<         <<<<<<e <<  <  ",
	"O  OOOOOOOOO         OOOOOOO OO  O  ",
	"`  `````````         ``````` ``  `  ",
	"S  SSSSSSSSS         SSSSSSS SS  S  ",
	"W  WWWWWWWWW         WWWWWWW WW  W  ",
	"\\  \\\\\\\\\\\\\\\\\\         \\\\\\\\\\\\\\ \\\\ \\\\  ",
	"E  EEEEEEEEE         EEEEEEE EE EE  ",
	" 1 0        /.-,+*)('    & %$  #  \"!",
	"]  ]]]]]]]]]         ]]]]]]] ]] ]]  ",
	"                             G      "
];

XPathParser.gotoTable = [
	"3456789:;<=>?@ AB  CDEFGH IJ ",
	"                             ",
	"                             ",
	"                             ",
	"L456789:;<=>?@ AB  CDEFGH IJ ",
	"            M        EFGH IJ ",
	"       N;<=>?@ AB  CDEFGH IJ ",
	"                             ",
	"                             ",
	"                             ",
	"                             ",
	"                             ",
	"                             ",
	"                             ",
	"                             ",
	"                             ",
	"            S        EFGH IJ ",
	"                             ",
	"                             ",
	"                             ",
	"                             ",
	"                             ",
	"                             ",
	"                             ",
	"                             ",
	"                             ",
	"                             ",
	"                             ",
	"                             ",
	"              e              ",
	"                             ",
	"                             ",
	"                             ",
	"                             ",
	"                             ",
	"                             ",
	"                             ",
	"                             ",
	"                        h  J ",
	"              i          j   ",
	"                             ",
	"                             ",
	"                             ",
	"                             ",
	"                             ",
	"                             ",
	"                             ",
	"                             ",
	"                             ",
	"o456789:;<=>?@ ABpqCDEFGH IJ ",
	"                             ",
	"  r6789:;<=>?@ AB  CDEFGH IJ ",
	"   s789:;<=>?@ AB  CDEFGH IJ ",
	"    t89:;<=>?@ AB  CDEFGH IJ ",
	"    u89:;<=>?@ AB  CDEFGH IJ ",
	"     v9:;<=>?@ AB  CDEFGH IJ ",
	"     w9:;<=>?@ AB  CDEFGH IJ ",
	"     x9:;<=>?@ AB  CDEFGH IJ ",
	"     y9:;<=>?@ AB  CDEFGH IJ ",
	"      z:;<=>?@ AB  CDEFGH IJ ",
	"      {:;<=>?@ AB  CDEFGH IJ ",
	"       |;<=>?@ AB  CDEFGH IJ ",
	"       };<=>?@ AB  CDEFGH IJ ",
	"       ~;<=>?@ AB  CDEFGH IJ ",
	"         \x7f=>?@ AB  CDEFGH IJ ",
	"\x80456789:;<=>?@ AB  CDEFGH IJ\x81",
	"            \x82        EFGH IJ ",
	"            \x83        EFGH IJ ",
	"                             ",
	"                     \x84 GH IJ ",
	"                     \x85 GH IJ ",
	"              i          \x86   ",
	"              i          \x87   ",
	"                             ",
	"                             ",
	"                             ",
	"                             ",
	"                             ",
	"                             ",
	"                             ",
	"                             ",
	"                             ",
	"                             ",
	"                             ",
	"                             ",
	"                             ",
	"                             ",
	"                             ",
	"                             ",
	"                             ",
	"                             ",
	"                             ",
	"                             ",
	"                             ",
	"                             ",
	"                             ",
	"                             ",
	"                             ",
	"                             ",
	"                             ",
	"                             ",
	"                             ",
	"                             ",
	"                             ",
	"                             ",
	"o456789:;<=>?@ AB\x8cqCDEFGH IJ ",
	"                             ",
	"                             "
];

XPathParser.productions = [
	[1, 1, 2],
	[2, 1, 3],
	[3, 1, 4],
	[3, 3, 3, -9, 4],
	[4, 1, 5],
	[4, 3, 4, -8, 5],
	[5, 1, 6],
	[5, 3, 5, -22, 6],
	[5, 3, 5, -5, 6],
	[6, 1, 7],
	[6, 3, 6, -23, 7],
	[6, 3, 6, -24, 7],
	[6, 3, 6, -6, 7],
	[6, 3, 6, -7, 7],
	[7, 1, 8],
	[7, 3, 7, -25, 8],
	[7, 3, 7, -26, 8],
	[8, 1, 9],
	[8, 3, 8, -12, 9],
	[8, 3, 8, -11, 9],
	[8, 3, 8, -10, 9],
	[9, 1, 10],
	[9, 2, -26, 9],
	[10, 1, 11],
	[10, 3, 10, -27, 11],
	[11, 1, 12],
	[11, 1, 13],
	[11, 3, 13, -28, 14],
	[11, 3, 13, -4, 14],
	[13, 1, 15],
	[13, 2, 13, 16],
	[15, 1, 17],
	[15, 3, -29, 2, -30],
	[15, 1, -15],
	[15, 1, -16],
	[15, 1, 18],
	[18, 3, -13, -29, -30],
	[18, 4, -13, -29, 19, -30],
	[19, 1, 20],
	[19, 3, 20, -31, 19],
	[20, 1, 2],
	[12, 1, 14],
	[12, 1, 21],
	[21, 1, -28],
	[21, 2, -28, 14],
	[21, 1, 22],
	[14, 1, 23],
	[14, 3, 14, -28, 23],
	[14, 1, 24],
	[23, 2, 25, 26],
	[23, 1, 26],
	[23, 3, 25, 26, 27],
	[23, 2, 26, 27],
	[23, 1, 28],
	[27, 1, 16],
	[27, 2, 16, 27],
	[25, 2, -14, -3],
	[25, 1, -32],
	[26, 1, 29],
	[26, 3, -20, -29, -30],
	[26, 4, -21, -29, -15, -30],
	[16, 3, -33, 30, -34],
	[30, 1, 2],
	[22, 2, -4, 14],
	[24, 3, 14, -4, 23],
	[28, 1, -35],
	[28, 1, -2],
	[17, 2, -36, -18],
	[29, 1, -17],
	[29, 1, -19],
	[29, 1, -18]
];

XPathParser.DOUBLEDOT = 2;
XPathParser.DOUBLECOLON = 3;
XPathParser.DOUBLESLASH = 4;
XPathParser.NOTEQUAL = 5;
XPathParser.LESSTHANOREQUAL = 6;
XPathParser.GREATERTHANOREQUAL = 7;
XPathParser.AND = 8;
XPathParser.OR = 9;
XPathParser.MOD = 10;
XPathParser.DIV = 11;
XPathParser.MULTIPLYOPERATOR = 12;
XPathParser.FUNCTIONNAME = 13;
XPathParser.AXISNAME = 14;
XPathParser.LITERAL = 15;
XPathParser.NUMBER = 16;
XPathParser.ASTERISKNAMETEST = 17;
XPathParser.QNAME = 18;
XPathParser.NCNAMECOLONASTERISK = 19;
XPathParser.NODETYPE = 20;
XPathParser.PROCESSINGINSTRUCTIONWITHLITERAL = 21;
XPathParser.EQUALS = 22;
XPathParser.LESSTHAN = 23;
XPathParser.GREATERTHAN = 24;
XPathParser.PLUS = 25;
XPathParser.MINUS = 26;
XPathParser.BAR = 27;
XPathParser.SLASH = 28;
XPathParser.LEFTPARENTHESIS = 29;
XPathParser.RIGHTPARENTHESIS = 30;
XPathParser.COMMA = 31;
XPathParser.AT = 32;
XPathParser.LEFTBRACKET = 33;
XPathParser.RIGHTBRACKET = 34;
XPathParser.DOT = 35;
XPathParser.DOLLAR = 36;

XPathParser.prototype.tokenize = function(s1) {
	var types = [];
	var values = [];
	var s = s1 + '\0';

	var pos = 0;
	var c = s.charAt(pos++);
	while (1) {
		while (c == ' ' || c == '\t' || c == '\r' || c == '\n') {
			c = s.charAt(pos++);
		}
		if (c == '\0' || pos >= s.length) {
			break;
		}

		if (c == '(') {
			types.push(XPathParser.LEFTPARENTHESIS);
			values.push(c);
			c = s.charAt(pos++);
			continue;
		}
		if (c == ')') {
			types.push(XPathParser.RIGHTPARENTHESIS);
			values.push(c);
			c = s.charAt(pos++);
			continue;
		}
		if (c == '[') {
			types.push(XPathParser.LEFTBRACKET);
			values.push(c);
			c = s.charAt(pos++);
			continue;
		}
		if (c == ']') {
			types.push(XPathParser.RIGHTBRACKET);
			values.push(c);
			c = s.charAt(pos++);
			continue;
		}
		if (c == '@') {
			types.push(XPathParser.AT);
			values.push(c);
			c = s.charAt(pos++);
			continue;
		}
		if (c == ',') {
			types.push(XPathParser.COMMA);
			values.push(c);
			c = s.charAt(pos++);
			continue;
		}
		if (c == '|') {
			types.push(XPathParser.BAR);
			values.push(c);
			c = s.charAt(pos++);
			continue;
		}
		if (c == '+') {
			types.push(XPathParser.PLUS);
			values.push(c);
			c = s.charAt(pos++);
			continue;
		}
		if (c == '-') {
			types.push(XPathParser.MINUS);
			values.push(c);
			c = s.charAt(pos++);
			continue;
		}
		if (c == '=') {
			types.push(XPathParser.EQUALS);
			values.push(c);
			c = s.charAt(pos++);
			continue;
		}
		if (c == '$') {
			types.push(XPathParser.DOLLAR);
			values.push(c);
			c = s.charAt(pos++);
			continue;
		}
		
		if (c == '.') {
			c = s.charAt(pos++);
			if (c == '.') {
				types.push(XPathParser.DOUBLEDOT);
				values.push("..");
				c = s.charAt(pos++);
				continue;
			}
			if (c >= '0' && c <= '9') {
				var number = "." + c;
				c = s.charAt(pos++);
				while (c >= '0' && c <= '9') {
					number += c;
					c = s.charAt(pos++);
				}
				types.push(XPathParser.NUMBER);
				values.push(number);
				continue;
			}
			types.push(XPathParser.DOT);
			values.push('.');
			continue;
		}

		if (c == '\'' || c == '"') {
			var delimiter = c;
			var literal = "";
			while ((c = s.charAt(pos++)) != delimiter) {
				literal += c;
			}
			types.push(XPathParser.LITERAL);
			values.push(literal);
			c = s.charAt(pos++);
			continue;
		}

		if (c >= '0' && c <= '9') {
			var number = c;
			c = s.charAt(pos++);
			while (c >= '0' && c <= '9') {
				number += c;
				c = s.charAt(pos++);
			}
			if (c == '.') {
				if (s.charAt(pos) >= '0' && s.charAt(pos) <= '9') {
					number += c;
					number += s.charAt(pos++);
					c = s.charAt(pos++);
					while (c >= '0' && c <= '9') {
						number += c;
						c = s.charAt(pos++);
					}
				}
			}
			types.push(XPathParser.NUMBER);
			values.push(number);
			continue;
		}

		if (c == '*') {
			if (types.length > 0) {
				var last = types[types.length - 1];
				if (last != XPathParser.AT
						&& last != XPathParser.DOUBLECOLON
						&& last != XPathParser.LEFTPARENTHESIS
						&& last != XPathParser.LEFTBRACKET
						&& last != XPathParser.AND
						&& last != XPathParser.OR
						&& last != XPathParser.MOD
						&& last != XPathParser.DIV
						&& last != XPathParser.MULTIPLYOPERATOR
						&& last != XPathParser.SLASH
						&& last != XPathParser.DOUBLESLASH
						&& last != XPathParser.BAR
						&& last != XPathParser.PLUS
						&& last != XPathParser.MINUS
						&& last != XPathParser.EQUALS
						&& last != XPathParser.NOTEQUAL
						&& last != XPathParser.LESSTHAN
						&& last != XPathParser.LESSTHANOREQUAL
						&& last != XPathParser.GREATERTHAN
						&& last != XPathParser.GREATERTHANOREQUAL) {
					types.push(XPathParser.MULTIPLYOPERATOR);
					values.push(c);
					c = s.charAt(pos++);
					continue;
				}
			}
			types.push(XPathParser.ASTERISKNAMETEST);
			values.push(c);
			c = s.charAt(pos++);
			continue;
		}

		if (c == ':') {
			if (s.charAt(pos) == ':') {
				types.push(XPathParser.DOUBLECOLON);
				values.push("::");
				pos++;
				c = s.charAt(pos++);
				continue;
			}
		}

		if (c == '/') {
			c = s.charAt(pos++);
			if (c == '/') {
				types.push(XPathParser.DOUBLESLASH);
				values.push("//");
				c = s.charAt(pos++);
				continue;
			}
			types.push(XPathParser.SLASH);
			values.push('/');
			continue;
		}

		if (c == '!') {
			if (s.charAt(pos) == '=') {
				types.push(XPathParser.NOTEQUAL);
				values.push("!=");
				pos++;
				c = s.charAt(pos++);
				continue;
			}
		}

		if (c == '<') {
			if (s.charAt(pos) == '=') {
				types.push(XPathParser.LESSTHANOREQUAL);
				values.push("<=");
				pos++;
				c = s.charAt(pos++);
				continue;
			}
			types.push(XPathParser.LESSTHAN);
			values.push('<');
			c = s.charAt(pos++);
			continue;
		}

		if (c == '>') {
			if (s.charAt(pos) == '=') {
				types.push(XPathParser.GREATERTHANOREQUAL);
				values.push(">=");
				pos++;
				c = s.charAt(pos++);
				continue;
			}
			types.push(XPathParser.GREATERTHAN);
			values.push('>');
			c = s.charAt(pos++);
			continue;
		}

		if (c == '_' || Utilities.isLetter(c.charCodeAt(0))) {
			var name = c;
			c = s.charAt(pos++);
			while (Utilities.isNCNameChar(c.charCodeAt(0))) {
				name += c;
				c = s.charAt(pos++);
			}
			if (types.length > 0) {
				var last = types[types.length - 1];
				if (last != XPathParser.AT
						&& last != XPathParser.DOUBLECOLON
						&& last != XPathParser.LEFTPARENTHESIS
						&& last != XPathParser.LEFTBRACKET
						&& last != XPathParser.AND
						&& last != XPathParser.OR
						&& last != XPathParser.MOD
						&& last != XPathParser.DIV
						&& last != XPathParser.MULTIPLYOPERATOR
						&& last != XPathParser.SLASH
						&& last != XPathParser.DOUBLESLASH
						&& last != XPathParser.BAR
						&& last != XPathParser.PLUS
						&& last != XPathParser.MINUS
						&& last != XPathParser.EQUALS
						&& last != XPathParser.NOTEQUAL
						&& last != XPathParser.LESSTHAN
						&& last != XPathParser.LESSTHANOREQUAL
						&& last != XPathParser.GREATERTHAN
						&& last != XPathParser.GREATERTHANOREQUAL) {
					if (name == "and") {
						types.push(XPathParser.AND);
						values.push(name);
						continue;
					}
					if (name == "or") {
						types.push(XPathParser.OR);
						values.push(name);
						continue;
					}
					if (name == "mod") {
						types.push(XPathParser.MOD);
						values.push(name);
						continue;
					}
					if (name == "div") {
						types.push(XPathParser.DIV);
						values.push(name);
						continue;
					}
				}
			}
			if (c == ':') {
				if (s.charAt(pos) == '*') {
					types.push(XPathParser.NCNAMECOLONASTERISK);
					values.push(name + ":*");
					pos++;
					c = s.charAt(pos++);
					continue;
				}
				if (s.charAt(pos) == '_' || Utilities.isLetter(s.charCodeAt(pos))) {
					name += ':';
					c = s.charAt(pos++);
					while (Utilities.isNCNameChar(c.charCodeAt(0))) {
						name += c;
						c = s.charAt(pos++);
					}
					if (c == '(') {
						types.push(XPathParser.FUNCTIONNAME);
						values.push(name);
						continue;
					}
					types.push(XPathParser.QNAME);
					values.push(name);
					continue;
				}
				if (s.charAt(pos) == ':') {
					types.push(XPathParser.AXISNAME);
					values.push(name);
					continue;
				}
			}
			if (c == '(') {
				if (name == "comment" || name == "text" || name == "node") {
					types.push(XPathParser.NODETYPE);
					values.push(name);
					continue;
				}
				if (name == "processing-instruction") {
					if (s.charAt(pos) == ')') {
						types.push(XPathParser.NODETYPE);
					} else {
						types.push(XPathParser.PROCESSINGINSTRUCTIONWITHLITERAL);
					}
					values.push(name);
					continue;
				}
				types.push(XPathParser.FUNCTIONNAME);
				values.push(name);
				continue;
			}
			types.push(XPathParser.QNAME);
			values.push(name);
			continue;
		}

		throw new Error("Unexpected character " + c);
	}
	types.push(1);
	values.push("[EOF]");
	return [types, values];
};

XPathParser.SHIFT = 's';
XPathParser.REDUCE = 'r';
XPathParser.ACCEPT = 'a';

XPathParser.prototype.parse = function(s) {
	var types;
	var values;
	var res = this.tokenize(s);
	if (res == undefined) {
		return undefined;
	}
	types = res[0];
	values = res[1];
	var tokenPos = 0;
	var state = [];
	var tokenType = [];
	var tokenValue = [];
	var s;
	var a;
	var t;

	state.push(0);
	tokenType.push(1);
	tokenValue.push("_S");

	a = types[tokenPos];
	t = values[tokenPos++];
	while (1) {
		s = state[state.length - 1];
		switch (XPathParser.actionTable[s].charAt(a - 1)) {
			case XPathParser.SHIFT:
				tokenType.push(-a);
				tokenValue.push(t);
				state.push(XPathParser.actionTableNumber[s].charCodeAt(a - 1) - 32);
				a = types[tokenPos];
				t = values[tokenPos++];
				break;
			case XPathParser.REDUCE:
				var num = XPathParser.productions[XPathParser.actionTableNumber[s].charCodeAt(a - 1) - 32][1];
				var rhs = [];
				for (var i = 0; i < num; i++) {
					tokenType.pop();
					rhs.unshift(tokenValue.pop());
					state.pop();
				}
				var s_ = state[state.length - 1];
				tokenType.push(XPathParser.productions[XPathParser.actionTableNumber[s].charCodeAt(a - 1) - 32][0]);
				if (this.reduceActions[XPathParser.actionTableNumber[s].charCodeAt(a - 1) - 32] == undefined) {
					tokenValue.push(rhs[0]);
				} else {
					tokenValue.push(this.reduceActions[XPathParser.actionTableNumber[s].charCodeAt(a - 1) - 32](rhs));
				}
				state.push(XPathParser.gotoTable[s_].charCodeAt(XPathParser.productions[XPathParser.actionTableNumber[s].charCodeAt(a - 1) - 32][0] - 2) - 33);
				break;
			case XPathParser.ACCEPT:
				return new XPath(tokenValue.pop());
			default:
				throw new Error("XPath parse error");
		}
	}
};

// XPath /////////////////////////////////////////////////////////////////////

XPath.prototype = new Object();
XPath.prototype.constructor = XPath;
XPath.superclass = Object.prototype;

function XPath(e) {
	this.expression = e;
}

XPath.prototype.toString = function() {
	return this.expression.toString();
};

XPath.prototype.evaluate = function(c) {
	c.contextNode = c.expressionContextNode;
	c.contextSize = c.expressionContextSize;
	c.contextPosition = c.expressionContextPosition;
	c.caseInsensitive = false;
	if (c.contextNode != null) {
		var doc = c.contextNode;
		if (doc.nodeType != 9 /*Node.DOCUMENT_NODE*/) {
			doc = doc.ownerDocument;
		}
		try {
			c.caseInsensitive = doc.implementation.hasFeature("HTML", "2.0");
		} catch (e) {
			c.caseInsensitive = true;
		}
	}
	return this.expression.evaluate(c);
};

XPath.XML_NAMESPACE_URI = "http://www.w3.org/XML/1998/namespace";
XPath.XMLNS_NAMESPACE_URI = "http://www.w3.org/2000/xmlns/";

// Expression ////////////////////////////////////////////////////////////////

Expression.prototype = new Object();
Expression.prototype.constructor = Expression;
Expression.superclass = Object.prototype;

function Expression() {
}

Expression.prototype.init = function() {
};

Expression.prototype.toString = function() {
	return "<Expression>";
};

Expression.prototype.evaluate = function(c) {
	throw new Error("Could not evaluate expression.");
};

// UnaryOperation ////////////////////////////////////////////////////////////

UnaryOperation.prototype = new Expression();
UnaryOperation.prototype.constructor = UnaryOperation;
UnaryOperation.superclass = Expression.prototype;

function UnaryOperation(rhs) {
	if (arguments.length > 0) {
		this.init(rhs);
	}
}

UnaryOperation.prototype.init = function(rhs) {
	this.rhs = rhs;
};

// UnaryMinusOperation ///////////////////////////////////////////////////////

UnaryMinusOperation.prototype = new UnaryOperation();
UnaryMinusOperation.prototype.constructor = UnaryMinusOperation;
UnaryMinusOperation.superclass = UnaryOperation.prototype;

function UnaryMinusOperation(rhs) {
	if (arguments.length > 0) {
		this.init(rhs);
	}
}

UnaryMinusOperation.prototype.init = function(rhs) {
	UnaryMinusOperation.superclass.init.call(this, rhs);
};

UnaryMinusOperation.prototype.evaluate = function(c) {
	return this.rhs.evaluate(c).number().negate();
};

UnaryMinusOperation.prototype.toString = function() {
	return "-" + this.rhs.toString();
};

// BinaryOperation ///////////////////////////////////////////////////////////

BinaryOperation.prototype = new Expression();
BinaryOperation.prototype.constructor = BinaryOperation;
BinaryOperation.superclass = Expression.prototype;

function BinaryOperation(lhs, rhs) {
	if (arguments.length > 0) {
		this.init(lhs, rhs);
	}
}

BinaryOperation.prototype.init = function(lhs, rhs) {
	this.lhs = lhs;
	this.rhs = rhs;
};

// OrOperation ///////////////////////////////////////////////////////////////

OrOperation.prototype = new BinaryOperation();
OrOperation.prototype.constructor = OrOperation;
OrOperation.superclass = BinaryOperation.prototype;

function OrOperation(lhs, rhs) {
	if (arguments.length > 0) {
		this.init(lhs, rhs);
	}
}

OrOperation.prototype.init = function(lhs, rhs) {
	OrOperation.superclass.init.call(this, lhs, rhs);
};

OrOperation.prototype.toString = function() {
	return "(" + this.lhs.toString() + " or " + this.rhs.toString() + ")";
};

OrOperation.prototype.evaluate = function(c) {
	var b = this.lhs.evaluate(c).bool();
	if (b.booleanValue()) {
		return b;
	}
	return this.rhs.evaluate(c).bool();
};

// AndOperation //////////////////////////////////////////////////////////////

AndOperation.prototype = new BinaryOperation();
AndOperation.prototype.constructor = AndOperation;
AndOperation.superclass = BinaryOperation.prototype;

function AndOperation(lhs, rhs) {
	if (arguments.length > 0) {
		this.init(lhs, rhs);
	}
}

AndOperation.prototype.init = function(lhs, rhs) {
	AndOperation.superclass.init.call(this, lhs, rhs);
};

AndOperation.prototype.toString = function() {
	return "(" + this.lhs.toString() + " and " + this.rhs.toString() + ")";
};

AndOperation.prototype.evaluate = function(c) {
	var b = this.lhs.evaluate(c).bool();
	if (!b.booleanValue()) {
		return b;
	}
	return this.rhs.evaluate(c).bool();
};

// EqualsOperation ///////////////////////////////////////////////////////////

EqualsOperation.prototype = new BinaryOperation();
EqualsOperation.prototype.constructor = EqualsOperation;
EqualsOperation.superclass = BinaryOperation.prototype;

function EqualsOperation(lhs, rhs) {
	if (arguments.length > 0) {
		this.init(lhs, rhs);
	}
}

EqualsOperation.prototype.init = function(lhs, rhs) {
	EqualsOperation.superclass.init.call(this, lhs, rhs);
};

EqualsOperation.prototype.toString = function() {
	return "(" + this.lhs.toString() + " = " + this.rhs.toString() + ")";
};

EqualsOperation.prototype.evaluate = function(c) {
	return this.lhs.evaluate(c).equals(this.rhs.evaluate(c));
};

// NotEqualOperation /////////////////////////////////////////////////////////

NotEqualOperation.prototype = new BinaryOperation();
NotEqualOperation.prototype.constructor = NotEqualOperation;
NotEqualOperation.superclass = BinaryOperation.prototype;

function NotEqualOperation(lhs, rhs) {
	if (arguments.length > 0) {
		this.init(lhs, rhs);
	}
}

NotEqualOperation.prototype.init = function(lhs, rhs) {
	NotEqualOperation.superclass.init.call(this, lhs, rhs);
};

NotEqualOperation.prototype.toString = function() {
	return "(" + this.lhs.toString() + " != " + this.rhs.toString() + ")";
};

NotEqualOperation.prototype.evaluate = function(c) {
	return this.lhs.evaluate(c).notequal(this.rhs.evaluate(c));
};

// LessThanOperation /////////////////////////////////////////////////////////

LessThanOperation.prototype = new BinaryOperation();
LessThanOperation.prototype.constructor = LessThanOperation;
LessThanOperation.superclass = BinaryOperation.prototype;

function LessThanOperation(lhs, rhs) {
	if (arguments.length > 0) {
		this.init(lhs, rhs);
	}
}

LessThanOperation.prototype.init = function(lhs, rhs) {
	LessThanOperation.superclass.init.call(this, lhs, rhs);
};

LessThanOperation.prototype.evaluate = function(c) {
	return this.lhs.evaluate(c).lessthan(this.rhs.evaluate(c));
};

LessThanOperation.prototype.toString = function() {
	return "(" + this.lhs.toString() + " < " + this.rhs.toString() + ")";
};

// GreaterThanOperation //////////////////////////////////////////////////////

GreaterThanOperation.prototype = new BinaryOperation();
GreaterThanOperation.prototype.constructor = GreaterThanOperation;
GreaterThanOperation.superclass = BinaryOperation.prototype;

function GreaterThanOperation(lhs, rhs) {
	if (arguments.length > 0) {
		this.init(lhs, rhs);
	}
}

GreaterThanOperation.prototype.init = function(lhs, rhs) {
	GreaterThanOperation.superclass.init.call(this, lhs, rhs);
};

GreaterThanOperation.prototype.evaluate = function(c) {
	return this.lhs.evaluate(c).greaterthan(this.rhs.evaluate(c));
};

GreaterThanOperation.prototype.toString = function() {
	return "(" + this.lhs.toString() + " > " + this.rhs.toString() + ")";
};

// LessThanOrEqualOperation //////////////////////////////////////////////////

LessThanOrEqualOperation.prototype = new BinaryOperation();
LessThanOrEqualOperation.prototype.constructor = LessThanOrEqualOperation;
LessThanOrEqualOperation.superclass = BinaryOperation.prototype;

function LessThanOrEqualOperation(lhs, rhs) {
	if (arguments.length > 0) {
		this.init(lhs, rhs);
	}
}

LessThanOrEqualOperation.prototype.init = function(lhs, rhs) {
	LessThanOrEqualOperation.superclass.init.call(this, lhs, rhs);
};

LessThanOrEqualOperation.prototype.evaluate = function(c) {
	return this.lhs.evaluate(c).lessthanorequal(this.rhs.evaluate(c));
};

LessThanOrEqualOperation.prototype.toString = function() {
	return "(" + this.lhs.toString() + " <= " + this.rhs.toString() + ")";
};

// GreaterThanOrEqualOperation ///////////////////////////////////////////////

GreaterThanOrEqualOperation.prototype = new BinaryOperation();
GreaterThanOrEqualOperation.prototype.constructor = GreaterThanOrEqualOperation;
GreaterThanOrEqualOperation.superclass = BinaryOperation.prototype;

function GreaterThanOrEqualOperation(lhs, rhs) {
	if (arguments.length > 0) {
		this.init(lhs, rhs);
	}
}

GreaterThanOrEqualOperation.prototype.init = function(lhs, rhs) {
	GreaterThanOrEqualOperation.superclass.init.call(this, lhs, rhs);
};

GreaterThanOrEqualOperation.prototype.evaluate = function(c) {
	return this.lhs.evaluate(c).greaterthanorequal(this.rhs.evaluate(c));
};

GreaterThanOrEqualOperation.prototype.toString = function() {
	return "(" + this.lhs.toString() + " >= " + this.rhs.toString() + ")";
};

// PlusOperation /////////////////////////////////////////////////////////////

PlusOperation.prototype = new BinaryOperation();
PlusOperation.prototype.constructor = PlusOperation;
PlusOperation.superclass = BinaryOperation.prototype;

function PlusOperation(lhs, rhs) {
	if (arguments.length > 0) {
		this.init(lhs, rhs);
	}
}

PlusOperation.prototype.init = function(lhs, rhs) {
	PlusOperation.superclass.init.call(this, lhs, rhs);
};

PlusOperation.prototype.evaluate = function(c) {
	return this.lhs.evaluate(c).number().plus(this.rhs.evaluate(c).number());
};

PlusOperation.prototype.toString = function() {
	return "(" + this.lhs.toString() + " + " + this.rhs.toString() + ")";
};

// MinusOperation ////////////////////////////////////////////////////////////

MinusOperation.prototype = new BinaryOperation();
MinusOperation.prototype.constructor = MinusOperation;
MinusOperation.superclass = BinaryOperation.prototype;

function MinusOperation(lhs, rhs) {
	if (arguments.length > 0) {
		this.init(lhs, rhs);
	}
}

MinusOperation.prototype.init = function(lhs, rhs) {
	MinusOperation.superclass.init.call(this, lhs, rhs);
};

MinusOperation.prototype.evaluate = function(c) {
	return this.lhs.evaluate(c).number().minus(this.rhs.evaluate(c).number());
};

MinusOperation.prototype.toString = function() {
	return "(" + this.lhs.toString() + " - " + this.rhs.toString() + ")";
};

// MultiplyOperation /////////////////////////////////////////////////////////

MultiplyOperation.prototype = new BinaryOperation();
MultiplyOperation.prototype.constructor = MultiplyOperation;
MultiplyOperation.superclass = BinaryOperation.prototype;

function MultiplyOperation(lhs, rhs) {
	if (arguments.length > 0) {
		this.init(lhs, rhs);
	}
}

MultiplyOperation.prototype.init = function(lhs, rhs) {
	MultiplyOperation.superclass.init.call(this, lhs, rhs);
};

MultiplyOperation.prototype.evaluate = function(c) {
	return this.lhs.evaluate(c).number().multiply(this.rhs.evaluate(c).number());
};

MultiplyOperation.prototype.toString = function() {
	return "(" + this.lhs.toString() + " * " + this.rhs.toString() + ")";
};

// DivOperation //////////////////////////////////////////////////////////////

DivOperation.prototype = new BinaryOperation();
DivOperation.prototype.constructor = DivOperation;
DivOperation.superclass = BinaryOperation.prototype;

function DivOperation(lhs, rhs) {
	if (arguments.length > 0) {
		this.init(lhs, rhs);
	}
}

DivOperation.prototype.init = function(lhs, rhs) {
	DivOperation.superclass.init.call(this, lhs, rhs);
};

DivOperation.prototype.evaluate = function(c) {
	return this.lhs.evaluate(c).number().div(this.rhs.evaluate(c).number());
};

DivOperation.prototype.toString = function() {
	return "(" + this.lhs.toString() + " div " + this.rhs.toString() + ")";
};

// ModOperation //////////////////////////////////////////////////////////////

ModOperation.prototype = new BinaryOperation();
ModOperation.prototype.constructor = ModOperation;
ModOperation.superclass = BinaryOperation.prototype;

function ModOperation(lhs, rhs) {
	if (arguments.length > 0) {
		this.init(lhs, rhs);
	}
}

ModOperation.prototype.init = function(lhs, rhs) {
	ModOperation.superclass.init.call(this, lhs, rhs);
};

ModOperation.prototype.evaluate = function(c) {
	return this.lhs.evaluate(c).number().mod(this.rhs.evaluate(c).number());
};

ModOperation.prototype.toString = function() {
	return "(" + this.lhs.toString() + " mod " + this.rhs.toString() + ")";
};

// BarOperation //////////////////////////////////////////////////////////////

BarOperation.prototype = new BinaryOperation();
BarOperation.prototype.constructor = BarOperation;
BarOperation.superclass = BinaryOperation.prototype;

function BarOperation(lhs, rhs) {
	if (arguments.length > 0) {
		this.init(lhs, rhs);
	}
}

BarOperation.prototype.init = function(lhs, rhs) {
	BarOperation.superclass.init.call(this, lhs, rhs);
};

BarOperation.prototype.evaluate = function(c) {
	return this.lhs.evaluate(c).nodeset().union(this.rhs.evaluate(c).nodeset());
};

BarOperation.prototype.toString = function() {
	return this.lhs.toString() + " | " + this.rhs.toString();
};

// PathExpr //////////////////////////////////////////////////////////////////

PathExpr.prototype = new Expression();
PathExpr.prototype.constructor = PathExpr;
PathExpr.superclass = Expression.prototype;

function PathExpr(filter, filterPreds, locpath) {
	if (arguments.length > 0) {
		this.init(filter, filterPreds, locpath);
	}
}

PathExpr.prototype.init = function(filter, filterPreds, locpath) {
	PathExpr.superclass.init.call(this);
	this.filter = filter;
	this.filterPredicates = filterPreds;
	this.locationPath = locpath;
};

PathExpr.prototype.evaluate = function(c) {
	var nodes;
	var xpc = new XPathContext();
	xpc.variableResolver = c.variableResolver;
	xpc.functionResolver = c.functionResolver;
	xpc.namespaceResolver = c.namespaceResolver;
	xpc.expressionContextNode = c.expressionContextNode;
	xpc.expressionContextPosition = c.expressionContextPosition;
	xpc.expressionContextSize = c.expressionContextSize;
	xpc.virtualRoot = c.virtualRoot;
	xpc.caseInsensitive = c.caseInsensitive;
	if (this.filter == null) {
		nodes = [ c.contextNode ];
	} else {
		var ns = this.filter.evaluate(c);
		if (!Utilities.instance_of(ns, XNodeSet)) {
			if (this.filterPredicates != null && this.filterPredicates.length > 0 || this.locationPath != null) {
				throw new Error("Path expression filter must evaluate to a nodset if predicates or location path are used");
			}
			return ns;
		}
		nodes = ns.toArray();
		if (this.filterPredicates != null) {
			// apply each of the predicates in turn
			for (var j = 0; j < this.filterPredicates.length; j++) {
				var pred = this.filterPredicates[j];
				var newNodes = [];
				xpc.contextSize = nodes.length;
				for (xpc.contextPosition = 1; xpc.contextPosition <= xpc.contextSize; xpc.contextPosition++) {
					xpc.contextNode = nodes[xpc.contextPosition - 1];
					if (this.predicateMatches(pred, xpc)) {
						newNodes.push(xpc.contextNode);
					}
				}
				nodes = newNodes;
			}
		}
	}
	if (this.locationPath != null) {
		if (this.locationPath.absolute) {
			if (nodes[0].nodeType != 9 /*Node.DOCUMENT_NODE*/) {
				if (xpc.virtualRoot != null) {
					nodes = [ xpc.virtualRoot ];
				} else {
					if (nodes[0].ownerDocument == null) {
						// IE 5.5 doesn't have ownerDocument?
						var n = nodes[0];
						while (n.parentNode != null) {
							n = n.parentNode;
						}
						nodes = [ n ];
					} else {
						nodes = [ nodes[0].ownerDocument ];
					}
				}
			} else {
				nodes = [ nodes[0] ];
			}
		}
		for (var i = 0; i < this.locationPath.steps.length; i++) {
			var step = this.locationPath.steps[i];
			var newNodes = [];
			var newLocalContext = [];
			for (var j = 0; j < nodes.length; j++) {
				xpc.contextNode = nodes[j];
				switch (step.axis) {
					case Step.ANCESTOR:
						// look at all the ancestor nodes
						if (xpc.contextNode === xpc.virtualRoot) {
							break;
						}
						var m;
						if (xpc.contextNode.nodeType == 2 /*Node.ATTRIBUTE_NODE*/) {
							m = this.getOwnerElement(xpc.contextNode);
						} else {
							m = xpc.contextNode.parentNode;
						}
						while (m != null) {
							if (step.nodeTest.matches(m, xpc)) {
								newNodes.push(m);
							}
							if (m === xpc.virtualRoot) {
								break;
							}
							m = m.parentNode;
						}
						break;

					case Step.ANCESTORORSELF:
						// look at all the ancestor nodes and the current node
						for (var m = xpc.contextNode; m != null; m = m.nodeType == 2 /*Node.ATTRIBUTE_NODE*/ ? this.getOwnerElement(m) : m.parentNode) {
							if (step.nodeTest.matches(m, xpc)) {
								newNodes.push(m);
							}
							if (m === xpc.virtualRoot) {
								break;
							}
						}
						break;

					case Step.ATTRIBUTE:
						// look at the attributes
						var nnm = xpc.contextNode.attributes;
						if (nnm != null) {
							for (var k = 0; k < nnm.length; k++) {
								var m = nnm.item(k);
								if (step.nodeTest.matches(m, xpc)) {
									newNodes.push(m);
								}
							}
						}
						break;

					case Step.CHILD:
						// look at all child elements
						var pos = 0
						var tmpContext = []						
						for (var m = xpc.contextNode.firstChild; m != null; m = m.nextSibling) {							
							if (step.nodeTest.matches(m, xpc)) {
								newNodes.push(m);
								//keep track of the element position between other matching siblings
								tmpContext.push({contextPosition: ++pos});								
							}
						}	

						for (var k=0; k<tmpContext.length; k++) {
							//track size of matching siblings
							tmpContext[k].contextSize = pos
							newLocalContext.push(tmpContext[k])
						}					

						break;

					case Step.DESCENDANT:
						// look at all descendant nodes
						var st = [ xpc.contextNode.firstChild ];
						while (st.length > 0) {
							for (var m = st.pop(); m != null; ) {
								if (step.nodeTest.matches(m, xpc)) {
									newNodes.push(m);
								}
								if (m.firstChild != null) {
									st.push(m.nextSibling);
									m = m.firstChild;
								} else {
									m = m.nextSibling;
								}
							}
						}
						break;

					case Step.DESCENDANTORSELF:
						// look at self
						if (step.nodeTest.matches(xpc.contextNode, xpc)) {
							newNodes.push(xpc.contextNode);
						}
						// look at all descendant nodes
						var st = [ xpc.contextNode.firstChild ];
						while (st.length > 0) {
							for (var m = st.pop(); m != null; ) {
								if (step.nodeTest.matches(m, xpc)) {
									newNodes.push(m);
								}
								if (m.firstChild != null) {
									st.push(m.nextSibling);
									m = m.firstChild;
								} else {
									m = m.nextSibling;
								}
							}
						}
						break;

					case Step.FOLLOWING:
						if (xpc.contextNode === xpc.virtualRoot) {
							break;
						}
						var st = [];
						if (xpc.contextNode.firstChild != null) {
							st.unshift(xpc.contextNode.firstChild);
						} else {
							st.unshift(xpc.contextNode.nextSibling);
						}
						for (var m = xpc.contextNode; m != null && m.nodeType != 9 /*Node.DOCUMENT_NODE*/ && m !== xpc.virtualRoot; m = m.parentNode) {
							st.unshift(m.nextSibling);
						}
						do {
							for (var m = st.pop(); m != null; ) {
								if (step.nodeTest.matches(m, xpc)) {
									newNodes.push(m);
								}
								if (m.firstChild != null) {
									st.push(m.nextSibling);
									m = m.firstChild;
								} else {
									m = m.nextSibling;
								}
							}
						} while (st.length > 0);
						break;
						
					case Step.FOLLOWINGSIBLING:
						if (xpc.contextNode === xpc.virtualRoot) {
							break;
						}
						for (var m = xpc.contextNode.nextSibling; m != null; m = m.nextSibling) {
							if (step.nodeTest.matches(m, xpc)) {
								newNodes.push(m);
							}
						}
						break;

					case Step.NAMESPACE:
						var n = {};
						if (xpc.contextNode.nodeType == 1 /*Node.ELEMENT_NODE*/) {
							n["xml"] = XPath.XML_NAMESPACE_URI;
							n["xmlns"] = XPath.XMLNS_NAMESPACE_URI;
							for (var m = xpc.contextNode; m != null && m.nodeType == 1 /*Node.ELEMENT_NODE*/; m = m.parentNode) {
								for (var k = 0; k < m.attributes.length; k++) {
									var attr = m.attributes.item(k);
									var nm = String(attr.name);
									if (nm == "xmlns") {
										if (n[""] == undefined) {
											n[""] = attr.value;
										}
									} else if (nm.length > 6 && nm.substring(0, 6) == "xmlns:") {
										var pre = nm.substring(6, nm.length);
										if (n[pre] == undefined) {
											n[pre] = attr.value;
										}
									}
								}
							}
							for (var pre in n) {
								var nsn = new NamespaceNode(pre, n[pre], xpc.contextNode);
								if (step.nodeTest.matches(nsn, xpc)) {
									newNodes.push(nsn);
								}
							}
						}
						break;

					case Step.PARENT:
						m = null;
						if (xpc.contextNode !== xpc.virtualRoot) {
							if (xpc.contextNode.nodeType == 2 /*Node.ATTRIBUTE_NODE*/) {
								m = this.getOwnerElement(xpc.contextNode);
							} else {
								m = xpc.contextNode.parentNode;
							}
						}
						if (m != null && step.nodeTest.matches(m, xpc)) {
							newNodes.push(m);
						}
						break;

					case Step.PRECEDING:
						var st;
						if (xpc.virtualRoot != null) {
							st = [ xpc.virtualRoot ];
						} else {
							st = xpc.contextNode.nodeType == 9 /*Node.DOCUMENT_NODE*/
								? [ xpc.contextNode ]
								: [ xpc.contextNode.ownerDocument ];
						}
						outer: while (st.length > 0) {
							for (var m = st.pop(); m != null; ) {
								if (m == xpc.contextNode) {
									break outer;
								}
								if (step.nodeTest.matches(m, xpc)) {
									newNodes.unshift(m);
								}
								if (m.firstChild != null) {
									st.push(m.nextSibling);
									m = m.firstChild;
								} else {
									m = m.nextSibling;
								}
							}
						}
						break;

					case Step.PRECEDINGSIBLING:
						if (xpc.contextNode === xpc.virtualRoot) {
							break;
						}
						for (var m = xpc.contextNode.previousSibling; m != null; m = m.previousSibling) {
							if (step.nodeTest.matches(m, xpc)) {
								newNodes.push(m);
							}
						}
						break;

					case Step.SELF:
						if (step.nodeTest.matches(xpc.contextNode, xpc)) {
							newNodes.push(xpc.contextNode);
						}
						break;

					default:
				}
			}
			nodes = newNodes;
			// apply each of the predicates in turn			
			for (var j = 0; j < step.predicates.length; j++) {
				var pred = step.predicates[j];
				var newNodes = [];
				xpc.contextSize = nodes.length;
				for (xpc.contextPosition = 1; xpc.contextPosition <= xpc.contextSize; xpc.contextPosition++) {
					xpc.contextNode = nodes[xpc.contextPosition - 1];
					//if we keep track of the node original context then use it
					//end goal is to always use original cotnext, now implemented just for CHILD axis
					var localCtx = newLocalContext.length>0?this.getLocalCtx(xpc, newLocalContext[xpc.contextPosition-1]):xpc
					if (this.predicateMatches(pred, localCtx)) {						
						newNodes.push(xpc.contextNode);						
					} else {
					}
				}
				nodes = newNodes;
				//console.log(nodes.length)
			}
		}
	}	
	var ns = new XNodeSet();
	ns.addArray(nodes);
	return ns;
};

PathExpr.prototype.getLocalCtx = function(xpc, localCtx, length) {
	var res = new XPathContext();
	res.variableResolver = xpc.variableResolver;
	res.functionResolver = xpc.functionResolver;
	res.namespaceResolver = xpc.namespaceResolver;
	res.expressionContextNode = xpc.expressionContextNode;
	res.expressionContextPosition = xpc.expressionContextPosition;
	res.expressionContextSize = xpc.expressionContextSize;
	res.virtualRoot = xpc.virtualRoot;
	res.caseInsensitive = xpc.caseInsensitive;
	res.contextNode = xpc.contextNode;
	res.contextPosition = localCtx.contextPosition;
	res.contextSize = localCtx.contextSize;	
	return res;
};

PathExpr.prototype.predicateMatches = function(pred, c) {
	var res = pred.evaluate(c);
	if (Utilities.instance_of(res, XNumber)) {		
		var val = c.contextPosition == res.numberValue()		
		return val;
	}
	return res.booleanValue();
};

PathExpr.prototype.toString = function() {
	if (this.filter != undefined) {
		var s = this.filter.toString();
		if (Utilities.instance_of(this.filter, XString)) {
			s = "'" + s + "'";
		}
		if (this.filterPredicates != undefined) {
			for (var i = 0; i < this.filterPredicates.length; i++) {
				s = s + "[" + this.filterPredicates[i].toString() + "]";
			}
		}
		if (this.locationPath != undefined) {
			if (!this.locationPath.absolute) {
				s += "/";
			}
			s += this.locationPath.toString();
		}
		return s;
	}
	return this.locationPath.toString();
};

PathExpr.prototype.getOwnerElement = function(n) {
	// DOM 2 has ownerElement
	if (n.ownerElement) {
		return n.ownerElement;
	}
	// DOM 1 Internet Explorer can use selectSingleNode (ironically)
	try {
		if (n.selectSingleNode) {
			return n.selectSingleNode("..");
		}
	} catch (e) {
	}
	// Other DOM 1 implementations must use this egregious search
	var doc = n.nodeType == 9 /*Node.DOCUMENT_NODE*/
			? n
			: n.ownerDocument;
	var elts = doc.getElementsByTagName("*");
	for (var i = 0; i < elts.length; i++) {
		var elt = elts.item(i);
		var nnm = elt.attributes;
		for (var j = 0; j < nnm.length; j++) {
			var an = nnm.item(j);
			if (an === n) {
				return elt;
			}
		}
	}
	return null;
};

// LocationPath //////////////////////////////////////////////////////////////

LocationPath.prototype = new Object();
LocationPath.prototype.constructor = LocationPath;
LocationPath.superclass = Object.prototype;

function LocationPath(abs, steps) {
	if (arguments.length > 0) {
		this.init(abs, steps);
	}
}

LocationPath.prototype.init = function(abs, steps) {
	this.absolute = abs;
	this.steps = steps;
};

LocationPath.prototype.toString = function() {
	var s;
	if (this.absolute) {
		s = "/";
	} else {
		s = "";
	}
	for (var i = 0; i < this.steps.length; i++) {
		if (i != 0) {
			s += "/";
		}
		s += this.steps[i].toString();
	}
	return s;
};

// Step //////////////////////////////////////////////////////////////////////

Step.prototype = new Object();
Step.prototype.constructor = Step;
Step.superclass = Object.prototype;

function Step(axis, nodetest, preds) {
	if (arguments.length > 0) {
		this.init(axis, nodetest, preds);
	}
}

Step.prototype.init = function(axis, nodetest, preds) {
	this.axis = axis;
	this.nodeTest = nodetest;
	this.predicates = preds;
};

Step.prototype.toString = function() {
	var s;
	switch (this.axis) {
		case Step.ANCESTOR:
			s = "ancestor";
			break;
		case Step.ANCESTORORSELF:
			s = "ancestor-or-self";
			break;
		case Step.ATTRIBUTE:
			s = "attribute";
			break;
		case Step.CHILD:
			s = "child";
			break;
		case Step.DESCENDANT:
			s = "descendant";
			break;
		case Step.DESCENDANTORSELF:
			s = "descendant-or-self";
			break;
		case Step.FOLLOWING:
			s = "following";
			break;
		case Step.FOLLOWINGSIBLING:
			s = "following-sibling";
			break;
		case Step.NAMESPACE:
			s = "namespace";
			break;
		case Step.PARENT:
			s = "parent";
			break;
		case Step.PRECEDING:
			s = "preceding";
			break;
		case Step.PRECEDINGSIBLING:
			s = "preceding-sibling";
			break;
		case Step.SELF:
			s = "self";
			break;
	}
	s += "::";
	s += this.nodeTest.toString();
	for (var i = 0; i < this.predicates.length; i++) {
		s += "[" + this.predicates[i].toString() + "]";
	}
	return s;
};

Step.ANCESTOR = 0;
Step.ANCESTORORSELF = 1;
Step.ATTRIBUTE = 2;
Step.CHILD = 3;
Step.DESCENDANT = 4;
Step.DESCENDANTORSELF = 5;
Step.FOLLOWING = 6;
Step.FOLLOWINGSIBLING = 7;
Step.NAMESPACE = 8;
Step.PARENT = 9;
Step.PRECEDING = 10;
Step.PRECEDINGSIBLING = 11;
Step.SELF = 12;

// NodeTest //////////////////////////////////////////////////////////////////

NodeTest.prototype = new Object();
NodeTest.prototype.constructor = NodeTest;
NodeTest.superclass = Object.prototype;

function NodeTest(type, value) {
	if (arguments.length > 0) {
		this.init(type, value);
	}
}

NodeTest.prototype.init = function(type, value) {
	this.type = type;
	this.value = value;
};

NodeTest.prototype.toString = function() {
	switch (this.type) {
		case NodeTest.NAMETESTANY:
			return "*";
		case NodeTest.NAMETESTPREFIXANY:
			return this.value + ":*";
		case NodeTest.NAMETESTRESOLVEDANY:
			return "{" + this.value + "}*";
		case NodeTest.NAMETESTQNAME:
			return this.value;
		case NodeTest.NAMETESTRESOLVEDNAME:
			return "{" + this.namespaceURI + "}" + this.value;
		case NodeTest.COMMENT:
			return "comment()";
		case NodeTest.TEXT:
			return "text()";
		case NodeTest.PI:
			if (this.value != undefined) {
				return "processing-instruction(\"" + this.value + "\")";
			}
			return "processing-instruction()";
		case NodeTest.NODE:
			return "node()";
	}
	return "<unknown nodetest type>";
};

NodeTest.prototype.matches = function(n, xpc) {
	switch (this.type) {
		case NodeTest.NAMETESTANY:
			if (n.nodeType == 2 /*Node.ATTRIBUTE_NODE*/
					|| n.nodeType == 1 /*Node.ELEMENT_NODE*/
					|| n.nodeType == XPathNamespace.XPATH_NAMESPACE_NODE) {
				return true;
			}
			return false;
		case NodeTest.NAMETESTPREFIXANY:
			if ((n.nodeType == 2 /*Node.ATTRIBUTE_NODE*/ || n.nodeType == 1 /*Node.ELEMENT_NODE*/)) {
				var ns = xpc.namespaceResolver.getNamespace(this.value, xpc.expressionContextNode);
				if (ns == null) {
					throw new Error("Cannot resolve QName " + this.value);
				}
				return true;	
			}
			return false;
		case NodeTest.NAMETESTQNAME:
			if (n.nodeType == 2 /*Node.ATTRIBUTE_NODE*/
					|| n.nodeType == 1 /*Node.ELEMENT_NODE*/
					|| n.nodeType == XPathNamespace.XPATH_NAMESPACE_NODE) {
				var test = Utilities.resolveQName(this.value, xpc.namespaceResolver, xpc.expressionContextNode, false);
				if (test[0] == null) {
					throw new Error("Cannot resolve QName " + this.value);
				}
				test[0] = String(test[0]);
				test[1] = String(test[1]);
				if (test[0] == "") {
					test[0] = null;
				}
				var node = Utilities.resolveQName(n.nodeName, xpc.namespaceResolver, n, n.nodeType == 1 /*Node.ELEMENT_NODE*/);
				node[0] = String(node[0]);
				node[1] = String(node[1]);
				if (node[0] == "") {
					node[0] = null;
				}
				if (xpc.caseInsensitive) {
					return test[0] == node[0] && String(test[1]).toLowerCase() == String(node[1]).toLowerCase();
				}
				return test[0] == node[0] && test[1] == node[1];
			}
			return false;
		case NodeTest.COMMENT:
			return n.nodeType == 8 /*Node.COMMENT_NODE*/;
		case NodeTest.TEXT:
			return n.nodeType == 3 /*Node.TEXT_NODE*/ || n.nodeType == 4 /*Node.CDATA_SECTION_NODE*/;
		case NodeTest.PI:
			return n.nodeType == 7 /*Node.PROCESSING_INSTRUCTION_NODE*/
				&& (this.value == null || n.nodeName == this.value);
		case NodeTest.NODE:
			return n.nodeType == 9 /*Node.DOCUMENT_NODE*/
				|| n.nodeType == 1 /*Node.ELEMENT_NODE*/
				|| n.nodeType == 2 /*Node.ATTRIBUTE_NODE*/
				|| n.nodeType == 3 /*Node.TEXT_NODE*/
				|| n.nodeType == 4 /*Node.CDATA_SECTION_NODE*/
				|| n.nodeType == 8 /*Node.COMMENT_NODE*/
				|| n.nodeType == 7 /*Node.PROCESSING_INSTRUCTION_NODE*/;
	}
	return false;
};

NodeTest.NAMETESTANY = 0;
NodeTest.NAMETESTPREFIXANY = 1;
NodeTest.NAMETESTQNAME = 2;
NodeTest.COMMENT = 3;
NodeTest.TEXT = 4;
NodeTest.PI = 5;
NodeTest.NODE = 6;

// VariableReference /////////////////////////////////////////////////////////

VariableReference.prototype = new Expression();
VariableReference.prototype.constructor = VariableReference;
VariableReference.superclass = Expression.prototype;

function VariableReference(v) {
	if (arguments.length > 0) {
		this.init(v);
	}
}

VariableReference.prototype.init = function(v) {
	this.variable = v;
};

VariableReference.prototype.toString = function() {
	return "$" + this.variable;
};

VariableReference.prototype.evaluate = function(c) {
	return c.variableResolver.getVariable(this.variable, c);
};

// FunctionCall //////////////////////////////////////////////////////////////

FunctionCall.prototype = new Expression();
FunctionCall.prototype.constructor = FunctionCall;
FunctionCall.superclass = Expression.prototype;

function FunctionCall(fn, args) {
	if (arguments.length > 0) {
		this.init(fn, args);
	}
}

FunctionCall.prototype.init = function(fn, args) {
	this.functionName = fn;
	this.arguments = args;
};

FunctionCall.prototype.toString = function() {
	var s = this.functionName + "(";
	for (var i = 0; i < this.arguments.length; i++) {
		if (i > 0) {
			s += ", ";
		}
		s += this.arguments[i].toString();
	}
	return s + ")";
};

FunctionCall.prototype.evaluate = function(c) {
	var f = c.functionResolver.getFunction(this.functionName, c);
	if (f == undefined) {
		throw new Error("Unknown function " + this.functionName);
	}
	var a = [c].concat(this.arguments);
	return f.apply(c.functionResolver.thisArg, a);
};

// XString ///////////////////////////////////////////////////////////////////

XString.prototype = new Expression();
XString.prototype.constructor = XString;
XString.superclass = Expression.prototype;

function XString(s) {
	if (arguments.length > 0) {
		this.init(s);
	}
}

XString.prototype.init = function(s) {
	this.str = s;
};

XString.prototype.toString = function() {
	return this.str;
};

XString.prototype.evaluate = function(c) {
	return this;
};

XString.prototype.string = function() {
	return this;
};

XString.prototype.number = function() {
	return new XNumber(this.str);
};

XString.prototype.bool = function() {
	return new XBoolean(this.str);
};

XString.prototype.nodeset = function() {
	throw new Error("Cannot convert string to nodeset");
};

XString.prototype.stringValue = function() {
	return this.str;
};

XString.prototype.numberValue = function() {
	return this.number().numberValue();
};

XString.prototype.booleanValue = function() {
	return this.bool().booleanValue();
};

XString.prototype.equals = function(r) {
	if (Utilities.instance_of(r, XBoolean)) {
		return this.bool().equals(r);
	}
	if (Utilities.instance_of(r, XNumber)) {
		return this.number().equals(r);
	}
	if (Utilities.instance_of(r, XNodeSet)) {
		return r.compareWithString(this, Operators.equals);
	}
	return new XBoolean(this.str == r.str);
};

XString.prototype.notequal = function(r) {
	if (Utilities.instance_of(r, XBoolean)) {
		return this.bool().notequal(r);
	}
	if (Utilities.instance_of(r, XNumber)) {
		return this.number().notequal(r);
	}
	if (Utilities.instance_of(r, XNodeSet)) {
		return r.compareWithString(this, Operators.notequal);
	}
	return new XBoolean(this.str != r.str);
};

XString.prototype.lessthan = function(r) {
	if (Utilities.instance_of(r, XNodeSet)) {
		return r.compareWithNumber(this.number(), Operators.greaterthanorequal);
	}
	return this.number().lessthan(r.number());
};

XString.prototype.greaterthan = function(r) {
	if (Utilities.instance_of(r, XNodeSet)) {
		return r.compareWithNumber(this.number(), Operators.lessthanorequal);
	}
	return this.number().greaterthan(r.number());
};

XString.prototype.lessthanorequal = function(r) {
	if (Utilities.instance_of(r, XNodeSet)) {
		return r.compareWithNumber(this.number(), Operators.greaterthan);
	}
	return this.number().lessthanorequal(r.number());
};

XString.prototype.greaterthanorequal = function(r) {
	if (Utilities.instance_of(r, XNodeSet)) {
		return r.compareWithNumber(this.number(), Operators.lessthan);
	}
	return this.number().greaterthanorequal(r.number());
};

// XNumber ///////////////////////////////////////////////////////////////////

XNumber.prototype = new Expression();
XNumber.prototype.constructor = XNumber;
XNumber.superclass = Expression.prototype;

function XNumber(n) {
	if (arguments.length > 0) {
		this.init(n);
	}
}

XNumber.prototype.init = function(n) {
	this.num = Number(n);
};

XNumber.prototype.toString = function() {
	return this.num;
};

XNumber.prototype.evaluate = function(c) {
	return this;
};

XNumber.prototype.string = function() {
	return new XString(this.num);
};

XNumber.prototype.number = function() {
	return this;
};

XNumber.prototype.bool = function() {
	return new XBoolean(this.num);
};

XNumber.prototype.nodeset = function() {
	throw new Error("Cannot convert number to nodeset");
};

XNumber.prototype.stringValue = function() {
	return this.string().stringValue();
};

XNumber.prototype.numberValue = function() {
	return this.num;
};

XNumber.prototype.booleanValue = function() {
	return this.bool().booleanValue();
};

XNumber.prototype.negate = function() {
	return new XNumber(-this.num);
};

XNumber.prototype.equals = function(r) {
	if (Utilities.instance_of(r, XBoolean)) {
		return this.bool().equals(r);
	}
	if (Utilities.instance_of(r, XString)) {
		return this.equals(r.number());
	}
	if (Utilities.instance_of(r, XNodeSet)) {
		return r.compareWithNumber(this, Operators.equals);
	}
	return new XBoolean(this.num == r.num);
};

XNumber.prototype.notequal = function(r) {
	if (Utilities.instance_of(r, XBoolean)) {
		return this.bool().notequal(r);
	}
	if (Utilities.instance_of(r, XString)) {
		return this.notequal(r.number());
	}
	if (Utilities.instance_of(r, XNodeSet)) {
		return r.compareWithNumber(this, Operators.notequal);
	}
	return new XBoolean(this.num != r.num);
};

XNumber.prototype.lessthan = function(r) {
	if (Utilities.instance_of(r, XNodeSet)) {
		return r.compareWithNumber(this, Operators.greaterthanorequal);
	}
	if (Utilities.instance_of(r, XBoolean) || Utilities.instance_of(r, XString)) {
		return this.lessthan(r.number());
	}
	return new XBoolean(this.num < r.num);
};

XNumber.prototype.greaterthan = function(r) {
	if (Utilities.instance_of(r, XNodeSet)) {
		return r.compareWithNumber(this, Operators.lessthanorequal);
	}
	if (Utilities.instance_of(r, XBoolean) || Utilities.instance_of(r, XString)) {
		return this.greaterthan(r.number());
	}
	return new XBoolean(this.num > r.num);
};

XNumber.prototype.lessthanorequal = function(r) {
	if (Utilities.instance_of(r, XNodeSet)) {
		return r.compareWithNumber(this, Operators.greaterthan);
	}
	if (Utilities.instance_of(r, XBoolean) || Utilities.instance_of(r, XString)) {
		return this.lessthanorequal(r.number());
	}
	return new XBoolean(this.num <= r.num);
};

XNumber.prototype.greaterthanorequal = function(r) {
	if (Utilities.instance_of(r, XNodeSet)) {
		return r.compareWithNumber(this, Operators.lessthan);
	}
	if (Utilities.instance_of(r, XBoolean) || Utilities.instance_of(r, XString)) {
		return this.greaterthanorequal(r.number());
	}
	return new XBoolean(this.num >= r.num);
};

XNumber.prototype.plus = function(r) {
	return new XNumber(this.num + r.num);
};

XNumber.prototype.minus = function(r) {
	return new XNumber(this.num - r.num);
};

XNumber.prototype.multiply = function(r) {
	return new XNumber(this.num * r.num);
};

XNumber.prototype.div = function(r) {
	return new XNumber(this.num / r.num);
};

XNumber.prototype.mod = function(r) {
	return new XNumber(this.num % r.num);
};

// XBoolean //////////////////////////////////////////////////////////////////

XBoolean.prototype = new Expression();
XBoolean.prototype.constructor = XBoolean;
XBoolean.superclass = Expression.prototype;

function XBoolean(b) {
	if (arguments.length > 0) {
		this.init(b);
	}
}

XBoolean.prototype.init = function(b) {
	this.b = Boolean(b);
};

XBoolean.prototype.toString = function() {
	return this.b.toString();
};

XBoolean.prototype.evaluate = function(c) {
	return this;
};

XBoolean.prototype.string = function() {
	return new XString(this.b);
};

XBoolean.prototype.number = function() {
	return new XNumber(this.b);
};

XBoolean.prototype.bool = function() {
	return this;
};

XBoolean.prototype.nodeset = function() {
	throw new Error("Cannot convert boolean to nodeset");
};

XBoolean.prototype.stringValue = function() {
	return this.string().stringValue();
};

XBoolean.prototype.numberValue = function() {
	return this.num().numberValue();
};

XBoolean.prototype.booleanValue = function() {
	return this.b;
};

XBoolean.prototype.not = function() {
	return new XBoolean(!this.b);
};

XBoolean.prototype.equals = function(r) {
	if (Utilities.instance_of(r, XString) || Utilities.instance_of(r, XNumber)) {
		return this.equals(r.bool());
	}
	if (Utilities.instance_of(r, XNodeSet)) {
		return r.compareWithBoolean(this, Operators.equals);
	}
	return new XBoolean(this.b == r.b);
};

XBoolean.prototype.notequal = function(r) {
	if (Utilities.instance_of(r, XString) || Utilities.instance_of(r, XNumber)) {
		return this.notequal(r.bool());
	}
	if (Utilities.instance_of(r, XNodeSet)) {
		return r.compareWithBoolean(this, Operators.notequal);
	}
	return new XBoolean(this.b != r.b);
};

XBoolean.prototype.lessthan = function(r) {
	if (Utilities.instance_of(r, XNodeSet)) {
		return r.compareWithNumber(this.number(), Operators.greaterthanorequal);
	}
	return this.number().lessthan(r.number());
};

XBoolean.prototype.greaterthan = function(r) {
	if (Utilities.instance_of(r, XNodeSet)) {
		return r.compareWithNumber(this.number(), Operators.lessthanorequal);
	}
	return this.number().greaterthan(r.number());
};

XBoolean.prototype.lessthanorequal = function(r) {
	if (Utilities.instance_of(r, XNodeSet)) {
		return r.compareWithNumber(this.number(), Operators.greaterthan);
	}
	return this.number().lessthanorequal(r.number());
};

XBoolean.prototype.greaterthanorequal = function(r) {
	if (Utilities.instance_of(r, XNodeSet)) {
		return r.compareWithNumber(this.number(), Operators.lessthan);
	}
	return this.number().greaterthanorequal(r.number());
};

// AVLTree ///////////////////////////////////////////////////////////////////

AVLTree.prototype = new Object();
AVLTree.prototype.constructor = AVLTree;
AVLTree.superclass = Object.prototype;

function AVLTree(n) {
	this.init(n);
}

AVLTree.prototype.init = function(n) {
	this.left = null;
    this.right = null;
	this.node = n;
	this.depth = 1;
};

AVLTree.prototype.balance = function() {
    var ldepth = this.left  == null ? 0 : this.left.depth;
    var rdepth = this.right == null ? 0 : this.right.depth;

	if (ldepth > rdepth + 1) {
        // LR or LL rotation
        var lldepth = this.left.left  == null ? 0 : this.left.left.depth;
        var lrdepth = this.left.right == null ? 0 : this.left.right.depth;

        if (lldepth < lrdepth) {
            // LR rotation consists of a RR rotation of the left child
            this.left.rotateRR();
            // plus a LL rotation of this node, which happens anyway 
        }
        this.rotateLL();       
    } else if (ldepth + 1 < rdepth) {
        // RR or RL rorarion
		var rrdepth = this.right.right == null ? 0 : this.right.right.depth;
		var rldepth = this.right.left  == null ? 0 : this.right.left.depth;
	 
        if (rldepth > rrdepth) {
            // RR rotation consists of a LL rotation of the right child
            this.right.rotateLL();
            // plus a RR rotation of this node, which happens anyway 
        }
        this.rotateRR();
    }	     
};

AVLTree.prototype.rotateLL = function() {
    // the left side is too long => rotate from the left (_not_ leftwards)
    var nodeBefore = this.node;
    var rightBefore = this.right;
    this.node = this.left.node;
    this.right = this.left;
    this.left = this.left.left;
    this.right.left = this.right.right;
    this.right.right = rightBefore;
    this.right.node = nodeBefore;
    this.right.updateInNewLocation();
    this.updateInNewLocation();
};

AVLTree.prototype.rotateRR = function() {
    // the right side is too long => rotate from the right (_not_ rightwards)
    var nodeBefore = this.node;
    var leftBefore = this.left;
    this.node = this.right.node;
    this.left = this.right;
    this.right = this.right.right;
    this.left.right = this.left.left;
    this.left.left = leftBefore;
    this.left.node = nodeBefore;
    this.left.updateInNewLocation();
    this.updateInNewLocation();
}; 
	
AVLTree.prototype.updateInNewLocation = function() {
    this.getDepthFromChildren();
};

AVLTree.prototype.getDepthFromChildren = function() {
    this.depth = this.node == null ? 0 : 1;
    if (this.left != null) {
        this.depth = this.left.depth + 1;
    }
    if (this.right != null && this.depth <= this.right.depth) {
        this.depth = this.right.depth + 1;
    }
};

AVLTree.prototype.order = function(n1, n2) {
	if (n1 === n2) {
		return 0;
	}
	var d1 = 0;
	var d2 = 0;
	for (var m1 = n1; m1 != null; m1 = m1.parentNode) {
		d1++;
	}
	for (var m2 = n2; m2 != null; m2 = m2.parentNode) {
		d2++;
	}
	if (d1 > d2) {
		while (d1 > d2) {
			n1 = n1.parentNode;
			d1--;
		}
		if (n1 == n2) {
			return 1;
		}
	} else if (d2 > d1) {
		while (d2 > d1) {
			n2 = n2.parentNode;
			d2--;
		}
		if (n1 == n2) {
			return -1;
		}
	}
	while (n1.parentNode != n2.parentNode) {
		n1 = n1.parentNode;
		n2 = n2.parentNode;
	}
	while (n1.previousSibling != null && n2.previousSibling != null) {
		n1 = n1.previousSibling;
		n2 = n2.previousSibling;
	}
	if (n1.previousSibling == null) {
		return -1;
	}
	return 1;
};

AVLTree.prototype.add = function(n)  {
	if (n === this.node) {
        return false;
    }
	
	var o = this.order(n, this.node);
	
    var ret = false;
    if (o == -1) {
        if (this.left == null) {
            this.left = new AVLTree(n);
            ret = true;
        } else {
            ret = this.left.add(n);
            if (ret) {
                this.balance();
            }
        }
    } else if (o == 1) {
        if (this.right == null) {
            this.right = new AVLTree(n);
            ret = true;
        } else {
            ret = this.right.add(n);
            if (ret) {
                this.balance();
            }
        }
    }
	
    if (ret) {
        this.getDepthFromChildren();
    }
    return ret;
};

// XNodeSet //////////////////////////////////////////////////////////////////

XNodeSet.prototype = new Expression();
XNodeSet.prototype.constructor = XNodeSet;
XNodeSet.superclass = Expression.prototype;

function XNodeSet() {
	this.init();
}

XNodeSet.prototype.init = function() {
	this.tree = null;
	this.size = 0;
};

XNodeSet.prototype.toString = function() {
	var p = this.first();
	if (p == null) {
		return "";
	}
	return this.stringForNode(p);
};

XNodeSet.prototype.evaluate = function(c) {
	return this;
};

XNodeSet.prototype.string = function() {
	return new XString(this.toString());
};

XNodeSet.prototype.stringValue = function() {
	return this.toString();
};

XNodeSet.prototype.number = function() {
	return new XNumber(this.string());
};

XNodeSet.prototype.numberValue = function() {
	return Number(this.string());
};

XNodeSet.prototype.bool = function() {
	return new XBoolean(this.tree != null);
};

XNodeSet.prototype.booleanValue = function() {
	return this.tree != null;
};

XNodeSet.prototype.nodeset = function() {
	return this;
};

XNodeSet.prototype.stringForNode = function(n) {
	if (n.nodeType == 9 /*Node.DOCUMENT_NODE*/) {
		n = n.documentElement;
	}
	if (n.nodeType == 1 /*Node.ELEMENT_NODE*/) {
		return this.stringForNodeRec(n);
	}
	if (n.isNamespaceNode) {
		return n.namespace;
	}
	return n.nodeValue;
};

XNodeSet.prototype.stringForNodeRec = function(n) {
	var s = "";
	for (var n2 = n.firstChild; n2 != null; n2 = n2.nextSibling) {
		if (n2.nodeType == 3 /*Node.TEXT_NODE*/) {
			s += n2.nodeValue;
		} else if (n2.nodeType == 1 /*Node.ELEMENT_NODE*/) {
			s += this.stringForNodeRec(n2);
		}
	}
	return s;
};

XNodeSet.prototype.first = function() {
	var p = this.tree;
	if (p == null) {
		return null;
	}
	while (p.left != null) {
		p = p.left;
	}
	return p.node;
};

XNodeSet.prototype.add = function(n) {
    var added;
    if (this.tree == null) {
        this.tree = new AVLTree(n);
        added = true;
    } else {
        added = this.tree.add(n);
    }
    if (added) {
        this.size++;
    }
};

XNodeSet.prototype.addArray = function(ns) {
	for (var i = 0; i < ns.length; i++) {
		this.add(ns[i]);
	}
};

XNodeSet.prototype.toArray = function() {
	var a = [];
	this.toArrayRec(this.tree, a);
	return a;
};

XNodeSet.prototype.toArrayRec = function(t, a) {
	if (t != null) {
		this.toArrayRec(t.left, a);
		a.push(t.node);
		this.toArrayRec(t.right, a);
	}
};

XNodeSet.prototype.compareWithString = function(r, o) {
	var a = this.toArray();
	for (var i = 0; i < a.length; i++) {
		var n = a[i];
		var l = new XString(this.stringForNode(n));
		var res = o(l, r);
		if (res.booleanValue()) {
			return res;
		}
	}
	return new XBoolean(false);
};

XNodeSet.prototype.compareWithNumber = function(r, o) {
	var a = this.toArray();
	for (var i = 0; i < a.length; i++) {
		var n = a[i];
		var l = new XNumber(this.stringForNode(n));
		var res = o(l, r);
		if (res.booleanValue()) {
			return res;
		}
	}
	return new XBoolean(false);
};

XNodeSet.prototype.compareWithBoolean = function(r, o) {
	return o(this.bool(), r);
};

XNodeSet.prototype.compareWithNodeSet = function(r, o) {
	var a = this.toArray();
	for (var i = 0; i < a.length; i++) {
		var n = a[i];
		var l = new XString(this.stringForNode(n));
		var b = r.toArray();
		for (var j = 0; j < b.length; j++) {
			var n2 = b[j];
			var r = new XString(this.stringForNode(n2));
			var res = o(l, r);
			if (res.booleanValue()) {
				return res;
			}
		}
	}
	return new XBoolean(false);
};

XNodeSet.prototype.equals = function(r) {
	if (Utilities.instance_of(r, XString)) {
		return this.compareWithString(r, Operators.equals);
	}
	if (Utilities.instance_of(r, XNumber)) {
		return this.compareWithNumber(r, Operators.equals);
	}
	if (Utilities.instance_of(r, XBoolean)) {
		return this.compareWithBoolean(r, Operators.equals);
	}
	return this.compareWithNodeSet(r, Operators.equals);
};

XNodeSet.prototype.notequal = function(r) {
	if (Utilities.instance_of(r, XString)) {
		return this.compareWithString(r, Operators.notequal);
	}
	if (Utilities.instance_of(r, XNumber)) {
		return this.compareWithNumber(r, Operators.notequal);
	}
	if (Utilities.instance_of(r, XBoolean)) {
		return this.compareWithBoolean(r, Operators.notequal);
	}
	return this.compareWithNodeSet(r, Operators.notequal);
};

XNodeSet.prototype.lessthan = function(r) {
	if (Utilities.instance_of(r, XString)) {
		return this.compareWithNumber(r.number(), Operators.lessthan);
	}
	if (Utilities.instance_of(r, XNumber)) {
		return this.compareWithNumber(r, Operators.lessthan);
	}
	if (Utilities.instance_of(r, XBoolean)) {
		return this.compareWithBoolean(r, Operators.lessthan);
	}
	return this.compareWithNodeSet(r, Operators.lessthan);
};

XNodeSet.prototype.greaterthan = function(r) {
	if (Utilities.instance_of(r, XString)) {
		return this.compareWithNumber(r.number(), Operators.greaterthan);
	}
	if (Utilities.instance_of(r, XNumber)) {
		return this.compareWithNumber(r, Operators.greaterthan);
	}
	if (Utilities.instance_of(r, XBoolean)) {
		return this.compareWithBoolean(r, Operators.greaterthan);
	}
	return this.compareWithNodeSet(r, Operators.greaterthan);
};

XNodeSet.prototype.lessthanorequal = function(r) {
	if (Utilities.instance_of(r, XString)) {
		return this.compareWithNumber(r.number(), Operators.lessthanorequal);
	}
	if (Utilities.instance_of(r, XNumber)) {
		return this.compareWithNumber(r, Operators.lessthanorequal);
	}
	if (Utilities.instance_of(r, XBoolean)) {
		return this.compareWithBoolean(r, Operators.lessthanorequal);
	}
	return this.compareWithNodeSet(r, Operators.lessthanorequal);
};

XNodeSet.prototype.greaterthanorequal = function(r) {
	if (Utilities.instance_of(r, XString)) {
		return this.compareWithNumber(r.number(), Operators.greaterthanorequal);
	}
	if (Utilities.instance_of(r, XNumber)) {
		return this.compareWithNumber(r, Operators.greaterthanorequal);
	}
	if (Utilities.instance_of(r, XBoolean)) {
		return this.compareWithBoolean(r, Operators.greaterthanorequal);
	}
	return this.compareWithNodeSet(r, Operators.greaterthanorequal);
};

XNodeSet.prototype.union = function(r) {
	var ns = new XNodeSet();
	ns.tree = this.tree;
	ns.size = this.size;
	ns.addArray(r.toArray());
	return ns;
};

// XPathNamespace ////////////////////////////////////////////////////////////

XPathNamespace.prototype = new Object();
XPathNamespace.prototype.constructor = XPathNamespace;
XPathNamespace.superclass = Object.prototype;

function XPathNamespace(pre, ns, p) {
	this.isXPathNamespace = true;
	this.ownerDocument = p.ownerDocument;
	this.nodeName = "#namespace";
	this.prefix = pre;
	this.localName = pre;
	this.namespaceURI = ns;
	this.nodeValue = ns;
	this.ownerElement = p;
	this.nodeType = XPathNamespace.XPATH_NAMESPACE_NODE;
}

XPathNamespace.prototype.toString = function() {
	return "{ \"" + this.prefix + "\", \"" + this.namespaceURI + "\" }";
};

// Operators /////////////////////////////////////////////////////////////////

var Operators = new Object();

Operators.equals = function(l, r) {
	return l.equals(r);
};

Operators.notequal = function(l, r) {
	return l.notequal(r);
};

Operators.lessthan = function(l, r) {
	return l.lessthan(r);
};

Operators.greaterthan = function(l, r) {
	return l.greaterthan(r);
};

Operators.lessthanorequal = function(l, r) {
	return l.lessthanorequal(r);
};

Operators.greaterthanorequal = function(l, r) {
	return l.greaterthanorequal(r);
};

// XPathContext //////////////////////////////////////////////////////////////

XPathContext.prototype = new Object();
XPathContext.prototype.constructor = XPathContext;
XPathContext.superclass = Object.prototype;

function XPathContext(vr, nr, fr) {
	this.variableResolver = vr != null ? vr : new VariableResolver();
	this.namespaceResolver = nr != null ? nr : new NamespaceResolver();
	this.functionResolver = fr != null ? fr : new FunctionResolver();
}

// VariableResolver //////////////////////////////////////////////////////////

VariableResolver.prototype = new Object();
VariableResolver.prototype.constructor = VariableResolver;
VariableResolver.superclass = Object.prototype;

function VariableResolver() {
}

VariableResolver.prototype.getVariable = function(vn, c) {
	var parts = Utilities.splitQName(vn);
	if (parts[0] != null) {
		parts[0] = c.namespaceResolver.getNamespace(parts[0], c.expressionContextNode);
        if (parts[0] == null) {
            throw new Error("Cannot resolve QName " + fn);
        }
	}
	return this.getVariableWithName(parts[0], parts[1], c.expressionContextNode);
};

VariableResolver.prototype.getVariableWithName = function(ns, ln, c) {
	return null;
};

// FunctionResolver //////////////////////////////////////////////////////////

FunctionResolver.prototype = new Object();
FunctionResolver.prototype.constructor = FunctionResolver;
FunctionResolver.superclass = Object.prototype;

function FunctionResolver(thisArg) {
	this.thisArg = thisArg != null ? thisArg : Functions;
	this.functions = new Object();
	this.addStandardFunctions();
}

FunctionResolver.prototype.addStandardFunctions = function() {
	this.functions["{}last"] = Functions.last;
	this.functions["{}position"] = Functions.position;
	this.functions["{}count"] = Functions.count;
	this.functions["{}id"] = Functions.id;
	this.functions["{}local-name"] = Functions.localName;
	this.functions["{}namespace-uri"] = Functions.namespaceURI;
	this.functions["{}name"] = Functions.name;
	this.functions["{}string"] = Functions.string;
	this.functions["{}concat"] = Functions.concat;
	this.functions["{}starts-with"] = Functions.startsWith;
	this.functions["{}contains"] = Functions.contains;
	this.functions["{}substring-before"] = Functions.substringBefore;
	this.functions["{}substring-after"] = Functions.substringAfter;
	this.functions["{}substring"] = Functions.substring;
	this.functions["{}string-length"] = Functions.stringLength;
	this.functions["{}normalize-space"] = Functions.normalizeSpace;
	this.functions["{}translate"] = Functions.translate;
	this.functions["{}boolean"] = Functions.boolean_;
	this.functions["{}not"] = Functions.not;
	this.functions["{}true"] = Functions.true_;
	this.functions["{}false"] = Functions.false_;
	this.functions["{}lang"] = Functions.lang;
	this.functions["{}number"] = Functions.number;
	this.functions["{}sum"] = Functions.sum;
	this.functions["{}floor"] = Functions.floor;
	this.functions["{}ceiling"] = Functions.ceiling;
	this.functions["{}round"] = Functions.round;
	this.functions["{}current"] = Functions.current;
	this.functions["{}strs-current-position"] = Functions.strs_current_position;
	this.functions["{}strs-current-last"] = Functions.strs_current_last;
};

FunctionResolver.prototype.addFunction = function(ns, ln, f) {
	this.functions["{" + ns + "}" + ln] = f;
};

FunctionResolver.prototype.getFunction = function(fn, c) {
	var parts = Utilities.resolveQName(fn, c.namespaceResolver, c.contextNode, false);
	if (parts[0] == null) {
		throw new Error("Cannot resolve QName " + fn);
	}
	return this.getFunctionWithName(parts[0], parts[1], c.contextNode);
};

FunctionResolver.prototype.getFunctionWithName = function(ns, ln, c) {
	return this.functions["{" + ns + "}" + ln];
};

// NamespaceResolver /////////////////////////////////////////////////////////

NamespaceResolver.prototype = new Object();
NamespaceResolver.prototype.constructor = NamespaceResolver;
NamespaceResolver.superclass = Object.prototype;

function NamespaceResolver() {
}

NamespaceResolver.prototype.getNamespace = function(prefix, n) {
	if (prefix == "xml") {
		return XPath.XML_NAMESPACE_URI;
	} else if (prefix == "xmlns") {
		return XPath.XMLNS_NAMESPACE_URI;
	}
	if (n.nodeType == 9 /*Node.DOCUMENT_NODE*/) {
		n = n.documentElement;
	} else if (n.nodeType == 2 /*Node.ATTRIBUTE_NODE*/) {
		n = PathExpr.prototype.getOwnerElement(n);
	} else if (n.nodeType != 1 /*Node.ELEMENT_NODE*/) {
		n = n.parentNode;
	}
	while (n != null && n.nodeType == 1 /*Node.ELEMENT_NODE*/) {
		var nnm = n.attributes;
		for (var i = 0; i < nnm.length; i++) {
			var a = nnm.item(i);
			var aname = a.nodeName;
			if (aname == "xmlns" && prefix == ""
					|| aname == "xmlns:" + prefix) {
				return String(a.nodeValue);
			}
		}
		n = n.parentNode;
	}
	return null;
};

// Functions /////////////////////////////////////////////////////////////////

var Functions = new Object();

Functions.last = function() {
	var c = arguments[0];
	if (arguments.length != 1) {
		throw new Error("Function last expects ()");
	}
	return new XNumber(c.contextSize);
};

Functions.position = function() {
	var c = arguments[0];
	if (arguments.length != 1) {
		throw new Error("Function position expects ()");
	}
	return new XNumber(c.contextPosition);
};

Functions.count = function() {
	var c = arguments[0];
	var ns;
	if (arguments.length != 2 || !Utilities.instance_of(ns = arguments[1].evaluate(c), XNodeSet)) {
		throw new Error("Function count expects (node-set)");
	}
	return new XNumber(ns.size);
};

Functions.id = function() {
	var c = arguments[0];
	var id;
	if (arguments.length != 2) {
		throw new Error("Function id expects (object)");
	}
	id = arguments[1].evaluate(c);
	if (Utilities.instance_of(id, XNodeSet)) {
		id = id.toArray().join(" ");
	} else {
		id = id.stringValue();
	}
	var ids = id.split(/[\x0d\x0a\x09\x20]+/);
	var count = 0;
	var ns = new XNodeSet();
	var doc = c.contextNode.nodeType == 9 /*Node.DOCUMENT_NODE*/
			? c.contextNode
			: c.contextNode.ownerDocument;
	for (var i = 0; i < ids.length; i++) {
		var n;
		if (doc.getElementById) {
			n = doc.getElementById(ids[i]);
		} else {
			n = Utilities.getElementById(doc, ids[i]);
		}
		if (n != null) {
			ns.add(n);
			count++;
		}
	}
	return ns;
};

Functions.localName = function() {
	var c = arguments[0];
	var n;
	if (arguments.length == 1) {
		n = c.contextNode;
	} else if (arguments.length == 2) {
		n = arguments[1].evaluate(c).first();
	} else {
		throw new Error("Function local-name expects (node-set?)");
	}
	if (n == null) {
		return new XString("");
	}
	return new XString(n.localName ? n.localName : n.baseName);
};

Functions.namespaceURI = function() {
	var c = arguments[0];
	var n;
	if (arguments.length == 1) {
		n = c.contextNode;
	} else if (arguments.length == 2) {
		n = arguments[1].evaluate(c).first();
	} else {
		throw new Error("Function namespace-uri expects (node-set?)");
	}
	if (n == null) {
		return new XString("");
	}
	return new XString(n.namespaceURI);
};

Functions.name = function() {
	var c = arguments[0];
	var n;
	if (arguments.length == 1) {
		n = c.contextNode;
	} else if (arguments.length == 2) {
		n = arguments[1].evaluate(c).first();
	} else {
		throw new Error("Function name expects (node-set?)");
	}
	if (n == null) {
		return new XString("");
	}
	if (n.nodeType == 1 /*Node.ELEMENT_NODE*/ || n.nodeType == 2 /*Node.ATTRIBUTE_NODE*/) {
		return new XString(n.nodeName);
	} else if (n.localName == null) {
		return new XString("");
	} else {
		return new XString(n.localName);
	}
};

Functions.string = function() {
	var c = arguments[0];
	if (arguments.length == 1) {
		return XNodeSet.prototype.stringForNode(c.contextNode);
	} else if (arguments.length == 2) {
		return arguments[1].evaluate(c).string();
	}
	throw new Error("Function string expects (object?)");
};

Functions.concat = function() {
	var c = arguments[0];
	if (arguments.length < 3) {
		throw new Error("Function concat expects (string, string, string*)");
	}
	var s = "";
	for (var i = 1; i < arguments.length; i++) {
		s += arguments[i].evaluate(c).stringValue();
	}
	return new XString(s);
};

Functions.startsWith = function() {
	var c = arguments[0];
	if (arguments.length != 3) {
		throw new Error("Function startsWith expects (string, string)");
	}
	var s1 = arguments[1].evaluate(c).stringValue();
	var s2 = arguments[2].evaluate(c).stringValue();
	return new XBoolean(s1.substring(0, s2.length) == s2);
};

Functions.contains = function() {
	var c = arguments[0];
	if (arguments.length != 3) {
		throw new Error("Function contains expects (string, string)");
	}
	var s1 = arguments[1].evaluate(c).stringValue();
	var s2 = arguments[2].evaluate(c).stringValue();
	return new XBoolean(s1.indexOf(s2) != -1);
};

Functions.substringBefore = function() {
	var c = arguments[0];
	if (arguments.length != 3) {
		throw new Error("Function substring-before expects (string, string)");
	}
	var s1 = arguments[1].evaluate(c).stringValue();
	var s2 = arguments[2].evaluate(c).stringValue();
	return new XString(s1.substring(0, s1.indexOf(s2)));
};

Functions.substringAfter = function() {
	var c = arguments[0];
	if (arguments.length != 3) {
		throw new Error("Function substring-after expects (string, string)");
	}
	var s1 = arguments[1].evaluate(c).stringValue();
	var s2 = arguments[2].evaluate(c).stringValue();
	if (s2.length == 0) {
		return new XString(s1);
	}
	var i = s1.indexOf(s2);
	if (i == -1) {
		return new XString("");
	}
	return new XString(s1.substring(s1.indexOf(s2) + 1));
};

Functions.substring = function() {
	var c = arguments[0];
	if (!(arguments.length == 3 || arguments.length == 4)) {
		throw new Error("Function substring expects (string, number, number?)");
	}
	var s = arguments[1].evaluate(c).stringValue();
	var n1 = Math.round(arguments[2].evaluate(c).numberValue()) - 1;
	var n2 = arguments.length == 4 ? n1 + Math.round(arguments[3].evaluate(c).numberValue()) : undefined;
	return new XString(s.substring(n1, n2));
};

Functions.stringLength = function() {
	var c = arguments[0];
	var s;
	if (arguments.length == 1) {
		s = XNodeSet.prototype.stringForNode(c.contextNode);
	} else if (arguments.length == 2) {
		s = arguments[1].evaluate(c).stringValue();
	} else {
		throw new Error("Function string-length expects (string?)");
	}
	return new XNumber(s.length);
};

Functions.normalizeSpace = function() {
	var c = arguments[0];
	var s;
	if (arguments.length == 1) {
		s = XNodeSet.prototype.stringForNode(c.contextNode);
	} else if (arguments.length == 2) {
		s = arguments[1].evaluate(c).stringValue();
	} else {
		throw new Error("Function normalize-space expects (string?)");
	}
	var i = 0;
	var j = s.length - 1;
	while (Utilities.isSpace(s.charCodeAt(j))) {
		j--;
	}
	var t = "";
	while (i <= j && Utilities.isSpace(s.charCodeAt(i))) {
		i++;
	}
	while (i <= j) {
		if (Utilities.isSpace(s.charCodeAt(i))) {
			t += " ";
			while (i <= j && Utilities.isSpace(s.charCodeAt(i))) {
				i++;
			}
		} else {
			t += s.charAt(i);
			i++;
		}
	}
	return new XString(t);
};

Functions.translate = function() {
	var c = arguments[0];
	if (arguments.length != 4) {
		throw new Error("Function translate expects (string, string, string)");
	}
	var s1 = arguments[1].evaluate(c).stringValue();
	var s2 = arguments[2].evaluate(c).stringValue();
	var s3 = arguments[3].evaluate(c).stringValue();
	var map = [];
	for (var i = 0; i < s2.length; i++) {
		var j = s2.charCodeAt(i);
		if (map[j] == undefined) {
			var k = i > s3.length ? "" : s3.charAt(i);
			map[j] = k;
		}
	}
	var t = "";
	for (var i = 0; i < s1.length; i++) {
		var c = s1.charCodeAt(i);
		var r = map[c];
		if (r == undefined) {
			t += s1.charAt(i);
		} else {
			t += r;
		}
	}
	return new XString(t);
};

Functions.boolean_ = function() {
	var c = arguments[0];
	if (arguments.length != 2) {
		throw new Error("Function boolean expects (object)");
	}
	return arguments[1].evaluate(c).bool();
};

Functions.not = function() {
	var c = arguments[0];
	if (arguments.length != 2) {
		throw new Error("Function not expects (object)");
	}
	return arguments[1].evaluate(c).bool().not();
};

Functions.true_ = function() {
	if (arguments.length != 1) {
		throw new Error("Function true expects ()");
	}
	return new XBoolean(true);
};

Functions.false_ = function() {
	if (arguments.length != 1) {
		throw new Error("Function false expects ()");
	}
	return new XBoolean(false);
};

Functions.lang = function() {
	var c = arguments[0];
	if (arguments.length != 2) {
		throw new Error("Function lang expects (string)");
	}
	var lang;
	for (var n = c.contextNode; n != null && n.nodeType != 9 /*Node.DOCUMENT_NODE*/; n = n.parentNode) {
		var a = n.getAttributeNS(XPath.XML_NAMESPACE_URI, "lang");
		if (a != null) {
			lang = String(a);
			break;
		}
	}
	if (lang == null) {
		return new XBoolean(false);
	}
	var s = arguments[1].evaluate(c).stringValue();
	return new XBoolean(lang.substring(0, s.length) == s
				&& (lang.length == s.length || lang.charAt(s.length) == '-'));
};

Functions.number = function() {
	var c = arguments[0];
	if (!(arguments.length == 1 || arguments.length == 2)) {
		throw new Error("Function number expects (object?)");
	}
	if (arguments.length == 1) {
		return new XNumber(XNodeSet.prototype.stringForNode(c.contextNode));
	}
	return arguments[1].evaluate(c).number();
};

Functions.sum = function() {
	var c = arguments[0];
	var ns;
	if (arguments.length != 2 || !Utilities.instance_of((ns = arguments[1].evaluate(c)), XNodeSet)) {
		throw new Error("Function sum expects (node-set)");
	}
	ns = ns.toArray();
	var n = 0;
	for (var i = 0; i < ns.length; i++) {
		n += new XNumber(XNodeSet.prototype.stringForNode(ns[i])).numberValue();
	}
	return new XNumber(n);
};

Functions.floor = function() {
	var c = arguments[0];
	if (arguments.length != 2) {
		throw new Error("Function floor expects (number)");
	}
	return new XNumber(Math.floor(arguments[1].evaluate(c).numberValue()));
};

Functions.ceiling = function() {
	var c = arguments[0];
	if (arguments.length != 2) {
		throw new Error("Function ceiling expects (number)");
	}
	return new XNumber(Math.ceil(arguments[1].evaluate(c).numberValue()));
};

Functions.round = function() {
	var c = arguments[0];
	if (arguments.length != 2) {
		throw new Error("Function round expects (number)");
	}
	return new XNumber(Math.round(arguments[1].evaluate(c).numberValue()));
};

Functions.current = function() {
	var c = arguments[0];
	if (arguments.length != 1) {
		throw new Error("Function current expects ()");
	}
	var result = new XNodeSet();
	result.add(c.expressionContextNode);
	return result;
};

Functions.strs_current_position = function() {
	var c = arguments[0];
	if (arguments.length != 1) {
		throw new Error("Function strs-current-position expects ()");
	}
	return new XNumber(c.expressionContextPosition);
};

Functions.strs_current_last = function() {
	var c = arguments[0];
	if (arguments.length != 1) {
		throw new Error("Function strs-current-position expects ()");
	}
	return new XNumber(c.expressionContextSize);
};

// Utilities /////////////////////////////////////////////////////////////////

var Utilities = new Object();

Utilities.splitQName = function(qn) {
	var i = qn.indexOf(":");
	if (i == -1) {
		return [ null, qn ];
	}
	return [ qn.substring(0, i), qn.substring(i + 1) ];
};

Utilities.resolveQName = function(qn, nr, n, useDefault) {
	var parts = Utilities.splitQName(qn);
	if (parts[0] != null) {
		parts[0] = nr.getNamespace(parts[0], n);
	} else {
		if (useDefault) {
			parts[0] = nr.getNamespace("", n);
			if (parts[0] == null) {
				parts[0] = "";
			}
		} else {
			parts[0] = "";
		}
	}
	return parts;
};

Utilities.isSpace = function(c) {
	return c == 0x9 || c == 0xd || c == 0xa || c == 0x20;
};

Utilities.isLetter = function(c) {
	return c >= 0x0041 && c <= 0x005A ||
		c >= 0x0061 && c <= 0x007A ||
		c >= 0x00C0 && c <= 0x00D6 ||
		c >= 0x00D8 && c <= 0x00F6 ||
		c >= 0x00F8 && c <= 0x00FF ||
		c >= 0x0100 && c <= 0x0131 ||
		c >= 0x0134 && c <= 0x013E ||
		c >= 0x0141 && c <= 0x0148 ||
		c >= 0x014A && c <= 0x017E ||
		c >= 0x0180 && c <= 0x01C3 ||
		c >= 0x01CD && c <= 0x01F0 ||
		c >= 0x01F4 && c <= 0x01F5 ||
		c >= 0x01FA && c <= 0x0217 ||
		c >= 0x0250 && c <= 0x02A8 ||
		c >= 0x02BB && c <= 0x02C1 ||
		c == 0x0386 ||
		c >= 0x0388 && c <= 0x038A ||
		c == 0x038C ||
		c >= 0x038E && c <= 0x03A1 ||
		c >= 0x03A3 && c <= 0x03CE ||
		c >= 0x03D0 && c <= 0x03D6 ||
		c == 0x03DA ||
		c == 0x03DC ||
		c == 0x03DE ||
		c == 0x03E0 ||
		c >= 0x03E2 && c <= 0x03F3 ||
		c >= 0x0401 && c <= 0x040C ||
		c >= 0x040E && c <= 0x044F ||
		c >= 0x0451 && c <= 0x045C ||
		c >= 0x045E && c <= 0x0481 ||
		c >= 0x0490 && c <= 0x04C4 ||
		c >= 0x04C7 && c <= 0x04C8 ||
		c >= 0x04CB && c <= 0x04CC ||
		c >= 0x04D0 && c <= 0x04EB ||
		c >= 0x04EE && c <= 0x04F5 ||
		c >= 0x04F8 && c <= 0x04F9 ||
		c >= 0x0531 && c <= 0x0556 ||
		c == 0x0559 ||
		c >= 0x0561 && c <= 0x0586 ||
		c >= 0x05D0 && c <= 0x05EA ||
		c >= 0x05F0 && c <= 0x05F2 ||
		c >= 0x0621 && c <= 0x063A ||
		c >= 0x0641 && c <= 0x064A ||
		c >= 0x0671 && c <= 0x06B7 ||
		c >= 0x06BA && c <= 0x06BE ||
		c >= 0x06C0 && c <= 0x06CE ||
		c >= 0x06D0 && c <= 0x06D3 ||
		c == 0x06D5 ||
		c >= 0x06E5 && c <= 0x06E6 ||
		c >= 0x0905 && c <= 0x0939 ||
		c == 0x093D ||
		c >= 0x0958 && c <= 0x0961 ||
		c >= 0x0985 && c <= 0x098C ||
		c >= 0x098F && c <= 0x0990 ||
		c >= 0x0993 && c <= 0x09A8 ||
		c >= 0x09AA && c <= 0x09B0 ||
		c == 0x09B2 ||
		c >= 0x09B6 && c <= 0x09B9 ||
		c >= 0x09DC && c <= 0x09DD ||
		c >= 0x09DF && c <= 0x09E1 ||
		c >= 0x09F0 && c <= 0x09F1 ||
		c >= 0x0A05 && c <= 0x0A0A ||
		c >= 0x0A0F && c <= 0x0A10 ||
		c >= 0x0A13 && c <= 0x0A28 ||
		c >= 0x0A2A && c <= 0x0A30 ||
		c >= 0x0A32 && c <= 0x0A33 ||
		c >= 0x0A35 && c <= 0x0A36 ||
		c >= 0x0A38 && c <= 0x0A39 ||
		c >= 0x0A59 && c <= 0x0A5C ||
		c == 0x0A5E ||
		c >= 0x0A72 && c <= 0x0A74 ||
		c >= 0x0A85 && c <= 0x0A8B ||
		c == 0x0A8D ||
		c >= 0x0A8F && c <= 0x0A91 ||
		c >= 0x0A93 && c <= 0x0AA8 ||
		c >= 0x0AAA && c <= 0x0AB0 ||
		c >= 0x0AB2 && c <= 0x0AB3 ||
		c >= 0x0AB5 && c <= 0x0AB9 ||
		c == 0x0ABD ||
		c == 0x0AE0 ||
		c >= 0x0B05 && c <= 0x0B0C ||
		c >= 0x0B0F && c <= 0x0B10 ||
		c >= 0x0B13 && c <= 0x0B28 ||
		c >= 0x0B2A && c <= 0x0B30 ||
		c >= 0x0B32 && c <= 0x0B33 ||
		c >= 0x0B36 && c <= 0x0B39 ||
		c == 0x0B3D ||
		c >= 0x0B5C && c <= 0x0B5D ||
		c >= 0x0B5F && c <= 0x0B61 ||
		c >= 0x0B85 && c <= 0x0B8A ||
		c >= 0x0B8E && c <= 0x0B90 ||
		c >= 0x0B92 && c <= 0x0B95 ||
		c >= 0x0B99 && c <= 0x0B9A ||
		c == 0x0B9C ||
		c >= 0x0B9E && c <= 0x0B9F ||
		c >= 0x0BA3 && c <= 0x0BA4 ||
		c >= 0x0BA8 && c <= 0x0BAA ||
		c >= 0x0BAE && c <= 0x0BB5 ||
		c >= 0x0BB7 && c <= 0x0BB9 ||
		c >= 0x0C05 && c <= 0x0C0C ||
		c >= 0x0C0E && c <= 0x0C10 ||
		c >= 0x0C12 && c <= 0x0C28 ||
		c >= 0x0C2A && c <= 0x0C33 ||
		c >= 0x0C35 && c <= 0x0C39 ||
		c >= 0x0C60 && c <= 0x0C61 ||
		c >= 0x0C85 && c <= 0x0C8C ||
		c >= 0x0C8E && c <= 0x0C90 ||
		c >= 0x0C92 && c <= 0x0CA8 ||
		c >= 0x0CAA && c <= 0x0CB3 ||
		c >= 0x0CB5 && c <= 0x0CB9 ||
		c == 0x0CDE ||
		c >= 0x0CE0 && c <= 0x0CE1 ||
		c >= 0x0D05 && c <= 0x0D0C ||
		c >= 0x0D0E && c <= 0x0D10 ||
		c >= 0x0D12 && c <= 0x0D28 ||
		c >= 0x0D2A && c <= 0x0D39 ||
		c >= 0x0D60 && c <= 0x0D61 ||
		c >= 0x0E01 && c <= 0x0E2E ||
		c == 0x0E30 ||
		c >= 0x0E32 && c <= 0x0E33 ||
		c >= 0x0E40 && c <= 0x0E45 ||
		c >= 0x0E81 && c <= 0x0E82 ||
		c == 0x0E84 ||
		c >= 0x0E87 && c <= 0x0E88 ||
		c == 0x0E8A ||
		c == 0x0E8D ||
		c >= 0x0E94 && c <= 0x0E97 ||
		c >= 0x0E99 && c <= 0x0E9F ||
		c >= 0x0EA1 && c <= 0x0EA3 ||
		c == 0x0EA5 ||
		c == 0x0EA7 ||
		c >= 0x0EAA && c <= 0x0EAB ||
		c >= 0x0EAD && c <= 0x0EAE ||
		c == 0x0EB0 ||
		c >= 0x0EB2 && c <= 0x0EB3 ||
		c == 0x0EBD ||
		c >= 0x0EC0 && c <= 0x0EC4 ||
		c >= 0x0F40 && c <= 0x0F47 ||
		c >= 0x0F49 && c <= 0x0F69 ||
		c >= 0x10A0 && c <= 0x10C5 ||
		c >= 0x10D0 && c <= 0x10F6 ||
		c == 0x1100 ||
		c >= 0x1102 && c <= 0x1103 ||
		c >= 0x1105 && c <= 0x1107 ||
		c == 0x1109 ||
		c >= 0x110B && c <= 0x110C ||
		c >= 0x110E && c <= 0x1112 ||
		c == 0x113C ||
		c == 0x113E ||
		c == 0x1140 ||
		c == 0x114C ||
		c == 0x114E ||
		c == 0x1150 ||
		c >= 0x1154 && c <= 0x1155 ||
		c == 0x1159 ||
		c >= 0x115F && c <= 0x1161 ||
		c == 0x1163 ||
		c == 0x1165 ||
		c == 0x1167 ||
		c == 0x1169 ||
		c >= 0x116D && c <= 0x116E ||
		c >= 0x1172 && c <= 0x1173 ||
		c == 0x1175 ||
		c == 0x119E ||
		c == 0x11A8 ||
		c == 0x11AB ||
		c >= 0x11AE && c <= 0x11AF ||
		c >= 0x11B7 && c <= 0x11B8 ||
		c == 0x11BA ||
		c >= 0x11BC && c <= 0x11C2 ||
		c == 0x11EB ||
		c == 0x11F0 ||
		c == 0x11F9 ||
		c >= 0x1E00 && c <= 0x1E9B ||
		c >= 0x1EA0 && c <= 0x1EF9 ||
		c >= 0x1F00 && c <= 0x1F15 ||
		c >= 0x1F18 && c <= 0x1F1D ||
		c >= 0x1F20 && c <= 0x1F45 ||
		c >= 0x1F48 && c <= 0x1F4D ||
		c >= 0x1F50 && c <= 0x1F57 ||
		c == 0x1F59 ||
		c == 0x1F5B ||
		c == 0x1F5D ||
		c >= 0x1F5F && c <= 0x1F7D ||
		c >= 0x1F80 && c <= 0x1FB4 ||
		c >= 0x1FB6 && c <= 0x1FBC ||
		c == 0x1FBE ||
		c >= 0x1FC2 && c <= 0x1FC4 ||
		c >= 0x1FC6 && c <= 0x1FCC ||
		c >= 0x1FD0 && c <= 0x1FD3 ||
		c >= 0x1FD6 && c <= 0x1FDB ||
		c >= 0x1FE0 && c <= 0x1FEC ||
		c >= 0x1FF2 && c <= 0x1FF4 ||
		c >= 0x1FF6 && c <= 0x1FFC ||
		c == 0x2126 ||
		c >= 0x212A && c <= 0x212B ||
		c == 0x212E ||
		c >= 0x2180 && c <= 0x2182 ||
		c >= 0x3041 && c <= 0x3094 ||
		c >= 0x30A1 && c <= 0x30FA ||
		c >= 0x3105 && c <= 0x312C ||
		c >= 0xAC00 && c <= 0xD7A3 ||
		c >= 0x4E00 && c <= 0x9FA5 ||
		c == 0x3007 ||
		c >= 0x3021 && c <= 0x3029;
};

Utilities.isNCNameChar = function(c) {
	return c >= 0x0030 && c <= 0x0039 
		|| c >= 0x0660 && c <= 0x0669 
		|| c >= 0x06F0 && c <= 0x06F9 
		|| c >= 0x0966 && c <= 0x096F 
		|| c >= 0x09E6 && c <= 0x09EF 
		|| c >= 0x0A66 && c <= 0x0A6F 
		|| c >= 0x0AE6 && c <= 0x0AEF 
		|| c >= 0x0B66 && c <= 0x0B6F 
		|| c >= 0x0BE7 && c <= 0x0BEF 
		|| c >= 0x0C66 && c <= 0x0C6F 
		|| c >= 0x0CE6 && c <= 0x0CEF 
		|| c >= 0x0D66 && c <= 0x0D6F 
		|| c >= 0x0E50 && c <= 0x0E59 
		|| c >= 0x0ED0 && c <= 0x0ED9 
		|| c >= 0x0F20 && c <= 0x0F29
		|| c == 0x002E
		|| c == 0x002D
		|| c == 0x005F
		|| Utilities.isLetter(c)
		|| c >= 0x0300 && c <= 0x0345 
		|| c >= 0x0360 && c <= 0x0361 
		|| c >= 0x0483 && c <= 0x0486 
		|| c >= 0x0591 && c <= 0x05A1 
		|| c >= 0x05A3 && c <= 0x05B9 
		|| c >= 0x05BB && c <= 0x05BD 
		|| c == 0x05BF 
		|| c >= 0x05C1 && c <= 0x05C2 
		|| c == 0x05C4 
		|| c >= 0x064B && c <= 0x0652 
		|| c == 0x0670 
		|| c >= 0x06D6 && c <= 0x06DC 
		|| c >= 0x06DD && c <= 0x06DF 
		|| c >= 0x06E0 && c <= 0x06E4 
		|| c >= 0x06E7 && c <= 0x06E8 
		|| c >= 0x06EA && c <= 0x06ED 
		|| c >= 0x0901 && c <= 0x0903 
		|| c == 0x093C 
		|| c >= 0x093E && c <= 0x094C 
		|| c == 0x094D 
		|| c >= 0x0951 && c <= 0x0954 
		|| c >= 0x0962 && c <= 0x0963 
		|| c >= 0x0981 && c <= 0x0983 
		|| c == 0x09BC 
		|| c == 0x09BE 
		|| c == 0x09BF 
		|| c >= 0x09C0 && c <= 0x09C4 
		|| c >= 0x09C7 && c <= 0x09C8 
		|| c >= 0x09CB && c <= 0x09CD 
		|| c == 0x09D7 
		|| c >= 0x09E2 && c <= 0x09E3 
		|| c == 0x0A02 
		|| c == 0x0A3C 
		|| c == 0x0A3E 
		|| c == 0x0A3F 
		|| c >= 0x0A40 && c <= 0x0A42 
		|| c >= 0x0A47 && c <= 0x0A48 
		|| c >= 0x0A4B && c <= 0x0A4D 
		|| c >= 0x0A70 && c <= 0x0A71 
		|| c >= 0x0A81 && c <= 0x0A83 
		|| c == 0x0ABC 
		|| c >= 0x0ABE && c <= 0x0AC5 
		|| c >= 0x0AC7 && c <= 0x0AC9 
		|| c >= 0x0ACB && c <= 0x0ACD 
		|| c >= 0x0B01 && c <= 0x0B03 
		|| c == 0x0B3C 
		|| c >= 0x0B3E && c <= 0x0B43 
		|| c >= 0x0B47 && c <= 0x0B48 
		|| c >= 0x0B4B && c <= 0x0B4D 
		|| c >= 0x0B56 && c <= 0x0B57 
		|| c >= 0x0B82 && c <= 0x0B83 
		|| c >= 0x0BBE && c <= 0x0BC2 
		|| c >= 0x0BC6 && c <= 0x0BC8 
		|| c >= 0x0BCA && c <= 0x0BCD 
		|| c == 0x0BD7 
		|| c >= 0x0C01 && c <= 0x0C03 
		|| c >= 0x0C3E && c <= 0x0C44 
		|| c >= 0x0C46 && c <= 0x0C48 
		|| c >= 0x0C4A && c <= 0x0C4D 
		|| c >= 0x0C55 && c <= 0x0C56 
		|| c >= 0x0C82 && c <= 0x0C83 
		|| c >= 0x0CBE && c <= 0x0CC4 
		|| c >= 0x0CC6 && c <= 0x0CC8 
		|| c >= 0x0CCA && c <= 0x0CCD 
		|| c >= 0x0CD5 && c <= 0x0CD6 
		|| c >= 0x0D02 && c <= 0x0D03 
		|| c >= 0x0D3E && c <= 0x0D43 
		|| c >= 0x0D46 && c <= 0x0D48 
		|| c >= 0x0D4A && c <= 0x0D4D 
		|| c == 0x0D57 
		|| c == 0x0E31 
		|| c >= 0x0E34 && c <= 0x0E3A 
		|| c >= 0x0E47 && c <= 0x0E4E 
		|| c == 0x0EB1 
		|| c >= 0x0EB4 && c <= 0x0EB9 
		|| c >= 0x0EBB && c <= 0x0EBC 
		|| c >= 0x0EC8 && c <= 0x0ECD 
		|| c >= 0x0F18 && c <= 0x0F19 
		|| c == 0x0F35 
		|| c == 0x0F37 
		|| c == 0x0F39 
		|| c == 0x0F3E 
		|| c == 0x0F3F 
		|| c >= 0x0F71 && c <= 0x0F84 
		|| c >= 0x0F86 && c <= 0x0F8B 
		|| c >= 0x0F90 && c <= 0x0F95 
		|| c == 0x0F97 
		|| c >= 0x0F99 && c <= 0x0FAD 
		|| c >= 0x0FB1 && c <= 0x0FB7 
		|| c == 0x0FB9 
		|| c >= 0x20D0 && c <= 0x20DC 
		|| c == 0x20E1 
		|| c >= 0x302A && c <= 0x302F 
		|| c == 0x3099 
		|| c == 0x309A
		|| c == 0x00B7 
		|| c == 0x02D0 
		|| c == 0x02D1 
		|| c == 0x0387 
		|| c == 0x0640 
		|| c == 0x0E46 
		|| c == 0x0EC6 
		|| c == 0x3005 
		|| c >= 0x3031 && c <= 0x3035 
		|| c >= 0x309D && c <= 0x309E 
		|| c >= 0x30FC && c <= 0x30FE;
};

Utilities.coalesceText = function(n) {
	for (var m = n.firstChild; m != null; m = m.nextSibling) {
		if (m.nodeType == 3 /*Node.TEXT_NODE*/ || m.nodeType == 4 /*Node.CDATA_SECTION_NODE*/) {
			var s = m.nodeValue;
			var first = m;
			m = m.nextSibling;
			while (m != null && (m.nodeType == 3 /*Node.TEXT_NODE*/ || m.nodeType == 4 /*Node.CDATA_SECTION_NODE*/)) {
				s += m.nodeValue;
				var del = m;
				m = m.nextSibling;
				del.parentNode.removeChild(del);
			}
			if (first.nodeType == 4 /*Node.CDATA_SECTION_NODE*/) {
				var p = first.parentNode;
				if (first.nextSibling == null) {
					p.removeChild(first);
					p.appendChild(p.ownerDocument.createTextNode(s));
				} else {
					var next = first.nextSibling;
					p.removeChild(first);
					p.insertBefore(p.ownerDocument.createTextNode(s), next);
				}
			} else {
				first.nodeValue = s;
			}
			if (m == null) {
				break;
			}
		} else if (m.nodeType == 1 /*Node.ELEMENT_NODE*/) {
			Utilities.coalesceText(m);
		}
	}
};

Utilities.instance_of = function(o, c) {
	while (o != null) {
		if (o.constructor === c) {
			return true;
		}
		if (o === Object) {
			return false;
		}
		o = o.constructor.superclass;
	}
	return false;
};

Utilities.getElementById = function(n, id) {
	// Note that this does not check the DTD to check for actual
	// attributes of type ID, so this may be a bit wrong.
	if (n.nodeType == 1 /*Node.ELEMENT_NODE*/) {
		if (n.getAttribute("id") == id
				|| n.getAttributeNS(null, "id") == id) {
			return n;
		}
	}
	for (var m = n.firstChild; m != null; m = m.nextSibling) {
		var res = Utilities.getElementById(m, id);
		if (res != null) {
			return res;
		}
	}
	return null;
};

// XPathException ////////////////////////////////////////////////////////////

XPathException.prototype = {};
XPathException.prototype.constructor = XPathException;
XPathException.superclass = Object.prototype;

function XPathException(c, e) {
	this.code = c;
	this.exception = e;
}

XPathException.prototype.toString = function() {
	var msg = this.exception ? ": " + this.exception.toString() : "";
	switch (this.code) {
		case XPathException.INVALID_EXPRESSION_ERR:
			return "Invalid expression" + msg;
		case XPathException.TYPE_ERR:
			return "Type error" + msg;
	}
};

XPathException.INVALID_EXPRESSION_ERR = 51;
XPathException.TYPE_ERR = 52;

// XPathExpression ///////////////////////////////////////////////////////////

XPathExpression.prototype = {};
XPathExpression.prototype.constructor = XPathExpression;
XPathExpression.superclass = Object.prototype;

function XPathExpression(e, r, p) {
	this.xpath = p.parse(e);
	this.context = new XPathContext();
	this.context.namespaceResolver = new XPathNSResolverWrapper(r);
}

XPathExpression.prototype.evaluate = function(n, t) {
	this.context.expressionContextNode = n;
	this.context.expressionContextSize = 1;
	this.context.expressionContextPosition = 1;
	var result = this.xpath.evaluate(this.context);
	return new XPathResult(result, t);
}

// XPathNSResolverWrapper ////////////////////////////////////////////////////

XPathNSResolverWrapper.prototype = {};
XPathNSResolverWrapper.prototype.constructor = XPathNSResolverWrapper;
XPathNSResolverWrapper.superclass = Object.prototype;

function XPathNSResolverWrapper(r) {
	this.xpathNSResolver = r;
}

XPathNSResolverWrapper.prototype.getNamespace = function(prefix, n) {
    if (this.xpathNSResolver == null) {
        return null;
    }
	return this.xpathNSResolver.lookupNamespaceURI(prefix);
};

// NodeXPathNSResolver ///////////////////////////////////////////////////////

NodeXPathNSResolver.prototype = {};
NodeXPathNSResolver.prototype.constructor = NodeXPathNSResolver;
NodeXPathNSResolver.superclass = Object.prototype;

function NodeXPathNSResolver(n) {
	this.node = n;
	this.namespaceResolver = new NamespaceResolver();
}

NodeXPathNSResolver.prototype.lookupNamespaceURI = function(prefix) {
	return this.namespaceResolver.getNamespace(prefix, this.node);
};

// XPathResult ///////////////////////////////////////////////////////////////

XPathResult.prototype = {};
XPathResult.prototype.constructor = XPathResult;
XPathResult.superclass = Object.prototype;

function XPathResult(v, t) {
	if (t == XPathResult.ANY_TYPE) {
		if (v.constructor === XString) {
			t = XPathResult.STRING_TYPE;
		} else if (v.constructor === XNumber) {
			t = XPathResult.NUMBER_TYPE;
		} else if (v.constructor === XBoolean) {
			t = XPathResult.BOOLEAN_TYPE;
		} else if (v.constructor === XNodeSet) {
			t = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;
		}
	}
	this.resultType = t;
	switch (t) {
		case XPathResult.NUMBER_TYPE:
			this.numberValue = v.numberValue();
			return;
		case XPathResult.STRING_TYPE:
			this.stringValue = v.stringValue();
			return;
		case XPathResult.BOOLEAN_TYPE:
			this.booleanValue = v.booleanValue();
			return;
		case XPathResult.ANY_UNORDERED_NODE_TYPE:
		case XPathResult.FIRST_ORDERED_NODE_TYPE:
			if (v.constructor === XNodeSet) {
				this.singleNodeValue = v.first();
				return;
			}
			break;
		case XPathResult.UNORDERED_NODE_ITERATOR_TYPE:
		case XPathResult.ORDERED_NODE_ITERATOR_TYPE:
			if (v.constructor === XNodeSet) {
				this.invalidIteratorState = false;
				this.nodes = v.toArray();
				this.iteratorIndex = 0;
				return;
			}
			break;
		case XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE:
		case XPathResult.ORDERED_NODE_SNAPSHOT_TYPE:
			if (v.constructor === XNodeSet) {
				this.nodes = v.toArray();
				this.snapshotLength = this.nodes.length;
				return;
			}
			break;
	}
	throw new XPathException(XPathException.TYPE_ERR);
};

XPathResult.prototype.iterateNext = function() {
	if (this.resultType != XPathResult.UNORDERED_NODE_ITERATOR_TYPE
			&& this.resultType != XPathResult.ORDERED_NODE_ITERATOR_TYPE) {
		throw new XPathException(XPathException.TYPE_ERR);
	}
	return this.nodes[this.iteratorIndex++];
};

XPathResult.prototype.snapshotItem = function(i) {
	if (this.resultType != XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE
			&& this.resultType != XPathResult.ORDERED_NODE_SNAPSHOT_TYPE) {
		throw new XPathException(XPathException.TYPE_ERR);
	}
	return this.nodes[i];
};

XPathResult.ANY_TYPE = 0;
XPathResult.NUMBER_TYPE = 1;
XPathResult.STRING_TYPE = 2;
XPathResult.BOOLEAN_TYPE = 3;
XPathResult.UNORDERED_NODE_ITERATOR_TYPE = 4;
XPathResult.ORDERED_NODE_ITERATOR_TYPE = 5;
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE = 6;
XPathResult.ORDERED_NODE_SNAPSHOT_TYPE = 7;
XPathResult.ANY_UNORDERED_NODE_TYPE = 8;
XPathResult.FIRST_ORDERED_NODE_TYPE = 9;

// DOM 3 XPath support ///////////////////////////////////////////////////////

function installDOM3XPathSupport(doc, p) {
	doc.createExpression = function(e, r) {
		try {
			return new XPathExpression(e, r, p);
		} catch (e) {
			throw new XPathException(XPathException.INVALID_EXPRESSION_ERR, e);
		}
	};
	doc.createNSResolver = function(n) {
		return new NodeXPathNSResolver(n);
	};
	doc.evaluate = function(e, cn, r, t, res) {
		if (t < 0 || t > 9) {
			throw { code: 0, toString: function() { return "Request type not supported"; } };
		}
        return doc.createExpression(e, r, p).evaluate(cn, t, res);
	};
};

// ---------------------------------------------------------------------------

// Install DOM 3 XPath support for the current document.
try {
	var shouldInstall = true;
	try {
		if (document.implementation
				&& document.implementation.hasFeature
				&& document.implementation.hasFeature("XPath", null)) {
			shouldInstall = false;
		}
	} catch (e) {
	}
	if (shouldInstall) {
		installDOM3XPathSupport(document, new XPathParser());
	}
} catch (e) {
}


function SelectNodes(doc, xpath)
{
	var parser = new XPathParser();
	var xpath = parser.parse(xpath);
	var context = new XPathContext();
	if (doc.contextNode) {
		var node = doc.contextNode;
	} else {
		var node = doc;
	}
	if(node.documentElement){
		context.expressionContextNode = node.documentElement;
	} else {
		context.expressionContextNode = node;
	}
	if (doc.contextSize) {
		context.expressionContextSize = doc.contextSize;
	} else {
		context.expressionContextSize = 1;
	}
	if (doc.contextPosition) {
		context.expressionContextPosition = doc.contextPosition;
	} else {
		context.expressionContextPosition = 1;
	}
	var res = xpath.evaluate(context)

	if (Utilities.instance_of(res, XString)) {
		return res.toString();
	}
	if (Utilities.instance_of(res, XNumber)) {
		return res.num;
	}
	if (Utilities.instance_of(res, XBoolean)) {
		return res.b;
	}
	if (Utilities.instance_of(res, XNodeSet)) {
		return res.toArray();
	}
    throw new Error("Unknown result type");
}

module.exports = SelectNodes;

},{}]},{},[]);
