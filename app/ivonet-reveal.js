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

var reveal_config = {
   controls: true, //TODO configurable
   progress: true, //TODO configurable
   history: true, //TODO configurable
   center: false,
   showNotes: (QueryString.showNotes == undefined) ? false : QueryString.showNotes,

   chalkboard: {
      src: null,
      readOnly: true,
      transition: 800,
      theme: "chalkboard",
      // configuration options for notes canvas and chalkboard
      color: [
         'rgba(255,255,0,1)',
         'rgba(255,255,255,0.5)'
      ],
      background: [
         'rgba(127,127,127,.1)',
         '/plugins/chalkboard/img/blackboard.png'
      ],
      pen: [
         '/plugins/chalkboard/img/boardmarker.png',
         '/plugins/chalkboard/img/chalk.png'
      ]
   },

   math: {
      mathjax: '/node_modules/mathjax/MathJax.js',
      config: 'TeX-AMS_HTML-full'  // See http://docs.mathjax.org/en/latest/config-files.html
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
      {
         src: '/plugins/reveal-code-focus/reveal-code-focus.js', async: true, callback: function () {
         RevealCodeFocus();
      }
      },
      {src: '/plugins/chalkboard/chalkboard.js'}
   ],
   keyboard: {
      67: function () {
         RevealChalkboard.toggleNotesCanvas(); // toggle notes canvas when 'c' is pressed
      },
      66: function () {
         RevealChalkboard.toggleChalkboard(); // toggle chalkboard when 'b' is pressed
      },
      46: function () {
         RevealChalkboard.clear(); // clear chalkboard when 'DEL' is pressed
      },
      8: function () {
         RevealChalkboard.reset(); // reset chalkboard data on current slide when 'BACKSPACE' is pressed
      },
      68: function () {
         RevealChalkboard.download(); // download recorded chalkboard drawing when 'd' is pressed
      }
   }
};

if (QueryString.chalk !== undefined) {
   reveal_config.chalkboard.src = QueryString.chalk;
}
if (QueryString.chalkEditable !== undefined) {
   reveal_config.chalkboard.editable = true;
}

Reveal.initialize(reveal_config);

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



