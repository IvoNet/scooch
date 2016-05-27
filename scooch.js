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
var http = require("http"),
     url = require("url"),
     path = require("path"),
     fs = require("fs"),
     walk = require('fs-walk'),
     sass = require('node-sass'),
     model = require('./model'),
     port = process.argv[2] || 3000;

var contentTypesByExtension = {
   '.html': "text/html",
   '.css': "text/css",
   '.js': "text/javascript",
   '.json': "application/json",
   '.svg': "image/svg+xml"
};


function endsWith(str, suffix) {
   return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function startsWith(str, postfix) {
   return str.indexOf(postfix, 0) === 0;
}

function sendContentNotFound(filename, response) {
   console.log(filename + " resource not found.");
   response.writeHead(404, {"Content-Type": "text/plain"});
   response.write("404 Not Found\n");
   response.end();
   return;
}

function sendInternalServerError(reason, response) {
   response.writeHead(500, {"Content-Type": contentTypesByExtension['.html']});
   response.write("<html><body><pre>" + reason + "</pre></body></html>", "binary");
   response.end();
   return;
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

      fs.stat(filename, function(err, stat) {
         if(stat.isDirectory()) {
            filename += '/index.html';
         }
         fs.readFile(filename, "binary", function (err, file) {
            if (err) {
               console.log("An error occured reading file " + filename);
               return sendInternalServerError("An error occured reading file " + filename, response);
            }

            var headers = {};
            var contentType = contentTypesByExtension[path.extname(filename)];
            if (contentType) {
               headers["Content-Type"] = contentType;
            }
            response.writeHead(200, headers);
            response.write(file, "binary");
            response.end();
         });
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
         response.writeHead(200, {"Content-Type": contentTypesByExtension['.css']});
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
function serveModelJs(response) {
   response.writeHead(200, {"Content-Type": contentTypesByExtension['.json']});
   response.write(model.buildModel(), "binary");
   response.end();
}

http.createServer(function (request, response) {

   var uri = url.parse(request.url).pathname,
        filename = path.join(process.cwd(), decodeURI(uri));

   if (!startsWith(path.normalize(filename), process.cwd())) {
      return sendContentNotFound(filename, response);
   }
   if (endsWith(filename, 'model.json')) {
      serveModelJs(response);
      return;
   }

   if (endsWith(filename, ".css")) {
      fs.exists(filename, function (exists) {
         if (!exists) {
            fs.exists(filename.replace(".css", ".scss"), function (exists) {
               if (exists) {
                  serveDynamicCss(filename, response);
               } else {
                  serveStatic(filename, response);
               }
            });
         } else {
            serveStatic(filename, response);
         }
      });
   } else {
      serveStatic(filename, response);
   }
}).listen(parseInt(port, 10));

console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");