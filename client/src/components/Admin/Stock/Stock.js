import { Modal, Button, Typography, Box, TextField } from '@mui/material'
import * as React from 'react'
import Checkbox from '@mui/material/Checkbox'
import Autocomplete from '@mui/material/Autocomplete'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import StockTable from './StockTable'
import axios from 'axios'
import { message } from 'antd'

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

const Stock = () => {
  const initialFormState = {
    isbn: '',
    genres: [],
    stock: '',
    price: '',
  }

  const [formData, setFormData] = React.useState(initialFormState)

  const handleChange = e => {
    const { name, value } = e.target
    const newValue =
      name === 'stock' || name === 'price' || name === 'isbn'
        ? Number(value)
        : value
    setFormData({ ...formData, [e.target.name]: newValue })
  }

  const handleCheckboxChange = option => {
    const currentIndex = formData.genres.indexOf(option)
    const newSelectedOptions = [...formData.genres]

    if (currentIndex === -1) {
      newSelectedOptions.push(option)
    } else {
      newSelectedOptions.splice(currentIndex, 1)
    }

    setFormData({ ...formData, genres: newSelectedOptions })
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
        value={formData.genres}
        onChange={(_, value) => setFormData({ ...formData, genres: value })}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              checked={selected}
              name="genres"
              value={option.name}
              onChange={() => {
                handleCheckboxChange(option)
              }}
            />
            {option.name}
          </li>
        )}
        renderInput={params => <TextField {...params} label="Genres" />}
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
    const finalGenre = formData.genres.map(genre => {
      return genre.name
    })
    formData.genres = finalGenre

    axios.post(`http://localhost:3001/books`, formData).then(res => console.log(res.data))
    message.success(`The book has been added`)
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
        Add new product
      </Button>
      <StockTable />
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
              onChange={handleChange}
              name="isbn"
              label="ISBN"
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

            {CheckboxesTags()}

            <TextField
              name="stock"
              label="Stock"
              onChange={handleChange}
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

export default Stock
