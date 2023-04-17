import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  food: [],
  basket: [],
  orders: [],
  ordersId: []
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setFood: (state, action) => {
      state.food = action.payload
    },
    setBasket: (state, action) => {
      state.basket = action.payload
    },
    setOrders: (state, action) => {
      state.orders = action.payload
    },
    setOrdersId: (state, action) => {
      state.ordersId = action.payload
    },
  }
})

export const { setFood, setBasket, setOrders, setOrdersId } = appSlice.actions

export default appSlice.reducer
