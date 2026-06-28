/**
 * @fileoverview Contrôleur pour la gestion des catways
 * @module controllers/catwayController
 */

const Catway = require('../models/Catway');

/**
 * Récupère la liste de tous les catways.
 * @async
 * @function getAllCatways
 * @param {Object} req - Objet requête Express
 * @param {Object} res - Objet réponse Express
 * @returns {Promise<void>}
 */
const getAllCatways = async (req, res) => {
  try {
    const catways = await Catway.find();
    res.status(200).json(catways);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

/**
 * Récupère un catway par son numéro.
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
      return res.status(404).json({ message: 'Catway non trouvé' });
    }
    res.status(200).json(catway);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
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
    res.status(201).json(catway);
  } catch (error) {
    res.status(400).json({ message: 'Erreur de création', error: error.message });
  }
};

/**
 * Met à jour l'état d'un catway (catwayState uniquement).
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
      return res.status(404).json({ message: 'Catway non trouvé' });
    }
    res.status(200).json(catway);
  } catch (error) {
    res.status(400).json({ message: 'Erreur de mise à jour', error: error.message });
  }
};

/**
 * Supprime un catway par son numéro.
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
      return res.status(404).json({ message: 'Catway non trouvé' });
    }
    res.status(200).json({ message: 'Catway supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

module.exports = { getAllCatways, getCatway, createCatway, updateCatway, deleteCatway };