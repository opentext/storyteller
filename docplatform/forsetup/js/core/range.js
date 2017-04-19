// Copyright (c) 2016 Open Text. All Rights Reserved.
/*jslint
for
*/

'use strict';

// Emulates python built-in function range()
// see https://docs.python.org/2/library/functions.html#range
module.exports = function range(start, stop, step) {
    if (stop === undefined) {
        // one param defined
        stop = start;
        start = 0;
    }

    if (step === undefined) {
        step = 1;
    }

    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
        return [];
    }

    var result = [];
    var i;
    if (step > 0) {
        for (i = start; i < stop; i += step) {
            result.push(i);
        }
    } else {
        for (i = start; i > stop; i += step) {
            result.push(i);
        }
    }

    return result;
};
