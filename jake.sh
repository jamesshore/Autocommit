#!/bin/bash

statusFile="build/last_status"

oldStatus=`cat $statusFile`

node node_modules/.bin/jake $*
if [ $? = 0 ]; then
	newStatus="Passed"
else
	newStatus="Failed"
fi

echo $newStatus > $statusFile

echo
echo "Last run: $oldStatus"
echo "This run: $newStatus"

if [ $oldStatus = $newStatus ]; then
	echo "No change"
else
	echo "Status changed"
fi

gitStatus=`git status --porcelain`
if [ "$gitStatus" = "" ]; then
	echo "Git status: NO changes"
else
	echo "Git status: YES changes"
fi