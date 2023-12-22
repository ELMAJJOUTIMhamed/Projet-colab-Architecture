"use client"
// pages/index.js (Home)
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AddList from '@/components/liste/AddList';
import { useAuth } from '@/context/authContext';
import ListeCadeauxInfo from '@/components/liste/ListeCadeauxInfo';

export default function Home() {
  const { user } = useAuth();
  const [tableauVisible, setTableauVisible] = useState(false);
  const router = useRouter();

  const toggleTableauVisibility = () => {
    setTableauVisible(!tableauVisible);
  };

  // useEffect(() => {
  //   // Vérifie si l'utilisateur n'est pas authentifié
  //   if (!user) {
  //     // Redirige vers la page de connexion
  //     router.push('/login');
  //   }
  // }, [user, router]);

  useEffect(() => {
    // Appeler toggleTableauVisibility pour afficher automatiquement la liste des cadeaux
    toggleTableauVisibility();
  }, []); // Le tableau de dépendances est vide pour s'assurer que cela ne se produit qu'une seule fois lors du chargement initial

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      {tableauVisible ? (
        <button onClick={toggleTableauVisibility}>Masquer la liste</button>
      ) : (
        <button onClick={toggleTableauVisibility}>Afficher la liste</button>
      )}

      {tableauVisible && (
        <ListeCadeauxInfo />
      )}

      {tableauVisible && <AddList />}
    </main>
  );
}
