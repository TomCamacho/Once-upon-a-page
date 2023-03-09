import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import { Delete, Add, Remove } from "@mui/icons-material";

const CartProduct = ({ product }) => {
  console.log("PRODUCT", product)
  const handleAdd = () => {
    console.log("ADD", product.id);
  };

  const handleRemove = () => {
    console.log("REMOVE", product.id);
  };

  const handleDelete = () => {
    console.log("DELETE",product.id);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "16px",
      }}
    >
      <Card
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#F5F5F5",
          color: "#333",
          fontFamily: "Arial, sans-serif",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <CardMedia
          component="img"
          image={product.images[0]}
          alt={product.name}
          sx={{
            width: "100px",
            height: "100px",
            objectFit: "contain",
            marginRight: "16px",
          }}
        />
        <CardContent>
          <Typography variant="h6" component="div" gutterBottom>
            {product.name}
          </Typography>
          <Box
            sx={{ display: "flex", flexDirection:"column",  alignItems: "right", marginBottom: "8px" }}
          >
            <Typography
              variant="h6"
              component="div"
              gutterBottom
              sx={{ marginRight: "8px" }}
            >
              {`USD ${(product.price/100).toFixed(2)}`}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              component="p"
            >
              weight: {`${product.weight} gr.`}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton aria-label="remove" onClick={handleRemove}>
              <Remove />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ margin: "0 8px" }}
            >
              {product.units}
            </Typography>
            <IconButton aria-label="add" onClick={handleAdd}>
              <Add />
            </IconButton>
          </Box>
        </CardContent>
        <CardActions sx={{ marginLeft: "auto" }}>
          <Button size="small" color="error" onClick={handleDelete}>
            <Delete sx={{ marginRight: "8px" }} />
            Delete
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default CartProduct;