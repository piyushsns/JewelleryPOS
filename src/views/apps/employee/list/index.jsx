import Grid from '@mui/material/Grid'

import EmpListTable from './EmpListTable'

const EmpList = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <EmpListTable />
      </Grid>
    </Grid>
  )
}

export default EmpList
