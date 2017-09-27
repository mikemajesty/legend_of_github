const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const livereload = require('gulp-livereload');

gulp.task('js', () => {
  return gulp.src(['public/js/*.js', 'public/js/**/*.js', '!public/final-game/*.js', '!public/js/game/*.js', '!public/lib/*.js', '!public/game-tutorial/*.js'])
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify({ mangle: false }))
    .pipe(concat('all.js'))
    .pipe(gulp.dest('www/js/'));
});

gulp.task('default', ['js'], () => {
  livereload.listen();
  gulp.watch(['public/js/*.js', 'public/js/**/*.js'], ['js']);
});