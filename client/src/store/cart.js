import { createAction, createReducer } from '@reduxjs/toolkit'

export const addProduct = createAction('ADD_PRODUCT')
export const deleteProduct = createAction('DELETE_PRODUCT')
export const addUnit = createAction('ADD_UNIT')
export const removeUnit = createAction('REMOVE_UNIT')
export const clearCart = createAction('CLEAR_CART')

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalAmount: 0,
}

const cartReducer = createReducer(initialState, {
  [addProduct]: (state, action) => {
    const newItem = action.payload
    const existingItem = state.cartItems.find(item => item.id === newItem.id)

    if (!existingItem) {
      state.cartItems.push(newItem)
      state.totalQuantity++
    }

    state.totalAmount = state.cartItems.reduce(
      (total, item) => total + Number(item.price) * Number(item.units),
      0
    )

    localStorage.setItem('cart', JSON.stringify(state.cartItems))
  },
  [addUnit]: (state, action) => {
    const id = action.payload
    const existingItem = state.cartItems.find(item => item.id === id)
    state.totalQuantity++

    if (existingItem) {
      existingItem.units++
    }

    state.totalAmount = state.cartItems.reduce(
      (total, item) => total + Number(item.price) * Number(item.units),
      0
    )

    localStorage.setItem('cart', JSON.stringify(state.cartItems))
  },

  [removeUnit]: (state, action) => {
    const id = action.payload
    const existingItem = state.cartItems.find(item => item.id === id)
    state.totalQuantity--

    if (existingItem.units === 1) {
      state.cartItems = state.cartItems.filter(item => item.id !== id)
    } else {
      existingItem.units--
    }

    state.totalAmount = state.cartItems.reduce(
      (total, item) => total + Number(item.price) * Number(item.units),
      0
    )

    localStorage.setItem('cart', JSON.stringify(state.cartItems))
  },
  [deleteProduct]: (state, action) => {
    const existingItem = state.cartItems.find(
      item => item.id === action.payload
    )
    if (existingItem) {
      state.cartItems = state.cartItems.filter(
        item => item.id !== action.payload
      )
      state.totalQuantity = state.totalQuantity - existingItem.units
    }

    state.totalAmount = state.cartItems.reduce(
      (total, item) => total + Number(item.price) * Number(item.units),
      0
    )

    localStorage.setItem('cart', JSON.stringify(state.cartItems))
  },
  [clearCart]: (state, action) => (state = initialState),
})

export default cartReducer
