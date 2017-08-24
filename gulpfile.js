// Include Dependencies
var gulp = require('gulp')
var postcss = require('gulp-postcss')
var cssvars = require('postcss-simple-vars')
var nested = require('postcss-nested')
var importcss = require('postcss-import')
var autoprefixer = require('gulp-autoprefixer')
var newer = require('gulp-newer')
var imagemin = require('gulp-imagemin')
var rename = require('gulp-rename')
var sourcemaps = require('gulp-sourcemaps')
var browsersync = require('browser-sync').create()

// Include Paths
var cssSrc = './app/css/*.css'
var cssDest = './build/css/'
var imgSrc = './app/img/*'
var imgDest = './build/img/'
var htmlSrc = './app/*.html'
var fontSrc = './app/fonts/*'
var fontDest = './build/fonts/'
var build = './build/'

// CSS Workflow
gulp.task('styles', function () {
  return gulp.src(cssSrc)
    .pipe(sourcemaps.init())
    .pipe(postcss([importcss, cssvars, nested]))
    .pipe(autoprefixer({
      browsers: ['last 10 versions'],
      cascade: false
    }))
    .pipe(rename('app.min.css'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(cssDest))
})

// HTML Workflow
gulp.task('html', function () {
  return gulp.src(htmlSrc)
    .pipe(gulp.dest(build))
})

// Fonts
gulp.task('fonts', function () {
  return gulp.src(fontSrc)
    .pipe(gulp.dest(fontDest))
})

// Minify any new images
gulp.task('images', function () {
  return gulp.src(imgSrc)
    .pipe(newer(imgDest))
    .pipe(imagemin({ optimizationLevel: 5 }))
    .pipe(gulp.dest(imgDest))
})

// Server set up and reload
gulp.task('serve', ['html', 'styles', 'fonts', 'images'], function () {
  browsersync.init({
    server: build
  })
  gulp.watch('./app/css/**/*.css', ['styles'])
  gulp.watch('./build/css/*.css').on('change', browsersync.reload)
  gulp.watch(htmlSrc, ['html'])
  gulp.watch(build + '*.html').on('change', browsersync.reload)
})

// Default gulp command
gulp.task('default', ['serve'])
