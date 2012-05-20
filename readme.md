Autocommit (a JSHint Runner)
============================
An experiment in demonstrating TDD.

The commits in this repository show how an application developed with test-driven development (TDD) grows and changes over time. Most of the commits were automatically generated: every time the build status toggled from "Passing" to "Failing" and back, my build script automatically committed the changes. By paging through the commit logs, you can see how the code evolved over time. (See below for details.)

The application is a simple runner for [JSHint](http://www.jshint.com), a code quality tool based on JSLint. The autocommit experiment was [suggested by azundo](http://news.ycombinator.com/item?id=3977616) on Hacker News, in response to the announcement of my upcoming screencast series, [Let's Code: Test-Driven Javascript](http://letscodejavascript.com).

Let's Code: Test-Driven Javascript
---------
*Let's Code: Test-Driven Javascript* is my new screencast series focusing on Javascript, TDD, and Node.js. My intention is to create an invaluable resource for anyone doing professional Javascript development. If you found this Autocommit experiment interesting, you'll probably like *Let's Code: Test-Driven Javascript*. 

I'm launching the series through Kickstarter so I can give it the time and attention it deserves. For more information or to back the project, [check out the Kickstarter](http://letscodejavascript.com).

The code in this repository uses [Mocha](http://visionmedia.github.com/mocha/) and [expect.js](https://github.com/LearnBoost/expect.js) for testing. The actual screencast could well use a different test framework or style. Once the project is funded, I'll take a second look at the Javascript testing ecosystem and make a decision about which framework to use. I'll also talk through my decision-making process on the Live channel of the screencast.

Reviewing the Commit Logs
----------
Each commit shows a small step in the evolution of this project, as the code switched from passing its tests to failing its tests (and vice-versa). The commits are [online here](https://github.com/jamesshore/Autocommit/commits/). The [last commit is here](https://github.com/jamesshore/Autocommit/commit/917cc3e3404ee894242e674652e7848f946bd6e6) and the [first commit is here](https://github.com/jamesshore/Autocommit/commit/da08ab8f1ec8480eb78df1689e2c48dbd16f8aaf).

GitHub isn't the most convenient way to review the commits, but it works. For a more convenient approach, download a copy of the repository [from GitHub](https://github.com/jamesshore/Autocommit) and view the history using `gitk` or the Mac GitHub application. To use `gitk`, open a terminal or command window, switch to the root of the Autocommit repository, and type `gitk`.

About the Runner
----------
*Beware of bugs in this code; I have only tested it, not tried it.* (With apologies to Donald Knuth.)

The runner in this repository provides a convenient front-end to [JSHint](http://www.jshint.com), a linter for Javascript. It should also work for [JSLint](http://www.jslint.com/). 

You're welcome to use the runner for your own projects. (See license below.) This project was just a quick hack, so I can't vouch for its robustness, but it should work in most cases. One flaw I'm aware of is that it assumes all files are UTF8-encoded, which may not be true for your system. It also has no exception handling.

The runner is a [Node.js](http://nodejs.org/) module. It exposes three functions:

	validateSource(sourceCode, [options], [globals], [description])
   
Run JSHint on raw source code and output the results to the console (using `console.log()`). If the code failed to validate, the details are also output to the console. If the code succeeded, a one-line `ok` message is displayed. If provided, `description` will be prepended to the pass/fail message, like this: `description ok`.

This function returns `true` if the code was valid or `false` if errors were found. `options` and `globals` are passed through to JSHint.

	validateFile(filename, [options], [globals])
   
Same as `validateSource`, except that the source code is read from a file.

	validateFileList(fileList, [options], [globals])
	
Validates multiple files and outputs the results for each one. All files are validated even when some fail.

`fileList` is expected to be an array. This function returns `true` if *all* files are valid and `false` otherwise.


License
-------
Copyright (c) 2012 James Shore

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
