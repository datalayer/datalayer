const gulp = require("gulp");

gulp.task("build-to-static", async function() {
  gulp.src('./build/**/*.*')
    .pipe(gulp.dest('./jupyterctl/static'));
    return;
})
