/* eslint-disable no-prototype-builtins */
import { toast } from 'react-toastify'

export const HandleExeption = data => {
  if (data.hasOwnProperty('exception_type') && data.exception_type === 'unthenticated') {
    toast.warn('Your session has been expired! please log in again start your new session.', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    })

    // setTimeout(function () {
    //   window.location.href = '/page/account/login'
    // }, 2000)
  }
}

export const RaiseSomethingWentWrong = () => {
  toast.error('Something Went Wrong!', {
    position: 'top-center',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  })

  // setTimeout(function () {
  //   window.location.reload()
  // }, 1000)
}
