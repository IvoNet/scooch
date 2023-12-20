# Scooch about the project

[![Publish to Docker Hub](https://github.com/mdvanes/scooch/actions/workflows/publish.yml/badge.svg?branch=qwik)](https://github.com/mdvanes/scooch/actions/workflows/publish.yml)

Is a Powerpoint / KeyNote like slide show app but then in the browser.

## Installation

```bash
npm install --production
```

or docker

```sh
docker pull ivonet/scooch
```

## Usage

```bash
npm start
```

or with docker

```sh
docker run -i -t --rm -p 3000:3000 ivonet/scooch
```

When running in a docker-machine in a terminal:

`open http://$(docker-machine ip default):3000/`

When native (linux) in a browser:

open a browser at [localhost](http://localhost:3000)

## Unit testing

Unit tests are written in Jasmine and can be run with Karma. Be sure to have the ```devDependencies``` loaded as well:

```bash
npm install
```

You may alsno need to install Karma globally:

```bash
npm install -g karma-cli
```

Now you can run the unit tests by simply running:

```bash
karma start
```

Coverage report can be found in the ```/coverage``` directory.


## New presentations

Just create the markdown file(s) in your scooch folder and refresh the startup page.
New slides will be picket up immediately.

## Love / Hate

I love giving presentations but hate the presentation tools we currently utilize.
This is my antidote.

## Markdown

This tool utilizes markdown as the notation markup.
This makes making slides easy.

See the included tutorials for complete explanations.

## Credits

* [@pnmtjonahen](https://github.com/pnmtjonahen) Thanks! for your efforts on this project
* thanks [rajgoel](https://github.com/rajgoel/reveal.js-plugins) for bundling some grate plugins

## Version upgrade manual

### upgrade to 1.5 from older version

* Add lines within the comments (see index.html) to your own template(s)

### upgrade to 2.0 from older version

* Move all templates within their own folder in the templates folder
* Move all themes to their corresponding template in the templates folder you just created
* Adjust your template html(s) to point to the just moved theme css
* Remove the themes folder
* If you use a docker-compose.yml file you need to remove the /themes volume


## Run locally from Docker image

Create a docker-compose.yml:

```
version: "3"
services:
  scooch:
    image: ghcr.io/mdvanes/scooch:qwik
    ports:
      - 3000:3000
```

and run

```bash
docker compose up
```

## Development

### Running locally in development mode

```bash
npm run start
```

### Running locally in production mode

```bash
npm run build
npm run serve
```

### Building Docker image locally

```bash
docker compose up
```