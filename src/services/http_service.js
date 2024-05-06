import { HandleExeption, RaiseSomethingWentWrong } from './handle_exeption'

export default class HttpService {
  url = 'http://localhost:8000/api'

  postData = async (payload, uri, tokenId = '', signal) => {
    const token = localStorage.getItem(tokenId)

    const requestOptions = this.postRequestOptions(token, payload, signal)

    return fetch(this.url + '/' + uri, requestOptions)
      .then(response => response.json())
      .then(data => {
        HandleExeption(data)

        return data
      })
      .catch(error => {
        if (error.name === 'AbortError') {
          return {
            data: [],
            success: false,
            error_type: error.name,
            message: 'Request Aborted Successfully'
          }
        } else {
          RaiseSomethingWentWrong()

          return {
            data: [],
            success: false,
            message: error.message,
            error_type: error.name
          }
        }
      })
  }

  putData = async (payload, uri, tokenId = '', signal) => {
    const token = localStorage.getItem(tokenId)

    const requestOptions = this.putRequestOptions(token, payload, signal)

    return fetch(this.url + '/' + uri, requestOptions)
      .then(response => response.json())
      .then(data => {
        HandleExeption(data)

        return data
      })
      .catch(error => {
        if (error.name === 'AbortError') {
          return {
            data: [],
            success: false,
            error_type: error.name,
            message: 'Request Aborted Successfully'
          }
        } else {
          RaiseSomethingWentWrong()

          return {
            data: [],
            success: false,
            message: error.message,
            error_type: error.name
          }
        }
      })
  }

  deleteData = async (uri, tokenId = '', signal = '') => {
    const token = localStorage.getItem(tokenId)

    const requestOptions = this.getRequestOptions(token, signal)

    return fetch(this.url + '/' + uri, requestOptions)
      .then(response => response.json())
      .then(data => {
        HandleExeption(data)

        return data
      })
      .catch(error => {
        if (error.name === 'AbortError') {
          return {
            data: [],
            success: false,
            error_type: error.name,
            message: 'Request Aborted Successfully'
          }
        } else {
          RaiseSomethingWentWrong()

          return {
            data: [],
            success: false,
            message: error.message,
            error_type: error.name
          }
        }
      })
  }

  getData = async (uri, tokenId = '', signal = '') => {
    const token = localStorage.getItem(tokenId)

    const requestOptions = this.getRequestOptions(token, signal)

    return fetch(this.url + '/' + uri, requestOptions)
      .then(response => response.json())
      .then(data => {
        HandleExeption(data)

        return data
      })
      .catch(error => {
        if (error.name === 'AbortError') {
          return {
            data: [],
            success: false,
            error_type: error.name,
            message: 'Request Aborted Successfully'
          }
        } else {
          RaiseSomethingWentWrong()

          return {
            data: [],
            success: false,
            message: error.message,
            error_type: error.name
          }
        }
      })
  }

  fileData = async (added_url, formData) => {
    const requestOptions = this.fileRequestOptions(formData)

    return fetch(this.url + added_url, requestOptions, { mode: 'no-cors' }).then(response => response.json())
  }

  getRequestOptions = (token, signal) => {
    let requestOptions = {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + token, 'Content-type': 'application/json', Accept: 'application/json' }
    }

    if (signal) {
      requestOptions['signal'] = signal
    }

    return requestOptions
  }

  deleeRequestOptions = (token, signal) => {
    let requestOptions = {
      method: 'DELETE',
      headers: { Authorization: 'Bearer ' + token, 'Content-type': 'application/json', Accept: 'application/json' }
    }

    if (signal) {
      requestOptions['signal'] = signal
    }

    return requestOptions
  }

  postRequestOptions = (token, item, signal = '') => {
    let requestOptions = {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + token, 'Content-type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(item)
    }

    if (signal) {
      requestOptions['signal'] = signal
    }

    return requestOptions
  }

  putRequestOptions = (token, item, signal = '') => {
    let requestOptions = {
      method: 'PUT',
      headers: { Authorization: 'Bearer ' + token, 'Content-type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(item)
    }

    if (signal) {
      requestOptions['signal'] = signal
    }

    return requestOptions
  }

  fileRequestOptions = formData => {
    let requestOptions = {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + token, 'Content-type': 'application/json', Accept: 'application/json' },
      body: formData
    }

    return requestOptions
  }
}
