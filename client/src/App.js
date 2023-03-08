import React from "react";
import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";

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
        <Route path="/book/:id">SINGLE BOOK</Route>
        <Route path="/cart">CART</Route>
        <Route path="/404">ERROR 404</Route>
      </Routes>
    </>
  );
}

export default App;
