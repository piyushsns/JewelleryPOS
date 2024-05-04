// Next Imports
import Link from 'next/link'

// MUI Imports
import Grid from '@mui/material/Grid';

import SupliersList from '@views/react-table/SupliersList'


const Tables = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <SupliersList />
      </Grid>
    </Grid>
  )
}

export default Tables
