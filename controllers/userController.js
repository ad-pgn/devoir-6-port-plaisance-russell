/**
 * @fileoverview Contrôleur pour la gestion des utilisateurs
 * @module controllers/userController
 */

const User = require('../models/User');

/**
 * Affiche la liste de tous les utilisateurs.
 * @async
 * @function getAllUsers
 * @param {Object} req - Objet requête Express
 * @param {Object} res - Objet réponse Express
 * @returns {Promise<void>}
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.render('users/index', { users });
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
};

/**
 * Affiche le détail d'un utilisateur.
 * @async
 * @function getUser
 * @param {Object} req - Objet requête Express
 * @param {Object} res - Objet réponse Express
 * @returns {Promise<void>}
 */
const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).select('-password');
    if (!user) {
      return res.status(404).send('Utilisateur non trouvé');
    }
    res.render('users/show', { user });
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
};

/**
 * Affiche le formulaire de création d'un utilisateur.
 * @function getCreateUser
 * @param {Object} req - Objet requête Express
 * @param {Object} res - Objet réponse Express
 * @returns {void}
 */
const getCreateUser = (req, res) => {
  res.render('users/create');
};

/**
 * Crée un nouvel utilisateur.
 * @async
 * @function createUser
 * @param {Object} req - Objet requête Express
 * @param {Object} res - Objet réponse Express
 * @returns {Promise<void>}
 */
const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.redirect('/users');
  } catch (error) {
    if (error.code === 11000) {
      return res.render('users/create', { error: 'Cet email est déjà utilisé' });
    }
    res.render('users/create', { error: error.message });
  }
};

/**
 * Affiche le formulaire de modification d'un utilisateur.
 * @async
 * @function getEditUser
 * @param {Object} req - Objet requête Express
 * @param {Object} res - Objet réponse Express
 * @returns {Promise<void>}
 */
const getEditUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).select('-password');
    if (!user) {
      return res.status(404).send('Utilisateur non trouvé');
    }
    res.render('users/edit', { user });
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
};

/**
 * Met à jour un utilisateur.
 * @async
 * @function updateUser
 * @param {Object} req - Objet requête Express
 * @param {Object} res - Objet réponse Express
 * @returns {Promise<void>}
 */
const updateUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).send('Utilisateur non trouvé');
    }
    if (req.body.username) user.username = req.body.username;
    if (req.body.email) user.email = req.body.email;
    if (req.body.password) user.password = req.body.password;
    await user.save();
    res.redirect('/users');
  } catch (error) {
    if (error.code === 11000) {
      return res.render('users/edit', { user: req.body, error: 'Cet email est déjà utilisé' });
    }
    res.render('users/edit', { user: req.body, error: error.message });
  }
};

/**
 * Supprime un utilisateur.
 * @async
 * @function deleteUser
 * @param {Object} req - Objet requête Express
 * @param {Object} res - Objet réponse Express
 * @returns {Promise<void>}
 */
const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ email: req.params.email });
    if (!user) {
      return res.status(404).send('Utilisateur non trouvé');
    }
    res.redirect('/users');
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
};

module.exports = { getAllUsers, getUser, getCreateUser, createUser, getEditUser, updateUser, deleteUser };