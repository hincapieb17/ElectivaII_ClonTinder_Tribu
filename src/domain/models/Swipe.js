const mongoose = require('mongoose');

const SwipeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  likedUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  swipe: { type: String, enum: ['like', 'dislike'], required: true }
}, { timestamps: true });

module.exports = mongoose.model('Swipe', SwipeSchema);
