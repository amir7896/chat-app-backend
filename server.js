const app = require('express')();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {origin : '*'}
});

const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.emit('myId', socket.id);

  socket.on('sendMessage', (message) => {
    const sockitID = socket.id;
    console.log(sockitID);
    io.emit('recieveMessage', message); //`${socket.id.substr(0, 2)} said--${message}`
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected!');
  });
});

httpServer.listen(port, () => console.log(`listening on port ${port}`));