'use strict';

var gulp = require('gulp'),
sass = require('gulp-sass'),
nunjucksRender = require('gulp-nunjucks-render'),
livereload = require('gulp-livereload');

// gulp.task('default', function() { });

gulp.task('sass', function () {
  gulp.src('app/sass/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('app/css'))
  .pipe(livereload());
});

gulp.task('nunjucks', function() {
  nunjucksRender.nunjucks.configure(['app/templates/']);

  // Gets .html and .nunjucks files in pages
  return gulp.src('app/pages/**/*.+(html|nunjucks)')
  // Renders template with nunjucks
  .pipe(nunjucksRender())
  // output files in app folder
  .pipe(gulp.dest('app'))
  .pipe(livereload());
});

gulp.task('watch', function() {

  livereload({ start: true });
  livereload.listen();
  // gulp.watch('less/*.less', ['less']);
  gulp.watch('app/sass/**/*.scss', ['sass']);
  gulp.watch('app/pages/**/*.+(html|nunjucks)', ['nunjucks']);

});
