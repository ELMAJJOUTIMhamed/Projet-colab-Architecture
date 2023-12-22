const { Cadeaux } = require('./models'); // Assurez-vous que le chemin est correct pour importer le modèle Sequelize Cadeaux

// Exemple d'initialisation d'un objet Cadeaux
const cadeauInstance = Cadeaux.build({
  NOM: 'Nom du cadeau',
  DESCRIPTION: 'Description du cadeau',
  PRIX: 29.99,
  URL_IMAGE:"http://example.com", 
});

// Vous pouvez ensuite utiliser l'objet comme bon vous semble
console.log(cadeauInstance.NOM); // Accès à la propriété nomCadeaux

// Vous pouvez également sauvegarder l'objet en base de données
cadeauInstance.save().then((result) => {
  console.log('Cadeau enregistré en base de données:', result);
}).catch((error) => {
  console.error('Erreur lors de l\'enregistrement du cadeau en base de données:', error);
});
