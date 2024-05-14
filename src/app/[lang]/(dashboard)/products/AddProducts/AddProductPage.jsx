/* eslint-disable react-hooks/exhaustive-deps */
'use client'

// React Imports
import { useEffect, useState } from 'react'

import { useSession } from 'next-auth/react'

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

import { any, minLength, object, optional, string } from 'valibot'

import HttpService from '@/services/http_service'

const AddProductPage = ({ ProductId, addUserOpen, hideProductlist }) => {
  const [errorState, setErrorState] = useState(null)

  const [productDataLoading, setProductDataLoading] = useState(true)

  const [loading, setLoading] = useState(false)

  const [productData, setProductData] = useState({
    locale: 'en',
    name: '',
    sku: '',
    url_key: 'gold',
    short_description: '',
    description: '',
    price: '',
    weight: '',
    status: '',
    categories: '',
    images: [],
    channel: 'default',
    meta_title: '',
    meta_keywords: '',
    meta_description: '',
    cost: '',
    per_gram_price: '',
    making_charges: '',
    special_price: '',
    special_price_from: '',
    special_price_to: '',
    visible_individually: '1',
    guest_checkout: '1',
    manage_stock: '1'
  })

  const [CategoryData, setCategoryData] = useState([])
  const { data: session } = useSession()

  const schema = object({
    name: string([minLength(1, 'This Product name is required')]),
    sku: string([minLength(1, 'This sku is required')]),
    weight: string([minLength(1, 'This phone is required')]),
    price: string([minLength(1, 'This price is required')]),
    url_key: string([minLength(1, 'This url_key is required')]),
    status: string([minLength(1, 'This url_key is required')]),
    images: optional(any()),
    description: optional(any()),
    short_description: optional(any()),
    categories: optional(any()),
    locale: optional(any()),
    channel: optional(any()),
    meta_title: optional(any()),
    meta_keywords: optional(any()),
    meta_description: optional(any()),
    cost: optional(any()),
    per_gram_price: optional(any()),
    making_charges: optional(any()),
    special_price: optional(any()),
    special_price_from: optional(any()),
    special_price_to: optional(any()),
    visible_individually: optional(any()),
    guest_checkout: optional(any()),
    manage_stock: optional(any())
  })

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: valibotResolver(schema),
    values: productData
  })

  const fieldObjectArray = [
    {
      name: 'name',
      label: 'Product Name',
      type: 'text',
      required: true,
      size: 6,
      classNames: ''
    },
    {
      name: 'sku',
      label: 'Sku',
      type: 'text',
      required: true,
      size: 6,
      classNames: ''
    },
    {
      name: 'description',
      label: 'Description',
      type: 'text',
      required: true,
      size: 6,
      classNames: ''
    },
    {
      name: 'short_description',
      label: 'Short Description',
      type: 'text',
      required: true,
      size: 6,
      classNames: ''
    },
    {
      name: 'price',
      label: 'Price',
      type: 'text',
      required: true,
      size: 6,
      classNames: ''
    },
    {
      name: 'weight',
      label: 'Weight',
      type: 'text',
      required: true,
      size: 6,
      classNames: ''
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      select_type: 'status_select',
      required: true,
      options: ['Active', 'inactive'],
      size: 6,
      classNames: ''
    },
    {
      name: 'categories',
      label: 'Category',
      type: 'select',
      select_type: 'category_select',
      required: true,
      options: CategoryData?.map(category => category),
      size: 6,
      classNames: ''
    },
    { name: 'images', label: 'Product Image', type: 'file', required: true, size: 6, classNames: '', value: `` }
  ]

  const fetchProduct = async () => {
    var res = await new HttpService().getData(`admin/catalog/products/${ProductId}`, session?.user?.token)

    var responseData = {
      locale: 'en',
      name: res.data.name ?? '',
      sku: res.data.sku ?? '',
      url_key: res.data.url_key ?? 'gold',
      short_description: res.data.short_description ?? '',
      description: res.data.description ?? '',
      price: res.data.price ?? '',
      weight: res.data.weight ?? '',
      status: res.data.status == 1 ? Activet : '' ?? '',
      categories: '',
      images: [],
      channel: 'default',
      meta_title: '',
      meta_keywords: '',
      meta_description: '',
      cost: '',
      per_gram_price: '',
      making_charges: '',
      special_price: '',
      special_price_from: '',
      special_price_to: '',
      visible_individually: '1',
      guest_checkout: '1',
      manage_stock: '1'
    }

    setProductData(responseData)

    setProductDataLoading(true)
  }

  const fetchCategory = async () => {
    var res = await new HttpService().getData(`admin/catalog/categories`, session?.user?.token)

    setCategoryData(res.data)

    if (res.success == false && res.exception_type == 'validation') {
      toast.warn(res?.message)
    } else if (res?.data?.id > 0) {
      setOpen(false)
    }
  }

  useEffect(() => {
    if (session?.user?.token) {
      fetchProduct()
      fetchCategory()
    }
  }, [session])

  const onSubmit = async formData => {
    setLoading(true)

    console.log('===============================', formData)

    var res = await new HttpService().putData(formData, `admin/catalog/products/${ProductId}`, session?.user?.token)

    if (res.success == false && res.exception_type == 'validation') {
      hideProductlist()
      toast.warn(res?.message)
      localStorage.setItem('product_id', '')
    } else if (res?.data?.id > 0) {
      toast.success(res?.message || 'failed to add product')
      reset()
      setOpen(false)
    }

    setLoading(false)
  }

  return productDataLoading ? (
    <Card fullWidth open={true} maxWidth='md' scroll='body'>
      <CardContent>
        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            {fieldObjectArray.map((fieldobj, index) => (
              <Grid key={index} item xs={12} sm={12} lg={fieldobj.size} className={fieldobj.classNames}>
                {fieldobj.type === 'text' && (
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    name={fieldobj.name}
                    value={productData[fieldobj.name] || ''}
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
                {fieldobj.select_type === 'status_select' && (
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
                {fieldobj.select_type === 'category_select' && (
                  <FormControl fullWidth>
                    <InputLabel error={Boolean(errors[fieldobj.name])}>{fieldobj.label}</InputLabel>
                    <Controller
                      name={fieldobj.name}
                      control={control}
                      rules={{ required: fieldobj.required }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          label={fieldobj.label}
                          error={Boolean(errors[fieldobj.name])}
                          onChange={e => {
                            field.onChange(e.target.value)
                            errorState !== null && setErrorState(null)
                          }}
                        >
                          {fieldobj.options.map((option, i) => (
                            <MenuItem key={i} value={option.id}>
                              {option.name}
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
  ) : (
    <CircularProgress />
  )
}

export default AddProductPage
