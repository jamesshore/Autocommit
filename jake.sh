#!/bin/bash

node node_modules/.bin/jake $*
if [ $? = 0 ]; then
	echo "Wrapper: Build Succeeded"
else
	echo "Wrapper: Build Failed"
fi
