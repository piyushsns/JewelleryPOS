'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import { toast } from 'react-toastify'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { Card, CardContent, CircularProgress, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { Controller, useForm } from 'react-hook-form'
import { minLength, object, string } from 'valibot'

const AddNewCustomer = ({ httpService, session, customers, setCustomers }) => {
  // Vars
  const customerDatainitialData = {
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    gender: '',
    password: 'password',
    status: 1
  }

  const schema = object({
    first_name: string([minLength(1, 'This first name is required')]),
    last_name: string([minLength(1, 'This last name is required')]),
    phone: string([minLength(1, 'This phone is required')]),
    email: string([minLength(1, 'This email is required')]),
    gender: string([minLength(1, 'This gender is required')]),
    password: string([
      minLength(1, 'This password is required'),
      minLength(8, 'Password must be at least 8 characters long')
    ])
  })

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: valibotResolver(schema),
    defaultValues: customerDatainitialData
  })

  const [errorState, setErrorState] = useState(null)

  const [loading, setLoading] = useState(false)

  const fieldObjectArray = [
    { name: 'first_name', label: 'First Name', type: 'text', required: true, size: 6, classNames: '' },
    { name: 'last_name', label: 'Last Name', type: 'text', required: true, size: 6, classNames: '' },
    { name: 'email', label: 'Email', type: 'text', required: true, size: 6, classNames: '' },
    { name: 'phone', label: 'Phone', type: 'text', required: true, size: 6, classNames: '' },
    {
      name: 'gender',
      label: 'Gender',
      type: 'select',
      required: true,
      options: ['', 'Male', 'Female'],
      size: 6,
      classNames: ''
    }
  ]

  const onSubmit = async formData => {
    setLoading(true)
    var res = await httpService.postData(formData, 'admin/customers', session?.user?.token)

    setCustomers([...customers, res.data])

    toast.success(res?.message || 'failed to add customer')
    setLoading(false)
    reset()
  }

  return (
    <Card fullWidth open={true} maxWidth='md' scroll='body'>
      <CardContent>
        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            {fieldObjectArray.map((fieldobj, index) => (
              <Grid key={index} item xs={12} sm={12} lg={fieldobj.size} className={fieldobj.classNames}>
                {fieldobj.type === 'text' && (
                  <Controller
                    name={fieldobj.name}
                    control={control}
                    rules={{ required: true }}
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
                  <Controller
                    name={fieldobj.name}
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        field
                        label={fieldobj.label}
                        onChange={e => {
                          field.onChange(e.target.value)
                          errorState !== null && setErrorState(null)
                        }}
                        {...((errors[fieldobj.name] || errorState !== null) && {
                          error: true,
                          helperText: errors[fieldobj.name].message || errorState?.[0]
                        })}
                      >
                        {fieldobj.options.map((option, i) => (
                          <MenuItem key={i} value={option}>
                            {i === 0 ? `--Select ${fieldobj.label}--` : option}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
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
      </CardContent>
    </Card>
  )
}

export default AddNewCustomer
