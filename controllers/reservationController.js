/**
 * @fileoverview Contrôleur pour la gestion des réservations
 * @module controllers/reservationController
 */

const Reservation = require('../models/Reservation');
const Catway = require('../models/Catway');

/**
 * Affiche la liste de toutes les réservations.
 * @async
 * @function getAllReservations
 * @param {Object} req - Objet requête Express
 * @param {Object} res - Objet réponse Express
 * @returns {Promise<void>}
 */
const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ catwayNumber: req.params.id });
    const catway = await Catway.findOne({ catwayNumber: req.params.id });
    if (!catway) {
      return res.status(404).send('Catway non trouvé');
    }
    res.render('reservations/index', { reservations, catway });
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
};

/**
 * Affiche le détail d'une réservation.
 * @async
 * @function getReservation
 * @param {Object} req - Objet requête Express
 * @param {Object} res - Objet réponse Express
 * @returns {Promise<void>}
 */
const getReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.idReservation);
    if (!reservation) {
      return res.status(404).send('Réservation non trouvée');
    }
    res.render('reservations/show', { reservation });
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
};

/**
 * Affiche le formulaire de création d'une réservation.
 * @async
 * @function getCreateReservation
 * @param {Object} req - Objet requête Express
 * @param {Object} res - Objet réponse Express
 * @returns {Promise<void>}
 */
const getCreateReservation = async (req, res) => {
  try {
    const catway = await Catway.findOne({ catwayNumber: req.params.id });
    if (!catway) {
      return res.status(404).send('Catway non trouvé');
    }
    res.render('reservations/create', { catway });
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
};

/**
 * Crée une nouvelle réservation.
 * @async
 * @function createReservation
 * @param {Object} req - Objet requête Express
 * @param {Object} res - Objet réponse Express
 * @returns {Promise<void>}
 */
const createReservation = async (req, res) => {
  try {
    const reservation = new Reservation({
      ...req.body,
      catwayNumber: req.params.id
    });
    await reservation.save();
    res.redirect(`/catways/${req.params.id}/reservations`);
  } catch (error) {
    const catway = await Catway.findOne({ catwayNumber: req.params.id });
    res.render('reservations/create', { catway, error: error.message });
  }
};

/**
 * Affiche le formulaire de modification d'une réservation.
 * @async
 * @function getEditReservation
 * @param {Object} req - Objet requête Express
 * @param {Object} res - Objet réponse Express
 * @returns {Promise<void>}
 */
const getEditReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.idReservation);
    if (!reservation) {
      return res.status(404).send('Réservation non trouvée');
    }
    res.render('reservations/edit', { reservation });
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
};

/**
 * Met à jour une réservation.
 * @async
 * @function updateReservation
 * @param {Object} req - Objet requête Express
 * @param {Object} res - Objet réponse Express
 * @returns {Promise<void>}
 */
const updateReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.idReservation);
    if (!reservation) {
      return res.status(404).send('Réservation non trouvée');
    }

    reservation.clientName = req.body.clientName;
    reservation.boatName = req.body.boatName;
    reservation.startDate = req.body.startDate;
    reservation.endDate = req.body.endDate;

    await reservation.save();

    res.redirect(`/catways/${req.params.id}/reservations`);
  } catch (error) {
    res.status(400).send('Erreur de mise à jour : ' + error.message);
  }
};

/**
 * Supprime une réservation.
 * @async
 * @function deleteReservation
 * @param {Object} req - Objet requête Express
 * @param {Object} res - Objet réponse Express
 * @returns {Promise<void>}
 */
const deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.idReservation);
    if (!reservation) {
      return res.status(404).send('Réservation non trouvée');
    }
    res.redirect(`/catways/${req.params.id}/reservations`);
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
};

module.exports = { getAllReservations, getReservation, getCreateReservation, createReservation, getEditReservation, updateReservation, deleteReservation };