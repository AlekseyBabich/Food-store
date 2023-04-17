import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material'


export default function Home() {
  const { isAuth } = useSelector(state => state.auth)
  const router = useRouter()

  useEffect(() => {
    if (!isAuth) {
      router.push('/login')
    }
  }, [ isAuth ])

  return (
    <>

      <Paper
        sx={ {
          position: 'relative',
          color: 'black',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          height: '100vh'
        } }
        style={ {
          backgroundImage: `url(https://www.retail.ru/upload/medialibrary/2bb/foodstore.jpg)`,
        } }
      >
        <Container maxWidth='xl'>
          <Grid container>
            <Grid item md={ 6 }>
              <Box sx={ { position: 'relative', padding: '40px', marginTop: '40px' } }>
                <Typography component='h1' variant='h3' color='inherit' gutterBottom sx={ { fontSize: 60 } }>
                  Добро пожаловать в Food Store
                </Typography>
                <Button onClick={ () => router.push('/ordersList') } variant='contained'>Посмотреть заказы</Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </>
  )
}
