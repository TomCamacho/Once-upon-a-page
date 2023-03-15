import React, { useState } from 'react'
import { Modal, Button, Typography, Box, TextField } from '@mui/material'

const Adress = () => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = event => {
    event.preventDefault()
    // Aquí puedes realizar la lógica de envío del formulario
    handleClose()
  }

  return (
    <>
      <Button onClick={handleOpen}>Open modal</Button>
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
            Agregar dirección
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField label="Dirección" fullWidth required sx={{ mb: 2 }} />
            <TextField
              select
              label="Tipo de vivienda"
              fullWidth
              required
              SelectProps={{
                native: true,
              }}
              sx={{ mb: 2 }}
            >
              <option value="casa">Casa</option>
              <option value="departamento">Departamento</option>
            </TextField>
            <TextField
              label="Código postal"
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField label="Piso" fullWidth sx={{ mb: 2 }} />
            <TextField label="Letra" fullWidth sx={{ mb: 2 }} />
            <TextField
              label="Detalles"
              fullWidth
              multiline
              rows={4}
              sx={{ mb: 2 }}
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

export default Adress
