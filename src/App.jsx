import React, { useRef } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Navbar } from './components/navbar/Navbar'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Home } from './components/home/Home';
import { WishList } from './components/wishlist/WishList';

import { Carts } from './components/cartItems/Carts';


function App() {
  const searchRef=useRef(null)

  const searchScroll=()=>{
    searchRef.current.scrollIntoView({behavior:"smooth"})
  }

  return (
    <>
    <div className=''>
    <BrowserRouter>
     <Navbar searchScroll={searchScroll}/>
    <Routes>
      <Route path='/' element={<Home searchRef={searchRef}/>}/>
      <Route path='/wishlist' element={<WishList/>}/>
      <Route path='/cart' element={<Carts/>}/>
    </Routes>
  </BrowserRouter>
    </div>

    </>
  )
}

export default App
