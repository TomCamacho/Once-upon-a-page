import React, { useState } from 'react'
import { Container, Grid, TextField, Typography } from '@mui/material'

const UserAdmin = () => {
  const localStorageUser = JSON.parse(localStorage.getItem('profile'))

  if (localStorageUser === null) {
    return <h1>"No esta logueado" </h1>
  } else {
    return (
      <div
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
          padding: 20,
          '& > *': {
            margin: 50,
          },
        }}
      >
        <Container maxWidth="md" sx = {{marginTop: 10, marginBottom : 10}}>
          <div>
            <Typography variant="h5">Información del Administrador</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} sx={{marginTop: 5}}>
                <TextField fullWidth label="Nombre" value={localStorageUser.fullName} />
              </Grid>
              <Grid item xs={12} sm={6} sx={{marginTop: 5}}>
                <TextField fullWidth label="Correo electrónico" value={localStorageUser.email} />
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
    )
  }
}
export default UserAdmin
