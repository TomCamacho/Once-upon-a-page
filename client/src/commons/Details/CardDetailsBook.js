import React from "react";
import { Box, Button, Grid } from "@mui/material";
import { newProduct } from "../../store/cart";
import { useDispatch } from "react-redux";
import { message } from "antd";

const CardDetailsBook = ({ data }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    let addToCart = {
      id: data.id,
      name: data.title,
      images: data.images,
      price: data.price,
      weight: data.weight,
      units: 1,
    };
    dispatch(newProduct(addToCart));
    message.success(`The product was added to the cart`);
  };

  return (
    <Grid>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "200px",
          height: "400px",
          margin: "10px",
          borderRadius: "2px",
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
          transition: "box-shadow 0.3s ease-in-out",
          "&:hover": {
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "80%",
            overflow: "hidden",
            borderRadius: "8px",
          }}
        >
          <img
            src={data.images[0]}
            alt={data.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "20%",
            padding: "16px",
            backgroundColor: "#fff",
            borderBottomLeftRadius: "8px",
            borderBottomRightRadius: "8px",
          }}
        >
          <h4 style={{ margin: 0, marginBottom: "8px", color: "black" }}>
            {`USD ${(data.price / 100).toFixed(2)}`}
          </h4>
        </Box>
      </Box>
      <Button
        onClick={handleClick}
        variant="contained"
        sx={{
          backgroundColor: "#D2C4FB",
          color: "#658E9C",
          textTransform: "none",
          borderRadius: "20px",
          width: "100%",
          "&:hover": {
            backgroundColor: "#658E9C",
            color: "#fff",
          },
        }}
      >
        Add to Cart
      </Button>
    </Grid>
  );
};
export default CardDetailsBook;
