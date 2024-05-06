'use client'

import { useState } from 'react';

// MUI Imports
import Grid from '@mui/material/Grid'

import PurchaseOrderTable from './purchase_orders_table'
import { Button } from '@mui/material'

import PurchaseOrderForm from './addPurchaseOrder'


const Tables = () => {

  const [Show,Hide]= useState(true);

  const onHandleShow =()=>{
    Hide(!Show)
  }

  return (
    <Grid container spacing={6}>
   {Show ?<Grid className='flex justify-end' item xs={12}>
         <Button variant='contained' onClick={onHandleShow}>
            Add Purchase Orders
         </Button>
      </Grid>:''}
      <Grid item xs={12}>
       {Show ? <PurchaseOrderTable />: <PurchaseOrderForm />}
      </Grid>
    </Grid>
  )
}

export default Tables
