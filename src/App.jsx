import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Navbar } from './components/navbar/Navbar'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Home } from './components/home/Home';
import { WishList } from './components/wishlist/WishList';


function App() {

  return (
    <>
    <div className=''>
    <BrowserRouter>
     <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/wishlist' element={<WishList/>}/>
    </Routes>
  </BrowserRouter>
    </div>

    </>
  )
}

export default App
