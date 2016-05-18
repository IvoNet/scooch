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

(function () {
   angular.module('ivonet-presentations-app', ['ivoMarkdown']).config(function (ivoMarkdownConfigProvider) {
      ivoMarkdownConfigProvider.config({
         tables: true,
         parseImgDimensions: true,
         simplifiedAutoLink: true,
         tasklists: true,
         smoothLivePreview: true,
         strikethrough: true
      });
      ivoMarkdownConfigProvider.hljsOptions({classPrefix: 'ivonet-', tabreplace: '    '});

   }).controller('IvoNetPresentationsController', IvoNetPresentationsController);

   IvoNetPresentationsController.$inject = [
      '$window',
      '$http',
      '$filter'
   ];

   function IvoNetPresentationsController($window, $http, $filter) {
      var that = this;
      that.message = '';
      that.baseurl =
           $window.location.protocol + '//' + $window.location.hostname + ':' + $window.location.port;
      that.slide = undefined;

      function setDefaults() {
         that.presenterNotes = false;
         that.center = false;
         that.mouseWheel = false;
         that.controls = true;
         that.slideNumber = false;
         that.print = false;
         that.progress = true;
         that.history = true;
         that.model.theme = that.model.themes[0].file;
         that.model.template = that.model.templates[0].file;
         that.model.transition = 'none';
         that.disableChalkboard = false;
         that.replayChalkboard = true;
      }

      that.model = {};
      $http.get('/model.json').success(function (data) {
         that.model = data;
         setDefaults();
      });

      that.go = function () {
         if (that.slide === undefined) {
            that.message = "You must select a slide.";
            return;
         }
         var url = that.baseurl;
         url += that.model.template;
         url += "?theme=" + that.model.theme;
         url += "&transition=" + that.model.transition;
         if (that.presenterNotes) {
            url += "&showNotes=true"; //false is default
         }
         if (that.center) {
            url += "&center=true"; //false is default
         }
         if (that.mouseWheel) {
            url += "&mouseWheel=true"; // false is default
         }
         if (that.slideNumber) {
            url += "&slideNumber=true"; // false is default
         }
         if (!that.controls) {
            url += "&controls=false"; // true is default
         }
         if (!that.history) {
            url += "&history=false"; // true is default
         }
         if (!that.progress) {
            url += "&progress=false"; // true is default
         }
         if (that.slide.chalkboard !== undefined && that.replayChalkboard) {
            url += "&chalk=" + that.slide.chalkboard;
         }
         if (that.disableChalkboard) {
            url += "&disableChalkboard=true"; //false is default
         }
         url += '&title=' + that.slide.title;
         if (that.print) {
            url += "&print-pdf=true";
         }
         url += "&slideshow=" + that.slide.file;
         $window.open(url, '_blank');
      };

      that.onSelect = function (slide) {
         setDefaults();
         // retrieve preset if available
         if (slide.preset !== undefined) {
            $http.get(slide.preset).success(function (data) {

               if (data.controls !== undefined) {
                  that.controls = data.controls;
               }
               if (data.mouseWheel !== undefined) {
                  that.mouseWheel = data.mouseWheel;
               }
               if (data.slideNumber !== undefined) {
                  that.slideNumber = data.slideNumber;
               }
               if (data.transition !== undefined) {
                  that.model.transition = data.transition;
               }
               if (data.presenterNotes !== undefined) {
                  that.presenterNotes = data.presenterNotes;
               }
               if (data.center !== undefined) {
                  that.center = data.center;
               }
               if (data.progress !== undefined) {
                  that.progress = data.progress;
               }
               if (data.history !== undefined) {
                  that.history = data.history;
               }
               if (data.disableChalkboard !== undefined) {
                  that.disableChalkboard = data.disableChalkboard;
               }
               if (data.replayChalkboard !== undefined) {
                  that.replayChalkboard = data.replayChalkboard;
               }
               if (data.theme !== undefined) {
                  var theme = $filter('filter')(that.model.themes, {title: data.theme}, true)[0].file;
                  if (theme !== undefined) {
                     that.model.theme = theme;
                  }
               }
               if (data.template !== undefined) {
                  var template = $filter('filter')(that.model.templates, {title: data.template}, true)[0].file;
                  if (template !== undefined) {
                     that.model.template = template;
                  }
               }

            });
         } 
      };
   }
})();