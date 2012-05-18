/*global desc, task, jake, fail, complete */
"use strict";

var Mocha = require("mocha");
var lint = require("./build/lint.js");


// Delete me
task('pass');
task('fail', function() {fail()});


task('default', ['lint', 'test']);

desc("Run tests");
task("test", [], function() {
	var mocha = new Mocha({ui: "bdd"});
	mocha.addFile("test/lint.js");

	var failures = false;
	mocha.run()
	.on("fail", function() {
		failures = true;
	}).on("end", function() {
		if (failures) fail("Tests failed");
		complete();
	});
}, {async: true});

desc("Lint the code");
task("lint", [], function() {
	var files = new jake.FileList();
	files.include("src/*.js");
	files.include("test/*.js");
	files.include("build/*.js");
	files.include("./*.js");

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

	var globals = {
		describe: false,
		it: false
	};

	var pass = lint.run(files.toArray(), options, globals);
	if (!pass) fail("Lint failed");
});
