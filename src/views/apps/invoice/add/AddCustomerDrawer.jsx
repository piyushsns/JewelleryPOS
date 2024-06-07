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

const AddCustomerDrawer = ({ open, handleClose, setData, selectedRow, setSelectedRow }) => {
  var customerInitialData = {
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    phone: ''
  }

  if (selectedRow) {
    customerInitialData = {
      first_name: selectedRow.first_name,
      last_name: selectedRow.last_name,
      email: selectedRow.email,
      gender: selectedRow.gender,
      phone: selectedRow.phone
    }
  }

  var baseCustomerSchema = v.object({
    first_name: v.string([v.minLength(1, 'This name is required')]),
    last_name: v.string([v.minLength(1, 'This name is required')]),
    email: v.string([v.minLength(1, 'This email is required')]),
    gender: v.string([v.minLength(1, 'This gender is required')]),
    phone: v.string([v.minLength(1, 'This phone is required')])
  })

  if (selectedRow) {
    baseCustomerSchema = v.object({
      first_name: v.string([v.minLength(1, 'This name is required')]),
      last_name: v.string([v.minLength(1, 'This name is required')]),
      email: v.string([v.minLength(1, 'This email is required')]),
      gender: v.string([v.minLength(1, 'This gender is required')]),
      phone: v.string([v.minLength(1, 'This phone is required')])
    })
  }

  const fieldObjectArray = [
    {
      name: 'first_name',
      label: 'First Name',
      type: 'text',
      required: true,
      size: 12,
      classNames: ''
    },
    {
      name: 'last_name',
      label: 'Last Name',
      type: 'text',
      required: true,
      size: 12,
      classNames: ''
    },
    {
      name: 'email',
      label: 'Email',
      type: 'text',
      required: true,
      size: 12,
      classNames: ''
    },
    {
      name: 'gender',
      label: 'Gender',
      type: 'select',
      options: ['Male', 'Female', 'Other'],
      required: true,
      size: 12,
      classNames: ''
    },
    {
      name: 'phone',
      label: 'Contact Number',
      type: 'text',
      required: true,
      size: 12,
      classNames: ''
    }
  ]

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: valibotResolver(baseCustomerSchema),
    defaultValues: customerInitialData
  })

  const [loading, setLoading] = useState(false)
  const [errorState, setErrorState] = useState(null)
  const { data: session } = useSession()

  const onSubmit = async formData => {
    console.log('------------------------------------', selectedRow)
    setLoading(true)

    if (selectedRow)
      var res = await new HttpService().putData(formData, `admin/customers/${selectedRow.id}`, session?.user?.token)
    else var res = await new HttpService().postData(formData, 'admin/customers', session?.user?.token)

    if (res.success == false && res.exception_type == 'validation') {
      toast.warn(res?.message)
    } else if (res?.user?.id > 0) {
      toast.success(res?.message || 'Customer added successfully!')
      reset()
      var refreshCustomers = await new HttpService().getData('admin/customers', session?.user?.token)

      setSelectedRow(null)
      setData(refreshCustomers.data ?? [])

      setTimeout(() => {
        window.location.reload()
      }, 500)
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
        <IconButton  onClick={handleClose}>
          <i className='ri-close-line' />
        </IconButton>
      </div>
      <Divider />
      <div className='p-5'>
        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
          <Grid container spacing={5}>
            {fieldObjectArray.map((fieldobj, index) => (
              <Grid key={index} item xs={12} sm={12} lg={fieldobj.size} className={fieldobj.classNames}>
                {fieldobj.type === 'text' && (
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    name={fieldobj.name}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        autoFocus
                        type={fieldobj.type}
                        label={fieldobj.label}
                        onChange={e => {
                          field.onChange(e.target.value)
                          errorState !== null && setErrorState(null)
                        }}
                        {...((errors[fieldobj.name] || errorState !== null) && {
                          error: true,
                          helperText: errors[fieldobj.name].message || errorState?.[0]
                        })}
                      />
                    )}
                  />
                )}

                {fieldobj.type === 'select' && (
                  <FormControl fullWidth>
                    <InputLabel error={Boolean(errors[fieldobj.name])}>{fieldobj.label}</InputLabel>
                    <Controller
                      name={fieldobj.name}
                      control={control}
                      rules={{ required: fieldobj.required }}
                      render={({ field }) => (
                        <Select {...field} label={fieldobj.label} error={Boolean(errors[fieldobj.name])}>
                          {fieldobj.options.map((option, i) => (
                            <MenuItem key={i} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                    {errors[fieldobj.name] && <FormHelperText error>{errors[fieldobj.name].message}</FormHelperText>}
                  </FormControl>
                )}
              </Grid>
            ))}
            <Grid item xs={12} sm={12} className='flex gap-4'>
              <Button variant='contained' type='submit' className='gap-2'>
                {loading && <CircularProgress size={20} color='inherit' />}
                Submit
              </Button>
              <Button variant='outlined' type='reset' onClick={() => reset()}>
                Reset
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Drawer>
  )
}

export default AddCustomerDrawer
