const socketIo = require('socket.io');

function setupSocket(server) {
  const io = socketIo(server);
  return io;
}

module.exports = setupSocket;
