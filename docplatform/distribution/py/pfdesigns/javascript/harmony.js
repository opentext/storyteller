'use strict';

var assert = require('assert');

exports.scoping = function () {
    // old scoping
    var i = 10;
    if (true) {
        var i = 5;
    }
    assert.strictEqual(5, i);

    // new scoping
    let j = 10;
    if (true) {
        let j = 5;
    }
    assert.strictEqual(10, j);
};

exports.containers = function () {
    let m = new Map();
    m.set(1, 'a');
    m.set(2, 'b');
    m.set(3, 'c');
    assert.strictEqual('a', m.get(1));
    assert.strictEqual('b', m.get(2));
    assert.strictEqual('c', m.get(3));

    let s = new Set();
    s.add('k');
    s.add('i');
    s.add('s');
    s.add('s');
    assert.strictEqual(3, s.size);
};

exports.symbols = function () {
    let symbol = Symbol();
    let obj = {
        symbol: 'String',
        [symbol]: 'Symbol'
    };
    assert.strictEqual('String', obj.symbol);
    assert.strictEqual('Symbol', obj[symbol]);
};

exports.generators = function () {
    function *foo() {
        yield 42;
        yield 21;
    }

    let it = foo();
    assert.deepEqual({value: 42, done: false}, it.next());
    assert.deepEqual({value: 21, done: false}, it.next());
    assert.deepEqual({value: undefined, done: true}, it.next());

    let values = [];
    for (let v of foo()) {
        values.push(v);
    }
    assert.deepEqual([42, 21], values);
};

exports.arrow = function () {
    const a = [
        "Hydrogen",
        "Helium",
        "Lithium",
        "Beryllium"
    ];

    assert.deepEqual([8, 6, 7, 9], a.map(s => s.length));
};
