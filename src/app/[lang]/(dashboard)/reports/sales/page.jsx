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

import OverViewCard from './salesOverView'
import { Card, CardHeader, TextField } from '@mui/material'

function createData(
  id,
  invoiceNumber,
  customer,
  mobile,
  date,
  grossSale,
  itemDiscount,
  billDiscount,
  promotionalDiscount,
  cost,
  taxableAmount,
  charges,
  tip,
  grandAmount,
  profit,
  profitPercentage,
  status,
  orderType,
  terminal,
  store,
  employee,
  payment,
  note,
  lastUpdate,
  channelOrderID
) {
  return {
    id,
    invoiceNumber,
    customer,
    mobile,
    date,
    grossSale,
    itemDiscount,
    billDiscount,
    promotionalDiscount,
    cost,
    taxableAmount,
    charges,
    tip,
    grandAmount,
    profit,
    profitPercentage,
    status,
    orderType,
    terminal,
    store,
    employee,
    payment,
    note,
    lastUpdate,
    channelOrderID
  }
}

const rows = [
  createData(
    1,
    'INV001',
    'John Doe',
    '1234567890',
    '2024-05-01',
    500,
    50,
    10,
    20,
    400,
    400,
    10,
    10,
    500,
    100,
    20,
    'Paid',
    'Online',
    'Terminal A',
    'Store 1',
    'Employee 1',
    'Credit Card',
    '',
    '2024-05-01',
    'CH001'
  ),
  createData(
    2,
    'INV002',
    'Jane Smith',
    '0987654321',
    '2024-05-02',
    700,
    70,
    15,
    30,
    600,
    600,
    15,
    10,
    700,
    100,
    14.28,
    'Paid',
    'In-store',
    'Terminal B',
    'Store 2',
    'Employee 2',
    'Cash',
    '',
    '2024-05-02',
    'CH002'
  )

  // Add more rows as needed
]
function getComparator(order,orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
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
  { id: 'invoiceNumber', numeric: false, label: 'Invoice #' },
  { id: 'customer', numeric: false, label: 'Customer' },
  { id: 'mobile', numeric: false, label: 'Mobile' },
  { id: 'date', numeric: false, label: 'Date' },
  { id: 'grossSale', numeric: true, label: 'Gross Sale' },
  { id: 'itemDiscount', numeric: true, label: 'Item Discount' },
  { id: 'billDiscount', numeric: true, label: 'Bill Discount' },
  { id: 'promotionalDiscount', numeric: true, label: 'Promotional Discount' },
  { id: 'cost', numeric: true, label: 'Cost' },
  { id: 'taxableAmount', numeric: true, label: 'Taxable Amount' },
  { id: 'charges', numeric: true, label: 'Charges' },
  { id: 'tip', numeric: true, label: 'Tip' },
  { id: 'grandAmount', numeric: true, label: 'Grand Amount' },
  { id: 'profit', numeric: true, label: 'Profit' },
  { id: 'profitPercentage', numeric: true, label: 'Profit %' },
  { id: 'status', numeric: false, label: 'Status' },
  { id: 'orderType', numeric: false, label: 'Order Type' },
  { id: 'terminal', numeric: false, label: 'Terminal' },
  { id: 'store', numeric: false, label: 'Store' },
  { id: 'employee', numeric: false, label: 'Employee' },
  { id: 'payment', numeric: false, label: 'Payment' },
  { id: 'note', numeric: false, label: 'Note' },
  { id: 'lastUpdate', numeric: false, label: 'Last Update' },
  { id: 'channelOrderID', numeric: false, label: 'Channel Order ID' }
]

export default function EnhancedTable() {
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

    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const isSelected = id => selected.indexOf(id) !== -1

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

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
  return (

    <Box sx={{ width: '100%' }}>
    <OverViewCard />
      <Card sx={{ width: '100%', mb: 2 }}>
      <CardHeader
        className='flex flex-wrap gap-y-2'
        title='Sales List'
        action={
          <DebouncedInput
            value={globalFilter ?? ''}
            onChange={value => setGlobalFilter(String(value))}
            placeholder='Search all columns...'
          />
        }
      />
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
                      <TableCell component='th' id={labelId} scope='row' padding='none'>
                        {row.invoiceNumber}
                      </TableCell>
                      <TableCell align='left'>{row.customer}</TableCell>
                      <TableCell align='left'>{row.mobile}</TableCell>
                      <TableCell align='left'>{row.date}</TableCell>
                      <TableCell align='right'>{row.grossSale}</TableCell>
                      <TableCell align='right'>{row.itemDiscount}</TableCell>
                      <TableCell align='right'>{row.billDiscount}</TableCell>
                      <TableCell align='right'>{row.promotionalDiscount}</TableCell>
                      <TableCell align='right'>{row.cost}</TableCell>
                      <TableCell align='right'>{row.taxableAmount}</TableCell>
                      <TableCell align='right'>{row.charges}</TableCell>
                      <TableCell align='right'>{row.tip}</TableCell>
                      <TableCell align='right'>{row.grandAmount}</TableCell>
                      <TableCell align='right'>{row.profit}</TableCell>
                      <TableCell align='right'>{row.profitPercentage}</TableCell>
                      <TableCell align='left'>{row.status}</TableCell>
                      <TableCell align='left'>{row.orderType}</TableCell>
                      <TableCell align='left'>{row.terminal}</TableCell>
                      <TableCell align='left'>{row.store}</TableCell>
                      <TableCell align='left'>{row.employee}</TableCell>
                      <TableCell align='left'>{row.payment}</TableCell>
                      <TableCell align='left'>{row.note}</TableCell>
                      <TableCell align='left'>{row.lastUpdate}</TableCell>
                      <TableCell align='left'>{row.channelOrderID}</TableCell>
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
      </Card>
      <FormControlLabel control={<Switch />} label='Dense padding' />
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
