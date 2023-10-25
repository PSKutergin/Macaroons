'use strict';

const { src, dest, watch, series } = require('gulp');
const less = require('gulp-less');
const cssmin = require('gulp-cssmin');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const path = require('path');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

exports.less = function () {
    return src('./src/styles/style.less')
        .pipe(plumber())
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest('./dist/styles'));
};

exports.js = function () {
    return src('./src/scripts/*.js')
        .pipe(plumber())
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(dest('./dist/js'));
};

exports.watch = function () {
    watch('./src/styles/*.less', { ignoreInitial: false }, series(['less']));
    watch('./src/scripts/*.js', { ignoreInitial: false }, series(['js']));
};