import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Rating,
  Box,
} from '@mui/material'
import React from 'react'

const CardReviewBook = ({ review }) => {
  return (
    <Card
      sx={{
        backgroundColor: '#F5F5F5',
        color: '#333',
        fontFamily: 'Arial, sans-serif',
        '&:hover': {
          boxShadow: '0px 0px 5px 1px rgba(0,0,0,0.2)',
        },
      }}
    >
      <CardHeader
        title={review.author}
        subheader={review.createdAt}
        sx={{
          marginBottom: '8px',
        }}
      />
      <Typography
        variant="h4"
        component="div"
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginLeft: '8px',
          fontSize: '1.25rem',
        }}
      >
        <Box
          sx={{
            color: 'black',
            marginRight: '8px',
          }}
        >
          {review.score}
        </Box>
        <Rating value={review.score} readOnly precision={0.1} size="medium" />
      </Typography>
      <CardContent
        sx={{
          marginTop: '8px',
        }}
      >
        <Typography variant="body1" color="text.secondary" component="p">
          {review.content}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default CardReviewBook
