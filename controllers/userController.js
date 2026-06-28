/**
 * @fileoverview Contrôleur pour la gestion des utilisateurs
 * @module controllers/userController
 */

const User = require('../models/User');

/**
 * Récupère la liste de tous les utilisateurs.
 * @async
 * @function getAllUsers
 * @param {Object} req - Objet requête Express
 * @param {Object} res - Objet réponse Express
 * @returns {Promise<void>}
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

/**
 * Récupère un utilisateur par son email.
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
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
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
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Cet email est déjà utilisé' });
    }
    res.status(400).json({ message: 'Erreur de création', error: error.message });
  }
};

/**
 * Met à jour les informations d'un utilisateur.
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
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    if (req.body.username) user.username = req.body.username;
    if (req.body.email) user.email = req.body.email;
    if (req.body.password) user.password = req.body.password;

    await user.save();

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Cet email est déjà utilisé' });
    }
    res.status(400).json({ message: 'Erreur de mise à jour', error: error.message });
  }
};

/**
 * Supprime un utilisateur par son email.
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
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

module.exports = { getAllUsers, getUser, createUser, updateUser, deleteUser };