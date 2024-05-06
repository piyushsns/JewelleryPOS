// Next Imports
import Link from 'next/link'

// MUI Imports
import Grid from '@mui/material/Grid'

// Component imports
import SalesCategory from './sales_by_category'


const Tables = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <SalesCategory />
      </Grid>
    </Grid>
  )
}

export default Tables
