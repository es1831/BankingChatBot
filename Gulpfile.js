var gulp = require('gulp');
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	htmlmin = require('gulp-htmlmin'),
	//NOTE: works only in a combination with a Chrome extension for reload
	livereload = require('gulp-livereload'),
	templateCache = require('gulp-angular-templatecache'),
	plumber = require('gulp-plumber'),
	sass = require('gulp-sass'),
	rename = require('gulp-rename'),
	eslint = require('gulp-eslint'),
	nodemon = require('gulp-nodemon');

/* Variables */

var paths = {
	javascripts: [
		'client/app/**/*.js'
	],
	templates: [
		'client/app/**/*.html'
	],
	scss: [
		'client/scss/**/*.scss'
	],
	pathsToLint: [
		'client/app/**/*.js',
		'server/**/*.js'
	]
};

/* Gulp tasks */

gulp.task('templateCache', function() {
	return gulp.src(paths.templates)
	.pipe(htmlmin({
		collapseWhitespace: true,
		collapseBooleanAttributes: true,
		removeComments: true
	}))
		.pipe(templateCache('templates.js', { module: 'Soju'}))
		.pipe(gulp.dest('client/dist/'));
});

gulp.task('buildJS', ['templateCache'], function() {
	return gulp.src(paths.javascripts)
		.pipe(concat('scripts.js'))
		.pipe(uglify())
		.pipe(gulp.dest('client/dist/'))
		.pipe(livereload());
});

gulp.task('buildCSS', function() {
	return gulp.src('client/scss/main.scss')
		.pipe(plumber())
	  	.pipe(concat('main.scss'))
		.pipe(sass())
		.pipe(rename('style.css'))
		.pipe(gulp.dest('client/dist/'))
		.pipe(livereload());
});

gulp.task('lint', function() {
	return gulp.src([paths.pathsToLint[0],paths.pathsToLint[1], '!node_modules/**', '!bower_components/**', '!client/dist/**', '!client/app/assets/images/**'])
		// eslint() attaches the lint output to the "eslint" property
		// of the file object so it can be used by other modules.
		.pipe(eslint())
		// eslint.format() outputs the lint results to the console.
		// Alternatively use eslint.formatEach() (see Docs).
		.pipe(eslint.format())
		// To have the process exit with an error code (1) on
		// lint error, return the stream and pipe to failAfterError last.
		.pipe(eslint.failAfterError());
});

gulp.src(['client/app/assets/**/*']).pipe(gulp.dest('client/dist'));

gulp.task('buildApp', ['buildCSS', 'buildJS']);

gulp.task('start:server', function() {
	nodemon({ script: 'server/app.js'});
})

/* Gulp watches */
gulp.task('watch', function() {
	livereload.listen();
	gulp.watch([paths.templates, paths.pathsToLint], ['buildJS', 'lint']);
	gulp.watch([paths.scss], ['buildCSS']);
});

/* Gulp task definitions */
gulp.task('default', ['buildApp', 'lint', 'watch']);

/* Gulp deploy task definitions */
gulp.task('deploy', ['buildApp']);

/* Gulp serve task definitions */
gulp.task('serve', ['buildApp', 'start:server', 'lint', 'watch']);
