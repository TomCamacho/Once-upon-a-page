import { createAction, createReducer } from '@reduxjs/toolkit'

export const addUnit = createAction('addUnit')
export const subtractUnit = createAction('subtractUnit')
export const newProduct = createAction('newProduct')
export const removeProduct = createAction('removeProduct')
export const removeAll = createAction('removeAll')

const initialState = []

const cartReducer = createReducer(initialState, {
  [addUnit]: (state, action) => {
    return state.map(product => {
      if (product.id === action.payload) {
        return (product.units += 1)
      }
    })
  },
  [subtractUnit]: (state, action) => {
    return state.map(product => {
      if (product.units === 1) {
        return state.filter(product => product.id !== action.payload)
      }
      if (product.id === action.payload) {
        return (product.units -= 1)
      }
    })
  },
  [newProduct]: (state, action) => {
    state.map(product => {
      if (product.id === action.payload.id) {
        return (product.units += 1)
      }
    })
    return [...state, action.payload]
  },
  [removeProduct]: (state, action) => {
    return state.filter(product => product.id !== action.payload)
  },
  [removeAll]: (state, action) => (state = initialState),
})

export default cartReducer
