const express = require('express');
const cors = require('cors');

const userRoutes = require('./application/routes/userRouters');
const swipeRoutes = require('./application/routes/swipeRouters');
const matchRoutes = require('./application/routes/matchRouters');
const messageRoutes = require('./application/routes/messageRouters');
const swaggerDocs = require('./infrastructure/config/swaggerConfig');
const conectarBD = require('./infrastructure/config/db');


const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());
  
// Swagger
swaggerDocs(app);

// Conectar BD
conectarBD();

// Rutas
app.use('/api', userRoutes);
app.use('/api', swipeRoutes);
app.use('/api', matchRoutes);
app.use('/api', messageRoutes);



app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
