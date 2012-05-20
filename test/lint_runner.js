"use strict";

var expect = require("expect.js");
var lint = require("../src/lint_runner.js");

//TODO: redirect console.log instead of process.stdout.write?

// stdout inspection code inspired by http://userinexperience.com/?p=714
function redirectConsole(newFunction) {
	var original = console.log;
	console.log = newFunction;
	return original;
}

function testConsole(test) {
	var output = [];
	var original = redirectConsole(function(string, encoding, fd) {
		output.push(string);
	});
	test(output);
	console.log = original;
}

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
	it("should say 'ok' on pass", function() {
		testConsole(function(output) {
			lint.validateSource("");
			expect(output).to.eql(["ok\n"]);
		});
	});
});
