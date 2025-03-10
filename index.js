const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
app.use('/api/auth/user', userRoutes);
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connexion à MongoDB réussie !');
}).catch(() => {
    console.log('Connexion à MongoDB échouée !');
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});


