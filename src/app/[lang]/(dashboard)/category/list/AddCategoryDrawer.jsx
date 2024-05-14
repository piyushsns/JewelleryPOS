'use client'
/* eslint-disable padding-line-between-statements */
// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import { toast } from 'react-toastify'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

import { Card, CardContent, CircularProgress } from '@mui/material'

import * as v from 'valibot'

import { valibotResolver } from '@hookform/resolvers/valibot'
import { Controller, useForm } from 'react-hook-form'

import { minLength, object, string, number, any, optional } from 'valibot'
import { useSession } from 'next-auth/react'

import HttpService from '@/services/http_service'

// Vars

const AddCategoryDrawer = ({
  open,
  handleClose,
  setData,
  selectedRow,
  setSelectedRow,
  categories,
  setCategories,
  setOpen,
  setSelectedCategories
}) => {
  // States
  const [slug, setSlug] = useState('')

  const [position, setPosition] = useState('0') // New position state

  // Attributes state
  const [attributes, setAttributes] = useState(11) // Assuming an initial value

  // console.log(slug)
  var initialData = {
    locale: 'en',
    name: '',
    description: '',
    slug: slug,
    position: position,
    channel: 'default',
    display_mode: 'product_and_description',
    attributes: [attributes]
  }

  if (selectedRow) {
    initialData = {
      name: selectedRow.name,
      description: selectedRow.description,
      slug: selectedRow.slug,
      status: selectedRow.status,
      position: '0',
      attributes: attributes
    }
  }
  var catSchema = v.object({
    name: v.string([v.minLength(1, 'Category name is required')]),
    description: v.string([v.minLength(1, 'This description is required')]),
    slug: v.string([v.minLength(1, 'The slug is required')]),
    position: v.optional(any()),
    attributes: v.optional(any())
  })

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: valibotResolver(catSchema),
    defaultValues: initialData
  })

  if (selectedRow) {
    catSchema = v.object({
      name: v.string([v.minLength(1, 'Category name is required')]),
      description: v.string([v.minLength(1, 'This description is required')]),
      slug: v.string([v.minLength(1, 'This slug is required')])
    })
  }
  const httpService = new HttpService()
  const [errorState, setErrorState] = useState(null)

  const [loading, setLoading] = useState(false)

  const fieldObjectArray = [
    { name: 'name', label: 'Category Name', type: 'text', required: true, size: 6, classNames: '' },
    { name: 'description', label: 'Description', type: 'text', required: true, size: 6, classNames: '' },
    { name: 'slug', label: 'Slug', type: 'text', required: true, size: 6, classNames: '' }
  ]
  const { data: session } = useSession()

  const onSubmit = async formData => {
    setLoading(true)

    // if (selectedRow)
    //   var res = await new HttpService().putData(
    //     formData,
    //     `admin/catalog/categories/${selectedRow.id}`,
    //     session?.user?.token
    //   )
    // else
    var res = await new HttpService().postData(formData, 'admin/catalog/categories', session?.user?.token)
   
    if (res.success == false && res.exception_type == 'validation') {
      toast.warn(res?.message)
    } else if (res?.user?.id > 0) {
      toast.success(res?.message || 'failed to add category')
      reset()
      var refreshCategories = await new HttpService().getData('admin/catalog/categories', session?.user?.token)

      setSelectedRow(null)

      setData(refreshCategories.data ?? [])
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
        <Typography variant='h5'>Add Category</Typography>
        <IconButton onClick={handleClose}>
          <i className='ri-close-line' />
        </IconButton>
      </div>
      <Divider />
      <div className='p-5'>
        <Card fullWidth open={true} maxWidth='md' scroll='body'>
          <CardContent>
            <form className='flex flex-col gap-5' noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={5}>
                {fieldObjectArray.map((fieldobj, index) => (
                  <Grid key={index} item lg={12} sm={12} className={fieldobj.classNames}>
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
      </div>
    </Drawer>
  )
}

export default AddCategoryDrawer
