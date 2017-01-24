const gulp = require('gulp');
const gutil = require('gulp-util');
const mocha = require('gulp-mocha');
const babel = require('babel-core/register');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');
const cssBeautify = require('gulp-cssbeautify');
const cssComb = require('gulp-csscomb');

/* Tasks */

gulp.task('default', () => {
  gutil.log('Gulp is working fine');
});

// Bundle

gulp.task('bundle:scss', () => {
  gutil.log('Starting bundle scss files task');
  return gulp.src('./assets/stylesheets/main.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(cssBeautify({
    indent: '  ',
    openbrace: 'separate-line',
    autosemicolon: true
  }))
  .pipe(autoprefixer({
    browsers: [
      '> 5%',
      'IE 7',
      'last 5 versions'
    ],
    cascade: false
  }))
  .pipe(cssComb())
  .pipe(concat('bundle.css'))
  .pipe(gulp.dest('./build/'));
});

// Watchers

gulp.task('watch:scss', () => {
  gutil.log('Starting gulp scss bundle watcher');
  gulp.watch('assets/stylesheets/**/*.scss', ['bundle:scss']);
});

gulp.task('bdd', () => {
  gutil.log('Starting gulp bdd watcher');
  gulp.watch(['app/**/*.*', 'specs/**/*.*'], ['run:test']);
});

// Build

gulp.task('run:build', ['build:scss'], () => {});

gulp.task('build:js', () => {
  return exec('npm run build:js');
});

gulp.task('build:scss', () => {
  return gulp.src('./assets/stylesheets/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS({
      compatibility: 'ie8',
      debug: true
    }, function(details) {
      gutil.log(gutil.colors.red(`${details.name}: ${details.stats.originalSize}`));
      gutil.log(gutil.colors.green(`${details.name}: ${details.stats.minifiedSize}`));
    }))
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest('build/'));
});

// Test

gulp.task('run:test', () => {
  gutil.log('Running your specs files');
  return gulp
    .src('./specs/**/*.spec.*')
    .pipe(mocha({
  		reporter: 'spec',
  		compilers: {
  			js: babel
  		}
  	}));
});

