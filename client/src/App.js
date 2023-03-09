import React from "react";
import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";
import BooksDetails from "./components/Details/BooksDetails"

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/">Bienvenidos al ecommerce</Route>
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/user/:id">USER</Route>
        <Route path="/books">BOOKS</Route>
        <Route path="/books/:id" element={<BooksDetails />}/>
        <Route path="/cart">CART</Route>
        <Route path="/404">ERROR 404</Route>
      </Routes>
    </>
  );
}

export default App;
