/**
 * @fileoverview Routes pour la gestion des utilisateurs
 * @module routes/users
 */

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/userController');

/**
 * @route GET /users
 * @description Récupère la liste de tous les utilisateurs
 * @access Private
 */
router.get('/', authMiddleware, getAllUsers);

/**
 * @route GET /users/:email
 * @description Récupère un utilisateur par son email
 * @access Private
 */
router.get('/:email', authMiddleware, getUser);

/**
 * @route POST /users
 * @description Crée un nouvel utilisateur
 * @access Private
 */
router.post('/', authMiddleware, createUser);

/**
 * @route PUT /users/:email
 * @description Met à jour un utilisateur
 * @access Private
 */
router.put('/:email', authMiddleware, updateUser);

/**
 * @route DELETE /users/:email
 * @description Supprime un utilisateur
 * @access Private
 */
router.delete('/:email', authMiddleware, deleteUser);

module.exports = router;