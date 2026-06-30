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
 * @route GET /catways
 * @description Affiche la liste de tous les catways
 * @access Private
 */
router.get('/', authMiddleware, getAllCatways);

/**
 * @route GET /catways/create
 * @description Affiche le formulaire de création
 * @access Private
 */
router.get('/create', authMiddleware, getCreateCatway);

/**
 * @route GET /catways/:id
 * @description Affiche le détail d'un catway
 * @access Private
 */
router.get('/:id', authMiddleware, getCatway);

/**
 * @route GET /catways/:id/edit
 * @description Affiche le formulaire de modification
 * @access Private
 */
router.get('/:id/edit', authMiddleware, getEditCatway);

/**
 * @route POST /catways
 * @description Crée un nouveau catway
 * @access Private
 */
router.post('/', authMiddleware, createCatway);

/**
 * @route POST /catways/:id
 * @description Met à jour l'état d'un catway
 * @access Private
 */
router.post('/:id', authMiddleware, updateCatway);

/**
 * @route POST /catways/:id/delete
 * @description Supprime un catway
 * @access Private
 */
router.post('/:id/delete', authMiddleware, deleteCatway);

module.exports = router;