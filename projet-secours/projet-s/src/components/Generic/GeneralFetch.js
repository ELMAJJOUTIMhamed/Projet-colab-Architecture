import React, { useEffect, useState } from 'react';
import DropdownMenu from '../Dropdown';
import { useRouter } from 'next/navigation';

const FetchTable = ({ data, headers, onDelete, onEdit, onRedirect }) => {
const [auteurs, setAuteurs] = useState([]);
  const route = useRouter()
  // Effet pour charger les noms des auteurs
  useEffect(() => {
    // Vous devrez remplacer l'URL par votre endpoint pour récupérer les auteurs
    fetch('http://localhost:4000/auteurs')
      .then(response => response.json())
      .then(data => setAuteurs(data))
      .catch(error => console.error('Erreur lors du chargement des auteurs:', error));
  }, []);

  // Fonction pour obtenir le nom de l'auteur à partir de son ID
  const getAuteurName = (idAuteur) => {
    const auteur = auteurs.find(a => a.id_auteur === idAuteur);
    return auteur ? auteur.nom : '';
  };

  // Fonction pour formater la date au format D-M-Y H:m
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric'};
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <table>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>{(header === 'id_auteur' ? 'auteur' : header)}</th>
          ))}
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {headers.map((header, colIndex) => (
              <td key={colIndex}>
                {header === 'id_auteur' ? getAuteurName(row[header]) : 
                  (header === 'date_limite_reservation' ? formatDate(row[header]) : row[header])
                }
              </td>
            ))}
            <td className="w-1/6 bg-gray-200 p-2 text-center">
              <DropdownMenu
                options={[
                  { value: 'delete', label: 'Supprimer' },
                  { value: 'edit', label: 'Modifier' },
                  { value: 'redirect', label: 'Redirection' },
                ]}
                onSelect={(option) => {
                  switch (option.value) {
                    case 'delete':
                      // deleteRow(rowIndex);
                      break;
                    case 'edit':
                      // editRow(rowIndex);
                      break;
                    case 'redirect':
                        route.push(`/cadeaux/?id=${row['id_auteur']}`);
                      break;
                    default:
                      break;
                  }
                }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FetchTable;
