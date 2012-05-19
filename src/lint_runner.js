"use strict";

var jshint = require("jshint").JSHINT;

exports.validateSource = function(sourceCode, options) {
	return jshint(sourceCode, options);
};