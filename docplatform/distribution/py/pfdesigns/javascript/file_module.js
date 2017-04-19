'use strict';

var assert = require('assert');

assert.notStrictEqual( undefined, require.cache );
assert.notStrictEqual( undefined, require.resolve );

exports.value = 42.0;

exports.square = function (value) {
    return value * value;
};
