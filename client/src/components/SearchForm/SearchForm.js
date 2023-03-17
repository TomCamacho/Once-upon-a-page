import { Box, IconButton, useTheme } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import InputBook from './InputBook'

const SearchForm = () => {
  const theme = useTheme()

  const breakpoints = theme.breakpoints.values

  const handleClick = () => {
    // console.log("se hubo un click ")
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <IconButton onClick={handleClick}>
        <SearchIcon />
      </IconButton>
      <InputBook />
    </Box>
  )
}

export default SearchForm
