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

var http = require('http');
var express = require('express');
var basicAuth = require('basic-auth');
var fs = require('fs');
var io = require('socket.io');
var crypto = require('crypto');
var model = require('./model');

var app = express();
var staticDir = express.static;
var server = http.createServer(app);

var masterUser = 'ivonet';
var masterPass = 'secret';

io = io(server);

var opts = {
   port: process.env.PORT || 3000,
   baseDir: __dirname + "/"
};

io.on('connection', function (socket) {
   socket.on('multiplex-statechanged', function (data) {
      if (typeof data.secret == 'undefined' || data.secret == null || data.secret === '') {
         return;
      }
      if (createHash(data.secret) === data.socketId) {
         data.secret = null;
         socket.broadcast.emit(data.socketId, data);
      }
   });
});

[
   'app',
   'slides',
   'img',
   'templates',
   'themes',
   'node_modules'
].forEach(function (dir) {
   app.use('/' + dir, staticDir(opts.baseDir + dir));
});

app.get("/", function (req, res) {
   res.writeHead(200, {'Content-Type': 'text/html'});

   var stream = fs.createReadStream(opts.baseDir + '/index.html');
   stream.on('error', function (error) {
      res.write('<style>body{font-family: sans-serif;}</style><h2>reveal.js multiplex server.</h2><a href="/token">Generate token</a>');
      res.end();
   });
   stream.on('readable', function () {
      stream.pipe(res);
   });
});

app.get("/model.json", function (req, res) {
   var headers = {};
   headers["Content-Type"] = "application/json";
   res.writeHead(200, headers);
   res.write(model.buildModel(), "binary");
   res.end();
});

var auth = function (req, res, next) {
   function unauthorized(res) {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      return res.sendStatus(401);
   }

   var user = basicAuth(req);

   if (!user || !user.name || !user.pass) {
      return unauthorized(res);
   }

   if (user.name === masterUser && user.pass === masterPass) {
      return next();
   } else {
      return unauthorized(res);
   }
};

app.get("/master", auth, function (req, res) {
   console.log("yup Master was here");
   res.sendFile(opts.baseDir + "master/ivonet-master.html");
});

app.get("/token", function (req, res) {
   var ts = new Date().getTime();
   var rand = Math.floor(Math.random() * 9999999);
   var secret = ts.toString() + rand.toString();
   res.send({secret: secret, socketId: createHash(secret)});
});

var createHash = function (secret) {
   var cipher = crypto.createCipher('blowfish', secret);
   return (cipher.final('hex'));
};

// Actually listen
server.listen(opts.port || null);

var brown = '\033[33m',
    green = '\033[32m',
    reset = '\033[0m';

console.log(brown + "Scooch:" + reset + " running on port " + green + opts.port + reset);