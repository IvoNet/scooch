#!/bin/sh

PWD=$(pwd)

mkdir -p public/templates/default
if [ ! -d "$PWD/public/templates/default/img" ]; then
    ln -s "$PWD/node_modules/reveal.js-plugins/chalkboard/img" "$PWD/public/templates/default/img"
fi

mkdir -p public/templates/ivonet
if [ ! -d "$PWD/public/templates/default/img" ]; then
    ln -s "$PWD/node_modules/reveal.js-plugins/chalkboard/img" "$PWD/public/templates/ivonet/img"
fi
