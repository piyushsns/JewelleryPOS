import EmpList from '@views/apps/employee/list'

const getData = async () => {
  // Vars
  const res = await fetch(`${process.env.API_URL}/apps/user-list`)

  if (!res.ok) {
    throw new Error('Failed to fetch employee data')
  }

  return res.json()
}

const EmpListApp = async () => {
  // Vars
  const data = await getData()

  return <EmpList userData={data} />
}

export default EmpListApp
