/* eslint-disable import/order */
/* eslint-disable padding-line-between-statements */
import HttpService from '../services/http_service'

const useServiceApi = {
  constructor: function (token) {
    this.token = token
  },
  index: async api_route => {
    try {
      let resultData = null
      await new HttpService().getData(`${api_route}`, this.token).then(response => {
        resultData = response
      })

      return resultData
    } catch (error) {
      return error
    }
  },
  store: async (api_route, cartData) => {
    try {
      let resultData = null
      await new HttpService().postData(cartData, `${api_route}`, this.token).then(response => {
        resultData = response
      })

      return resultData
    } catch (error) {
      return error
    }
  },
  update: async (api_route, cartData) => {
    try {
      let resultData = null
      await new HttpService().putData(cartData, `${api_route}`, this.token).then(response => {
        resultData = response
      })

      return resultData
    } catch (error) {
      return error
    }
  },
  delete: async api_route => {
    try {
      let resultData = null
      await new HttpService().deleteData(`${api_route}`, this.token).then(response => {
        resultData = response
      })

      return resultData
    } catch (error) {
      return error
    }
  }
}

export default useServiceApi
