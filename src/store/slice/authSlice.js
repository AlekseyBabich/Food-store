import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuth: false,
  token: null,
  name: null,
  userId: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

    setToken: (state, { payload }) => {
      state.token = payload.accessToken
      if (payload.accessToken) {
        state.isAuth = true
      }
    },

    setName: (state, { payload }) => {
      state.name = payload.name
      state.userId = payload.userId
    },

    logout: (state) => {
      state.token = null
      state.isAuth = false
    },

  },
})

export const { setToken, setName, logout } = authSlice.actions

export default authSlice.reducer