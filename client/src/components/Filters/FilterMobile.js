import React, { useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { FilterList } from '@mui/icons-material';

const FilterMobile = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {/* Botón con icono de embudo */}
      <IconButton
        onClick={handleClick}
        sx={{
          position: 'absolute',
          bgcolor: '#1976d2',
          '&:hover': { bgcolor: '#115293' },
        }}
      >
        <FilterList sx={{ color: '#fff' }} />
      </IconButton>

      {/* Dropdown con opciones de búsqueda por estrellas */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleClose}>1 Estrella</MenuItem>
        <MenuItem onClick={handleClose}>2 Estrellas</MenuItem>
        <MenuItem onClick={handleClose}>3 Estrellas</MenuItem>
        <MenuItem onClick={handleClose}>4 Estrellas</MenuItem>
        <MenuItem onClick={handleClose}>5 Estrellas</MenuItem>
      </Menu>
    </>
  );
};

export default FilterMobile;
