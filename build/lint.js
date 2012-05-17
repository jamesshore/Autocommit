"use strict";

var fs = require('fs');
var jshint = require('jshint').JSHINT;

function lintFile(filename, options) {
	var source = fs.readFileSync(filename, 'utf8');
	var pass = jshint(source, options);
	if (pass === true) {
		console.log(filename, "ok");
	}
	else {
		console.log(filename, "failed");
		for (var i = 0; i < jshint.errors.length; i++) {
			var error = jshint.errors[i];
			if (!error) continue;

			if (error.evidence) console.log(error.line + ": " + error.evidence.trim());
			console.log("   " + error.reason);
		}
	}
	return pass;
}

function lintFiles(files, options) {
	var allPass = true;
	files.forEach(function(filename) {
		var pass = lintFile(filename, options);
		allPass = allPass && pass;
	});
	return allPass;
}

exports.run = lintFiles;
