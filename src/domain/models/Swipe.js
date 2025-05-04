const mongoose = require('mongoose');

const SwipeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  likedUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  swipe: { type: Boolean, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Swipe', SwipeSchema);
