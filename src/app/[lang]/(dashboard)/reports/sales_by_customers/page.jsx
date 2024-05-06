// Next Imports
import Link from 'next/link'

// MUI Imports
import Grid from '@mui/material/Grid'

// Component imports
import SalesCustomers from './sales_by_customers'


const Tables = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <SalesCustomers />
      </Grid>
    </Grid>
  )
}

export default Tables
