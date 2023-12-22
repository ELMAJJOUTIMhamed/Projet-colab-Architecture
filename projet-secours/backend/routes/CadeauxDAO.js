// routes/CadeauxController.js
const express = require('express');
const cadeaux_apiRoute = express.Router();
const {Cadeaux} = require('../models');

// Route GET pour obtenir tous les cadeaux
cadeaux_apiRoute.get('/cadeaux', async (req, res) => {
  try {
    const cadeaux = await Cadeaux.findAll();
    res.json(cadeaux);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
});

// Route POST pour ajouter un nouveau cadeau
cadeaux_apiRoute.post('/cadeaux', async (req, res) => {
  try {
    const nouveauCadeau = new Cadeaux(req.body);
    await nouveauCadeau.save();
    res.json(nouveauCadeau);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
});

// Route PUT pour mettre à jour un cadeau existant
cadeaux_apiRoute.put('/cadeaux/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const cadeau = await Cadeaux.findByPk(id);
    if (!cadeau) {
      res.status(404).send('Cadeau non trouvé');
      return;
    }

    // Mettez à jour les propriétés du cadeau avec les données de la requête
    Object.assign(cadeau, req.body);

    await cadeau.save();

    res.json(cadeau);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
});

// Route DELETE pour supprimer un cadeau
cadeaux_apiRoute.delete('/cadeaux/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const cadeau = await Cadeaux.findByPk(id);
    if (!cadeau) {
      res.status(404).send('Cadeau non trouvé');
      return;
    }

    await cadeau.destroy();
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
});

module.exports = cadeaux_apiRoute;
