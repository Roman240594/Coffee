const { src, dest, parallel, series, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const prefix = require('gulp-autoprefixer');

function browser() {
    browserSync.init({
        server: {
            baseDir: './app/'
        },
        notify: false
    });
}

function watchFiles() {
    watch("app/scss/**/*.scss", css);
    watch("app/*.html").on('change', browserSync.reload);
}

function css() {
    return src("app/scss/**/*.scss")
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: false }))
        .pipe(dest("app/css"))
        .pipe(browserSync.stream());
}

exports.css = css;
exports.default = series(series(css), parallel(browser, watchFiles));