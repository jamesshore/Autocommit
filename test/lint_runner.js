"use strict";

var expect = require("expect.js");
var lint = require("../src/lint_runner.js");

describe("Lint runner", function() {
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

describe("Error reporting", function() {
	// stdout inspection code courtesy of http://userinexperience.com/?p=714
	function setup(callback) {
		var write = process.stdout.write;

		process.stdout.write = (function(stub) {
			function(string, encoding, fd) {
				stub.apply(process.stdout, arguments);
				callback(string, encoding, fd);
			};
		})(process.stdout.write);

		return function() {
			process.stdout.write = write;
		};
	};

	it("should test console.log", function() {
		var unhook = setup(function(string, encoding, fd) {
			expect(string).to.equal("foo");
		});
		console.log("foo");
		unhook();
	});
});
