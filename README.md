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