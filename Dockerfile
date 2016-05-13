FROM node
MAINTAINER IvoNet <webmaster@ivonet.nl>
RUN git clone https://github.com/ivonet/ivonet-slides.git
WORKDIR ivonet-slides
RUN npm install && ln -s /ivonet-slides/slides /slides && ln -s /ivonet-slides/templates /templates
EXPOSE 3000
VOLUME /slides
VOLUME /templates
ENTRYPOINT npm start