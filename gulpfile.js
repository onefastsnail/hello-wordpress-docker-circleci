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
  copy: ["vendor/wordpress/**/*", "src/**/*"],
  php: [
    `src/wp-content/themes/${process.env.WP_THEME_NAME}/**/*.php`,
    "src/wp-config.php",
  ],
};

/**
    cleanse the build
 */
function cleanseBuild() {
  return del([
    `${paths.dist}**/*`,
    `!${paths.dist}wp-content`,
    `!${paths.dist}wp-content/uploads`,
    `!${paths.dist}wp-content/uploads/**/*`,
    `!${paths.dist}wp-content/debug.log`,
  ]);
}

/**
    copy and our code in the build path
 */
function copyFiles() {
  return gulp.src(paths.copy, { read: true }).pipe(gulp.dest(paths.dist));
}

/**
    copy php files to build path
 */
function php() {
  return gulp
    .src(paths.php, { base: paths.src })
    .pipe(changed(paths.dist))
    .pipe(gulp.dest(paths.dist));
}

function redis() {
  return gulp
    .src(paths.src + "wp-content/plugins/redis-cache/includes/object-cache.php")
    .pipe(gulp.dest(paths.dist + "wp-content"));
}

/**
    our watch tasks
 */
function watch() {
  gulp.watch(paths.php, php);
}

/**
    the default gulp task used for development
 */
const build = gulp.series(cleanseBuild, redis, copyFiles, watch);

exports.default = build;
