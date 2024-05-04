// Next Imports
import Link from 'next/link'

// MUI Imports
import Grid from '@mui/material/Grid'

// Component imports
import PurchaseOrders from '@views/react-table/PurchaseOrders'


const Tables = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <PurchaseOrders />
      </Grid>
    </Grid>
  )
}

export default Tables
