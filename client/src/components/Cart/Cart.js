import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { useSelector, useDispatch } from "react-redux";
import { removeAll } from "../../store/cart";

import CardCart from "../../commons/Details/CardCart";
import { Button, Stack, Typography } from "@mui/material";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduxUser = useSelector((state) => state.user);

  const reduxCart = useSelector((state) => state.cart);

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let total = 0;
    reduxCart.forEach((product) => {
      total += (product.price * product.units) / 100;
    });
    setTotalPrice(total);
  }, [reduxCart]);

  const handleCheckOut = () => {
    reduxUser !== null ? navigate("/checkOut") : navigate("/login");
  };

  const handleDeleteCart = () => {
    dispatch(removeAll(reduxCart));
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      {reduxCart?.map((product, i) => {
        return <CardCart product={product} key={i} />;
      })}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginTop: "16px" }}
      >
        <Typography variant="h6" component="div">
          Total: USD {totalPrice.toFixed(2)}
        </Typography>
        <Stack direction="row">
          <Button
            sx={{
              backgroundColor: "#D2C4FB",
              "&:hover": {
                backgroundColor: "#D2C4FB",
                cursor: "pointer",
              },
            }}
            variant="contained"
            onClick={handleCheckOut}
          >
            Check Out
          </Button>
          <Button
            sx={{
              backgroundColor: "#0F2830",
              color: "white",
              "&:hover": {
                backgroundColor: "#0F2830",
                cursor: "pointer",
              },
            }}
            variant="outlined"
            onClick={handleDeleteCart}
          >
            Delete Cart
          </Button>
        </Stack>
      </Stack>
    </div>
  );
};

export default Cart;
