/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/express/express.d.ts" />
/// <reference path="../typings/socket.io/socket.io.d.ts" />

import * as express from 'express';
import * as http from 'http';
import * as io from 'socket.io';
import * as path from 'path';

var app = express();

/*app.get('/', function (req, res) {
  res.send({
    server: '127.0.0.1:4001'
  });
});*/

app.get('/', function(req, res){
  res.sendFile(path.resolve(__dirname, '../index.html'));
});

app.listen(3000, () => {
  console.log('app server listening on 3000');
});

var appSocket = express();

var httpSocket = (http as any).Server(appSocket);

var ioSocket = io(httpSocket);

ioSocket.on('connection', function(socket){
  console.log('a user connected');
});

httpSocket.listen(4001, () => {
  console.log("http socket listening on 4001");
});
