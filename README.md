# Scooch about the project

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


## NOTE:
It seams that Versioning is not as it should be in the JS world :-( I checked this application in when it worked! not a few month later I checked it out again to make a small change and it does not work anymore?!?! Seems that I forgot to remember on which version NodeJs and NPM and stuff I build it. 
Have to fix it again hehe.

## Express Server

This app has a minimal [Express server](https://expressjs.com/) implementation. After running a full build, you can preview the build using the command:

```
npm run serve
```

Then visit [http://localhost:8080/](http://localhost:8080/)
