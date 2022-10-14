const {src, dest} = require("gulp");
const htmlmin = require("gulp-htmlmin");
const plumber = require("gulp-plumber");
const browserSync = require("browser-sync").create();
const processhtml = require('gulp-processhtml')
let w3cjs = require("gulp-w3cjs");

const path = {
    dev: 'web-page/',
    dist: 'dist/'
}

function moveHtml(){
    return src(`${path.dev}*.html`)
    .pipe(dest(path.dist))
    .pipe(browserSync.stream());
}

exports.moveHtml = moveHtml;

function pathRewrite(){
    return src(`${path.dev}*.html`)
    .pipe(processhtml())
    .pipe(dest(path.dist));
}
exports.pathRewrite = pathRewrite;

function validation(){
    return src(`${path.dev}*.html`)
    .pipe(w3cjs())
    .pipe(w3cjs.reporter());
}
exports.validation = validation;

function minify(){
    return src(`${path.dev}*.html`)
    .pipe(plumber())
    .pipe(htmlmin({
        collapseWhitespace: true,
        removeComments: true
    }))
    .pipe(dest(path.dist));
}
exports.minify = minify;
