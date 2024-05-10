/* eslint-disable react-hooks/exhaustive-deps */
'use client'
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/order */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'

import { useSession } from 'next-auth/react'
import useServiceApi from './useServiceApi'

const useCustomerAPI = () => {
  const [loading, setLoading] = useState(false)
  const [cartData, setCartData] = useState(null)
  const [error, setError] = useState(null)

  const fetchCartData = async () => {
    try {
      setLoading(true)
      const response = await useServiceApi.index('admin/customers', token)

      setCartData(response.data)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  const fetchUserData = async (token) => {
    try {
      setLoading(true)
      const response = await useServiceApi.index('admin/customers', token)

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
      await useServiceApi.store(`admin/customers`, payloadData)

      // After storing the item, fetch updated cart data
      await fetchCartData()
      localStorage.setItem('customer_id', data.id)
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

  return { loading, cartData, error, fetchCartData, storeItem, removeItem, fetchUserData }
}

export default useCustomerAPI
