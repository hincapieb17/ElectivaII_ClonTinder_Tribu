const mongoose = require('mongoose');

const MONGO_URI = "mongodb+srv://thebrhin:or9bZEFDHgiZ6KJZ@cluster0.7if0eug.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const conectarBD = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error conectando a MongoDB:', error);
    process.exit(1);
  }
};

module.exports = conectarBD;
