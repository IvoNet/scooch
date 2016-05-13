# Scooch

An [ivonet-slides](https://github.com/IvoNet/ivonet-slides) docker image

## Prerequisites

* Docker up and running
* some disk space

## Install

Get the image
```sh
docker pull ivonet/scooch
```

## Run

```sh
docker run -i -t --rm ivonet/scooch
```

When running in a docker-machine in a terminal:

`open http://$(docker-machine ip default):3000/`

When native in a browser:

`http://localhost:3000`

# Credits

@pnmtjonahen Thanks!


# scooch about the project

Is a Powerpoint / KeyNote slide show app but then in the browser.

## Installation

```bash
npm install
```

# Usage

```bash
npm start
```
open a browser at [localhost](http://localhost:3000)

Other commands:
* `browse` will open chrome on a Mac with correct url.
* `run` will combine `browse` and `npm start`
* `npm start` will build new model.json and start the server
* `build` build the new model.json

## model.json

generated during the build process and contains all data needed to work.

## Love / Hate

I love giving presentations but hate the presentation tools we currently utilize.
This is my antidote.

## Markdown

This tool utilizes markdown as the notation markup.
This makes making slides easy.

