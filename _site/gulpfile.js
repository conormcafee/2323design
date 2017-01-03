/*!
 * gulp
 * npm install gulp gulp-postcss cssnano autoprefixer --save-dev
 */

// Load plugins
var postcss = require('gulp-postcss'),
    gulp = require('gulp'),
    cssnext = require('postcss-cssnext');
    cssnano = require('cssnano');
    autoprefixer = require('autoprefixer');

// CSS
gulp.task('css', function () {
  var processors = [
    cssnext({browsers: ['last 4 versions']}),
    cssnano({ autoprefixer: false }),
  ];
  return gulp.src('build/css/*.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('assets/css'));
});

// W
