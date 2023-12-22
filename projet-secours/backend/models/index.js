'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');

const ListeCadeauxModel = require('./Liste_CadeauxModel');
const CadeauxModel = require('./CadeauxModel');
const AutheurModel = require('./AutheurModel');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      !file.startsWith('.') &&
      file !== basename &&
      file.endsWith('.js') &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    // const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    const model = require(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.ListeCadeaux = ListeCadeauxModel;
db.Cadeaux = CadeauxModel;
db.Auteur = AutheurModel;

module.exports = db;
