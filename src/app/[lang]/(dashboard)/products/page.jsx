/* eslint-disable import/no-unresolved */
// Component Imports
import ProductListPage from './list/'

// const getData = async () => {
//   // Vars
//   const res = await fetch(`${process.env.API_URL}/apps/category-list`)

//   if (!res.ok) {
//     throw new Error('Failed to fetch userData')
//   }

//   return res.json()
// }

const ProductListApp = async () => {
  // Vars

  const data = [
    {
      id: 1,
      fullName: 'Diamond Necklace',
      status: 'inactive',
      productPrice: '123.00',
      "productWeight": 4.2,
      avatar: 'https://wsdk-files.webengage.com/webengage/d3a4a301/~f05d4dk.js?r=1668406445000'
    },
    {
      id: 2,
      fullName: 'Emerald Ring',
      status: 'inactive',
      productPrice: '1.00',
      productWeight: '4.2',
      avatar: 'https://wsdk-files.webengage.com/webengage/d3a4a301/~5bjl9bk.js?r=1698387393000'
    },
    {
      id: 3,
      fullName: 'Sapphire Earrings',
      status: 'active',
      productPrice: '500.00',
      productWeight: '4.2',
      avatar: 'https://wsdk-files.webengage.com/webengage/d3a4a301/~f05d4dk.js?r=1668406445000'
    }
  ]

  return <ProductListPage userData={data} />
}

export default ProductListApp
