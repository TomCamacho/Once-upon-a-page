import React, { useState } from 'react'
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Rating,
} from '@mui/material'

const ReviewModal = ({ open, onClose }) => {
  // Date
  const today = new Date()
  const currentDay = today.getDate()
  const currentMonth = today.getMonth() + 1 // January is 0, so add 1
  const currentYear = today.getFullYear()
  // LocalStorage
  const localStorageUser = JSON.parse(localStorage.getItem('profile'))
  // State
  const [reviewData, setReviewData] = useState({
    email: localStorageUser.email,
    fullName: localStorageUser.fullName,
    date: `${currentDay}-${currentMonth}-${currentYear}`,
    rating: 1,
    review: '',
  })
  // Handlers
  const handleSubmit = event => {
    event.preventDefault()
    console.log(reviewData)
    // ACA HAY QUE HACER EL PEDIDO AXIOS Y PASARLE EL OBJETO reviewData
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 400,
          bgcolor: 'background.paper',
          borderRadius: '8px',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
          New Review
        </Typography>
        <form onSubmit={handleSubmit}>
          <Typography variant="h5">{localStorageUser.fullName}</Typography>
          <Typography>{`${currentDay}-${currentMonth}-${currentYear}`}</Typography>
          <Typography variant="body1">Select Valoration:</Typography>&nbsp;
          <Rating
            name="no-value"
            value={reviewData.rating}
            onChange={e =>
              setReviewData({ ...reviewData, rating: e.target.value })
            }
          />
          <TextField
            label="Your review..."
            fullWidth
            required
            multiline
            rows={4}
            sx={{ mb: 2 }}
            value={reviewData.review}
            onChange={e =>
              setReviewData({ ...reviewData, review: e.target.value })
            }
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={onClose}
              sx={{ mr: 1 }}
            >
              Cancel
            </Button>
            <Button variant="outlined" color="primary" type="submit">
              Add
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  )
}

export default ReviewModal
