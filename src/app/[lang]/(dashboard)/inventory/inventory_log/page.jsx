// Next Imports
import Link from 'next/link'

// MUI Imports
import Grid from '@mui/material/Grid'

// Component imports
import EnhancedTable from './inventory_log'

const Tables = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <EnhancedTable />
      </Grid>
    </Grid>
  )
}

export default Tables
