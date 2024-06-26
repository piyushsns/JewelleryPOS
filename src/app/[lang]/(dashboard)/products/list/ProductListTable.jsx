/* eslint-disable import/no-named-as-default-member */
/* eslint-disable padding-line-between-statements */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'

// React Imports
import React, { useEffect, useState, useMemo } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import TablePagination from '@mui/material/TablePagination'

// Third-party Imports
import classnames from 'classnames'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'

// Component Imports
import { useSession } from 'next-auth/react'

import OptionMenu from '@core/components/option-menu'
import CustomAvatar from '@core/components/mui/Avatar'

// Util Imports
import { getInitials } from '@/utils/getInitials'
import { getLocalizedUrl } from '@/utils/i18n'

// Style Imports
import tableStyles from '@core/styles/table.module.css'
import AddProductDrawer from './AddProdectDrawer'
import DialogAddCard from './ShowModel'
import OpenDialogOnElementClick from './ShowModel'
import ProductCard from './ProductShow'
import AddProductPage from '../AddProducts/AddProductPage'

import HttpService from '@/services/http_service'

// Styled Components
const Icon = styled('i')({})

const fuzzyFilter = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
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

  return <TextField {...props} value={value} onChange={e => setValue(e.target.value)} size='small' />
}

// Vars
const userRoleObj = {
  admin: { icon: 'ri-vip-crown-line', color: 'error' },
  author: { icon: 'ri-computer-line', color: 'warning' },
  editor: { icon: 'ri-edit-box-line', color: 'info' },
  maintainer: { icon: 'ri-pie-chart-2-line', color: 'success' },
  subscriber: { icon: 'ri-user-3-line', color: 'primary' }
}

const userStatusObj = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}

const buttonProps = {
  variant: 'contained',
  children: 'Add Product'
}

// Column Definitions

const columnHelper = createColumnHelper()

const ProductListTable = ({ tableData, HideAddProsuctForm }) => {
  // States

  const [rowSelection, setRowSelection] = useState({})
  const [addUserOpen, setAddUserOpen] = useState(false)

  const [data, setData] = useState([tableData])

  const [globalFilter, setGlobalFilter] = useState('')
  const httpService = new HttpService()

  const { data: session } = useSession()

  const fetchProducts = async () => {
    var res = await new HttpService().getData('admin/catalog/products', session?.user?.token)
    setData(res.data)

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

  React.useEffect(() => {
    var Id = localStorage.getItem('product_id')

    if (Id !== '' && Id !== undefined) {
      HideAddProsuctForm(Id)
    }
  }, [])

  const handleSubmit = (id) => {
    HideAddProsuctForm(id)
  }

  // Hooks
  const { lang: locale } = useParams()

  const columns = useMemo(
    () => [
      columnHelper.accessor('fullName', {
        header: 'Product Name',
        cell: ({ row }) => (
          <div className='flex items-center gap-4'>
            {getAvatar({ avatar: row.original.avatar, fullName: row.original.name })}
            <div className='flex flex-col'>
              <Typography className='font-medium' color='text.primary'>
                {row.original.name}
              </Typography>
              <Typography variant='body2'>{row.original.username}</Typography>
            </div>
          </div>
        )
      }),

      columnHelper.accessor('productWeight', {
        header: 'Weight',
        cell: ({ row }) => (
          <div className='flex items-center gap-3'>
            <Chip
              variant='tonal'
              className='capitalize'
              label={row.original.weight}
              color={userStatusObj[row.original.productWeight]}
              size='small'
            />
          </div>
        )
      }),
      columnHelper.accessor('productPrice', {
        header: 'Price',
        cell: ({ row }) => (
          <div className='flex items-center gap-3'>
            <Chip
              variant='tonal'
              className='capitalize'
              label={row.original.price}
              color={userStatusObj[row.original.productPrice]}
              size='small'
            />
          </div>
        )
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: ({ row }) => (
          <div className='flex items-center gap-3'>
            <Typography className='font-medium' color='text.primary'>
              {row.original.status == 1 ? 'active' : 'Inactive'}
            </Typography>
          </div>
        )
      }),

      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <div className='flex items-center'>
            <IconButton>
              <i className='ri-delete-bin-7-line text-[22px] text-textSecondary' />
            </IconButton>
            <IconButton onClick={() => handleSubmit(row.original.id)}>
              <i className='ri-edit-box-line text-[22px] text-textSecondary' />
            </IconButton>
          </div>
        ),
        enableSorting: false
      })
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const table = useReactTable({
    data: data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      rowSelection,
      globalFilter
    },
    initialState: {
      pagination: {
        pageSize: 10
      }
    },
    enableRowSelection: true,

    // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  const getAvatar = params => {
    const { avatar, fullName } = params

    if (avatar) {
      return <CustomAvatar src={avatar} skin='light' size={34} />
    } else {
      return (
        <CustomAvatar skin='light' size={34}>
          {getInitials(fullName)}
        </CustomAvatar>
      )
    }
  }

  return (
    <>
      {addUserOpen == false && (
        <Card>
          <CardHeader title='Products' />
          {/* <TableFilters setData={setData} tableData={tableData} /> */}
          <Divider />
          <div className='flex justify-between p-5 gap-4 flex-col items-start sm:flex-row sm:items-center'>
            <Button
              color='secondary'
              variant='outlined'
              startIcon={<i className='ri-upload-2-line text-xl' />}
              className='is-full sm:is-auto'
            >
              Export
            </Button>
            <div className='flex items-center gap-x-4 is-full gap-4 flex-col sm:is-auto sm:flex-row'>
              <DebouncedInput
                value={globalFilter ?? ''}
                onChange={value => setGlobalFilter(String(value))}
                placeholder='Search Category'
                className='is-full sm:is-auto'
              />
              <OpenDialogOnElementClick
                element={Button}
                elementProps={buttonProps}
                dialog={ProductCard}
                HideAddProsuctForm={HideAddProsuctForm}
              />
              {/* <Button variant='contained' onClick={handleSubmit} className='is-full sm:is-auto'>
                Add Product
              </Button> */}
            </div>
          </div>
          <div className='overflow-x-auto'>
            <table className={tableStyles.table}>
              <thead>
                {table?.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <th key={header.id}>
                        {header.isPlaceholder ? null : (
                          <>
                            <div
                              className={classnames({
                                'flex items-center': header.column.getIsSorted(),
                                'cursor-pointer select-none': header.column.getCanSort()
                              })}
                              onClick={header.column.getToggleSortingHandler()}
                            >
                              {flexRender(header.column.columnDef.header, header.getContext())}
                              {{
                                asc: <i className='ri-arrow-up-s-line text-xl' />,
                                desc: <i className='ri-arrow-down-s-line text-xl' />
                              }[header.column.getIsSorted()] ?? null}
                            </div>
                          </>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              {table?.getFilteredRowModel().rows.length === 0 ? (
                <tbody>
                  <tr>
                    <td colSpan={table?.getVisibleFlatColumns().length} className='text-center'>
                      No data available
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {table
                    .getRowModel()
                    .rows.slice(0, table.getState().pagination.pageSize)
                    .map(row => {
                      return (
                        <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                          {row.getVisibleCells().map(cell => (
                            <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                          ))}
                        </tr>
                      )
                    })}
                </tbody>
              )}
            </table>
          </div>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component='div'
            className='border-bs'
            count={table.getFilteredRowModel().rows.length}
            rowsPerPage={table.getState().pagination.pageSize}
            page={table.getState().pagination.pageIndex}
            SelectProps={{
              inputProps: { 'aria-label': 'rows per page' }
            }}
            onPageChange={(_, page) => {
              table.setPageIndex(page)
            }}
            onRowsPerPageChange={e => table.setPageSize(Number(e.target.value))}
          />
        </Card>
      )}
      {/* <AddProductDrawer open={addUserOpen} handleClose={() => setAddUserOpen(!addUserOpen)} /> */}
      {/* {addUserOpen == true && <AddProductPage setAddUserOpen={setAddUserOpen} addUserOpen={addUserOpen} />} */}
    </>
  )
}

export default ProductListTable
