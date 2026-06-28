/**
 * @fileoverview Routes pour l'authentification
 * @module routes/auth
 */

const express = require('express');
const router = express.Router();
const { login, logout } = require('../controllers/authController');

/**
 * @route POST /login
 * @description Connecte un utilisateur
 * @access Public
 */
router.post('/login', login);

/**
 * @route GET /logout
 * @description Déconnecte l'utilisateur
 * @access Private
 */
router.get('/logout', logout);

module.exports = router;