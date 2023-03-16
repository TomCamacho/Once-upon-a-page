import React from 'react'
import { Routes, Route } from 'react-router'
import Navbar from './components/Navbar/Navbar'
import Auth from './components/Auth/Auth'
import BooksDetails from './components/Details/BooksDetails'
import Cart from './components/Cart/Cart'
import Red from './components/Red/Red'
import HistoryGrid from './components/History/HistoryGrid'
import AddForm from './components/Admin/AddForm/AddForm'
import UserData from './components/UserData/UserData'


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Red />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/user/:id" element={<UserData/>}/>
        <Route path="/history" element={<HistoryGrid />}/>
        <Route path="/books">BOOKS</Route>
        <Route path="/add" element={<AddForm/>}/>
        <Route path="/book/:id" element={<BooksDetails />}>
          SINGLE BOOK
        </Route>
        <Route path="/cart" element={<Cart />} />
        <Route path="/404">ERROR 404</Route>
      </Routes>
    </>
  )
}

export default App
