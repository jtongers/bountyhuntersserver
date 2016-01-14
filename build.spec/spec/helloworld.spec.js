define(["require", "exports", '../src/helloworld'], function (require, exports, helloworld_1) {
    describe("HelloWorld.getMessage", function () {
        it("should return 'Hello, world!'", function () {
            var hw = new helloworld_1.HelloWorld();
            expect(hw.getMessage()).toBe("Hello, world!");
        });
    });
});
