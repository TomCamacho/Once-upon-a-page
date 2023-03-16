import { createAction, createReducer } from '@reduxjs/toolkit'

export const addProduct = createAction('ADD_PRODUCT')
export const deleteProduct = createAction('DELETE_PRODUCT')
export const addUnit = createAction('ADD_UNIT')
export const removeUnit = createAction('REMOVE_UNIT')
export const clearCart = createAction('CLEAR_CART')

const items =
  localStorage.getItem('cart') !== null
    ? JSON.parse(localStorage.getItem('cart'))
    : []
const quantity =
  localStorage.getItem('totalQuantity') !== null
    ? JSON.parse(localStorage.getItem('totalQuantity'))
    : 0
const amount =
  localStorage.getItem('totalAmount') !== null
    ? JSON.parse(localStorage.getItem('totalAmount'))
    : 0

const setLocalStorageItems = (item, totalQuantity, totalAmount) => {
  localStorage.setItem('cart', JSON.stringify(item))
  localStorage.setItem('totalQuantity', JSON.stringify(totalQuantity))
  localStorage.setItem('totalAmount', JSON.stringify(totalAmount))
}

const initialState = {
  cartItems: items,
  totalQuantity: quantity,
  totalAmount: amount,
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

    setLocalStorageItems(
      state.cartItems,
      state.totalQuantity,
      state.totalAmount
    )
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

    setLocalStorageItems(
      state.cartItems,
      state.totalQuantity,
      state.totalAmount
    )
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

    setLocalStorageItems(
      state.cartItems,
      state.totalQuantity,
      state.totalAmount
    )
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

    setLocalStorageItems(
      state.cartItems,
      state.totalQuantity,
      state.totalAmount
    )
  },
  [clearCart]: (state, action) =>
    (state = {
      cartItems: [],
      totalQuantity: 0,
      totalAmount: 0,
    }),
})

export default cartReducer
