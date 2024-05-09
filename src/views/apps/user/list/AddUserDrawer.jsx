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

import useCustomerAPI from '../../../../hooks/useCustomer'

// Vars
const initialData = {
  first_name: '',
  last_name: '',
  email: '',
  dob: '',
  gender: '',
  phone: ''
}

// role: '',
// plan: '',
// status: ''

const AddUserDrawer = ({ open, handleClose }) => {
  // States
  const [formData, setFormData] = useState(initialData)
  const { storeItem } = useCustomerAPI()

  const handleSubmit = e => {
    e.preventDefault()
    handleClose()

    //setFormData(initialData)
    console.log('======================================================', formData)
    storeItem(formData)
  }

  const handleReset = () => {
    handleClose()
    setFormData({
      first_name: '',
      last_name: '',
      email: '',
      dob: '',
      gender: '',
      phone: ''
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
        <Typography variant='h5'>Add New Customer</Typography>
        <IconButton onClick={handleReset}>
          <i className='ri-close-line' />
        </IconButton>
      </div>
      <Divider />
      <div className='p-5'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
          <TextField
            label='First Name'
            fullWidth
            placeholder='John'
            value={formData.first_name}
            onChange={e => setFormData({ ...formData, first_name: e.target.value })}
          />
          <TextField
            label='Last Name'
            fullWidth
            placeholder='Doe'
            value={formData.last_name}
            onChange={e => setFormData({ ...formData, last_name: e.target.value })}
          />
          <TextField
            label='Date of Birth'
            type='date'
            format='MM/dd/yyyy'
            fullWidth
            placeholder='dob'
            value={formData.dob}
            onChange={e => setFormData({ ...formData, dob: e.target.value })}
          />
          <TextField
            label='Email'
            fullWidth
            placeholder='test@example.com'
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
          />
          {/* <TextField
            label='Company'
            fullWidth
            placeholder='Company PVT LTD'
            value={formData.company}
            onChange={e => setFormData({ ...formData, company: e.target.value })}
          /> */}
          <FormControl fullWidth>
            <InputLabel id='country'>Select Gender</InputLabel>
            <Select
              fullWidth
              id='country'
              value={formData.gender}
              onChange={e => setFormData({ ...formData, gender: e.target.value })}
              label='Select Gender'
              labelId='country'
              inputProps={{ placeholder: 'Gender' }}
            >
              <MenuItem value='male'>Male</MenuItem>
              <MenuItem value='female'>Female</MenuItem>
              <MenuItem value='other'>Other</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label='Contact Number'
            type='number'
            fullWidth
            placeholder='(397) 294-5153'
            value={formData.phone}
            onChange={e => setFormData({ ...formData, phone: e.target.value })}
          />
          {/* <FormControl fullWidth>
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
          </FormControl>
          <FormControl fullWidth>
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
              <MenuItem value='pending'>Pending</MenuItem>
              <MenuItem value='active'>Active</MenuItem>
              <MenuItem value='inactive'>Inactive</MenuItem>
            </Select>
          </FormControl> */}
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

export default AddUserDrawer
