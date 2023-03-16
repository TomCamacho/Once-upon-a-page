import React from 'react'

import HistoryCard from '../../commons/Card/HistoryCard'
import { Box, Typography } from '@mui/material'

const HistoryGrid = ({orders}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {orders.map((order, i) => {
        return (
          <Box key={i} sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '1em',
            padding: '1em',
            backgroundColor: '#cfc6c6',
            width: '50%',

            '@media (max-width: 768px)': {
              width: 'auto',
            },

          }} >
            <Typography sx={{ alignSelf: 'flex-start' }}>Order ID: {`${order.id}`}</Typography>
            <Typography sx={{ alignSelf: 'flex-start' }}>
              Created at:
            </Typography>
            <Typography sx={{ alignSelf: 'flex-start' }}>
              Total USD:{`${(order.total / 100).toFixed(2)}`}
            </Typography>
            <Typography sx={{ alignSelf: 'flex-start' }}>
              Status: {`${order.status}`}
            </Typography>
            <Box
            
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#e3dede',
              margin: '1em',
              width: '80%',

              '@media (max-width: 1000px)': {
                width: 'auto',
              },
            }}
          >
            
            {order.products.map((product, i) => {
              return <HistoryCard product={product} key={i} />
            })}
          </Box>

            
          </Box>
          
        )
      })}
    </div>
  )
}

export default HistoryGrid
