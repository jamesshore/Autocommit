"use strict";

var jshint = require("jshint").JSHINT;

exports.validateSource = function(sourceCode, options, globals) {
	return jshint(sourceCode, options, globals);
};