import React from 'react'
import { Box, Button, Container, Paper, Typography } from '@mui/material'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { setName, setToken } from '@/store/slice/authSlice'
import { useRouter } from 'next/router'

const Login = () => {
  const provider = new GoogleAuthProvider()
  const auth = getAuth()
  const dispatch = useDispatch()
  const router = useRouter()

  const login = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        if (result.user) {
          console.log(result)
          dispatch(setToken({ accessToken: result.user.accessToken }))
          dispatch(setName({ name: result.user.displayName, userId: result.user.uid }))
          router.push('/')
        }
      }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <div>
      <Box>
        <Paper
          sx={ {
            position: 'relative',
            color: 'white',
            marginBottom: '20px',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            height: '100vh'
          } }
          style={ {
            backgroundImage: `url(https://tvcenter.ru/wp-content/uploads/2021/06/delivery.jpg)`,
          } }
        >
          <Container maxWidth='4'>
            <Box sx={ { padding: '20px', textAlign: 'center' } }>
              <Typography component='h1' variant='h4' sx={ { marginTop: '300px' } }>
                Хочешь вкусно поесть? Тогда жми на кнопку, и заказывай.
              </Typography>
              <Box sx={ { marginTop: '20px' } }>
                <Button onClick={ login } variant='contained'>Войти с помощью Google</Button>
              </Box>
            </Box>
          </Container>
        </Paper>
      </Box>
    </div>
  )
}

export default Login