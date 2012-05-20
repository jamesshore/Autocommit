"use strict";

var jshint = require("jshint").JSHINT;

exports.validateSource = function(sourceCode, options, globals) {
	var pass = jshint(sourceCode, options, globals);
	if (pass) {
		console.log("ok");
	}
	else {
		console.log("fail");
		var error = jshint.errors[0];
		console.log(error.line + ": " + error.evidence);
		console.log("   " + error.reason);
	}
	return pass;
};