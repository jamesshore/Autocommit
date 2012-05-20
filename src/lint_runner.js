"use strict";

var jshint = require("jshint").JSHINT;

exports.validateSource = function(sourceCode, options, globals) {
	var pass = jshint(sourceCode, options, globals);
	if (pass) {
		console.log("ok");
	}
	else {
		console.log("fail");
		jshint.errors.forEach(function(error) {
			console.log(error.line + ": " + error.evidence.trim());
			console.log("   " + error.reason);
		});
	}
	return pass;
};