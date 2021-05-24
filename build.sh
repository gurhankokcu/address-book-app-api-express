#!/usr/bin/env bash

PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

rm ./artefact-v*.zip
rm -fr ./node_modules/
npm install --production
zip -r artefact-v$PACKAGE_VERSION.zip config controllers models node_modules routes index.js package.json
rm -fr ./node_modules/
npm install
