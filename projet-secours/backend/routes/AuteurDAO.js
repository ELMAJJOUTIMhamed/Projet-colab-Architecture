// routes/AuteurController.js
const express = require('express');
const auteur_apiRoute = express.Router();
const {Auteur} = require('../models');

// Route GET pour obtenir tous les auteurs
auteur_apiRoute.get('/auteurs', async (req, res) => {
  try {
    const auteurs = await Auteur.findAll();
    res.json(auteurs);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
});

// Route GET pour l'existence d'un utilisateur
auteur_apiRoute.get('/auteurs/nom/:nom', async (req, res) => {
  const { nom } = req.params;
  try {
    const auteur = await Auteur.findOne({ where: { nom } });

    if (!auteur) {
      res.json({ exists: false, message: 'Auteur non trouvé' });
    } else {
      res.json({ exists: true, auteur });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
});

// Route POST pour ajouter un nouvel auteur
auteur_apiRoute.post('/auteurs', async (req, res) => {
  try {
    console.log(req.body);
    const nouvelAuteur = new Auteur(req.body);
    await nouvelAuteur.save();
    res.json(nouvelAuteur);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
});

// Route PUT pour mettre à jour un auteur existant
auteur_apiRoute.put('/auteurs/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const auteur = await Auteur.findByPk(id);
    if (!auteur) {
      res.status(404).send('Auteur non trouvé');
      return;
    }

    // Mettez à jour les propriétés de l'auteur avec les données de la requête
    Object.assign(auteur, req.body);

    await auteur.save();

    res.json(auteur);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
});
auteur_apiRoute.get('/auteurs/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const auteur = await Auteur.findByPk(id);

    if (!auteur) {
      res.status(404).json({ message: 'Auteur non trouvé' });
    } else {
      res.json(auteur);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
});
// Route DELETE pour supprimer un auteur
auteur_apiRoute.delete('/auteurs/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const auteur = await Auteur.findByPk(id);
    if (!auteur) {
      res.status(404).send('Auteur non trouvé');
      return;
    }

    await auteur.destroy();
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
});

module.exports = auteur_apiRoute;
