// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

import classnames from 'classnames'

// Component Imports
import AboutOverview from './AboutOverview'
import ActivityTimeline from './ActivityTimeline'
import ConnectionsTeams from './ConnectionsTeams'
import ProjectsTable from './ProjectsTables'

const renderList = list => {
  return (
    list.length > 0 &&
    list.map((item, index) => {
      return (
        <div key={index} className='flex items-center gap-2'>
          <i className={classnames(item.icon, 'text-textSecondary')} />
          <div className='flex items-center flex-wrap gap-2'>
            <Typography className='font-medium'>
              {`${item.property.charAt(0).toUpperCase() + item.property.slice(1)}:`}
            </Typography>
            <Typography>{item.value.charAt(0).toUpperCase() + item.value.slice(1)}</Typography>
          </div>
        </div>
      )
    })
  )
}

const ProfileTab = ({ data }) => {
  return (
    <Grid container spacing={6}>
      <Grid item lg={12} md={5} xs={12}>
        <AboutOverview data={data} />
      </Grid>
      {/* <Grid item lg={6}>
        <Card>
          <CardContent>
            <div className='flex flex-col gap-4'>
              <Typography variant='caption' className='uppercase'>
                Overview
              </Typography>
              {data?.overview && renderList(data?.overview)}
            </div>
          </CardContent>
        </Card>
      </Grid> */}
      {/* <Grid item lg={8} md={7} xs={12}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <ActivityTimeline />
          </Grid>
          <ConnectionsTeams connections={data?.connections} teamsTech={data?.teamsTech} />
          <Grid item xs={12}>
            <ProjectsTable projectTable={data?.projectTable} />
          </Grid>
        </Grid>
      </Grid> */}
    </Grid>
  )
}

export default ProfileTab
