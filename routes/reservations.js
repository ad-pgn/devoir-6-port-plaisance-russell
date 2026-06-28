/**
 * @fileoverview Routes pour la gestion des réservations
 * @module routes/reservations
 */

const express = require('express');
const router = express.Router({ mergeParams: true });
const authMiddleware = require('../middleware/auth');
const {
  getAllReservations,
  getReservation,
  createReservation,
  updateReservation,
  deleteReservation
} = require('../controllers/reservationController');

/**
 * @route GET /catways/:id/reservations
 * @description Récupère toutes les réservations d'un catway
 * @access Private
 */
router.get('/', authMiddleware, getAllReservations);

/**
 * @route GET /catways/:id/reservations/:idReservation
 * @description Récupère une réservation par son id
 * @access Private
 */
router.get('/:idReservation', authMiddleware, getReservation);

/**
 * @route POST /catways/:id/reservations
 * @description Crée une nouvelle réservation
 * @access Private
 */
router.post('/', authMiddleware, createReservation);

/**
 * @route PUT /catways/:id/reservations/:idReservation
 * @description Met à jour une réservation
 * @access Private
 */
router.put('/:idReservation', authMiddleware, updateReservation);

/**
 * @route DELETE /catways/:id/reservations/:idReservation
 * @description Supprime une réservation
 * @access Private
 */
router.delete('/:idReservation', authMiddleware, deleteReservation);

module.exports = router;