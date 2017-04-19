'use strict';

var share = require('share');
share.test += __filename + ': starting\n';
exports.done = false;
var a = require('./a');
share.test += __filename + ': a.done = ' + a.done + '\n';
exports.done = true;
share.test += __filename + ': done\n';
