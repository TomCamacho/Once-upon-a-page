import React from 'react'
import {
  Container,
  Grid,
  TextField,
  Typography,
  Avatar,
  useMediaQuery,
} from '@mui/material'
import HistoryGrid from '../History/HistoryGrid'
import orders from '../../FakeData/FakeOrder'

const getInitials = name => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
}

const UserData = () => {
  const localStorageUser = JSON.parse(localStorage.getItem('profile'))
  const isScreenSmall = useMediaQuery('(max-width:600px)')

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
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Container sx={{ marginTop: 10, marginBottom: 10 }}>
              <Typography variant="h5">Información del Usuario</Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={2} sx={{ marginTop: 5 }}>
                  <Avatar 
                    src={localStorageUser.avatarUrl}
                    alt={localStorageUser.fullName}
                    sx={{ width: 80, height: 80 }}
                  >
                    {getInitials(localStorageUser.fullName)}
                  </Avatar>
                </Grid>
                <Grid item xs={12} sm={12} sx={{ marginTop: 5 }}>
                  <TextField
                    fullWidth
                    label="Full name"
                    value={localStorageUser.fullName}
                  />
                </Grid>
                <Grid item xs={12} sm={12} sx={{ marginTop: 5 }}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={localStorageUser.email}
                  />
                </Grid>
              </Grid>
            </Container>
          </Grid>
          <Grid item sm={8}>
            <Container sx={{ marginTop: 10, marginBottom: 10 }}>
              <Typography textAlign="center" variant="h5">Ordenes de compra</Typography>
              <HistoryGrid orders={orders} />
            </Container>
          </Grid>
        </Grid>
      </div>
    )
  }
}
export default UserData
