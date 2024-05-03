/* eslint-disable import/no-unresolved */
// Component Imports
import CategoryList from '../category/list/index'

const getData = async () => {
  // Vars
  const res = await fetch(`${process.env.API_URL}/apps/category-list`)

  if (!res.ok) {
    throw new Error('Failed to fetch userData')
  }

  return res.json()
}

const UserListApp = async () => {
  // Vars
  const data = await getData()

  return <CategoryList userData={data} />
}

export default UserListApp
