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

// Vars
const AddUserDrawer = ({ open, handleClose, setData, selectedRow, setSelectedRow }) => {
  var employeeDatainitialData = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role_id: '',
    status: '',
    image: ''
  }

  if (selectedRow) {
    employeeDatainitialData = {
      name: selectedRow.name,
      email: selectedRow.email,
      role_id: selectedRow.role.id + '',
      status: selectedRow.status + '',
      image: '',
      password: ''
    }
  }

  var baseSchema = v.object(
    {
      name: v.string([v.minLength(1, 'This name is required')]),
      email: v.string([v.minLength(1, 'This email is required')]),
      role_id: v.string([v.minLength(1, 'This role is required')]),
      status: v.string([v.minLength(1, 'This status is required')]),
      password: v.string([
        v.minLength(1, 'This password is required'),
        v.minLength(8, 'Password must be at least 8 characters long')
      ]),
      password_confirmation: v.string([
        v.minLength(1, 'This confirm password is required'),
        v.minLength(8, 'Password must be at least 8 characters long')
      ]),
      image: v.optional(v.string())

      // v.blob('Please select an image file.', [
      //   v.mimeType(['image/jpeg', 'image/png'], 'Please select a JPEG or PNG file.'),
      //   v.maxSize(1024 * 1024 * 10, 'Please select a file smaller than 10 MB.')
      // ])
      // )
    },
    v.forward(
      v.custom(input => input.password === input.password_confirmation, 'Passwords do not match.'),
      ['password_confirmation']
    )
  )

  if (selectedRow) {
    baseSchema = v.object({
      name: v.string([v.minLength(1, 'This name is required')]),
      email: v.string([v.minLength(1, 'This email is required')]),
      role_id: v.string([v.minLength(1, 'This role is required')]),
      status: v.string([v.minLength(1, 'This status is required')]),
      password: v.optional(v.string()),
      image: v.optional(v.string())
    })
  }

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: valibotResolver(baseSchema),
    defaultValues: employeeDatainitialData
  })

  const [isPasswordShown, setIsPasswordShown] = useState(false)

  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false)

  const [loading, setLoading] = useState(false)

  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const handleClickShowConfirmPassword = () => setIsConfirmPasswordShown(show => !show)

  const { data: session } = useSession()

  const handleFileInputChange = (file, onChangeEvent) => {
    const reader = new FileReader()
    const { files } = file.target

    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result)
      reader.readAsDataURL(files[0])
      onChangeEvent(files[0] || null)
    }
  }

  const handleFileInputReset = () => {
    setImgSrc('/images/avatars/1.png')
  }

  const onSubmit = async formData => {
    setLoading(true)

    if (selectedRow)
      var res = await new HttpService().putData(
        formData,
        `admin/settings/users/${selectedRow.id}`,
        session?.user?.token
      )
    else var res = await new HttpService().postData(formData, 'admin/settings/users', session?.user?.token)

    if (res.success == false && res.exception_type == 'validation') {
      toast.warn(res?.message)
    } else if (res?.user?.id > 0) {
      toast.success(res?.message || 'failed to add employee')
      reset()
      var refreshEmplopyees = await new HttpService().getData('admin/settings/users', session?.user?.token)

      setSelectedRow(null)

      setData(refreshEmplopyees.data ?? [])
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
        <Typography variant='h5'>Add New Employee</Typography>
        <IconButton onClick={handleClose}>
          <i className='ri-close-line' />
        </IconButton>
      </div>

      <Divider />
      <div className='p-5'>
        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12}>
              <Controller
                name='name'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Full Name'
                    placeholder='Jonh Doe'
                    {...(errors.name && { error: true, helperText: errors.name.message })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Controller
                name='email'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type='email'
                    label='Email'
                    placeholder='johndoe@gmail.com'
                    {...(errors.email && { error: true, helperText: errors.email.message })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Controller
                name='password'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Password'
                    placeholder='············'
                    id='stepper-linear-validation-password'
                    type={isPasswordShown ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onClick={handleClickShowPassword}
                            onMouseDown={e => e.preventDefault()}
                            aria-label='toggle password visibility'
                          >
                            <i className={isPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    {...(errors.password && { error: true, helperText: errors.password.message })}
                  />
                )}
              />
            </Grid>
            {selectedRow === null && (
              <Grid item xs={12} sm={12}>
                <Controller
                  name='password_confirmation'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='Confirm Password'
                      placeholder='············'
                      id='stepper-linear-password_confirmation'
                      type={isConfirmPasswordShown ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onClick={handleClickShowConfirmPassword}
                              onMouseDown={e => e.preventDefault()}
                              aria-label='toggle password visibility'
                            >
                              <i className={isConfirmPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                      {...(errors['password_confirmation'] && {
                        error: true,
                        helperText: errors['password_confirmation'].message
                      })}
                    />
                  )}
                />
              </Grid>
            )}
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth>
                <InputLabel error={Boolean(errors.role_id)}>Role</InputLabel>
                <Controller
                  name={'role_id'}
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select label='Role' {...field} error={Boolean(errors.role_id)}>
                      <MenuItem value={'1'}>Admin</MenuItem>
                    </Select>
                  )}
                />
                {errors.role_id && <FormHelperText error>{errors.role_id.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth>
                <InputLabel error={Boolean(errors.status)}>Status</InputLabel>
                <Controller
                  name={'status'}
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select label='Status' {...field} error={Boolean(errors.status)}>
                      <MenuItem value={'1'}>Active</MenuItem>
                      <MenuItem value={'0'}>InActive</MenuItem>
                    </Select>
                  )}
                />
                {errors.role_id && <FormHelperText error>{errors.role_id.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Controller
                name='image'
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <div className='flex items-start sm:items-center gap-6'>
                    <img height={100} width={100} className='rounded' src={imgSrc} alt='UserProfile' />
                    <div className='flex flex-grow flex-col gap-4'>
                      <div className='flex flex-col sm:flex-row gap-4'>
                        <Button
                          component='label'
                          size='small'
                          variant='contained'
                          htmlFor='account-settings-upload-image'
                        >
                          Upload New Photo
                          <input
                            hidden
                            type='file'
                            accept='image/png, image/jpeg'
                            id='account-settings-upload-image'
                            onChange={event => handleFileInputChange(event, onChange)}
                          />
                        </Button>
                        <Button size='small' variant='outlined' color='error' onClick={() => handleFileInputReset()}>
                          Reset
                        </Button>
                      </div>
                      <Typography>Allowed JPG, GIF or PNG. Max size of 800K</Typography>
                      {errors.image && (
                        <Typography style={{ color: 'var(--mui-palette-error-main)' }}>
                          {errors.image.message}
                        </Typography>
                      )}
                    </div>
                  </div>
                )}
              />
            </Grid>
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

export default AddUserDrawer
