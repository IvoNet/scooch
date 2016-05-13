FROM node:6.1.0-wheezy
MAINTAINER IvoNet <webmaster@ivonet.nl>
ENV TAG 1.0.1
RUN git clone -b $TAG --single-branch https://github.com/IvoNet/scooch.git
WORKDIR /scooch
RUN npm install && ln -s /scooch/slides /slides && ln -s /scooch/templates /templates && ln -s /scooch/themes /themes
EXPOSE 3000
VOLUME /slides
VOLUME /templates
VOLUME /themes
ENTRYPOINT npm start