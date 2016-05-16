/*
 * Copyright 2016 Ivo Woltring <WebMaster@ivonet.nl>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Created by ivonet.
 */
Reveal.initialize({
   controls: true,
   progress: true,
   history: true,
   center: (QueryString.center == undefined) ? false : QueryString.center,
   showNotes: (QueryString.showNotes == undefined) ? false : QueryString.showNotes,

//        parallaxBackgroundImage: '../theme/galaxy-005-2560x1600.jpg', //galaxy-005- 2560 x 1600 .jpg
//        parallaxBackgroundSize: '2560px 1600px',

   math: {
      mathjax: '/node_modules/mathjax/MathJax.js',
      config: 'TeX-AMS_HTML-full'  // See http://docs.mathjax.org/en/latest/config-files.html
   },

   multiplex: {
      // Example values. To generate your own, see the socket.io server instructions.
      secret: '14633466848285557442', // Obtained from the socket.io server. Gives this (the master) control of the presentation
      id: '6c5d50655923c47f', // Obtained from socket.io server
      url: 'http://localhost:3000' // Location of socket.io server
   },
   // Optional libraries used to extend on reveal.js
   dependencies: [
      {
         src: '/node_modules/reveal.js/lib/js/classList.js', condition: function () {
         return !document.body.classList;
      }
      },
      {
         src: '/node_modules/reveal.js/plugin/markdown/marked.js', condition: function () {
         return !!document.querySelector('[data-markdown]');
      }
      },
      {
         src: '/node_modules/reveal.js/plugin/markdown/markdown.js', condition: function () {
         return !!document.querySelector('[data-markdown]');
      }
      },
      {
         src: '/node_modules/reveal.js/plugin/highlight/highlight.js', async: true, callback: function () {
         hljs.initHighlightingOnLoad();
      }
      },
      {
         src: '/node_modules/reveal.js/plugin/zoom-js/zoom.js', async: true, condition: function () {
         return !!document.body.classList;
      }
      },
      {src: '/node_modules/reveal.js/plugin/notes/notes.js'},
      {src: '/node_modules/reveal.js/plugin/math/math.js', async: true},
      {src: '//cdn.socket.io/socket.io-1.3.5.js', async: true},
      {src: '/node_modules/reveal.js/plugin/multiplex/master.js', async: true}
   ]
});

Reveal.addEventListener('ready', function () {
   //select all markdowned images not starting with http (local)
   //and change their paths to conform to server location
   $('section img').each(function () {
      var $img = $(this);
      var imgsrc = $img.attr('src');
      if (imgsrc.substr(0, 4) === 'http') {
         return true;
      }
      var slideshow = QueryString.slideshow;
      slideshow = slideshow.substr(0, slideshow.lastIndexOf("/")) + '/' + imgsrc;
      $img.attr('src', slideshow)

   });
});