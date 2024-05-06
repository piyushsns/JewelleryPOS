// Next Imports
import Link from 'next/link'

// MUI Imports
import Grid from '@mui/material/Grid'

// Component imports
import SalesProducts from './sales_by_Product'


const Tables = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <SalesProducts />
      </Grid>
    </Grid>
  )
}

export default Tables
