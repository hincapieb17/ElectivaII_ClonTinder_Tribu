const Usuario = require('../models/User');
const bcrypt = require('bcryptjs');

const userService = {
  getAllUsers: async () => await Usuario.find(),

  getUserById: async (id) => {
    const user = await Usuario.findById(id);
    if (!user) throw new Error('Usuario no encontrado');
    return user;
  },

  getUserByEmail: async (email) => {
    const user = await Usuario.findOne({ email });
    if (!user) throw new Error('Usuario no encontrado');
    return user;
  },

  createUser: async (userData) => {
    const existingUser = await Usuario.findOne({ email: userData.email });
    if (existingUser) throw new Error('Correo ya registrado');

    const hashedPassword = bcrypt.hashSync(userData.password, 10);
    const user = new Usuario({ ...userData, password: hashedPassword });
    return await user.save();
  },

  updateUser: async (id, data) => {
    if (data.password) {
      data.password = bcrypt.hashSync(data.password, 10);
    }
    const user = await Usuario.findByIdAndUpdate(id, data, { new: true });
    if (!user) throw new Error('Usuario no encontrado');
    return user;
  },

  deleteUser: async (id) => {
    const user = await Usuario.findByIdAndDelete(id);
    if (!user) throw new Error('Usuario no encontrado');
    return user;
  }
  
};

module.exports = userService;
