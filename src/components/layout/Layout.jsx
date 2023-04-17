import React from 'react'
import { useSelector } from 'react-redux'
import Header from '@/components/header/Header'
import Login from '@/pages/login'


const Layout = ({ children }) => {

  const { isAuth } = useSelector(state => state.auth)

  return (
    <header>
      <Header/>
      { isAuth ? children : <Login/> }
    </header>
  )
}

export default Layout
