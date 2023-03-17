import { Modal, Button, Typography, Box, TextField } from '@mui/material'
import * as React from 'react'
import OrdersTable from './OrdersTable'
import { message } from 'antd'

const Orders = () => {
  const initialFormState = {
    id: '',
    userId: '',
    userName: "",
    userEmail: "",
    status: '',
  }

  const [formData, setFormData] = React.useState(initialFormState)

  const handleChange = e => {
   // const { name, value } = e.target
    const newValue =
    setFormData({ ...formData, [e.target.name]: newValue })
  }

  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = event => {
    event.preventDefault()
    console.log(formData)
    message.success(`The order has been modified`)
    handleClose()
  }

  return (
    <>
      <OrdersTable />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: '8px',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            id="modal-title"
            variant="h6"
            component="h2"
            sx={{ mb: 2 }}
          >
            Watch Orders
          </Typography>
          <form onSubmit={handleSubmit}>
          <TextField
              onChange={handleChange}
              name="id"
              label="Order ID"
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              onChange={handleChange}
              name="fullname"
              label="Full Name"
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              onChange={handleChange}
              name="price"
              label="Price"
              fullWidth
              required
              sx={{ mb: 2 }}
              InputProps={{
                inputProps: {
                  pattern: '[0-9]*',
                  inputMode: 'numeric',
                },
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="outlined" onClick={handleClose} sx={{ mr: 2 }}>
                Cancelar
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Agregar
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  )
}

export default Orders
