// MUI Imports
import Grid from '@mui/material/Grid'

// Components Imports
import Congratulations from '@views/dashboards/ecommerce/Congratulations'



const DashboardECommerce = async () => {
  // Vars
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={8} className='self-end'>
        <Congratulations />
      </Grid>
    </Grid>
  )
}

export default DashboardECommerce
