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

app.post('/session', (request, response) => {
   response.send({ serverLocation: "http://localhost:4001"})
});

app.listen(3000, () => {
  console.log('app server listening on 3000');
});

var appSocket = express();

var httpSocket = (http as any).Server(appSocket);

var ioSocket = io(httpSocket);

ioSocket.on('connection', (socket) => {
   var findClientsSocket = function(roomId, namespace) {
    var res = []
    , ns = ioSocket.of(namespace ||"/");    // the default namespace is "/"

    if (ns) {
        for (var id in ns.connected) {
            if(roomId) {
                var index = ns.connected[id].rooms.indexOf(roomId) ;
                if(index !== -1) {
                    res.push(ns.connected[id]);
                }
            } else {
                res.push(ns.connected[id]);
            }
        }
    }
    return res;
}

   var sockets = findClientsSocket();
   for(var i = 0; i < sockets.length; i++) {
      if (sockets[i].position) {
      console.log("sending everyone online", { id: sockets[i].id, position: sockets[i].position });
      socket.emit("update-position", { id: sockets[i].id, position: sockets[i].position });
   }
   }

  //when a player sends a position update
  socket.on('update-position', (position) => {
     console.log(position);
     socket.position = position;
     //broadcast that position to everyone else
    ioSocket.emit('update-position', {
         id: socket.id,
         position: position
      });
  });

  //notify all users of a newly connected user
  ioSocket.emit('chat message', "connected");

  //notify the user when a user disconnects
  socket.on("disconnect", () => {
     ioSocket.emit("player-disconnect", { id: socket.id });
 });
});

httpSocket.listen(4001, () => {
  console.log("http socket listening on 4001");
});
