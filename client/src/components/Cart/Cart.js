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

  /*  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Al final mueren los dos",
      images: [
        "https://www.tematika.com/media/catalog/Ilhsa/Imagenes/646539.jpg",
      ],
      price: 3490,
      weight: 300,
      units: 1,
    },
    {
      id: 2,
      name: "La sombra del viento",
      images: [
        "https://www.tematika.com/media/catalog/product/l/a/la_sombra_del_viento_1.jpg",
      ],
      price: 4590,
      weight: 400,
      units: 2,
    },
  ]);
 */
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
    console.log("apretaste remove all");
    console.log("reduxCart", reduxCart);
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
          <Button variant="contained" onClick={handleCheckOut}>
            Check Out
          </Button>
          <Button variant="outlined" onClick={handleDeleteCart}>
            Delete Cart
          </Button>
        </Stack>
      </Stack>
    </div>
  );
};

export default Cart;
