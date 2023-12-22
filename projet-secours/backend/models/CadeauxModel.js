// models/Cadeaux.js
const { DataTypes } = require('sequelize');
const sequelize = require('./config/database');
const Liste_cadeaux = require('./Liste_CadeauxModel')

const Cadeaux = sequelize.define('cadeaux', {
  id_cadeaux: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  prix: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  url_image: {
    type: DataTypes.STRING,
  },
}, {
  
  tableName:"cadeaux"
});

Cadeaux.belongsTo(Liste_cadeaux, { foreignKey: 'id_liste' });

module.exports = Cadeaux;
