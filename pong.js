var express = require('express');

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
}
