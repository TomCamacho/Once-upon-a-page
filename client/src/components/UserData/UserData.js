import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import Card from '../commons/Card'
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
    '& > *': {
      margin: 50,
    },
  },
  section: {
    marginBottom: 50,
  },
  heading: {
    marginBottom: 50,
  },
}))

const UserData = () => {
  const id = useParams().id
  const classes = useStyles()
  const [user, setUser] = React.useState([])
  const [favorites, setFavorites] = React.useState([])
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [userName, setUserName] = useState('')

  useEffect(() => {
    axios.get(`http://localhost:3001/api/users/id/${id}`).then(res => {
      setUser([res.data])
      setFavorites(res.data.favorites)
      setName(res.data.name)
      setLastName(res.data.lastName)
      setEmail(res.data.email)
      setUserName(res.data.userName)
    })
  }, [id])

  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <div className={classes.section}>
          <Typography variant="h4" className={classes.heading}>
            Información del usuario
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Nombre" value={name} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Apellido" value={lastName} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Correo electrónico" value={email} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Nombre de usuario" value={userName} />
            </Grid>
          </Grid>
        </div>

        <div className={classes.section}>
          <Typography variant="h4" className={classes.heading}>
            Contenido favorito del usuario
          </Typography>
          <Box display="flex" flexDirection="row" justifyContent="center">
            {favorites.length > 0 ? (
              favorites.map((data, i) => (
                <Link to={`favdetails/${data.type}/${data.id}`} key={i}>
                  <Card data={data.data} />
                </Link>
              ))
            ) : (
              <Typography variant="body1">
                No se han cargado favoritos
              </Typography>
            )}
          </Box>
        </div>
      </Container>
    </div>
  )
}

export default UserData
