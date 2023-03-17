import { Modal, Button, Typography, Box, TextField } from '@mui/material'
import * as React from 'react'
import CategoriesTable from './CategoriesTable'
import { message } from 'antd'

const Categories = () => {
  const initialFormState = {
    genre: '',
  }

  const [formData, setFormData] = React.useState(initialFormState)

  const handleChange = e => {
    setFormData(e.target.value)
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
    message.success(`The genre has been added`)
    handleClose()
  }

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="contained"
        color="primary"
        sx={{ display: 'flex', ml: 2, mb: 2 }}
      >
        Add new genre
      </Button>
      <CategoriesTable />
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
            Add Genre
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              onChange={handleChange}
              name="genre"
              label="Genre Name"
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="outlined" onClick={handleClose} sx={{ mr: 2 }}>
                Cancel
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Add
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  )
}

export default Categories
