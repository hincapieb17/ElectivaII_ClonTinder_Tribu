const User = require('../models/User')

const userService = {
    
    getAllUsers: () => User.getAll(),

    getUserById: (id) => {
        const user = User.getById(id);
        if (!user) throw new Error('user not found');
        return user;
    },

    createUser: (userData) => {
        return User.create(userData);
    },

    updateUser: (id, userData) => {
        const user = User.updateUser(id, userData);
        if (!user) throw new Error('user not found');
        return user;
    },

    deleteUser: (id) => {
        const result = User.deleteUser(id);
        if (!result) throw new Error('User not found');
        return result;
    }


};

module.exports = userService;