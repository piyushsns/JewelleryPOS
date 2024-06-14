'use client'

// Next Imports
import { useEffect, useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

import Typography from '@mui/material/Typography'

// import Logo_1 from '@views/dashboards/ecommerce/Logo_1'
import EarnLogo from './EarnLogo'

// Constants

const TotalAmount = () => {


  return (
    <Card className='overflow-visible'>
      <CardContent className='flex justify-between bs-full'>
        <div className='flex flex-col justify-between'>
          <div className='flex flex-col gap-1'>
            <Typography variant='h5'>Total Earning</Typography>
            <Typography>Calculated of Earning Today</Typography>
          </div>
          <div className='flex items-center flex-wrap'>
            <Typography variant='h4'>
            ₹25,980 /-
            </Typography>
          </div>
        </div>
        <EarnLogo />
      </CardContent>
    </Card>
  );
};

export default TotalAmount;
