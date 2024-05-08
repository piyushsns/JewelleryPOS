'use client'

// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

import useProductAPI from '../../../../../hooks/useProduct'

// Vars

const ProductCard = ({ open, setOpen, data }) => {
  // States
  const initialCardData = {
    type: 'simple',
    attribute_family_id: '1',
    sku: ''
  }

  const [cardData, setCardData] = useState(initialCardData)

  const { storeItem } = useProductAPI()

  const handleClose = () => {
    setOpen(false)
    setCardData(initialCardData)
  }

  useEffect(() => {
    setCardData(data ?? initialCardData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const hendleSubmit = () => {
    storeItem(cardData)
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle
        variant='h4'
        className='flex flex-col gap-2 text-center pbs-10 pbe-6 pli-10 sm:pbs-16 sm:pbe-6 sm:pli-16'
      >
        {data ? 'Edit Card' : 'Add New Card'}
        <Typography component='span' className='flex flex-col text-center'>
          {data ? 'Edit your saved card details' : 'Add card for future billing'}
        </Typography>
      </DialogTitle>

      <DialogContent className='overflow-visible pbs-0 pbe-6 pli-10 sm:pli-16'>
        <IconButton onClick={handleClose} className='absolute block-start-4 inline-end-4'>
          <i className='ri-close-line text-textSecondary' />
        </IconButton>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                label='Type'
                value={cardData.type}
                onChange={e => setCardData({ ...cardData, type: e.target.value })}
              >
                <MenuItem value='simple'>Simple</MenuItem>
                <MenuItem value='USA'>USA</MenuItem>
                <MenuItem value='Australia'>Australia</MenuItem>
                <MenuItem value='Germany'>Germany</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              name='sku'
              autoComplete='off'
              label='Sku'
              placeholder='Enter Sku'
              value={cardData.sku}
              onChange={e => setCardData({ ...cardData, sku: e.target.value })}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className='gap-2 justify-center pbs-0 pbe-10 pli-10 sm:pbe-16 sm:pli-16'>
        <Button variant='contained' onClick={hendleSubmit}>
          {data ? 'Update' : 'Submit'}
        </Button>
        <Button variant='outlined' type='reset' color='secondary' onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ProductCard
