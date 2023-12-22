"use client"

// pages/index.js (Home)
import { useState } from 'react';
import AuthentificationForm from '@/components/auth/AuthentificationForm';

export default function Home() {
  const [tableauVisible, setTableauVisible] = useState(false);

  const toggleTableauVisibility = () => {
    setTableauVisible(!tableauVisible);
  };

  const handleAuthentication = ({ nom, estVisiteur }) => {
    setNomUtilisateur(nom);
    setAuthenticated(true);
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen">
        <AuthentificationForm onAuthenticate={handleAuthentication} />
      
    </main>
  );
}
