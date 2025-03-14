const express = require('express');
const userRoutes = require('./routes/userRouters');

const swaggerDocs = require("./config/swaggerConfig");


const app = express();
const PORT = 3000;

app.use(express.json());

// Inicializar Swagger
swaggerDocs(app);

// Routes users
app.use('/api', userRoutes);

app.listen(PORT, () => {
    console.log(`Corriendo en el puertot ${PORT}`);
})

