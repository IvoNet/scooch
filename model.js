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
   config: {
      themesDir: "./templates",
      templatesDir: "./templates",
      slidesDir: "./slides"
   },
   buildModel: function () {
      model = {};
      model.themes = themes();

      model.templates = templates();

      if (model.templates.length !== 0) {
         model.template = model.templates[0].file;
      }

      model.transitions = transitions();
      model.transition = 'convex';

      model.slides = slides();
      return model;
   },
   themes : themes,
   templates : templates,
   transitions : transitions,
   slides : slides
};
var path = require("path"),
     fs = require("fs"),
     walk = require('fs-walk'),
     defaultThemesDir = '/node_modules/reveal.js/css/theme/';

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
   var themes = [];
   walk.walkSync(module.exports.config.themesDir, function (basedir, filename, stat) {
      "use strict";
      if (filename.endsWith(".css")) {
         themes.push({
            title: filename.replace(".css", ""),
            file: path.join("/", basedir, filename)
         });
      }
   });
   defaultThemes(fs.readdirSync("." + defaultThemesDir)).forEach(function (entry) {
      themes.push(entry);
   });

   return themes;
}

/**
 *
 * Get all the templates.
 */
function templates() {
   var templates = [];
   walk.walkSync(module.exports.config.templatesDir, function (basedir, filename, stat) {
      "use strict";
      if (filename.endsWith(".html")) {
         templates.push({
            title: filename.replace(".html", ""),
            file: path.join("/", basedir, filename)
         });
      }
   });
   return templates;
}

/**
 *
 * Get all posible transitions. See http://lab.hakim.se/reveal-js/#/transitions
 */
function transitions() {
   return [
      "none",
      "fade",
      "slide",
      "convex",
      "concave",
      "zoom"
   ];
}

/**
 *
 * Get the defined slides (aka presentations)
 */
function slides() {
   var slides = [];
   walk.walkSync(module.exports.config.slidesDir, function (basedir, filename, stat) {
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
         slides.push(slide);
      }
   });
   return slides;
}
