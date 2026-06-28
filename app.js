/**
 * @fileoverview Point d'entrée de l'application Express
 * @module app
 */

require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const catwayRoutes = require('./routes/catways');
const reservationRoutes = require('./routes/reservations');

const app = express();
const PORT = process.env.PORT || 3000;

// Connexion à MongoDB
connectDB();

// Moteur de templates
app.set('view engine', 'ejs');
app.set('views', './views');

// Middlewares globaux
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

// Routes
app.use('/', authRoutes);
app.use('/catways', catwayRoutes);
app.use('/catways/:id/reservations', reservationRoutes);

// Route de test
app.get('/', (req, res) => {
  res.send('Port de Plaisance Russell — API en ligne');
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

module.exports = app;