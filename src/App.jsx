import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './componenets/Navbar'
import Home from './pages/Home'
import Footer from './componenets/Footer'
import MovieList from './pages/MovieList'
import { Outlet } from 'react-router-dom'

function App() {


  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  )
}

export default App
