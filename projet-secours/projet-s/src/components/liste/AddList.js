"use client"
// components/AddCadeaux.js
import React, { useState } from 'react';

const AddList = () => {
  const [formData, setFormData] = useState({
    nom: '',
    date_limite_reservation: '', // Initialisez la date limite avec la date actuelle
    id_auteur: 1,
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddCadeaux = async () => {
    try {
      const response = await fetch('http://localhost:4000/liste-cadeaux', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // La requête s'est bien déroulée, vous pouvez gérer la suite (par exemple, mise à jour de l'affichage de la liste)
        console.log('Cadeau ajouté avec succès!');
      } else {
        // La requête a échoué, vous pouvez gérer les erreurs ici
        console.error('Échec de l\'ajout du cadeau');
      }
    } catch (error) {
      console.error('Erreur lors de la requête d\'ajout du cadeau:', error);
    }
  };

  return (
    <div>
      <h2>Ajouter un Cadeau</h2>
      <form>
        <label htmlFor="nom">Nom du Cadeau:</label>
        <input
          type="text"
          id="nom"
          name="nom"
          value={formData.nom}
          onChange={handleInputChange}
        />
      
        <label htmlFor="date_limite_reservation">Date limite de réservation:</label>
        <input
          type="date"
          id="date_limite_reservation"
          name="date_limite_reservation"
          value={formData.date_limite_reservation}
          onChange={handleInputChange}
        />

        {/* Ajoutez d'autres champs nécessaires ici */}

        <button type="button" onClick={handleAddCadeaux}>
          Ajouter
        </button>
      </form>
    </div>
  );
};

export default AddList;
