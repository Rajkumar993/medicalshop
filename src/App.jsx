import React from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { Navbar } from './components/navbar/Navbar'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


function App() {

  return (
    <>
    <div className=''>
    <BrowserRouter>
     <Navbar/>
  
</BrowserRouter>
    </div>

    </>
  )
}

export default App
