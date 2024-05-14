'use client'

/* eslint-disable import/order */

/* eslint-disable import/no-unresolved */

import ProductListPage from './list/'

const ProductListApp = () => {


  const datas = [
    {
      id: 1,
      fullName: 'Necklace',
      carat: '18k',
      metal: 'Gold',
      purity: '75%',
      status: 'active',
      productPrice: '6000.00',
      productWeight: 15,
      avatar: 'https://wsdk-files.webengage.com/webengage/d3a4a301/~f05d4dk.js?r=1668406445000'
    },
    {
      id: 1,
      fullName: 'Ring',
      carat: '14k',
      metal: 'Gold',
      purity: '58.5%',
      status: 'inactive',
      productPrice: '123.00',
      productWeight: 4.2,
      avatar: 'https://wsdk-files.webengage.com/webengage/d3a4a301/~f05d4dk.js?r=1668406445000'
    },
    {
      id: 2,
      fullName: 'Emerald Ring',
      carat: '24k',
      metal: 'Gold',
      purity: '75%',
      status: 'inactive',
      productPrice: '1.00',
      productWeight: '10.2',
      avatar: 'https://wsdk-files.webengage.com/webengage/d3a4a301/~5bjl9bk.js?r=1698387393000'
    },
    {
      id: 3,
      fullName: 'Sapphire Earrings',
      carat: '22',
      metal: 'Silver',
      status: 'active',
      productPrice: '500.00',
      productWeight: '4.2',
      avatar: 'https://wsdk-files.webengage.com/webengage/d3a4a301/~f05d4dk.js?r=1668406445000'
    }
  ]

  return <ProductListPage userData={datas} />
}

export default ProductListApp
