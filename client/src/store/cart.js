import { createAction, createReducer } from "@reduxjs/toolkit";

export const addUnit = createAction("addUnit");
export const subtractUnit = createAction("subtractUnit");
export const newProduct = createAction("newProduct");
export const removeProduct = createAction("removeProduct");
export const removeAll = createAction("removeAll");

const initialState = [];

const cartReducer = createReducer(initialState, {
  [addUnit]: (state, action) => {
    return console.log(
      state.map((product) => {
        if (product.id === action.payload) {
          return (product.units += 1);
        }
      })
    );
  },
  [subtractUnit]: (state, action) => {
    return console.log(
      state.map((product) => {
        if (product.units === 1) {
          return state.filter((product) => product.id !== action.payload);
        }
        if (product.id === action.payload) {
          return (product.units -= 1);
        }
      })
    );
  },
  [newProduct]: (state, action) => {
    state.map((product) => {
      if (product.id === action.payload.id) {
        return (product.units += 1);
      }
    });
    return [...state, action.payload];
  },
  [removeProduct]: (state, action) => {
    return state.filter((product) => product.id !== action.payload);
  },
  [removeAll]: (state, action) => (state = initialState),
});

export default cartReducer;

// {
//   id: 1,
//   name: "Al final mueren los dos",
//   images: [
//     "https://www.tematika.com/media/catalog/Ilhsa/Imagenes/646539.jpg",
//   ],
//   price: 3490,
//   weight: 300,
//   units: 1,
// },
// {
//   id: 2,
//   name: "La sombra del viento",
//   images: [
//     "https://http2.mlstatic.com/D_NQ_NP_2X_632026-MLA42908785277_072020-F.webp",
//   ],
//   price: 4590,
//   weight: 400,
//   units: 2,
// },
