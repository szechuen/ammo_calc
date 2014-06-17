#!/bin/bash

CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
LATEST_COMMIT=$(git rev-parse --short HEAD)
MAIN_BRANCH="master"

UNSTAGED_CHANGES=$(git diff --exit-code)

echo "$UNSTAGED_CHANGES"

if [ "$UNSTAGED_CHANGES" = "" ]; then
	git pull --rebase

	git checkout $MAIN_BRANCH
	git pull --rebase

	git rebase $CURRENT_BRANCH

	jekyll build --destination www
	git add -A .
	git commit -am "Regenerate Jekyll build in $MAIN_BRANCH branch from $CURRENT_BRANCH $LATEST_COMMIT"

	git pull --rebase

	git checkout $CURRENT_BRANCH
	git push --all
else
	echo "Unstaged changes exists"
fi
