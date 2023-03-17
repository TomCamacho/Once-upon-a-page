
import * as React from 'react'
import UsersTable from './UsersTable'
import { message } from 'antd'
import {
  Modal,
  Button,
  Typography,
  Box,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'

const Users = () => {
  const initialFormState = {
    id: " ",
    fullname: " ",
    email: " ",
    role: " ",
    password: " "
  }

  const [formData, setFormData] = React.useState(initialFormState)

  const [role, setRole] = React.useState('')

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
    message.success(`The user has been added`)
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
        Add new User
      </Button>
      <UsersTable />
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
            Add New User
          </Typography>
          <form onSubmit={handleSubmit}>
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
              name="email"
              label="Email"
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              onChange={handleChange}
              name="password"
              label="Password"
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="user-role-label">Rol</InputLabel>
              <Select
                labelId="user-role-label"
                id="user-role-select"
                value={role}
                onChange={handleChange}
                label="Rol"
                required
              >
                <MenuItem value="administrador">Administrador</MenuItem>
                <MenuItem value="usuario">Usuario</MenuItem>
              </Select>
            </FormControl>
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

export default Users
