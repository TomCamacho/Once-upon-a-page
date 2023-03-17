import React, { useState } from 'react'
import { InputBase } from '@mui/material'

const InputBook = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchTermChange = event => {
    setSearchTerm(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    // Aquí puedes realizar alguna acción con el término de búsqueda
    console.log(searchTerm)
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputBase
        sx={{
          backgroundColor: '#fff',
          borderRadius: 5,
          width: '100%',
          mr: 20,
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
