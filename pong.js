const PORT = process.env.PORT || 3000;
const INDEX = '/Public/index.html';

var express = require('express');
var socketIO = require('socket.io');

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log('Listening on ${PORT}'));

const io = socketIO(server);

io.on('connection', newConnection);

var clients = {};
//Dictionary of all created rooms and the clients in it
var gameRoomDict = {};

function newConnection(socket) {
  var sock = socket.io;
  
  clients[socket.io] = "local";
  
  socket.on('disconnect', dCon);
  function dCon() {
    //Check if the client that left was in a game room
    if (!(clients[socket.io] == "local")) {
          for (i=0; i < gameRoomDict[clients[socket.io]].length; i++) {
            if (gameRoomDict[clients[socket.io]][i] == socket.io) {
              console.log(gameRoomDict[clients[socket.io]]);
              gameRoomDict[clients[socket.io]].splice(i, 1);
              console.log(gameRoomDict[clients[socket.io]]);
              break;
            }
          }
          //If game room is empty than remove the game room from the list
          if (gameRoomDict[clients[socket.io]].length < 1) {
            delete gameRoomDict[clients[socket.io]];
          }
    }
    //remove client from the list
    console.log("clients connected" + clients);
    delete clients[socket.io];
    console.log("clients connected" + clients);
  }
  
  
  
  //Connecting players
  socket.on('joinG', joinGame);
  socket.on('hostG', hostGame);
  
  //data should be in the form of: roomName
  function joinGame(data) {
    
    //Check if room exists
    if (data in gameRoomDict) {
      if (gameRoomDict[data].length < 2) {
        clients.sock = data;
        console.log("You have joined the lobby named: " + data);
        gameRoomDict.data = gameRoomDict[data].push(socket.id);
        io.to(socket.id).emit('connected', data);
        console.log(gameRoomDict[data]);
      }
      else {
        console.log("Sorry this room is full");
      }
    }
    else {
      console.log(data + " does not exist in the list of current lobbies.");
    }
  }
  
  //data should be in the form of: roomName
  function hostGame(data) {
    
    if (data in gameRoomDict) {
      console.log(data + " is already a game room.");   
    }
    else {
      clients.sock = data;
      gameRoomDict[data] = [socket.id];  
      io.to(socket.id).emit('connected', data);
    }
    
  }

  

}
