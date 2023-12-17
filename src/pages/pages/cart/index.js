import React from 'react';
import { useCart } from 'src/@core/context/CartContext';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box } from '@mui/material';
import Link from 'next/link';

const Cart = () => {
  const { cart, removeItem, clearCart } = useCart();

  // Calculate the total amount
  const totalAmount = cart.reduce((total, item) => total + item.PRIX * item.quantity, 0);

  return (
    <Box>
      <h2>Mon Panier</h2>
      {cart.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>Prix</TableCell>
                <TableCell>Quantité</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.DESCRIPTION}</TableCell>
                  <TableCell>{item.PRIX}€</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    <Button variant="outlined" size="small" onClick={() => removeItem(item.ID)}>
                      Retirer
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {/* New row for displaying the total */}
              <TableRow>
                <TableCell colSpan={3} align="right"><strong>Total:</strong></TableCell>
                <TableCell align="right"><strong>{totalAmount.toFixed(2)}€</strong></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>Panier Vide</p>
      )}
      <Button variant="contained" size="small" onClick={() => clearCart()}>
        Vider le Panier
      </Button>
      <Link href="/">
        <a>
          <Button variant="contained" size="small" sx={{ marginLeft: 2 }}>
            Gift list
          </Button>
        </a>
      </Link>
    </Box>
  );
};

export default Cart;
