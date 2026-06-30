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
  getCreateUser,
  createUser,
  getEditUser,
  updateUser,
  deleteUser
} = require('../controllers/userController');

/**
 * @route GET /users
 * @description Affiche la liste de tous les utilisateurs
 * @access Private
 */
router.get('/', authMiddleware, getAllUsers);

/**
 * @route GET /users/create
 * @description Affiche le formulaire de création
 * @access Private
 */
router.get('/create', authMiddleware, getCreateUser);

/**
 * @route GET /users/:email
 * @description Affiche le détail d'un utilisateur
 * @access Private
 */
router.get('/:email', authMiddleware, getUser);

/**
 * @route GET /users/:email/edit
 * @description Affiche le formulaire de modification
 * @access Private
 */
router.get('/:email/edit', authMiddleware, getEditUser);

/**
 * @route POST /users
 * @description Crée un nouvel utilisateur
 * @access Private
 */
router.post('/', authMiddleware, createUser);

/**
 * @route POST /users/:email
 * @description Met à jour un utilisateur
 * @access Private
 */
router.post('/:email', authMiddleware, updateUser);

/**
 * @route POST /users/:email/delete
 * @description Supprime un utilisateur
 * @access Private
 */
router.post('/:email/delete', authMiddleware, deleteUser);

module.exports = router;