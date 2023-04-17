import React, {useEffect, useState} from 'react'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography
} from '@mui/material'
import {collection, getFirestore, getDocs, addDoc} from 'firebase/firestore'
import { useDispatch, useSelector } from 'react-redux'
import { setFood } from '@/store/slice/appSlice'
import Counter from '@/components/counter/Counter'
import AlertBasket from "@/components/alert/AlertBasket";


const Menu = () => {
  const db = getFirestore()
  const dispatch = useDispatch()
  const { food } = useSelector(state => state.app)
  const { userId } = useSelector(state => state.auth)
  const [ alert, setAlert ] = useState(false)

  useEffect(() => {
    (async () => {
      const colRef = collection(db, 'food')
      const snapshots = await getDocs(colRef)
      const docs = snapshots.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      dispatch(setFood(docs))
    })()
  }, [])

  useEffect(() => {
    const timeId = setTimeout(() => {
      setAlert(false)
    }, 2000)

    return () => {
      clearTimeout(timeId)
    }
  });

  const addToBasket = async (name, description, price, count, image) => {
    setAlert(true)
    await addDoc(collection(db, 'basket', userId, 'basket'), {
      name: name,
      description: description,
      price: price,
      count: count,
      image: image
    })
  }

  return (
    <>
      <Box className='menuContent' sx={ { marginTop: 10 } }>
        <Box sx={{ mt: 3}}>
          <AlertBasket alertOpen={alert} sx={{ position: 'absolute', top: 0}}></AlertBasket>
        </Box>
        <Container maxWidth='md'>
          <Typography variant='h2' align='center' color='textPrimary' gutterBottom>
            Меню
          </Typography>
          <Typography variant='h5' align='center' color='textSecondary' paragraph>
            Выберите блюдо, и перейдите в корзину для оформления заказа.
          </Typography>
        </Container>
      </Box>

      <Box sx={ { marginTop: 6, marginBottom: 6} }>
        <Container className='cardMenu' maxWidth='md'>
          <Grid container spacing={ 4 }>
            { food.map((card) => {
              let quantity = 1
              const setCount = (count) => {
                quantity = count
              }
              return (
                <Grid item key={ card } xs={ 12 } sm={ 6 } md={ 4 }>
                  <Card className='card' sx={ { height: '100%' } }>
                    <CardMedia
                      className='cardMedia'
                      image={ card.image }
                      title='Image title'
                      sx={ {
                        paddingTop: '56.25%'
                      } }
                    />
                    <CardContent className='cardContent' sx={ { flexGrow: '1' } }>
                      <Typography variant='h5' gutterBottom>
                        { card.name }
                      </Typography>
                      <Typography variant='h5' gutterBottom>
                        { card.price } p.
                      </Typography>
                      <Typography sx={ { height: 100 } } overflow='scroll'>
                        { card.description }
                      </Typography>
                    </CardContent>
                    <Counter counterProps={ setCount } quantity={ quantity }/>
                    <CardActions>
                      <Button size='small' color='primary' sx={ { fontSize: 20 } } onClick={ async () => {
                        await addToBasket(
                          card.name,
                          card.description,
                          card.price,
                          quantity,
                          card.image
                        )
                      }
                      }>В корзину</Button>
                    </CardActions>
                  </Card>
                </Grid>
              )
            }) }
          </Grid>
        </Container>
      </Box>
    </>
  )
}

export default Menu