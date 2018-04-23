'use strict';

//const g_service_url = '';
const g_service_url = 'https://cem-dev-karim.eastus.cloudapp.azure.com/storyteller';
var g_preview = null;
var g_prettify_xml = xmlPrettifier();
var g_data = {
    tdt: '',
    index: 0,
    files: [
        {name: '[empty]', content: '', rules: '_default'}
    ]
};

function getParameterByName(name, url) {
    url = url || window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

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
    $elem = $elem || $('#preview-main');
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

function publishSTL(stl, data) {
    function publishGist(gist, callback) {
        $.ajax({
            url: 'https://api.github.com/gists',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(gist),
            error: (e) => report_error('Gist upload error: ', e.message),
            success: callback
        });
    }

    $("body").css("cursor", "progress");
    var gist = {
        "description": "Content published from STL online editor",
        "public": true,
        "files": {
            "stl.xml": { content: stl, type: "application/xml" }
        }
    };
    if (data.tdt)
        gist.files['tdt.xml'] = {content: data.tdt, type: "application/xml"};
    data.files.forEach(function (file, i) {
        if (i > 0) {
            var key = '' + i + '-data-(' + file.rules + ')-' + encodeURI(file.name); 
            gist.files[key] = { content: file.content, type: "application/xml" };
        }
    });
    Xonomy.clickoff();
    publishGist(gist, function(result) {
        window.location.search = '?gist=' + result.id;
    });
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
    var proxy = services.proxy(g_service_url+'/api', function (response) {
        if (response.status === 'success') {
            $('#tab-preview-layout, #tab-preview-stl, #tab-preview-data, #tab-preview-pdf, #tab-preview-docx').removeAttr("disabled");
            $('#tab-editor-data, #tab-editor-tdt').removeAttr("disabled");
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
                var cls = $elem.attr('data-stl-class');
                if (cls !== 'stl:repeater')
                    break;
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
            var $xonomy = $('#editor-layout');
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

            function visit(cls, elem, cursor) {
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
                    switch(elem.dataset.stlType) {
                    case 'radio':
                    case 'checkbox': {
                        var select = cursor.js('..');
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

            function pushes_cursor(cls) {
                switch(cls) {
                case 'stl:repeater':
                case 'stl:input':
                case 'stl:chart':
                    return true;
                default:
                    return false;
                }
            }
            
            function before(node) {
                if (node.dataset) {
                    var xpath = node.dataset.stlXpath;
                    if (xpath) {
                        var cls = node.dataset.stlClass;
                        var top = data_stack[data_stack.length-1];
                        var value = top.dom(xpath);
                        if (pushes_cursor(cls))
                            data_stack.push(value);
                        visit(cls, node, value);
                        return false;
                    }
                }
                return true;
            }
            
            function after(node) {
                if (node.dataset && node.dataset.stlXpath) {
                    var cls = node.dataset.stlClass;
                    if (pushes_cursor(cls))
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
    
    function callTDT(source, template, rules, params) {
        source = upload('source.xml', source, 'text/xml');
        template = upload('template.xml', template, 'text/xml');
        rules = upload('rules.xml', rules, 'text/xml');
        return Promise.all([source, template, rules])
            .then(hashes => { 
                var inputs = {
                    source: hashes[0],
                    template: hashes[1],
                    rules: hashes[2],
                    options: {
                        mode: 127,
                        params: params || {}
                    }
                };
                return proxy.tdt(inputs);
            });
    }
    
    function callSTL(design, data, tdt, options) {
        // convert STL (if there is a TDT defined) or simply upload it
        design = tdt && data
            ? callTDT(data, design, tdt).then(response => response.result.id)
            : upload('design.xml', design, 'text/xml');
        // upload data
        data = data ? upload('data.xml', data, 'text/xml') : null;
        // when everything is ready - call the STL service
        return Promise.all([design, data])
            .then( hashes => {
                var inputs = {
                    design: hashes[0],
                    options: options
                };
                if (hashes[1])
                    inputs.data = hashes[1];
                return proxy.stl(inputs);
            });
    }

    function previewMain($elem, state) {
        function prepareDesign(state) {
            if (state.tdt && state.data) {
                return callTDT(state.data, state.markup, state.tdt)
                    .then(response => proxy.content(response.result.id) );
            } else {
                return Promise.resolve(state.markup);
           }
        }

        function convertDesign(state, design) {
            function str2ab(bytestr) {
                var ab = new ArrayBuffer(bytestr.length);
                var ia = new Uint8Array(ab);
                for (var i = 0; i < bytestr.length; i++)
                    ia[i] = bytestr.charCodeAt(i);
                return ab;
            }
            
            function handleFixture(attrs, stream) {
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
            
            var result = {
                data: {}
            };
            var fixtures = {};
            var options = {
                handlers: {
                    data: (data) => result.data = data,
                    fixture: (attrs, stream) => fixtures[attrs.key] = handleFixture(attrs, stream)
                }
            };

            var html = stl2html(design, options);
            $elem.html(html);
            postprocessLinks($elem, fixtures);
            postprocessPages($elem);
            
            if (state.data)
                result.data.source = {'_default': state.data};
            return Promise.resolve(result.data);
        }
        
        function convertData(state, data) {
            function isTrivialTDT(rules) {
                if (rules) {
                    var domParser = new DOMParser();
                    var xmlDoc = domParser.parseFromString(rules, 'application/xml');
                    if (xmlDoc.children[0].children.length)
                        return false; // there are some tdt rules
                }
                return true;
            }
            
            if (!data.source)
                return Promise.resolve(null);

            var source = data.source['_default'];
            var template = data.template;
            var rules = data.rules ? data.rules[state.rules] : null;
            
            if (rules && !template)
                return Promise.reject(new Error("Missing stl:template"));
            
            if (isTrivialTDT(rules))
                return Promise.resolve(rules ? template : source);

            return callTDT(source, template, rules)
                .then(response => proxy.content(response.result.id) );
        }

        prepareDesign(state)
            .then(design => convertDesign(state, design))
            .then(data => convertData(state, data))
            .then(data => {
                if (data)
                    postprocessData($elem, data);
                postprocessVisualize($elem);
                postprocessEdit($elem);
                processingComplete();
            })
            .catch(error => processingFailed($elem, error));            
    }
    
    function previewLayout($elem, state) {
        var options = {
            validate: true,
            properties: {language: 'en-US'},
            driver: {type: 'svg'},
            layout: {},
            data: {source: '_default', rules: state.rules},
            frame: {width: state.width, padding: '20px 40px'}
        }
        callSTL(state.markup, state.data, state.tdt, options)
            .then( response => {
                var layout = response.result.find((r) => r.name === 'layout.xml');
                return proxy.content(layout.id);
            })
            .then( layout => {
                var backgrounds = {}
                var options = {
                    handlers: {
                        fixture: (attrs, stream) => backgrounds[attrs.key] = attrs.src.split(':')[1]
                    }
                };
                var html = stl2html(layout, options);
                $elem.html(html);
                postprocessPages($elem, backgrounds);
                postprocessVisualize($elem);
                processingComplete();
            })
            .catch(error => processingFailed($elem, error) );
    }

    var state = {
        processing: false,
        pending: null,
        repo : {},
        current: {
            type: 'main',
            width: null,
            tdt: null,
            markup: null,
            data: null,
            rules: '_default'
        },
        last: {
            main: {},
            layout: {},
            stl: {},
            data: {},
            pdf: {},
            docx: {},
            html: {}
        }
    };

    function upload(name, content, type) {
        var rec = state.repo[name];
        if (rec && content === rec.content) {
            return Promise.resolve(rec.hash);
        }
        return proxy.upload(name, content, type)
            .then( response => {
                var hash = response.result[0].id;
                state.repo[name] = { content: content, hash: hash };
                return hash;
            });
    }

    function previewEmbed($elem, state, options, filename, makeEmbed) {
        callSTL(state.markup, state.data, state.tdt, options)
            .then(response => {
                var document = response.result.find((r) => r.name === filename);
                var url = proxy.hash2uri(document.id);
                var html = makeEmbed(url);
                $elem.html(html);
                processingComplete();
            })
            .catch(error => processingFailed($elem, error) );
    }
    
    function previewXML($elem, state, options, filename) {
        return callSTL(state.markup, state.data, state.tdt, options)
            .then(response => {
                var data = response.result.find((r) => r.name === filename);
                return proxy.content(data.id);
            })
            .then(data => {
                var hl = hljs.highlight('xml', g_prettify_xml(data));
                $elem.html('<div class="data-paper">'+hl.value+'</div>');
                processingComplete();
            })
            .catch(error => processingFailed($elem, error));
    }
    
    function previewData($elem, state) {
        var options = {
            properties: {language: 'en-US'},
            data: {source: '_default', rules: state.rules, persist: true},
            frame: {width: '1000px'}
        };
        previewXML($elem, state, options, 'data.xml');
    }

    function previewSTL($elem, state) {
        var options = {
            validate: true,
            properties: {language: 'en-US'},
            data: {source: '_default', rules: state.rules, persist: true},
            frame: {width: '1000px'}
        };
        previewXML($elem, state, options, 'preprocessed.xml');
    }
    
    
    function previewPDF($elem, state) {
        var options = {
            validate: true,
            properties: {language: 'en-US'},
            driver: {type: 'pdf'},
            data: {source: '_default', rules: state.rules},
            frame: {width: state.width, padding: '20px 40px'}
        }
        previewEmbed(
            $elem, state, options,
            'document.pdf',
            url => '<iframe src="'+url+'" style="width:100%; height: calc(100vh - 110px); border:none;"></iframe>' ); 
    }

    function previewDOCX($elem, state) {
        var options = {
            validate: true,
            properties: {language: 'en-US'},
            driver: {type: 'docx'},
            data: {source: '_default', rules: state.rules},
            frame: {width: state.width, padding: '20px 40px'}
        }
        previewEmbed(
            $elem, state, options,
            'document.docx',
            function (url) {
                //var url = 'https://docs.google.com/gview?url='+url+'&embedded=true';
                var url = 'https://view.officeapps.live.com/op/embed.aspx?src='+url;
                return '<iframe src="'+url+'" style="width:100%; height: calc(100vh - 110px); border:none; frameborder:0;"></iframe>';         });       
    }

    function previewHTML($elem, state) {
        var options = {
            validate: true,
            properties: {
                language: 'en-US',
			    GenerateInlineImages: '1',
			    InlineCSS: '1',
		        CodePage: 'UTF-8',
			    OutputWideChar: '0',
			    RasterizeFragments: '0'
            },
            driver: {type: 'html'},
            data: {source: '_default', rules: state.rules},
            frame: {width: state.width, padding: '20px 40px'}
        }
        previewEmbed(
            $elem, state, options,
            'document.docx',
            url => '<iframe src="'+url+'" style="width:100%; height: calc(100vh - 110px); border:none; frameborder:0;"></iframe>' );
    }

    function handleChanges(changes) {
        if (state.pending)
            throw new Error("Internal state error!");
        if (!Object.keys(changes).length)
            return;
        var current = state.current;
        if (changes.type !== undefined) // preview type has changed
            current.type = changes.type;
        if (changes.data !== undefined)
            current.data = changes.data;
        if (changes.rules !== undefined)
            current.rules = changes.rules;
        if (changes.tdt !== undefined)
            current.tdt = changes.tdt;
        if (changes.markup !== undefined)    // markup has changed
            current.markup = changes.markup;
        if (!proxy && current.type !== 'main')
            throw new Error("Proxy not available");

        var $elem = $('#preview-'+current.type);
        var last = state.last[current.type];
        
        // view resize
        current.width = changes.width || $elem.width()+'px';
        
        if (!current.markup)
            return;

        function checkChanges($elem, keys) {
            var result = false;
            keys.forEach(function (key) {
                if (last[key] !== current[key]) {
                    result = true;
                    last[key] = current[key];
                }
            });
            if (result) {
                $elem.append('<div class="loading"></div>');
                state.pending = {};
            }
            return result;
        }
        
        switch (current.type) {
        case 'main':
            if (checkChanges($elem, ['markup', 'data', 'rules', 'tdt']))
                previewMain($elem, current);
            break;
        case 'layout':
            if (checkChanges($elem, ['markup', 'data', 'rules', 'tdt', 'width']))
                previewLayout($elem, current);
            break;
        case 'data':
            if (checkChanges($elem, ['markup', 'data', 'rules', 'tdt']))
                previewData($elem, current);
            break;
        case 'stl':
            if (checkChanges($elem, ['markup', 'data', 'rules', 'tdt']))
                previewSTL($elem, current);
            break;
        case 'pdf':
            if (checkChanges($elem, ['markup', 'data', 'rules', 'tdt', 'width']))
                previewPDF($elem, current);
            break;
        case 'docx':
            if (checkChanges($elem, ['markup', 'data', 'rules', 'tdt', 'width']))
                previewDOCX($elem, current);
            break;
        case 'html':
            if (checkChanges($elem, ['markup', 'data', 'rules', 'tdt', 'width']))
                previewHTML($elem, current);
            break;
        default:
            throw new Error("Invalid preview type");
        }
    }

    function processingFailed($elem, error) {
        processingComplete();
        if (error.message) // we support both strings and exceptions
            error = error.message;
        report_error('Preview Error', error, $elem);
    }
    
    function processingComplete() {
        if (state.pending) {
            var changes = state.pending;
            state.pending = null;
            handleChanges(changes);
        }
    }

    function changeState(changes) {
        if (state.pending) {
            // coalesce changes if there is already something pending
            Object.keys(changes).forEach(function (key) {
                state.pending[key] = changes[key];
            });
        } else
            handleChanges(changes);
    }
    
    return changeState;
};

function previewType(type) {
    $(".tab-preview-content").hide();
    $(".tab-preview-links").removeClass('active');
    $('#preview-'+type).show();
    $('#tab-preview-'+type).addClass('active');
    g_preview({type: type});
}

function editorType(type) {
    $(".tab-editor-content").hide();
    $(".tab-editor-links").removeClass('active');
    $('#editor-'+type).show();
    $('#tab-editor-'+type).addClass('active');
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

    function handleParameters() {
        function initMarkupSTL(stl, data, tdt) {
            stl = stl || XonomyBuilder.xml('stl:stl', {version: '0.1'}, '', g_stl_schema.namespaces);
            data = data || [];
            tdt = tdt || '';
            var js = Xonomy.xml2js(stl);
            jsNormalize(js);
            var xschema = XonomyBuilder.convertSchema(g_stl_schema, stlPreprocess, stlPostprocess);
            Xonomy.render(js, $('#editor-layout').get(0), xschema);
            g_data.tdt = tdt;
            g_data.files = g_data.files.concat(data);
            g_data.index = g_data.files.length-1;
            initDataEditor(g_data);
            initTDTEditor(g_data); 
            stl = js2xml(js, g_stl_schema);
            var file = g_data.files[g_data.index];
            g_preview({type: 'main', markup: stl, tdt: g_data.tdt, data: file.content, rules: file.rules});
        }

        function handleError(error) {
            report_error('Loading Error', error.statusText);
        }
        
        function handleGist(id) {
            $.get('https://api.github.com/gists/'+id)
                .done(function(gist) {
                    var data = [];
                    var stl = gist.files['stl.xml'].content;
                    var tdt = gist.files['tdt.xml'] ? gist.files['tdt.xml'].content : '';
                    var pattern = /^[0-9]+-data(-\((.*)\))?-(.*)$/;
                    Object.keys(gist.files).forEach(function(key) {
                        var m = key.match(pattern);
                        if (m) {
                            var rules = m[2] === undefined ? '_default' : m[2];
                            var name = m[3];
                            var content = gist.files[key].content;
                            data.push({name: name, content: content, rules: rules});
                        }
                    });
                    initMarkupSTL(stl, data, tdt);
                })
                .fail(handleError);
        }

        function getContent(url) {
            return $.ajax({
                url: url,
                type: 'GET',
                contentType: false,
                processData: false,
                cache: true,
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true
            });
        }
        
        function handleSTL(stl, data) {
            stl = stl ? $.get(stl) : [];
            data = data ? $.get(data) : [];
            $.when(getContent(stl), getContent(data))
                .done(function (stl, data) {
                    initMarkupSTL(stl[0], data);
                })
                .fail(handleError);
        }

        function handleEMP(emp, res, css, page) {
            emp = $.get(emp);
            res = res ? $.get(res) : [];
            $.when(getContent(emp), getContent(res))
                .done(function (emp, res) {
                    var options = {
                        resources: res,
                        css: css,
                        page: page,
                    };
                    var stl = require('empower').emp2stl(emp[0], options);
                    initMarkupSTL(stl);
                })
                .fail(handleError);
        }
        
        var gist = getParameterByName('gist');
        if (gist)
            return handleGist(gist);
        var emp = getParameterByName('emp');
        if (emp)
            return handleEMP(emp, getParameterByName('resources'), getParameterByName('css'), getParameterByName('page'));
        return handleSTL(getParameterByName('stl'), getParameterByName('data'));
    }

    Split(['#left', '#right'], {
        sizes: [50, 50],
        minSize: 200,
        onDragEnd: previewWidth,
    });
    
    handleParameters();
    
    $('#btn-toggle-mode').click(function() {
        Xonomy.setMode(Xonomy.mode === 'laic' ? 'nerd' : 'laic');
    });
    $('#btn-publish').click(function(ev) {
        var js = harvestRootElement();
        jsPrettify(js, false, '  ');
        var stl = js2xml(js, g_stl_schema);
        publishSTL(stl, g_data);
    });
    var preview = getParameterByName('preview') || 'main';
    var editor = getParameterByName('editor') || 'layout';
    previewType(preview);
    editorType(editor);
}

function initTDTEditor(ctx) {
    var editor = window.ace.edit("tdt-content");
    var session = editor.getSession();
    session.setMode("ace/mode/xml");
    editor.resize();
    editor.$blockScrolling = Infinity;
    session.setValue(ctx.tdt);
    
    session.on('change', function() {
        var content = session.getValue();
        ctx.tdt = content;
        g_preview({tdt: content});
    });
}

function initDataEditor(ctx) {
    function rebuildList() {
        select.editableSelect('clear');
        ctx.files.forEach(function(file, i) {
            var attrs = {};
            select.editableSelect('add', file.name, i, attrs);
        });
        var list = select.find('~ ul.es-list > li.es-visible');
        select.editableSelect('select', list.eq(ctx.index));
        select.editableSelect('hide');
        onSelect(ctx.index);
    }

    function onSelect(index) {
        var content = ctx.files[index].content;
        var rules = ctx.files[index].rules;
        // a hack to avoid change event cascading
        // see: https://github.com/ajaxorg/ace/issues/503
        editor.$silentChange = true;
        session.setValue(content);
        editor.$silentChange = false;
        $('#data-rules').val(rules);
        editor.setReadOnly(index === 0);
        remove.get(0).disabled = (index === 0);
        g_preview({data: content, rules: rules});
    }
    
    function addFile(file) {
        var reader = new FileReader();
        reader.onload = function(ev) {
            var content = g_prettify_xml(event.target.result);
            ctx.files.push({name: file.name, content: content});
            ctx.index = ctx.files.length-1;
            rebuildList();
        };
        reader.readAsText(file);
    }
    
    $('#data-select').editableSelect({
        filter: false,
        duration: 'fast'
    });
    var select = $('#data-select');
    var editor = window.ace.edit("data-content");
    var session = editor.getSession();
    var remove = $('#data-remove');
    var add = $('#data-new');
    session.setMode("ace/mode/xml");
    editor.resize();
    editor.$blockScrolling = Infinity;
    select.on('select.editable-select', function (e, li) {
        if (li) {
            ctx.index = $(li).index();
            onSelect(ctx.index);
        }
    });
    session.on('change', function() {
        if (editor.$silentChange)
            return;
        var content = session.getValue();
        ctx.files[ctx.index].content = content;
        g_preview({data: content});
    });
    $('#data-files').change(function(ev) {
        var files = ev.target.files;
        for (var i = 0; i < files.length; i++) {
            addFile(files[i]);
        }
    });
    $('#data-rules').change(function(ev) {
        var rules = ev.target.value;
        ctx.files[ctx.index].rules = rules;
        g_preview({rules: rules});
    });
    select.change(function(ev) {
        var name = ev.target.value;
        ctx.files[ctx.index].name = name;
        rebuildList();
    });
    remove.click(function(ev) {
        if (ctx.index > 0) {
            ctx.files.splice(ctx.index, 1);
            ctx.index -= 1;
            rebuildList();
        }
    });
    add.click(function(ev) {
        ctx.index = ctx.files.length;
        var name = 'data'+ctx.index+'.xml';
        var content = '<data/>';
        ctx.files.push({name: name, content: content});
        rebuildList();
    });
    rebuildList();
}

// Story overflow:
// https://developer.mozilla.org/en-US/docs/Web/API/Document/caretPositionFromPoint
// https://codepen.io/anon/pen/WXGbQM
