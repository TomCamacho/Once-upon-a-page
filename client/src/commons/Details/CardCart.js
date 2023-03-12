import React from 'react'
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Button,
  Box,
} from '@mui/material'
import { Delete, Add, Remove } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { addUnit, removeProduct, subtractUnit } from '../../store/cart'
import { message } from 'antd'
import { useNavigate } from 'react-router'

const CartProduct = ({ product }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleAdd = () => {
    dispatch(addUnit(product.id))
  }

  const handleRemove = () => {
    dispatch(subtractUnit(product.id))
  }

  const handleDelete = () => {
    dispatch(removeProduct(product.id))
    message.success(`The product has been removed`)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '16px',
      }}
    >
      <Card
        sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#F5F5F5',
          color: '#333',
          fontFamily: 'Arial, sans-serif',
          maxWidth: '500px',
          width: '100%',
        }}
      >
        <CardMedia
          onClick={() => navigate(`/book/${product.id}`)}
          component="img"
          image={product.images[0]}
          alt={product.name}
          sx={{
            width: '100px',
            height: '100px',
            objectFit: 'contain',
            marginRight: '16px',
            '&:hover': {
              cursor: 'pointer',
            },
          }}
        />
        <CardContent>
          <Typography
            sx={{
              '&:hover': {
                cursor: 'pointer',
              },
            }}
            onClick={() => navigate(`/book/${product.id}`)}
            variant="h6"
            component="div"
            gutterBottom
          >
            {product.name}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'right',
              marginBottom: '8px',
            }}
          >
            <Typography
              variant="h6"
              component="div"
              gutterBottom
              sx={{ marginRight: '8px' }}
            >
              {`USD ${(product.price / 100).toFixed(2)}`}
            </Typography>
            <Typography variant="body1" color="text.secondary" component="p">
              weight: {`${product.weight} gr.`}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton aria-label="remove" onClick={handleRemove}>
              <Remove />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ margin: '0 8px' }}>
              {product.units}
            </Typography>
            <IconButton aria-label="add" onClick={handleAdd}>
              <Add />
            </IconButton>
          </Box>
        </CardContent>
        <CardActions sx={{ marginLeft: 'auto' }}>
          <Button size="small" color="error" onClick={handleDelete}>
            <Delete sx={{ marginRight: '8px' }} />
            Delete
          </Button>
        </CardActions>
      </Card>
    </Box>
  )
}

export default CartProduct
