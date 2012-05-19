"use strict";

var expect = require("expect.js");
var lint = require("../src/lint_runner.js");

describe("Lint Runner", function() {
	it("should pass good source code", function(){
		expect(lint.validateSource("var a = 1;")).to.be(true);
	});

	it("should fail bad source code", function() {
		expect(lint.validateSource("bargledy-bargle")).to.be(false);
	});

	it("should respect options", function() {
		expect(lint.validateSource("a = 1;", { undef:false })).to.be(true);
	});

	it("should respect globals", function() {
		expect(lint.validateSource("a = 1;", { undef: true }, { a: true })).to.be(true);
	});
});
