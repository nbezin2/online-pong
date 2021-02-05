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
  var sock = socket.id;
  
  clients[socket.id] = "local";
  
  socket.on('disconnect', dCon);
  function dCon() {
    //Check if the client that left was in a game room
    console.log("Trying to disconnect: " + clients[socket.id][0]);
    if (!(clients[socket.id][0] == "local")) {
          console.log("Client is in an online Room");
          
          var room = clients[socket.id][0];
          console.log(gameRoomDict[room]);
          for (i=0; i < gameRoomDict[room].length; i++) {
            console.log(gameRoomDict[room][i]);
            console.log("vs " + socket.id);
            if (gameRoomDict[room][i] == socket.id) {
              console.log(gameRoomDict[room]);
              gameRoomDict.room = gameRoomDict[room].splice(i, 1);
              console.log(gameRoomDict[room]);
              break;
            }
          }
          //If game room is empty than remove the game room from the list
          if (gameRoomDict[clients[socket.id]].length < 1) {
            delete gameRoomDict[room];
          }
    }
    //remove client from the list
    delete clients[socket.id];
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
