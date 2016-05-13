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
const fs = require('fs');
const walk = require('fs-walk');
const path = require('path');
const defaultThemesDir = '/node_modules/reveal.js/css/theme/';
const templatesDir = '/templates/';

var model = {};

function defaultThemes(items, dir) {
   return items.filter(function (el) {
      return el.endsWith('.css')
   }).map(function (el) {
      return {
         title: el.replace(".css", ""),
         file: dir + el
      }
   });
}

//themes. first personal themes then default themes
model.themes = defaultThemes(fs.readdirSync("themes"), "/themes/");
model.theme = model.themes[0].file; //TODO failes when nothing there
defaultThemes(fs.readdirSync("." + defaultThemesDir), defaultThemesDir).forEach(function (entry) {
   model.themes.push(entry)
});

function processTemplates(items) {
   return items.filter(function (el) {
      return el.endsWith('.html')
   }).map(function (el) {
      return {
         title: el.replace(".html", ""),
         file: path.join("/",templatesDir, el)
      }
   });
}
//templates
model.templates = processTemplates(fs.readdirSync("templates"));

model.templates.forEach(function (data) {
   if (data.title === "ivonet") {
      model.template = data.file;
   }
});
if (model.template === undefined) {
   model.template = model.templates[0].file
}

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

//Presentations
model.slides = [];
walk.walkSync('./slides', function (basedir, filename, stat) {
   "use strict";
   if (filename.endsWith(".md")) {
      var slide = {};
      slide.title = filename.replace(".md", "");
      slide.file = path.join("/", basedir, filename);
      model.slides.push(slide)
   }
});

console.log(model);
fs.writeFileSync("data/model.json", JSON.stringify(model));

