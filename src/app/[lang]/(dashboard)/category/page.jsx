/* eslint-disable import/no-unresolved */
// Component Imports
import CategoryList from '../category/list/index'

// const getData = async () => {
//   // Vars
//   const res = await fetch(`${process.env.API_URL}/apps/category-list`)

//   if (!res.ok) {
//     throw new Error('Failed to fetch userData')
//   }

//   return res.json()
// }

const CategoryListApp = async () => {
  // Vars

  const data = [
    {
      id: 1,
      fullName: 'Rings',
      status: 'inactive',
      avatar: '/images/avatars/3.png'
    },
    {
      id: 2,
      fullName: 'Bracelets',
      status: 'pending',
      avatar: '/images/avatars/3.png'
    },
    {
      id: 3,
      fullName: 'Earrings',
      status: 'active',
      avatar: '/images/avatars/1.png'
    },
    {
      id: 4,
      fullName: 'Gold',
      status: 'active',
      avatar: '/images/avatars/3.png'
    },
    {
      id: 5,
      fullName: 'Silver',
      status: 'active',
      avatar: '/images/avatars/3.png'
    }
  ]

  return <CategoryList userData={data} />
}

export default CategoryListApp
