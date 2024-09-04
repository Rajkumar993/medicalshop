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
import { ProdutsCard } from './components/products/ProdutsCard';
import { SingleProduct } from './components/products/SingleProduct';
import Footer from './components/footer/Footer';
import { Blog2 } from './components/blog/Blog2';


function App() {
  const searchRef=useRef(null)
 const blogRef=useRef(null)
 const FooterRef=useRef(null)
 
  const searchScroll=()=>{
    searchRef.current.scrollIntoView({behavior:"smooth"})
  }
const blogScroll=()=>{
  blogRef.current.scrollIntoView({behavior:"smooth"})
}
const footerScroll=()=>{
  FooterRef.current.scrollIntoView({behavior:"smooth"})
}
  return (
    <>
    <div className='overflow-x-hidden'>
    <BrowserRouter>
     <Navbar searchScroll={searchScroll } blogScroll={blogScroll} footerScroll={footerScroll}/>
    <Routes>
      <Route path='/' element={<Home searchRef={searchRef} blogRef={blogRef}/>}/>
      <Route path='/wishlist' element={<WishList/>}/>
      <Route path='/cart' element={<Carts/>}/>
      <Route path='/product/:id' element={<SingleProduct/>}/>
      <Route path='/blog/:id' element={<Blog2/>}/>
    </Routes>
    <Footer FooterRef={FooterRef}/>
  </BrowserRouter>
    </div>

    </>
  )
}

export default App
