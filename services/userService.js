const User = require('../models/User');
const bcrypt = require('bcryptjs');

const userService = {
    
    getAllUsers: () => User.getAll(),

    getUserById: (id) => {
        const user = User.getById(id);
        if (!user) throw new Error('user not found');
        return user;
    },

    getUserByEmail: (email) => {
        const user = User.getByEmail(email);
        if (!user) throw new Error('user not found');
        return user;
    },

    createUser: (userData) => {
        const existingUser = User.getByEmail(userData.email);
        if (existingUser) {
            throw new Error('Email already registered');
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