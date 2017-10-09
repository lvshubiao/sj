var gulp = require('gulp');
var connect = require('gulp-connect');
var less = require('gulp-less');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
// 启动服务器
gulp.task('default', ['look', 'concatjs']

    ,
    function() {
        connect.server({
            root: './',
            port: '8080'
        });
    }
);
gulp.task('less', function() {
    return gulp.src('less/*.less')
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(gulp.dest('css/'))
});
gulp.task('look', ["less"], function() {
    gulp.watch('less/*.less', ['less']);
});
gulp.task('concatjs', function() {
    gulp.src(['bower_components/jquery/dist/jquery.min.js', 'bower_components/underscore/underscore.js', 'bower_components/seajs/dist/sea-debug.js', 'bower_components/seajs-text/src/seajs-text.js', 'js/page.js'])
        .pipe(concat('global.js'))
        .pipe(gulp.dest('js/'))
});
