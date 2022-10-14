const {src, dest} = require("gulp");
const plumber = require("gulp-plumber");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass")(require("sass"));
const rename = require("gulp-rename");
const sourcemaps = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const combineMediaQuery = require("postcss-combine-media-query");
const del = require("del");

const path = {
    dev: "web-page/styles/main.scss",
    dist: "dist/styles/"
}

function scss2css(){
    return src(path.dev)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(rename("style.css"))
    .pipe(sass().on("error", sass.logError))
    .pipe(sourcemaps.write())
    .pipe(dest(path.dist))
    .pipe(browserSync.stream());
}
exports.scss2css = scss2css;

function postscss2css(){
    const plugins = [
        autoprefixer(),
        combineMediaQuery(),
        cssnano()
    ];
    return src(`${path.dist}*.css`)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(postcss(plugins))
    .pipe(sourcemaps.write())
    .pipe(rename("style.min.css"))
    .pipe(dest(path.dist))
}
exports.postscss2css = postscss2css;

function removeOldStyle(cb){
    del(`${path.dist}style.css`);
    cb();
}
exports.removeOldStyle = removeOldStyle;