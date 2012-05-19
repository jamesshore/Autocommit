"use strict";

var jshint = require("jshint").JSHINT;

exports.validateSource = function(sourceCode) {
	return jshint(sourceCode);
};