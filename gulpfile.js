var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var del = require('del');

var paths = {
  sassApp: ['src/sass/index.scss'],
  sass: ['src/sass/**/*.scss'],
  appJs: ['./src/js/index.jsx'],
  js: ['src/js/**/*.jsx'],
  html: ['src/index.html'],
  dist: 'dist'
};

gulp.task('clean', function() {
  return del(paths.dist);
});

gulp.task('sass', function() {
  return gulp.src(paths.sassApp)
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.dist + '/assets/css'));
});

gulp.task('js', function() {
  return browserify({
    entries: paths.appJs,
    extensions: ['.jsx'],
    debug: true
  })
  .transform('babelify', { presets: ['es2015', 'stage-0', 'react'] })
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest(paths.dist + '/assets/js'));
});

gulp.task('html', ['clean'], function() {
  return gulp.src(paths.html)
    .pipe(gulp.dest(paths.dist));
});

gulp.task('build', ['js', 'sass', 'html'], function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.js, ['js']);
});

gulp.task('watch', ['build'], function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.js, ['js']);
});

gulp.task('default', ['build']);
