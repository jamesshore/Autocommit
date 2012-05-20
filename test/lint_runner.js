"use strict";

var expect = require("expect.js");
var assert = require("assert");
var lint = require("../src/lint_runner.js");

// console inspection code inspired by http://userinexperience.com/?p=714
function TestConsole(newFunction) {
	var original;
	this.redirect = function(newFunction) {
		assert.ok(!original, "Console already redirected");
		original = console.log;
		console.log = newFunction;
	};
	this.ignore = function() {
		this.redirect(function() {});
	};
	this.restore = function() {
		assert.ok(original, "Console not redirected");
		console.log = original;
		original = null;
	};
}

function inspectConsole(test) {
	var output = [];
	var console = new TestConsole();
	console.redirect(function(string) {
		output.push(string);
	});
	test(output);
	console.restore();
}

var testConsole = new TestConsole();

beforeEach(function() {
	testConsole.ignore();
});

afterEach(function() {
	testConsole.restore();
});


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
		inspectConsole(function(output) {
			lint.validateSource("");
			expect(output).to.eql(["ok"]);
		});
	});

	it("should report errors on failure", function() {
		inspectConsole(function(output) {
			lint.validateSource("foo");
			expect(output).to.eql([
				"fail",
				"1: foo",
				"\tExpected an assignment or function call and instead saw an expression."
			]);
		});
	});

	//TODO: optional source code descriptor
});
