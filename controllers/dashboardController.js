/**
 * @fileoverview Contrôleur pour le tableau de bord
 * @module controllers/dashboardController
 */

const Reservation = require('../models/Reservation');

/**
 * Affiche le tableau de bord avec les réservations en cours.
 * @async
 * @function getDashboard
 * @param {Object} req - Objet requête Express
 * @param {Object} res - Objet réponse Express
 * @returns {Promise<void>}
 */
const getDashboard = async (req, res) => {
  try {
    const now = new Date();

    const currentReservations = await Reservation.find({
      startDate: { $lte: now },
      endDate: { $gte: now }
    });

    res.render('dashboard', {
      user: req.user,
      currentReservations,
      now
    });
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
};

module.exports = { getDashboard };