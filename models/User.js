const users = require('../config/database');

class User {

    static getAll() {
        return users;
    }
    
    static getById(id) {
        return users.find(user => user.id === parseInt(id));
    }

    static create(newUser) {
        const user = {id: users.length + 1, ...newUser};
        users.push(user)
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

    
}



module.exports = User;