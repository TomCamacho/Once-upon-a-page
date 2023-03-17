import { createAction, createReducer } from '@reduxjs/toolkit'

export const logIn = createAction('LOG_IN')
export const logOut = createAction('LOG_OUT')

const user =
  localStorage.getItem('profile') !== null
    ? JSON.parse(localStorage.getItem('profile'))
    : null

const initialState = user

const userReducer = createReducer(initialState, {
  [logIn]: (state, action) => (state = action.payload),
  [logOut]: (state, action) => (state = null),
})

export default userReducer
