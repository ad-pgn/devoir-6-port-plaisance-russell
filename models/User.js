/**
 * @fileoverview Modèle Mongoose pour les utilisateurs
 * @module models/User
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * @typedef {Object} User
 * @property {string} username - Nom d'utilisateur
 * @property {string} email - Adresse email unique
 * @property {string} password - Mot de passe hashé
 */

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Le nom d\'utilisateur est requis'],
    trim: true,
    minlength: [3, 'Le nom d\'utilisateur doit contenir au moins 3 caractères']
  },
  email: {
    type: String,
    required: [true, 'L\'email est requis'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'L\'email n\'est pas valide']
  },
  password: {
    type: String,
    required: [true, 'Le mot de passe est requis'],
    minlength: [8, 'Le mot de passe doit contenir au moins 8 caractères'],
    validate: {
      validator: function(value) {
        return /[A-Z]/.test(value);
      },
      message: 'Le mot de passe doit contenir au moins une majuscule'
        }
    }
}, { timestamps: true });

/**
 * Hash le mot de passe avant la sauvegarde
 * @function
 * @name pre-save
 */
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('User', userSchema);