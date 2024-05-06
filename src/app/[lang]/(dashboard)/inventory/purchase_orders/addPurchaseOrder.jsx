'use client'

import React, { useState } from 'react';
import { TextField, Button, Grid, Accordion, AccordionSummary, Typography, AccordionDetails, useMediaQuery, Select, MenuItem, Tooltip, IconButton, Divider } from '@mui/material';

import classnames from 'classnames'

const PurchaseOrderForm =()=> {

    const [expanded, setExpanded] = useState('panel1')
    const [count, setCount] = useState(1)
    const isBelowMdScreen = useMediaQuery(theme => theme.breakpoints.down('md'))
    const isBelowSmScreen = useMediaQuery(theme => theme.breakpoints.down('sm'))

  // State variables to hold form data
  const [formData, setFormData] = useState({
    requisitionNumber: '',
    contractName: '',
    carrier: '',
    exciseDuty: '',
    assignedIc: '',
    addressDetail: '',
    billingAddress: '',
    billingPOBox: '',
    billingCity: '',
    billingState: '',
    billingPostalCode: '',
    billingCountry: '',
    vendorName: '',
    trackingNumber: '',
    dueDate: '',
    salesCommission: '',
    status: '',
    shippingAddress: '',
    shippingPOBox: '',
    shippingCity: '',
    shippingState: '',
    shippingPostalCode: '',
    shippingCountry: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const onFormSubmit = data => {
    setFormData(data)
  }

  const deleteForm = e => {
    e.preventDefault()
    // @ts-ignore
    e.target.closest('.repeater-item').remove()
  }

  const handleExpandChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Requisition Number"
            name="requisitionNumber"
            value={formData.requisitionNumber}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Contract Name"
            name="contractName"
            value={formData.contractName}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Carrier"
            name="carrier"
            value={formData.carrier}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Excise Duty"
            name="exciseDuty"
            value={formData.exciseDuty}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Assigned IC"
            name="assignedIc"
            value={formData.assignedIc}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Address Detail"
            name="addressDetail"
            value={formData.addressDetail}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Vendor Name"
            name="vendorName"
            value={formData.vendorName}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Tracking Number"
            name="trackingNumber"
            value={formData.trackingNumber}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Due Date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Sales Commission"
            name="salesCommission"
            value={formData.salesCommission}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
        <Accordion expanded={expanded === 'panel1'} onChange={handleExpandChange('panel1')}>
        <AccordionSummary className='plb-0'>
          <Typography color='text.primary'>Delivery Address</Typography>
          </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Billing Address"
                    name="billingAddress"
                    value={formData.billingAddress}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Billing PO Box"
                    name="billingPOBox"
                    value={formData.billingPOBox}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Billing City"
                    name="billingCity"
                    value={formData.billingCity}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Billing State"
                    name="billingState"
                    value={formData.billingState}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Billing Postal Code"
                    name="billingPostalCode"
                    value={formData.billingPostalCode}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Billing Country"
                    name="billingCountry"
                    value={formData.billingCountry}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12}>
          <Accordion expanded={expanded === 'panel2'} onChange={handleExpandChange('panel2')}>
            <AccordionSummary className='plb-0'>
              <Typography color='text.primary'>Shipping Address</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
        <Grid item xs={12}>
            <TextField
                label="Shipping Address"
                name="shippingAddress"
                value={formData.shippingAddress}
                onChange={handleChange}
                fullWidth
            />
            </Grid>
        <Grid item xs={6}>
          <TextField
            label="Shipping PO Box"
            name="shippingPOBox"
            value={formData.shippingPOBox}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Shipping City"
            name="shippingCity"
            value={formData.shippingCity}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Shipping State"
            name="shippingState"
            value={formData.shippingState}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Shipping Postal Code"
            name="shippingPostalCode"
            value={formData.shippingPostalCode}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Shipping Country"
            name="shippingCountry"
            value={formData.shippingCountry}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>

        <Grid item xs={12}>
              {Array.from(Array(count).keys()).map((item, index) => (
                <div
                  key={index}
                  className={classnames('repeater-item flex relative mbe-4 border rounded', {
                    'mbs-8': !isBelowMdScreen,
                    '!mbs-14': index !== 0 && !isBelowMdScreen,
                    'gap-5': isBelowMdScreen
                  })}
                >
                  <Grid container spacing={5} className='m-0 pbe-5'>
                    <Grid item lg={6} md={5} xs={12}>
                      <Typography className='font-medium md:absolute md:-top-8' color='text.primary'>
                        Item
                      </Typography>
                      <Select fullWidth size='small' defaultValue='App Design' className='mbe-5'>
                        <MenuItem value='App Design'>App Design</MenuItem>
                        <MenuItem value='App Customization'>App Customization</MenuItem>
                        <MenuItem value='ABC Template'>ABC Template</MenuItem>
                        <MenuItem value='App Development'>App Development</MenuItem>
                      </Select>
                      <TextField rows={2} fullWidth multiline size='small' defaultValue='Customization & Bug Fixes' />
                    </Grid>
                    <Grid item lg={2} md={3} xs={12}>
                      <Typography className='font-medium md:absolute md:-top-8'>Cost</Typography>
                      <TextField
                        {...(isBelowMdScreen && { fullWidth: true })}
                        size='small'
                        type='number'
                        placeholder='24'
                        defaultValue='24'
                        className='mbe-5'
                        InputProps={{ inputProps: { min: 0 } }}
                      />
                      <div className='flex flex-col'>
                        <Typography component='span' color='text.primary'>
                          Discount:
                        </Typography>
                        <div className='flex gap-2'>
                          <Typography component='span' color='text.primary'>
                            0%
                          </Typography>
                          <Tooltip title='Tax 1' placement='top'>
                            <Typography component='span' color='text.primary'>
                              0%
                            </Typography>
                          </Tooltip>
                          <Tooltip title='Tax 2' placement='top'>
                            <Typography component='span' color='text.primary'>
                              0%
                            </Typography>
                          </Tooltip>
                        </div>
                      </div>
                    </Grid>
                    <Grid item md={2} xs={12}>
                      <Typography className='font-medium md:absolute md:-top-8'>Hours</Typography>
                      <TextField
                        {...(isBelowMdScreen && { fullWidth: true })}
                        size='small'
                        type='number'
                        placeholder='1'
                        defaultValue='1'
                        InputProps={{ inputProps: { min: 0 } }}
                      />
                    </Grid>
                    <Grid item md={2} xs={12}>
                      <Typography className='font-medium md:absolute md:-top-8'>Price</Typography>
                      <Typography>$24.00</Typography>
                    </Grid>
                  </Grid>
                  <div className='flex flex-col justify-start border-is'>
                    <IconButton size='small' onClick={deleteForm}>
                      <i className='ri-close-line text-actionActive' />
                    </IconButton>
                  </div>
                </div>
              ))}
              <Grid item xs={12}>
                <Button
                  size='small'
                  variant='contained'
                  onClick={() => setCount(count + 1)}
                  startIcon={<i className='ri-add-line' />}
                >
                  Add Item
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12} className='mt-3'>
              <div className='flex justify-between flex-col gap-4 sm:flex-row'>
                <div className='flex flex-col gap-4 order-2 sm:order-[unset]'>
                  <div className='flex items-center gap-2'>
                    <Typography className='font-medium' color='text.primary'>
                      Salesperson:
                    </Typography>
                    <TextField size='small' defaultValue='Tommy Shelby' />
                  </div>
                  <TextField size='small' placeholder='Thanks for your business' />
                </div>
                <div className='min-is-[200px]'>
                  <div className='flex items-center justify-between'>
                    <Typography>Subtotal:</Typography>
                    <Typography className='font-medium' color='text.primary'>
                      $1800
                    </Typography>
                  </div>
                  <div className='flex items-center justify-between'>
                    <Typography>Discount:</Typography>
                    <Typography className='font-medium' color='text.primary'>
                      $28
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
                      $1690
                    </Typography>
                  </div>
                </div>
              </div>
            </Grid>
      </Grid>
        <Grid xs={6} className=' mt-5'>
            <Button type="submit" variant="contained" color="primary">Submit</Button>
        </Grid>
    </form>
  );
}

export default PurchaseOrderForm;
