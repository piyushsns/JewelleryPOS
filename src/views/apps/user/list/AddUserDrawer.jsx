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

import { CircularProgress, FormHelperText, Grid, InputAdornment } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'

import * as v from 'valibot'

import { valibotResolver } from '@hookform/resolvers/valibot'

import { useSession } from 'next-auth/react'

import { toast } from 'react-toastify'

import HttpService from '@/services/http_service.js'

// import useCustomerAPI from '../../../../hooks/useCustomer'

// Vars
const AddCustomerDrawer = ({ open, handleClose, setData, selectedRow, setSelectedRow }) => {
  var customerInitialData = {
    name: '',
    email: '',
    date_of_birth: '',
    gender: '',
    phone: ''
  }

  if (selectedRow) {
    customerInitialData = {
      name: selectedRow.name,
      email: selectedRow.email,
      date_of_birth: selectedRow.date_of_birth,
      gender: selectedRow.gender,
      phone: selectedRow.phone
    }
  }

  var baseCustomerSchema = v.object({
    name: v.string([v.minLength(1, 'This name is required')]),
    email: v.string([v.minLength(1, 'This email is required')]),
    date_of_birth: v.string([v.minLength(1, 'The date of birth is required')]),
    gender: v.string([v.minLength(1, 'This gender is required')]),
    phone: v.string([v.minLength(1, 'This phone is required')])
  })

  if (selectedRow) {
    baseCustomerSchema = v.object({
      name: v.string([v.minLength(1, 'This name is required')]),
      email: v.string([v.minLength(1, 'This email is required')]),
      date_of_birth: v.string([v.minLength(1, 'The date of birth field is required')]),
      gender: v.string([v.minLength(1, 'This gender is required')]),
      phone: v.string([v.minLength(1, 'This phone is required')])
    })
  }

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: valibotResolver(baseCustomerSchema),
    defaultValues: customerInitialData
  })

  // States
  const [formData, setFormData] = useState(customerInitialData)
  const [loading, setLoading] = useState(false)
  const { data: session } = useSession()

  const onSubmit = async formData => {
    setLoading(true)

    if (selectedRow)
      var res = await new HttpService().putData(formData, `admin/customers/${selectedRow.id}`, session?.user?.token)
    else var res = await new HttpService().postData(formData, 'admin/customers', session?.user?.token)

    if (res.success == false && res.exception_type == 'validation') {
      toast.warn(res?.message)
    } else if (res?.user?.id > 0) {
      toast.success(res?.message || 'failed to add Customer')
      reset()
      var refreshCustomers = await new HttpService().getData('admin/customers', session?.user?.token)

      setSelectedRow(null)

      setData(refreshCustomers.data ?? [])
      handleClose()
    }

    setLoading(false)
  }

  useEffect(() => {
    console.log(errors)
  }, [errors])

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <div className='flex items-center justify-between pli-5 plb-[15px]'>
        <Typography variant='h5'>Add New Customer</Typography>
        <IconButton onClick={handleClose}>
          <i className='ri-close-line' />
        </IconButton>
      </div>
      <Divider />
      <div className='p-5'>
        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
          <TextField
            label='Full Name'
            fullWidth
            placeholder='John Doe'
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
          />
          {/* <TextField
            label='Last Name'
            fullWidth
            placeholder='Doe'
            value={formData.last_name}
            onChange={e => setFormData({ ...formData, last_name: e.target.value })}
          /> */}
          <TextField
            label='Date of Birth'
            type='date'
            format='MM/dd/yyyy'
            fullWidth
            placeholder='date_of_birth'
            value={formData.date_of_birth}
            onChange={e => setFormData({ ...formData, date_of_birth: e.target.value })}
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
              {loading && <CircularProgress size={20} color='inherit' />}
              Submit
            </Button>

            {/* <Button variant='outlined' color='error' type='reset' onClick={() => handleReset()}>
              Cancel
            </Button> */}

            <Button variant='outlined' type='reset' onClick={() => reset()}>
              Reset
            </Button>
          </div>
        </form>
      </div>
    </Drawer>
  )
}

export default AddCustomerDrawer
