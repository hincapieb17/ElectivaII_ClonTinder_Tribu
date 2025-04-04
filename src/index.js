const express = require('express');
const userRoutes = require('./application/routes/userRouters')
//const userRoutes = require('./routes/userRouters');
const swaggerDocs = require("./infrastructure/config/swaggerConfig");
//const swaggerDocs = require("./config/swaggerConfig");
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

app.listen(PORT, () => {
    console.log(`Corriendo en el puertot ${PORT}`);
})

