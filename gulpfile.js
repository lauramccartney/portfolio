var gulp = require('gulp'),
		rename = require('gulp-rename'),
		sass = require('gulp-ruby-sass'),
		minifycss = require('gulp-clean-css'),
		notify = require('gulp-notify'),
		autoprefixer = require('gulp-autoprefixer'),
		watch = require('gulp-watch'),
		connect = require('gulp-connect');


gulp.task('serve', function(done) {
	connect.server({
    root: './',
    livereload: true
  })
	done()
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


gulp.task('watch', function(done) {

	watch('css/*.scss', gulp.parallel(['styles']));

	done();
});


gulp.task('default', gulp.series(['styles', gulp.parallel('serve', 'watch')],
function(done) {
	done();
}));
