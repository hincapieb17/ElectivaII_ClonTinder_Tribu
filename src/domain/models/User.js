const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  age: Number,
  gender: String,
  preferences: {
    genders: [String],
    min_age: Number,
    max_age: Number
  },
  location: String,
  profilePicture: String
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);