"use strict";

var cheerio = require('cheerio');
var util = require('util');

exports.document = function (html) {
    var $ = cheerio.load(html);
    var grid_initialized = false;

    function stringize(data) {
        return util.inspect(data, {depth: null});
    }

    function script(uri, selector) {
        selector = selector || $('head').children().last();
        $('\n  <script type="text/javascript" src="' + uri + '"></script>')
            .insertAfter(selector);
    }

    function stylesheet(uri, selector) {
        selector = selector || $('head').children().last();
        $('\n  <link rel="stylesheet" type="text/css" media="screen" href="' + uri + '"/>')
            .insertAfter(selector);
    }

    // function inline_script(name, data, selector) {
    //     selector = selector || $('head').children().last();
    //     $('\n  <script type="text/javascript">\n  var ' + name + ' = ' + stringize(data) + ';\n  </script>')
    //         .insertAfter(selector);
    // }

    function save() {
        return $.html();
    }

    function find(selector) {
        return $(selector);
    }

    function grid_initialize() {
        if (!grid_initialized) {
            stylesheet("http://code.jquery.com/ui/1.11.4/themes/redmond/jquery-ui.css");
            script("https://code.jquery.com/jquery-1.11.1.min.js");
            script("https://code.jquery.com/ui/1.11.4/jquery-ui.min.js");

            stylesheet("https://cdnjs.cloudflare.com/ajax/libs/jqgrid/4.6.0/css/ui.jqgrid.css");
            script("https://cdnjs.cloudflare.com/ajax/libs/jqgrid/4.6.0/js/jquery.jqGrid.min.js");
            script("https://cdnjs.cloudflare.com/ajax/libs/jqgrid/4.6.0/js/i18n/grid.locale-en.js");

            grid_initialized = true;
        }
    }

    function table(table_selector, id, options, data, selector) {
        grid_initialize();

        selector = selector || $('head').children().last();
        var tbl = $(table_selector);
        tbl.attr('id', id);
        tbl.removeAttr('style');
        tbl.empty();

        options.datatype = 'local';
        options.rowNum = data.length;
        options.altRows = true;
        options.altclass = 'alt-row-class';

        $('\n  <style>\n'
                + '    #gbox_' + id + ' tr, td, span, div { font-size:11px }\n'
                + '    .alt-row-class { background-color: #EEEEED; background-image: none; }'
                + '  </style>\n'
                + '  <script type="text/javascript">\n'
                + '  $(document).ready(function() {\n'
                + '    var data = ' + stringize(data) + ';\n'
                + '    $("#' + id + '").jqGrid(\n'
                + '     ' + stringize(options) + ');\n'
                + '    $("#' + id + '").setGridParam({data: data}).trigger("reloadGrid");\n'
                + '    $(window).bind("resize", function() {\n'
                + '      $("#' + id + '").setGridWidth($("body").innerWidth());\n'
                + '    }).trigger("resize");\n'
                + '  });\n'
                + '  </script>').insertAfter(selector);
    }

    return {
        find: find,
        stylesheet: stylesheet,
        script: script,
        table: table,
        save: save
    };
};

