// Include Dependencies
var gulp = require('gulp')
var sass = require('gulp-sass')
var autoprefixer = require('gulp-autoprefixer')
var concatcss = require('gulp-concat-css')
var cssnano = require('gulp-cssnano')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var imagemin = require('gulp-imagemin')
var htmlmin = require('gulp-htmlmin')
var rename = require('gulp-rename')
var sourcemaps = require('gulp-sourcemaps')
var del = require('del')
var browsersync = require('browser-sync').create()

// Include Paths
var paths = {
  src: './app/',
  build: './build/'
}

// Clean task
gulp.task('clean', function () {
  return del([paths.build])
})

// Compile Sass, autoprefix, concat & minify
gulp.task('styles', function () {
  return gulp.src(paths.src + 'scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 10 versions'],
      cascade: false
    }))
    .pipe(concatcss('all.css'))
    .pipe(cssnano())
    .pipe(rename('app.min.css'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.build + 'css/'))
    .pipe(browsersync.stream())
})

// Compile scripts, concat & uglify
gulp.task('scripts', function () {
  return gulp.src(paths.src + 'js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.build + 'js/'))
})

// HTML task
gulp.task('html', function () {
  return gulp.src(paths.src + '*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(paths.build))
})

// Compress images
gulp.task('images', function () {
  return gulp.src(paths.src + 'img/*')
    .pipe(imagemin({optimizationLevel: 7}))
    .pipe(gulp.dest(paths.build + 'img/'))
})

// Server set up and reload
gulp.task('serve', ['styles', 'scripts', 'html', 'images'], function () {
  browsersync.init({
    server: paths.build
  })
  gulp.watch(paths.src + 'scss/**/*.scss', ['styles'])
  gulp.watch(paths.src + 'js/**/*.js', ['scripts'])
  gulp.watch(paths.build + 'js/**/*.js').on('change', browsersync.reload)
  gulp.watch(paths.src + '*.html', ['html'])
  gulp.watch(paths.build + '*.html').on('change', browsersync.reload)
})

// Default gulp command
gulp.task('default', ['clean', 'serve'])
