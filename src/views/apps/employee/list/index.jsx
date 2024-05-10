// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import EmpListTable from './EmpListTable'

// import UserListCards from './UserListCards'

const EmpList = ({ userData }) => {
  return (
    <Grid container spacing={6}>
      {/* <Grid item xs={12}>
        <UserListCards />
      </Grid> */}
      <Grid item xs={12}>
        <EmpListTable tableData={userData} />
      </Grid>
    </Grid>
  )
}

export default EmpList
