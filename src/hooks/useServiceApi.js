/* eslint-disable padding-line-between-statements */

import { useState, useEffect } from 'react'

import HttpService from '../services/http_service'

const tokenId = 'vOM5ZJo8POIDo9yWZXyjK4i4c2aogMrdKAwgJydic68f9c73'

// const tokenId = process.env.TOKEN_NAME;

console.log('tokenId', tokenId)
const useServiceApi = {
  index: async Api_Name => {
    try {
      let resultData = null
      await new HttpService().getData(`${Api_Name}`, tokenId).then(response => {
        resultData = response
      })

      return resultData
    } catch (error) {
      return error
    }
  },

  store: async (Api_name, cartData) => {
    console.log(Api_name, cartData)
    try {
      let resultData = null
      await new HttpService().postData(cartData, `${Api_name}`, tokenId).then(response => {
        resultData = response
      })

      return resultData
    } catch (error) {
      return error
    }
  },

  update: async (Api_name, cartData) => {
    try {
      let resultData = null
      await new HttpService().putData(cartData, `${Api_name}`, tokenId).then(response => {
        resultData = response
      })

      return resultData
    } catch (error) {
      return error
    }
  },

  delete: async Api_name => {
    try {
      let resultData = null
      await new HttpService().deleteData(`${Api_name}`, tokenId).then(response => {
        resultData = response
      })

      return resultData
    } catch (error) {
      return error
    }
  }
}

export default useServiceApi
