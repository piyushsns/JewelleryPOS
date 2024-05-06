/* eslint-disable no-undef */
import HttpService from './http_service'

export const LoadProfile = () => {
  const http = new HttpService()
  const profileUrl = process.env.PROFILE_URL
  const tokenId = process.env.TOKEN_NAME

  return http.getData(profileUrl, tokenId)
}

export const UpdateService = (data, id) => {
  const http = new HttpService()
  let url = process.env.PROFILE_URL + '/' + id
  const tokenId = process.env.TOKEN_NAME

  return http.postData(data, url, tokenId)
}
