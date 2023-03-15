import React from 'react'
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material'

const HistoryCard = ({ product }) => {
  return (
      <Card 
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F5F5F5',
          color: '#333',
          fontFamily: 'Arial, sans-serif',
          maxWidth: '500px',
          width: '100%',
          margin: '0.5em',
          '@media (max-width: 768px)': {
            width: 'auto'
          }
        }}
      >
        <CardMedia
          component="img"
          image={product.images[0]}
          alt={product.title}
          sx={{
            width: '100px',
            height: '100px',
            objectFit: 'contain',
            marginLeft: '0px',
            marginRight: '16px',
          }}
        />
        <CardContent>
          <Typography variant="h6" component="div" gutterBottom>
            {product.title}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'right',
            }}
          >
            <Typography
              variant="h6"
              component="div"
              gutterBottom
              
            >
              {`USD ${(product.price / 100).toFixed(2)}`}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" component="div">
              Units: {product.units}
            </Typography>
          </Box>
        </CardContent>
      </Card>
  )
}

export default HistoryCard
