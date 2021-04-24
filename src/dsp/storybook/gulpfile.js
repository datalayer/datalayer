const gulp = require("gulp");
const gap = require("gulp-append-prepend");
const filter = require('gulp-filter');

gulp.task("resources-to-lib", async function() {
  const f = filter([
    '**',
    '!src/github',
    '!src/scss',
    '!src/**/*.js'
  ]);
  gulp.src('./src/**/*.*')
    .pipe(f)
    .pipe(gulp.dest('./lib/'));
    return;
})

gulp.task("licenses", async function() {
  // this is to add Datalayer licenses in the production mode for the minified js
  gulp
    .src("build/static/js/*chunk.js", { base: "./" })
    .pipe(
      gap.prependText(`/*!

=========================================================
* Now UI Kit PRO React - v1.0.0
=========================================================

* Product Page: https://datalayer.io/product/now-ui-kit-pro-react
* Copyright 2020 Datalayer (http://datalayer.io)

* Coded by Datalayer

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));

  // this is to add Datalayer licenses in the production mode for the minified html
  gulp
    .src("build/index.html", { base: "./" })
    .pipe(
      gap.prependText(`<!--

=========================================================
* Now UI Kit PRO React - v1.0.0
=========================================================

* Product Page: https://datalayer.io/product/now-ui-kit-pro-react
* Copyright 2020 Datalayer (http://datalayer.io)

* Coded by Datalayer

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

-->`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));

  // this is to add Datalayer licenses in the production mode for the minified css
  gulp
    .src("build/static/css/*chunk.css", { base: "./" })
    .pipe(
      gap.prependText(`/*!

=========================================================
* Now UI Kit PRO React - v1.0.0
=========================================================

* Product Page: https://datalayer.io/product/now-ui-kit-pro-react
* Copyright 2020 Datalayer (http://datalayer.io)

* Coded by Datalayer

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));
  return;
});
