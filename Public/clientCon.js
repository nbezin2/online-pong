/*var socket = io();
var el;
    
socket.on('time', function(timeString) {
    el = document.getElementById('server-time')
    el.innerHTML = 'Server time: ' + timeString;
});*/
    
    
var socket = io.connect(window.location.hostname);
socket.on('connStuff', connFun);

function connFun(data) {
    console.log(data);
    checkConn();
}
    
    
function checkConn() {
    socket.emit('connStuff', 1)
}
