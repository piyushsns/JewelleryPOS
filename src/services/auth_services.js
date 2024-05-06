import HttpService from './http_service'

export const RegisterUserService = async credentials => {
  const http = new HttpService()
  let signupUrl = process.env.REGISTER_URL

  const data = await http.postData(credentials, signupUrl)

  return data
}

export const LoginUserService = async credentials => {
  const http = new HttpService()
  let loginUrl = process.env.LOGIN_URL

  const data = await http.postData(credentials, loginUrl)

  return data
}

export const LogOutUserService = async () => {
  const http = new HttpService()
  const loginUrl = process.env.LOGOUT_URL
  const tokenId = process.env.TOKEN_NAME

  const data = await http.postData([], loginUrl, tokenId)

  return data
}
