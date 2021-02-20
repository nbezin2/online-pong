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
  var room = "local";
  console.log("Socket id: " + sock);
  console.log("VS: " + socket.id);
  clients[socket.id] = "local";
  
  //Client leaves the site
  socket.on('disconnect', dCon);
  function dCon() {
    //Check if the client that left was in a game room
    console.log("Trying to disconnect: " + clients[socket.id]);
    if (!(room == "local")) {
          console.log("Client is in an online Room");
          
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
          if (gameRoomDict[room].length < 1) {
            delete gameRoomDict[room];
          }
    }
    //remove client from the list
    console.log(clients);
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
        io.to(gameRoomDict[data][0]).emit('p2Joined');
        room = data;
        clients.sock = data;
        console.log("You have joined the lobby named: " + data);
        gameRoomDict.data = gameRoomDict[data].push(socket.id);
        var stuff = [data, "join"]
        io.to(socket.id).emit('connectedG', stuff);
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
      room = data;
      clients.sock = data;
      gameRoomDict[data] = [socket.id]; 
      var stuff = [data, "host"]
      io.to(socket.id).emit('connectedH', stuff);
    }
  }
  
  //Updating game visuals stuff
  socket.on('updatePaddle', updatePaddle);
  function updatePaddle(data) {
    for (var i=0; i < gameRoomDict[room].length; i++) {
      if (sock != gameRoomDict[room][i]) {
        io.to(gameRoomDict[room][i]).emit('updatePaddle', data);
      }
    }
  }
  
  socket.on('updateBall', updateBall);
  function updateBall(data) { //data in the form: ballx, bally
    for (var i=0; i < gameRoomDict[room].length; i++) {
      if (sock != gameRoomDict[room][i]) {
        io.to(gameRoomDict[room][i]).emit('updateBall', data);
      }
    }
  }

  socket.on('updateP1', updateP1);
  function updateP1(data) {
    for (var i=0; i < gameRoomDict[room].length; i++) {
      if (sock != gameRoomDict[room][i]) {
        io.to(gameRoomDict[room][i]).emit('updateP1', data);
      }
    }
  }
  
  socket.on('updateP2', updateP2);
  function updateP2(data) {
    for (var i=0; i < gameRoomDict[room].length; i++) {
      if (sock != gameRoomDict[room][i]) {
        io.to(gameRoomDict[room][i]).emit('updateP2', data);
      }
    }
  }
  
  socket.on('reset', reset);
  function reset() {
    for (var i=0; i < gameRoomDict[room].length; i++) {
      io.to(gameRoomDict[room][i]).emit('reset');
    }
  }
  
  socket.on('updateScore', score);
  function updateScore() {
    for (var i=0; i < gameRoomDict[room].length; i++) {
      io.to(gameRoomDict[room][i]).emit('updateScore', score);
    }
  }
  
}
