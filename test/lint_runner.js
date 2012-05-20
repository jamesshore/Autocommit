"use strict";

var expect = require("expect.js");
var assert = require("assert");
var fs = require("fs");
var path = require("path");

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


describe("Source code validation", function() {
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

describe("File loading", function() {
	var tempFile = "build/temp_files/file-loading-test.js";

	afterEach(function() {
		if (path.existsSync(tempFile)) fs.unlinkSync(tempFile);
		assert.ok(!path.existsSync(tempFile), "Could not delete test file: " + tempFile);
	});

	it("should load file from file system (assume UTF-8)", function() {
		fs.writeFileSync(tempFile, "var a = 1;");
		expect(lint.validateFile(tempFile)).to.be(true);
	});

	it("should respect options", function() {
//		fs.writeFileSync(tempFile)
	});

	// TODO: should use filename as description
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
			lint.validateSource("foo;");
			expect(output).to.eql([
				"fail",
				"1: foo;",
				"   Expected an assignment or function call and instead saw an expression."
			]);
		});
	});

	it("should report all errors", function() {
		inspectConsole(function(output) {
			lint.validateSource("foo;\nbar()");
			expect(output).to.eql([
				"fail",
				"1: foo;",
				"   Expected an assignment or function call and instead saw an expression.",
				"2: bar()",
				"   Missing semicolon."
			]);
		});
	});

	it("should trim whitespace from source code", function() {
		inspectConsole(function(output) {
			lint.validateSource("   foo()\t \n");
			expect(output[1]).to.eql("1: foo()");
		});
	});

	it("should include optional description", function() {
		inspectConsole(function(output) {
			lint.validateSource("", {}, {}, "code A");
			expect(output[0]).to.eql("code A ok");
		});
		inspectConsole(function(output) {
			lint.validateSource("foo;", {}, {}, "code B");
			expect(output[0]).to.eql("code B fail");
		});
	});

	// To do: Some edge cases that I don't know how to trigger, so haven't tested or supported:
	// 1- two reasons in a row (no line number or evidence); may not occur in current version
	// 2- null element at end of errors array; occurs when JSHint catches exception
});
