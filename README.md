# Scooch about the project

Is a Powerpoint / KeyNote like slide show app but then in the browser.

## Installation

```bash
npm install
```

or docker

```sh
docker pull ivonet/scooch
```

# Usage

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

## New presentations

Just create the markdown file(s) in your scooch folder and refresh the startup page.
New slides will be picket up immediately.

## Love / Hate

I love giving presentations but hate the presentation tools we currently utilize.
This is my antidote.

## Markdown

This tool utilizes markdown as the notation markup.
This makes making slides easy.

# Credits

[@pnmtjonahen](https://github.com/pnmtjonahen) Thanks! for your efforts on this project


