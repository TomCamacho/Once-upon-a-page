import React, { useEffect, useState } from 'react'
import CardDetailsBook from '../../commons/Details/CardDetailsBook'
import {
  Box,
  Grid,
  Typography,
  Button,
  Collapse,
  Rating,
  Link,
} from '@mui/material'
import CardReviewBook from '../../commons/Details/CardReviewBook'
import { useParams } from 'react-router'
import ReviewModal from '../ReviewModal/ReviewModal'
import axios from 'axios'

const BooksDetails = () => {
  // States
  const [expanded, setExpanded] = useState(false)
  const [showMore, setShowMore] = useState(false)
  const [open, setOpen] = useState(false)
  // LocalStorage
  const localStorageUser = JSON.parse(localStorage.getItem('profile'))
  // Params
  const params = useParams()
  const id = params.id
  // Handlers
  const handleExpandClick = () => {
    setExpanded(!expanded)
  }
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const [book, setBook] = useState({ authors: [], description: '', images: [] })
  useEffect(() => {
    let ignore = false
    const fetchData = async () => {
      const response = await axios.get(`/books/${id}`)
      if (!ignore) setBook(response.data)
    }
    fetchData()
    return () => {
      ignore = true
    }
  }, [])
  console.log(book)
  return (
    <Grid container spacing={3} justifyContent="center">
      <Box sx={{ display: { xs: 'block', md: 'block', lg: 'none' } }}>
        <Grid marginTop="50px" item xs={12} md={12}>
          <Box display="flex" justifyContent="center" mb={2}>
            <CardDetailsBook data={book} />
          </Box>
        </Grid>
      </Box>
      <Box
        sx={{
          display: { xs: 'none', md: 'none', lg: 'block' },
          position: 'fixed',
          left: '220px',
          top: '65px',
        }}
      >
        <Grid marginTop="50px" item xs={12}>
          <Box display="flex" justifyContent="center" mb={2}>
            <CardDetailsBook data={book} />
          </Box>
        </Grid>
      </Box>
      <Grid
        marginTop="50px"
        item
        xs={12}
        md={12}
        lg={6}
        sx={{ maxWidth: '800px', marginLeft: '40px', marginRight: '40px' }}
      >
        <Box mb={2}>
          <Typography variant="h4">{book.title}</Typography>
          <Typography variant="body1" component="div">
            {book.authors.map((author, index) => (
              <React.Fragment key={index}>
                <Link
                  href={`/${author}`}
                  sx={{
                    color: 'inherit',
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  {author}
                </Link>
                {index < book.authors.length - 1 ? ', ' : ''}
              </React.Fragment>
            ))}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            transition: 'background-color 0.3s ease',
            borderRadius: '8px',
            paddingTop: '10px',
            paddingBottom: '10px',
            marginBottom: '10px',
            '&:hover': {
              backgroundColor: 'lightgray',
            },
          }}
        >
          <Rating value={book.rating} readOnly precision={0.1} size="medium" />
          <Typography
            variant="h4"
            component="div"
            sx={{
              marginLeft: '8px',
              fontSize: '1.25rem',
            }}
          >
            {book.rating}
          </Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="h5">Description</Typography>
          <Typography variant="body1" color="text.secondary">
            {showMore
              ? book.description
              : `${book.description.substring(0, 150)}...`}
          </Typography>
        </Box>
        <Box>
          {book.description.length > 150 && (
            <Link
              component="button"
              variant="body2"
              onClick={() => handleToggle()}
            >
              {showMore ? 'Show less' : 'Show more'}
            </Link>
          )}
        </Box>
        <Box
          mb={2}
          sx={{
            paddingTop: '10px',
          }}
        >
          <Typography variant="h5">Genres</Typography>
          <Box display="flex">
            {book.genres &&
              book.genres.map((genre, i) => (
                <Typography
                  key={i}
                  variant="body1"
                  color="text.secondary"
                  mr={2}
                >
                  {genre}
                </Typography>
              ))}
          </Box>
        </Box>
        <Box mb={2}>
          <Typography variant="h5">Details:</Typography>
          <Typography variant="body1" color="text.secondary">
            Number of pages: {book.pages}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Publishing house: {book.publishingHouse}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            weight: {book.weight} gr.
          </Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="h5">Reviews</Typography>
          {localStorageUser && (
            <Button
              variant="outlined"
              color="primary"
              sx={{ mb: 1 }}
              onClick={handleOpen}
            >
              Add Review
            </Button>
          )}
          {open === true ? (
            <ReviewModal open={open} onClose={handleClose} />
          ) : (
            ''
          )}
          {book.reviews && book.reviews.length > 0 ? (
            <Box>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleExpandClick}
                sx={{ mb: 1 }}
              >
                {expanded ? 'Hide Reviews' : 'Show Reviews'}
              </Button>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                {book.reviews.map(review => (
                  <Box key={review.id} mb={2}>
                    <CardReviewBook review={review} />
                  </Box>
                ))}
              </Collapse>
            </Box>
          ) : (
            <Typography variant="body1" color="text.secondary">
              No reviews available.
            </Typography>
          )}
        </Box>
      </Grid>
    </Grid>
  )
}

export default BooksDetails
