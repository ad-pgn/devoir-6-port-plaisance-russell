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
 * @swagger
 * components:
 *   schemas:
 *     Reservation:
 *       type: object
 *       required:
 *         - clientName
 *         - boatName
 *         - startDate
 *         - endDate
 *       properties:
 *         catwayNumber:
 *           type: number
 *           description: Numéro du catway réservé
 *         clientName:
 *           type: string
 *           description: Nom du client
 *         boatName:
 *           type: string
 *           description: Nom du bateau
 *         startDate:
 *           type: string
 *           format: date
 *           description: Date de début de la réservation
 *         endDate:
 *           type: string
 *           format: date
 *           description: Date de fin de la réservation
 *       example:
 *         clientName: Thomas Martin
 *         boatName: Carolina
 *         startDate: 2026-05-21
 *         endDate: 2026-10-27
 */

/**
 * @swagger
 * tags:
 *   name: Reservations
 *   description: Gestion des réservations
 */

/**
 * @swagger
 * /catways/{id}/reservations:
 *   get:
 *     summary: Récupère toutes les réservations d'un catway
 *     tags: [Reservations]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: Numéro du catway
 *     responses:
 *       200:
 *         description: Liste des réservations
 */
router.get('/', authMiddleware, getAllReservations);

/**
 * @swagger
 * /catways/{id}/reservations/create:
 *   get:
 *     summary: Affiche le formulaire de création
 *     tags: [Reservations]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Formulaire de création
 */
router.get('/create', authMiddleware, getCreateReservation);

/**
 * @swagger
 * /catways/{id}/reservations/{idReservation}:
 *   get:
 *     summary: Récupère une réservation par son id
 *     tags: [Reservations]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *       - in: path
 *         name: idReservation
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Détail de la réservation
 *       404:
 *         description: Réservation non trouvée
 */
router.get('/:idReservation', authMiddleware, getReservation);

/**
 * @swagger
 * /catways/{id}/reservations/{idReservation}/edit:
 *   get:
 *     summary: Affiche le formulaire de modification
 *     tags: [Reservations]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *       - in: path
 *         name: idReservation
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Formulaire de modification
 */
router.get('/:idReservation/edit', authMiddleware, getEditReservation);

/**
 * @swagger
 * /catways/{id}/reservations:
 *   post:
 *     summary: Crée une nouvelle réservation
 *     tags: [Reservations]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservation'
 *     responses:
 *       201:
 *         description: Réservation créée
 *       400:
 *         description: Erreur de validation
 */
router.post('/', authMiddleware, createReservation);

/**
 * @swagger
 * /catways/{id}/reservations/{idReservation}:
 *   put:
 *     summary: Met à jour une réservation
 *     tags: [Reservations]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *       - in: path
 *         name: idReservation
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservation'
 *     responses:
 *       200:
 *         description: Réservation mise à jour
 *       404:
 *         description: Réservation non trouvée
 */
router.post('/:idReservation', authMiddleware, updateReservation);

/**
 * @swagger
 * /catways/{id}/reservations/{idReservation}:
 *   delete:
 *     summary: Supprime une réservation
 *     tags: [Reservations]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *       - in: path
 *         name: idReservation
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Réservation supprimée
 *       404:
 *         description: Réservation non trouvée
 */
router.post('/:idReservation/delete', authMiddleware, deleteReservation);

module.exports = router;