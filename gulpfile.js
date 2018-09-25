const gulp = require("gulp");
const changed = require("gulp-changed");
const del = require("del");

const envPath = "./.env";

// load in our .env file
require("dotenv").config({ path: envPath });

/**
    paths, i will put this into a seperate module soon
 */
const paths = {
  src: "src/",
  dist: "dist/",
  copy: ["vendor/wordpress/**/*", "src/**/*", "src/.htaccess"],
  php: [
    `src/wp-content/themes/${process.env.WP_THEME_NAME}/**/*.php`,
    "src/wp-config.php"
  ]
};

/**
    cleanse the build
 */
gulp.task("cleanseBuild", function() {
  return del([
    `${paths.dist}**/*`,
    `!${paths.dist}wp-content`,
    `!${paths.dist}wp-content/uploads`,
    `!${paths.dist}wp-content/uploads/**/*`,
    `!${paths.dist}wp-content/debug.log`
  ]);
});

/**
    copy and our code in the build path
 */
gulp.task("copy", ["redis"], function() {
  return gulp.src(paths.copy, { read: true }).pipe(gulp.dest(paths.dist));
});

/**
    copy php files to build path
 */
gulp.task("php", function() {
  return gulp
    .src(paths.php, { base: paths.src })
    .pipe(changed(paths.dist))
    .pipe(gulp.dest(paths.dist));
});

gulp.task("redis", ["cleanseBuild"], function() {
  return gulp
    .src(paths.src + "wp-content/plugins/redis-cache/includes/object-cache.php")
    .pipe(gulp.dest(paths.dist + "wp-content"));
});

/**
    our watch tasks
 */
gulp.task("watch", ["copy"], function() {
  gulp.watch(paths.php, ["php"]);
});

/**
    the default gulp task used for development
 */
gulp.task("default", ["watch"]);
