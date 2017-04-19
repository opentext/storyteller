// Copyright (c) 2016 Open Text. All Rights Reserved.
"use strict";

//const INTERNAL_DPI = 72.0;
const POINTS_PER_INCH = 72.0;
const MM_PER_INCH = 25.4;

exports.in2pt = function inches_to_points(val) {
    return +val * POINTS_PER_INCH;
};

exports.pt2in = function points_to_inches(val) {
    return +val / POINTS_PER_INCH;
};

exports.mm2pt = function millimeters_to_points(val) {
    return +val / MM_PER_INCH * POINTS_PER_INCH;
};

exports.pt2mm = function points_to_millimeters(val) {
    return +val * MM_PER_INCH / POINTS_PER_INCH;
};

exports.mm2in = function millimeters_to_inches(val) {
    return +val / MM_PER_INCH;
};

exports.in2mm = function inches_to_millimeters(val) {
    return +val * MM_PER_INCH;
};
