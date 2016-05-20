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

'use strict';

describe('mainController', function () {
   var ctrl, $scope, $http, $q, $window = {
      location: {
         protocol: 'http:',
         hostname: 'foo',
         port: 81
      },
      open: function() {}
   }, model = {
      themes: [{title: 'foo', file: '/foo'}],
      templates: [{title: 'bar', file: '/bar'}]
   };

   beforeEach(module('scooch'));

   beforeEach(module(function ($provide) {
      $provide.value('$window', $window);
   }));

   beforeEach(inject(function ($controller, _$rootScope_, _$httpBackend_, _$q_) {
      ctrl = $controller('mainController');
      $scope = _$rootScope_;
      $http = _$httpBackend_;
      $q = _$q_;

      $http.expectGET('/model.json').respond(200, model);
   }));

   it('should have a correct initial state', function () {
      expect(ctrl.message).toBe('');
      expect(ctrl.baseurl).toBe('http://foo:81');
      expect(ctrl.slide).toBeUndefined();
      expect(ctrl.model).toEqual({});
   });

   it('should load model.json and sets defaults', function () {
      $http.flush();
      $scope.$digest();

      expect(ctrl.model).toEqual(model);

      expect(ctrl.presenterNotes).toBe(false);
      expect(ctrl.center).toBe(false);
      expect(ctrl.mouseWheel).toBe(false);
      expect(ctrl.controls).toBe(true);
      expect(ctrl.slideNumber).toBe(false);
      expect(ctrl.print).toBe(false);
      expect(ctrl.progress).toBe(true);
      expect(ctrl.history).toBe(true);
      expect(ctrl.theme).toBe('/foo');
      expect(ctrl.template).toBe('/bar');
      expect(ctrl.transition).toBe('none');
      expect(ctrl.disableChalkboard).toBe(false);
      expect(ctrl.replayChalkboard).toBe(true);
   });

   it('go should open window with correct url', function () {
      $http.flush();
      $scope.$digest();

      var myWindow = {};
      spyOn($window, 'open').and.returnValue(myWindow);

      ctrl.go();

      expect(ctrl.message).toBe('You must select a slide.');
      expect(myWindow.location).toBeUndefined();

      ctrl.slide = {
         title: 'mySlide',
         file: '/mySlide.json'
      };
      ctrl.go();

      expect(ctrl.message).toBe('');
      expect(myWindow.location).toBe('http://foo:81/bar?theme=/foo&transition=none' +
           '&title=mySlide' +
           '&slideshow=/mySlide.json');

      ctrl.presenterNotes = true;
      ctrl.center = true;
      ctrl.mouseWheel = true;
      ctrl.slideNumber = true;
      ctrl.controls = false;
      ctrl.history = false;
      ctrl.progress = false;
      ctrl.disableChalkboard = true;
      ctrl.print = true;

      ctrl.go();

      expect(ctrl.message).toBe('');
      expect(myWindow.location).toBe('http://foo:81/bar?theme=/foo&transition=none' +
           '&showNotes=true' +
           '&center=true' +
           '&mouseWheel=true' +
           '&slideNumber=true' +
           '&controls=false' +
           '&history=false' +
           '&progress=false' +
           '&disableChalkboard=true' +
           '&title=mySlide' +
           '&print-pdf=true' +
           '&slideshow=/mySlide.json');
   });

   it('when selecting a slide, the preset should load', function () {
      $http.flush();
      $scope.$digest();

      ctrl.onSelect({
         preset: '/somePreset'
      });

      $http.expectGET('/somePreset').respond(200, {
         controls: false,
         mouseWheel: true,
         slideNumber: true,
         transition: 'some',
         presenterNotes: true,
         center: true,
         progress: false,
         history: false,
         disableChalkboard: true,
         replayChalkboard: false,
         theme: "foo",
         template: "bar",
         print: true
      });

      $http.flush();

      expect(ctrl.presenterNotes).toBe(true);
      expect(ctrl.center).toBe(true);
      expect(ctrl.mouseWheel).toBe(true);
      expect(ctrl.controls).toBe(false);
      expect(ctrl.slideNumber).toBe(true);
      expect(ctrl.print).toBe(false);
      expect(ctrl.progress).toBe(false);
      expect(ctrl.history).toBe(false);
      expect(ctrl.theme).toBe('/foo');
      expect(ctrl.template).toBe('/bar');
      expect(ctrl.transition).toBe('some');
      expect(ctrl.disableChalkboard).toBe(true);
      expect(ctrl.replayChalkboard).toBe(false);
   });

   it('selecting a preset should load preset and go', function () {
      // not black box, but will be okay for now...
      var onSelectDeferred = $q.defer();
      var myWindow = {};

      spyOn(ctrl, 'onSelect').and.returnValue(onSelectDeferred.promise);
      spyOn(ctrl, 'go');
      spyOn($window, 'open').and.returnValue(myWindow);

      onSelectDeferred.resolve();
      $http.flush();
      $scope.$digest();

      var mySlide = {'some': 'slide'};
      ctrl.goPreset(mySlide);

      $scope.$digest();

      expect(ctrl.onSelect).toHaveBeenCalledWith(mySlide);
      expect(ctrl.go).toHaveBeenCalledWith(myWindow);
   });
});