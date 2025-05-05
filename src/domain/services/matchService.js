const Match = require('../models/Match');

const matchService = {
  getAllMatches: async () => {
    return await Match.find().populate('user1 user2');
  },

  createMatch: async (data) => {
    const { user1, user2 } = data;

    const matchExistente = await Match.findOne({ user1, user2 });

    if (matchExistente) {
      throw new Error('Ya existe un match entre estos dos usuarios');
    }

    const nuevoMatch = new Match(data);
    return await nuevoMatch.save();
  },

  deleteMatch: async (id) => {
    const eliminado = await Match.findByIdAndDelete(id);
    if (!eliminado) throw new Error('Match no encontrado');
    return eliminado;
  },

  getUserMatches2: async (userId) => {
    return await Match.find({
      $or: [{ user1: userId }, { user2: userId }]
    }).populate('user1 user2');
  },

  getUserMatches: async (userId) => {
    const matches = await Match.find({
      $or: [{ user1: userId }, { user2: userId }]
    }).populate('user1 user2');
  
    const result = matches.map(match => {
      const matchObj = match.toObject();
  
      if (matchObj.user1._id.toString() === userId) {
        matchObj.user = matchObj.user2;
      } else {
        matchObj.user = matchObj.user1;
      }
  
      delete matchObj.user1;
      delete matchObj.user2;
  
      return matchObj;
    });
  
    return result;
  }
  

};

module.exports = matchService;
