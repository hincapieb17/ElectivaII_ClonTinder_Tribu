//const userService = require('../services/userService');
const userService = require('../../domain/services/userService');


const userController = { 
    getUsers: async (req, res) => {
        try{
            const users = await userService.getAllUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    },

    getUserById: async (req, res) => {
        try {
            const user = await userService.getUserById(req.params.id);
            res.json(user);
        }catch (error) {
            res.status(404).json({ message: error.message})
        }
    },

    createUser: async (req, res) => {
        try {
            const newUser = await userService.createUser(req.body);
            res.status(201).json(newUser);
        } catch (error) {
            if (error.message === 'Email already registered') {
                return res.status(400).json({ message: error.message });
            }
            res.status(400).json({ message: 'Error creating user' });
        }

    },

    updateUser: async (req, res) => {
        try{
            const updateUser = await userService.updateUser(req.params.id, req.body);
            res.json(updateUser)
        } catch (error) {
            res.status(404).json( {message: error.message} );
        }
    },

    deleteUser: async (req, res) => {
        try {
            await userService.deleteUser(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },

    getUsersWithLikeSwipe: async (req, res) => {
        try {
            const likedUsers = await userService.getUsersWithLikeSwipe();
        res.json(likedUsers);
        }catch (error) {
            res.status(404).json({ message: error.message})
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
    }

}

module.exports = userController;