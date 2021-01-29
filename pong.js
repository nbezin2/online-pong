const PORT = process.env.PORT || 3000;
const INDEX = '/Public/index.html';

var express = require('express');
var socketIO = require('socket.io');

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log('Listening on ${PORT}'));

const io = socketIO(server);

io.on('connection', newConnection);


//Hash set of all connected clients
var clientDict = {};
var numClients = 0;
//Hash set of all created rooms
var gameRoomDict = {};

function newConnection(socket) {
  numClients++;
  clientDict[socket.id] = numClients;
  console.log(clientDict);
  
  
  
  
  socket.on('joinG', joinGame);
  socket.on('hostG', hostGame);

  function joinGame(data) {
    console.log(data);
  }

  function hostGame(data) {
    console.log(data);
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
