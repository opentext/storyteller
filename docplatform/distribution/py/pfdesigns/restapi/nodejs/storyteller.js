exports.proxy = function makeProxy(url) {
    url = url || 'https://cem-dev-karim.eastus.cloudapp.azure.com/storyteller/api';
    var restler = require('restler');
    var path = require('path');
    var fs = require('fs');
    var headers = {};

    function storeCookie(response) {
        var cookie = response.headers['set-cookie'];
        if (cookie)
            headers.Cookie = cookie[0].split(';')[0];
    }

    function ping() {
        return new Promise((resolve, reject) => {
            restler.get(url+'/ping')
                .on('complete', result => {
                    if (result instanceof Error) {
                        reject(result);
                    } else {
                        resolve(result);
                    }
                });
        });
    }
    
    function upload(filepath, mimetype) {
        mimetype = mimetype || 'application/octet-stream';
        return new Promise((resolve, reject) => {
            fs.stat(filepath, (err, stats) => {
                if (err) {
                    reject(err);
                } else {
                    restler.post(url+'/files', {
                        headers: headers,
                        multipart: true,
                        data: {
                            "file": restler.file(filepath, null, stats.size, null, mimetype),
                            "name": path.basename(filepath),
                        }
                    }).on('complete', (body, response) => {
                        storeCookie(response);
                        resolve(body);
                    });
                }
            });
        });
    }

    function content(hash) {
        return new Promise((resolve, reject) => {
            restler.get(url+'/files/'+hash+'/contents', {headers: headers})
                .on('success', resolve)
                .on('fail', data => {
                    reject(new Error('Content for '+hash+' not found'));
                });
        });
    }
    
    function tdt(source, template, rules, params) {
        var inputs = {
            rules: rules,
            template: template,
            source: source,
            options: {
                mode: 127,
                params: params || {}
            }
        };
        return new Promise(resolve => {
            restler.postJson(url+'/tdt', inputs, {headers: headers})
                .on('complete', (body, response) => {
                    storeCookie(response);
                    resolve(body);
                });
        });
    }
    
    function stl(design, data, format) {
        var inputs = {
            design: design,
            data: data,
            options: {
                data: { rules: "_default", source: "_default"},
                driver: {type: format || 'pdf'},
                properties: { language:"en-US"},
                validate: true
            }
        };
        return new Promise(resolve => {
            restler.postJson(url+'/stl', inputs, {headers: headers})
                .on('complete', (body, response) => {
                    storeCookie(response);
                    resolve(body);
                });
        });
    }
        
    return {
        ping: ping,
        upload: upload,
        content: content,
        tdt: tdt,
        stl: stl,
    };
};
