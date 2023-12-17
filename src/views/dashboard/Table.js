import React, { useState, useEffect } from 'react';
import { useCart } from 'src/@core/context/CartContext';
import {
  Box,
  Card,
  Chip,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  Checkbox,
  Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const statusObj = {
  applied: { color: 'info' },
  rejected: { color: 'error' },
  current: { color: 'primary' },
  resigned: { color: 'warning' },
  professional: { color: 'success' },
};

const Img = styled('img')(({ theme }) => ({
  marginBottom: theme.spacing(10),
  [theme.breakpoints.down('lg')]: {
    height: '75px', // Set the desired height
    width: '75px', // Set the desired width
    marginTop: theme.spacing(10)
  },
  [theme.breakpoints.down('md')]: {
    height: '50px', // Set the desired height
    width: '50px' // Set the desired width
  },
  [theme.breakpoints.up('lg')]: {
    height: '100px', // Adjust the height as needed
    width: '100px', // Adjust the width as needed
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(10)
  },
  objectFit: 'cover', // Ensure the image covers the entire container
  display: 'block',
  margin: 'auto',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'
}));

const DashboardTable = () => {
  const { addItem } = useCart();
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/products');
        const data = await response.json();
        setRows(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleCheckboxChange = (event, productId) => {
    if (event.target.checked) {
      setSelectedItems((prevSelectedItems) => [...prevSelectedItems, productId]);
    } else {
      setSelectedItems((prevSelectedItems) => prevSelectedItems.filter((id) => id !== productId));
    }
  };

  const handleSelectAllChange = (event) => {
    setSelectAll(event.target.checked);
    setSelectedItems(event.target.checked ? rows.map((row) => row.ID) : []);
  };

  const handleAddToCart = () => {
    const selectedItemsToAdd = rows.filter((row) => selectedItems.includes(row.ID));
    selectedItemsToAdd.forEach((item) => addItem(item));
    setSelectedItems([]);
    setSelectAll(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Card>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox checked={selectAll} onChange={handleSelectAllChange} />
              </TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Prix</TableCell>
              <TableCell>Date de réservation</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row, index) => (
              <TableRow key={index} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell>
                  <Checkbox
                    checked={selectAll || selectedItems.includes(row.ID)}
                    onChange={(event) => handleCheckboxChange(event, row.ID)}
                    sx={{
                      '&:hover': {
                        animation: 'vibrate 0.3s linear infinite',
                      },
                      '@keyframes vibrate': {
                        '25%': { transform: 'translateX(-1px) translateY(1px)' },
                        '50%': { transform: 'translateX(1px) translateY(-1px)' },
                        '75%': { transform: 'translateX(1px) translateY(1px)' },
                        '100%': { transform: 'translateX(-1px) translateY(-1px)' },
                      },
                    }}
                  />
                </TableCell>
                <TableCell sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}>
                  <Img height="487" alt="error-illustration" src={row.IMAGE_URL} />
                </TableCell>
                <TableCell>{row.DESCRIPTION}</TableCell>
                <TableCell>{row.PRIX}€</TableCell>
                <TableCell>{row.DATE_LIMITE_DE_RESERVATION}</TableCell>
                <TableCell>
                  {row.reduction && (
                    <Chip
                      label={row.reduction}
                      sx={{
                        height: 24,
                        fontSize: '0.75rem',
                        textTransform: 'capitalize',
                        backgroundColor: '#ff9800',
                        color: '#fff',
                        '& .MuiChip-label': { fontWeight: 500 },
                      }}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Box mt={2} display="flex" justifyContent="center">
        <Button variant="contained" color="primary" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </Box>
    </Card>
  );
};

export default DashboardTable;
