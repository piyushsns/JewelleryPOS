/* eslint-disable import/no-unresolved */
import React, { useState, useEffect } from 'react'

import { Box } from '@mui/material'
import ImageList from '@mui/material/ImageList'
import IconButton from '@mui/material/IconButton'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import ListSubheader from '@mui/material/ListSubheader'

// import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'

const getAllProducts = async ({ sort = 'name-asc', limit = 12, ...filters } = {}) => {
  // name-asc,name-desc, created_at-desc, created_at-asc, price-asc, price-desc

  const queryString = new URLSearchParams({
    sort: 'name-asc',
    limit: limit,
    ...filters
  }).toString()

  const response = await fetch(`https://jewelleryposapi.mytiny.us/api/products?${queryString}`)

  if (!response.ok) {
    throw new Error('Failed to fetch invoice data')
  }

  return response.json()
}

export default function ProductListByCategory({ categories, selectedCategory, selectedProducts, addToCart }) {
  const categoryObject = categories.find(c => c.id === selectedCategory)

  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getAllProducts({ ...(categoryObject && { category_id: categoryObject.id }) })

      setProducts(res.data)
    }

    fetchProducts()
  }, [categoryObject])

  return (
    <div>
      <Box sx={{ p: 3 }}>
        <ImageList style={{ gridTemplateColumns: 'initial !important', gap: '2px', overflowX: 'hidden' }}>
          <ImageListItem key='Subheader' cols={6}>
            <ListSubheader component='div'>
              {categoryObject !== undefined ? categoryObject.name : 'All Products'}.
            </ListSubheader>
          </ImageListItem>
          {products.map((item, index) => (
            <ImageListItem
              disabled={selectedProducts.findIndex(p => p.product_id === item.id) !== -1 ? true : false}
              key={index}
              onClick={() => addToCart(item)}
              sx={{
                margin: '2px',
                borderRadius: '10px',
                '&:hover img': {
                  transform: 'scale(1.03)', // Adjust the scale factor as per your preference
                  transition: 'transform 0.3s ease-in-out' // Add a smooth transition effect
                }
              }}
            >
              <img
                loading='lazy'
                alt={item.title}
                style={{ borderRadius: '10px' }}
                src={`${item.base_image.small_image_url}?w=248&fit=crop&auto=format`}
                srcSet={`${item.base_image.small_image_url}?w=248&fit=crop&auto=format&dpr=2 2x`}
              />
              <ImageListItemBar
                sx={{
                  '&': {
                    borderRadius: '10px'
                  },
                  '& .MuiImageListItemBar-titleWrap': {
                    padding: '5px',
                    '& .MuiImageListItemBar-title': {
                      fontSize: '12px',
                      fontWeight: 'bold',
                      color: '#fff'
                    },
                    '& .MuiImageListItemBar-subtitle': {
                      fontSize: '12px',
                      fontWeight: 'bold',
                      color: '#fff'
                    }
                  },
                  '& img': {
                    borderRadius: '10px'
                  },
                  '&:hover img': {
                    transform: 'scale(1.1)', // Adjust the scale factor as per your preference
                    transition: 'transform 0.3s ease-in-out' // Add a smooth transition effect
                  }
                }}
                title={item.name}
                subtitle={item.min_price}
                actionIcon={
                  <IconButton
                    sx={{
                      color: 'white',
                      '&:hover svg': {
                        transform: 'scale(1.1)', // Adjust the scale factor as per your preference
                        transition: 'transform 0.3s ease-in-out' // Add a smooth transition effect
                      }
                    }}
                    aria-label={`info about ${item.name}`}
                  >
                    <i class='fa fa-shopping-cart' aria-hidden='true'></i>
                    {/* <AddShoppingCartIcon /> */}
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </div>
  )
}
