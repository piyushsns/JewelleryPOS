'use client'
/* eslint-disable padding-line-between-statements */
// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import { toast } from 'react-toastify'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

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

import { useSession } from 'next-auth/react'

// Vars

const AddCategoryDrawer = ({
  open,
  handleClose,
  httpService,
  categories,
  setCategories,
  setOpen,
  setSelectedCategories
}) => {
  // States
  const [slug, setSlug] = useState('')
  console.log(slug)
  const initialData = {
    locale: 'en',
    name: '',
    description: '',
    slug: slug,
    position: '0',
    channel: 'default',

    display_mode: 'product_and_description',
    attributes: [11]
  }

  const schema = object({
    name: string([minLength(1, 'Category name is required')]),
    description: string([minLength(1, 'This description is required')]),
    slug: string([minLength(1, 'The slug is required')])
  })

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: valibotResolver(schema),
    defaultValues: initialData
  })

  const [errorState, setErrorState] = useState(null)

  const [loading, setLoading] = useState(false)

  const fieldObjectArray = [
    { name: 'name', label: 'Category Name', type: 'text', required: true, size: 6, classNames: '' },
    { name: 'description', label: 'Description', type: 'text', required: true, size: 6, classNames: '' },
    { name: 'slug', label: 'Slug', type: 'text', required: true, size: 6, classNames: '' }
  ]
  const { data: session } = useSession()

  const onSubmit = async formData => {
    // setLoading(true)
    console.log(session?.user?.token)

    var res = await httpService.postData(formData, 'admin/catalog/categories', session?.user?.token)
    console.log(formData)
    if (res.success == false && res.exception_type == 'validation') {
      toast.warn(res?.message)
    } else if (res?.data?.id > 0) {
      setCategories([...categories, res.data])
      toast.success(res.message)
      reset()
      setOpen(false)
      setSelectedCategories(res.data)
    }

    setLoading(false)
  }

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
