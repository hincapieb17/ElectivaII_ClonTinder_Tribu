const User = require('../models/User');
const bcrypt = require('bcryptjs');

const userService = {
    
    getAllUsers: () => User.getAll(),

    getUserById: (id) => {
        const user = User.getById(id);
        if (!user) throw new Error('Usuario no encontrado');
        return user;
    },

    getUserByEmail: (email) => {
        const user = User.getByEmail(email);
        if (!user) throw new Error('Usuario no encontrado');
        return user;
    },

    createUser: (userData) => {
        const existingUser = User.getByEmail(userData.email);
        if (existingUser) {
            throw new Error('Correo ya registrado');
        }
        const hashedPassword = bcrypt.hashSync(userData.password, 10);
        const newUser = { ...userData, password: hashedPassword };
        return User.create(newUser);
    },

    updateUser: (id, userData) => {
        if (userData.password) {
            userData.password = bcrypt.hashSync(userData.password, 10);
        }
        const user = User.updateUser(id, userData);
        if (!user) throw new Error('Usuario no encontrado');
        return user;
    },

    deleteUser: (id) => {
        const result = User.deleteUser(id);
        if (!result) throw new Error('Usuario no encontrado');
        return result;
    },

    getUsersWithLikeSwipe: () => {
        const likedUsers = User.getMatchesBySwipe("like");
        if (!likedUsers.length) throw new Error("No se encontraron usuarios con me gusta");
        return likedUsers;
    }


};

module.exports = userService;