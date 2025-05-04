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

    getUserByEmail: async (req, res) => {
        try {
            const user = await userService.getUserByEmail(req.params.email);
            res.json(user);
        } catch (error) {
            res.status(404).json({ message: error.message });
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
    }

}

module.exports = userController;