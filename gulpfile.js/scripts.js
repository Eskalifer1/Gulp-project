const {src, dest} = require("gulp");
const plumber = require("gulp-plumber");
const browserSync = require("browser-sync").create();
const babel = require("gulp-babel");
const rename = require("gulp-rename");
const sourcemaps = require("gulp-sourcemaps");
const concat = require("gulp-concat");
let uglify = require("gulp-uglify-es").default;
const eslint = require('gulp-eslint');
const del = require("del");

const path = {
    dev: "web-page/scripts/",
    dist: "dist/scripts/"
}

function moveScripts(){
    return src(`${path.dev}*.js`)
    .pipe(dest(path.dist))
    .pipe(browserSync.stream());
}
exports.moveScripts = moveScripts;

function scriptLint(){
    return src(`${path.dev}*.js`)
    .pipe(plumber())
    .pipe(eslint({fix: true}))
    .pipe(eslint.format())
    .pipe(dest(file => file.base))
    .pipe(eslint.failAfterError());
}
exports.scriptLint = scriptLint;

function jsModify(){
    return src(`${path.dev}*.js`)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-transform-spread']
    }))
    .pipe(concat("index.js"))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(rename("index.min.js"))
    .pipe(dest(path.dist));
}
exports.jsModify = jsModify;


function delOldScripts(cb){
    del(`${path.dist}index.js`);
    cb();
}
exports.delOldScripts = delOldScripts;