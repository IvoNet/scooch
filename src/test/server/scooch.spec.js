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

require("../../main/server/scooch");

var base_url = "http://localhost:3000/";

describe("Scooch Server", function () {
   describe("GET /", function () {
      it("returns status code 200", function (done) {
         request.get(base_url, function (error, response, body) {
            expect(response.statusCode).toBe(200);
            done();
         });
      });
   });

   describe("GET /unknown.resource", function () {
      it("returns status code 404", function (done) {
         request.get(base_url + "unknown.resource", function (error, response, body) {
            expect(response.statusCode).toBe(404);
            done();
         });
      });
   });

   describe("GET /api/model", function () {
      it("returns status code 200", function (done) {
         request.get(base_url + "api/model", function (error, response, body) {
            expect(response.statusCode).toBe(200);
            done();
         });
      });
      it("returns model.json with defaults", function (done) {
         request.get(base_url + "api/model", function (error, response, body) {
            var model = JSON.parse(body);
            expect(model.themes.length >= 11).toBe(true);
            expect(model.templates.length >= 2).toBe(true);
            expect(model.transitions.length >= 6).toBe(true);
            expect(model.transition).toBe("convex");
            expect(model.slides.length >= 3).toBe(true);
            done();
         });
      });
   });
   describe("GET /api/model/templates", function () {
      it("returns status code 200", function (done) {
         request.get(base_url + "api/model/templates", function (error, response, body) {
            expect(response.statusCode).toBe(200);
            done();
         });
      });
      it("returns templates", function (done) {
         request.get(base_url + "api/model/templates", function (error, response, body) {
            var templates = JSON.parse(body);
            expect(templates.length >= 2).toBe(true);
            done();
         });
      });
   });
   describe("GET /api/model/themes", function () {
      it("returns status code 200", function (done) {
         request.get(base_url + "api/model/themes", function (error, response, body) {
            expect(response.statusCode).toBe(200);
            done();
         });
      });
      it("returns themes", function (done) {
         request.get(base_url + "api/model/themes", function (error, response, body) {
            var themes = JSON.parse(body);
            expect(themes.length >= 11).toBe(true);
            done();
         });
      });
   });
   describe("GET /api/model/transitions", function () {
      it("returns status code 200", function (done) {
         request.get(base_url + "api/model/transitions", function (error, response, body) {
            expect(response.statusCode).toBe(200);
            done();
         });
      });
      it("returns transitions", function (done) {
         request.get(base_url + "api/model/transitions", function (error, response, body) {
            var transitions = JSON.parse(body);
            expect(transitions.length >= 6).toBe(true);
            done();
         });
      });
   });
   describe("GET /api/model/slides", function () {
      it("returns status code 200", function (done) {
         request.get(base_url + "api/model/slides", function (error, response, body) {
            expect(response.statusCode).toBe(200);
            done();
         });
      });
      it("returns slides", function (done) {
         request.get(base_url + "api/model/slides", function (error, response, body) {
            var slides = JSON.parse(body);
            expect(slides.length >= 3).toBe(true);
            done();
         });
      });
   });

   describe("GET / css resources", function () {
      it("returns status code 500", function (done) {
         request.get(base_url + "src/test/server/broken/broken.css", function (error, response, body) {
            expect(response.statusCode).toBe(500);
            done();
         });
      });
      it("returns status code 200", function (done) {
         request.get(base_url + "src/test/server/broken/fixed.css", function (error, response, body) {
            expect(response.statusCode).toBe(200);
            expect(response.headers["content-type"]).toBe("text/css");
            done();
         });
      });
      it("returns status code 200", function (done) {
         request.get(base_url + "src/test/server/broken/fixed_1.css", function (error, response, body) {
            expect(response.statusCode).toBe(200);
            done();
         });
      });
      it("returns status code 404", function (done) {
         request.get(base_url + "src/test/server/broken/unknown.css", function (error, response, body) {
            expect(response.statusCode).toBe(404);
            done();
         });
      });
   });
   describe("GET / unknown resources", function () {
      it("returns status code 200", function (done) {
         request.get(base_url + "src/test/server/broken/unknown.res", function (error, response, body) {
            expect(response.statusCode).toBe(200);
            expect(response.headers["content-type"]).toBe("text/plain");
            done();
         });
      });
   });
   describe("GET / read error", function () {
      it("returns status code 500", function (done) {
         request.get(base_url + "spec", function (error, response, body) {
            expect(response.statusCode).toBe(500);
            expect(response.headers["content-type"]).toBe("text/html");
            done();
         });
      });
   });
   describe("GET / out of context", function () {
      it("returns status code 404", function (done) {
         request.get(base_url + "../../../../../etc/passwd", function (error, response, body) {
            expect(response.statusCode).toBe(404);
            expect(response.headers["content-type"]).toBe("text/plain");
            done();
         });
      });
   });
});

