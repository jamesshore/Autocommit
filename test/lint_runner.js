"use strict";

var expect = require("expect.js");
var assert = require("assert");
var lint = require("../src/lint_runner.js");

//TODO: redirect console.log instead of process.stdout.write?

// stdout inspection code inspired by http://userinexperience.com/?p=714
function RedirectConsole(newFunction) {
	var original;
	this.redirect = function(newFunction) {
		assert.ok(!original, "Console already redirected");
		original = console.log;
		console.log = newFunction;
	};
	this.restore = function() {
		assert.ok(original, "Console not redirected");
		console.log = original;
		original = null;
	};
}

function testConsole(test) {
	var output = [];
	var console = new RedirectConsole();
	console.redirect(function(string) {
		output.push(string);
	});
	test(output);
	console.restore();
}

describe("Lint runner", function() {
	var console = new RedirectConsole();

	beforeEach(function() {
		console.redirect(function() {});
	});

	afterEach(function() {
		console.restore();
	});

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
			expect(output).to.eql(["ok"]);
		});
	});
});
