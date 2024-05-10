'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { Card, CardContent, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { toast } from 'react-toastify'

// Vars
const customerDatainitialData = {
  first_name: '',
  last_name: '',
  phone: '',
  email: '',
  status: 1,
  gender: ''
}

const AddNewCustomer = ({ httpService, session, customers, setCustomers }) => {
  const [open, setOpen] = useState(true)

  const [customerData, setCustomerData] = useState(customerDatainitialData)

  const handleClose = async () => {
    setOpen(false)

    var res = await httpService.postData(customerData, 'admin/customers', session?.user?.token)

    setCustomers([...customers, res.data])

    toast.success(res?.message || 'failed to add customer')
  }

  return (
    <Card fullWidth open={open} maxWidth='md' scroll='body'>
      <CardContent>
        <h4>Create New customer</h4>
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='First Name'
                placeholder='John'
                value={customerData?.first_name}
                onChange={e => setCustomerData({ ...customerData, first_name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Last Name'
                placeholder='Doe'
                value={customerData?.last_name}
                onChange={e => setCustomerData({ ...customerData, last_name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Email'
                placeholder='example@example.com'
                value={customerData?.email}
                onChange={e => setCustomerData({ ...customerData, email: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Phone'
                placeholder='XXXXXXXXXX'
                value={customerData?.phone}
                onChange={e => setCustomerData({ ...customerData, phone: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select
                  label='Gender'
                  value={customerData?.gender}
                  onChange={e => setCustomerData({ ...customerData, gender: e.target.value })}
                >
                  <MenuItem value={''}>--Select--</MenuItem>
                  <MenuItem value={'Female'}>Female</MenuItem>
                  <MenuItem value={'Male'}>Male</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant='contained' onClick={handleClose} type='submit'>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default AddNewCustomer
