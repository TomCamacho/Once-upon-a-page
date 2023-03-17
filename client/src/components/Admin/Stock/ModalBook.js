import React, { useState } from 'react'
import { Button, Box, Typography, TextField } from '@mui/material'
import axios from 'axios'
import { message } from 'antd'

function ModalBook({ row }) {
  const { id, title, price, stock, images, ...otherProps } = row
  console.log(row)
  const [open, setOpen] = useState(false)
  const [bookData, setBookData] = useState({
    id,
    title,
    price,
    stock,
    images,
  })

  const handleOpen = () => {
    setOpen(true)
  }

  const handleInputChange = event => {
    const { name, value } = event.target
    setBookData({
      ...bookData,
      [name]: value,
    })
  }

  const handleUpdateBook = () => {
     console.log(bookData)
    //axios.put(`http://localhost:3001/books/${bookData.id}`, bookData)
    message.success(`The book ${bookData.title} has been updated`)
    setOpen(false)
  }

  const handleDeleteBook = () => {

    axios.delete(`http://localhost:3001/books/${bookData.id}`)
    message.success(`The book ${bookData.title} has been deleted`)
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
        Id: {id} Title: {title}
      </Typography>
      <Box sx={{ display: 'flex'} }>
        <Box sx={{ flex: 1, mr: 2, marginTop:2  }}>
          <TextField
            name="price"
            label="Price (¢ USD)"
            value={bookData.price}
            onChange={handleInputChange}
            fullWidth
          />
        </Box>
        <Box sx={{ flex: 1, mr: 2, marginTop:2}}>
          <TextField
            name="stock"
            label="Stock"
            value={bookData.stock}
            onChange={handleInputChange}
            fullWidth
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ flex: 1, mr: 2 , mt:2 }}>
          <TextField
            name="title"
            label="Title"
            value={bookData.title}
            onChange={handleInputChange}
            fullWidth
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, mr: 2 }}>
      <Button  onClick={handleDeleteBook} variant="contained" color="primary" sx= {{backgroundColor: "red", mr:2 }}>
          Delete
        </Button>
        <Button variant="contained" onClick={handleUpdateBook} color="primary">
          Update
        </Button>
      </Box>
    </Box>
  )
}

export default ModalBook
