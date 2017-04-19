"use strict";

exports.xkcd = function (options) {
    // https://github.com/adammark/Markup.js
    var Mark = require('markup-js');
    require('markup-js/i18n');
    require('markup-js/dates');

    var repo = require('repo');

    function load_comic(id) {
        // prepare uri and fetch XKCD comic JSON data
        id = id || '';
        var baseuri = "http://xkcd.com";
        var uri = baseuri + "/" + id + "/info.0.json";
        var json = repo.load(uri);
        var comic = JSON.parse(json);
        // patch the result - add date and link if it's missing
        comic.link = comic.link || ('http://xkcd.com/' + comic.num);
        comic.date = new Date(comic.year, comic.month, comic.day);
        return comic;
    }

    function load_article(id) {
        function is_numeric(w) {
            return w.match(/\d+/);
        }
        function replace_all(str, find, replace) {
            return str.replace(new RegExp(find, 'g'), replace);
        }
        function filter_html_xmldom(html) {
            function remove(node) {
                node.parentNode.removeChild(node);
                return node;
            }
            function fix_link(src) {
                if (src.value.charAt(0) === '/') {
                    src.value = baseuri + src.value;
                }
            }

            // https://github.com/jindw/xmldom
            var xmldom = require('xmldom');
            // https://github.com/yaronn/xpath.js
            var select = require('xpath');

            var parser = new xmldom.DOMParser();
            var writer = new xmldom.XMLSerializer();

            // parse the markup to DOM and find the article body
            var doc = parser.parseFromString(html);
            var articleNode = select(doc, "//article")[0];

            // cut DOM nodes containing metadata (id, title, question, ...)
            var linkNode = remove(select(articleNode, "a[1]")[0]);
            var questionNode = remove(select(articleNode, "p[@id='question']")[0]);
            var attributeNode = remove(select(articleNode, "p[@id='attribute']")[0]);

            var result = {};
            // parse metadata from corresponding DOM nodes
            result.link = 'http:' + select(linkNode, "@href")[0].value;
            result.id = +(result.link.split('/').filter(is_numeric)[0]);
            result.title = select(linkNode, "h1/text()")[0].data;
            result.question = select(questionNode, "text()")[0].data;
            result.attribute = select(attributeNode, "text()")[0].data;
            // make all local links absolute
            select(articleNode, "//img/@src").forEach(fix_link);
            // remove all refs
            select(articleNode, "//span[@class='ref']").forEach(remove);
            // serialize cleaned-up article node back to HTML markup
            result.body = writer.serializeToString(articleNode);
            result.body = replace_all(result.body, '\&apos;', "'");
            return result;
        }

        function filter_html_cheerio(html) {
            // https://github.com/cheeriojs/cheerio
            var cheerio = require('./lib/cheerio');
            var $ = cheerio.load(html);

            var article = $('article');

            var result = {};
            // parse metadata from corresponding DOM nodes
            result.link = article.children('a').attr('href');
            result.id = +(result.link.split('/').filter(is_numeric)[0]);
            result.title = article.find('a h1').text();
            result.question = article.children('#question').text();
            result.attribute = article.children('#attribute').text();

            // make all local links absolute
            article.find('img').each(function () {
                var src = $(this).attr('src');
                console.log(src);
                if (src[0] === '/') {
                    $(this).attr('src', baseuri + src);
                }
            });
            // remove all refs
            article.find('.ref').remove();
            // serialize cleaned-up article node back to HTML markup
            result.body = $.xml(article);
            result.body = replace_all(result.body, '\&apos;', "'");
            return result;
        }

        // prepare uri and fetch XKCD what-if HTML markup
        id = id || '';
        var baseuri = "http://what-if.xkcd.com";
        var uri = baseuri + "/" + id + "/index.html";
        var html = repo.load(uri);

        //return filter_html_xmldom(html);
        return filter_html_cheerio(html);
    }

    function load_recent(count, fn, current) {
        if (count <= 0) {
            return [];
        }
        var range = require('range');
        var records = [fn(current)];
        current = records[0].num - 1;
        return records.concat(range(current, current - count + 1, -1).map(function (num) {
            return fn(num);
        }));
    }

    // fetch N comics and M articles and put the resulting arrays to the context
    var context = {
        comics: load_recent(options.comics, load_comic, options.current_comic),
        articles: load_recent(options.articles, load_article, options.current_article)
    };

    // English messages
    Mark.includes = {
        comics_msg: "the most recent comic;;{{comics.length}} recent comics",
        articles_msg: "the most recent article;;{{articles.length}} recent articles"
    };

    // load the HTML template and run markup.js template engine
    var template = repo.load("wd:/xkcd.html");
    var html = '\ufeff' + Mark.up(template, context);

    // save the resulting markup and return the corresponding URI
    //repo.save("file:///tmp/xkcd.html", html);
    return html;
};

