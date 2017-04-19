// Copyright (c) 2016 Open Text. All Rights Reserved.
/*jslint
  this:true, for:true
*/

'use strict';

var vars = __bindings.variables;

// whitelist some inspected names else console.log(proxy_obj) or util.inspect(proxy_obj) will throw
function is_whitelisted(key) {
    return (key === 'inspect' || key === 'constructor' || key === 'toJSON');

}

function get_variable(name, indices) {
    var value = vars.get(name, indices);
    // Here we heuristically detect undefined variables to make simple case fast
    // (we avoid costly vars.has() and vars.dim() calls if not necessary)
    //
    // A (value === undefined) would be better, but server implementation
    // returns empty string for non-existing variables
    if (!value) {
        if (!vars.has(name)) {
            if (is_whitelisted(name)) {
                return undefined;
            }
            throw new Error("Undefined variable '" + name + "'.");
        }
        var dims = vars.dims(name);
        indices = indices || [];
        if (dims && !indices.length) {
            throw new Error("Array variable '" + name + "' accessed as scalar.");
        }
        if (!dims && indices.length) {
            throw new Error("Scalar variable '" + name + "' accessed as array.");
        }
    }
    return value;
}

function is_numeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

exports.set = function set_variable(name, value, indices) {
    vars.set(name, value, indices);
};

exports.get = get_variable;

//exports.del = function (name) {
//  vars.set(name, null);
//};

exports.has = function has_variable(name) {
    return vars.has(name);
};

exports.dim = function dim_variable(name, indices) {
    return vars.dim(name, indices);
};

exports.dims = function dims_variable(name) {
    return vars.dims(name);
};

exports.list = function list_variables() {
    return vars.list();
};

function dump_variables(name) {
    var range = require('range');

    function dump(name, indices) {
        var dimension = vars.dim(name, indices);
        if (dimension === 0) {
            return vars.get(name, indices);
        }
        return range(dimension).map(function (i) {
            indices.push(i);
            var result = dump(name, indices);
            indices.pop(i);
            return result;
        });
    }

    if (name === undefined) {
        var result = {};
        vars.list().forEach(function (name) {
            result[name] = dump(name, []);
        });
        return result;
    }
    return dump(name, []);
}

exports.dump = dump_variables;

function variable_proxy(name, indices) {
    if (indices.length === vars.dims(name)) {
        return get_variable(name, indices);
    }
    // inspired by these tutorials:
    //  - https://curiosity-driven.org/array-slices
    //  - http://soft.vub.ac.be/~tvcutsem/proxies/
    //  - http://www.2ality.com/2014/12/es6-proxies.html
    return Proxy.create({
        get: function (ignore, key) {
            var dim = vars.dim(name, indices);
            var dims = vars.dims(name);
            if (key === 'inspect') {
                return function () {
                    return dump_variables(name);
                };
            }
            if (is_whitelisted(key)) {
                return undefined;
            }
            if (key === 'length') {
                return dim;
            }
            if (is_numeric(key)) {
                return variable_proxy(name, indices.concat([+key]));
            }
            if (indices.length + 1 < dims) {
                throw new Error('Accessing ' + (indices.length + 1) + '. level of '
                        + dims + '-dim array.');
            }
            return Array.prototype[key];
        },
        getOwnPropertyDescriptor: function (target, key) {
            return Object.getOwnPropertyDescriptor(target, key);
        },
        set: function (ignore, key, val) {
            var dim = vars.dim(name, indices);
            if (key === 'length') {
                var length = dim;
                // we can just shorten the array, prolongation not supported
                if (length > val) {
                    var i;
                    for (i = val; i < length; i += 1) {
                        vars.set(name, null, indices.concat([i]));
                    }
                    dim = vars.dim(name, indices);
                } else if (length < val) {
                    throw new Error('Array enlargement not supported.');
                }
            } else if (is_numeric(key)) {
                vars.set(name, val, indices.concat([+key]));
            } else {
                throw new Error('Invalid setter: ' + key);
            }
        }
    }, Array.prototype);
}

exports.all = Proxy.create({
    has: function (name) {
        return vars.has(name);
    },
    get: function (ignore, name) {
        if (name === 'inspect') {
            return function () {
                return dump_variables();
            };
        }
        return variable_proxy(name, []);
    },
    set: function (ignore, name, val) {
        return vars.set(name, val);
    },
    keys: function () {
        return vars.list();
    },
    enumerate: function () {
        return vars.list();
    },
    getOwnPropertyDescriptor: function (target, key) {
        return Object.getOwnPropertyDescriptor(target, key);
    }
});

// What remains is to investigate a possibility to return function for multi-dimensional variables
//   http://stackoverflow.com/questions/22309585/overriding-assignment-operator-in-js
