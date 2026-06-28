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
  createCatway,
  updateCatway,
  deleteCatway
} = require('../controllers/catwayController');

/**
 * @route GET /catways
 * @description Récupère la liste de tous les catways
 * @access Private
 */
router.get('/', authMiddleware, getAllCatways);

/**
 * @route GET /catways/:id
 * @description Récupère un catway par son numéro
 * @access Private
 */
router.get('/:id', authMiddleware, getCatway);

/**
 * @route POST /catways
 * @description Crée un nouveau catway
 * @access Private
 */
router.post('/', authMiddleware, createCatway);

/**
 * @route PUT /catways/:id
 * @description Met à jour l'état d'un catway
 * @access Private
 */
router.put('/:id', authMiddleware, updateCatway);

/**
 * @route DELETE /catways/:id
 * @description Supprime un catway
 * @access Private
 */
router.delete('/:id', authMiddleware, deleteCatway);

module.exports = router;