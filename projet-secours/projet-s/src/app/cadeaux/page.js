"use client"
// pages/index.js (Home)
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/authContext';

export default function Home() {
  const { user } = useAuth();
  const [tableauVisible, setTableauVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Vérifie si l'utilisateur n'est pas authentifié
    if (!user) {
      // Redirige vers la page de connexion
      router.push('/login');
    }
  }, [user, router]);

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      
        {/* Mettez ici le contenu que vous souhaitez afficher lorsque l'utilisateur est authentifié */}
        <>Pas encore definie</>
    </main>
  );
}
