import React, { useEffect } from 'react'
import {
  Box,
  Container,
  Link,
  Grid, Typography, Paper,
} from '@mui/material'

import { collection, getDocs, getFirestore } from 'firebase/firestore'
import { useDispatch, useSelector } from 'react-redux'
import { setOrdersId } from '@/store/slice/appSlice'
import { useRouter } from 'next/router'


const OrdersList = () => {
  const db = getFirestore()
  const { userId } = useSelector(state => state.auth)
  const router = useRouter()
  const { ordersId } = useSelector(state => state.app)
  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      const colRef = collection(db, 'order', userId, 'listOrder')
      const snapshots = await getDocs(colRef)
      const docs = snapshots.docs.map(doc => doc.data())
      dispatch(setOrdersId(docs))
    })()
  }, [])

  return (
    <Container maxWidth='md' sx={ { mt: 10 } }>
      <Box sx={ { flexGrow: '1', textAlign: 'center' } }>
        <Paper elevation={ 5 } sx={ { p: 10 } }>
          <Typography component='h1' variant='h2' sx={ { mb: 4 } }>
            Список заказов:
          </Typography>
          { ordersId.map((order) => {
            return (
              <Grid item key={ order.id } xs={ 12 } sm={ 6 } md={ 4 }>
                <Link sx={ { cursor: 'pointer' } } onClick={ () => router.push(`/order?id=${ order.orderId }`) }>
                  <Typography component='h1' variant='h3' sx={ { mt: 3 } }>
                    Номер заказа: { order.orderId }
                  </Typography>
                </Link>
              </Grid>
            )
          }) }
        </Paper>
      </Box>
    </Container>
  )
}

export default OrdersList
