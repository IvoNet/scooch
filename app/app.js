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
   angular
        .module('scooch', [])
        .controller('mainController', MainController);

   MainController.$inject = [
      '$window',
      '$http',
      '$filter',
      '$q'
   ];

   function MainController($window, $http, $filter, $q) {
      var that = this;

      that.message = '';
      that.baseurl = $window.location.protocol + '//' + $window.location.hostname + ':' + $window.location.port;
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
         that.theme = that.model.themes[0].file;
         that.template = that.model.templates[0].file;
         that.transition = 'none';
         that.disableChalkboard = false;
         that.replayChalkboard = true;
      }

      that.downloadPresets = function () {
         var presets = {
            controls: that.controls,
            mouseWheel: that.mouseWheel,
            slideNumber: that.slideNumber,
            presenterNotes: that.presenterNotes,
            center: that.center,
            progress: that.progress,
            history: that.history,
            theme: $filter('filter')(that.model.themes, {file: that.model.theme}, true)[0].title ,
            template: $filter('filter')(that.model.templates, {file: that.model.template}, true)[0].title,
            transition: that.model.transition,
            disableChalkboard: that.disableChalkboard,
            replayChalkboard: that.replayChalkboard
         };

         var a = document.createElement('a');
         document.body.appendChild(a);
         try {
            a.download = "preset.json";
            var blob = new Blob([JSON.stringify(presets)], {type: "application/json"});
            a.href = window.URL.createObjectURL(blob);
         } catch (error) {
            a.innerHTML += " (" + error + ")";
         }
         a.click();
         document.body.removeChild(a);
         that.dlPreset = false;
      };

      that.model = {};
      $http.get('/api/model').success(function (data) {
         that.model = data;
         setDefaults();
      });

      that.goPreset = function (slide) {
         var myWindow = $window.open('', '_blank');
         that.onSelect(slide).then(function () {
            that.slide = slide;
            that.go(myWindow);
         });
      };

      that.go = function (newWindow) {
         that.message = "";
         if (that.slide === undefined) {
            that.message = "You must select a slide.";
            return;
         }
         if (newWindow === undefined) {
            newWindow = $window.open('', '_blank');
         }
         var url = that.baseurl;
         url += that.template;
         url += "?theme=" + that.theme;
         url += "&transition=" + that.transition;
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
         newWindow.location = url;
      };

      that.onSelect = function (slide) {
         setDefaults();
         var deferred = $q.defer();

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
                  that.transition = data.transition;
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
                     that.theme = theme;
                  }
               }
               if (data.template !== undefined) {
                  var template = $filter('filter')(that.model.templates, {title: data.template}, true)[0].file;
                  if (template !== undefined) {
                     that.template = template;
                  }
               }
               deferred.resolve();
            });

            return deferred.promise;
         }
      };
   }
})();