var gulp = require('gulp');
var connect = require('gulp-connect');
var opn = require('opn');

gulp.task('server', function(){
    connect.server({
        root: './testweb/',
        port: 8001,
        livereload: true
    });
    opn('http://127.0.0.1:8001');
})

gulp.task('watch', function(){
    gulp.watch(['./testweb/*.html'], ['reload']);
})

gulp.task('reload', function(){
    console.log('----------------reload server %s---------------------', new Date());
    gulp.src('./testweb/*.html').pipe(connect.reload());
})

gulp.task('show', ['server', 'watch'])