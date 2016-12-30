/*!
 * gulp
 * npm install gulp gulp-ruby-sass gulp-autoprefixer gulp-livereload gulp-cssnano gulp-concat gulp-uglify gulp-notify gulp-rename gulp-cache del gulp-svgmin gulp-inline-source --save-dev
 */

// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    cssnano = require('gulp-cssnano'),
    prefix = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    del = require('del'),
    svgmin = require('gulp-svgmin'),
    inlinesource = require('gulp-inline-source'),
    livereload = require('gulp-livereload');

// inlinesource

gulp.task('is', function () {
  return gulp.src('craft/templates/_critical/_critical-css.html')
    .pipe(inlinesource())
    .pipe(gulp.dest('craft/templates/_includes'));
});

// SASS
gulp.task('sass', function() {
    return sass(['build/sass/development.scss', 'build/sass/critical.scss', 'build/sass/style.scss'], { style: 'expanded' })
    .pipe(prefix({ browsers: ['ie 9', 'last 4 versions'] }))
    .pipe(gulp.dest('assets/css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cssnano())
    .pipe(gulp.dest('assets/css'))
    .pipe(notify({ message: 'Styles task complete' }))
    .pipe(livereload());
});

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
  return gulp.src('build/icons/*.svg')
    .pipe(svgmin({
      js2svg: {
        pretty: true
      }
    }))
  .pipe(gulp.dest('assets/images/icons'));
});


// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('sass', 'scripts');
});

// Watch
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('build/sass/**/*.scss', ['sass']);
    gulp.watch('build/images/*', ['images']);
    gulp.watch('build/icons/*', ['svg']);
    gulp.watch('build/js/*.js', ['scripts']);
});
