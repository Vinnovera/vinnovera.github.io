var gulp = require("gulp");
var browserSync = require('browser-sync');

gulp.task('default', ['build', 'server', 'watch']);

gulp.task('server', function () {
	return browserSync.init(['./build/**/*.html', './build/**/*.css', './build/**/*.js'], {
		server: {
			baseDir: './build'
		}
	});
});

gulp.task('watch', function(){
	gulp.watch('./src/**/*', ['build']);
	gulp.watch('./templates/**/*', ['build']);
});

gulp.task('build', function(callback){
	require('./metalsmith.js')(callback);
});