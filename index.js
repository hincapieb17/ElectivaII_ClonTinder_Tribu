const express = require('express');
const userRoutes = require('./routes/userRouters');


const app = express();
const PORT = 3000;

app.use(express.json());


// Routes
app.use('/api', userRoutes);

app.listen(PORT, () => {
    console.log(`Tribu API running on port ${PORT}`);
})

