import { HandleExeption, RaiseSomethingWentWrong } from './handle_exeption'

export default class HttpService {
  constructor() {
    this.url = process.env.API_ENDPOINT_CUST
  }

  async sendRequest(uri, requestOptions) {
    try {
      const response = await fetch(`${this.url}/${uri}`, requestOptions)
      const data = await response.json()

      HandleExeption(data)

      return data
    } catch (error) {
      if (error?.name === 'AbortError') {
        return {
          data: [],
          success: false,
          error_type: error?.name,
          message: 'Request Aborted Successfully'
        }
      } else {
        RaiseSomethingWentWrong()

        return {
          data: [],
          success: false,
          message: error.message,
          error_type: error?.name
        }
      }
    }
  }

  async postData(payload, uri, token = '', signal) {
    const requestOptions = this.getRequestOptions('POST', token, payload, signal)

    return this.sendRequest(uri, requestOptions)
  }

  async getData(uri, token = '', signal = '') {
    const requestOptions = this.getRequestOptions('GET', token, null, signal)

    return this.sendRequest(uri, requestOptions)
  }

  async putData(payload, uri, token = '', signal) {
    const requestOptions = this.getRequestOptions('PUT', token, payload, signal)

    return this.sendRequest(uri, requestOptions)
  }

  async deleteData(uri, token = '', signal = '') {
    const requestOptions = this.getRequestOptions('DELETE', token, null, signal)

    return this.sendRequest(uri, requestOptions)
  }

  async fileData(added_url, formData) {
    const requestOptions = this.fileRequestOptions(formData)

    return fetch(`${this.url}/${added_url}`, requestOptions, { mode: 'no-cors' }).then(response => response.json())
  }

  getRequestOptions(method, token, item, signal) {
    const requestOptions = {
      method,
      headers: { Authorization: `Bearer ${token}`, 'Content-type': 'application/json', Accept: 'application/json' }
    }

    if (item) {
      requestOptions.body = JSON.stringify(item)
    }

    if (signal) {
      requestOptions.signal = signal
    }

    return requestOptions
  }

  fileRequestOptions(formData) {
    return {
      method: 'POST',
      headers: { 'Content-type': 'application/json', Accept: 'application/json' },
      body: formData
    }
  }
}
