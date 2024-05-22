'use client'

import { useState } from 'react';

import { toast } from 'react-toastify';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { Card, CardContent, CircularProgress, FormHelperText } from '@mui/material';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { Controller, useForm } from 'react-hook-form';

import { minLength, object, string } from 'valibot';



const AddCustomerDrawer = ({httpService, open, setOpen, session, customers, setCustomers, setSelectedCustomer }) => {

  const initialFormData = {
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    gender: '',
    password: 'password',
    status: 1
  };

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
  });

  const { control,
         reset,
         handleSubmit,
         formState: { errors }
         } = useForm({
        resolver: valibotResolver(schema),
        defaultValues: initialFormData
  });


  const [errorState, setErrorState] = useState(null);
  const [loading, setLoading] = useState(false);

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
      options: ['Male', 'Female'],
      size: 6,
      classNames: ''
    }
  ];

  const onSubmit = async formData => {
    setLoading(true);
    setErrorState(null);

    console.log("Submitting form data:", formData); // Log form data before submission

    try {
      const res = await httpService.postData(formData, 'admin/customers', session?.user?.token);

      console.log("API response:", res); // Log the API response

      if (res.success === false && res.exception_type === 'validation') {
        toast.warn(res.message);
      } else if (res?.data?.id > 0) {
        setCustomers(prev => [...prev, res.data]);
        toast.success(res.message || 'Successfully added customer');
        reset();
        setOpen(false);
        setSelectedCustomer(res.data);
      }
    } catch (error) {
      console.error('Error occurred while adding the customer:', error); // Log any errors
      toast.error('An error occurred while adding the customer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer
      open={open}
      anchor="right"
      variant="temporary"
      onClose={() => setOpen(false)}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <div className="flex items-center justify-between pli-5 plb-[15px]">
        <Typography variant="h6">Add New Customer</Typography>
        <IconButton onClick={() => setOpen(false)}>
          <i className="ri-close-line" />
        </IconButton>
      </div>
      <Divider />
      <Card>
        <CardContent>
          <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
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
                            field.onChange(e.target.value);
                            errorState !== null && setErrorState(null);
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
              <Grid item xs={12} sm={12} className="flex gap-4">
                <Button variant="contained" type="submit" className="gap-2" disabled={loading}>
                  {loading && <CircularProgress size={20} color="inherit" />}
                  Submit
                </Button>
                <Button variant="outlined" type="reset" onClick={() => reset()}>
                  Reset
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Drawer>
  );
};

export default AddCustomerDrawer;





// // React Imports
// import { useState } from 'react'

// // MUI Imports
// import Drawer from '@mui/material/Drawer'
// import IconButton from '@mui/material/IconButton'
// import Typography from '@mui/material/Typography'
// import TextField from '@mui/material/TextField'
// import Select from '@mui/material/Select'
// import MenuItem from '@mui/material/MenuItem'
// import Button from '@mui/material/Button'
// import FormControl from '@mui/material/FormControl'
// import InputLabel from '@mui/material/InputLabel'
// import Divider from '@mui/material/Divider'

// // Vars
// export const initialFormData = {
//   name: '',
//   company: '',
//   email: '',
//   address: '',
//   country: 'USA',
//   contactNumber: ''
// }
// const countries = ['USA', 'UK', 'Russia', 'Australia', 'Canada']

// const AddCustomerDrawer = ({ open, setOpen, onFormSubmit }) => {
//   // States
//   const [data, setData] = useState(initialFormData)

//   const handleSubmit = e => {
//     e.preventDefault()
//     setOpen(false)
//     onFormSubmit(data)
//     handleReset()
//   }

//   const handleReset = () => {
//     setOpen(false)
//     setData(initialFormData)
//   }

//   return (
//     <Drawer
//       open={open}
//       anchor='right'
//       variant='temporary'
//       onClose={handleReset}
//       ModalProps={{ keepMounted: true }}
//       sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
//     >
//       <div className='flex items-center justify-between pli-5 plb-[15px]'>
//         <Typography variant='h6'>Add New Customer</Typography>
//         <IconButton onClick={handleReset}>
//           <i className='ri-close-line' />
//         </IconButton>
//       </div>
//       <Divider />
//       <div className='p-5'>
//         <form onSubmit={e => handleSubmit(e)} className='flex flex-col gap-5'>
//           <TextField
//             fullWidth
//             id='name'
//             label='Name'
//             value={data.name}
//             onChange={e => setData({ ...data, name: e.target.value })}
//           />
//           <TextField
//             fullWidth
//             id='company'
//             label='Company'
//             value={data.company}
//             onChange={e => setData({ ...data, company: e.target.value })}
//           />
//           <TextField
//             fullWidth
//             id='email'
//             label='Email'
//             value={data.email}
//             onChange={e => setData({ ...data, email: e.target.value })}
//           />
//           <TextField
//             rows={6}
//             multiline
//             fullWidth
//             id='address'
//             label='Address'
//             value={data.address}
//             onChange={e => setData({ ...data, address: e.target.value })}
//           />
//           <FormControl>
//             <InputLabel id='country'>Country</InputLabel>
//             <Select
//               id='country'
//               label='Country'
//               name='country'
//               variant='outlined'
//               value={data?.country?.toLowerCase().replace(/\s+/g, '-') || ''}
//               onChange={e => setData({ ...data, country: e.target.value })}
//             >
//               {countries.map((item, index) => (
//                 <MenuItem key={index} value={item.toLowerCase().replace(/\s+/g, '-')}>
//                   {item}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           <TextField
//             fullWidth
//             id='contact'
//             type='number'
//             label='Contact Number'
//             value={data.contactNumber}
//             onChange={e => setData({ ...data, contactNumber: e.target.value })}
//           />
//           <div className='flex items-center gap-4'>
//             <Button variant='contained' type='submit'>
//               Add
//             </Button>
//             <Button variant='outlined' color='secondary' type='reset' onClick={handleReset}>
//               Cancel
//             </Button>
//           </div>
//         </form>
//       </div>
//     </Drawer>
//   )
// }

// export default AddCustomerDrawer
