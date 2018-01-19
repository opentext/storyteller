'use strict';

//const g_service_url = '';
const g_service_url = 'https://cem-dev-karim.eastus.cloudapp.azure.com/storyteller';
var g_preview = null;

function xmlPrettifier() {
    var domParser = new DOMParser();
    var xsltProcessor = new XSLTProcessor();
    var xsltDoc = domParser.parseFromString([
        // describes how we want to modify the XML - indent everything
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">',
        '  <xsl:output omit-xml-declaration="yes" indent="yes"/>',
        '    <xsl:template match="node()|@*">',
        '      <xsl:copy><xsl:apply-templates select="node()|@*"/></xsl:copy>',
        '    </xsl:template>',
        '</xsl:stylesheet>',
    ].join('\n'), 'application/xml');
    xsltProcessor.importStylesheet(xsltDoc);
    var xmlSerializer = new XMLSerializer();
    
    return function (sourceXml) {
        var xmlDoc = domParser.parseFromString(sourceXml, 'application/xml');
        var resultDoc = xsltProcessor.transformToDocument(xmlDoc);
        return xmlSerializer.serializeToString(resultDoc);
    };
};

function findElementByOpath(opath, js) {
    js = js || harvestRootElement();
    opath.split('/').forEach(function (selector) {
        var matches = /^([^\[]+)(\[(\d+|"([^"]+)")\])?/.exec(selector);
        if (!matches)
            throw new Error('Invalid selector: "'+selector+'" (opath "'+opath+'")');
        var tag = matches[1];
        var children = js.children.filter((c) => c.name === tag);
        if (!children.length)
            return null;
        var name = matches[4];
        if (name) {
            var child = js.children.find(function (c) {
                var att = c.attributes.find((a) => a.name === 'name');
                return att && att.value === name;
            });
            if (!child)
                return null;
            js = child;
        } else {
            var index = matches[3] ? matches[3]-1 : 0;
            if (index >= children.length)
                return null;
            js = children[index];
        }
    });
    return js;
};

function report_error(type, e, $elem) {
    $elem = $elem || $('#preview-html, #preview-st');
    var stl = require('stl');
    $elem.html('<h3>&#x26a0; '+type+'</h3><div class="errors">'+stl.text_escape(e)+'</div>');
}

function getItemSelector($elem, $parent) {
    var aname = 'data-stl-name';
    var atype = 'data-stl-class';
    var selector = $elem.attr('data-stl-opath');
    if (selector)
        return selector;
    var sel = '*['+atype+']';
    $parent = $parent || $elem.parent().closest(sel);
    var type = $elem.attr(atype);
    var result = {
        name: $elem.attr(aname),
        index: 0
    };
    if ($parent.length) {
        var depth = $elem.parentsUntil($parent).length;
        var inner_sel = '*['+atype+'="'+type+'"]';
        var $siblings = $parent.find(inner_sel).filter(function () {
            return $(this).parentsUntil($parent).length === depth;
        });
        var elemIndex = $siblings.index($elem);
        // compute index between siblings
        $siblings.filter(index => index <= elemIndex).each(function() {
            var opath = this.dataset.stlOpath;
            if (opath) {
                var matches = /^[^\[]+\[(\d+)\]/.exec(opath);
                if (matches) {
                    result.index = +matches[1];
                    return;
                }
            }
            result.index += 1;
        });
    }
    var label = type;
    if (result.name)
        label += '["'+result.name+'"]';
    else if (result.index)
        label += '['+result.index+']';
    return label;
}

function getItemOpath($elem, prefix) {
    var sel = '*[data-stl-class]';
    var $current = $elem.closest(sel);
    var path = [];
    while(true) {
        var $parent = $current.parent().closest(sel);
        path.push(getItemSelector($current, $parent));
        if (!$parent.length)
            break;
        $current = $parent;
    }
    if (prefix)
        path.push(prefix);
    var opath = path.reverse().join('/');
    console.log(opath);
    return opath;
}

function lookupTreeElement(elem) {
    var opath = getItemOpath(elem);
    var js = findElementByOpath(opath);
    return js ? $('#'+js.htmlID) : $();
}

function initHandlers($item, options) {
    function parseTransform(transform) {
        transform = transform || '';
        //get all transform declarations
        return (transform.match(/([\w]+)\(([^\)]+)\)/g)||[])
        //make pairs of prop and value
            .map(function(it){return it.replace(/\)$/,"").split(/\(/)})
        //convert to key-value map/object
            .reduce(function(m,it){return m[it[0]]=it[1],m},{});
    }
    
    function calculateAngle(el) {
        var st = window.getComputedStyle(el, null);
        var tr = st.getPropertyValue("-webkit-transform") ||
            st.getPropertyValue("-moz-transform") ||
            st.getPropertyValue("-ms-transform") ||
            st.getPropertyValue("-o-transform") ||
            st.getPropertyValue("transform") ||
            "none";
        if (tr === "none")
            return 0;
        var values = tr.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        var c = values[2];
        var d = values[3];
        var scale = Math.sqrt(a*a + b*b);
        var sin = b/scale;
        var radians = Math.atan2(b, a);
        return radians;
    }

    var transform = $item.css('transform');
    if (transform) {
        if (options.inline) {
            var $wrapper = $item.closest('.stl-inline-item');
            var pbox = $wrapper.get(0).getBoundingClientRect();
            var box = $item.get(0).getBoundingClientRect();
            var tx = pbox.x-box.x;
            var ty = pbox.y-box.y;
            $wrapper.css("width", box.width);
            $wrapper.css("height", box.height);
            transform = 'translate('+tx+'px, '+ty+'px) ' + transform;
        }
        $item.css('transform', transform);
    }

    function applyResult(callback) {
        return function (event, ui) {
            var opath = getItemOpath($item);
            var js = findElementByOpath(opath);
            callback(js, ui);
            Xonomy.replace(js.htmlID, js);
        };
    }

    function setIfNotChanged(js, key, oldval, newval) {
        oldval = Math.round(oldval);
        newval = Math.round(newval);
        if (oldval !== newval)
            setOrCreateAttribute(js, key, newval+'px');
    }
    
    if (options.draggable) {
        $item.draggable({
            containment: options.draggable,
            autoHide: true,
            stop: applyResult((js, ui) => {
                setIfNotChanged(js, 'x', ui.originalPosition.left, ui.position.left);
                setIfNotChanged(js, 'y', ui.originalPosition.top, ui.position.top);
            }),
        });
    }

    if (options.rotatable) {
        $item.rotatable({
            transforms: parseTransform(transform),
            autoHide: true,
            wheelRotate: false,
            stop: applyResult((js, ui) => {
                var radians = calculateAngle($item.get(0));
                var degrees = Math.round(radians * 180/Math.PI);
                setOrCreateAttribute(js, 'transform', 'rotate('+degrees+'deg)');
            }),
        });
    }
    if (options.resizable) {
        $item.resizable({
            containment: options.resizable,
            handles:"all",
            autoHide: true,
            stop: applyResult((js, ui) => {
                setIfNotChanged(js, 'x', ui.originalPosition.left, ui.position.left);
                setIfNotChanged(js, 'y', ui.originalPosition.top, ui.position.top);
                setIfNotChanged(js, 'w', ui.originalSize.width, ui.size.width);
                setIfNotChanged(js, 'h', ui.originalSize.height, ui.size.height);
            }),
        });
    }
}

function publishData(data, callback) {
    $.ajax({
        url: 'https://api.github.com/gists',
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify(data),
        error: (e) => report_error('Gist upload error: ', e),
        success: callback
    });
}

function publishSTL(js) {
    $("body").css("cursor", "progress");
    js = js || harvestRootElement();
    jsPrettify(js, false, '  ');
    var xml = js2xml(js, g_stl_schema);
    var data = {
        "description": "STL uploaded from STL online editor",
        "public": true,
        "files": {
            "stl.xml": {
                "content": xml,
                "type": "text/xml"
            }
        }
    };
    Xonomy.clickoff();
    publishData(data, function(result) {
        var url = result.files['stl.xml'].raw_url;
        window.location.search = '?stl=' + url;
    });
}

function toggleMode() {
    Xonomy.setMode(Xonomy.mode === 'laic' ? 'nerd' : 'laic');
}

function walkChildren(node, before, after) {
    var c = node.firstChild;
    var next;
    while (c) {
        next = c.nextSibling;
        walkTheDOM(c, before, after);
        c = next;
    }
}

function walkTheDOM(node, before, after) {
    if (before(node)) {
        walkChildren(node, before, after);
    }
    after(node);
}

function previewManager() {
    var stl2html = require('html').stl2html;
    var services = require('services');
    var prettify = xmlPrettifier();
    var proxy = services.proxy(g_service_url+'/api', function (response) {
        if (response.status === 'success') {
            $('#tab-preview-st, #tab-preview-data').removeAttr("disabled");
        }
    });
    
    function postprocessPages($elem, backgrounds) {
        function getLabel($elem) {
            return '<div class="label">'+getItemSelector($elem)+'</div>';
        }
        var $document = $elem.find('div[data-stl-class="stl:document"]');
        var $stories = $document.find('> div[data-stl-class="stl:story"]');
        var $pages = $document.find('> div[data-stl-class="stl:page"]');
        $stories.each(function () {
            var $this = $(this);
            //$this.wrap('<div class="story-paper"></div>');
            $this.addClass('story-paper');
            $this.parent().append(getLabel($this));
        });
        $pages.each(function () {
            var $this = $(this);
            $this.addClass('page-paper');
            $this.append(getLabel($this));
            var bg = $this.attr('data-stl-background');
            if (bg) {
                var hash = backgrounds[bg];
                $this.css('background-image', 'url('+proxy.hash2uri(hash)+')' );
            }
        });
    }

    function postprocessVisualize($elem) {
        function getStoryRef($elem, ref) {
            var story = $elem.attr('data-stl-story');
            return '<div class="reference">stl:story["'+story+'"]</div>';
        }
        function getXPathRef($elem) {
            var xpath = $elem.attr('data-stl-xpath');
            return '<div class="reference">'+xpath+'</div>';
        }

        function collectXPaths($elem) {
            var xpaths = [];
            while(true) {
                var xpath = $elem.attr('data-stl-xpath');
                if (xpath)
                    xpaths.push(xpath);
                if (!xpath || xpath[0] === '/')
                    break;
                $elem = $elem.parent().closest('*[data-stl-xpath]');
            }
            xpaths.reverse();
            return xpaths;
        }

        var delay = (function(){
            var timer = 0;
            return function(callback, ms){
                clearTimeout (timer);
                timer = setTimeout(callback, ms);
            };
        })();

        function highlight($target) {
            $target.closest('*[data-stl-class]').addClass("highlight-node");
            var $tree = lookupTreeElement($target);
            $tree.addClass('highlight-tree');
            $tree.parents('.collapsed').addClass('highlight-tree');
        }

        function unHighlight() {
            var $xonomy = $('#xonomy');
            var $document = $elem.find('div[data-stl-class="stl:document"]');
            $document.find('.highlight-node').removeClass("highlight-node");
            $xonomy.find('.highlight-tree').removeClass("highlight-tree");
        }
        
        var $document = $elem.find('div[data-stl-class="stl:document"]');
        var $children = $document.find('> *[data-stl-class]');
        var $storyrefs = $document.find('*[data-stl-story]');
        var $xpathrefs = $document.find('*[data-stl-xpath]');
        
        $storyrefs.prepend(function () { return getStoryRef($(this)); });
        $xpathrefs.tooltip({
            content: function () { return collectXPaths($(this)).join('/'); },
            track: true,
            items: 'span'
        });
        // hover highlight (we cannot use hover event as we want to highlight only a very deepest element)
        $children.on("mousemove", function (e){
            delay(function() {
                unHighlight();
                highlight($(e.target));
            }, 10);
        }).on("mouseout", unHighlight);
    }
    
    function postprocessEdit($elem) {
        var $document = $elem.find('div[data-stl-class="stl:document"]');
        var $scripts = $document.find('*[data-stl-script]');
        var $pages = $document.find('> div[data-stl-class="stl:page"]');
        var $inlines = $document.find('.stl-inline-item > *[data-stl-class]');
        var $layouts = $pages.find([
            '> div[data-stl-class="stl:box"]',
            '> div[data-stl-class="stl:text"]',
            '> div[data-stl-class="stl:image"]',
            '> table[data-stl-class="stl:table"]'].join(', '));

        $scripts.append(function () { return '<script>' + $(this).attr('data-stl-script') + '</script>'; });
        // initialize modification handlers
        $pages.each((_, e) => initHandlers($(e), {resizable: "document"}));
        $inlines.each((_, e) => initHandlers($(e), {inline: true, resizable: "document", rotatable: false}));
        $layouts.each((_, e) => initHandlers($(e), {resizable: "parent", draggable: "parent", rotatable: true}));
        
    }
    
    function postprocessData($elem, xml) {
        var data = require('data');
        data.bind(xml);

        function processData(root, data) {
            var data_stack = [data];

            function visit(elem, cursor) {
                var cls = elem.dataset.stlClass;
                switch(cls) {
                case 'stl:chart': {
                    var child = elem.firstChild;
                    var scd = child.textContent;
                    elem.removeChild(child);
                    var svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
                    require('charts').stlchartnew(scd, cursor, svg);
                    elem.appendChild(svg);
                    break;
                }
                case 'stl:switch': {
                    var datakey = cursor.dump ? cursor.dump('string(.)') : cursor;
                    var selected = null;
                    var defcase = null;
                    walkChildren(elem, function (child) {
                        var key = child.dataset ? child.dataset.stlKey : null;
                        if (key === datakey)
                            selected = child;
                        else if (key === undefined)
                            defcase = child;
                        return false;
                    }, () => {});
                    if (!selected)
                        selected = defcase;
                    selected.dataset.stlOpath = getItemSelector($(selected));
                    walkChildren(elem, function (child) {
                        if (child !== selected)
                            elem.removeChild(child);
                        return false;
                    }, () => {});
                    walkTheDOM(selected, before, after);
                    break;
                }
                case 'stl:repeater': {
                    var parent = elem.parentNode;
                    var sibling = elem.nextSibling;
                    elem.dataset.stlOpath = getItemSelector($(elem));
                    parent.removeChild(elem);
                    cursor.forEach(function (it, index) {
                        var instance = elem.cloneNode(true);
                        instance.dataset.stlXpath += '['+(index+1)+']';
                        data_stack.push(it);
                        walkChildren(instance, before, after);
                        data_stack.pop();
                        parent.insertBefore(instance, sibling);
                    });
                    break;
                }
                case 'stl:field':
                    elem.textContent = cursor.dump ? cursor.dump('string(.)') : cursor;
                    break;
                case 'stl:scope':
                    walkChildren(elem, before, after);
                    break;
                case 'stl:input': {
                    var def = cursor.js('*');
                    console.log(def);
                    switch(elem.dataset.stlType) {
                    case 'radio':
                    case 'checkbox': {
                        var select = cursor.js('..');
                        console.log(select);
                        var choice = def['ddi:choice'];
                        elem.setAttribute('value', choice._);
                        elem.setAttribute('name', select['ddi:input-group'].name);
                        if (choice.selected === 'true')
                            elem.setAttribute('checked', true);
                        break;
                    }
                    case 'text':
                    case 'submit':
                        elem.setAttribute('name', def['ddi:input'].name);
                        elem.setAttribute('placeholder', def['ddi:input']._);
                        break;
                    case 'dropdown':
                    case 'listbox':
                        def['ddi:input-group'].choice.forEach(function (c) {
                            var choice = c['ddi:choice'];
                            var option = document.createElement('option');
                            option.setAttribute('value', choice._);
                            if (choice.selected === 'true')
                                option.setAttribute('selected', true);
                            option.innerHTML = c['ddi:label'];
                            elem.appendChild(option);
                        });
                        break;
                    default:
                        throw new Error('Unsupported input type: ' + elem.dataset.stlType);
                    }
                    break;
                }
                default:
                    console.error("Unsupported data class: " + cls);
                }
            }
            
            function before(node) {
                if (node.dataset) {
                    var xpath = node.dataset.stlXpath;
                    if (xpath) {
                        var top = data_stack[data_stack.length-1];
                        var cursor = top.dom(xpath);
                        data_stack.push(cursor);
                        visit(node, cursor);
                        return false;
                    }
                }
                return true;
            }
            
            function after(node) {
                if (node.dataset && node.dataset.stlXpath) {
                    data_stack.pop();
                }
            }
            
            walkTheDOM(root, before, after);
        }
        processData($elem.get(0), data);
    }

    function postprocessLinks($elem, fixtures) {
        var $document = $elem.find('div[data-stl-class="stl:document"]');
        // we postprocess *all* images (even onew comming through an XHTML story)
        //var $images = $document.find('img[data-stl-class="stl:image"]');
        var $images = $document.find('img');
        $images.each(function() {
            var $this = $(this);
            var src = $this.attr('src');
            var f = fixtures[src];
            src = f
                ? f.url
                : src.replace(/^cas:/, 'cas/').replace(/^wd:/, 'wd');
            $this.attr('src', src);
        });
    }
    
    function callTDT(template, source, rules, callback) {
        // @todo: implement parallel uploads
        upload('template.xml', template, 'text/xml', function (template_hash) {
            upload('source.xml', source, 'text/xml', function (source_hash) {
                upload('rules.xml', rules, 'text/xml', function (rules_hash) {
                    var inputs = {
                        source: source_hash,
                        rules: rules_hash,
                        template: template_hash
                    };
                    proxy.tdt(inputs, callback);
                });
            });
        });
    }
    
    function callSTL(markup, options, callback) {
        upload('design.xml', markup, 'text/xml', function (hash) {
            proxy.stl({design: hash, options: options}, callback);
        });
    }

    function previewHTML($elem, stl) {
        function str2ab(bytestr) {
            var ab = new ArrayBuffer(bytestr.length);
            var ia = new Uint8Array(ab);
            for (var i = 0; i < bytestr.length; i++)
                ia[i] = bytestr.charCodeAt(i);
            return ab;
        }
        
        function handle_fixture(attrs, stream) {
            var content = stream.read();
            if (attrs.encoding === 'base64')
                content = str2ab(window.atob(content));
            var blob = new Blob([content], {type: attrs.type});
            var url = URL.createObjectURL(blob);
            return {
                key: attrs.key,
                type: attrs.type,
                blob: blob,
                url: url
            };
        }
        
        function is_trivial_tdt(rules) {
            if (rules) {
                var domParser = new DOMParser();
                var xmlDoc = domParser.parseFromString(rules, 'application/xml');
                if (xmlDoc.children[0].children.length)
                    return false; // there are some tdt rules
            }
            return true;
        }
        
        var result = {};
        var fixtures = {};
        var options = {
            handlers: {
                data: (data) => result.data = data,
                fixture: (attrs, stream) => fixtures[attrs.key] = handle_fixture(attrs, stream)
            }
        };
        try {
            result.html = stl2html(stl, options);
        } catch(e) {
            return report_error('Preview Error', e.message, $elem);
        }
        $elem.html(result.html);
        postprocessLinks($elem, fixtures);
        postprocessPages($elem);
        if (result.data && result.data.source) {
            var source = result.data.source['_default'];
            var template = result.data.template;
            var rules = result.data.rules['_default'];

            if (rules && !template)
                throw new Error("Missing stl:template");
            if (!is_trivial_tdt(rules)) {
                if (proxy.status() !== 'failure') {
                    return callTDT(template, source, rules, function(response) {
                        if (response.error)
                            return report_error('Preview Error', response.error, $elem);            
                        proxy.content(response.result.id, function (data) {
                            postprocessData($elem, data);
                            postprocessVisualize($elem);
                            postprocessEdit($elem);
                        });
                    });
                }
            } else {
                postprocessData($elem, rules ? template : source);
            }
        }
        postprocessVisualize($elem);
        postprocessEdit($elem);
    }

    function previewST($elem, markup, width) {
        var options = {
            validate: true,
            rasterizer: { type: 'svg' },
            layout: {},
            data: { source: '_default', rules: '_default' },
            target: { width: width, padding: '20px 40px' }
        }
        callSTL(markup, options, function(response) {
            if (response.error)
                return report_error('Preview Error', response.error, $elem);            
            var layout = response.result.find((r) => r.name === 'layout.xml');
            proxy.content(layout.id, function (layout) {
                console.log(layout);
                var backgrounds = {}
                var options = {
                    handlers: {
                        fixture: (attrs, stream) => backgrounds[attrs.key] = attrs.src.split(':')[1]
                    }
                };
                try {
                    var html = stl2html(layout, options);
                } catch(e) {
                        return report_error('Preview Error', e.message, $elem);
                }
                $elem.html(html);
                postprocessPages($elem, backgrounds);
                postprocessVisualize($elem);
            });
        });
    }

    function previewData($elem, markup) {
        var options = {
            data: { source: '_default', rules: '_default', persist: true },
            target: { width: '1000px' }
        };
        callSTL(markup, options, function(response) {
            if (response.error)
                return report_error('Preview Error', response.error, $elem);
            var data = response.result.find((r) => r.name === 'data.xml');
            proxy.content(data.id, function (data) {
                var hl = hljs.highlight('xml', prettify(data));
                console.log(hl);
                $elem.html('<div class="data-paper">'+hl.value+'</div>');
            });
        });
    }
        
    var state = {
        type: 'html',
        width: null,
        markup: null,
        repo : {},
        last: {
            html: {},
            st: {},
            data: {},
        }
    };

    function upload(name, content, type, callback) {
        var rec = state.repo[name];
        if (rec && content === rec.content) {
            setTimeout(() => callback(rec.hash), 0); // make it asynchronous in any case
        } else {
            proxy.upload(name, content, type, function (response) {
                var hash = response.result[0].id;
                state.repo[name] = { content: content, hash: hash };
                callback(hash);
            });
        }
    }

    function changeState(changes) {
        if (changes.type !== undefined) // preview type has changed
            state.type = changes.type;

        if (!proxy && state.type !== 'html')
            throw new Error("Proxy not available");

        var $elem = $('#preview-'+state.type);
        var last = state.last[state.type];
        
        // view resize
        state.width = changes.width || $elem.width()+'px';
        
        if (changes.markup !== undefined)    // markup has changed
            state.markup = changes.markup;

        if (!state.markup)
            return;
        
        switch (state.type) {
        case 'html':
            if (state.markup !== last.markup) {
                $elem.append('<div class="loading"></div>');
                last.markup = state.markup;
                previewHTML($elem, state.markup);
            }
            break;
        case 'st':
            if (state.markup !== last.markup || state.width !== last.width) {
                $elem.append('<div class="loading"></div>');
                previewST($elem, state.markup, state.width);
                last.markup = state.markup;
                last.width = state.width;
            }
            break;
        case 'data':
            if (state.markup !== last.markup) {
                $elem.append('<div class="loading"></div>');
                previewData($elem, state.markup);
                last.markup = state.markup;
            }
            break;
        default:
            throw new Error("Invalid preview type");
        }
    }
    
    return changeState;
};

function previewType(evt, type) {
    $(".tabcontent").hide();
    $(".tablinks").removeClass('active');
    $('#preview-'+type).show();
    $(evt.currentTarget).addClass('active');
    g_preview({type: type});
}

function previewMarkup() {
    var js = harvestRootElement();
    var stl = js2xml(js, g_stl_schema);
    g_preview({markup: stl});
}

function previewWidth() {
    g_preview({width: null});
}

g_stl_schema.unknown = defaultSpec;
g_stl_schema.onchange = previewMarkup;
                   
function initialize() {
    g_preview = previewManager();
    var url = window.location.href;

    function handleParameters(callback) {
        function getParameterByName(name) {
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        }
        
        var stl = getParameterByName('stl');
        var emp = getParameterByName('emp');
        var res = getParameterByName('resources');
        var input = stl || emp;
        if (input) {
            input = $.get(input);
            res = res ? $.get(res) : [];
            $.when(input, res)
                .done(function (input, res) {
                    input = input[0];
                    res = res[0];
                    var cfg = {
                        input: input,
                        format: stl ? 'stl' : 'emp',
                        options: {
                            resources: res,
                            css: getParameterByName('css'),
                            page: getParameterByName('page')
                        }
                    };
                    callback(cfg);
                })
                .fail(function (e) {
                    callback(null, e);
                });
        } else {
            callback();
        }
    }
    
    function initMarkup(cfg) {
        cfg = cfg || {};
        var xschema = XonomyBuilder.convertSchema(g_stl_schema, stlPreprocess, stlPostprocess);
        var stl = cfg.input || XonomyBuilder.xml('stl:stl', {version: '0.1'}, '', g_stl_schema.namespaces);
        if (cfg.format === 'emp') {
            stl = require('empower').emp2stl(stl, cfg.options);
        }
        var js = Xonomy.xml2js(stl);
        jsNormalize(js);
        Xonomy.render(js, $('#xonomy').get(0), xschema);
    }
    
    Split(['#left', '#right'], {
        sizes: [50, 50],
        minSize: 200,
        onDragEnd: previewWidth,
    });
    
    handleParameters(function (cfg, error) {
	    initMarkup(cfg);
        if (error) {
            report_error('Loading Error', error.statusText);
            // intentionally no preview here
        } else {
            previewMarkup();
        }
    });
    $('#tab-preview-html').click();
}

// Story overflow:
// https://developer.mozilla.org/en-US/docs/Web/API/Document/caretPositionFromPoint
// https://codepen.io/anon/pen/WXGbQM
