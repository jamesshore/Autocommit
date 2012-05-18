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