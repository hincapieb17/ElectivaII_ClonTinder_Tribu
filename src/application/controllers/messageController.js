const chatService = require('../../domain/services/chatService');

const messageController = {
    
    saveMessage: async (req, res) => {
        try {
            const sender_id = req.params.id;
            const { receiver_id, content } = req.body;

            const message = await chatService.saveMessage(sender_id, receiver_id, content);
            res.status(201).json(message);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }

    },

    getMessages: async (req, res) => {
        try {
            const user1Id = req.params.sender_id;
            const user2Id = req.params.receiver_id;
            const chat = await chatService.getMessages(user1Id, user2Id);
            res.json(chat);
        } catch (error) {
            res.status(404).json({ message: error.message})
        }
    }     

};

module.exports = messageController;