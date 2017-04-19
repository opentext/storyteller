"use strict";

var invoke_cache = {};

function parse(cfg) {
    return JSON.parse(cfg);
}

function initialize(cfg) {
    var invoke = invoke_cache[cfg];
    var config;
    var setup;
    if (!invoke) {
        config = parse(cfg);
        setup = require(config.impl);
        if (typeof setup === 'function') {
            // initialization phase (called only once and cached)
            invoke = setup(config);
            invoke_cache[cfg] = invoke;
        } else {
            // standalone script, should not be cached, otherwise it would run only once
            delete require.cache[require.resolve(config.impl)];
        }
    }
    return invoke;
}

function execute(cfg) {
    var process = require('process');
    var invoke = initialize(cfg);
    if (invoke) {
        // invoke phase (could be called several times)
        invoke(process.stdin, process.stdout);
    }
}

module.exports = execute;
