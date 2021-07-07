const {
    src,
    dest,
    parallel,
    series,
    watch
} = require('gulp');

// Load plugins

const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');
const browsersync = require('browser-sync').create();

// Clean assets

function clear() {
    return src('./build/*', {
            read: false
        })
        .pipe(clean());
}

// HTML function 
function html() {
    const source = './src/*.html';
    return src(source)
       .pipe(dest('./build'))
       .pipe(browsersync.stream());;
 };

// JS function 

function js() {
    const source = './src/*.js';

    return src(source)
        .pipe(changed(source))
        .pipe(concat('bundle.js'))
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(dest('./build/js/'))
        .pipe(browsersync.stream());
}

// CSS function 

function css() {
    const source = './src/style.css';

    return src(source)
        .pipe(changed(source))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(cssnano())
        .pipe(dest('./build/css/'))
        .pipe(browsersync.stream());
}

// Optimize images

function img() {
    return src('./src/img/*')
        .pipe(imagemin())
        .pipe(dest('./build/img'));
}

// Watch files

function watchFiles() {
    watch('./src/*', css);
    watch('./src/*', js);
    watch('./src/img/*', img);
    watch('./src/*', html)
}

// BrowserSync

function browserSync() {
    browsersync.init({
        server: {
            baseDir: './build'
        },
        port: 3000
    });
}

// Tasks to define the execution of the functions simultaneously or in series

exports.watch = parallel(watchFiles, browserSync);
exports.default = series(clear, parallel(js, css, img));