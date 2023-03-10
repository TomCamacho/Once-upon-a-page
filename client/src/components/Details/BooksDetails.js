import React, { Component, useState } from "react";
import CardDetailsBook from "../../commons/Details/CardDetailsBook";
import {
  Box,
  Grid,
  Typography,
  Button,
  Collapse,
  Rating,
  Link,
} from "@mui/material";
import CardReviewBook from "../../commons/Details/CardReviewBook";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import seed from '../../FakeData/FakeData'

const BooksDetails = () => {
  const [expanded, setExpanded] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const params = useParams();
  const id = params.id-1;
  const handleToggle = () => {
    setShowMore(!showMore);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Grid container spacing={3} justifyContent="center">
      <Box sx={{ display: { xs: "block", md: "block", lg: "none" } }}>
        <Grid marginTop="50px" item xs={12} md={12}>
          <Box display="flex" justifyContent="center" mb={2}>
            <CardDetailsBook data={seed[id]} />
          </Box>
        </Grid>
      </Box>
      <Box
        sx={{
          display: { xs: "none", md: "none", lg: "block" },
          position: "fixed",
          left: "220px",
          top: "65px",
        }}
      >
        <Grid marginTop="50px" item xs={12}>
          <Box display="flex" justifyContent="center" mb={2}>
            <CardDetailsBook data={seed[id]} />
          </Box>
        </Grid>
      </Box>
      <Grid
        marginTop="50px"
        item
        xs={12}
        md={12}
        lg={6}
        sx={{ maxWidth: "800px", marginLeft: "40px", marginRight: "40px" }}
      >
        <Box mb={2}>
          <Typography variant="h4">{seed[id].title}</Typography>
          <Typography variant="body1" component="div">
            {seed[id].authors.map((author, index) => (
              <React.Fragment key={index}>
                <Link
                  href={`/${author}`}
                  sx={{
                    color: "inherit",
                    textDecoration: "none",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  {author}
                </Link>
                {index < seed[id].authors.length - 1 ? ", " : ""}
              </React.Fragment>
            ))}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            transition: "background-color 0.3s ease",
            borderRadius: "8px",
            paddingTop: "10px",
            paddingBottom: "10px",
            marginBottom: "10px",
            "&:hover": {
              backgroundColor: "lightgray",
            },
          }}
        >
          <Rating
            value={seed[id].rating}
            readOnly
            precision={0.1}
            size="medium"
          />
          <Typography
            variant="h4"
            component="div"
            sx={{
              marginLeft: "8px",
              fontSize: "1.25rem",
            }}
          >
            {seed[id].rating}
          </Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="h5">Description</Typography>
          <Typography variant="body1" color="text.secondary">
            {showMore
              ? seed[id].description
              : `${seed[id].description.substring(0, 300)}...`}
          </Typography>
        </Box>
        <Box>
          {seed[id].description.length > 300 && (
            <Link
              component="button"
              variant="body2"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "Show less" : "Show more"}
            </Link>
          )}
        </Box>
        <Box
          mb={2}
          sx={{
            paddingTop: "10px",
          }}
        >
          <Typography variant="h5">Genres</Typography>
          <Box display="flex">
            {seed[id].genres &&
              seed[id].genres.map((genre, i) => (
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
            Number of pages: {seed[id].pages}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Publishing house: {seed[id].publishingHouse}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            weight: {seed[id].weight} gr.
          </Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="h5">Reviews</Typography>
          {seed[id].reviews && seed[id].reviews.length > 0 ? (
            <Box>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleExpandClick}
                sx={{ mb: 1 }}
              >
                {expanded ? "Hide Reviews" : "Show Reviews"}
              </Button>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                {seed[id].reviews.map((review) => (
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
  );
};

export default BooksDetails;
