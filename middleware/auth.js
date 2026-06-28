/**
 * @fileoverview Middleware d'authentification JWT
 * @module middleware/auth
 */

const jwt = require('jsonwebtoken');

/**
 * Vérifie la présence et la validité du token JWT dans les cookies.
 * Redirige vers la page d'accueil si le token est absent ou invalide.
 * @function authMiddleware
 * @param {Object} req - Objet requête Express
 * @param {Object} res - Objet réponse Express
 * @param {Function} next - Fonction next Express
 * @returns {void}
 */
const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect('/');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.clearCookie('token');
    return res.redirect('/');
  }
};

module.exports = authMiddleware;