/* eslint-disable no-undef */
import HttpService from './http_service'

export const IndexService = (ROUTE, AbortControllerSignal = '') => {
  const http = new HttpService()
  const URL = ROUTE
  const TOKEN_ID = process.env.TOKEN_NAME

  return http.getData(URL, TOKEN_ID, AbortControllerSignal)
}

export const CreateService = (ROUTE, DATA, AbortControllerSignal = '') => {
  const http = new HttpService()
  const URL = ROUTE
  const TOKEN_ID = process.env.TOKEN_NAME

  return http.postData(DATA, URL, TOKEN_ID, (AbortControllerSignal = ''))
}

export const ShowService = (ROUTE, ID, AbortControllerSignal = '') => {
  const http = new HttpService()
  let URL = `${ROUTE}/${ID}`
  const TOKEN_ID = process.env.TOKEN_NAME

  return http.getData(URL, TOKEN_ID, (AbortControllerSignal = ''))
}

export const UpdateService = (ROUTE, ID, DATA, AbortControllerSignal = '') => {
  const http = new HttpService()
  const URL = `${ROUTE}/${ID}`
  const TOKEN_ID = process.env.TOKEN_NAME

  return http.postData(DATA, URL, TOKEN_ID, (AbortControllerSignal = ''))
}

export const ProfileUpdateService = (ROUTE, DATA, AbortControllerSignal = '') => {
  const http = new HttpService()
  const URL = `${ROUTE}`
  const TOKEN_ID = process.env.TOKEN_NAME

  return http.putData(DATA, URL, TOKEN_ID, (AbortControllerSignal = ''))
}

export const DeleteService = (ROUTE, ID, AbortControllerSignal = '') => {
  const http = new HttpService()
  let URL = `${ROUTE}/${ID}`
  const TOKEN_ID = process.env.TOKEN_NAME

  return http.postData({ _method: 'delete' }, URL, TOKEN_ID, (AbortControllerSignal = ''))
}

export const GetDataService = (ROUTE, AbortControllerSignal) => {
  const http = new HttpService()
  const URL = ROUTE
  const TOKEN_ID = process.env.TOKEN_NAME

  return http.getData(URL, TOKEN_ID, (AbortControllerSignal = ''))
}

export const UpdateDataService = (ROUTE, DATA, AbortControllerSignal = '') => {
  const http = new HttpService()
  const URL = ROUTE
  const TOKEN_ID = process.env.TOKEN_NAME

  return http.postData(DATA, URL, TOKEN_ID, (AbortControllerSignal = ''))
}

export const UploadeFileDataService = async (ROUTE, DATA) => {
  const http = new HttpService()
  const URL = ROUTE
  const PAYLOAD = DATA

  try {
    const data = await http.fileData(URL, PAYLOAD)

    return data
  } catch (error) {
    return error.message
  }
}
