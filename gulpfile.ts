/// <reference path="typings/requirejs/require.d.ts" />

declare var __dirname: string;

class GulpEnvironment {
  constructor() {
    const gulp = require('gulp');
    const tsc = require('gulp-typescript');
    const Server = require('karma').Server;

    const srcTSConfig = tsc.createProject('src/tsconfig.json');
    const specTSConfig = tsc.createProject('spec/tsconfig.json');

    gulp.task('test', ['test-build:spec', 'test-build:src'], () => {
      new Server({
        configFile: __dirname + '/build.spec/spec/karma.conf.js',
        singleRun: true
      }).start();
    });
    gulp.task('test-build:spec', (done) => {
      specTSConfig.src()
        .pipe(tsc(specTSConfig))
        .pipe(gulp.dest('build.spec'))
        .on('end', done);
    });
    gulp.task('test-build:src', (done) => {
      srcTSConfig.src()
        .pipe(tsc(srcTSConfig))
        .pipe(gulp.dest('build.spec/src'))
        .on('end', done);
    });
  }
}

(function() {
  new GulpEnvironment();
})();
