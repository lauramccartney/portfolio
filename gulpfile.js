var gulp = require('gulp'),
		concat = require('gulp-concat'),
		uglify = require('gulp-uglify'),
		rename = require('gulp-rename'),
		sass = require('gulp-ruby-sass'),
		minifycss = require('gulp-clean-css'),
		notify = require('gulp-notify'),
		autoprefixer = require('gulp-autoprefixer'),
		watch = require('gulp-watch'),
		imagemin = require('gulp-imagemin'),
		cache = require('gulp-cache'),
		connect = require('gulp-connect');


gulp.task('serve', function(done) {
	connect.server({
    root: './',
    livereload: true
  })
	done()
});


gulp.task('scripts', function() {
    return gulp.src([
		'js/app.js'
    ])
    .pipe(concat('app.js'))
		.pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/'))
		.pipe(notify({ message: 'Scripts task complete' }))
		.pipe(connect.reload());
});


gulp.task('styles', function() {
	return sass([
		'css/app.scss'
	])
	.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
	.pipe(rename({ suffix: '.min' }))
	.pipe(minifycss())
	.pipe(gulp.dest('dist/'))
	.pipe(notify({ message: 'Styles task complete' }))
	.pipe(connect.reload());
});


gulp.task('images', function() {
	return gulp.src('img/**/*')
	.pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
	.pipe(gulp.dest('img/'))
	.pipe(notify({ message: 'Images task complete' }));
});


gulp.task('watch', function(done) {

	watch('css/*.scss', gulp.parallel(['styles']));

	watch('js/**/*.js', gulp.parallel(['scripts']));

	done();
});


gulp.task('default', gulp.series(['scripts', 'styles', 'images', gulp.parallel('serve', 'watch')],
function(done) {
	done();
}));
