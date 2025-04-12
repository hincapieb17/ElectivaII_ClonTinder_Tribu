const matchService = require('../../domain/services/matchService');

const matchController = {
  getAllMatches: async (req, res) => {
    try {
      const matches = await matchService.getAllMatches();
      res.json(matches);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getMatchById: async (req, res) => {
    try {
      const match = await matchService.getMatchById(req.params.id);
      res.json(match);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  createMatch: async (req, res) => {
    try {
      const nuevoMatch = await matchService.createMatch(req.body);
      res.status(201).json(nuevoMatch);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteMatch: async (req, res) => {
    try {
      await matchService.deleteMatch(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  getUserMatches: async (req, res) => {
    try {
      const matches = await matchService.getUserMatches(req.params.id);
      res.json(matches);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = matchController;
