#!/bin/bash

statusFile="build/last_status"

oldStatus=`cat $statusFile`

node node_modules/.bin/jake $*
if [ $? = 0 ]; then
	newStatus="PASS"
else
	newStatus="FAIL"
fi

echo $newStatus > $statusFile

if [ "$oldStatus" != "$newStatus" ]; then
	git commit -a -m "Autocommit: Build state toggled to $newStatus"

	gitStatus=`git status --porcelain`
	if [ "$gitStatus" != "" ]; then
		echo
		echo "!! WARNING: Uncommitted files; use 'git add'"
	fi
fi
