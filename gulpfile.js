'use strict';

const { src, dest, watch, series } = require('gulp');
const less = require('gulp-less');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');

exports.less = function () {
    return src('./srs/slyles/*.less')
        .pipe(less().on('error', less.logError))
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest('./dist'));
};

exports.watch = function () {
    watch('./srs/slyles/*.less', series(['less']));
};