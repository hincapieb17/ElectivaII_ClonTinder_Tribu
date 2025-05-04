const swipeService = require('../../domain/services/swipeService');

const swipeController = {
    getAllSwipe: async (req, res) => {
        try{
            const swipe = await swipeService.getAllSwipe();
            res.json(swipe);
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    },

    createSwipe: async (req, res) => {
        try {
            const userId = req.params.id;
            const { likedUserId, swipe } = req.body; 

            const result = await swipeService.createValidate(userId, likedUserId, swipe);
            res.status(201).json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
        
    getUserSwipes: async (req, res) => {
        try {
            const swipes = await swipeService.getUserSwipes(req.params.id);
            res.json(swipes);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    deleteSwipe: async (req, res) => {
        try {
            await swipeService.deleteSwipe(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = swipeController;