import React, { useEffect } from 'react'
import { AppBar, Box, Button, Container, Toolbar } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '@/store/slice/authSlice'
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone'


const Header = () => {

  const router = useRouter()
  const dispatch = useDispatch()
  const { isAuth, name } = useSelector(state => state.auth)

  useEffect(() => {
    if (!isAuth) window.localStorage.clear()
  }, [ isAuth ])

  return (
    <Box sx={ { flexGrow: 1 } }>
      <AppBar position='absolute'>
        <Container fixed>
          <Toolbar>

            <Box sx={ { flexGrow: 1, display: { xs: 'none', md: 'flex' } } }>
              <Button
                sx={ { my: 2, color: 'white', display: 'block' } }
                onClick={ () => router.push('/') }
              >
                Главная
              </Button>
              <Button
                sx={ { my: 2, color: 'white', display: 'block' } }
                onClick={ () => router.push('/menu') }
              >
                Наше меню
              </Button>
            </Box>
            { isAuth && <Box sx={ { mr: 2, fontSize: '16px' } }>{ name }</Box> }
            <ShoppingCartTwoToneIcon
              sx={ { my: 2, color: 'white', display: 'block', cursor: 'pointer', marginRight: '50px' } }
              onClick={ () => router.push('/basket') }
            >
              Корзина
            </ShoppingCartTwoToneIcon>

            { isAuth && <Button color='inherit' onClick={ () => dispatch(logout()) }>Выйти</Button> }

          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  )
}

export default Header