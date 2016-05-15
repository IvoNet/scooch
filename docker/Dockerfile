FROM node
MAINTAINER IvoNet <webmaster@ivonet.nl>

ENV TAG gulpify

RUN git clone -b $TAG --single-branch https://github.com/IvoNet/scooch.git \
    && cd scooch \
    && npm install \
    && npm install -g gulp \
    && gulp \
    && npm uninstall -g gulp \
    && rm -rf node_modules \
    && mv -v dist/node_modules node_modules \
    && ln -s /scooch/slides /slides \
    && ln -s /scooch/templates /templates \
    && ln -s /scooch/themes /themes

WORKDIR /scooch
RUN npm install && ln -s /scooch/slides /slides && ln -s /scooch/templates /templates && ln -s /scooch/themes /themes
EXPOSE 3000
VOLUME /slides
VOLUME /templates
VOLUME /themes
ENTRYPOINT npm start