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
        mathjax: '/bower_components/MathJax/MathJax.js',
        config: 'TeX-AMS_HTML-full'  // See http://docs.mathjax.org/en/latest/config-files.html
    },

    // Optional libraries used to extend on reveal.js
    dependencies: [
        {
            src: '/bower_components/reveal.js/lib/js/classList.js', condition: function () {
            return !document.body.classList;
        }
        },
        {
            src: '/bower_components/reveal.js/plugin/markdown/marked.js', condition: function () {
            return !!document.querySelector('[data-markdown]');
        }
        },
        {
            src: '/bower_components/reveal.js/plugin/markdown/markdown.js', condition: function () {
            return !!document.querySelector('[data-markdown]');
        }
        },
        {
            src: '/bower_components/reveal.js/plugin/highlight/highlight.js', async: true, callback: function () {
            hljs.initHighlightingOnLoad();
        }
        },
        {
            src: '/bower_components/reveal.js/plugin/zoom-js/zoom.js', async: true, condition: function () {
            return !!document.body.classList;
        }
        },
        {src: '/bower_components/reveal.js/plugin/notes/notes.js'},
        {src: '/bower_components/reveal.js/plugin/math/math.js', async: true}
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