const swipeService = require('../../domain/services/swipeService');

const swipeController = {
    getSwipe: async (req, res) => {
        try{
            const swipe = await swipeService.getAllSwipe();
            res.json(swipe);
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    },

    createSwipe: async (req, res) => {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return res.status(401).json({ message: "Usuario no autenticado" });
            }
    
            // Se obtiene el ID del usuario al que se le hace el swipe desde los parámetros
            const likedUserId = req.params.id;
            const { swipe } = req.body;
    
            const result = await userService.createSwipe(userId, likedUserId, swipe);
            res.status(201).json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
        
    getUserSwipes: async (req, res) => {
        try {
            const swipes = await userService.getUserSwipes(req.params.id);
            res.json(swipes);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    getUsersWithLikeSwipe: async (req, res) => {
        try {
            const likedUsers = userService.getUsersWithLikeSwipe();
            res.json(likedUsers);
        }catch (error) {
            res.status(404).json({ message: error.message})
        }
            
    }
}

module.exports = swipeController;