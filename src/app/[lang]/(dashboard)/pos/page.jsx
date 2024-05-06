/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-async-client-component */
'use client'
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react-hooks/rules-of-hooks */
// MUI Imports

import React, { useEffect } from 'react'

import Grid from '@mui/material/Grid'

import { Box, Card, CardContent, CardHeader, Tab, Tabs, Typography } from '@mui/material'

import { toast } from 'react-toastify'

import ProductListByCategory from './ProductListByCategory'

import HttpService from '../../../../services/http_service'

import Summary from './Summary'

const tokenId = ''

const CartAPIService = {
  index: async () => {
    try {
      var resultData = null

      var current_cart_id = localStorage.getItem('current_cart_id')

      await new HttpService()
        .getData(`checkout/cart?current_cart_id=${current_cart_id}`, tokenId)
        .then(response => response)
        .then(response => (resultData = response))

      return resultData
    } catch (error) {
      return error
    }
  },
  store: async (productid, qty) => {
    try {
      var resultData = null

      const payload = {
        product_id: productid,
        quantity: qty
      }

      var current_cart_id = localStorage.getItem('current_cart_id')

      await new HttpService()
        .postData(payload, `checkout/cart?current_cart_id=${current_cart_id}`, tokenId)
        .then(response => (resultData = response))

      await localStorage.setItem('current_cart_id', resultData.data.id)

      return resultData
    } catch (error) {
      return error
    }
  },
  removeItem: async cart_item_id => {
    try {
      var resultData = null

      var current_cart_id = localStorage.getItem('current_cart_id')

      await new HttpService()
        .deleteData(`checkout/cart?cart_item_id=${cart_item_id}&current_cart_id=${current_cart_id}`, tokenId)
        .then(response => (resultData = response))

      return resultData
    } catch (error) {
      return error
    }
  }
}

const POSPage = () => {
  // Vars

  const [categories, setCategories] = React.useState([])

  const [selectedCategory, setselectedCategory] = React.useState(99999)

  const [selectedProducts, setSelectedProducts] = React.useState([])

  const [cart, setCart] = React.useState({})

  const [isRefreshOrderSummary, setIsRefreshOrderSummary] = React.useState(true)

  const handleChange = (event, selectedCategory) => {
    setselectedCategory(selectedCategory)
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/categories/tree`)

      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }

      const datas = await response.json()

      setCategories(datas.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const addToCart = async product => {
    const isNotExist = selectedProducts.findIndex(p => p.product_id === product.id)

    if (isNotExist === -1) {
      const result = await CartAPIService.store(product.id, 1)

      setSelectedProducts(result.data.items)

      toast.success(result.message)
    }

    setIsRefreshOrderSummary(true)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} lg={7} md={7}>
        <Card className='shadow'>
          <CardHeader title='Search Products' />
          <div className='overflow-x-auto'>
            <CardContent className='sm:!p-12'>
              <Grid container spacing={6}>
                <Tabs
                  value={selectedCategory}
                  onChange={handleChange}
                  variant='scrollable'
                  scrollButtons='auto'
                  aria-label='scrollable auto tabs example'
                >
                  <Tab label='All Products' value={99999} />
                  {categories.map(category => (
                    <Tab label={category.name} value={category.id} />
                  ))}
                </Tabs>
              </Grid>
              <Grid item sm={12}>
                {selectedCategory && (
                  <ProductListByCategory
                    selectedProducts={selectedProducts}
                    addToCart={addToCart}
                    categories={categories}
                    selectedCategory={selectedCategory}
                  />
                )}
              </Grid>
            </CardContent>
          </div>
        </Card>
      </Grid>
      <Grid item xs={12} lg={5} md={5}>
        <Summary
          cart={cart}
          setCart={setCart}
          isRefreshOrderSummary={isRefreshOrderSummary}
          setIsRefreshOrderSummary={setIsRefreshOrderSummary}
        />
      </Grid>
    </Grid>
  )
}

export default POSPage
