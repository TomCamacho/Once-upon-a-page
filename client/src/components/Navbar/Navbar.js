import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { message } from 'antd'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Avatar,
  Box,
  Link,
  Badge,
} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

import { logOut } from '../../store/user'

const Navbar = () => {
  // Redux
  const dispatch = useDispatch()
  const reduxStateUser = useSelector(state => state.user)
  const reduxQuantity = useSelector(state => state.cart.totalQuantity)
  // LocalStorage
  const localStorageUser = JSON.parse(localStorage.getItem('profile'))

  let user

  localStorageUser !== null
    ? (user = localStorageUser)
    : (user = reduxStateUser)

  const navigate = useNavigate()

  const handleLogOut = () => {
    dispatch(logOut(user))
    localStorage.removeItem('profile')
    message.success(`Successful logout: See you around ${user.fullName}!`)
    navigate('/')
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: '#014751' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        />
        <Typography
          onClick={() => navigate('/')}
          variant="h6"
          component="div"
          sx={{ fontWeight: 'bold', flexGrow: 1, cursor: 'pointer' }}
        >
          Once Upon A Page
        </Typography>
        {user ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.5rem',
              }}
            >
              <Button
                color="error"
                sx={{ backgroundColor: '#0F2830' }}
                variant="contained"
                onClick={handleLogOut}
              >
                Log Out
              </Button>
              <Link
                href={`userData/${user.fullName}`}
                style={{ textDecoration: 'none', color: 'white' }}
              >
                <Avatar sx={{ bgcolor: '#5a91c7' }}>
                  {user.fullName
                    .split(' ')
                    .map(word => word.charAt(0))
                    .join('')}
                </Avatar>
              </Link>
            </Box>
          </div>
        ) : (
          <div>
            <Button
              sx={{
                backgroundColor: '#0F2830',
                '&:hover': {
                  backgroundColor: '#0F2830',
                },
              }}
              variant="contained"
              onClick={() => navigate('/login')}
            >
              Log In
            </Button>
          </div>
        )}
        <IconButton
          onClick={() => navigate('/cart')}
          aria-label="Cart"
          color="inherit"
        >
          <Badge badgeContent={reduxQuantity} color="error">
            <ShoppingCartIcon style={{ color: '#F8FBFF' }} />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
