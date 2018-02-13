var dir = 'samples/tdt/';
var types = {
    xml: 'application/xml',
    pdf: 'application/pdf'
};
var storyteller = require('./storyteller');

function pad(num, size) {
    var s = "000000000" + num;
    return s.substr(s.length-size);
}

function handleDesign(proxy, source, template, rules) {
    var fs = require('fs');
    var util = require('util');

    function file(response, filter) {
        var res = response.result;
        if (util.isArray(res)) {
            if (filter)
                res = res.filter(filter);
            return res[0];
        } else {
            return filter ? filter(res) ? res : null : res;
        }   
    }
    proxy.tdt(file(source).id, file(template).id, file(rules).id)
        .then(design => proxy.stl(file(design).id))
        .then(document => proxy.content(file(document, res => res.type === types.pdf).id))
        .then(content => {
            var src = file(source).name;
            var dst = src
                .replace(/.xml$/, '.pdf')
                .replace(/^data/, 'tdt');
            fs.writeFile(dst, content, (err) => {
                if (err)
                    console.error(err);
                else
                    console.log(src, '->', dst);
            });
        })
        .catch(console.error);
}

var proxy = storyteller.proxy();
proxy.ping()
    .then(_ => Promise.all([
        proxy.upload(dir+'template.xml', types.xml),
        proxy.upload(dir+'rules.xml', types.xml)
    ]))
    .then(data => {
        for (var i=1; i<12; ++i) {
            var datapath = dir+'/data'+pad(i,2)+'.xml';
            proxy.upload(datapath, types.xml)
                .then(source => handleDesign(proxy, source, data[0], data[1]));
        }
    })
    .catch(console.error);
