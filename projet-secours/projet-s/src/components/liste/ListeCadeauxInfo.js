// components/ListeCadeauxInfo.js
import React, { useEffect, useState } from 'react';
import FetchTable from '../Generic/GeneralFetch';

const ListeCadeauxInfo = () => {
  const [listeCadeauxData, setListeCadeauxData] = useState([]);

  useEffect(() => {
    const fetchListeCadeauxData = async () => {
      try {
        const response = await fetch('http://localhost:4000/liste-cadeaux');
        if (!response.ok) {
          throw new Error(`Erreur HTTP! Statut: ${response.status}`);
        }
        const data = await response.json();
        setListeCadeauxData(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données de la liste des cadeaux:', error);
      }
    };

    fetchListeCadeauxData();
  }, []);

  return (
    <div>
      <h1>Informations sur la Liste des Cadeaux</h1>
      {listeCadeauxData ? (
        <FetchTable data={listeCadeauxData} headers={['id_auteur','nom', 'date_limite_reservation']} />
      ) : (
        <p>Chargement des données...</p>
      )}
    </div>
  );
};

export default ListeCadeauxInfo;
