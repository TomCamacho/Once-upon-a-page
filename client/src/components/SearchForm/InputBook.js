import React, { useState } from 'react'
import { InputBase, useTheme } from '@mui/material'
import { createBreakpoints } from '@mui/system'

const InputBook = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const theme = useTheme()

  const handleSearchTermChange = event => {
    setSearchTerm(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    // Aquí puedes realizar alguna acción con el término de búsqueda
    console.log(searchTerm)
  }

  const breakpoints = createBreakpoints(theme.breakpoints.values)

  return (
    <form onSubmit={handleSubmit}>
      <InputBase
        sx={{
          backgroundColor: '#fff',
          borderRadius: 5,
          width: '100%',
          mr: 20,
          [breakpoints.up('sm')]: {
            width: '50px', // Ancho para pantallas >= 600px
          },
          [breakpoints.up('md')]: {
            width: '500px', // Ancho para pantallas >= 960px
          },
          [breakpoints.up('lg')]: {
            width: '600px', // Ancho para pantallas >= 1280px
          },
        }}
        placeholder="Search books / authors"
        inputProps={{ 'aria-label': 'search' }}
        value={searchTerm}
        onChange={handleSearchTermChange}
      />
    </form>
  )
}

export default InputBook