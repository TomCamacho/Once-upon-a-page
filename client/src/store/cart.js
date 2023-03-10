import { createAction, createReducer } from "@reduxjs/toolkit";

export const addUnit = createAction("addUnit");
export const subtractUnit = createAction("subtractUnit");
export const newProduct = createAction("newProduct");
export const removeProduct = createAction("removeProduct");
export const removeAll = createAction("removeAll");

const initialState = [
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
        "https://http2.mlstatic.com/D_NQ_NP_2X_632026-MLA42908785277_072020-F.webp",
      ],
      price: 4590,
      weight: 400,
      units: 2,
    },
  ];

const cartReducer = createReducer(initialState, {
  [addUnit]: (state, action) => action.payload.data,
  [subtractUnit]: (state, action) => (state = initialState),
  [newProduct]: (state, action) => {
    return { ...state, products: [...state.products, action.payload] };
  },
  [removeProduct]: (state, action) => {
    return {
      ...state,
      products: state.products.filter((product) => product.id !== action.payload.id),
    };
  },
  [removeAll]: (state, action) => (state = null)
});

export default cartReducer;