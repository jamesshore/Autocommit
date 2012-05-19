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
	it("should test console.log", function() {
		// stdout inspection code inspired by http://userinexperience.com/?p=714
		function setup(callback) {
			var write = process.stdout.write;

			process.stdout.write = function(string, encoding, fd) {
				callback(string, encoding, fd);
			};

			return function() {
				process.stdout.write = write;
			};
		};

		var output = [];
		var unhook = setup(function(string) {
			output.push(string);
			expect(string).to.equal("foo");
		});
		console.log("foo");
		unhook();
		expect(output).to.eql(["foo\n"]);
	});
});
