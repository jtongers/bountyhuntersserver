/// <reference path="typings/requirejs/require.d.ts" />
var GulpEnvironment = (function () {
    function GulpEnvironment() {
        var gulp = require('gulp');
        var tsc = require('gulp-typescript');
        var Server = require('karma').Server;
        var srcTSConfig = tsc.createProject('src/tsconfig.json');
        var specTSConfig = tsc.createProject('spec/tsconfig.json');
        gulp.task('test', ['test-build:spec', 'test-build:src'], function () {
            new Server({
                configFile: __dirname + '/build.spec/spec/karma.conf.js',
                singleRun: true
            }).start();
        });
        gulp.task('test-build:spec', function (done) {
            specTSConfig.src()
                .pipe(tsc(specTSConfig))
                .pipe(gulp.dest('build.spec'))
                .on('end', done);
        });
        gulp.task('test-build:src', function (done) {
            srcTSConfig.src()
                .pipe(tsc(srcTSConfig))
                .pipe(gulp.dest('build.spec/src'))
                .on('end', done);
        });
    }
    return GulpEnvironment;
})();
(function () {
    new GulpEnvironment();
})();
