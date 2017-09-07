// Include Dependencies
var gulp = require('gulp')
var postcss = require('gulp-postcss')
var rucksack = require('rucksack-css')
var cssnext = require('postcss-cssnext')
var cssnested = require('postcss-nested')
var importcss = require('postcss-import')
var jsconcat = require('gulp-concat')
var uglify = require('gulp-uglify')
var pump = require('pump')
var newer = require('gulp-newer')
var imagemin = require('gulp-imagemin')
var rename = require('gulp-rename')
var csswring = require('csswring')
var mqpacker = require('css-mqpacker')
var sourcemaps = require('gulp-sourcemaps')
var browsersync = require('browser-sync').create()

// Include Paths
var cssSrc = './app/css/*.css'
var cssDest = './build/css/'
var jsSrc = './app/js/*.js'
var jsDest = './build/js/'
var imgSrc = './app/img/*'
var imgDest = './build/img/'
var htmlSrc = './app/*.html'
var fontSrc = './app/fonts/*'
var fontDest = './build/fonts/'
var build = './build/'

// CSS Workflow
gulp.task('styles', function () {
  var plugins = [
    importcss,
    cssnested,
    rucksack(),
    cssnext({
      browsers: ['> 5%', 'ie 8']
    }),
    mqpacker(),
    csswring()
  ]
  return gulp.src(cssSrc)
    .pipe(sourcemaps.init())
    .pipe(postcss(plugins))
    .pipe(rename('app.min.css'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(cssDest))
    .pipe(browsersync.stream())
})

// JS Workflow
gulp.task('scripts', function (cb) {
  pump([
    gulp.src(jsSrc),
    sourcemaps.init(),
    jsconcat('all.js'),
    uglify(),
    rename('app.min.js'),
    sourcemaps.write('./'),
    gulp.dest(jsDest)
  ],
    cb
  )
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
    .pipe(browsersync.stream())
})

// Minify any new images
gulp.task('images', function () {
  return gulp.src(imgSrc)
    .pipe(newer(imgDest))
    .pipe(imagemin({ optimizationLevel: 5 }))
    .pipe(gulp.dest(imgDest))
    .pipe(browsersync.stream())
})

// Server set up and reload
gulp.task('serve', ['html', 'styles', 'fonts', 'scripts', 'images'], function () {
  browsersync.init({
    server: {
      baseDir: './build'
    }
  })
})

// Watch for changes
gulp.task('watch', function () {
  gulp.watch('./app/css/**/*.css', ['styles'])
  gulp.watch(htmlSrc, ['html'])
  gulp.watch(fontSrc, ['fonts'])
  gulp.watch(imgSrc, ['images'])
  gulp.watch(build + '*.html').on('change', browsersync.reload)
})

// Default gulp command
gulp.task('default', ['watch', 'serve'])
