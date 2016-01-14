define(["require", "exports"], function (require, exports) {
    var HelloWorld = (function () {
        function HelloWorld() {
        }
        HelloWorld.prototype.getMessage = function () {
            return "Hello, world!";
        };
        return HelloWorld;
    })();
    exports.HelloWorld = HelloWorld;
});
