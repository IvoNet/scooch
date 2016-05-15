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
var gulp = require('gulp');
var gnf = require('gulp-npm-files');
var clean = require('gulp-clean');

gulp.task('copyNpmDependenciesOnly', function () {
   gulp.src(gnf(), {base: './'}).pipe(gulp.dest('./dist'));
});

gulp.task('removeNodeModules', function () {
    return gulp.src('node_modules', {base: './', read: false})
        .pipe(clean());
});

var filesToMove = [
        './dist/node_modules/**/*.*'
    ];

gulp.task('move',['removeNodeModules'], function(){
  gulp.src(filesToMove, { base: './' })
  .pipe(gulp.dest('node_modules'));
});


gulp.task('default', ['copyNpmDependenciesOnly']);
