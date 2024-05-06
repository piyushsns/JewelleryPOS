import { useState } from 'react'

import HttpService from '../services/http_service'

const TOKEN_NAME = process.env.TOKEN_NAME

const useCheckoutAPI = () => {
  const [saveAddressLoading, setSaveAddressLoading] = useState(false)
  const [saveShippingLoading, setSaveShippingLoading] = useState(false)
  const [savePaymentLoading, setSavePaymentLoading] = useState(false)
  const [checkMinimumOrderLoading, setCheckMinimumOrderLoading] = useState(false)
  const [saveOrderLoading, setSaveOrderLoading] = useState(false)
  const [error, setError] = useState(null)

  const request = async (endpoint, method, data = null) => {
    try {
      var resultData = null

      switch (method) {
        case 'POST':
          await new HttpService().postData(data, endpoint, TOKEN_NAME).then(response => (resultData = response))
          break
        case 'GET':
          await new HttpService().postData(endpoint, TOKEN_NAME).then(response => (resultData = response))
          break
        case 'PUT':
          await new HttpService().putData(data, endpoint, TOKEN_NAME).then(response => (resultData = response))
          break
        case 'DELETE':
          await new HttpService().deleteData(endpoint, TOKEN_NAME).then(response => (resultData = response))
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

  const saveAddress = async addressData => {
    try {
      setSaveAddressLoading(true)

      return await request('customer/checkout/save-address', 'POST', addressData)
    } finally {
      setSaveAddressLoading(false)
    }
  }

  const saveShipping = async shippingData => {
    try {
      setSaveShippingLoading(true)

      return await request('customer/checkout/save-shipping', 'POST', shippingData)
    } finally {
      setSaveShippingLoading(false)
    }
  }

  const savePayment = async paymentData => {
    try {
      setSavePaymentLoading(true)

      return await request('customer/checkout/save-payment', 'POST', paymentData)
    } finally {
      setSavePaymentLoading(false)
    }
  }

  const checkMinimumOrder = async () => {
    try {
      setCheckMinimumOrderLoading(true)

      return await request('customer/checkout/check-minimum-order', 'POST')
    } finally {
      setCheckMinimumOrderLoading(false)
    }
  }

  const saveOrder = async () => {
    try {
      setSaveOrderLoading(true)

      return await request('customer/checkout/save-order', 'POST')
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
    error,
    saveAddress,
    saveShipping,
    savePayment,
    checkMinimumOrder,
    saveOrder
  }
}

export default useCheckoutAPI
