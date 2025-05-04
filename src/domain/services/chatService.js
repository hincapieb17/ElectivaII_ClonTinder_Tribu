const Message = require('../models/Message');

const chatService = {

  saveMessage:  async (sender_id, receiver_id, content) => {
    const newMessage = new Message({ sender_id, receiver_id, content });
    return await newMessage.save();
  },
  
  getMessages: async (user1, user2) => {
    return await Message.find({
      $or: [
        { sender_id: user1, receiver_id: user2 },
        { sender_id: user2, receiver_id: user1 }
      ]
    }).sort('timestamp');
  }

};

module.exports = chatService;