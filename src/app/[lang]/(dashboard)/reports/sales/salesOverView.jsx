/* eslint-disable import/no-unresolved */
'use Client'

import React from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { makeStyles } from '@mui/material'

const OverViewCard = ({ title, value }) => {
  const cardStyle = {
    marginBottom: '16px',
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
    borderRadius: '8px'
  }

  const symbolColStyle = {
    marginRight: '8px',
    width: '64px',
    height: '64px'
  }

  return (
    <Grid item xs={6} sm={3}>
      <Card style={cardStyle}>
        <CardContent>
          <Box display='flex' alignItems='center'>
            <div style={symbolColStyle}>
              <img src='https://my.lithospos.com/assets/images/icons/stats.svg' alt='stats' />
            </div>
            <div>
              <Typography variant='h6' component='div'>
                {title}
              </Typography>
              <Typography variant='subtitle1' component='div'>
                {value}
              </Typography>
            </div>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default function OverviewCards() {
  return (
    <Grid container spacing={2}>
      <OverViewCard title='Number of sales' value='0' />
      <OverViewCard title='Gross sales' value='0' />
      <OverViewCard title='Void sales' value='0' />
      <OverViewCard title='Discount' value='0' />
      <OverViewCard title='Net sales' value='0' />
      <OverViewCard title='AVG sales' value='0' />
      <OverViewCard title='Gross profit' value='0' />
    </Grid>
  )
}
