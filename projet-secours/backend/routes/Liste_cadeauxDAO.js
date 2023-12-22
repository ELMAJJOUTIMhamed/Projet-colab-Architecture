// routes/ListeCadeauxController.js
const express = require('express');
const liste_cadeaux_apiRoute = express.Router();
const {ListeCadeaux} = require('../models');

// Route GET pour obtenir toutes les listes de cadeaux
liste_cadeaux_apiRoute.get('/liste-cadeaux', async (req, res) => {
  try {
    const listesCadeaux = await ListeCadeaux.findAll();
    res.json(listesCadeaux);
  }catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
});

// Route POST pour ajouter une nouvelle liste de cadeaux
liste_cadeaux_apiRoute.post('/liste-cadeaux', async (req, res) => {
  try {
    
    const nouvelleListeCadeaux = new ListeCadeaux(req.body);
    await nouvelleListeCadeaux.save();
    res.json(nouvelleListeCadeaux);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur', error);
  }
});

// Route PUT pour mettre à jour une liste de cadeaux existante
liste_cadeaux_apiRoute.put('/liste-cadeaux/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const listeCadeaux = await ListeCadeaux.findByPk(id);
    if (!listeCadeaux) {
      res.status(404).send('Liste de cadeaux non trouvée');
      return;
    }

    // Mettez à jour les propriétés de la liste de cadeaux avec les données de la requête
    Object.assign(listeCadeaux, req.body);

    await listeCadeaux.save();

    res.json(listeCadeaux);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
});

// Route DELETE pour supprimer une liste de cadeaux
liste_cadeaux_apiRoute.delete('/liste-cadeaux/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const listeCadeaux = await ListeCadeaux.findByPk(id);
    if (!listeCadeaux) {
      res.status(404).send('Liste de cadeaux non trouvée');
      return;
    }

    await listeCadeaux.destroy();
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
});

module.exports = liste_cadeaux_apiRoute;
