import { useState, useEffect } from 'react'

import HttpService from '../services/http_service'
import useServiceApi from './useServiceApi'
import { LoginUserService } from '../services/auth_services'

const tokenId = process.env.TOKEN_NAME

const useLoginAPI = () => {
  const [loading, setLoading] = useState(false)
  const [cartData, setCartData] = useState(null)
  const [error, setError] = useState(null)

  const fetchCartData = async () => {
    try {
      setLoading(true)
      const response = await useServiceApi.index('')

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

      var userData = await LoginUserService(payloadData)

      localStorage.setItem('loginData', JSON.stringify(userData.data))
      const extractedString = userData.token.split('|')[1]

      localStorage.setItem('user-token', extractedString)

      // After storing the item, fetch updated cart data
      await fetchCartData()
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

  return { loading, cartData, error, fetchCartData, storeItem, removeItem }
}

export default useLoginAPI
