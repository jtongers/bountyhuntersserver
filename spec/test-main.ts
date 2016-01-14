/// <reference path="../typings/requirejs/require.d.ts" />

class TestMain {
  private files: Array<any>;
  private MATCHER: RegExp;

  constructor() {
    this.files = new Array<any>();
    this.MATCHER = /.*(\.spec\.js)/i;

    Object.keys((window as any).__karma__.files).forEach(function(file) {
      if (this.MATCHER.test(file)) {
        // Normalize paths to RequireJS module names.
        // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
        // then do not normalize the paths
        var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '');
        this.files.push(normalizedTestModule);
      }
    }.bind(this));

    require.config({
      // Karma serves files under /base, which is the basePath from your config file
      baseUrl: '/base',

      // dynamically load all test files
      deps: this.files,

      // we have to kickoff jasmine, as it is asynchronous
      callback: (window as any).__karma__.start
    });
  }
}

(function() {
  new TestMain();
})();
