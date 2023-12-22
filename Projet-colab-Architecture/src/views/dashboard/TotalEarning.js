import React, { useState } from 'react';
import { useCart } from 'src/@core/context/CartContext';
import {
  Box,
  Card,
  Button,
} from '@mui/material';
import GiftTable from './GiftListTable';
import CreateListForm from './CreateListForm';

const DashboardTable = () => {
  const { addItem } = useCart();
  const [giftLists, setGiftLists] = useState([]);
  const [isAddingGift, setIsAddingGift] = useState(false);

  const handleCreateList = () => {
    // Crée une nouvelle liste de cadeaux
    const newGiftList = [...giftLists, []];
    setGiftLists(newGiftList);
    // Active l'ajout de cadeaux à la nouvelle liste
    setIsAddingGift(true);
  };

  const handleAddToCart = () => {
    // Ajoute les éléments de la liste en cours de création au panier
    giftLists.forEach((giftList) => {
      giftList.forEach((gift) => addItem(gift));
    });
    // Réinitialise l'état des cadeaux et des informations sur le nouveau cadeau
    setGiftLists([]);
    // Masque la zone de saisie
    setIsAddingGift(false);
  };

  return (
    <Card>
      <Box mt={2} display="flex" justifyContent="center">
        {/* Bouton pour créer une nouvelle liste */}
        <Button variant="contained" color="secondary" onClick={handleCreateList}>
          Créer une liste
        </Button>
      </Box>

      {isAddingGift ? (
        <CreateListForm giftLists={giftLists} setGiftLists={setGiftLists} />
      ) : null}

      <Box mt={2} display="flex" justifyContent="center">
        {/* Bouton pour ajouter la liste au panier */}
        <Button variant="contained" color="primary" onClick={handleAddToCart}>
          Ajouter au panier
        </Button>
      </Box>
    </Card>
  );
};

export default DashboardTable;
