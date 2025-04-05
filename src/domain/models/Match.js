const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
  user1: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  user2: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  swipe: { type: String, enum: ['like', 'dislike'] }
}, { timestamps: true });

module.exports = mongoose.model('Match', MatchSchema);