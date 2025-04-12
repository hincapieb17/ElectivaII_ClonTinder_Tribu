const Match = require('../models/Match');

const matchService = {
  getAllMatches: async () => {
    return await Match.find().populate('user1 user2');
  },

  getMatchById: async (id) => {
    const match = await Match.findById(id).populate('user1 user2');
    if (!match) throw new Error('Match no encontrado');
    return match;
  },

  createMatch: async (data) => {
    const nuevoMatch = new Match(data);
    return await nuevoMatch.save();
  },

  deleteMatch: async (id) => {
    const eliminado = await Match.findByIdAndDelete(id);
    if (!eliminado) throw new Error('Match no encontrado');
    return eliminado;
  },

  getUserMatches: async (userId) => {
    return await Match.find({
      $or: [{ user1: userId }, { user2: userId }]
    }).populate('user1 user2');
  }
};

module.exports = matchService;
