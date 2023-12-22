import React from 'react';
import { Typography, Button, Box } from '@mui/material';

const CreateListForm = ({ giftLists, setGiftLists }) => {
  return (
    <Box mt={2} display="flex" justifyContent="center">
      {/* Nouvelle ligne après confirmation de l'auteur */}
      <Typography variant="h6">{`Auteur: ${authorName}, Liste: ${listName}`}</Typography>
      <Button variant="contained" color="primary" onClick={handleAddToCart}>
        Ajouter cadeaux
      </Button>
    </Box>
  );
};

export default CreateListForm;
