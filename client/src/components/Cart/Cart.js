import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { clearCart, addProduct } from '../../store/cart'
import { logIn } from '../../store/user'
import CardCart from '../../commons/Details/CardCart'
import { Button, Stack, Typography } from '@mui/material'
import { message } from 'antd'

const Cart = () => {
  // Redux
  const dispatch = useDispatch()
  const reduxUser = useSelector(state => state.user)
  const reduxCart = useSelector(state => state.cart)
  // Navigation
  const navigate = useNavigate()
  // LocalStorage
  const localStorageCart = JSON.parse(localStorage.getItem('cart'))
  const localStorageUser = JSON.parse(localStorage.getItem('profile'))
  // State
  const [activeCart, setActiveCart] = useState(
    localStorageCart || reduxCart.cartItems
  )
  const [activeUser, setActiveUser] = useState(localStorageUser || reduxUser)
  // Effect
  useEffect(() => {
    dispatch(logIn(activeUser))
    activeCart.forEach(item => {
      dispatch(addProduct(item))
    })
  }, [])
  useEffect(() => {
    setActiveUser(reduxUser)
    setActiveCart(reduxCart.cartItems)
  }, [reduxCart.cartItems, reduxUser])
  // Handlers
  const handleCheckOut = () => {
    if (localStorageCart === null) {
      message.warning('Add products to the Cart before checking out')
    } else {
      activeUser !== null ? navigate('/checkOut') : navigate('/login')
    }
  }
  const handleDeleteCart = () => {
    dispatch(clearCart(reduxCart.cartItems))
    localStorage.removeItem('cart')
    localStorage.removeItem('totalQuantity')
    localStorage.removeItem('totalAmount')
    message.success('Cart cleared')
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      {activeCart.map((product, i) => {
        return <CardCart product={product} key={i} />
      })}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginTop: '16px' }}
      >
        <Typography variant="h6" component="div">
          Total: USD {reduxCart.totalAmount.toFixed(2) / 100}
        </Typography>
        <Stack direction="row">
          <Button
            sx={{
              backgroundColor: '#D2C4FB',
              '&:hover': {
                backgroundColor: '#D2C4FB',
                cursor: 'pointer',
              },
            }}
            variant="contained"
            onClick={handleCheckOut}
          >
            Check Out
          </Button>
          <Button
            sx={{
              backgroundColor: '#0F2830',
              color: 'white',
              '&:hover': {
                backgroundColor: '#0F2830',
                cursor: 'pointer',
              },
            }}
            variant="outlined"
            onClick={handleDeleteCart}
          >
            Delete Cart
          </Button>
        </Stack>
      </Stack>
    </div>
  )
}

export default Cart
