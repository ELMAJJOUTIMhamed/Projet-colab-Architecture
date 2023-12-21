import React from 'react';
import { Box, Button, TextField } from '@mui/material';

const ListCreationSection = ({ onListCreate }) => {
  const handleCreateList = () => {
    onListCreate();
  };

  return (
    <Box mt={2} display="flex" justifyContent="center">
      <Button variant="contained" color="secondary" onClick={handleCreateList}>
        Créer une liste
      </Button>
    </Box>
  );
};

export default ListCreationSection;
