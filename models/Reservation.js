/**
 * @fileoverview Modèle Mongoose pour les réservations
 * @module models/Reservation
 */

const mongoose = require('mongoose');

/**
 * @typedef {Object} Reservation
 * @property {number} catwayNumber - Numéro du catway réservé
 * @property {string} clientName - Nom du client
 * @property {string} boatName - Nom du bateau
 * @property {Date} startDate - Date de début de réservation
 * @property {Date} endDate - Date de fin de réservation
 */

const reservationSchema = new mongoose.Schema({
  catwayNumber: {
    type: Number,
    required: [true, 'Le numéro de catway est requis']
  },
  clientName: {
    type: String,
    required: [true, 'Le nom du client est requis'],
    trim: true,
    minlength: [2, 'Le nom du client doit contenir au moins 2 caractères']
  },
  boatName: {
    type: String,
    required: [true, 'Le nom du bateau est requis'],
    trim: true,
    minlength: [2, 'Le nom du bateau doit contenir au moins 2 caractères']
  },
  startDate: {
    type: Date,
    required: [true, 'La date de début est requise']
  },
  endDate: {
    type: Date,
    required: [true, 'La date de fin est requise'],
    validate: {
      validator: function(value) {
        return value > this.startDate;
      },
      message: 'La date de fin doit être postérieure à la date de début'
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('Reservation', reservationSchema);