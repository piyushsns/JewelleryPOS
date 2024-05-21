'use client'

// Next Imports
import { useEffect, useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Logo_1 from '@views/dashboards/ecommerce/Logo_1'

// Constants
const GRAMS_PER_OUNCE = 31.1035;
const GRAMS_PER_TEN_GRAMS = 10;
const USD_TO_INR_EXCHANGE_RATE = 82; // Example conversion rate, you should update this with the latest rate

const GoldPrice = () => {
  const [priceInINR, setPriceInINR] = useState(null);
  const apiKey = 'aKf2SiEpnhA+a2OH6Zznaw==DglWBEwRUkF2zXG9';

  // Fetch the gold price and exchange rate when the component mounts
  useEffect(() => {
    const fetchGoldPrice = async () => {
      try {
        const response = await fetch('https://api.api-ninjas.com/v1/goldprice', {
          headers: {
            'X-Api-Key': 'aKf2SiEpnhA+a2OH6Zznaw==DglWBEwRUkF2zXG9'
          }
        });
        const data = await response.json();
        const pricePerOunce = data.price; // Assuming the API response returns an array with price field
        const pricePerGram = pricePerOunce / GRAMS_PER_OUNCE;
        const pricePerTenGrams = pricePerGram * GRAMS_PER_TEN_GRAMS;
        const priceInINR = pricePerTenGrams * USD_TO_INR_EXCHANGE_RATE;
        setPriceInINR(priceInINR);
      } catch (error) {
        console.error('Error fetching gold price:', error);
      }
    };

    fetchGoldPrice();
  }, [apiKey]);

  return (
    <Card className='overflow-visible'>
      <CardContent className='flex justify-between bs-full'>
        <div className='flex flex-col justify-between'>
          <div className='flex flex-col gap-1'>
            <Typography variant='h5'>Current Gold Price</Typography>
            <Typography>Price per 10 grams in INR</Typography>
          </div>
          <div className='flex items-center flex-wrap'>
            <Typography variant='h4'>
              {priceInINR ? `₹${priceInINR.toFixed(2)}` : 'Loading...'}
            </Typography>
          </div>
        </div>
        <Logo_1 />
      </CardContent>
    </Card>
  );
};

export default GoldPrice;
