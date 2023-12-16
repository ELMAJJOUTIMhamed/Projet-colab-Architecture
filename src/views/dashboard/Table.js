// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import { styled } from '@mui/material/styles'
import Checkbox from '@mui/material/Checkbox'
import { useState, useEffect } from 'react'

// const rows = [
//   {
//     image: '/images/cadeau/roses.png',
//     description: 'Bouquet de roses rouges',
//     prix: '25.99 €',
//     date_reservation: '2023-02-14',
//     reduction: '5%'
//   },
//   {
//     image: '/images/cadeau/collier.png',
//     description: 'Collier en argent avec pendentif cœur',
//     prix: '59.99 €',
//     date_reservation: '2023-03-08',
//     reduction: '20%'
//   },
//   {
//     image: '/images/cadeau/bouffe.webp',
//     description: 'Panier-cadeau gourmand',
//     prix: '39.99 €',
//     date_reservation: '2023-04-20',
//     reduction: '15%'
//   },
//   {
//     image: '/images/cadeau/montre.png',
//     description: 'Montre élégante en cuir',
//     prix: '79.99 €',
//     date_reservation: '2023-05-15'
//     // reduction: '5%'
//   },
//   {
//     image: '/images/cadeau/thé.png',
//     description: 'Ensemble de thé artisanal',
//     prix: '29.99 €',
//     date_reservation: '2023-06-10'
//     // reduction: '5%'
//   },
//   {
//     image: '/images/cadeau/robe.webp',
//     description: 'robe de princesse pour enfant',
//     prix: 'prix: 71,75€',
//     date_reservation: '2023-07-02'
//     // reduction: '10%'
//   },
//   {
//     image: '/images/cadeau/tablette.webp',
//     description: 'Tablette tactile dernière génération',
//     prix: '199.99 €',
//     date_reservation: '2023-08-18'
//     // reduction: '25%'
//   },
//   {
//     image: '/images/cadeau/cuisine.jpg',
//     description: 'Cours de cuisine avec un chef étoilé',
//     prix: '89.99 €',
//     date_reservation: '2023-09-25'
//     // reduction: '5%'
//   },
//   {
//     image: '/images/cadeau/echarpe.jpg',
//     description: 'Écharpe en laine faite à la main',
//     prix: '34.99 €',
//     date_reservation: '2023-10-12'
//     // reduction: '10%'
//   },
//   {
//     image: '/images/cadeau/spa.jpg',
//     description: 'Soin spa et massage relaxant',
//     prix: '69.99 €',
//     date_reservation: '2023-11-30'
//     // reduction: '35%'
//   }
// ]
const statusObj = {
  applied: { color: 'info' },
  rejected: { color: 'error' },
  current: { color: 'primary' },
  resigned: { color: 'warning' },
  professional: { color: 'success' }
}

// const Img = styled('img')(({ theme }) => ({
//   marginBottom: theme.spacing(10),
//   [theme.breakpoints.down('lg')]: {
//     height: 50, // Adjust the height as needed
//     width: 'auto', // Maintain aspect ratio
//     marginTop: theme.spacing(10)
//   },
//   [theme.breakpoints.down('md')]: {
//     height: 35, // Adjust the height as needed
//     width: 'auto' // Maintain aspect ratio
//   },
//   [theme.breakpoints.up('lg')]: {
//     marginTop: theme.spacing(13),
//     height: 100, // Adjust the height as needed
//     width: 'auto', // Maintain aspect ratio
//     marginTop: theme.spacing(10)
//   },
//   style: {
//     objectFit: 'cover' // Ensure the image covers the entire container
//   }
// }))

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


// ... (previous imports)

const DashboardTable = () => {

  const [rows, setRows] = useState([]);

  useEffect(() => {
    // Fetch data when the component mounts
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

  return (
    <Card>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell></TableCell> {/* New cell for selection checkbox */}
              <TableCell>Image</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Prix</TableCell>
              <TableCell>Date de réservation</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell>
                  <Checkbox
                    sx={{
                      '&:hover': {
                        animation: 'vibrate 0.3s linear infinite', // Add vibration animation on hover
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
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  <Img height='487' alt='error-illustration' src={row.IMAGE_URL} />
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
                        backgroundColor: '#ff9800', // Set your desired bright color
                        color: '#fff', // Set text color for visibility
                        '& .MuiChip-label': { fontWeight: 500 }
                      }}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default DashboardTable

