"use strict";
require("should");
var lint = require("../src/lint_runner.js");

describe("Lint Runner", function() {
	it("should pass good source code", function(){
		lint.validateSource("var a = 1;").should.be.ok;
	});
});
