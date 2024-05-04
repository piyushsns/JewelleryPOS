// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import ProductListTable from './ProductListTable'

const ProductListPage = ({ userData }) => {

  return ( <Grid container spacing={6}>
      <Grid item xs={12}>
        <ProductListTable tableData={userData} />
      </Grid>
    </Grid>
  )
}

export default ProductListPage;
