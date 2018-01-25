const gulp = require('gulp');
const changed = require('gulp-changed');
const runSequence = require('run-sequence');
const del = require('del');
const fs = require("fs");

let envPath = '/app/env/.env';

// if not available we must be local
if (!fs.existsSync(envPath)) envPath = './.env';

// load in our .env file
const dotenv = require('dotenv').config({ path: envPath });

/**
 * global build paths
 * under the custom index is where you want to any WP plugins, or any additional watch files, this way
 * stream is smaller and task is quicker
 */
const paths = {
    src: 'src/',
    dist: 'dist/',
    copyIgnore: ['vendor/wordpress/**/*', 'src/**/*', 'src/.htaccess'],
    themePath: 'wp-content/themes/' + process.env.WP_THEME_NAME + '/',
    php: {
        src: ['src/wp-content/themes/' + process.env.WP_THEME_NAME + '/**/*.php', 'src/wp-config.php']
    }
};

/**
 * clear the build
 */
gulp.task('cleanseBuild', function () {
    return del([
        paths.dist + '**/*',
        '!' + paths.dist + 'wp-content',
        '!' + paths.dist + 'wp-content/uploads',
        '!' + paths.dist + 'wp-content/uploads/**/*',
        '!' + paths.dist + 'wp-content/debug.log'
    ]);
});

/**
 * copy and our code in the build path
 */
gulp.task('copy', [], function () {
    return gulp.src(paths.copyIgnore, { read: true })
        .pipe(changed(paths.dist))
        .pipe(gulp.dest(paths.dist));
});

/**
 * copy php files to build path
 */
gulp.task('php', function () {
    return gulp.src(paths.php.src, { base: paths.src })
        .pipe(gulp.dest(paths.dist));
});

/**
 * our watch tasks
 */
gulp.task('watch', [], function () {
    gulp.watch(paths.php.src, ['php']);
});

/**
 * the default gulp task used for development
 */
gulp.task('default', function (callback) {
    runSequence('cleanseBuild', 'copy', 'watch', callback);
});

/**
 * the build task triggered when deploying, or making the project
 */
gulp.task('build', function (callback) {
    runSequence('cleanseBuild', 'copy', callback);
});