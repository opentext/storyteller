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

