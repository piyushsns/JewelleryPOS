// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// Components Imports
import Congratulations from '@views/dashboards/ecommerce/Congratulations'
import CardStatVertical from '@components/card-statistics/Vertical'
import TotalProfitStackedBar from '@views/dashboards/ecommerce/TotalProfitStackedBar'
import TotalSales from '@views/dashboards/ecommerce/TotalSales'
import TotalEarning from '@views/dashboards/ecommerce/TotalEarning'
import LineChartWithShadow from '@views/dashboards/ecommerce/LineChartWithShadow'
import RadialBarChart from '@views/dashboards/ecommerce/RadialBarChart'
import Transactions from '@views/dashboards/ecommerce/Transactions'
import NewVisitors from '@views/dashboards/ecommerce/NewVisitors'
import WebsiteStatistics from '@views/dashboards/ecommerce/WebsiteStatistics'
import Table from '@views/dashboards/ecommerce/Table'
import MeetingSchedule from '@views/dashboards/ecommerce/MeetingSchedule'
import TotalPurchase from '@views/dashboards/ecommerce/TotalPurchase'
import SalesOverview from '@views/dashboards/ecommerce/salesOverview'

const getData = async () => {
  // Vars
  const res = await fetch(`${process.env.API_URL}/apps/invoice`)

  if (!res.ok) {
    throw new Error('Failed to fetch invoice data')
  }

  return res.json()
}

const DashboardECommerce = async () => {
  // Vars
  const data = await getData()

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={8} className='self-end'>
        <Congratulations />
      </Grid>
      <Grid item xs={12} md={4}>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6}>
            <CardStatVertical
              title='New Customer'
              stats='95'
              avatarIcon='ri-user-line'
              avatarColor='success'
              subtitle='Add New Customer'
              trendNumber='12'
              trend='positive'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CardStatVertical
              title='Total Purchase'
              stats='12.1k'
              avatarIcon='ri-shopping-cart-line'
              avatarColor='info'
              subtitle='Daily Purchase'
              trendNumber='38%'
              trend='positive'
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={8}>
        <TotalProfitStackedBar />
      </Grid>
      <Grid item xs={12} md={4}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <TotalSales />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LineChartWithShadow />
          </Grid>
          <Grid item xs={12} sm={6}>
            <RadialBarChart />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={8}>
        <SalesOverview />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>

        <Grid container spacing={6}>
        <Grid item xs={12}>
        <TotalEarning />
        </Grid>
          <Grid item xs={12} sm={6}>
            {/* <LineChartWithShadow /> */}
            <CardStatVertical
              title='Total Suppliers'
              stats='50'
              avatarIcon='ri-file-chart-line'
              avatarColor='primary'
              subtitle='View Suppliers List'
              trendNumber='10%'
              trend='positive'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CardStatVertical
              title='Total Stock'
              stats='268'
              avatarIcon='ri-file-chart-line'
              avatarColor='warning'
              subtitle='Stock in hand'
              trendNumber='28%'
              trend='negative'
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        {/* <WebsiteStatistics /> */}
        {/* <Transactions /> */}
      </Grid>
      <Grid item xs={12} lg={18}>
        <Typography variant='h4' className='mbe-9 text-center'>
          Invoice List
        </Typography>
        <Table invoiceData={data.slice(0, 8)} />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        {/* <MeetingSchedule /> */}
      </Grid>
    </Grid>
  )
}

export default DashboardECommerce
