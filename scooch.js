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
 */
var http  = require("http"),
    url   = require("url"),
    path  = require("path"),
    fs    = require("fs"),
    walk  = require('fs-walk'),
    sass  = require('node-sass'),
    model = require('./model'),
    port  = process.argv[2] || 3000;

function headerContentTypeByExtension(key) {
   var types = {
      '.html': "text/html",
      '.css': "text/css",
      '.js': "text/javascript",
      '.json': "application/json",
      '.svg': "image/svg+xml"
   };

   if (key in types) {
      return {"Content-Type": types[key]};
   }

   return {"Content-Type": "text/plain"};
}

function endsWith(str, suffix) {
   return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function startsWith(str, postfix) {
   return str.indexOf(postfix, 0) === 0;
}

function sendContentNotFound(filename, response) {
   console.log(filename + " resource not found.");
   response.writeHead(404, headerContentTypeByExtension(""));
   response.write("404 Not Found\n");
   response.end();
}

function sendInternalServerError(reason, response) {
   response.writeHead(500, headerContentTypeByExtension('.html'));
   response.write("<html><body><pre>" + reason + "</pre></body></html>", "binary");
   response.end();
}
/**
 * Serve all static content.
 *
 * @param {type} filename requested resource
 * @param {type} response write response to
 */
function serveStatic(filename, response) {
   fs.exists(filename, function (exists) {

      if (!exists) {
         return sendContentNotFound(filename, response);
      }

      function readStaticFile(filename, response) {
         fs.readFile(filename, "binary", function (err, file) {
            if (err) {
               console.log("An error occured reading file " + filename);
               return sendInternalServerError("An error occured reading file " + filename, response);
            }

            response.writeHead(200, headerContentTypeByExtension(path.extname(filename)));
            response.write(file, "binary");
            response.end();
         });
      }

      fs.stat(filename, function (err, stat) {
         readStaticFile(stat.isDirectory() ? filename + '/index.html' : filename, response);
      });
   });
}

/**
 * Serv dynamic css (.scss).
 *
 * @param {type} filename requested css file
 * @param {type} response write response to

 */
function serveDynamicCss(filename, response) {
   sass.render({
      file: filename.replace(".css", ".scss"),
      outputStyle: 'compressed',
      sourceMap: false
   }, function (error, result) {
      if (!error) {
         response.writeHead(200, headerContentTypeByExtension('.css'));
         response.write(result.css);
         response.end();
      } else {
         console.log(error.message);
         sendInternalServerError(error.formatted, response);
      }
   });

}
/**
 * Serve model.js dynamic content.
 *
 * @param {type} response write response to
 */
function serveModel(response) {
   response.writeHead(200, headerContentTypeByExtension('.json'));
   response.write(JSON.stringify(model.buildModel()), "binary");
   response.end();
}
function serveModelTransitions(response) {
   response.writeHead(200, headerContentTypeByExtension('.json'));
   response.write(JSON.stringify(model.transitions()), "binary");
   response.end();
}
function serveModelTemplates(response) {
   response.writeHead(200, headerContentTypeByExtension('.json'));
   response.write(JSON.stringify(model.templates()), "binary");
   response.end();
}
function serveModelThemes(response) {
   response.writeHead(200, headerContentTypeByExtension('.json'));
   response.write(JSON.stringify(model.themes()), "binary");
   response.end();
}
function serveModelSlides(response) {
   response.writeHead(200, headerContentTypeByExtension('.json'));
   response.write(JSON.stringify(model.slides()), "binary");
   response.end();
}

function serveCss(filename, response) {
   fs.exists(filename, function (exists) {
      if (exists) {
         serveStatic(filename, response);
      } else {
         fs.exists(filename.replace(".css", ".scss"), function (exists) {
            if (exists) {
               serveDynamicCss(filename, response);
            } else {
               sendContentNotFound(filename, response);
            }
         });
      }
   });
}

http.createServer(function (request, response) {

   var uri      = url.parse(request.url).pathname,
       filename = path.join(process.cwd(), decodeURI(uri));

   if (endsWith(filename, 'api/model')) {
      serveModel(response);
   } else if (endsWith(filename, 'api/model/transitions')) {
      serveModelTransitions(response);
   } else if (endsWith(filename, 'api/model/templates')) {
      serveModelTemplates(response);
   } else if (endsWith(filename, 'api/model/themes')) {
      serveModelThemes(response);
   } else if (endsWith(filename, 'api/model/slides')) {
      serveModelSlides(response);
   } else if (endsWith(filename, ".css")) {
      serveCss(filename, response);
   } else {
      if (!startsWith(path.normalize(filename), process.cwd())) {
         sendContentNotFound(filename, response);
      }
      serveStatic(filename, response);
   }
}).listen(parseInt(port, 10));

console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");