import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'

import userReducer from './user'
import cartReducer from './cart'

const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
  reducer: {
    cart: cartReducer,
    user: userReducer,
  },
})

export default store
