import { createAction, createReducer } from '@reduxjs/toolkit'

export const logIn = createAction('LOG_IN')
export const logOut = createAction('LOG_OUT')

const initialState = null

const userReducer = createReducer(initialState, {
  [logIn]: (state, action) => action.payload.data,
  [logOut]: (state, action) => (state = null),
})

export default userReducer
