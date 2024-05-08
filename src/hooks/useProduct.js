import { useState, useEffect } from 'react'

import HttpService from '../services/http_service'
import useServiceApi from './useServiceApi'

const tokenId = process.env.TOKEN_NAME

const useProductAPI = () => {
  const [loading, setLoading] = useState(false)
  const [cartData, setCartData] = useState(null)
  const [error, setError] = useState(null)

  const fetchCartData = async () => {
    try {
      setLoading(true)
      const response = await useServiceApi.index('admin/catalog/products')

      setCartData(response.data)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  const storeItem = async payloadData => {
    try {
      setLoading(true)
      var data = useServiceApi.store(`admin/catalog/products`, payloadData)

      await fetchCartData()
      localStorage.setItem('product_id',data.id)
      
      return data
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  const removeItem = async id => {
    try {
      setLoading(true)
      await useServiceApi.delete(`customer/${id}`)
      await fetchCartData()
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  const getItem = async id => {
    try {
      setLoading(true)
      var ProductData = await useServiceApi.index(`admin/catalog/products/${id}`)

      await fetchCartData()

      return ProductData
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  return { loading, cartData, error, fetchCartData, storeItem, removeItem, getItem }
}

export default useProductAPI
