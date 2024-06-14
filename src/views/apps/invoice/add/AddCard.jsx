'use client'

// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import InputLabel from '@mui/material/InputLabel'
import useMediaQuery from '@mui/material/useMediaQuery'

// Third-party Imports
import classnames from 'classnames'

import { useSession } from 'next-auth/react'

import HttpService from '@/services/http_service.js'

// Component Imports
import AddCustomerDrawer, { initialFormData } from './AddCustomerDrawer'
import Logo from '@core/svg/Logo'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Styled Component Imports
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'



const AddAction = ({ invoiceData, handleClose }) => {

  const { data: session } = useSession()

  const [customers, setCustomers] = useState([])

  const [open, setOpen] = useState(false)
  const [count, setCount] = useState(1)
  const [selectData, setSelectData] = useState(null)
  const [issuedDate, setIssuedDate] = useState(null)
  const [dueDate, setDueDate] = useState(null)
  const [formData, setFormData] = useState(initialFormData)
  const [selectedItems, setSelectedItems] = useState(Array(count).fill({ item: '', karat: 24 }))


  const isBelowMdScreen = useMediaQuery(theme => theme.breakpoints.down('md'))
  const isBelowSmScreen = useMediaQuery(theme => theme.breakpoints.down('sm'))

  const onFormSubmit = data => {
    setFormData(data)
  }

  const deleteForm = (e, index) => {
    e.preventDefault()
    const updatedItems = selectedItems.filter((_, idx) => idx !== index)

    setSelectedItems(updatedItems)
    setCount(count - 1)
  }

  const handleSelectChange = (index, value) => {
    const updatedItems = [...selectedItems]

    updatedItems[index] = { item: value, karat: value === 'Gold' ? 24 : '' }
    setSelectedItems(updatedItems)
  }

  const handleAddItem = () => {
    setCount(count + 1)
    setSelectedItems([...selectedItems, { item: '', karat: 24 }])
  }

  useEffect(() => {
    async function fetchCustomerData() {
      var res = await new HttpService().getData('admin/customers', session?.user?.token)
      console.log(res)
      setCustomers(res.data ?? [])
    }



    if (session?.user?.token) {
      fetchCustomerData()
    }
  }, [session])

  return (
    <>
      <Card>
      <h1 className='text-center mt-2'> 🧾INVOICE RECEIPT🧾 </h1>
        <CardContent className='sm:!p-12 '>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <div className='p-6 bg-actionHover rounded'>
                <div className='flex justify-between gap-4 flex-col sm:flex-row'>
                  <div className='flex flex-col gap-6'>
                    <div className='flex items-center gap-2.5'>
                      <Logo className='text-primary' height={25} width={30} />
                      <Typography
                        className='uppercase font-semibold text-xl leading-tight tracking-[0.15px]'
                        color='text.primary'
                      >
                        {themeConfig.templateName}
                      </Typography>
                    </div>
                    <div>
                      <Typography color='text.primary'>Office 149, 450 South Brand Brooklyn</Typography>
                      <Typography color='text.primary'>Gole Ka Mandir, Gwalior, MP, India</Typography>
                      <Typography color='text.primary'>+91 7509263668, +91 7869739873</Typography>
                    </div>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <div className='flex items-center gap-4'>
                      <Typography variant='h5' className='min-is-[95px]'>
                        Invoice
                      </Typography>
                      <TextField
                        className='w-40'
                        fullWidth
                        size='small'
                        value={invoiceData[0].id}
                        InputProps={{
                          disabled: true,
                          startAdornment: <InputAdornment position='start'>#</InputAdornment>
                        }}
                      />
                    </div>
                    <div className='flex items-center'>
                      <Typography className='min-is-[95px] mie-4' color='text.primary'>
                        Date Issued:
                      </Typography>
                      <AppReactDatepicker
                        boxProps={{ className: 'is-full' }}
                        selected={issuedDate}
                        placeholderText='DD-MM-YYYY'
                        dateFormat={'dd-yyyy-MM'}
                        onChange={date => setIssuedDate(date)}
                        customInput={<TextField fullWidth size='small' />}
                      />
                    </div>
                    <div className='flex items-center'>
                      <Typography className='min-is-[95px] mie-4' color='text.primary'>
                        Date Due:
                      </Typography>
                      <AppReactDatepicker
                        boxProps={{ className: 'is-full' }}
                        selected={dueDate}
                        placeholderText='DD-MM-YYYY'
                        dateFormat={'dd-yyyy-MM'}
                        onChange={date => setDueDate(date)}
                        customInput={<TextField fullWidth size='small' />}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Grid>

            <Grid item xs={12}>
               <div className='flex justify-between flex-col gap-4 flex-wrap sm:flex-row'>
                <div className='flex flex-col gap-4'>
                  <Typography className='font-medium' color='text.primary'>
                    Invoice To:
                  </Typography>
                  <Select
                    className={classnames('min-is-[220px]', { 'is-1/2': isBelowSmScreen })}
                    size='small'
                    value={selectData?.id || ''}
                    onChange={e => {
                      setFormData({})
                      setSelectData(customers.slice(0, 5).filter(item => item.id === e.target.value)[0])
                    }}
                  >
                    <MenuItem
                      className='flex items-center gap-2 !text-success !bg-transparent hover:text-success hover:!bg-[var(--mui-palette-success-lightOpacity)]'
                      value=''
                      onClick={() => {
                        setSelectData(null)
                        setOpen(true)
                      }}
                    >
                      <i className='ri-add-line' />
                      Add New Customer
                    </MenuItem>
                    {customers.slice(0, 5).map((cust, index) => (
                      <MenuItem key={index} value={cust.id}>
                        {cust.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {selectData?.id ? (
                    <div>
                      <Typography>{selectData?.name}</Typography>
                      <Typography>{selectData?.email}</Typography>
                      <Typography>{selectData?.gender}</Typography>
                      <Typography>{selectData?.phone}</Typography>
                      {/* <Typography>{selectData?.}</Typography>
                      <Typography>{selectData?.companyEmail}</Typography> */}
                    </div>
                  ) : (
                    <div>
                    <Typography>{selectData?.name}</Typography>
                      <Typography>{selectData?.email}</Typography>
                      <Typography>{selectData?.gender}</Typography>
                      <Typography>{selectData?.phone}</Typography>
                    </div>
                  )}
                </div>
                <div className='flex flex-col gap-4'>
                  <Typography className='font-medium' color='text.primary'>
                    Bill To:
                  </Typography>
                  <div>
                    <div className='flex items-center gap-4'>
                      <Typography className='min-is-[100px]'>Total Due:</Typography>
                      <Typography>Rs.12,110.55</Typography>
                    </div>
                    <div className='flex items-center gap-4'>
                      <Typography className='min-is-[100px]'>Bank name:</Typography>
                      <Typography>HDFC Bank</Typography>
                    </div>
                    <div className='flex items-center gap-4'>
                      <Typography className='min-is-[100px]'>Country:</Typography>
                      <Typography>India</Typography>
                    </div>
                    <div className='flex items-center gap-4'>
                      <Typography className='min-is-[100px]'>IBAN:</Typography>
                      <Typography>ETD95476213874685</Typography>
                    </div>
                    <div className='flex items-center gap-4'>
                      <Typography className='min-is-[100px]'>SWIFT code:</Typography>
                      <Typography>BR91905</Typography>
                    </div>
                  </div>
                </div>
              </div>
            </Grid>

            <Typography className='font-medium md:absolute md:-top-8' color='text.primary'>
                       Jewelry Item
                      </Typography>
            <Grid item xs={12}>

              <Divider className='border-dashed' />
            </Grid>
            <Grid item xs={12}>
              {Array.from(Array(count).keys()).map((item, index) => (
                <div
                  key={index}
                  className={classnames('repeater-item flex relative mbe-4 border rounded', {
                    'p-4': isBelowMdScreen,
                    'p-6': !isBelowMdScreen
                  })}
                >
                  <div className={classnames('grid flex-row flex-wrap sm:grid-cols-12 gap-4 w-full')}>
                    <div className='col-span-12 sm:col-span-4'>
                      <InputLabel className='mb-2'  >Item</InputLabel>
                      <Select
                        fullWidth
                        size='small'
                        value={selectedItems[index].item}
                        onChange={e => handleSelectChange(index, e.target.value)}
                        className='mbe-5'
                        defaultValue='Silver'
                      >
                        <MenuItem value='Gold'>Gold</MenuItem>
                        <MenuItem value='Silver'>Silver</MenuItem>
                        <MenuItem value='Diamond'>Diamond</MenuItem>
                        <MenuItem value='Other'>Other</MenuItem>
                      </Select>
                    </div>

                    {selectedItems[index].item === 'Gold' && (
                      <div className='col-span-12 sm:col-span-4'>
                        <InputLabel className='mb-2'>Karat</InputLabel>
                        <TextField

                          // label='Karat'

                          fullWidth
                          size='small'
                          placeholder='Enter Karat'
                          value={selectedItems[index].karat}
                          className='mt-2'
                          onChange={e => {
                            const updatedItems = [...selectedItems]

                            updatedItems[index].karat = e.target.value
                            setSelectedItems(updatedItems)
                          }}
                        />
                      </div>
                    )}

                    <div className='col-span-12 sm:col-span-4'>
                      <InputLabel className='mb-2'>Gram</InputLabel>
                      <TextField
                        label='Gram'
                        fullWidth
                        size='small'
                        placeholder='Enter Gram'
                        className='mt-2'
                      />
                    </div>
                    <div className='col-span-12 sm:col-span-4'>
                      <InputLabel className='mb-2'>Price</InputLabel>
                      <TextField
                        label='Price'
                        fullWidth
                        size='small'
                        placeholder='Enter Price'
                        className='mt-2'
                      />
                    </div>

                  </div>
                  <Tooltip title='Delete'>
                    <IconButton size='small' className='absolute -top-2 -right-2' onClick={e => deleteForm(e, index)}>
                      <i className='ri-close-line' />
                    </IconButton>
                  </Tooltip>
                </div>
              ))}

              <Button variant='contained' className='mt-5' onClick={handleAddItem}>
                <i className='ri-add-line align-sub' />
                Add Item
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Divider className='border-dashed' />
            </Grid>
            <Grid item xs={12}>
              <div className='flex justify-between flex-col gap-4 sm:flex-row'>
                <div className='flex flex-col gap-4 order-2 sm:order-[unset]'>
                  <div className='flex items-center gap-2'>
                    <Typography className='font-medium' color='text.primary'>
                      Salesperson:
                    </Typography>
                    <TextField size='small' defaultValue='RamJi' />
                  </div>
                  <TextField size='small' placeholder="Customization & Error Rectification" />
                </div>
                <div className='min-is-[200px]'>
                  <div className='flex items-center justify-between'>
                    <Typography>Subtotal:</Typography>
                    <Typography className='font-medium' color='text.primary'>
                      Rs.1800
                    </Typography>
                  </div>
                  <div className='flex items-center justify-between'>
                    <Typography>Discount:</Typography>
                    <Typography className='font-medium' color='text.primary'>
                      Rs.28
                    </Typography>
                  </div>
                  <div className='flex items-center justify-between'>
                    <Typography>Tax:</Typography>
                    <Typography className='font-medium' color='text.primary'>
                      21%
                    </Typography>
                  </div>
                  <Divider className='mlb-2' />
                  <div className='flex items-center justify-between'>
                    <Typography>Total:</Typography>
                    <Typography className='font-medium' color='text.primary'>
                      Rs.1690
                    </Typography>
                  </div>
                  <div className='flex items-center justify-between'>
                    <Typography>Paid Amount:</Typography>
                    <Typography className='font-medium' color='text.primary'>
                      Rs.690
                    </Typography>
                  </div>
                  <Divider className='mlb-2' />
                  <div className='flex items-center justify-between'>
                    <Typography>Due Amount:</Typography>
                    <Typography className='font-medium' color='text.primary'>
                      Rs.1000
                    </Typography>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={12}>
              <Divider className='border-dashed' />
            </Grid>
            <Grid item xs={12}>
              <InputLabel htmlFor='invoice-note' className='inline-flex mbe-1 text-textPrimary'>
                Note:
              </InputLabel>
              <TextField
                id='invoice-note'
                rows={2}
                fullWidth
                multiline
                className='border rounded'
                defaultValue="Thank you for your purchase. We hope this piece adds sparkle to your beauty. Looking forward to serving you again!"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <AddCustomerDrawer open={open} handleClose={() => setOpen(!open)} onSubmit={onFormSubmit}  />
    </>
  )
}

export default AddAction
