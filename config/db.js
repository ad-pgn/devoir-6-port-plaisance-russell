/**
 * @fileoverview Configuration et connexion à la base de données MongoDB
 * @module config/db
 */

const mongoose = require('mongoose');

/**
 * Établit la connexion à MongoDB via Mongoose.
 * Utilise l'URI définie dans les variables d'environnement.
 * @async
 * @function connectDB
 * @returns {Promise<void>}
 */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connexion MongoDB établie');
  } catch (error) {
    console.error('❌ Erreur de connexion MongoDB :', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;