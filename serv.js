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
 * Server static content.
 * @type Module http|Module http
 */
var http             = require("http"),
    url              = require("url"),
    path             = require("path"),
    fs               = require("fs"),
    walk             = require('fs-walk'),
    model            = require('./model'),
    port             = process.argv[2] || 3000,
    defaultThemesDir = '/node_modules/reveal.js/css/theme/',
    templatesDir     = '/templates/';

function endsWith(str, suffix) {
   return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

http.createServer(function (request, response) {

   var uri         = url.parse(request.url).pathname
        , filename = path.join(process.cwd(), decodeURI(uri));

   var contentTypesByExtension = {
      '.html': "text/html",
      '.css': "text/css",
      '.js': "text/javascript",
      '.json': "application/json"
   };
   if (endsWith(filename, 'model.json')) {
      var headers = {};
      var contentType = contentTypesByExtension[path.extname(filename)];
       if (contentType)
       {
           headers["Content-Type"] = contentType;
       }
       response.writeHead(200, headers);
      response.write(model.buildModel(), "binary");
      response.end();
      return;
   }
   fs.exists(filename, function (exists) {
      if (!exists) {
         response.writeHead(404, {"Content-Type": "text/plain"});
         response.write("404 Not Found\n");
         response.end();
         return;
      }

       if (fs.statSync(filename).isDirectory())
       {
           filename += '/index.html';
       }

       fs.readFile(filename, "binary", function (err, file) {
         if (err) {
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(err + "\n");
            response.end();
            return;
         }

         var headers = {};
         var contentType = contentTypesByExtension[path.extname(filename)];
           if (contentType)
           {
               headers["Content-Type"] = contentType;
           }
         response.writeHead(200, headers);
         response.write(file, "binary");
         response.end();
      });
   });
}).listen(parseInt(port, 10));

console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");

