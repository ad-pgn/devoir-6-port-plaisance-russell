/**
 * @fileoverview Routes pour le tableau de bord
 * @module routes/dashboard
 */

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { getDashboard } = require('../controllers/dashboardController');

/**
 * @route GET /dashboard
 * @description Affiche le tableau de bord
 * @access Private
 */
router.get('/', authMiddleware, getDashboard);

module.exports = router;