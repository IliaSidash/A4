const gulp = require("gulp");
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("autoprefixer");
const watch = require("gulp-watch");
const plumber = require("gulp-plumber");
const minifycss = require("gulp-csso");
const browserSync = require("browser-sync");

gulp.task("server", function() {
  browserSync.init({
    server: {
      port: 9000,
      baseDir: "build"
    }
  });

  gulp.watch("build/**/*").on("change", browserSync.reload);
});

gulp.task("css", () => {
  return watch("src/styles/**/*.css", function() {
    gulp
      .src("src/styles/main.css")
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(postcss([require("precss"), autoprefixer()]))
      .pipe(minifycss())
      .pipe(sourcemaps.write("."))
      .pipe(gulp.dest("build/styles/"));
  });
});

gulp.task("html", () => {
  return gulp
    .src("src/templates/**/*html")
    .pipe(watch("src/templates/**/*.html"))
    .pipe(gulp.dest("build/"));
});

gulp.task("default", gulp.series(gulp.parallel("server", "css", "html")));
