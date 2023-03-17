import React from 'react'
import Categories from './Categories/Categories'
import Stock from './Stock/Stock'
import UserAdmin from './UserAdmin/UserAdmin'
import Users from './Users/Users'
import Box from '@mui/material/Box';
import Orders from './Orders/Orders'


const Admin = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, maxWidth: '80%', margin: '0 auto' }}>
        <UserAdmin />
        <h3> USERS </h3>
        <Users />
        <h3> STOCK OF BOOKS</h3>
        <Stock />
        <h3> GENRES </h3>
        <Categories />
        <h3> SHOP ORDERS</h3>
        <Orders />
    </Box>
  )
}

export default Admin