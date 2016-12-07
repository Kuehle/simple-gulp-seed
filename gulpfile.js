var gulp = require('gulp');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');
var sass = require('gulp-ruby-sass');
var del = require('del');
var reload = browserSync.reload;

var srcDir = 'src/'; // Dir for source code
var distDir = 'dist/'; // Dir for the output

gulp.task('default', ['delDist', 'scripts', 'styles', 'browserSync', 'static', 'watch'])

// skripts task
gulp.task('scripts', function() {
  gulp.src(srcDir+'js/**/*.js')
  .pipe(uglify())
  .pipe(gulp.dest(distDir+'js'));
})

// delete dist folder
gulp.task('delDist', function() {
  return del(distDir+'**/*', {force: true})
})

// copy static files
gulp.task('static', function() {
  gulp.src(srcDir+'**/*.html').pipe(gulp.dest(distDir))
})

// styles task
gulp.task('styles', function() {
  sass(srcDir+'scss/**/*').pipe(gulp.dest(distDir+'css'))
});

// watch task
gulp.task('watch', function() {
  gulp.watch('gulpfile.js', ['default'])
  gulp.watch(srcDir+'js/**/*.js', ['scripts']);
  gulp.watch(srcDir+'scss/**/*css', ['styles']);
  gulp.watch(srcDir+'**/*.html', ['static']);
})

// watch files for changes and reload
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: distDir
    }
  });

  gulp.watch('**/*', {cwd: srcDir}, reload);
});
