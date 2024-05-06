'use client'

// React Imports
import { useEffect, useState, useMemo } from 'react'

/* eslint-disable newline-before-return */
/* eslint-disable padding-line-between-statements */
import { alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import { visuallyHidden } from '@mui/utils'
import { Card, CardHeader, TextField } from '@mui/material'

function createData(
  PurchaseID,
  Supplier,
  Metal,
  Type,
  Purity,
  Weight,
  UnitPrice,
  TotalCost,
  PurchaseDate,
) {
  return {
    PurchaseID,
    Supplier,
    Metal,
    Type,
    Purity,
    Weight,
    UnitPrice,
    TotalCost,
    PurchaseDate,
  };
}
const rows = [
  createData('PURC001', 'ABC Metals', 'Gold', 'N/A', '75%', 100, 200, 10, 5000, '2024-05-01'),
  createData('PURC002', 'XYZ', 'Diamond', 'N/A', 'Silver', 50, 100, 20, 2000, '2024-05-03'),
  createData('PURC003', 'Gemstones', 'Silver World', 'Platinum Co.', 'Platinum', 20, 500, 50, 500, '2024-05-05'),
  createData('PURC004', 'Silver', 'N/A', 'N/A', '95%', 200, 2000, 2000, 2000, '2024-05-07'),
]
function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

const headCells = [
  { id: 'PurchaseID', numeric: false, label: 'PurchaseID' },
  { id: 'Supplier', numeric: false, label: 'Supplier' },
  { id: 'Metal', numeric: false, label: 'Metal' },
  { id: 'Type', numeric: false, label: 'Type'},
  { id: 'Purity', numeric: true, label: 'Purity (%)' },
  { id: 'Weight', numeric: true, label: 'Weight (g)' },
  { id: 'UnitPrice', numeric: true, label: 'UnitPrice ($)' },
  { id: 'TotalCost', numeric: true, label: 'Total Cost ($)' },
  { id: 'PurchaseDate', numeric: true, label: 'Purchase Date' },
]


export default function PurchaseOrderTable() {
  const [globalFilter, setGlobalFilter] = useState('')
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('invoiceNumber')
  const [selected, setSelected] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleRequestSort = property => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelected = rows.map(n => n.id)
      setSelected(newSelected)
      return
    }
    setSelected([])
  }
  const DebouncedInput = ({ value: initialValue, onChange, debounce = 500, ...props }) => {
    // States
    const [value, setValue] = useState(initialValue)
  
    useEffect(() => {
      setValue(initialValue)
    }, [initialValue])
    useEffect(() => {
      const timeout = setTimeout(() => {
        onChange(value)
      }, debounce)
  
      return () => clearTimeout(timeout)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])
  
    return <TextField {...props} size='small' value={value} onChange={e => setValue(e.target.value)} />
  }
  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1))
    }
    setSelected(newSelected)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index])
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0])
      if (order !== 0) {
        return order
      }
      return a[1] - b[1]
    })
    return stabilizedThis.map(el => el[0])
  }

  const isSelected = id => selected.indexOf(id) !== -1

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  return (
    <Box sx={{ width: '100%' }}>
      <Card>
       <CardHeader
        className='flex flex-wrap gap-y-2'
        title='Purchase Orders List'
        action={
          <DebouncedInput
            value={globalFilter ?? ''}
            onChange={value => setGlobalFilter(String(value))}
            placeholder='Search all columns...'
          />
        }
      />
      {/* <Paper sx={{ width: '100%', mb: 2 }}> */}
        <TableContainer>
          <Table aria-labelledby='tableTitle' size='medium'>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id)
                  const labelId = `enhanced-table-checkbox-${index}`

                  return (
                    <TableRow
                      hover
                      onClick={event => handleClick(event, row.id)}
                      role='checkbox'
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding='checkbox'>
                        <Checkbox
                          color='primary'
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId
                          }}
                        />
                      </TableCell>
                      <TableCell align='left'>{row.PurchaseID}</TableCell>
                      <TableCell align='left'>{row.Supplier}</TableCell>
                      <TableCell align='left'>{row.Metal}</TableCell>
                      <TableCell align='left'>{row.Type}</TableCell>
                      <TableCell align='right'>{row.Purity}</TableCell>
                      <TableCell align='right'>{row.Weight}</TableCell>
                      <TableCell align='right'>{row.UnitPrice}</TableCell>
                      <TableCell align='right'>{row.TotalCost}</TableCell>
                      <TableCell align='right'>{row.PurchaseDate}</TableCell>
                    </TableRow>
                  )
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={25} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      {/* </Paper> */}
      {/* <FormControlLabel control={<Switch />} label='Dense padding' /> */}
      </Card>
  </Box>
  )
}

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props
  const createSortHandler = property => event => {
    onRequestSort(property)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts'
            }}
          />
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
