const mongoose = require('mongoose');

const MenssageSchema = new mongoose.Schema({
  sender_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  receiver_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  contenido: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Mensaje', MensajeSchema);
