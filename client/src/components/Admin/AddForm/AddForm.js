import { Modal, Button, Typography, Box, TextField } from '@mui/material'
import * as React from 'react'
import Checkbox from '@mui/material/Checkbox'
import Autocomplete from '@mui/material/Autocomplete'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import StickyHeadTable from './prueba'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />
const categories = [
  { name: 'Romance', id: 'romance' },
  { name: 'Mystery/Thriller', id: 'mystery' },
  { name: 'Science Fiction/Fantasy', id: 'sci-fi' },
  { name: 'Horror', id: 'horror' },
  { name: 'Historical Fiction', id: 'historical' },
  { name: 'Young Adult', id: 'young-adult' },
  { name: 'LGBT', id: 'lgbt' },
  { name: "Children's", id: 'children' },
  { name: 'Biography/Autobiography', id: 'biography' },
  { name: 'Self-help', id: 'self-help' },
]



const AddForm = () => {

  const initialFormState = {
    ISBM: '',
    Genre: '',
    Stock: '',
    Price: '',
  }

  const [formData, setFormData] = React.useState(initialFormState)

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const CheckboxesTags = () => {
    return (
      <Autocomplete
        sx={{ mb: 2 }}
        multiple
        id="checkboxes-tags-demo"
        options={categories}
        disableCloseOnSelect
        getOptionLabel={option => option.name}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox icon={icon} checkedIcon={checkedIcon} checked={selected} />
            {option.name}
          </li>
        )}
        renderInput={params => (
          <TextField {...params} name='Genre' label="Genres" handleChange={handleChange} />
        )}
      />
    )
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
    // Aquí puedes realizar la lógica de envío del formulario
    console.log(formData)
    handleClose()
  }

  return (
    <>
      <StickyHeadTable />
      <Button onClick={handleOpen}>Add new product</Button>
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
            Add product
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              handleChange={handleChange}
              name="ISBM"
              label="ISBM"
              fullWidth
              required
              sx={{ mb: 2 }}
            />

            {CheckboxesTags()}

            <TextField name='Stock' label="Stock" handleChange={handleChange} fullWidth required sx={{ mb: 2 }} />
            <TextField
              handleChange={handleChange}
              name='Price'
              label="Price"
              fullWidth
              required
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

export default AddForm
