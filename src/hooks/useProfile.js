import { useState, useEffect } from 'react'

import HttpService from '../services/http_service'
import useServiceApi from './useServiceApi'

const tokenId = process.env.TOKEN_NAME

const useProfileAPI = () => {
  const [loading, setLoading] = useState(false)
  const [cartData, setCartData] = useState(null)
  const [error, setError] = useState(null)

  const fetchCartData = async () => {
    try {
      setLoading(true)
      const response = await useServiceApi.index('admin/settings/users')

      setCartData(response.data)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  const updateItem = async (id, payloadData) => {
    try {
      setLoading(true)
      var data = useServiceApi.update(`admin/settings/users/${id}`, payloadData)

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
      await useServiceApi.delete(`users/${id}`)
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
      var ProductData = await useServiceApi.index(`admin/settings/users/${id}`)

      await fetchCartData()

      return ProductData
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  return { loading, cartData, error, fetchCartData, removeItem, getItem, updateItem }
}

export default useProfileAPI
