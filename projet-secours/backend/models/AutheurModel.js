// models/Auteur.js
const { DataTypes } = require('sequelize');
const sequelize = require('./config/database');

const Auteur = sequelize.define('auteur', {
  id_auteur: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'auteur'
});

module.exports = Auteur;
