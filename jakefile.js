/*global desc, task, jake, fail */
"use strict";

task('default', ['lint']);

desc("Lint the code");
task("lint", [], function() {
	var lint = require("./build/lint.js");

	var options = {
		bitwise: true,
		curly: false,
		eqeqeq: true,
		forin: true,
		immed: true,
		latedef: true,
		newcap: true,
		noarg: true,
		noempty: true,
		nonew: true,
		regexp: true,
		undef: true,
		strict: true,
		trailing: true,
		node: true
	};

	var files = new jake.FileList();
	files.include('src/*.js');
	files.include('build/*.js');
	files.include('./*.js');

	var pass = lint.run(files.toArray(), options);
	if (!pass) fail("Lint failed");
});
