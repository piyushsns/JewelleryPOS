/* eslint-disable padding-line-between-statements */
// React Imports
import React, { useEffect, useState } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

import UseProductAPI from '../../../../../hooks/useProduct'

// Vars
const initialData = {
  channel: 'default',
  locale: 'en',
  sku: '',
  name: '',
  url_key: 'gold',
  short_description: '',
  description: '',
  price: '',
  per_gram_price: 10,
  making_charges: 0,
  weight: '',
  visible_individually: 1,
  status: '',
  guest_checkout: 1,
  manage_stock: 1,
  inventories: 0,
  categories: [2],
  images: []
}

const AddProductDrawer = ({ open, handleClose }) => {
  // States
  const [formData, setFormData] = useState(initialData)
  const { storeItem ,updateItem} = UseProductAPI()

  const handleSubmit = (e) => {
    e.preventDefault()
    handleClose()
    updateItem(formData.id,formData);
    
  }

  const handleReset = () => {
    handleClose()
  }
  let requestOptions = {
    method: 'GET',
    headers: { Authorization: 'Bearer ' + localStorage.getItem('user-token') }
  }

  const fetchProduct = async () => {
    try {
      var Id = localStorage.getItem('product_id')
      const response = await fetch(
        `https://jewelleryposapi.mytiny.us/api/v1/admin/catalog/products/${Id}`,
        requestOptions
      )
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }

      const datas = await response.json()

      setFormData(datas.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  React.useEffect(() => {
    fetchProduct()
  }, [])



  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleReset}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 500, sm: 500 } } }}
    >
      <div className='flex items-center justify-between pli-5 plb-[15px]'>
        <Typography variant='h5'>Add Product</Typography>
        <IconButton onClick={handleReset}>
          <i className='ri-close-line' />
        </IconButton>
      </div>
      <Divider />
      <div className='p-5'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
          <label>Product Name</label>{' '}
          <TextField
            fullWidth
            placeholder='Enter Product Name'
            value={formData.name}
            name='name'
            onChange={e => setFormData({ ...formData, name: e.target.value })}
          />
          <label>Product Description</label>{' '}
          <TextField
            fullWidth
            placeholder='Enter Sku'
            value={formData.sku}
            onChange={e => setFormData({ ...formData, sku: e.target.value })}
          />
          <label>Description</label>{' '}
          <TextField
            fullWidth
            placeholder='Enter description '
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
          />
          <label>Weight (grams)</label>{' '}
          <TextField
            fullWidth
            placeholder='Enter weight'
            value={formData.weight}
            onChange={e => setFormData({ ...formData, weight: e.target.value })}
          />
          <label>Product Price</label>{' '}
          <TextField
            fullWidth
            placeholder='Enter product price'
            value={formData.price}
            onChange={e => setFormData({ ...formData, price: e.target.value })}
          />
          <label>Product Iamge</label>
          <TextField fullWidth type='file' onChange={e => setFormData({ ...formData, images: e.target.value })} />
          <FormControl fullWidth className='mt-3'>
            <InputLabel id='plan-select'>Select Status</InputLabel>
            <Select
              fullWidth
              id='select-status'
              value={formData.status}
              onChange={e => setFormData({ ...formData, status: e.target.value })}
              label='Select Status'
              labelId='status-select'
              inputProps={{ placeholder: 'Select Status' }}
            >
              <MenuItem selected value='select'>
                {' '}
                Select Status{' '}
              </MenuItem>
              <MenuItem value='active'>Active</MenuItem>
              <MenuItem value='inactive'>Inactive</MenuItem>
            </Select>
          </FormControl>
          <div className='flex items-center gap-4 mt-3'>
            <Button variant='contained' type='submit' >
              Submit
            </Button>
            <Button variant='outlined' color='error' type='reset' onClick={() => handleReset()}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Drawer>
  )
}

export default AddProductDrawer
