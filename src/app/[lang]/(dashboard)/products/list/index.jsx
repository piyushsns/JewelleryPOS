'use client'

// MUI Imports

import { useEffect, useState } from 'react'

import Grid from '@mui/material/Grid'

import { useSession } from 'next-auth/react'

// Component Imports
import ProductListTable from './ProductListTable'

import AddProductPage from '../AddProducts/AddProductPage'

import HttpService from '@/services/http_service'

const ProductListPage = ({ userData }) => {
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [ProductId, setProductId] = useState()

  const hideAddProductForm = id => {
    setProductId(id)
    setAddUserOpen(true)
  }

  const hideProductlist = id => {
    setProductId(id)
    setAddUserOpen(false)
  }

  const [Productdata, setData] = useState([])

  const { data: session } = useSession()

  const fetchProducts = async () => {
    var res = await new HttpService().getData('admin/catalog/products', session?.user?.token)

    setData(res)

    if (res.success == false && res.exception_type == 'validation') {
      toast.warn(res?.message)
    } else if (res?.data?.id > 0) {
      setOpen(false)
    }
  }

  useEffect(() => {
    if (session?.user?.token) {
      fetchProducts()
    }
  }, [session])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        {addUserOpen == false && (
          <ProductListTable tableData={Productdata} HideAddProsuctForm={hideAddProductForm} addUserOpen={addUserOpen} />
        )}

        {addUserOpen == true && (
          <AddProductPage addUserOpen={addUserOpen} hideProductlist={hideProductlist} ProductId={ProductId} />
        )}
      </Grid>
    </Grid>
  )
}

export default ProductListPage
