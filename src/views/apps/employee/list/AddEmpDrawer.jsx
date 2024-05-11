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

import { blob, custom, forward, maxSize, mimeType, minLength, object, string } from 'valibot'

import { valibotResolver } from '@hookform/resolvers/valibot'

import useEmpAPI from '../../../../hooks/useEmp.js'

// Vars
const AddUserDrawer = ({ open, handleClose }) => {
  const customerDatainitialData = {
    name: 'Piyush Jain',
    email: 'piyush.jain+88@snssystem.com',
    password: '12345678',
    password_confirmation: '12345678',
    role_id: '1',
    status: '1',
    image: ''
  }

  const schema = object(
    {
      name: string([minLength(1, 'This name is required')]),
      email: string([minLength(1, 'This email is required')]),
      role_id: string([minLength(1, 'This role is required')]),
      status: string([minLength(1, 'This status is required')]),
      password: string([
        minLength(1, 'This password is required'),
        minLength(8, 'Password must be at least 8 characters long')
      ]),
      password_confirmation: string([
        minLength(1, 'This confirm password is required'),
        minLength(8, 'Password must be at least 8 characters long')
      ]),
      image: blob('Please select an user profile.', [
        mimeType(['image/jpeg', 'image/png'], 'Please select a JPEG or PNG file.'),
        maxSize(1024 * 1024 * 10, 'Please select a file smaller than 10 MB.')
      ])
    },
    [
      forward(
        custom(input => input.password === input.password_confirmation, 'Passwords do not match.'),
        ['password_confirmation']
      )
    ]
  )

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: valibotResolver(schema),
    defaultValues: customerDatainitialData
  })

  const [isPasswordShown, setIsPasswordShown] = useState(false)

  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false)

  const [loading, setLoading] = useState(false)

  const [fileInput, setFileInput] = useState('')

  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const handleClickShowConfirmPassword = () => setIsConfirmPasswordShown(show => !show)

  const handleFileInputChange = file => {
    const reader = new FileReader()
    const { files } = file.target

    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result)
      reader.readAsDataURL(files[0])

      if (reader.result !== null) {
        setFileInput(reader.result)
      }
    }
  }

  const handleFileInputReset = () => {
    setFileInput('')
    setImgSrc('/images/avatars/1.png')
  }

  const onSubmit = async formData => {
    setLoading(true)
    var res = await httpService.postData(formData, 'admin/settings/users', session?.user?.token)

    if (res.success == false && res.exception_type == 'validation') {
      toast.warn(res?.message)
    } else if (res?.data?.id > 0) {
      setCustomers([...customers, res.data])
      toast.success(res?.message || 'failed to add customer')
      reset()
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
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth>
                <InputLabel error={Boolean(errors.role_id)}>Role</InputLabel>
                <Controller
                  name={'role_id'}
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select label='Role' {...field} error={Boolean(errors.role_id)}>
                      <MenuItem value={1}>Admin</MenuItem>
                    </Select>
                  )}
                />
                {errors.role_id && <FormHelperText error>{errors.role_id.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              {console.log(control)}
              <Controller
                name='image'
                control={control}
                rules={{ required: false }}
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
                          Upload a Profile
                          <input
                            {...field}
                            className="disabled:cursor-not-allowed disabled:opacity-75 sm:text-sm"
                            id="image"
                            name="image"
                            type="file"
                            accept='image/png, image/jpeg'
                            onChange={(event) => onChange(event.target.files?.[0] || null)}
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
