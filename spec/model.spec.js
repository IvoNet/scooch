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

var model = require("../model");

describe("Build defauld model", function () {
   it("return model with defaults", function () {
      var result = model.buildModel();
      expect(result.themes.length >= 11).toBe(true);
      expect(result.templates.length >= 2).toBe(true);
      expect(result.template).toBe(result.templates[0].file);
      expect(result.transitions.length).toBe(6);
      expect(result.transition).toBe("convex");
      expect(result.slides.length >= 3).toBe(true);
   });
});
describe("Build model from different location", function () {
   var original;
   beforeEach(function () {
      original = model.config;
      model.config = {
         themesDir: "./spec/broken",
         templatesDir: "./spec/broken",
         slidesDir: "./spec/slides"};
   });
   afterEach(function () {
      model.config = original;
   });
   it("return model with defaults", function () {
      var result = model.buildModel();
      expect(result.themes.length).toBe(12);
      expect(result.templates.length).toBe(1);
      expect(result.template).toBe("/spec/broken/broken.html");
      expect(result.transitions.length).toBe(6);
      expect(result.transition).toBe("convex");
      expect(result.slides.length).toBe(1);
   });
});
describe("Build model from empty location", function () {
   var original;
   beforeEach(function () {
      original = model.config;
      model.config = {
         themesDir: "./spec/empty",
         templatesDir: "./spec/empty",
         slidesDir: "./spec/empty"};
   });
   afterEach(function () {
      model.config = original;
   });
   it("return model with defaults", function () {
      var result = model.buildModel();
      expect(result.themes.length).toBe(11);
      expect(result.templates.length).toBe(0);
      expect(result.template).toBeUndefined();
      expect(result.transitions.length).toBe(6);
      expect(result.transition).toBe("convex");
      expect(result.slides.length).toBe(0);
   });
});

