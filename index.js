const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  
  socket.on('chat message', (msg) => {
    io.emit('chat message',  msg);
  });

  socket.on('private message', (msg) => {
    console.log('private message: ' + msg);
  });    
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});

