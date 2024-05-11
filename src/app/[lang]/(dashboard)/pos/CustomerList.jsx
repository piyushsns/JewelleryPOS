import React from 'react'

import { Button, Card, CardContent, Typography } from '@mui/material'

// Component Imports
import CustomerModal from './CustomerModal'
import OpenDialogOnElementClick from '@components/dialogs/OpenDialogOnElementClick'

const CustomerList = () => {
  const buttonProps = {
    variant: 'contained',
    children: 'Add New/Existing Customer'
  }

  return <OpenDialogOnElementClick element={Button} elementProps={{variant: 'contained', children: 'Add New/Existing Customer'}} dialog={CustomerModal} />
}

export default CustomerList
