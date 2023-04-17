import React, { useEffect, useState } from 'react'
import {
  Container,
  Typography,
  Grid,
  Paper,
  Card,
  CardMedia,
  List,
  ListSubheader,
  ListItem,
  ListItemText
} from '@mui/material'
import { useRouter } from 'next/router'
import { collection, getDocs, getFirestore } from 'firebase/firestore'
import { useDispatch, useSelector } from 'react-redux'
import { setOrders } from '@/store/slice/appSlice'


const Orders = () => {
  const db = getFirestore()
  const router = useRouter()
  const dispatch = useDispatch()
  const { orders } = useSelector(state => state.app)
  const { userId } = useSelector(state => state.auth)
  const [ adress, setAdress ] = useState('')
  const [ totalCost, setTotalCost ] = useState(0)
  const [ obtaining, setObtaining ] = useState('')
  const [ pay, setPay ] = useState('')
  const orderId = router.query.id

  useEffect(() => {
    (async () => {
      const colRef = collection(db, 'order', userId, `${ orderId }`)
      const snapshots = await getDocs(colRef)
      const docs = snapshots.docs.map(doc => doc.data())
      console.log(docs)
      dispatch(setOrders(docs))

      let count = 0
      docs.map((food) => {
        count = count + (food.price * food.count)
        setAdress(food.adress)
        setObtaining(food.obtaining)
        setPay(food.pay)
      })
      setTotalCost(count)
    })()
  }, [])

  return (
    <Container sx={ { marginTop: 10 } }>
      <Typography variant='h2' align='center' color='textPrimary' gutterBottom sx={ { mt: 15, mb: 5 } }>
        Номер вашего заказа: { orderId }
      </Typography>
      <Grid container spacing={ 2 }>
        { orders.map((food, key) => (
          <Grid item key={ key } xs={ 12 }>
            <Paper elevation={ 4 } sx={ { padding: 2 } }>
              <Grid container sx={ { textAlign: 'center', justifyContent: 'center' } }>
                <Grid item xs={ 10 } sm={ 6 } md={ 2 }>
                  <Card>
                    <CardMedia
                      className='cardMedia'
                      image={ food.image }
                      title='Image title'
                      sx={ {
                        paddingTop: '56.25%'
                      } }
                    />
                  </Card>
                </Grid>
                <Grid item xs={ 8 } sm={ 7 } md={ 7 }>
                  <Typography component='h1' variant='h4' sx={ { mt: 3 } }>
                    { food.name }
                  </Typography>
                </Grid>
                <Grid item xs={ 3 } sm={ 2 } md={ 2 }>
                  <Typography component='h2' variant='h5' sx={ { mt: 2 } }>
                    { food.price } pуб.
                  </Typography>
                  <Typography component='h2' variant='h5' sx={ { mt: 1 } }>
                    { food.count } шт.
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        )) }
      </Grid>

      <Container sx={ { mt: 5 } }>
        <List sx={ { width: '100%', maxWidth: 500 } } subheader={
          <ListSubheader sx={ { fontSize: '30px', mb: 2 } }>
            Детали заказа
          </ListSubheader>
        }>
          <ListItem>
            <ListItemText id='total-cost' disableTypography sx={ { fontSize: '25px' } }
                          primary={ `Общая сумма: ${ totalCost } руб.` }/>
          </ListItem>
          <ListItem>
            <ListItemText id='total-cost' disableTypography sx={ { fontSize: '25px' } }
                          primary={ `Получение: ${ obtaining }` }/>
          </ListItem>
          <ListItem>
            <ListItemText id='total-cost' disableTypography sx={ { fontSize: '25px' } }
                          primary={ `Способ оплаты: ${ pay }` }/>
          </ListItem>
          <ListItem>
            { adress && <ListItemText id='total-cost' disableTypography sx={ { fontSize: '25px' } }
                          primary={ `Адресс: ${ adress }` }/> }
          </ListItem>
        </List>
      </Container>
    </Container>
  )
}

export default Orders