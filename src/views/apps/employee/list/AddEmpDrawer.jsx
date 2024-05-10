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

import useEmpAPI from '../../../../hooks/useEmp.js'

// Vars
const initialData = {
  name: '',
  email: '',
  status: 1,
  role: {
    id: 1,
    name: 'Administrator',
    description: 'This role users will have all the access',
    permission_type: 'all'
  },
  password: '',
  confirm_pwd: ''
}

// role: '',
// plan: '',
// status: ''

const AddUserDrawer = ({ open, handleClose }) => {
  // States
  const [formData, setFormData] = useState(initialData)
  const { storeItem } = useEmpAPI()

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
      name: '',
      email: '',
      status: '',
      role: {
        id: 1,
        name: '',
        description: '',
        permission_type: 'all'
      },
      password: '',
      confirm_pwd: ''
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
        <Typography variant='h5'>Add New Employee</Typography>
        <IconButton onClick={handleReset}>
          <i className='ri-close-line' />
        </IconButton>
      </div>
      <Divider />
      <div className='p-5'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
          <TextField
            label='Full Name'
            fullWidth
            placeholder='John Doe'
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            label='Email'
            fullWidth
            placeholder='email@example.com'
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
          />
          <TextField
            label='Password'
            type='password'
            fullWidth
            placeholder='Password'
            value={formData.password}
            onChange={e => setFormData({ ...formData, password: e.target.value })}
          />
          <TextField
            label='Confirm Password'
            fullWidth
            placeholder='Confirm Password'
            value={formData.confirm_pwd}
            onChange={e => setFormData({ ...formData, confirm_pwd: e.target.value })}
          />
          {/* <TextField
            label='Company'
            fullWidth
            placeholder='Company PVT LTD'
            value={formData.company}
            onChange={e => setFormData({ ...formData, company: e.target.value })}
          /> */}
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
              <MenuItem value='administrator'>Administrator</MenuItem>
              <MenuItem value='maintainer'>Maintainer</MenuItem>
              {/* <MenuItem value='author'>Author</MenuItem>
              <MenuItem value='editor'>Editor</MenuItem>
              <MenuItem value='subscriber'>Subscriber</MenuItem> */}
            </Select>
          </FormControl>
          {/* <FormControl fullWidth>
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
              <MenuItem value='1'>Active</MenuItem>
              <MenuItem value='0'>Inactive</MenuItem>
            </Select>
          </FormControl>

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
