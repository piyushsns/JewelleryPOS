/* eslint-disable import/no-named-as-default-member */
'use client'
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/order */

// React Imports
import React, { useEffect, useState } from 'react'

// MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import Autocomplete from '@mui/material/Autocomplete'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'

import AddNewCustomer from './AddNewCustomer'

import { Card, Grid } from '@mui/material'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import HttpService from '../../../../services/http_service'

const CustomerModal = ({ open, setOpen }) => {
  // States

  const httpService = new HttpService()

  const [anchorEl, setAnchorEl] = useState(null)

  const [autocompleteOptions, setAutocompleteOptions] = useState([])

  const [showData, setShowData] = useState(true)

  const { data: session } = useSession()

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    async function fetchData() {
      var res = await httpService.getData('admin/customers', session?.user?.token)

      setAutocompleteOptions(res.data)
    }

    fetchData()
  }, [])

  return (
    <Dialog fullWidth maxWidth='md' scroll='body' open={open} onClose={() => setOpen(false)}>
      <DialogTitle
        variant='h4'
        className='flex gap-2 flex-col text-center pbs-10 pbe-6 pli-10 sm:pbs-16 sm:pbe-6 sm:pli-16'
      >
        Customers
      </DialogTitle>
      <DialogContent className='flex flex-col gap-6 pbs-0 pbe-10 pli-10 sm:pli-16 sm:pbe-16'>
        <IconButton onClick={() => setOpen(false)} className='absolute block-start-4 inline-end-4'>
          <i className='ri-close-line' />
        </IconButton>
        <div className='flex flex-col gap-2 items-start'>
          <Typography
            component={InputLabel}
            variant='h5'
            color='text.secondary'
            htmlFor='add-member'
            className='inline-flex'
          >
            Select Existing Customers
          </Typography>
          <Autocomplete
            id='add-member'
            fullWidth
            options={autocompleteOptions || []}
            ListboxComponent={List}
            getOptionLabel={option => option.name}
            renderInput={params => <TextField {...params} size='small' placeholder='Add project members...' />}
            renderOption={(props, option) => (
              <ListItem {...props} key={option.name}>
                <ListItemAvatar>
                  <CustomAvatar src={`/images/avatars/${option.avatar}`} alt={option.name} size={30} />
                </ListItemAvatar>
                <ListItemText primary={option.name} />
              </ListItem>
            )}
          />
        </div>
        <Grid xs={12} className='flex justify-start mt-5'>
          <Button variant='contained' color='primary' onClick={() => setShowData(!showData)}>
            Or Click to add customer
          </Button>
        </Grid>
        {!showData && (
          <Card>
            <AddNewCustomer httpService={httpService} session={session} customers={autocompleteOptions} setCustomers={setAutocompleteOptions} />
          </Card>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default CustomerModal
