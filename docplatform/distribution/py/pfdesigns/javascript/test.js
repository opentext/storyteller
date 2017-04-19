"use strict";

exports.dateformat = function () {
    // https://github.com/felixge/node-dateformat
    var dateFormat = require('dateformat');
    var now = new Date(2014, 10, 26, 13, 19, 44);
    console.log(dateFormat(now, 'shortDate'));
    console.log(dateFormat(now, 'fullDate'));
};

exports.he = function () {
    // https://github.com/mathiasbynens/he
    var he = require('he');
    var str = he.unescape('foo &copy; bar &ne; baz &#x1D306; qux');
    console.log(str);
};

exports.xmldom = function () {
    // https://github.com/jindw/xmldom
    var xmldom = require('xmldom');
    // https://github.com/yaronn/xpath.js
    var select = require('xpath');

    var parser = new xmldom.DOMParser();
    var writer = new xmldom.XMLSerializer();

    var xml = "<books><book author='J. K. Rowling'><title>Harry Potter</title></book></books>";
    var doc = parser.parseFromString(xml);
    var author = select(doc, "//book/@author")[0];
    console.log(author.value);
    author.value = 'Alex Stepanov';
    console.log(writer.serializeToString(doc));
};

exports.markup = function () {
    // https://github.com/adammark/Markup.js
    var Mark = require('markup-js');

    var context = {
        name: "John Doe",
        addr: {
            street: "1 Maple Street",
            city: "Pleasantville",
            zip: {
                main: "12345",
                ext: "6789"
            }
        }
    };

    var template = "{{name}} lives at {{addr.street}} in {{addr.city}}.";

    var result = Mark.up(template, context);
    // "John Doe lives at 1 Maple Street in Pleasantville."

    console.log({
        context: context,
        template: template,
        result: result
    });
};

