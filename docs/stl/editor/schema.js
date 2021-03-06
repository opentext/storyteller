var g_stl_schema = {};

function xmlEscapeText(str) {
    return String(str)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');
};

function xmlEscapeAttr(str) {
    return String(str)
		.replace(/&/g, '&amp;')
		.replace(/'/g, '&apos;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');
};

function xmlUnEscape(str) {
    return String(str)
		.replace(/&amp;/g, '&')
		.replace(/@apos;/g, "'")
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>');
};

function sort_unique(arr) {
    return arr.sort().filter(function(el,i,a) {
        return (i==a.indexOf(el));
    });
}

function setOrCreateAttribute(jsElement, name, value) {
    var attr = jsElement.getAttribute(name);
    if (attr)
        attr.value = value;
    else
        jsElement.attributes.push({type: "attribute", name: name, value: value, parent: () => js});
}

function findAncestor(js, name) {
    js = js.parent();
    while(js && js.name !== name)
        js = js.parent();
    return js;
}

function findDescendants(js, name, result) {
	result = result || [];
    js.children.forEach(function (child) {
        if (child.type === 'element') {
		    if (child.name === name) 
                result.push(child);
            findDescendants(child, name, result);
	    }
    });
	return result;
};


function jsContent(js) {
    var values = [];
    js.children.forEach(function (child) {
        if (child.type === 'element')
            throw new Error('Custom serialization not supported for mixed elements ('+js.name+').');
        values.push(child.value);
    });
    return values.join();
}

function jsNormalize(js, indent) {
    var tags = [];
        
    if (indent === undefined)
        indent = '\\t';

    function _normalize_space(str, left_trim, right_trim) {
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

    function _normalize(js, depth, previous, next) {
        if (js.type === 'element' && js.children.length) {
            tags.push(js.name);
            var normalizer = detectNormalizer(js);
            if (normalizer) {
                var content = jsContent(js);
                content = normalizer(content);
                js.children = [{type: 'text', value: content, htmlID: '', parent: function(){return js} }];
            } else {
                js.children.forEach( (child, i, children) => _normalize(child, depth+1, children[i-1], children[i+1]) );
                js.children = js.children.filter( (child) => child.value !== '' );
            }
            tags.pop();
        }
        else if (js.type === 'text') {
            if (tags.some((name) => name === 'stl:p' || name === 'body')) {
                // we cannot fully trim inside a story
                var left_trim = !previous || previous.type !== 'element';
                var right_trim = !next || next.type !== 'element';
                js.value = _normalize_space(js.value, left_trim, right_trim);
            } else {
                js.value = js.value.trim();
            }
            if (indent) {
                var indentation = new RegExp('\\n'+indent+'{'+depth+'}', 'gm');
                js.value = js.value.replace(indentation, '\n');
            }
        }
    }
    _normalize(js, 0);
}

function jsPrettify(js, skipRoot, indent, limit) {
    limit = limit || 60;

    function _indent_text(text, indentation) {
        var lines = text.split('\n');
        lines = lines.map( (line) => indentation+line );
        return lines.join('');
    }

    function _append(children, content, jsParent) {
        var last = children.length ? children[children.length-1] : null;
        if (last && last.type === 'text')
            last.value += content;
        else
            children.push({type: "text", value: content, htmlID: '', parent: function(){return js} });
    }

    function _indent_children(js, indentation) {
        var children = [];
        js.children.forEach( function(child) {
            if (child.type === 'element')
                _append(children, indentation, js);
            children.push(child);
            _indent( child, indentation );
        });
        return children;
    }

    function _trim_content(children) {
        if (children.length === 1) {
            var child = children[children.length-1];
            if (child.type === 'text' && child.value.length <= limit)
                child.value = child.value.trim();
        }
    }

    function _indent(js, indentation) {
        if (js.type === 'element') {
            var children = [];
            var normalizer = detectNormalizer(js);
            if (normalizer) {
                var content = jsContent(js);
                content = normalizer(content);
                content = _indent_text(content, indentation+indent);
                _append(children, content, js);
            } else {
                children = _indent_children(js, indentation+indent);
            }
            _append(children, indentation, js);
            if (indentation !== '\n')
                _trim_content(children);
            js.children = children;
        }
        else if (js.type === 'text') {
            var value = js.value.trim();
            if (value)
                js.value = _indent_text(value, indentation);
        }
    }
    indent = indent || '\t';
    if (skipRoot)
        _indent_children(js, '\n');
    else
        _indent(js, '\n');
}

function js2xml(js, schema, skipRoot) {
    var types = schema ? schema.elements: {};
    var nsmap = schema ? schema.namespaces : null;
        
    function make_writer() {
        var xml = '';
        var namespaces = {};
        var depth = -1;
        // temporary buffers
        var root = '';;
        var buf = '';

        function ns( name ) {
            name = name.split(':');
            if (name.length > 1) {
                var prefix = 'xmlns:'+name[0];
                if (!namespaces[prefix]) {
                    var uri = nsmap[prefix];
                    namespaces[prefix] = uri;
                }
            }
        }

        function flush(name) {
            if (!depth) {
                if (!name || !root) // document start or empty document
                    root += buf;
                if (name) { // document end
                    Object.keys(namespaces).forEach(function (prefix) {
	                    root +=" "+prefix+"='"+namespaces[prefix]+"'";
                    });
                    xml = root+'>'+xml+'</'+name+'>';
                    root = '';
                }
            } else {
                if (buf)
                    xml += name ? buf+'/>' : buf+'>';
                else if (name)
                    xml += '</'+name+'>';
            }
            //console.log('depth:', depth, 'name:', name, 'buf:', buf, 'root:', root, 'xml:', xml);
            buf = '';
        }
        function start(name) {
            flush();
            buf = '<'+name;
            ns(name);
            depth += 1;
        }
        function attr(name, value) {
		    buf +=" "+name+"='"+xmlEscapeAttr(value)+"'";
        }
        function text(data) {
            flush();
            xml += xmlEscapeText(data);
        }
        function raw(rawdata) {
            flush();
            xml += rawdata;
        }
        function end(name) {
            flush(name);
            depth -= 1;
        }
        function get() {
            return xml;
        }
        return { start: start, attr: attr, text: text, raw: raw, end: end, get: get };
    }

    function outerXML(js, writer) {
        writer.start(js.name);
	    js.attributes.forEach(function(att) {
		    writer.attr(att.name, att.value);
	    });
        innerXML(js, writer);
        writer.end(js.name);
    }

    function innerXML(js, writer) {
        var type = types[js.name];
        var fnNext = (type && type.serializer)
            ? (js) => writer.raw(type.serializer(js, schema))
            : (js) => outerXML(js, writer);
	    js.children.forEach(function(child) {
		    if(child.type === "text" && child.value) 
                writer.text(child.value); //text node
		    else if(child.type === "element") 
                fnNext(child); //element node
	    });
    }

    var writer = make_writer();
    if (skipRoot)
        innerXML(js, writer);
    else
        outerXML(js, writer);
    return writer.get();
}

function collectAttrs(jsElement) {
    var attrs = {};
    jsElement.attributes.forEach(function (attr) {
        attrs[attr.name] = attr.value;
    });
    return attrs;
}

function xml2js(markup, jsParent) {
    markup = XonomyBuilder.xml(jsParent.name, collectAttrs(jsParent), markup, g_stl_schema.namespaces);
    return Xonomy.xml2js(markup, jsParent);
}

function elementValidator(def, schema) {
    function _validateChildren(jsElement, allowedElems) {
        jsElement.children.forEach(function (child) {
            if (child.type === 'element') {
                if (child.name !== 'xp:include') {
                    var allowed = allowedElems.filter( (el) => !el.condition || el.condition(jsElement) ).map( (el) => el.name );
                    if (allowed.indexOf(child.name) === -1)
                        Xonomy.warnings.push({ htmlID: child.htmlID, 
                                               text: "Unexpected element (allowed: "+allowed.join(', ')+")."});
                }
            }
        });
    }

    function _validateAttrs(jsElement, allowedAttrs) {
        jsElement.attributes.forEach(function (jsAttribute) {
            var allowed = allowedAttrs.filter( (attr) => !attr.condition || attr.condition(jsElement) ).map( (attr) => attr.name );
            if (allowed.indexOf(jsAttribute.name) === -1)
                Xonomy.warnings.push({ htmlID: jsAttribute.htmlID, 
                                       text: "Unexpected attribute (allowed: "+allowed.join(', ')+")."});
        });
        var missing = [];
        allowedAttrs.forEach(function(attr) {
            if (attr.mandatory && !jsElement.getAttribute(attr.name)) {
                if (!attr.condition || attr.condition(jsElement))
                    missing.push(attr.name);
            }
        });
        if (missing.length)
            Xonomy.warnings.push({ htmlID: jsElement.htmlID, text: "Missing mandatory attributes: "+missing.join(', ')+"."});
    }

    function _attr_name( attr ) {
        return XonomyBuilder.isString(attr) ? attr : attr.name;
    }

    var validators = [];
    if (def.validate)
        validators.push(def.validate);

    if (def.attrs) {
        var all = def.attrs.map( (attr) => XonomyBuilder.isString(attr) ? {name: attr} : attr );
        validators.push( (jsElement) => _validateAttrs(jsElement, all) );
    }
    
    if (def.children !== null || def.wrappers) {
        var tags = [];
        if (def.children)
            tags = def.children.map( (el) => XonomyBuilder.isString(el) ? {name: el} : el );
        if (def.wrappers)
            tags = tags.concat(def.wrappers.map( (el) => XonomyBuilder.isString(el) ? {name: el} : el ));
        validators.push((jsElement) => _validateChildren(jsElement, tags) );
    }

    if (validators.length > 1)
        return (jsElement) => validators.forEach( (validator) => validator(jsElement) ); 
	return validators.length 
        ? validators[0] 
        : function() {};
}

function initAce(mode, id, onChange) {
    var editor = window.ace.edit(id);
    editor.setTheme("ace/theme/chrome");
    editor.setOptions({
        mode: "ace/mode/"+mode,
        tabSize: 2,
        useSoftTabs: true,
        autoScrollEditorIntoView: true,
        minLines: 10,
        maxLines: 50,
    });
    editor.$blockScrolling = Infinity;
    editor.getSession().on('changeAnnotation', function(results) {
        const hasErrors = editor.getSession().getAnnotations().some((annotation) => annotation.type === 'error');
        onChange(!hasErrors);
    });
    
    return function(input) {
        editor.setValue(input);
        editor.focus();

        return function () {
            
            var output = editor.getSession().getValue();
            editor.destroy();
            return output;
        };
    };
}

function initFabric(mode, id) {

    return function(input) {
        var ctx = null;
        fabric.loadSVGFromString(input, function(objects, options) {
            var box = document.getElementById(id);
            box.style.width = '100%';
            var canvas = document.createElement("canvas");
            box.appendChild(canvas);    
            ctx = new fabric.Canvas(canvas, options);
            //objects = [fabric.util.groupSVGElements(objects, options)];
            //objects.forEach(obj => ctx.add(obj));
            ctx.add.apply(ctx, objects);
        });

        return function () {
            var output = ctx.toSVG({suppressPreamble: true});
            ctx.dispose();
            return output;
        };
    };
}

function normalizeHTML(markup, type, selector) {
    type = type || 'text/html';
    var doc = new DOMParser().parseFromString(markup, type);
    return new XMLSerializer().serializeToString(selector ? selector(doc) : doc);
}

function initTrumbowyg(mode, id) {
    var el = $('#'+id);
    el.trumbowyg({
        btns: [
            ['viewHTML'],
            ['formatting'],
            'btnGrp-design',
            ['superscript', 'subscript'],
            ['link'],
            'btnGrp-justify',
            'btnGrp-lists',
            ['removeformat'],
            ['fullscreen']
        ],
        resetCss: true,
        semantic: false,
        removeformatPasted: true,
        autogrow: true,
    });

    return function(input) {
        el.trumbowyg('html', input);

        return function () {
            var output = el.trumbowyg('html');
            el.trumbowyg('destroy');
            return normalizeHTML(output, 'text/html', (doc) => doc.body);
        };
    };
}

var g_mimetypes = {
    'text/html' : {syntax: 'html', category: 'html'},
    'image/svg+xml': {syntax: 'svg', category: 'xml'},
    'text/xml' : {syntax: 'xml', category: 'xml'},
    'application/xml' : {syntax: 'xml', category: 'xml'},
    'application/xslt+xml' : {syntax: 'xml', category: 'xml'},
};

function getAceModeForPath(path) {
    var modes = window.ace.require("ace/ext/modelist").modes;
    var fileName = path.split(/[\/\\]/).pop();
    for (var i = 0; i < modes.length; i++) {
        if (modes[i].supportsFile(fileName)) {
            return modes[i].mode.split('/').pop();
        }
    }
}

function detectSyntax(name, attrs) {
    switch(name) {
    case 'xp:fixture':
        if (attrs.encoding !== 'base64' && attrs.encoding !== 'BINARY') {
            var mode = g_mimetypes[attrs.type];
            if (mode)
                return {syntax: mode.syntax, skipRoot: true, escape: false, category: mode.category};
            if(attrs.key) {
                var mode = getAceModeForPath(attrs.key);
                if (mode)
                    return {syntax: mode, skipRoot: true, escape: true, category: 'text'};
            }
        }
        return {syntax: 'text', skipRoot: true, escape: false, category: 'base64'};
    case 'stl:style':
        return {syntax: 'css', skipRoot: true, escape: false };
    case 'stl:story':
        if (attrs.format === 'XHTML')
            return {syntax: 'html', skipRoot: true, escape: false, category: 'html'};
        return {syntax: 'xml', skipRoot: false, escape: false, category: 'xml'};
    case 'stl:script':
        return {syntax: 'javascript', skipRoot: true, escape: true };
    case 'stl:transformation':
    case 'stl:source':
    case 'stl:template':
        return {syntax: 'xml', skipRoot: true, escape: false, category: 'xml'};
    default:
        return {syntax: 'xml', skipRoot: false, escape: false, category: 'xml'};
    }
}

function detectNormalizer(jsElement) {
    var spec = detectSyntax(jsElement.name, collectAttrs(jsElement));
    if (spec.syntax === 'css')
        return css_beautify;
    if (spec.syntax === 'javascript' || spec.syntax === 'json')
        return js_beautify;
    return null;
}

function markupEditor(editor, id) {    
    id = id || 'editor-bubble';
    editor = editor || initAce;
    
    function askEditorString(id) {
	    var html='';
	    html+='<form onsubmit="Xonomy.answer($(\'#'+id+'\').data().getter()); return false">';
	    html+='  <div id="'+id+'"></div>';
	    html+='  <div class="submitline"><input class="button" type="submit" value="OK"></div>';
	    html+='</form>';
	    return html;
    }

    function validateXML(markup, strict)
    {
        strict = strict || true;
        var sax = require('sax');
        var parser = sax.parser(strict);
        parser.write(markup).close();
    }

    function onChange(isSyntaxValid) {
        $('#'+id+' + div > input').prop('disabled', !isSyntaxValid);
    }
    
    return function (jsElement, callback) {
        var mode = detectSyntax(jsElement.name, collectAttrs(jsElement));
        jsPrettify(jsElement, mode.skipRoot);
        var input = js2xml(jsElement, g_stl_schema, mode.skipRoot);
        if (mode.escape)
            input = xmlUnEscape(input);
	    document.body.appendChild(Xonomy.makeBubble(askEditorString(id)));
        var initialize = editor(mode.syntax, id, onChange);
        $('#'+id).data('getter', initialize(input) );
        
        Xonomy.answer = function(output) {
            Xonomy.clickoff();
            try {
                //validateXML(output);
                if (mode.escape)
                    output = xmlEscapeText(output);
                var jsNewElement = mode.skipRoot
                    ? xml2js(output, jsElement)
                    : Xonomy.xml2js(output, jsElement.parent());
                jsNormalize(jsNewElement);
		        callback(jsNewElement);
            } catch(e) {
                report_error('Syntax error', e.message);
            }
        };
    };
}

function embedContent(jsElement, attrs, array) {
    function uint8ToString(buf) {
        var i, length, out = '';
        for (i = 0, length = buf.length; i < length; i += 1) {
            out += String.fromCharCode(buf[i]);
        }
        return out;
    }

    function encodeBase64(arr) {
        return btoa(arr.reduce((data, byte) => data + String.fromCharCode(byte), ''));
        //return btoa(unescape(encodeURIComponent(str)));
    }
    function decodeBase64(str) {
        return decodeURIComponent(escape(window.atob(b64)));
    }
    function convertType(jsParent, jsElement, attrs, array, markup, category) {
        var jsNewElement;
        switch(category) {
        case 'text':
            markup = XonomyBuilder.xml(jsElement.name, attrs, xmlEscapeText(markup.trim()), g_stl_schema.namespaces);
            jsNewElement = Xonomy.xml2js(markup, jsParent);
            if (!attrs.type)
                attrs.type = 'text/plain';
            break;
        case 'html':
            markup = normalizeHTML(markup, attrs.type);
            jsNewElement = Xonomy.xml2js(XonomyBuilder.xml(jsElement.name, attrs, '', g_stl_schema.namespaces), jsParent);
            jsNewElement.children = [Xonomy.xml2js(markup, jsNewElement)];
            if (!attrs.type)
                attrs.type = 'text/html';
            break;
        case 'xml':
            jsNewElement = Xonomy.xml2js(XonomyBuilder.xml(jsElement.name, attrs, '', g_stl_schema.namespaces), jsParent);
            jsNewElement.children = [Xonomy.xml2js(markup, jsNewElement)];
            if (!attrs.type)
                attrs.type = 'text/xml';
            break;
        default:
            // encode binary content
            markup = encodeBase64(array);
            // split content to max 80-column chunks
            markup = markup.match(/.{1,80}/g).join('\n');
            attrs.encoding = 'base64';
            markup = XonomyBuilder.xml(jsElement.name, attrs, markup, g_stl_schema.namespaces);
            jsNewElement = Xonomy.xml2js(markup, jsParent);
            break;
        }
        if (attrs.type)
            setOrCreateAttribute(jsNewElement, 'type', attrs.type);
        return jsNewElement;
    }

    function convert(jsElement, attrs, array) {
        var encoding = Encoding.detect(array);
        var jsParent = jsElement.parent();
        var spec = detectSyntax(jsElement.name, attrs);
        var markup = Encoding.convert(array, {to: 'unicode', from: encoding, type: 'string'});
        if (spec) // return based on explicit category based on mimetype (hopefully this covers most cases)
            return convertType(jsParent, jsElement, attrs, array, markup, spec.category);
        // try to detect a category
        try {
            return convertType(jsParent, jsElement, attrs, array, markup, 'xml');
        } catch(e) {};
        try {
            return convertType(jsParent, jsElement, attrs, array, markup, 'text');
        } catch(e) {};
        // if everything else fails => use base64 encoding
        return convertType(jsParent, jsElement, attrs, array);
    }
 
    // convert array to string
    var jsNewElement = convert(jsElement, attrs, array);
    if (!attrs.encoding)
        jsNormalize(jsNewElement, null);
    return jsNewElement;
}

function browseFile(jsElement, callback) {
    function handleSelectedFile() {
        var file = this.files[0];
        var reader = new FileReader();
        var attrs = {
            key: 'link:/'+file.name,
            type: file.type,
        };
        reader.onload = function(ev) {
            var content = new Uint8Array(ev.target.result);
            callback(embedContent(jsElement, attrs, content));
        };
        reader.readAsArrayBuffer(file);
    }

    $('<input type="file">').on('change', handleSelectedFile).click();
	Xonomy.clickoff();
};

function generateChartData(jsElement, callback) {
    var xml = XonomyBuilder.xml("chartdata", {}, '', g_stl_schema.namespaces);
    Xonomy.newElementChild(jsElement.htmlID, xml);
    jsElement = Xonomy.harvestElement(document.getElementById(jsElement.htmlID));

    var count = jsElement.children.length;
    if (count > 0) {
        var jsLastChild = jsElement.children[count - 1];
        customAction(jsLastChild.htmlID, generateChartDataTemplate);
    }

};

function generateChartDataTemplate(jsElement, callback) {
    var chartDataTemplate = "<ddi:header><ddi:cell>?</ddi:cell><ddi:cell>?</ddi:cell></ddi:header>\
<ddi:row><ddi:cell>?</ddi:cell><ddi:cell>?</ddi:cell></ddi:row>";
    var jsNewElement = xml2js(chartDataTemplate, jsElement);
    callback(jsNewElement);
}

function customAction(htmlID, handler) {
	function modifyDOM(jsNewElement) {
        try {
		    var obj = document.getElementById(htmlID);
		    var html = Xonomy.renderElement(jsNewElement);
		    $(obj).replaceWith(html);
		    Xonomy.clickoff();
		    Xonomy.changed();
        } catch(err) {
            $("#right").text(err.message);
        }
	};

	var div=document.getElementById(htmlID);
	var jsElement=Xonomy.harvestElement(div);
    handler(jsElement, modifyDOM);
	Xonomy.showBubble($(div));
};

function defaultSpec(elementName, attributeName) {
    var menu = [];
    if (!attributeName) {
	    menu.push({caption: 'Delete <' + elementName + '>', action: Xonomy.deleteElement});
	    menu.push({caption: "Edit...", action: customAction, actionParameter: markupEditor()});
        menu.push({
            caption: "Add chart data", action: customAction, actionParameter: generateChartData, hideIf: (js) => {
                return !canAddChartData(js);
            }
        });
	    menu.push({
            caption: 'Add <xp:include>', 
			action: Xonomy.newElementChild,
			actionParameter: XonomyBuilder.xml('xp:include', 
                                               XonomyBuilder.mandatoryAttrs(g_stl_schema.elements['xp:include']), 
                                               g_stl_schema.namespaces),
         });
    } else {
        menu.push({caption: 'Delete @' + attributeName, action: Xonomy.deleteAttribute});
    }
    return {menu: menu, canDropTo: ['xp:fixture']};
}

function editorMenuItem(spec) {
    if (!spec)
        spec = "Edit...";
    if (XonomyBuilder.isString(spec))
        spec = {caption: spec}; 
	return {
        caption: spec.caption,
        action: customAction,
        parameter: markupEditor(spec.editor),
        condition: spec.condition
    };
}

function harvestRootElement() { //harvests the contents of an editor
	//Returns xml-as-string.
	var rootElement=$(".xonomy .element").first().toArray()[0];
	return Xonomy.harvestElement(rootElement);
};

function storyNames(js) {
    var docs = harvestRootElement().getChildElements('stl:document');
    var names = [];
    if (docs.length) {
        docs[0].children.forEach(function(child) {
            if (child.type === 'element' && child.name === 'stl:story') {
                var name = child.getAttributeValue('name');
                if (name)
                    names.push(name);
            }
        });
    }
    return names;
}

function collectXPaths(js, xpaths, current, childName) {
    current = current || '';
    var names = {};
    js.children.forEach(function (child, i) {
        if (child.type === 'element') {
            if (names[child.name] === undefined)
                names[child.name] = [];
            names[child.name].push(i);
        }
    });
    js.children.forEach(function (child, i) {
        if (child.type === 'element') {
            var xpath = current + '/' + child.name;
            var index = names[child.name].length > 1
                ? names[child.name].indexOf(i) + 1
                : 0;
            if (index)
                xpath += '[' + index + ']';
            if (childName === '' || childName === undefined || hasChild(child, childName)) {
                xpaths.push(xpath);
            }
            if (childName === '' || childName === undefined || hasChild(child, childName)) {
                collectXPaths(child, xpaths, xpath, childName);
            }
        }
    });
}

function removeDuplicate(node, keys, attr) {
    if (node.type === 'element') {
        var key = node.getAttributeValue(attr);
        if (key) {
            var index = keys.indexOf(key);
            if (index > -1)
                keys.splice(index, 1);
        }
    }
}

function removeDuplicates(js, keys, attr) {
    js.children.forEach(function (node) {
        removeDuplicate(node, keys, attr);
    });
}

function templateXPathsParentsOf(js, childName) {
    var xpaths = [];
    var templates = findDescendants(harvestRootElement(), 'stl:template');
    templates.forEach((template) => collectXPaths(template, xpaths, '', childName));

    if (childName === undefined || childName === '') {
        var transformation = js.parent().parent();
        removeDuplicates(transformation, xpaths, 'path')
    } else {
        removeDuplicate(js.parent(), xpaths, 'xpath');
    }

    return xpaths;
}

function templateXPaths(js) {
    return templateXPathsParentsOf(js, '');
}

function templateChartXPaths(js) {
    return templateXPathsParentsOf(js, 'ddi:header');
}

/*
function templateXPaths(js) {
    var xpaths = [];
    var templates = findDescendants(harvestRootElement(), 'stl:template');
    templates.forEach( (template) => collectXPaths(template, xpaths) );
    var transformation = js.parent().parent();
    removeDuplicates(transformation, xpaths, 'path')
    return xpaths;
}
*/

function parseXML(js) {
    var parser = new DOMParser();
    var markup = js2xml(js, g_stl_schema, true);
    return parser.parseFromString(markup, "text/xml");
}

function evalElementXPath(doc, xpath) {
    var elements = [];
    try {
        var it = doc.evaluate( xpath, doc, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null );
        for (var node = it.iterateNext(); node; node = it.iterateNext()) {
            if (node.nodeType === Node.ELEMENT_NODE)
                elements.push( node );
        }
    } catch(err) { // DOMException in case of invalid XPath
        // we ignore errors in validation
        return null;
    }
    return elements;
}

function collectAttrXPaths(elem) {
    var xpaths = [];
    var attrs = elem.attributes;
    for(var i = 0; i<attrs.length; i++)
        xpaths.push('@'+attrs[i].name);
    return xpaths;
}
 
function templateKeys(js) {
    var rule = js.parent().parent();
    var xpath = rule.getAttributeValue('path');
    var keys = ['.', '$var', 'recurse'];
    var templates = findDescendants(harvestRootElement(), 'stl:template');
    templates.forEach(function (template) {
        var doc = parseXML(template);
        var elems = evalElementXPath(doc, xpath);
        if (elems && elems.length) {
            elems.forEach(function (el) {
                collectAttrXPaths(el).forEach(function (key) {
                    if (keys.indexOf(key) === -1)
                        keys.push(key);
                });
                var key = 'text()';
                if (keys.indexOf(key) === -1 && !el.firstElementChild)
                    keys.push(key);
            });
        } else {
            // just dummy placeholders
            keys.push('@attr');
            keys.push('text()');
        }
    });
    removeDuplicates(rule, keys, 'key')
    return keys;
}

function validateTDT(jsElement, templateDoc) {
    function _validate_path(jsAttribute, templateElems) {
        if (!templateElems) {
            Xonomy.warnings.push({htmlID: jsAttribute.htmlID, text: "Invalid XPath."});
            return false;
        }
        if (templateElems.length !== 1) {
            Xonomy.warnings.push({htmlID: jsAttribute.htmlID, text: "Evaluates to "+templateElems.length+" elements."});
            return false;
        }
        return true;
    }

    function _validate_key(jsAttribute, re, validAttrXPaths, hasChildElements) {
        if (!XonomyBuilder.validateAttr(jsAttribute, re, 'tdt_key'))
            return false;
        if (jsAttribute.value === 'text()' && hasChildElements === true) {
            Xonomy.warnings.push({htmlID: jsAttribute.htmlID, text: "Associated template element has child elements."});
            return false;
        }
        if (jsAttribute.value[0] === '@' && validAttrXPaths) {
            if (!validAttrXPaths.length) {
                Xonomy.warnings.push({htmlID: jsAttribute.htmlID, text: "Associated template element has no attributes."});
                return false;
            }
            if (validAttrXPaths.indexOf(jsAttribute.value) === -1) {
                Xonomy.warnings.push({htmlID: jsAttribute.htmlID, text: "Associated template element has attributes: "+validAttrXPaths.join(', ')+"."});
                return false;
            }
        }
        return true;
    }

    function _syntax_check(elem, expectedName) {
        if (elem.type === 'text') {
        //    if (elem.value.trim())
        //        Xonomy.warnings.push({htmlID: elem.htmlID, text: "Unexpected text '"+elem.value+"'"});
            return false;
        } 
        if (elem.name !== expectedName) {
            //Xonomy.warnings.push({htmlID: elem.htmlID, text: "Unexpected element "+elem.name});
            return false;
        }
        return true;
    }

    if (templateDoc === undefined) {
        var templates = findDescendants(harvestRootElement(), 'stl:template');
        if (templates.length === 1)
            templateDoc = parseXML(templates[0]);
    }
    jsElement.children.forEach(function (rule) {
        if(_syntax_check(rule, 'tdt:rule')) {
            var templateElements = null;
            var validAttrXPaths = null;
            var hasChildElements = null;
            var re = null;
            var path = rule.getAttribute('path');
            if (path) { // missing mandatory attribute is handled elsewhere
                if (path.value.startsWith('usr:')) // usr functions are handled specially
                    re = /^(\$.+|return)$/;
                else {
                    re = /^(\.|@.+|\$.+|text\(\)|recurse|enumerate|clone|union)$/;
                    templateElements = evalElementXPath(templateDoc, path.value);
                    if (_validate_path(path, templateElements)) {
                        var el = templateElements[0];
                        validAttrXPaths = collectAttrXPaths(el);
                        hasChildElements = !!el.firstElementChild;
                    }
                }
            }
            rule.children.forEach(function (value) {
                if(_syntax_check(value, 'tdt:value')) {
                    var key = value.getAttribute('key');
                    if (key) // missing mandatory attribute is handled elsewhere
                        _validate_key(key, re, validAttrXPaths, hasChildElements);
                }
            });
        }
    });
}

function fixtureKeys(js) {
    var fixtures = harvestRootElement().getChildElements('stl:fixtures');
    var keys = [];
    if (fixtures.length) {
        fixtures[0].children.forEach(function(child) {
            if (child.type === 'element' && child.name === 'xp:fixture') {
                var key = child.getAttributeValue('key');
                if (key)
                    keys.push(key);
            }
        });
    }
    return keys;
}

function cssClasses(js) {
    var stylesheets = harvestRootElement().getChildElements('stl:style');
    if (!stylesheets.length)
        return null;
    var classes = [];
    stylesheets.forEach(function(stylesheet) {
        stylesheet = stylesheet.children.map( s => s.value || '' ).join('');
        stylesheet.split('\n').forEach(function (line) {
            var matches = /^\s*([^{^,]+)[{,]/.exec(line);
            if (matches) {
                matches[1].split(',').forEach(function(decl) {
                    decl = decl.trim();
                    if (decl.match(/^\.[a-zA-Z0-9_\-]+$/)) {
                        classes.push(decl.substring(1));
                    }
                });
            }
        });
    });
    return sort_unique(classes);
}

function validateDynamic(fnOptions) {
    return function (jsAttribute) {
        var options = fnOptions(jsAttribute);
        if (options && options.indexOf(jsAttribute.value) === -1) {
            var msg = "Must be one of: '" + options.join("', '")+"'.";
            Xonomy.warnings.push({htmlID: jsAttribute.htmlID, text: msg});
        }
    }
}

function askerDynamic(fnOptions) {
    return function(defaultString, askerParameter, jsMe) {
        return Xonomy.askOpenPicklist(defaultString, fnOptions(jsMe) || [], jsMe);
    }
}

function convertSchema( schema ) {
	var result = {};
	Object.keys(schema.elements).forEach(function (key) {
		var spec = schema.elements[key];
		spec = convertSpec(key, spec, schema);
		result[key] = spec;
	});
	return result;
}

function combineItems( items, attrs, key ) {
    key = key || 'name';
	return items.map( function (item) {
        var result = Object.assign({}, attrs);
        if (!XonomyBuilder.isString(item))
            return Object.assign(result, item);
        result[key] = item;
        return result;
    });
}

function isDocumentStory(js) {
    if (js.name !== 'stl:story')
        throw new Error('Unexpected element name: '+js.name);
    js = js.parent();
    return (js.name === 'stl:document');
}

function isTableRepeater(js) {
    if (js.name !== 'stl:repeater')
        throw new Error('Unexpected element name: '+js.name);
    js = js.parent();
    if (js.name === 'stl:story')
        return isTableStory(js);
    return false;
}

function isTableStory(js) {
    if (js.name !== 'stl:story')
        throw new Error('Unexpected element name: '+js.name);
    js = js.parent();
    if (js.name === 'stl:table')
        return true;
    if (js.name === 'stl:repeater')
        return isTableRepeater(js);
    return false;
}

function isHTMLStory(js) {
    if (js.name !== 'stl:story')
        throw new Error('Unexpected element name: '+js.name);
    return js.getAttributeValue('format') === 'XHTML';
}

function isSVGFixture(js) {
    if (js.name !== 'xp:fixture')
        throw new Error('Unexpected element name: '+js.name);
    return js.getAttributeValue('type') === 'image/svg+xml';
}

function isInline(js) {
    while (stl_subcontent_items.indexOf(js.name) !== -1)
        js = js.parent(); // e.g.: stl:case -> stl:switch
    if (stl_layout_items.indexOf(js.name) !== -1)
        return false; // e.g.: stl:text
    if (js.name === 'stl:span' || js.name === 'stl:p' || js.name === 'stl:li')
        return true;
    if (js.name === 'stl:block' || js.name === 'stl:list' || js.name === 'stl:cell')
        return false;
    if (js.name === 'stl:story')
        return isInlineStory(js);
    return false;
}

function isInlineStory(js) {
    if (js.name !== 'stl:story')
        throw new Error('Unexpected element name: '+js.name);
    if (isHTMLStory(js))
        return false;
    if (isDocumentStory(js))
        return false;
    if (isTableStory(js))
        return false;
    return isInline(js.parent());
}

function isBlockStory(js) {
    if (isHTMLStory(js))
        return false;
    if (isDocumentStory(js))
        return true;
    if (isTableStory(js))
        return false;
    return !isInline(js.parent());
}

function canAddChartData(js) {
    while (js && js.name !== 'stl:template')
        js = js.parent(); // e.g.: stl:case -> stl:switch
    return js && js.name === 'stl:template';
}

function stlPreprocess(elementName, elementSpec, schema) {
    if (!elementSpec.menu)
        elementSpec.menu = [editorMenuItem()];

    if (elementSpec.children === null 
        || elementSpec.children && elementSpec.children.length > 0
        || elementSpec.wrappers && elementSpec.wrappers > 0
        || elementSpec.text) {
        if (elementSpec.children)
            elementSpec.children.push('xp:include');
        else if (elementSpec.children === undefined)
            elementSpec.children = ['xp:include'];
    }
    return elementSpec;
}

function stlPostprocess(elementName, elementSpec, schema) {
    if (elementName === 'xp:include') {
 	    elementSpec.canDropTo = Object.keys(schema.elements); 
    } else if (elementName !== 'xp:fixture') {
        if(elementSpec.canDropTo)
            elementSpec.canDropTo.push('xp:fixture');
        else
            elementSpec.canDropTo = ['xp:fixture'];
    }
    return elementSpec;
}

var stl_layout_items = [
	{name: 'stl:text', group: 'Layout item'},
	{name: 'stl:shape', group: 'Layout item'},
	{name: 'stl:table', group: 'Layout item'},
	{name: 'stl:image', group: 'Layout item'},
	{name: 'stl:fragment', group: 'Layout item'},
	{name: 'stl:chart', group: 'Layout item'},
	{name: 'stl:barcode', group: 'Layout item'},
	{name: 'stl:input', group: 'Layout item'},
	{name: 'stl:group', group: 'Layout item'},
];
var stl_runtime_items = [
	{name: 'stl:script', max: 2}
];
var stl_content_items = [
	{name: 'stl:repeater', group: 'Content item'},
	{name: 'stl:switch', group: 'Content item'},
	{name: 'stl:scope', group: 'Content item'},
	{name: 'stl:field', group: 'Content item'},
	{name: 'stl:translation', group: 'Content item'},
	{name: 'stl:content', group: 'Content item'},
    {name: 'stl:break'},
    {name: 'stl:tab'},
];

var stl_story_ref = [
    {name: 'story', type: 'story_ref' }
];
var stl_paragraph_items = ['stl:block', 'stl:list', 'stl:p', 'stl:repeater', 'stl:switch', 'stl:scope', 'stl:table'];
var stl_subcontent_items = ['stl:repeater', 'stl:switch', 'stl:case', 'stl:translation', 'stl:scope'];
var stl_inline_items = ['stl:span', 'stl:tab', 'stl:break', 'stl:command'];
var svg_path_items = ['path', 'circle', 'ellipse', 'rect', 'line', 'polyline', 'polygon', 'g'];

var stl_style_attrs = [
    'id', 
    {name: 'class', type: 'class'}, 
    {name: 'style', type: 'style', value: ''},
];
var stl_edit_attrs = [
    {name: 'transform', type: 'transform'},
];

var stl_bbox_attrs = [
    {name: 'x', type: 'length'}, 
    {name: 'y', type: 'length'}, 
    {name: 'w', type: 'length', value: '100pt', mandatory: true}, 
    {name: 'h', type: 'length', value: '100pt', mandatory: true}, 
];
var svg_ellipse_attrs = [
    {name: 'cx', type: 'length'}, 
    {name: 'cy', type: 'length'}, 
    {name: 'rx', type: 'length', mandatory: true}, 
    {name: 'ry', type: 'length', mandatory: true}, 
];
var svg_circle_attrs = [
    {name: 'cx', type: 'length'}, 
    {name: 'cy', type: 'length'}, 
    {name: 'r', type: 'length', mandatory: true}, 
];
var svg_line_attrs = [
    {name: 'x1', type: 'length', mandatory: true}, 
    {name: 'y1', type: 'length', mandatory: true}, 
    {name: 'x2', type: 'length', mandatory: true}, 
    {name: 'y2', type: 'length', mandatory: true}, 
];
var svg_path_attrs = [
    {name: 'd', mandatory: true},
];
var svg_poly_attrs = [
    {name: 'points', mandatory: true},
];
var svg_group_attrs = [
];

function svg_item_attrs(attrs) {
    return attrs.concat(stl_style_attrs).concat(stl_edit_attrs);
}

var stl_layout_item_children = [
    {name: 'stl:story', max: 1},
].concat(stl_runtime_items);

function stl_layout_item_attrs(bbox_attrs) {
    return stl_story_ref.concat(bbox_attrs).concat(stl_style_attrs).concat(stl_edit_attrs);
}

g_stl_schema.types = {
    length : { 
        validate: /^[+-]?([0-9]*\.)?[0-9]+(pt|px|in|pc|mm|cm|em|%)$/,
        asker: ['10pt', '10px', '10in', '10mm', '10%', null],
    },
    integer : { 
        validate: /^[0-9]+$/,
    },
    float: {
        validate: /^[+-]?([0-9]*[.])?[0-9]+$/,
    },
    bool: {
        validate: /^(true|false)$/,
        asker: ['true', 'false'],
    },
    occurrence : { 
        validate: /^([0-9]*|optional|once-or-more|repeatable)$/,
        asker: ['optional', 'once-or-more', 'repeatable', '1', null],
    },
    break_type : { 
        validate: /^(line|area)$/,
        asker: ['line', 'area'],
    },
    fragment_category : { 
        validate: /^(format-time|render-time|postprocessing|load-time)$/,
        asker: ['format-time', 'render-time', 'postprocessing', 'load-time'],
    },
    encoding : { 
        validate: /^(utf8|base64)$/,
        asker: ['utf8', 'base64'],
    },
    tdt_path: {
        // validated as part of validateTDT
        asker: askerDynamic(templateXPaths),
    },
    tdt_key: {
        // validated as part of validateTDT
        asker: askerDynamic(templateKeys),
    },
    story_format: {
        validate: /^(native|XHTML)$/,
        asker: ['native', 'XHTML'],
    },
    story_ref: {
        validate: validateDynamic(storyNames),
        asker: askerDynamic(storyNames),
    },
    url: {
        validate: /^(wd|file|link|http|https|ftp|cas|tmp):\/.*$/,
        asker: askerDynamic(fixtureKeys),
    },
    'class': {
        validate: validateDynamic(cssClasses),
        asker: askerDynamic(cssClasses),
    },
    'xpath': {
        asker: askerDynamic(templateXPaths),
    },
    transform: {
        validate: /^(\s*(matrix\((\s*[0-9\.]+){6}\s*\)|translate\((\s*[\-0-9\.]+(pt|px|in|pc|mm|cm|em|%)){2}\s*\)|scale\((\s*[\-0-9\.]+){2}\s*\)|rotate\(\s*[\-0-9\.]+(deg|rad)\s*\)|(skewX|skewY)\(\s*[\-0-9\.]*\s*\))\s*)+$/,
    },
    style: {
        validate: /^([a-z\-]+:\s?[^;]+;?\s?)+$/,
    },
    mimetype : {
        validate: /^(image|text|application|audio|video)\/[a-z0-9\-\.\+]+$/,
        asker: [
            'image/jpeg',
            'image/png',
            'image/tiff',
            'image/bmp',
            'image/gif',
            'image/svg+xml',
            'text/css',
            'text/html',
            'text/sgml',
            'text/plain',
            'application/xml',
            'application/octet-stream',
            'application/pdf',
            'application/postscript',
            'application/rtf',
            null
        ]
    },
    scd_title_position: {
        validate: /^(top|bottom)$/,
        asker: ['top', 'bottom'],
    },
    scd_position_h: {
        validate: /^(left|center|right)$/,
        asker: ['left', 'center', 'right'],
    },
    scd_position_v: {
        validate: /^(top|center|bottom)$/,
        asker: ['top', 'center', 'bottom'],
    },
    scd_placement: {
        validate: /^(start|end)$/,
        asker: ['start', 'end'],
    },
    scd_labels_connection: {
        validate: /^(none|normal|level|radial|underlined|aligned)$/,
        asker: ['none', 'normal', 'level', 'radial', 'underlined', 'aligned'],
    },
    scd_node_type: {
        validate: /^(none|dot|square)$/,
        asker: ['none', 'dot', 'square'],
    },
    chart_xpath: {
        asker: askerDynamic(templateChartXPaths),
    },
    data_type: {
        validate: /^(string|number)$/,
        asker: ['string', 'number'],
    }


};

g_stl_schema.namespaces = {
	'xmlns:stl' : 'http://developer.opentext.com/schemas/storyteller/layout',
	'xmlns:xp' : 'http://developer.opentext.com/schemas/storyteller/xmlpreprocessor',
	'xmlns:tdt' : 'http://developer.opentext.com/schemas/storyteller/transformation/tdt',
    'xmlns:svg': 'http://www.w3.org/2000/svg',
    'xmlns:scd': 'http://developer.opentext.com/schemas/storyteller/chart/definition',
    'xmlns:ddi': 'http://developer.opentext.com/schemas/storyteller/layout/ddi/v1'
};

g_stl_schema.elements = {
	'stl:stl': {
        menu: [
            editorMenuItem("Edit..."),
        ],
		children: [
			{ name: 'stl:fixtures', max: 1 },
			{ name: 'stl:data',  max: 1 },
			{ name: 'stl:style' },
			{ name: 'stl:document', max: 1 }
		] },
	'stl:fixtures': {
		order: true,
		children: ['xp:fixture'],
	},
	'xp:fixture': {
        collapsed: true,
        attributes: [
            {name: 'key', value: 'link:/...', mandatory: true},
            {name: 'src', type: 'url'},
            {name: 'type', type: 'mimetype'},
            {name: 'encoding', type: 'encoding'},
        ],
        serializer: js2xml,
        menu: [
            editorMenuItem("Edit fixture..."),
            {caption: "Browse File...", action: customAction, parameter: browseFile},
            editorMenuItem({caption: "Edit Wysiwyg...", editor: initFabric, condition: isSVGFixture}),
        ],
        children: null,
	},
	'xp:include': {
        attributes: [
            {name: 'src', type: 'url', mandatory: true},
            {name: 'xpath'},
        ],
        menu: [],
	},
	'stl:data': {
		children: ['stl:source', {name: 'stl:template', max: 1}, 'stl:transformation'],
		order: true,
	},
	'stl:source': {
		attributes: [
            'key', 
            {name: 'src', type: 'url'}
        ],
		order: true,
        menu: [
            editorMenuItem("Edit source..."),
        ],
        collapsed: true,
        children: null,
        serializer: js2xml,
	},
	'stl:template': {
		attributes: [
            {name: 'src', type: 'url'}
        ],
		order: true,
        collapsed: true,
        menu: [
            editorMenuItem("Edit template..."),
            { caption: "Add chart data", action: customAction, parameter: generateChartData },
        ],
        children: null,
        serializer: js2xml,
	},
	'stl:transformation': {
		attributes: [
            'key', 
            {name: 'src', type: 'url'}
        ],
        children: ['tdt:transformation'],
		order: true,
        collapsed: true,
        menu: [
            editorMenuItem("Edit TDT..."),
        ],
        serializer: js2xml,
	},
	'tdt:transformation': {
		attributes: [{name: 'version', value: '1.0', mandatory: true}],
        children: ['tdt:rule'],
        validate: validateTDT,
	},
	'tdt:rule': {
        collapsed: true,
		attributes: [{name: 'path', type: 'tdt_path', mandatory: true}],
        children: ['tdt:value'],
	},
	'tdt:value': {
        text: true,
        oneline: true,
		attributes: [{name: 'key', type: 'tdt_key', mandatory: true}],
	},
	'stl:style': {
		attributes: [{name: 'src', type: 'url'}],
		order: true,
        menu: [
            editorMenuItem("Edit stylesheet..."),
        ],
        collapsed: true,
	},
	'stl:document': {
		children: ['stl:story', 'stl:page'],
		order: true,
	},
	'stl:story': {
        text: isInlineStory,
        menu: [
            editorMenuItem("Edit..."),
            editorMenuItem({caption: "Edit Wysiwyg...", editor: initTrumbowyg, condition: isHTMLStory}),
        ],
		order: true,
        attributes: [
            {name: 'name', condition: isDocumentStory },
            {name: 'w', type: 'length', condition: isDocumentStory},
            {name: 'format', type: 'story_format', condition: (js) => !isTableStory(js) },
        ],
		wrappers: [
            {name: 'stl:span', condition: isInlineStory},
//          {name: 'stl:repeater', template: XonomyBuilder.xml('stl:repeater', {}, '<stl:story>$</stl:story>', g_stl_schema.namespaces), hideIf: isBlockStory},
        ],
		children: [
            {name: 'stl:row', condition: isTableStory},
            {name: 'stl:repeater', condition: isTableStory},
            {name: 'body', condition: isHTMLStory }
        ].concat(
            combineItems( stl_paragraph_items, {condition: isBlockStory})
        ).concat(
            combineItems( stl_content_items, {condition: isInlineStory})
        ).concat(
            combineItems( stl_layout_items, {condition: isInlineStory})
        )
	},
	'stl:block': {
		attributes: stl_style_attrs,
		children: ['stl:block', 'stl:list', 'stl:p'],
        collapsed: true,
	},
	'stl:p': {
		//text: true,
		attributes: stl_style_attrs,
        children : stl_content_items.concat(stl_layout_items),
		wrappers: ['stl:span'],
        collapsed: true,
	},
	'stl:list': {
		attributes: stl_style_attrs,
		children: ['stl:list', 'stl:li', 'stl:p'],
        collapsed: true,
	},
	'stl:li': {
		text: true,
		attributes: stl_style_attrs,
		wrappers: ['stl:span'],
        children : stl_content_items.concat(stl_layout_items),
        collapsed: true,
	},
	'stl:span': {
		text: true,
        oneline: true,
        collapsed: true,
		attributes: stl_style_attrs,
		wrappers: ['stl:span'],
        children: ['stl:repeater'],
	},
	'stl:page': {
		order: true,
        attributes: [
            {name:'w', value: '595pt', type: 'length', mandatory: true}, 
            {name:'h', value: '842pt', type: 'length', mandatory: true}, 
            {name: 'occurrence', type: 'occurrence' }, 
        ], 
		children: stl_runtime_items.concat(stl_layout_items),
	},
	'stl:switch': {
		attributes: [
            {name: 'xpath', type: 'xpath'},
        ],
		children: [
            {name: 'stl:script', max: 1},
            'stl:case'
        ],
	},
	'stl:case': {
		attributes: [
            {name: 'key'},
            {name: 'story', type: 'story_ref'},
        ],
		children: [
            {name: 'stl:story', max: 1},
        ],
	},
	'stl:translation': {
		attributes: ['phrase'],
		children: [
            {name: 'stl:script', max: 1},
            'stl:phrase'
        ],
	},
	'stl:phrase': {
		attributes: [
            {name: 'locale'},
            {name: 'story', type: 'story_ref'},
        ],
		children: [
            {name: 'stl:story', max: 1},
        ],
	},
	'stl:repeater': {
		attributes: [
            {name: 'xpath', type: 'xpath'}
        ],
		children: [
            {name: 'stl:story', max: 1},
            {name: 'stl:script', max: 1},
        ],
	},
	'stl:scope': {
		attributes: [
            {name: 'relation', type: 'xpath'},
            'hyperlink',
            'screentip',
            {name: 'story', type: 'story_ref'},
        ],
		children: [
            {name: 'stl:story', max: 1},
            {name: 'stl:script', max: 1}
        ],
	},
	'stl:content': {
		attributes: [
            {name: 'uri', type: 'url' },
            {name: 'xpath', type: 'xpath' },
            'selector'
        ],
		children: [
            {name: 'stl:script', max: 1}
        ],
	},
	'stl:field': {
		attributes: [
            {name: 'xpath', type: 'xpath' },
            'type',
            'key',
            'mask',
        ],
		children: [
            {name: 'stl:script', max: 1}
        ],
	},
	'stl:break': {
		attributes: [
            {name: 'type', type: 'break_type'},
        ],
        menu: [],
	},
	'stl:tab': {
        menu: [],
	},
	'stl:group': {
		attributes: ['id'].concat(stl_edit_attrs),
		children: stl_runtime_items.concat(stl_layout_items),
	},
	'stl:image': {
		attributes: [
            {name: 'src', type: 'url'},
        ].concat(stl_layout_item_attrs(stl_bbox_attrs)),
		children: stl_runtime_items.slice(),
	},
	'stl:fragment': {
		attributes: [
            {name: 'src', type: 'url'},
            {name: 'category', type: 'fragment_category'},
        ].concat(stl_layout_item_attrs(stl_bbox_attrs)),
		children: stl_runtime_items.slice(),
	},
	'stl:table': {
		attributes: stl_layout_item_attrs([
            {name: 'x', type: 'length'}, 
            {name: 'y', type: 'length'}, 
            {name: 'w', type: 'length'}, 
            {name: 'h', type: 'length'}, 
        ]),
		children: stl_runtime_items.concat(['stl:story']),
        collapsed: true,
	},
	'stl:row': {
		attributes: [{name: 'h', type: 'length'}].concat(stl_style_attrs),
		children: ['stl:cell'],	
        collapsed: true,
    },
	'stl:cell': {
		attributes: [
            {name: 'w', type: 'length'},
            {name: 'colspan'},
        ].concat(stl_style_attrs),
		children: ['stl:block', 'stl:list', 'stl:p'],
	},
    'stl:chart': {
        attributes: stl_layout_item_attrs(stl_bbox_attrs).concat(['modern']),
        children: stl_runtime_items.concat([{ name: 'scd:scd', max: 1 }]),
        serializer: js2xml,
    },
	'stl:barcode': {
		attributes: stl_layout_item_attrs(stl_bbox_attrs),
		children: stl_runtime_items.slice(),
	},
	'stl:input': {
		attributes: stl_layout_item_attrs(stl_bbox_attrs),
		children: stl_runtime_items.slice(),
	},
	'stl:text' : {
		attributes: stl_layout_item_attrs(stl_bbox_attrs),
		children: stl_layout_item_children.concat([{name: 'stl:shape', max: 1}]),
	},
	'stl:shape' : {
		attributes: stl_layout_item_attrs(stl_bbox_attrs),
		children: svg_path_items.slice(),
	},
	'rect': {
		attributes: svg_item_attrs(stl_bbox_attrs),
	},
	'ellipse': {
		attributes: svg_item_attrs(svg_ellipse_attrs),
	},
	'circle': {
		attributes: svg_item_attrs(svg_circle_attrs),
	},
	'path': {
		attributes: svg_item_attrs(svg_path_attrs),
	},
	'polygon': {
		attributes: svg_item_attrs(svg_poly_attrs),
	},
	'polyline': {
		attributes: svg_item_attrs(svg_poly_attrs),
	},
	'line': {
		attributes: svg_item_attrs(svg_line_attrs),
	},
	'g': {
		attributes: svg_item_attrs(svg_group_attrs),
		children: svg_path_items.slice(),
	},
	'stl:script': {
		attributes: ['language', 'when'],
		order: true,
        menu: [
            editorMenuItem("Edit script..."),
        ],
        collapsed: true,
	},
    'html' : {
        collapsed: true,
        children: null,
    },
    'body' : {
        collapsed: true,
        children: null,
    },
    'scd:scd': {
        order: true,
        children: [
            { name: 'scd:title', max: 1 },
            { name: 'scd:legend', max: 1 },
            { name: 'scd:plot', max: 1 },
            'scd:axis_x',
            'scd:axis_y',
            'scd:support_lines',
            'scd:layer'
        ],
        attributes:stl_style_attrs,
    },
    'scd:title': {
        order: true,
        attributes: [
            'text',
            { name: 'position', type: 'scd_title_position' },
        ].concat(stl_style_attrs),
    },
    'scd:legend': {
        order: true,
        attributes: [
            { name: 'alignment_v', type: 'scd_position_v' },
            { name: 'alignment_h', type: 'scd_position_h' },
        ].concat(stl_style_attrs),
    },
    'scd:plot': {
        order: true,
        attributes: [
            { name: 'style', type: 'style' },
            { name: 'logical_x_low', type: 'float' },
            { name: 'logical_x_height', type: 'float' },
            { name: 'logical_y_low', type: 'float' },
            { name: 'logical_y_high', type: 'float' },
        ],
    },
    'scd:axis_x': {
        order: true,
        attributes: [
            'label',
            { name: 'label_alignment', type: 'scd_position_h' },
            { name: 'label_position_v', type: 'scd_position_v' },
            { name: 'label_placement', type: 'scd_placement' },
            { name: 'logical_position_x', type: 'float' },
            { name: 'logical_position_y', type: 'float' },
            { name: 'logical_y_low', type: 'float' },
            { name: 'logical_y_high', type: 'float' },
            { name: 'draw_behind', type: 'bool' },
            { name: 'label_rotation', type: 'integer' },
            { name: 'data_labels_position_h', type: 'scd_position_h' },
            { name: 'data_labels_position_v', type: 'scd_position_v' },
        ].concat(stl_style_attrs),
    },
    'scd:axis_y': {
        order: true,
        attributes: [
            'label',
            { name: 'label_alignment', type: 'scd_position_h' },
            { name: 'label_position_v', type: 'scd_position_v' },
            { name: 'label_placement', type: 'scd_placement' },
            { name: 'logical_position_x', type: 'float' },
            { name: 'logical_position_y', type: 'float' },
            { name: 'logical_y_low', type: 'float' },
            { name: 'logical_y_high', type: 'float' },
            { name: 'draw_behind', type: 'bool' },
        ].concat(stl_style_attrs),
    },
    'scd:support_lines': {
        order: true,
        attributes: [
            { name: 'label_alignment', type: 'scd_position_h' },
            { name: 'label_position_v', type: 'scd_position_v' },
            { name: 'label_placement', type: 'scd_placement' },
            { name: 'logical_position_x', type: 'float' },
            { name: 'logical_position_y', type: 'float' },
            { name: 'logical_width', type: 'float' },
            { name: 'logical_step', type: 'float' },
            { name: 'logical_x_low', type: 'float' },
            { name: 'logical_x_high', type: 'float' },
            { name: 'logical_y_low', type: 'float' },
            { name: 'logical_y_high', type: 'float' },
            { name: 'draw_behind', type: 'bool' },
            'mask',
            { name: 'style', type: 'style' },
        ],
    },
    'scd:layer': {
        order: true,
        attributes: [
            'type',
            { name: 'xpath', type: 'xpath' },
            { name: 'labels_offset', type: 'float' },
            { name: 'labels_line', type: 'style' },
            'mask_label',
            'mask_legend',
            { name: 'line', type: 'style' },
            { name: 'radius', type: 'integer' },
            { name: 'center_x', type: 'float' },
            { name: 'center_y', type: 'float' },
            { name: 'start_angle', type: 'integer' },
            { name: 'clockwise', type: 'bool' },
            { name: 'height_3d', type: 'integer' },
            { name: 'xyratio', type: 'float' },
            { name: 'donut_ratio', type: 'float' },
            { name: 'labels_connection', type: 'scd_labels_connection' },
            { name: 'node_type', type: 'scd_node_type' },
            { name: 'node_size', type: 'length' },
            { name: 'connected_axis_x', type: 'integer' },
            { name: 'connected_axis_y', type: 'integer' },
            'area',
            { name: 'offset_left', type: 'integer' },
            { name: 'offset_right', type: 'integer' },
            { name: 'bar_widh', type: 'integer' },
            { name: 'gap', type: 'integer' },
            { name: 'rx', type: 'length' },
            { name: 'ry', type: 'length' },
        ],
        children: ['scd:series'],
    },
    'scd:series': {
        attributes: [
            { name: 'col_x', type: 'integer' },
            { name: 'col_y', type: 'integer' },
            { name: 'col_label', type: 'integer' },
            { name: 'col_legend', type: 'integer' },
        ].concat(stl_style_attrs),
    },
    'ddi:header': {
        children: ['ddi:cell'],
    },
    'ddi:row': {
        children: ['ddi:cell'],
    },
    'ddi:cell': {
        attributes: [
            { name: 'data_type', type: 'data_type', condition: (js) => js.parent().name === 'ddi:header' },
            { name: 'data_style', type: 'style' },
            { name: 'exploded', type: 'bool', condition: (js) => js.parent().name !== 'ddi:header' },
            { name: 'label_rotation', type: 'integer', condition: (js) => js.parent().name !== 'ddi:header' },
            { name: 'label_position_h', type: 'scd_position_h', condition: (js) => js.parent().name !== 'ddi:header' },
            { name: 'label_position_v', type: 'scd_position_v', condition: (js) => js.parent().name !== 'ddi:header' },
        ],
        children: ['ddi:cell']
    }

};

