const express = require('express');
const userRoutes = require('./application/routes/userRouters');
const swipeRoutes = require('./application/routes/swipeRouters');
const swaggerDocs = require('./infrastructure/config/swaggerConfig');

const conectarBD = require('./infrastructure/config/db');


const app = express();
const PORT = 3000;

app.use(express.json());

// Inicializar Swagger
swaggerDocs(app);

// Conectar a BD
conectarBD();

// Routes users
app.use('/api', userRoutes);
// Routes Swipe
app.use('/api', swipeRoutes);


app.listen(PORT, () => {
    console.log(`Corriendo en el puerto ${PORT}`);
})

