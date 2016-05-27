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

/**
 * Serve all static content.
 *
 * @param {type} filename requested resource
 * @param {type} response write response to
 */
function serveStatic(filename, response) {
   fs.exists(filename, function (exists) {
      if (!exists) {
         console.log(filename + " resource not found.")
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
            console.log("An error occured reading file " + filename);
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
      var headers = {};
      if (!error) {
         headers["Content-Type"] = contentTypesByExtension['.css'];
         response.writeHead(200, headers);
         response.write(result.css);
         response.end();
      } else {
         console.log(error.message);
         headers["Content-Type"] = contentTypesByExtension['.html'];
         response.writeHead(500, headers);
         response.write("<html><body><pre>" + error.formatted + "</pre></body></html>", "binary");
         response.end();
      }
   });

}
/**
 * Serve model.js dynamic content.
 *
 * @param {type} response write response to
 */
function serveModelJs(response) {
   var headers = {};
   headers["Content-Type"] = contentTypesByExtension['.json'];
   response.writeHead(200, headers);
   response.write(model.buildModel(), "binary");
   response.end();
}

http.createServer(function (request, response) {

   var uri = url.parse(request.url).pathname,
        filename = path.join(__dirname, decodeURI(uri));

   if (!startsWith(path.normalize(filename), process.cwd())) {
         response.writeHead(404, {"Content-Type": "text/plain"});
         response.write("404 Not Found\n");
         response.end();
         return;
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