const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

var express = require('express');
var socketIO = require('socket.io');

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log('Listening on ${PORT}'));

const io = socketIO(server);

io.on('connection', newConnection);

function newConnection(socket) {
  socketIO.on('connStuff', connStuff);
  function connStuff(data) {
    console.log(socket.id);
    io.broadcast.emit('connStuff', socket.id);
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
