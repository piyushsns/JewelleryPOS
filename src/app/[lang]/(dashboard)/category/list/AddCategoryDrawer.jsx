/* eslint-disable padding-line-between-statements */
// React Imports
import { useState } from 'react'

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

import useCategoryAPI from '../../../../../hooks/useCategory'

// Vars

const AddCategoryDrawer = ({ open, handleClose }) => {
  // States
  const [slug, setSlug] = useState('')

  const initialData = {
    'locale': 'all',
    'name': '',
    'description': '',
    'slug': 'slug',
    'position': '0',
    'display_mode': 'product_and_description',
    "attributes": []
  }

  const [formData, setFormData] = useState(initialData)
  const { storeItem } = useCategoryAPI()

  const handleNameChange = event => {
    const newName = event.target.value
    if (event.target.name == 'slug') {
      const newSlug = newName.toLowerCase().replace(/\s+/g, '-')
      setFormData({ ...formData, [event.target.name]: newSlug })
    } else {
      setFormData({ ...formData, [event.target.name]: event.target.value })
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log('======================================================', formData)
    storeItem(formData)
  }

  // handleClose()
  // setFormData(initialData)
  const handleReset = () => {
    handleClose()
    setFormData({
      name: '',
      description: ''
    })
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleReset}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <div className='flex items-center justify-between pli-5 plb-[15px]'>
        <Typography variant='h5'>Add Category</Typography>
        <IconButton onClick={handleReset}>
          <i className='ri-close-line' />
        </IconButton>
      </div>
      <Divider />
      <div className='p-5'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
          <TextField
            label='Category Name'
            fullWidth
            placeholder='Enter Category Name'
            name='name'
            onChange={e => handleNameChange(e)}
          />
          <TextField
            label='Description'
            fullWidth
            placeholder='Enter Description Name'
            name='description'
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
          />
          <TextField
            label='Slug'
            fullWidth
            placeholder='Enter Slug Name'
            name='slug'
            value={formData.slug}
            onChange={e => handleNameChange(e)}
          />
          <div className='flex items-center gap-4'>
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

export default AddCategoryDrawer
