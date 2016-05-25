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

var request = require("request");
var scooch = require("../scooch");
var base_url = "http://localhost:3000/";

describe("Scooch Server", function () {
   describe("GET /model.json", function () {
      it("returns status code 200", function (done) {
         request.get(base_url + "model.json", function (error, response, body) {
            expect(response.statusCode).toBe(200);
            done();
         });
      });

      it("returns Hello World", function (done) {
         request.get(base_url + "model.json", function (error, response, body) {
            expect(body).toBe("{\"themes\":[{\"title\":\"ivonet\",\"file\":\"/templates/ivonet/ivonet.css\"},{\"title\":\"beige\",\"file\":\"/node_modules/reveal.js/css/theme/beige.css\"},{\"title\":\"black\",\"file\":\"/node_modules/reveal.js/css/theme/black.css\"},{\"title\":\"blood\",\"file\":\"/node_modules/reveal.js/css/theme/blood.css\"},{\"title\":\"league\",\"file\":\"/node_modules/reveal.js/css/theme/league.css\"},{\"title\":\"moon\",\"file\":\"/node_modules/reveal.js/css/theme/moon.css\"},{\"title\":\"night\",\"file\":\"/node_modules/reveal.js/css/theme/night.css\"},{\"title\":\"serif\",\"file\":\"/node_modules/reveal.js/css/theme/serif.css\"},{\"title\":\"simple\",\"file\":\"/node_modules/reveal.js/css/theme/simple.css\"},{\"title\":\"sky\",\"file\":\"/node_modules/reveal.js/css/theme/sky.css\"},{\"title\":\"solarized\",\"file\":\"/node_modules/reveal.js/css/theme/solarized.css\"},{\"title\":\"white\",\"file\":\"/node_modules/reveal.js/css/theme/white.css\"}],\"templates\":[{\"title\":\"default\",\"file\":\"/templates/default/default.html\"},{\"title\":\"ivonet\",\"file\":\"/templates/ivonet/ivonet.html\"}],\"template\":\"/templates/ivonet/ivonet.html\",\"transitions\":[\"none\",\"fade\",\"slide\",\"convex\",\"concave\",\"zoom\"],\"transition\":\"convex\",\"slides\":[{\"title\":\"1. How to Scooch\",\"file\":\"/slides/1. How to  Scooch/1. How to Scooch.md\",\"preset\":\"/slides/1. How to  Scooch/preset.json\"},{\"title\":\"2. How to use Markdown\",\"file\":\"/slides/2. How To Use Markdown/2. How to use Markdown.md\",\"preset\":\"/slides/2. How To Use Markdown/preset.json\"},{\"title\":\"3. Advanced Scooch\",\"file\":\"/slides/3. Advanced Scooch/3. Advanced Scooch.md\",\"preset\":\"/slides/3. Advanced Scooch/preset.json\",\"chalkboard\":\"/slides/3. Advanced Scooch/chalkboard.json\"}]}");
            done();
         });
      });
   });
});

