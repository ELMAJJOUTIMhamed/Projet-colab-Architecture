import React, { useState } from 'react';
import { Box, Button, TextField, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const GiftTableSection = ({ giftLists, setGiftLists, isAddingGift, onAddGift, onAddToCart }) => {
  const [newGift, setNewGift] = useState({ name: '', description: '', price: '', status: '' });

  const handleAddGift = () => {
    onAddGift(newGift);
  };

  const handleAddToCart = () => {
    onAddToCart();
  };

  return (
    <>
      {isAddingGift && (
        <Box mt={2} display="flex" justifyContent="center">
          <TableContainer>
            <Table>
              {/* ... (rest of the code) */}
            </Table>
          </TableContainer>
        </Box>
      )}
      <Box mt={2} display="flex" justifyContent="center">
        <Button variant="contained" color="primary" onClick={handleAddToCart}>
          Ajouter au panier
        </Button>
      </Box>
    </>
  );
};

export default GiftTableSection;
