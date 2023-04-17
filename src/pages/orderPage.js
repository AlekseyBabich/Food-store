import React from 'react'
import { Box, Button, Container, Typography, Link } from '@mui/material'
import AssignmentTurnedInTwoToneIcon from '@mui/icons-material/AssignmentTurnedInTwoTone'
import { useRouter } from 'next/router'


const OrderPage = () => {
  const router = useRouter()
  const orderId = router.query.id

  const acceptOrder = () => {
    router.push('/')
  }

  return (
    <Container maxWidth='md' sx={ { mt: 10 } }>
      <Box sx={ { flexGrow: '1', textAlign: 'center' } }>
        <Typography variant='h3' sx={ { p: 3, textAlign: 'center' } }>
          Ваш заказ принят!!!
        </Typography>
        <AssignmentTurnedInTwoToneIcon fontSize='large'/>
      </Box>
      <Typography variant='h5' sx={ { p: 3, textAlign: 'center' } }>
        <Link sx={ { cursor: 'pointer' } } onClick={ () => router.push(`/order?id=${ orderId }`) }>Номер
          заказа: { orderId }</Link>
      </Typography>
      <Box sx={ { flexGrow: '1', textAlign: 'center' } }>
        <Button variant='contained' onClick={ acceptOrder }>На главную</Button>
      </Box>
    </Container>
  )
}

export default OrderPage