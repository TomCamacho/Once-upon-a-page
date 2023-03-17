import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  Box,
} from '@mui/material'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import Input from '../../commons/Input/Input'

// Contact Data
const contactData = {
  name: '',
  lastname: '',
  address: '',
  city: '',
  zip: '',
  creditCard: null,
  expirationDate: null,
  CVV: null,
}

function Checkout() {
  // Navigation
  const navigate = useNavigate()
  // States
  const [formData, setFormData] = useState(contactData)
  // LocalStorage
  const localStorageUser = JSON.parse(localStorage.getItem('profile'))
  const localStorageCart = JSON.parse(localStorage.getItem('cart'))
  const localStorageQuantity = JSON.parse(localStorage.getItem('totalQuantity'))
  const localStorageAmount = JSON.parse(localStorage.getItem('totalAmount'))
  // Handlers
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleSubmit = e => {
    e.preventDefault()
    const orderData = {
      user: localStorageUser,
      cart: localStorageCart,
      quantity: localStorageQuantity,
      amount: localStorageAmount,
      paymentData: formData,
    }
    console.log(orderData)
    // ACA VA EL PEDIDO AXIOS CON orderData
    axios
      .post('http://localhost:3001/orders/confirm', orderData)
      .then(res => {
        console.log(res.message)
        message.success('Order placed! Thank you :)')
      })
      .catch(err => console.log(err))
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        style={{
          marginTop: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '2rem',
          borderRadius: '25px',
        }}
        elevation={3}
      >
        <Avatar
          style={{
            margin: '1rem',
            backgroundColor: '#00D37F',
          }}
        >
          <ShoppingBagIcon />
        </Avatar>
        <Typography variant="h5">Confirm Order:</Typography>
        <form
          style={{ width: '100%', marginTop: '2rem' }}
          onSubmit={handleSubmit}
        >
          <Grid container spacing={2}>
            <Input
              name="name"
              label="Your Name"
              handleChange={handleChange}
              type="text"
              half
            />
            <Input
              name="lastname"
              label="Your Lastname"
              handleChange={handleChange}
              type="text"
              half
            />
            <Input
              name="address"
              label="Your Address"
              handleChange={handleChange}
              type="text"
            />
            <Input
              name="city"
              label="Your City"
              handleChange={handleChange}
              type="text"
              half
            />
            <Input
              name="zip"
              label="Your Zip Code"
              handleChange={handleChange}
              type="number"
              half
            />
            <Input
              name="creditCard"
              label="Credit Card Number (without spaces)"
              handleChange={handleChange}
              type="number"
            />
            <Input
              name="expirationDate"
              label="Expiration Date"
              handleChange={handleChange}
              type="number"
              half
            />
            <Input
              name="CVV"
              label="CVV"
              handleChange={handleChange}
              type="number"
              half
            />
          </Grid>
          <Box sx={{ display: 'flex' }}>
            <Button
              style={{
                marginTop: '1rem',
                backgroundColor: '#00D37F',
                marginRight: '10px',
              }}
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
            >
              Place Order
            </Button>
            <Button
              style={{ marginTop: '1rem', backgroundColor: '#0F2830' }}
              fullWidth
              variant="contained"
              color="secondary"
              onClick={() => navigate('/cart')}
            >
              Go Back
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  )
}

export default Checkout
