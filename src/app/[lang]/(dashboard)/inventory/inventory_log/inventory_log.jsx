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
  Sku,
  Discription,
  Purity,
  weight,
  Cost,
  SellingPrice,
  Quantity,
  TotalValue,
) {
  return {
    Sku,
    Discription,
    Purity,
    weight,
    Cost,
    SellingPrice,
    Quantity,
    TotalValue,
  }
}

const rows = [
  createData('JWL001', '18K Gold Necklace', 75, 15, 600, 1200, 5, 6000),
  createData('JWL002', '14K Gold Ring', 58.5, 7, 350, 700, 10, 7000),
  createData('JWL003', 'Sterling Silver Bracelet', 92.5, 20, 150, 300, 8, 2400),
  createData('JWL004', 'Platinum Earrings', 95, 3, 1200, 1200, 3, 7200),
  createData('JWL0001', '18k Gold Necklace', 75, 50, 10, 20, 400, 4000),
  createData('JWL0002', '18k Gold Necklace', 75, 50, 10, 20, 400, 4000)
  // Add more rows as needed
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
  { id: 'Sku', numeric: false, label: 'Sku' },
  { id: 'Discription', numeric: false, label: 'Discription' },
  { id: 'Purity', numeric: false, label: 'Purity (96)' },
  { id: 'weight', numeric: false, label: 'weight (g)' },
  { id: 'Cost', numeric: true, label: 'Cost ($)' },
  { id: 'SellingPrice', numeric: true, label: 'Selling Price ($)' },
  { id: 'Quantity', numeric: true, label: 'Quantity' },
  { id: 'TotalValue', numeric: true, label: 'Total Value ($)' },
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
      <Card sx={{ width: '100%', mb: 2 }}>
      <CardHeader
        className='flex flex-wrap gap-y-2'
        title='Inventory Logs'
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
                      <TableCell align='left'>{row.Sku}</TableCell>
                      <TableCell align='left'>{row.Discription}</TableCell>
                      <TableCell align='left'>{row.Purity}</TableCell>
                      <TableCell align='left'>{row.weight}</TableCell>
                      <TableCell align='right'>{row.Cost}</TableCell>
                      <TableCell align='right'>{row.SellingPrice}</TableCell>
                      <TableCell align='right'>{row.Quantity}</TableCell>
                      <TableCell align='right'>{row.TotalValue}</TableCell>
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
      {/* <FormControlLabel control={<Switch />} label='Dense padding' /> */}
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
