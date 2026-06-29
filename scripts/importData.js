/**
 * @fileoverview Script d'import des données JSON dans MongoDB
 * @module scripts/importData
 */

require('dotenv').config();
const mongoose = require('mongoose');
const Catway = require('../models/Catway');
const Reservation = require('../models/Reservation');
const User = require('../models/User');

const catways = require('./catways.json');
const reservations = require('./reservations.json');

/**
 * Importe les données dans MongoDB.
 * @async
 * @function importData
 * @returns {Promise<void>}
 */
const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connexion MongoDB établie');

    // Suppression des données existantes
    await Catway.deleteMany();
    await Reservation.deleteMany();
    await User.deleteMany();
    console.log('Collections vidées');

    // Import des catways
    await Catway.insertMany(catways);
    console.log(`${catways.length} catways importés`);

    // Import des réservations
    await Reservation.insertMany(reservations);
    console.log(`${reservations.length} réservations importées`);

    // Création d'un utilisateur de test
    const testUser = new User({
      username: 'Admin',
      email: 'admin@port-plaisance.fr',
      password: 'Admin1234'
    });
    await testUser.save();
    console.log('Utilisateur de test créé');
    console.log('Email    : admin@port-plaisance.fr');
    console.log('Password : Admin1234');

    console.log('Import terminé avec succès !');
    process.exit(0);
  } catch (error) {
    console.error('Erreur lors de l\'import :', error.message);
    process.exit(1);
  }
};

importData();