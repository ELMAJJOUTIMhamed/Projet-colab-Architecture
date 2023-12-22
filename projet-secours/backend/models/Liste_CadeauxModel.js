// models/Liste_cadeaux.js
const { DataTypes } = require('sequelize');
const sequelize = require('./config/database');
const Auteur = require('./AutheurModel');

const Liste_cadeaux = sequelize.define('liste_cadeaux', {
  id_liste: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date_limite_reservation: {
    type: DataTypes.DATE,
    allowNull: false,
  },
},{
  tableName:'liste_cadeaux'

});

Liste_cadeaux.belongsTo(Auteur, { foreignKey: 'id_auteur' });

module.exports = Liste_cadeaux;
