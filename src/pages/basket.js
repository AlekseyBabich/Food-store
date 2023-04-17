import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardMedia,
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Paper, TextField,
  Typography
} from '@mui/material'
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone'
import LocalShippingTwoToneIcon from '@mui/icons-material/LocalShippingTwoTone'
import CurrencyExchangeTwoToneIcon from '@mui/icons-material/CurrencyExchangeTwoTone'
import Counter from '@/components/counter/Counter'
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, updateDoc } from 'firebase/firestore'
import { setBasket } from '@/store/slice/appSlice'
import { useDispatch, useSelector } from 'react-redux'
import { randomInt } from 'next/dist/shared/lib/bloom-filter/utils'
import { useRouter } from 'next/router'


const Basket = () => {
  const [ open, setOpen ] = useState(false)
  const [ totalCost, setTotalCost ] = useState(0)
  const [ checkBoxPickup, setCheckBoxPickup ] = useState(false)
  const [ checkBoxCashPay, setCheckBoxCashPay ] = useState(false)
  const [ checkBoxCardPay, setCheckBoxCardPay ] = useState(false)
  const [ checkBoxDelivery, setCheckBoxDelivery ] = useState(false)
  const [ adress, setAdress ] = useState('')
  const router = useRouter()
  const db = getFirestore()
  const dispatch = useDispatch()
  const { userId } = useSelector(state => state.auth)
  const { basket } = useSelector(state => state.app)

  useEffect(() => {
    (async () => {
      const colRef = collection(db, 'basket', userId, 'basket')
      const snapshots = await getDocs(colRef)
      const docs = snapshots.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      dispatch(setBasket(docs))
      let count = 0
      docs.map((food ) => {
        count = count + (food.price * food.count)
      })
      setTotalCost(count)
    })()
  })

  const deleteFromBasket = async (id) => {
    await deleteDoc(doc(db, 'basket', userId, 'basket', id))
  }

  const deleteAllFromBasket = async () => {
    basket.map(async (food) => {
      await deleteDoc(doc(db, 'basket', userId, 'basket', food.id))
    })
  }

  const addOrder = async () => {
    const orderId = randomInt(1000, 10000)

    let obtaining = ''
    if(checkBoxPickup) {
      obtaining = 'pickUp'
    } else obtaining = 'delivery'

    let pay = ''
    if(checkBoxCashPay) {
      pay = 'cash'
    } else pay = 'card'

    basket.map(async (food) => {
      await addDoc(collection(db, 'order', userId, `${ orderId }`), {
        name: food.name,
        image: food.image,
        totalCost: totalCost,
        count: food.count,
        price: food.price,
        obtaining: obtaining,
        adress: adress,
        pay: pay
      })
    })

    await addDoc(collection(db, 'order', userId, 'listOrder'), {
      orderId: orderId
    })

    await deleteAllFromBasket()
    setOpen(false)
    await router.push(`/orderPage?id=${ orderId }`)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Container sx={ { marginTop: 10 } }>
        <Grid container spacing={ 2 }>
          { basket.map((food, key) => {
            let quantity = food.count
            const setCount = (count) => {
              quantity = count
              basket.map(async (f) => {
                const cityRef = doc(db, 'basket', userId, 'basket', f.id)
                await updateDoc(cityRef, {
                  count: quantity
                })
              })
            }
            return (
              <Grid item key={ key } xs={ 12 }>
                <Paper elevation={ 4 } sx={ { padding: 2 } }>
                  <Grid container sx={ { textAlign: 'center', justifyContent: 'center' } }>
                    <Grid item xs={ 6 } sm={ 4 } md={ 2 }>
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
                    <Grid item xs={ 10 } sm={ 8 } md={ 5 }>
                      <Typography component='h2' variant='h4' sx={{ mt: 4}}>
                        { food.name }
                      </Typography>
                    </Grid>
                    <Grid item xs={ 6 } sm={ 4 } md={ 2 } sx={{ mt: 4}}>
                      <Counter counterProps={ setCount } quantity={ quantity }/>
                    </Grid>
                    <Grid item xs={ 3 } sm={ 2 } md={ 2 }>
                      <Typography component='h2' variant='h4' sx={{ mt: 4}}>
                        { food.price } pуб.
                      </Typography>
                    </Grid>
                    <Grid item xs={ 3 } sm={ 2 } md={ 1 } sx={{ mt: 4}}>
                      <IconButton aria-label='delete' size='small' onClick={ async() => {
                        await deleteFromBasket(food.id)
                      }
                      }>
                        <HighlightOffTwoToneIcon size='large' color='error' cursor='pointer'/>
                      </IconButton>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            )
          }) }
        </Grid>

        <Box sx={ { mt: 3 } }>
          <Paper>
            <Grid container spacing={ 2 }>
              <Grid item xs={ 12 } sm={ 8 } md={ 6 }>
                <Typography component='h1' variant='h5' align='left' sx={ { p: 1 } }>
                  Итого: { totalCost } pуб.
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Box>
        <Box className='menuButtons' sx={ { mt: 2 } }>
          <Grid container spacing={ 2 }>
            <Grid item>
              <Button variant='contained' color='primary' onClick={ handleClickOpen } disabled={totalCost == 0}>
                Оформить заказ
              </Button>

              <Dialog open={ open } onClose={ handleClose } aria-labelledby='Оформление заказа'>
                <DialogTitle id='Оформление заказа'>Оформление закза</DialogTitle>

                <Divider variant='middle'/>

                <DialogContent>
                  <Grid container spacing={ 2 } sx={ { mb: 2 } }>
                    <Grid item xs={ 6 }>
                      <Box sx={ { display: 'flex' } }>
                        <LocalShippingTwoToneIcon/>
                        <Typography sx={ { ml: 1 } }>
                          Варинаты доставки: Выберите доставку
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={ 6 }>
                      <Box sx={ { display: 'flex' } }>
                        <Checkbox checked={checkBoxPickup} onChange={() => {
                            setCheckBoxPickup(true)
                            setCheckBoxDelivery(false)
                        }}/>
                        <Typography sx={ { mt: 1.3 } }>Самовывоз</Typography>
                      </Box>
                      <Box sx={ { display: 'flex' } }>
                        <Checkbox checked={checkBoxDelivery} onChange={() => {
                          setCheckBoxPickup(false)
                          setCheckBoxDelivery(true)
                        }}/>
                        <Typography sx={ { mt: 1.3 } }>Доставка курьером</Typography>
                      </Box>
                      { checkBoxDelivery ?
                        <Box>
                          <Typography>Введите адресс</Typography>
                          <TextField size='small' value={adress} onChange={(e) => setAdress(e.target.value)}></TextField>
                        </Box> : '' }
                    </Grid>
                  </Grid>

                  <Divider variant='middle'/>

                  <Grid container spacing={ 2 } sx={ { mt: 1.6, mb: 2 } }>
                    <Grid item xs={ 6 }>
                      <Box sx={ { display: 'flex' } }>
                        <CurrencyExchangeTwoToneIcon/>
                        <Typography sx={ { ml: 1 } }>
                          Способы оплаты: выберите оплату
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={ 6 }>
                      <Box sx={ { display: 'flex' } }>
                        <Checkbox checked={checkBoxCashPay} onChange={() => {
                          setCheckBoxCashPay(true)
                          setCheckBoxCardPay(false)
                        }}/>
                        <Typography sx={ { mt: 1.3 } }>Наличными курьеру</Typography>
                      </Box>
                      <Box sx={ { display: 'flex' } }>
                        <Checkbox checked={checkBoxCardPay} onChange={() => {
                          setCheckBoxCardPay(true)
                          setCheckBoxCashPay(false)
                        }}/>
                        <Typography sx={ { mt: 1.3 } }>Картой курьеру</Typography>
                      </Box>
                    </Grid>
                  </Grid>

                  <DialogActions>
                    <Button onClick={ handleClose } color='primary'>Отмена</Button>
                    <Button onClick={ addOrder } color='primary' disabled={
                      !checkBoxPickup && !checkBoxDelivery ||
                      !checkBoxCashPay && !checkBoxCardPay ||
                      !adress && checkBoxDelivery
                    }>
                      Оформить заказ
                    </Button>
                  </DialogActions>
                </DialogContent>
              </Dialog>

            </Grid>
            <Grid item>
              <Button variant='outlined' color='primary' onClick={ async () => {
                await deleteAllFromBasket()
              }
              }>Очистить корзину</Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  )
}

export default Basket