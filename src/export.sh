#!/bin/bash
currentPath=${PWD}
cd "$currentPath"

rm -rf ../assets
rm -rf ../fonts
rm -rf ../img
rm -rf ../index.html
rm -rf ../favicon.png

npm run build
cp -r ./dist/* ../