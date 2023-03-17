import React, { useState } from 'react'
import { Button, Box, Typography, TextField } from '@mui/material'
import { message } from 'antd'

function OrdersModal({ row }) {
  const { id, idUser, fullNameUser, totalAmount, totalItems, status } = row
  console.log(row)
  const [open, setOpen] = useState(false)
  const [orderData, setOrderData] = useState({
    id,
    idUser,
    fullNameUser,
    totalAmount,
    totalItems,
    status,
  })

  const handleOpen = () => {
    setOpen(true)
  }

  const handleInputChange = event => {
    const { name, value } = event.target
    setBookData({
      ...orderData,
      [name]: value,
    })
  }

  const handleUpdateOrder = () => {
    console.log(orderData)
    //axios.put(`http://localhost:3001/books/${bookData.id}`, bookData)
    message.success(`The order ${orderData.id} has been updated`)
    setOpen(false)
  }

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Id: {id}
      </Typography>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ flex: 1, mr: 2, marginTop: 2 }}>
          <TextField
            name="totalamount"
            label="Total Amount (¢ USD)"
            value={orderData.totalAmount}
            onChange={handleInputChange}
            fullWidth
          />
        </Box>
        <Box sx={{ flex: 1, mr: 2, marginTop: 2 }}>
          <TextField
            name="totalItems"
            label="Total items"
            value={orderData.totalItems}
            onChange={handleInputChange}
            fullWidth
          />
        </Box>
        <Box sx={{ flex: 1, mr: 2, marginTop: 2 }}>
          <TextField
            name="status"
            label="status"
            value={orderData.status}
            onChange={handleInputChange}
            fullWidth
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, mr: 2 }}>
        <Button variant="contained" onClick={handleUpdateOrder} color="primary">
          Update
        </Button>
      </Box>
    </Box>
  )
}

export default OrdersModal
