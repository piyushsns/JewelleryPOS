/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'

import Link from 'next/link'

import { useSession } from 'next-auth/react'

import { Card, CardHeader, Grid, Dialog, DialogTitle, DialogContent, IconButton, CircularProgress } from '@mui/material'

import Button from '@mui/material/Button'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'

// Third-party Imports
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'

// Style Imports
import { toast } from 'react-toastify'

import styles from '@core/styles/table.module.css'

import HttpService from '@/services/http_service'

import HttpServiceCustomer from '@/services/http_service_customer'

import OpenDialogOnElementClick from '@components/dialogs/OpenDialogOnElementClick'

import CustomAvatar from '@core/components/mui/Avatar'

import AddNewCustomer from './AddNewCustomer'

import useCheckoutAPI from '../../../../hooks/useCheckoutAPI'

export const CustomerDialogForm = props => {
  return (
    <Dialog fullWidth maxWidth='md' scroll='body' open={props.open} onClose={() => props.setOpen(false)}>
      <DialogTitle variant='h4' className='flex gap-2 flex-col text-center pbs-10 pbe-6 pli-10 sm:pbe-6 sm:pli-8'>
        Add New Customer
      </DialogTitle>
      <DialogContent className='flex flex-col gap-6 pbs-0 pbe-10 pli-10 sm:pli-16 sm:pbe-16'>
        <IconButton onClick={() => props.setOpen(false)} className='absolute block-start-4 inline-end-4'>
          <i className='ri-close-line' />
        </IconButton>
        <AddNewCustomer
          httpService={props.httpService}
          session={props.session}
          customers={props.customers}
          setCustomers={props.setCustomers}
          setOpen={props.setOpen}
          setSelectedCustomer={props.setSelectedCustomer}
        />
      </DialogContent>
    </Dialog>
  )
}

export default function Summary({ isRefreshOrderSummary, setIsRefreshOrderSummary, cart, setCart }) {
  const httpService = new HttpService()

  const { data: session } = useSession()

  const {
    saveAddressLoading,
    saveShippingLoading,
    savePaymentLoading,
    checkMinimumOrderLoading,
    saveOrderLoading,
    summaryLoading,
    error,
    saveAddress,
    saveShipping,
    savePayment,
    updateCustomer,
    getSummary,
    saveOrder
  } = useCheckoutAPI()

  const [data, setData] = useState(() => [])

  const [customers, setCustomers] = useState([])

  const [loading, setLoading] = useState(false)

  const [selectedCustomer, setSelectedCustomer] = useState(null)

  const [isDataUpdated, setIsDataUpdated] = useState(false)

  const refreshOrderSummary = async () => {
    try {
      var resultData = null

      var token = 'user-token'

      var current_cart_id = localStorage.getItem('current_cart_id')

      await new HttpServiceCustomer()
        .getData(`checkout/cart?current_cart_id=${current_cart_id}`, token)
        .then(response => response)
        .then(response => (resultData = response))

      return resultData
    } catch (error) {
      return error
    }
  }

  const updateCartItems = async itempayload => {
    try {
      var resultData = null

      var token = 'user-token'

      var current_cart_id = localStorage.getItem('current_cart_id')

      await new HttpServiceCustomer()
        .putData(itempayload, `checkout/cart?current_cart_id=${current_cart_id}`, token)
        .then(response => response)
        .then(response => (resultData = response))

      return resultData
    } catch (error) {
      return error
    }
  }

  const destroyCartItem = async item_id => {
    try {
      var resultData = null

      var token = 'user-token'

      var current_cart_id = localStorage.getItem('current_cart_id')

      await new HttpServiceCustomer()
        .deleteData(`checkout/cart?current_cart_id=${current_cart_id}&cart_item_id=${item_id}`, token)
        .then(response => response)
        .then(response => (resultData = response))

      return resultData
    } catch (error) {
      return error
    }
  }

  useEffect(() => {
    async function fetchCustomerData() {
      var res = await httpService.getData('admin/customers', session?.user?.token)

      setCustomers(res.data ?? [])
    }

    if (session?.user?.token) {
      fetchCustomerData()
    }
  }, [session])

  // first Time
  useEffect(() => {
    async function fetchNow() {
      try {
        const res = await refreshOrderSummary()

        setCart(res?.data ?? cart)
        setData(res?.data?.items ?? data)
        setIsRefreshOrderSummary(false)
      } catch (error) {
        console.error('Error refreshing order summary:', error)
      }
    }

    fetchNow()
  }, [])

  // second Time
  useEffect(() => {
    if (isRefreshOrderSummary === true) {
      async function fetchNow() {
        try {
          const res = await refreshOrderSummary()

          setCart(res.data)
          setData(res.data.items)
          setIsRefreshOrderSummary(false)
        } catch (error) {
          console.error('Error refreshing order summary:', error)
        }
      }

      fetchNow()
    }
  }, [isRefreshOrderSummary, setCart, setIsRefreshOrderSummary])

  useEffect(() => {
    async function updateCartItemsNow() {
      try {
        const updatePayload = {}

        data.forEach(item => {
          updatePayload.qty = {
            ...updatePayload.qty,
            [item.id]: {
              quantity: parseInt(item.quantity),
              making_charges_amount: parseFloat(item.making_charges_amount),
              weight: parseFloat(item.weight),
              other_amount: parseFloat(item.other_amount),
              price: parseFloat(item.formatted_price.replace('$', ''))
            }
          }
        })

        const res = await updateCartItems(updatePayload)

        setIsDataUpdated(false)

        if (res?.data && res?.data?.items) {
          setCart(res.data)
          setData(res.data.items)

          toast.success(res.message)
        } else if (res?.data?.message === 'The requested quantity is not available, please try again later.') {
          toast.warn(res.data.message)

          setCart(cart)

          setData(cart?.items, [])
        } else {
          toast.warn(JSON.stringify(res))
        }

        setIsRefreshOrderSummary(false)
      } catch (error) {
        console.error('Error updating cart items:', error)
      }
    }

    if (isDataUpdated == true) {
      updateCartItemsNow()
    }
  }, [isDataUpdated])

  // Column Definitions
  const columnHelper = createColumnHelper()

  const columns = [
    columnHelper.accessor('id', {
      header: 'Action'
    }),
    columnHelper.accessor('name', {
      header: 'Item'
    }),

    // columnHelper.accessor('purity', {
    //   header: 'Purity (K)'
    // }),
    columnHelper.accessor('formatted_price', {
      header: 'Rate/gm'
    }),
    columnHelper.accessor('weight', {
      header: 'Wt (gm)'
    }),
    columnHelper.accessor('quantity', {
      header: 'Pcs'
    }),
    columnHelper.accessor('making_charges_amount', {
      header: 'Making Amt'
    }),
    columnHelper.accessor('other_amount', {
      header: 'Other Amt'
    }),
    columnHelper.accessor('formatted_total', {
      header: 'Total Amt'
    })
  ]

  const EditableCell = ({ getValue, row, column, table }) => {
    // Vars
    const initialValue = getValue()

    // States
    const [value, setValue] = useState(initialValue)

    const onBlur = () => {
      table.options.meta?.updateData(row.index, column.id, value)
    }

    const handleRemove = async () => {
      await table.options.meta?.handleRemove(row.index, column.id, value)
    }

    useEffect(() => {
      setValue(initialValue)
    }, [initialValue])

    if (column.id == 'id') {
      return (
        <div onClick={() => handleRemove()} style={{ cursor: 'pointer' }}>
          ❌
        </div>
      )
    } else {
      return column.id == 'name' || column.id == 'purity' || column.id == 'formatted_total' ? (
        value
      ) : (
        <input value={value} onChange={e => setValue(e.target.value)} onBlur={onBlur} style={{ width: '100px' }} />
      )
    }
  }

  // Give our default column cell renderer editing superpowers!
  const defaultColumn = {
    cell: ({ getValue, row, column, table }) => {
      return <EditableCell getValue={getValue} row={row} column={column} table={table} />
    }
  }

  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    filterFns: {
      fuzzy: () => false
    },

    // Provide our updateData function to our table meta
    meta: {
      updateData: (rowIndex, columnId, value) => {
        setData(old =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value
              }
            }

            return row
          })
        )
        setIsDataUpdated(true)
      },
      handleRemove: async (rowIndex, columnId, value) => {
        const res = await destroyCartItem(value)

        if (res) {
          if (!res.data) {
            localStorage.removeItem('current_cart_id')
            toast.success('Cart Removed Successfully')
            setCart({})
            setData([])
          } else {
            toast.success(res?.message)
            setCart(res?.data ?? cart)
            setData(res?.data?.items ?? data)
          }
        }
      }
    }
  })

  const handleCustomerSelect = customer => {
    setSelectedCustomer(customer || null)
  }

  const checkoutProcess = async () => {
    if (selectedCustomer) {
      try {
        setLoading(true)
        const updateCustomerResponse = await updateCustomer(selectedCustomer.id)

        if (updateCustomerResponse.success === true) {
          const addressResponse = await saveAddress({
            billing: {
              id: null,
              company_name: 'XYZ',
              first_name: selectedCustomer.first_name,
              last_name: selectedCustomer.last_name,
              address1: ['Street XYZ'],
              email: selectedCustomer.email,
              phone: selectedCustomer.phone,
              city: 'Gwalior',
              state: 'MP',
              country: 'IN',
              postcode: '474001',
              use_for_shipping: true
            }
          })

          if (addressResponse.success === true) {
            const shippingResponse = await saveShipping({ shipping_method: 'free_free' })

            if (shippingResponse.success === true) {
              const paymentResponse = await savePayment({
                payment: {
                  description: 'Cash On Delivery',
                  image:
                    'https://suryaethnicapi.mytiny.us/themes/shop/default/build/assets/cash-on-delivery-73061c49.png',
                  method: 'cashondelivery',
                  method_title: 'Cash On Delivery',
                  sort: '1'
                }
              })

              if (paymentResponse.success === true) {
                const orderResponse = await saveOrder()

                if (orderResponse.success === true) {
                  localStorage.removeItem('current_cart_id')
                  setCart({})
                  setData([])
                  toast.success(orderResponse.message)
                  setLoading(false)
                } else {
                  toast.error(orderResponse.message)
                }
              } else {
                toast.error(paymentResponse.message)
              }
            } else {
              toast.error(shippingResponse.message)
            }
          } else {
            toast.error(addressResponse.message)
          }
        } else {
          toast.error(updateCustomerResponse.message)
        }
      } catch (error) {
        console.error(error)
        toast.error(JSON.stringify(error))
      }
    } else {
      toast.error('Please select customer before placing an order..')
    }
  }

  return (
    <Card className='shadow'>
      <CardHeader title='Order Summary' />
      <div className='overflow-x-auto' style={{ maxHeight: '300px' }}>
        <table className={styles.table}>
          {cart?.id && (
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
          )}
          <tbody>
            {cart?.id && table.getTotalSize() > 0 ? (
              table.getRowModel().rows.map(row => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map(cell => {
                      return (
                        <td key={cell.id} className={styles.cellWithInput}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      )
                    })}
                  </tr>
                )
              })
            ) : (
              <tr>
                <td rowSpan={'100%'}>Your Cart Is Empty</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <hr></hr>
      {cart?.id && (
        <table className={styles.table}>
          <tbody>
            <tr>
              <th style={{ textAlign: 'start' }}>Sub Total</th>
              <td style={{ textAlign: 'end' }}>{cart?.formatted_sub_total}</td>
            </tr>
            <tr>
              <th style={{ textAlign: 'start' }}>CSGT (7.5%)</th>
              <td style={{ textAlign: 'end' }}>{cart?.sgst_total}</td>
            </tr>
            <tr>
              <th style={{ textAlign: 'start' }}>SGST (7.5%)</th>
              <td style={{ textAlign: 'end' }}>{cart?.cgst_total}</td>
            </tr>
            <tr>
              <th style={{ textAlign: 'start' }}>Total Tax Amount</th>
              <td style={{ textAlign: 'end' }}>{cart?.formatted_tax_total}</td>
            </tr>
            <tr>
              <th style={{ textAlign: 'start' }}>Total Taxable Amount</th>
              <td style={{ textAlign: 'end' }}>{cart?.formatted_grand_total}</td>
            </tr>
            <tr>
              <td colSpan={'100%'}>
                <div className='flex flex-row gap-3 items-center'>
                  <div className='flex flex-col flex-1'>
                    {customers.length > 0 && (
                      <Autocomplete
                        id='add-customer'
                        fullWidth
                        ListboxComponent={List}
                        options={customers || []}
                        onChange={(event, value) => handleCustomerSelect(value)}
                        {...(selectedCustomer?.id != undefined ? { value: selectedCustomer } : { value: null })}
                        getOptionLabel={option => `ID: ${option.id} ${option.name} (${option.email} | ${option.phone})`}
                        renderInput={params => (
                          <TextField {...params} size='small' placeholder='Select Existing customer...' />
                        )}
                        renderOption={(props, option) => (
                          <ListItem {...props} key={option.id}>
                            <ListItemAvatar>
                              <CustomAvatar src={`/images/avatars/${option.avatar}`} alt={option.name} size={30} />
                            </ListItemAvatar>
                            <ListItemText
                              primary={`ID: ${option.id} ${option.name} (${option.email} | ${option.phone})`}
                            />
                          </ListItem>
                        )}
                      />
                    )}
                  </div>
                  <div className='flex flex-col gap-2 items-start'>
                    <OpenDialogOnElementClick
                      element={Button}
                      dialog={CustomerDialogForm}
                      dialogProps={{
                        httpService: httpService,
                        session: session,
                        customers: customers,
                        setCustomers: setCustomers,
                        setSelectedCustomer: setSelectedCustomer
                      }}
                      elementProps={{
                        variant: 'contained',
                        children: 'Add New Customer'
                      }}
                    />
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <Button className='is-full sm:is-auto lg:is-full' variant='contained' onClick={() => checkoutProcess()}>
                  {loading && <CircularProgress size={20} color='inherit' />}
                  Place Order
                </Button>
              </td>
              {/* <td>
                <Button className='is-full sm:is-auto lg:is-full' variant='outlined'>
                  Hold The Order
                </Button>
              </td> */}
            </tr>
          </tbody>
        </table>
      )}
    </Card>
  )
}
