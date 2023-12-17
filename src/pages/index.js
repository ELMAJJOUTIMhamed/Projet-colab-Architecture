// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Table from 'src/views/dashboard/Table'
import Trophy from 'src/views/dashboard/Trophy'

// import TotalEarning from 'src/views/dashboard/TotalEarning'
// import StatisticsCard from 'src/views/dashboard/StatisticsCard'
// import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
// import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
// import SalesByCountries from 'src/views/dashboard/SalesByCountries'
import { useAuth } from 'src/@core/context/AuthContext'
import router from 'next/router'
import { useEffect } from 'react'


export const AuthWrapper = ({ children }) => {
  const { isLoggedIn} = useAuth();
  
  useEffect(() => {

    // Redirigez vers la page de connexion si l'utilisateur n'est pas connecté
    if (!isLoggedIn) {
      // Utilisez la fonction useRouter de Next.js pour gérer la navigation
      router.push('/pages/login');
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    // Affichez un message ou une interface de chargement si nécessaire
    return <p>Vous n'êtes pas connecté. Redirection en cours...</p>;
  }

  // Si l'utilisateur est connecté, affichez le contenu
  return <>{children}</>
}


const Dashboard = () => {

  return (
    <AuthWrapper>
        <ApexChartWrapper>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Trophy />
            </Grid>
            <Grid item xs={12}>
              <Table />
            </Grid>
          </Grid>
        </ApexChartWrapper>
    </AuthWrapper>
  )
}

export default Dashboard
