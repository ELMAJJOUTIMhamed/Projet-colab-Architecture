// models/collaborateur.js
module.exports = (sequelize, DataTypes) => {
  const Collaborateur = sequelize.define('Collaborateur', {
    id_colab: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nom: DataTypes.STRING,
  });

  Collaborateur.associate = (models) => {
    Collaborateur.belongsTo(models.Auteur, { foreignKey: 'id_autheur' });
    Collaborateur.belongsTo(models.ListeCadeaux, { foreignKey: 'id_liste_colab' });
  };

  return Collaborateur;
};
