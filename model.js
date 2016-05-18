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

module.exports = {
   buildModel: function () {
      themes();
      templates();
      transitions();
      presentations();
      console.log(model);
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
function defaultThemes(items, dir) {
   return items.filter(function (el) {
      return el.endsWith('.css');
   }).map(function (el) {
      return {
         title: el.replace(".css", ""),
         file: dir + el
      };
   });
}

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
   defaultThemes(fs.readdirSync("." + defaultThemesDir), defaultThemesDir).forEach(function (entry) {
      model.themes.push(entry);
   });
}

function processTemplates(items) {
   return items.filter(function (el) {
      return el.endsWith('.html');
   }).map(function (el) {
      return {
         title: el.replace(".html", ""),
         file: path.join("/", templatesDir, el)
      };
   });
}

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
function transitions() {
//Transitions
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
function presentations() {
//Presentations
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
