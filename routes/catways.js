/**
 * @fileoverview Routes pour la gestion des catways
 * @module routes/catways
 */

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const {
  getAllCatways,
  getCatway,
  getCreateCatway,
  createCatway,
  getEditCatway,
  updateCatway,
  deleteCatway
} = require('../controllers/catwayController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Catway:
 *       type: object
 *       required:
 *         - catwayNumber
 *         - catwayType
 *         - catwayState
 *       properties:
 *         catwayNumber:
 *           type: number
 *           description: Numéro unique du catway
 *         catwayType:
 *           type: string
 *           enum: [long, short]
 *           description: Type du catway
 *         catwayState:
 *           type: string
 *           description: État du catway
 *       example:
 *         catwayNumber: 1
 *         catwayType: short
 *         catwayState: bon état
 */

/**
 * @swagger
 * tags:
 *   name: Catways
 *   description: Gestion des catways
 */

/**
 * @swagger
 * /catways:
 *   get:
 *     summary: Récupère la liste de tous les catways
 *     tags: [Catways]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Liste des catways
 */
router.get('/', authMiddleware, getAllCatways);

/**
 * @swagger
 * /catways/create:
 *   get:
 *     summary: Affiche le formulaire de création
 *     tags: [Catways]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Formulaire de création
 */
router.get('/create', authMiddleware, getCreateCatway);

/**
 * @swagger
 * /catways/{id}:
 *   get:
 *     summary: Récupère un catway par son numéro
 *     tags: [Catways]
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
 *         description: Détail du catway
 *       404:
 *         description: Catway non trouvé
 */
router.get('/:id', authMiddleware, getCatway);

/**
 * @swagger
 * /catways/{id}/edit:
 *   get:
 *     summary: Affiche le formulaire de modification
 *     tags: [Catways]
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
 *         description: Formulaire de modification
 */
router.get('/:id/edit', authMiddleware, getEditCatway);

/**
 * @swagger
 * /catways:
 *   post:
 *     summary: Crée un nouveau catway
 *     tags: [Catways]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Catway'
 *     responses:
 *       201:
 *         description: Catway créé
 *       400:
 *         description: Erreur de validation
 */
router.post('/', authMiddleware, createCatway);

/**
 * @swagger
 * /catways/{id}:
 *   put:
 *     summary: Met à jour l'état d'un catway
 *     tags: [Catways]
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
 *             type: object
 *             properties:
 *               catwayState:
 *                 type: string
 *     responses:
 *       200:
 *         description: Catway mis à jour
 *       404:
 *         description: Catway non trouvé
 */
router.post('/:id', authMiddleware, updateCatway);

/**
 * @swagger
 * /catways/{id}:
 *   delete:
 *     summary: Supprime un catway
 *     tags: [Catways]
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
 *         description: Catway supprimé
 *       404:
 *         description: Catway non trouvé
 */
router.post('/:id/delete', authMiddleware, deleteCatway);

module.exports = router;