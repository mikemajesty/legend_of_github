const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

gulp.task('js', () => {
  return gulp.src(['public/js/*.js', 'public/js/**/*.js'])
    .pipe(babel({
        presets: ['es2015']
      }))
      .pipe(uglify({mangle: false}))
        .pipe(concat('all.js'))
          .pipe(gulp.dest('www/js/'));
});