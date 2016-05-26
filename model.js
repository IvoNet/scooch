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
 * Build a model for scooch, it will contain themes, templates and posible slides.
 */
module.exports = {
   buildModel: function () {
      themes();
      templates();
      transitions();
      slides();
      return JSON.stringify(model);
   }
};
var http             = require("http"),
    url              = require("url"),
    path             = require("path"),
    fs               = require("fs"),
    walk             = require('fs-walk'),
    defaultThemesDir = '/node_modules/reveal.js/css/theme/',
    templatesDir     = '/templates/';

var model = {};

/**
 * Get the default reveal.js themes
 * @param {type} files the list of theme files
 *
 */
function defaultThemes(files) {
   return files.filter(function (el) {
      return el.endsWith('.css');
   }).map(function (el) {
      return {
         title: el.replace(".css", ""),
         file: defaultThemesDir + el
      };
   });
}

/**
 *
 * Get all the themes (default reveal.js themes + user defined
 */
function themes() {
   model.themes = [];
   walk.walkSync('./templates', function (basedir, filename, stat) {
      "use strict";
      if (filename.endsWith(".css")) {
         var theme = {};
         theme.title = filename.replace(".css", "");
         theme.file = path.join("/", basedir, filename);
         model.themes.push(theme);
      }
   });
   defaultThemes(fs.readdirSync("." + defaultThemesDir)).forEach(function (entry) {
      model.themes.push(entry);
   });
}

/**
 *
 * Get all the templates.
 */
function templates() {
   model.templates = [];
   walk.walkSync('./templates', function (basedir, filename, stat) {
      "use strict";
      if (filename.endsWith(".html")) {
         var template = {};
         template.title = filename.replace(".html", "");
         template.file = path.join("/", basedir, filename);
         model.templates.push(template);
      }
   });
   model.templates.forEach(function (data) {
      if (data.title === "ivonet") {
         model.template = data.file;
      }
   });
   if (model.template === undefined && model.templates.length !== 0) {
      model.template = model.templates[0].file;
   }
}

/**
 *
 * Get all posible transitions. See http://lab.hakim.se/reveal-js/#/transitions
 */
function transitions() {
   model.transitions = [
      "none",
      "fade",
      "slide",
      "convex",
      "concave",
      "zoom"
   ];
   model.transition = 'convex';
}

/**
 *
 * Get the defined slides (aka presentations)
 */
function slides() {
   model.slides = [];
   walk.walkSync('./slides', function (basedir, filename, stat) {
      "use strict";
      if (filename.endsWith(".md")) {
         var slide = {};
         slide.title = filename.replace(".md", "");
         slide.file = path.join("/", basedir, filename);
         var preset = path.join(basedir, "preset.json");
         if (fs.existsSync(preset)) {
            slide.preset = path.join("/", preset);
         }
         var chalkboard = path.join(basedir, "chalkboard.json");
         if (fs.existsSync(chalkboard)) {
            slide.chalkboard = path.join("/", chalkboard);
         }
         model.slides.push(slide);
      }
   });
}
