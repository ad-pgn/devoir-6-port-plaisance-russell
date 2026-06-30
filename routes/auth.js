/**
 * @fileoverview Routes pour l'authentification
 * @module routes/auth
 */

const express = require('express');
const router = express.Router();
const { login, logout } = require('../controllers/authController');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentification
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Connecte un utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: admin@port-plaisance.fr
 *               password: Admin1234
 *     responses:
 *       302:
 *         description: Redirection vers le tableau de bord
 */
router.post('/login', login);

/**
 * @swagger
 * /logout:
 *   get:
 *     summary: Déconnecte l'utilisateur
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirection vers la page d'accueil
 */
router.get('/logout', logout);

module.exports = router;