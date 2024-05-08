// React Imports
import { useEffect, useState } from 'react'

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
  sku: 'CP001',
  name: 'GOLD',
  url_key: 'gold',
  short_description: '<p>gold Short Description</p>',
  description: '<p>gold Short Description</p>',
  price: 10,
  per_gram_price: 10,
  making_charges: 0,
  weight: 1,
  visible_individually: 1,
  status: 1,
  guest_checkout: 1,
  manage_stock: 1,
  inventories: 0,
  categories: [2]
}

const AddProductDrawer = ({ open, handleClose }) => {
  // States
  const [formData, setFormData] = useState(initialData)
  const { storeItem } = UseProductAPI()

  const handleSubmit = e => {
    e.preventDefault()
    handleClose()

    //setFormData(initialData)
    console.log('======================================================', formData)
    storeItem(formData)
  }

  const handleReset = () => {
    handleClose()
  }

  useEffect(() => {
    if (localStorage.getItem('product_id')) {
      var Id = localStorage.getItem('product_id')
      var ProductData = getItem(Id)

       console.log('ProductData===========================',ProductData)
       
      setFormData({ ...ProductData })
      // eslint-disable-next-line padding-line-between-statements
      if (Id !== '') {
        setAddUserOpen(!addUserOpen)
      }
    }
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
            value={formData.fullName}
            onChange={e => setFormData({ ...formData, fullName: e.target.value })}
          />
          <label>Product Description</label>{' '}
          <TextField
            fullWidth
            placeholder='Enter product description'
            value={formData.fullName}
            onChange={e => setFormData({ ...formData, fullName: e.target.value })}
          />
          <label>Material</label>{' '}
          <TextField
            fullWidth
            placeholder='Enter product material'
            value={formData.fullName}
            onChange={e => setFormData({ ...formData, fullName: e.target.value })}
          />
          <label>Gemstones</label>{' '}
          <TextField
            fullWidth
            placeholder='Enter gemstones used (if any)'
            value={formData.fullName}
            onChange={e => setFormData({ ...formData, fullName: e.target.value })}
          />
          <label>Weight (grams)</label>{' '}
          <TextField
            fullWidth
            placeholder='Enter product weight in grams'
            value={formData.fullName}
            onChange={e => setFormData({ ...formData, fullName: e.target.value })}
          />
          <label>Product Price</label>{' '}
          <TextField
            fullWidth
            placeholder='Enter product price'
            value={formData.fullName}
            onChange={e => setFormData({ ...formData, fullName: e.target.value })}
          />
          <label>Product Iamge</label>
          <TextField
            fullWidth
            value={formData.fullName}
            type='file'
            onChange={e => setFormData({ ...formData, fullName: e.target.value })}
          />
          {/* <TextField
            label='Username'
            fullWidth
            placeholder='johndoe'
            value={formData.username}
            onChange={e => setFormData({ ...formData, username: e.target.value })}
          />
          <TextField
            label='Email'
            fullWidth
            placeholder='johndoe@gmail.com'
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
          />
          <TextField
            label='Company'
            fullWidth
            placeholder='Company PVT LTD'
            value={formData.company}
            onChange={e => setFormData({ ...formData, company: e.target.value })}
          />
          <FormControl fullWidth>
            <InputLabel id='country'>Select Country</InputLabel>
            <Select
              fullWidth
              id='country'
              value={formData.country}
              onChange={e => setFormData({ ...formData, country: e.target.value })}
              label='Select Country'
              labelId='country'
              inputProps={{ placeholder: 'Country' }}
            >
              <MenuItem value='UK'>UK</MenuItem>
              <MenuItem value='USA'>USA</MenuItem>
              <MenuItem value='Australia'>Australia</MenuItem>
              <MenuItem value='Germany'>Germany</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label='Contact'
            type='number'
            fullWidth
            placeholder='(397) 294-5153'
            value={formData.contact}
            onChange={e => setFormData({ ...formData, contact: e.target.value })}
          />
          <FormControl fullWidth>
            <InputLabel id='role-select'>Select Role</InputLabel>
            <Select
              fullWidth
              id='select-role'
              value={formData.role}
              onChange={e => setFormData({ ...formData, role: e.target.value })}
              label='Select Role'
              labelId='role-select'
              inputProps={{ placeholder: 'Select Role' }}
            >
              <MenuItem value='admin'>Admin</MenuItem>
              <MenuItem value='author'>Author</MenuItem>
              <MenuItem value='editor'>Editor</MenuItem>
              <MenuItem value='maintainer'>Maintainer</MenuItem>
              <MenuItem value='subscriber'>Subscriber</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id='plan-select'>Select Plan</InputLabel>
            <Select
              fullWidth
              id='select-plan'
              value={formData.plan}
              onChange={e => setFormData({ ...formData, plan: e.target.value })}
              label='Select Plan'
              labelId='plan-select'
              inputProps={{ placeholder: 'Select Plan' }}
            >
              <MenuItem value='basic'>Basic</MenuItem>
              <MenuItem value='company'>Company</MenuItem>
              <MenuItem value='enterprise'>Enterprise</MenuItem>
              <MenuItem value='team'>Team</MenuItem>
            </Select>
          </FormControl> */}
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
            <Button variant='contained' type='submit'>
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
