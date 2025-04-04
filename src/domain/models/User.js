const {users, swipes, matches  } = require('../../infrastructure/config/database');

//const {users, swipes, matches  } = require('../config/database');

class User {

    static getAll() {
        return users;
    }
    
    static getById(id) {
        return users.find(user => user.id === parseInt(id));
    }

    static getByEmail(email) {
        return users.find(user => user.email === email);
    }    

    static create(newUser) {
        const lastUser = users[users.length - 1]; 
        const newId = lastUser ? lastUser.id + 1 : 1;  
        const user = { id: newId, ...newUser };
        users.push(user);
        return user;
    }

    static updateUser (id, updateData) {
        const index = users.findIndex(user => user.id === parseInt(id));
        if (index === -1) return null;
        users[index] = { ...users[index], ...updateData };
        return users[index];
    }

    static deleteUser (id) {
        const index = users.findIndex(user => user.id === parseInt(id));
        if (index === -1) return null;
        return users.splice(index, 1)[0];
    }

    static getMatchesBySwipe(swipeType) {
        return matches.filter(match => match.swipe === swipeType);
    }

    static createSwipe(userId, likedUserId, swipe) {
        const newSwipe = { userId, likedUserId, swipe };
        swipes.push(newSwipe);
        return newSwipe;
    }

    static getUserSwipes(userId) {
        return swipes.filter(swipe => swipe.userId === parseInt(userId));
    }

    
}

module.exports = User;