import { configureStore } from '@reduxjs/toolkit'
import ProductSlice from './slices/ProductSlice'
import { loginDataSlice } from './slices/LoginSlice'

export const store = configureStore({
  reducer: {
    allData:ProductSlice.reducer,
    auth:loginDataSlice.reducer
  },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch