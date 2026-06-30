/**
 * @fileoverview Contrôleur pour la gestion des catways
 * @module controllers/catwayController
 */

const Catway = require('../models/Catway');

/**
 * Affiche la liste de tous les catways.
 * @async
 * @function getAllCatways
 * @param {Object} req - Objet requête Express
 * @param {Object} res - Objet réponse Express
 * @returns {Promise<void>}
 */
const getAllCatways = async (req, res) => {
  try {
    const catways = await Catway.find().sort({ catwayNumber: 1 });
    res.render('catways/index', { catways });
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
};

/**
 * Affiche le détail d'un catway.
 * @async
 * @function getCatway
 * @param {Object} req - Objet requête Express
 * @param {Object} res - Objet réponse Express
 * @returns {Promise<void>}
 */
const getCatway = async (req, res) => {
  try {
    const catway = await Catway.findOne({ catwayNumber: req.params.id });
    if (!catway) {
      return res.status(404).send('Catway non trouvé');
    }
    res.render('catways/show', { catway });
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
};

/**
 * Affiche le formulaire de création d'un catway.
 * @function getCreateCatway
 * @param {Object} req - Objet requête Express
 * @param {Object} res - Objet réponse Express
 * @returns {void}
 */
const getCreateCatway = (req, res) => {
  res.render('catways/create');
};

/**
 * Crée un nouveau catway.
 * @async
 * @function createCatway
 * @param {Object} req - Objet requête Express
 * @param {Object} res - Objet réponse Express
 * @returns {Promise<void>}
 */
const createCatway = async (req, res) => {
  try {
    const catway = new Catway(req.body);
    await catway.save();
    res.redirect('/catways');
  } catch (error) {
    res.render('catways/create', { error: error.message });
  }
};

/**
 * Affiche le formulaire de modification d'un catway.
 * @async
 * @function getEditCatway
 * @param {Object} req - Objet requête Express
 * @param {Object} res - Objet réponse Express
 * @returns {Promise<void>}
 */
const getEditCatway = async (req, res) => {
  try {
    const catway = await Catway.findOne({ catwayNumber: req.params.id });
    if (!catway) {
      return res.status(404).send('Catway non trouvé');
    }
    res.render('catways/edit', { catway });
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
};

/**
 * Met à jour l'état d'un catway.
 * @async
 * @function updateCatway
 * @param {Object} req - Objet requête Express
 * @param {Object} res - Objet réponse Express
 * @returns {Promise<void>}
 */
const updateCatway = async (req, res) => {
  try {
    const { catwayState } = req.body;
    const catway = await Catway.findOneAndUpdate(
      { catwayNumber: req.params.id },
      { catwayState },
      { new: true, runValidators: true }
    );
    if (!catway) {
      return res.status(404).send('Catway non trouvé');
    }
    res.redirect('/catways');
  } catch (error) {
    res.status(400).send('Erreur de mise à jour');
  }
};

/**
 * Supprime un catway.
 * @async
 * @function deleteCatway
 * @param {Object} req - Objet requête Express
 * @param {Object} res - Objet réponse Express
 * @returns {Promise<void>}
 */
const deleteCatway = async (req, res) => {
  try {
    const catway = await Catway.findOneAndDelete({ catwayNumber: req.params.id });
    if (!catway) {
      return res.status(404).send('Catway non trouvé');
    }
    res.redirect('/catways');
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
};

module.exports = { getAllCatways, getCatway, getCreateCatway, createCatway, getEditCatway, updateCatway, deleteCatway };