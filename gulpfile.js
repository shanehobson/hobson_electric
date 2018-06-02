const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

//Compile SASS and Inject Into browser
gulp.task('sass', function() {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'public/scss/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest("public/css"))
    .pipe(browserSync.stream());
});

//Move JS files to src/js folder
gulp.task('js', function() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
    .pipe(gulp.dest('public/js'))
    .pipe(browserSync.stream());
});

//Watch SASS and Serve
gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: "./public"
    });

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'public/scss/*.scss'], ['sass']);
    gulp.watch("public/*.html").on('change', browserSync.reload);
});

//Move Font Awesome CSS file and Fonts folder to our src file
gulp.task('fa', function() {
    return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
    .pipe(gulp.dest("public/css"));
});

gulp.task('fonts', function() {
    return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest("public/fonts"));
});

//Create default Gulp task
gulp.task('default', ['js', 'serve', 'fa', 'fonts']);