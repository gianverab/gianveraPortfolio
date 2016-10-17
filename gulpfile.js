//Include Dependencies
			var gulp = require('gulp'),
					sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
		 concatcss = require('gulp-concat-css'),
		 minifycss = require('gulp-minify-css'),
				concat = require('gulp-concat'),
				uglify = require('gulp-uglify'),
			imagemin = require('gulp-imagemin'),
				rename = require('gulp-rename'),
			    maps = require('gulp-sourcemaps'),
			 		 del = require('del'),
	 browsersync = require('browser-sync').create(),
				reload = browsersync.reload;

//Include Paths
var options = {
	src: './app/',
	dist: './dist/'
}

//Compile Sass, autoprefix, concat & minify
gulp.task('styles', function(){
	gulp.src(options.src + 'sass/**/*.scss')
		.pipe(maps.init())
		.pipe(sass())
		.pipe(autoprefixer('last 3 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
		.pipe(concatcss('all.css'))
		.pipe(minifycss())		
		.pipe(rename('app.min.css'))
		.pipe(maps.write('./'))
		.pipe(gulp.dest(options.dist + 'css/'));
});

//Compile scripts, concat & uglify
gulp.task('scripts', function(){
	gulp.src(options.src + 'js/**/*.js')
		.pipe(maps.init())
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(rename('app.min.js'))
		.pipe(maps.write('./'))
	  .pipe(gulp.dest(options.dist + 'js/'));
});

//Compress images
gulp.task('assets', function(){
	gulp.src(options.src + 'img/**/*')
		.pipe(imagemin({optimizationLevel: 7}))
	  .pipe(gulp.dest(options.dist + 'img/'));
});

//HTML task
gulp.task('html', function(){
	gulp.src(options.src + '*.html')
	    .pipe(gulp.dest(options.dist));
});


//Server set up and reload
gulp.task('serve', ['html', 'styles', 'scripts', 'assets'], function (){
	browsersync.init({
		server: options.dist
	});
	gulp.watch([options.src + '*.html', 
							options.src + 'sass/**/*.scss', 
							options.src + 'js/**/*.js',
							options.src + 'img/**/*']).on('change', reload);
})

//Build task
gulp.task('build', ['serve']);

//Clean task
gulp.task('clean', function() {
	del([options.dist]);
});

//Main watch task
gulp.task('watch', function (){	
	gulp.watch(options.src + '*.html', ['html']);
	gulp.watch(options.src + 'sass/**/*.scss', ['styles']);
	gulp.watch(options.src + 'js/**/*.js', ['scripts']);
	gulp.watch(options.src + 'img/**/*', ['assets']);
});

//Default gulp command
gulp.task('default', ['watch'], function() {
	gulp.start('build');
});