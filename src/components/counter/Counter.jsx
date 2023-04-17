import React, { useState } from 'react'
import { Box, IconButton, TextField } from '@mui/material'
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone'
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone'


const Counter = ({ counterProps, quantity }) => {
  const [ count, setCount ] = useState(quantity)

  function increment() {
    setCount(count + 1)
    counterProps(count + 1)
  }

  function decrement() {
    if (count > 1) {
      setCount(count - 1)
      counterProps(count - 1)
    } else {
      setCount(1)
      counterProps(1)
    }
  }

  return (
    <Box sx={ { display: 'flex' } }>
      <IconButton aria-label='down' onClick={ decrement }>
        <RemoveCircleTwoToneIcon/>
      </IconButton>
      <TextField size='small' value={ count } disabled/>
      <IconButton aria-label='up' onClick={ increment }>
        <AddCircleTwoToneIcon/>
      </IconButton>
    </Box>
  )
}

export default Counter