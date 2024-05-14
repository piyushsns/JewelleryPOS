import { useState } from 'react'

import { useSession } from 'next-auth/react'

import HttpService from '../services/http_service_customer'

const useCheckoutAPI = () => {
  const { data: session } = useSession()

  const token = session?.user?.token

  const [saveAddressLoading, setSaveAddressLoading] = useState(false)
  const [saveShippingLoading, setSaveShippingLoading] = useState(false)
  const [savePaymentLoading, setSavePaymentLoading] = useState(false)
  const [checkMinimumOrderLoading, setCheckMinimumOrderLoading] = useState(false)
  const [saveOrderLoading, setSaveOrderLoading] = useState(false)
  const [summaryLoading, setSummaryLoading] = useState(false)
  const [error, setError] = useState(null)

  const request = async (endpoint, method, data = null) => {
    try {
      var current_cart_id = localStorage.getItem('current_cart_id')

      var resultData = null

      switch (method) {
        case 'POST':
          await new HttpService()
            .postData(data, endpoint + `?current_cart_id=${current_cart_id}`, token)
            .then(response => (resultData = response))
          break
        case 'GET':
          var { customer_id } = data

          await new HttpService()
            .getData(endpoint + `?current_cart_id=${current_cart_id}&customer_id=${customer_id}`, token)
            .then(response => (resultData = response))
          break
        case 'PUT':
          await new HttpService()
            .putData(data, endpoint + `?current_cart_id=${current_cart_id}`, token)
            .then(response => (resultData = response))
          break
        case 'DELETE':
          await new HttpService()
            .deleteData(endpoint + `?current_cart_id=${current_cart_id}`, token)
            .then(response => (resultData = response))
          break
        default:
          resultData = null
          break
      }

      return resultData
    } catch (error) {
      setError(error)

      return error
    }
  }

  const getSummary = async () => {
    try {
      setSummaryLoading(true)

      return await request('checkout/onepage/summary', 'GET')
    } finally {
      setSummaryLoading(false)
    }
  }

  const updateCustomer = async customer_id => {
    try {
      const customerData = { customer_id: customer_id }

      return await request('checkout/onepage/update_customer', 'GET', customerData)
    } finally {
    }
  }

  const saveAddress = async addressData => {
    try {
      setSaveAddressLoading(true)

      return await request('checkout/onepage/addresses', 'POST', addressData)
    } finally {
      setSaveAddressLoading(false)
    }
  }

  const saveShipping = async shippingData => {
    try {
      setSaveShippingLoading(true)

      return await request('checkout/onepage/shipping-methods', 'POST', shippingData)
    } finally {
      setSaveShippingLoading(false)
    }
  }

  const savePayment = async paymentData => {
    try {
      setSavePaymentLoading(true)

      return await request('checkout/onepage/payment-methods', 'POST', paymentData)
    } finally {
      setSavePaymentLoading(false)
    }
  }

  const checkMinimumOrder = async () => {
    try {
      setCheckMinimumOrderLoading(true)

      return await request('checkout/onepage/check-minimum-order', 'POST')
    } finally {
      setCheckMinimumOrderLoading(false)
    }
  }

  const saveOrder = async () => {
    try {
      setSaveOrderLoading(true)

      return await request('checkout/onepage/orders', 'POST')
    } finally {
      setSaveOrderLoading(false)
    }
  }

  return {
    saveAddressLoading,
    saveShippingLoading,
    savePaymentLoading,
    checkMinimumOrderLoading,
    saveOrderLoading,
    summaryLoading,
    error,
    saveAddress,
    saveShipping,
    savePayment,
    checkMinimumOrder,
    getSummary,
    saveOrder,
    updateCustomer
  }
}

export default useCheckoutAPI
