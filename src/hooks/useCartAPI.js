import { useState, useEffect } from 'react'

import HttpService from '../services/http_service'

const tokenId = process.env.TOKEN_NAME

const CartAPIService = {
  index: async () => {
    try {
      var resultData = null

      await new HttpService()
        .getData(`customer/cart`, tokenId)
        .then(response => response)
        .then(response => (resultData = response))

      return resultData
    } catch (error) {
      return error
    }
  },

  store: async (configurableProductId, cartData) => {
    try {
      var resultData = null

      await new HttpService()
        .postData(cartData, `customer/cart/add/${configurableProductId}`, tokenId)
        .then(response => (resultData = response))

      return resultData
    } catch (error) {
      return error
    }
  },

  update: async cartData => {
    try {
      var resultData = null

      await new HttpService()
        .putData(cartData, `customer/cart/update`, tokenId)
        .then(response => (resultData = response))

      return resultData
    } catch (error) {
      return error
    }
  },

  removeItem: async cartItemId => {
    try {
      var resultData = null

      await new HttpService()
        .deleteData(`customer/cart/remove/${cartItemId}`, tokenId)
        .then(response => (resultData = response))

      return resultData
    } catch (error) {
      return error
    }
  },

  emptyCart: async () => {
    try {
      var resultData = null

      await new HttpService().deleteData(`customer/cart/empty/`, tokenId).then(response => (resultData = response))

      return resultData
    } catch (error) {
      return error
    }
  },

  moveToWishlist: async cartItemId => {
    try {
      var resultData = null

      await new HttpService()
        .postData({}, `customer/cart/move-to-wishlist/${cartItemId}`, tokenId)
        .then(response => (resultData = response))

      return resultData
    } catch (error) {
      return error
    }
  },

  applyCoupon: async couponData => {
    try {
      var resultData = null

      await new HttpService()
        .postData(couponData, `customer/cart/coupon/`, tokenId)
        .then(response => (resultData = response))

      return resultData
    } catch (error) {
      return error
    }
  },

  removeCoupon: async () => {
    try {
      var resultData = null

      await new HttpService().deleteData(`customer/cart/coupon`, tokenId).then(response => (resultData = response))

      return resultData
    } catch (error) {
      return error
    }
  }
}

const useCartAPI = () => {
  const [loading, setLoading] = useState(false)
  const [cartData, setCartData] = useState(null)
  const [error, setError] = useState(null)

  const fetchCartData = async () => {
    try {
      setLoading(true)
      const response = await CartAPIService.index()

      setCartData(response.data)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  const storeItem = async (configurableProductId, payloadData) => {
    try {
      setLoading(true)
      await CartAPIService.store(configurableProductId, payloadData)

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
      await CartAPIService.removeItem(id)
      await fetchCartData()
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  return { loading, cartData, error, fetchCartData, storeItem, removeItem }
}

export default useCartAPI
