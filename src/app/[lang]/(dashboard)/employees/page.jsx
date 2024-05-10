import { Grid } from '@mui/material'

import UserList from '@views/apps/user/list'

import PermissionsApp from '../apps/permissions/page'

const getData = async () => {
  // Vars
  const res = await fetch(`${process.env.API_URL}/apps/user-list`)

  if (!res.ok) {
    throw new Error('Failed to fetch userData')
  }

  return res.json()
}

const UserListApp = async () => {
  // Vars
  const data = await getData()

  return <UserList userData={data} />
}

export default UserListApp
