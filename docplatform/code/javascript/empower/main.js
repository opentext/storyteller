'use strict';

var empower = require('empower');

function init_editors() {
    Split(['#left', '#right']);
}

function correct_indenter(tag, tags, start) {
    function is_flat(t) {
        return t === 'stl:span' || t === 'stl:p';
    }

    if (start) {
        if (tag === 'stl:span' || !tags.length || is_flat(tags[tags.length - 1])) {
            return '';
        }
    } else {
        if (is_flat(tag)) {
            return '';
        }
    }
    return '  ';
}

function emp2stl(json) {
    var stl;
    try {
        stl = empower.emp2stl(json, {indent: correct_indenter, css: true});
    } catch (e) {
        stl = e;
    }
    return stl;    
}

function stl2emp(stl) {
    var json;
    try {
        json = empower.stl2emp(stl, {indent: 2});
    } catch (e) {
        json = e;
    }
    return json;    
}

var oldJSON = "";
var oldSTL = "";

function init_events() {
    $("#json").on("change keyup paste", function() {
        var json = $(this).val();
        if (json === oldJSON)
            return;
        oldJSON = json;
        var stl = emp2stl(json);
        $("#stl").val(stl);
    });

    $("#stl").on("change keyup paste", function() {
        var stl = $(this).val();
        if (stl === oldSTL)
            return;
        oldSTL = stl;
        var json = stl2emp(stl);
        $("#json").val(json);
    });
}

window.onload=function(){
    init_editors();
    init_events();
}

