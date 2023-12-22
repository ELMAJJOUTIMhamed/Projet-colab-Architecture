const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_DATABASE || 'GestionCadeaux',
    process.env.DB_USERNAME || 'root',
    process.env.DB_PASSWORD || 'Demonone@12345',
  {
    host: process.env.DB_HOST,
    dialect: "mysql", 
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  }
);

module.exports = sequelize;
