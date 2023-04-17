import * as React from 'react'
import Alert from '@mui/material/Alert'
import { AlertTitle, Box, Collapse } from '@mui/material'

const AlertBasket = ({alertOpen}) => {
  return (
    <Box sx={ { width: '400px', position: 'absolute', bottom: 0}  } spacing={ 2 }>
      <Collapse in={ alertOpen }>
        <Alert severity='success'>
          <AlertTitle>Отличный выбор!</AlertTitle>
          Товар добавлен в корзину.
        </Alert>
      </Collapse>
    </Box>
  )
}


export default AlertBasket