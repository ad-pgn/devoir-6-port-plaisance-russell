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
  getCreateReservation,
  createReservation,
  getEditReservation,
  updateReservation,
  deleteReservation
} = require('../controllers/reservationController');

/**
 * @route GET /catways/:id/reservations
 * @description Affiche la liste des réservations d'un catway
 * @access Private
 */
router.get('/', authMiddleware, getAllReservations);

/**
 * @route GET /catways/:id/reservations/create
 * @description Affiche le formulaire de création
 * @access Private
 */
router.get('/create', authMiddleware, getCreateReservation);

/**
 * @route GET /catways/:id/reservations/:idReservation
 * @description Affiche le détail d'une réservation
 * @access Private
 */
router.get('/:idReservation', authMiddleware, getReservation);

/**
 * @route GET /catways/:id/reservations/:idReservation/edit
 * @description Affiche le formulaire de modification
 * @access Private
 */
router.get('/:idReservation/edit', authMiddleware, getEditReservation);

/**
 * @route POST /catways/:id/reservations
 * @description Crée une nouvelle réservation
 * @access Private
 */
router.post('/', authMiddleware, createReservation);

/**
 * @route POST /catways/:id/reservations/:idReservation
 * @description Met à jour une réservation
 * @access Private
 */
router.post('/:idReservation', authMiddleware, updateReservation);

/**
 * @route POST /catways/:id/reservations/:idReservation/delete
 * @description Supprime une réservation
 * @access Private
 */
router.post('/:idReservation/delete', authMiddleware, deleteReservation);

module.exports = router;