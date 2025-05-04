const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
  user1: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  user2: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  swipe: { type: Boolean, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Match', MatchSchema);