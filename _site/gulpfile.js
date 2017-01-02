/*!
 * gulp
 * npm install gulp gulp-concat gulp-uglify gulp-notify gulp-rename gulp-cache del gulp-svgmin --save-dev
 */

// Load plugins
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    del = require('del'),
    svgmin = require('gulp-svgmin');

// Scripts
gulp.task('scripts', function() {
  return gulp.src(['build/js/vendor/modernizr.custom.js', 'build/js/vendor/jquery-2.2.3.js', 'build/js/vendor/echo.js', 'build/js/vendor/unslider.js', 'build/js/scripts.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('assets/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// SVGOMG
gulp.task('svg', function () {
  return gulp.src('build/svg/*.svg')
    .pipe(svgmin({
      js2svg: {
        pretty: true
      }
    }))
  .pipe(gulp.dest('assets/svg/'));
});

// Watch
gulp.task('watch', function() {
    gulp.watch('build/svg/*', ['svg']);
    gulp.watch('build/js/*.js', ['scripts']);
});
