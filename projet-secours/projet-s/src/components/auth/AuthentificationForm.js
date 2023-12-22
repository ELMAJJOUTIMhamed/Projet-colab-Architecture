import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


const AuthentificationForm = ({ onAuthenticate }) => {
  const [nom, setNom] = useState('');
  const [estVisiteur, setEstVisiteur] = useState(false);
  const [afficherFormulaire, setAfficherFormulaire] = useState(true);
  const [messageBienvenue, setMessageBienvenue] = useState('');
  const router = useRouter();
  const {updateUser}= useAuth()

  const handleAuthentication = async () => {
    if (!estVisiteur && nom.trim() !== '') {
      try {
        const response = await fetch(`http://localhost:4000/auteurs/nom/${nom}`);
        const data = await response.json();
  
        if (data.exists) {
          setMessageBienvenue(`Bienvenue, Auteur ${nom}`);
          // Mettre à jour le contexte avec le nom
          updateUser({ nom });
          // Masquer le formulaire
          restartAuthentication();
          router.push('/');
        } else {
          setMessageBienvenue(`Auteur ${nom} non trouvé`);
        }
      } catch (error) {
        console.error('Erreur lors de la requête API :', error);
        setMessageBienvenue('Erreur lors de l\'authentification');
      }
    }
  
    // Appel de la fonction onAuthenticate
    // onAuthenticate({ nom, estVisiteur });
  
    // Masquer le formulaire
    setAfficherFormulaire(false);
  };
  

  const restartAuthentication = () => {
    // Réinitialiser les états
    setNom('');
    setEstVisiteur(false);
    setMessageBienvenue('');
    setAfficherFormulaire(true);
  };

  return (
    <div className="max-w-md mx-auto my-4 p-6 bg-white rounded-md shadow-md">
      {afficherFormulaire ? (
        <>
          {!estVisiteur && (
            <label className="block mb-4">
              <span className="text-gray-700">Nom:</span>
              <input
                type="text"
                className="mt-1 p-2 w-full border rounded-md"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
              />
            </label>
          )}

          <label className="block mb-4">
            <input
              type="checkbox"
              className="mr-2"
              checked={estVisiteur}
              onChange={() => setEstVisiteur(!estVisiteur)}
            />
            <span className="text-gray-700">
              Visiteur <strong>( Pas besoin d'entrer de nom, cocher ! )</strong>
            </span>
          </label>

          <button
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            onClick={handleAuthentication}
          >
            S'authentifier
          </button>
        </>
      ) : (
        <>
          <p>{'Pas encore defini'}</p>
          <button
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            onClick={restartAuthentication}
          >
            Relancer l'authentification
          </button>
        </>
      )}
    </div>
  );
};

export default AuthentificationForm;
