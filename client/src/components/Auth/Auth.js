import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Input from '../../commons/Input/Input'
import jwt_decode from 'jwt-decode'
import { GoogleLogin } from '@react-oauth/google'
import { logIn } from '../../store/user'

const initialFormState = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

function Auth() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [signUp, setSignUp] = useState(false)
  const [formData, setFormData] = useState(initialFormState)

  const handleShowPassword = () => setShowPassword(prev => !prev)

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleGoogleSuccess = credentialResponse => {
    const decoded = jwt_decode(credentialResponse.credential)
    console.log(decoded)
    if (signUp) {
      axios
        .post('http://localhost:3001/user/register', {
          fullName: decoded.name,
          email: decoded.email,
          password: decoded.sub,
          confirmPassword: decoded.sub,
        })
        .then(newUser => {
          message.success(
            `New user (${newUser.data.fullName}) created successfully!`
          )
          switchMode()
        })
        .catch(err => message.error(err.message))
    } else {
      axios
        .post('http://localhost:3001/user/login', {
          email: decoded.email,
          password: decoded.sub,
        })
        .then(existingUser => {
          dispatch(logIn(existingUser.data))

          localStorage.setItem('profile', JSON.stringify(existingUser.data))

          message.success(
            `Successful login! Welcome back ${existingUser.data.fullName}`
          )
          navigate('/')
        })
        .catch(err => message.error(err.message))
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (signUp) {
      axios
        .post('/user/register', formData)
        .then(newUser => {
          message.success(
            `New user (${newUser.data.fullName}) created successfully!`
          )
          switchMode()
        })
        .catch(err => message.error(err.message))
    } else {
      axios
        .post('/user/login', formData)
        .then(existingUser => {
          dispatch(logIn(existingUser.data))

          localStorage.setItem('profile', JSON.stringify(existingUser.data))

          message.success(
            `Successful login! Welcome back ${existingUser.data.fullName}`
          )
          navigate('/')
        })
        .catch(err => message.error(err.message))
    }
  }

  const switchMode = () => {
    setSignUp(prev => !prev) // to toggle the forms
    setShowPassword(false)
    signUp === false ? navigate('/register') : navigate('/login')
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        style={{
          marginTop: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '2rem',
          borderRadius: '25px',
        }}
        elevation={3}
      >
        <Avatar
          style={{
            margin: '1rem',
            backgroundColor: '#0F2830',
          }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{signUp ? 'Sign Up' : 'Log In'}</Typography>
        <form
          style={{ width: '100%', marginTop: '2rem' }}
          onSubmit={handleSubmit}
        >
          <Grid container spacing={2}>
            {signUp && (
              <>
                <Input
                  name="fullName"
                  label="Full Name"
                  handleChange={handleChange}
                  type="text"
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password (8 characters min.)"
              handleChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={handleShowPassword}
            />
            {signUp && (
              <Input
                name="confirmPassword"
                label="Repeat password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            style={{ marginTop: '1rem', backgroundColor: '#014751' }}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            {signUp ? 'Register' : 'Log In'}
          </Button>

          <Button
            onClick={switchMode}
            fullWidth
            variant="outlined"
            color="primary"
            style={{
              marginTop: '1rem',
              backgroundColor: '#D2C4FB',
              color: 'white',
            }}
          >
            {signUp
              ? 'Have an account? Log In'
              : "Don't have an account? Register"}
          </Button>

          <Button fullWidth sx={{ marginTop: '1rem' }}>
            <GoogleLogin
              onSuccess={credentialResponse => {
                handleGoogleSuccess(credentialResponse)
              }}
              onError={() => {
                message.error('Google login failed, try later')
              }}
            />
          </Button>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth
