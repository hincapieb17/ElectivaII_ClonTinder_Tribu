const { Server } = require('socket.io');
const chatService = require('../../domain/services/chatService');

function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    console.log('Usuario conectado:', socket.id);

    socket.on('join', (userId) => {
      socket.join(userId); 
    });

    socket.on('send_message', async (data) => {
      const { sender_id, receiver_id, content } = data;
      const savedMessage = await chatService.saveMessage(sender_id, receiver_id, content);
      io.to(receiver_id).emit('receive_message', savedMessage);
    });

    socket.on('disconnect', () => {
      console.log('Usuario desconectado:', socket.id);
    });
  });
}

module.exports = initSocket;
