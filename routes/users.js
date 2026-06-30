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
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: Nom d'utilisateur
 *         email:
 *           type: string
 *           description: Adresse email unique
 *         password:
 *           type: string
 *           description: Mot de passe (min 8 caractères, une majuscule)
 *       example:
 *         username: Admin
 *         email: admin@port-plaisance.fr
 *         password: Admin1234
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gestion des utilisateurs
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Récupère la liste de tous les utilisateurs
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 */
router.get('/', authMiddleware, getAllUsers);

/**
 * @swagger
 * /users/create:
 *   get:
 *     summary: Affiche le formulaire de création
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Formulaire de création
 */
router.get('/create', authMiddleware, getCreateUser);

/**
 * @swagger
 * /users/{email}:
 *   get:
 *     summary: Récupère un utilisateur par son email
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Détail de l'utilisateur
 *       404:
 *         description: Utilisateur non trouvé
 */
router.get('/:email', authMiddleware, getUser);

/**
 * @swagger
 * /users/{email}/edit:
 *   get:
 *     summary: Affiche le formulaire de modification
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Formulaire de modification
 */
router.get('/:email/edit', authMiddleware, getEditUser);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crée un nouvel utilisateur
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Utilisateur créé
 *       409:
 *         description: Email déjà utilisé
 */
router.post('/', authMiddleware, createUser);

/**
 * @swagger
 * /users/{email}:
 *   put:
 *     summary: Met à jour un utilisateur
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour
 *       404:
 *         description: Utilisateur non trouvé
 */
router.post('/:email', authMiddleware, updateUser);

/**
 * @swagger
 * /users/{email}:
 *   delete:
 *     summary: Supprime un utilisateur
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Utilisateur supprimé
 *       404:
 *         description: Utilisateur non trouvé
 */
router.post('/:email/delete', authMiddleware, deleteUser);

module.exports = router;