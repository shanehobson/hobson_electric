const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const babelPolyfill = require('babel-polyfill');

//Compile SASS and Inject Into browser
gulp.task('sass', function() {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
});

//Move node_modules JS files to src/js folder
gulp.task('js', function() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
});

//Watch SASS and Serve
gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: "./dist"
    });

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass']);
    gulp.watch("dist/*.html").on('change', browserSync.reload);
});

//Compile ES2015 with Babel and route to /dist
gulp.task('babel', function () {
    return gulp.src('src/js/script.js')
      .pipe(babel())
      .pipe(gulp.dest("dist/js"));
  });

//Move Font Awesome CSS file and Fonts folder to our src file
gulp.task('fa', function() {
    return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
    .pipe(gulp.dest("dist/css"));
});

gulp.task('fonts', function() {
    return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest("dist/fonts"));
});

//Create default Gulp task
gulp.task('default', ['js', 'serve', 'babel', 'fa', 'fonts']);