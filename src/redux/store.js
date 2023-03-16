import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../redux/state/userSlice'

export const store = configureStore({
  reducer: {
    user: userReducer
  }
})
