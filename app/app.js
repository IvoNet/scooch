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
      '$http'
   ];

   function IvoNetPresentationsController($window, $http) {
      var that = this;
      that.message = '';
      that.baseurl =
           $window.location.protocol + '//' + $window.location.hostname + ':' + $window.location.port;
      that.presenterNotes = false;
      that.center = false;
      that.mouseWheel = false;
      that.controls = true;
      that.slideNumber = false;
      that.print = false;
      that.slide = undefined;

      that.model = {};
      $http.get('/model.json').success(function (data) {
         that.model = data;
      });

      that.go = function () {
         if (that.slide == undefined) {
            that.message="You must select a slide.";
            return;
         }
         var url = that.baseurl;
         url += that.model.template;
         url += "?showNotes=" + that.presenterNotes;
         url += "&theme=" + that.model.theme;
         url += "&center=" + that.center;
         if (that.mouseWheel) {
             url += "&mouseWheel=true"; // false is default
         }
         if (that.slideNumber) {
             url += "&slideNumber=true"; // false is default
         }
         if (!that.controls) {
             url += "&controls=false"; // true is default
         }
         url += "&transition=" + that.model.transition;
         url += '&title=' + that.slide.title;
         if (that.print) {
            url += "&print-pdf=true";
         }
         url += "&slideshow=" + that.slide.file;
         $window.open(url, '_blank');
      };
   }
})();