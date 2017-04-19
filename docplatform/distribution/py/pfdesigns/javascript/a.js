'use strict';

var share = require('share');
share.test += __filename + ': starting\n';
exports.done = false;
var b = require('./b');
share.test += __filename + ': b.done = ' + b.done + '\n';
exports.done = true;
share.test += __filename + ': done\n';
