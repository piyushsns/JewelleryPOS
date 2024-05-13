'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import { toast } from 'react-toastify'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import {
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { Controller, useForm } from 'react-hook-form'

import { minLength, object, string } from 'valibot'

import ProductListTable from '../list/ProductListTable'

const AddProductPage = ({ addUserOpen,setAddUserOpen }) => {
  // Vars
  const productDatainitialData = {
    locale: 'en',
    name: '',
    sku: '',
    url_key: 'gold',
    short_description: '',
    description: '',
    price: '',
    weight: '',
    categories: [],
    images: [],
    channel: 'default'
  }

  const schema = object({
    name: string([minLength(1, 'This Product name is required')]),
    sku: string([minLength(1, 'This sku is required')]),
    weight: string([minLength(1, 'This phone is required')]),
    price: string([minLength(1, 'This price is required')]),
    categories: string([minLength(1, 'This categories is required')]),
    images: string([minLength(1, 'This images is required')])
  })

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: valibotResolver(schema),
    defaultValues: productDatainitialData
  })

  const [errorState, setErrorState] = useState(null)
  const [HideAddProsuctForm, setHideAddProsuctForm] = useState(false)

  const [loading, setLoading] = useState(false)

  const fieldObjectArray = [
    { name: 'name', label: 'Product Name', type: 'text', required: true, size: 6, classNames: '' },
    { name: 'sku', label: 'Sku', type: 'text', required: true, size: 6, classNames: '' },
    { name: 'description', label: 'Description', type: 'text', required: true, size: 6, classNames: '' },
    { name: 'short_description', label: 'Short Description', type: 'text', required: true, size: 6, classNames: '' },
    { name: 'price', label: 'Price', type: 'text', required: true, size: 6, classNames: '' },
    { name: 'weight', label: 'Weight', type: 'text', required: true, size: 6, classNames: '' },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      options: ['Active', 'inactive'],
      size: 6,
      classNames: ''
    },
    {
      name: 'categories',
      label: 'Categories',
      type: 'select',
      required: true,
      options: ['Male', 'Female'],
      size: 6,
      classNames: ''
    },
    { name: 'images', label: 'Product Image', type: 'file', required: true, size: 6, classNames: '' }
  ]

  const onSubmit = async formData => {
    setLoading(true)
  console.log('HideAddProsuctFormHideAddProsuctFormHideAddProsuctFormHideAddProsuctFormHideAddProsuctForm',HideAddProsuctForm);

    <ProductListTable   HideAddProsuctForm={HideAddProsuctForm} />

    // var res = await httpService.postData(formData, `admin/catalog/products/${Id}`, session?.user?.token)

    // if (res.success == false && res.exception_type == 'validation') {
    //   toast.warn(res?.message)
    // } else if (res?.data?.id > 0) {
    //   // setproducts([...products, res.data])
    //   toast.success(res?.message || 'failed to add product')
    //   reset()
    //   setOpen(false)

    //     {<ProductListTable   setHideAddProsuctForm={true} />}

      // setSelectedproduct(res.data)

    // }

    setLoading(false)
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
                {fieldobj.type === 'file' && (
                  <Controller
                    name={fieldobj.name}
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <>

                      <label>{fieldobj.label}</label>
                       <TextField
                        {...field}
                        fullWidth
                        autoFocus
                        type={fieldobj.type}
                        onChange={e => {
                          field.onChange(e.target.value)
                          errorState !== null && setErrorState(null)
                        }}
                        {...((errors[fieldobj.name] || errorState !== null) && {
                          error: true,
                          helperText: errors[fieldobj.name].message || errorState?.[0]
                        })}
                      />
                      </>
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
      </CardContent>
    </Card>
  )
}

export default AddProductPage
