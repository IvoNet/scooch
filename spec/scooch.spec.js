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

var request = require("request"),
   fs = require("fs-extra"),
   scooch = require("../scooch");

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

   describe("GET /model.json", function () {
      it("returns status code 200", function (done) {
         request.get(base_url, function (error, response, body) {
            expect(response.statusCode).toBe(200);
            done();
         });
      });
      it("returns status code 200", function (done) {
         request.get(base_url + "model.json", function (error, response, body) {
            expect(response.statusCode).toBe(200);
            done();
         });
      });
      it("returns model.json with defaults", function (done) {
         request.get(base_url + "model.json", function (error, response, body) {
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
   describe("GET / css resources", function () {
      it("returns status code 500", function (done) {
         request.get(base_url + "spec/broken/broken.css", function (error, response, body) {
            expect(response.statusCode).toBe(500);
            done();
         });
      });
      it("returns status code 200", function (done) {
         request.get(base_url + "spec/broken/fixed.css", function (error, response, body) {
            expect(response.statusCode).toBe(200);
            expect(response.headers["content-type"]).toBe("text/css");
            done();
         });
      });
      it("returns status code 200", function (done) {
         request.get(base_url + "spec/broken/fixed_1.css", function (error, response, body) {
            expect(response.statusCode).toBe(200);
            done();
         });
      });
      it("returns status code 404", function (done) {
         request.get(base_url + "spec/broken/unknown.css", function (error, response, body) {
            expect(response.statusCode).toBe(404);
            done();
         });
      });
   });
   describe("GET / unknown resources", function () {
      it("returns status code 200", function (done) {
         request.get(base_url + "spec/broken/unknown.res", function (error, response, body) {
            expect(response.statusCode).toBe(200);
            expect(response.headers["content-type"]).toBeUndefined();
            done();
         });
      });
   });
});

