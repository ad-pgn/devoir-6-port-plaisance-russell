/**
 * @fileoverview Contrôleur pour l'authentification
 * @module controllers/authController
 */

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

/**
 * Connecte un utilisateur et génère un token JWT stocké dans un cookie.
 * @async
 * @function login
 * @param {Object} req - Objet requête Express
 * @param {Object} res - Objet réponse Express
 * @returns {Promise<void>}
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.render('index', { error: 'Email ou mot de passe incorrect' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render('index', { error: 'Email ou mot de passe incorrect' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    });

    res.redirect('/dashboard');
  } catch (error) {
    res.render('index', { error: 'Une erreur est survenue' });
  }
};

/**
 * Déconnecte l'utilisateur en supprimant le cookie JWT.
 * @function logout
 * @param {Object} req - Objet requête Express
 * @param {Object} res - Objet réponse Express
 * @returns {void}
 */
const logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
};

module.exports = { login, logout };