const PORT = process.env.PORT || 3000;
const INDEX = '/Public/index.html';

var express = require('express');
var socketIO = require('socket.io');

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log('Listening on ${PORT}'));

const io = socketIO(server);

io.on('connection', newConnection);


var sockID;
//Dictionary of all created rooms and the clients in it
var gameRoomDict = {};

function newConnection(socket) {
  
  
  
  
  
  //Connecting players
  socket.on('joinG', joinGame);
  socket.on('hostG', hostGame);
  
  //data should be in the form of: roomName
  function joinGame(data) {
    
    //Check if room exists
    if (data in gameRoomDict) {
      if (gameRoomDict.data.length < 2) {
        console.log("You have joined the lobby named: " + data);
        gameRoomDict.data = [gameRoomDict[data][0], socket.id];
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
      gameRoomDict[data] = [socket.id];    
    }
    
  }

  

}







/*var express = require('express');

var app = express();
var server = app.listen(process.env.PORT || 3000);

app.use(express.static('Public'));

var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {
  
  
  socket.on('connStuff', connStuff);
  function connStuff(data) {
    console.log(socket.id);
    socket.broadcast.emit('connStuff', socket.id);
  }
}*/
