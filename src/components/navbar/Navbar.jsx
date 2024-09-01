import React, { useEffect, useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import {TextField,InputAdornment, Button } from '@mui/material'
import Box from '@mui/material/Box';
import HOST from '../../env';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { login } from '../../feature/Auth';
import { Link, useNavigate } from 'react-router-dom';
import { addCat } from '../../feature/CatSlice';
export const Navbar = ({searchScroll}) => {
  const[showNav,setShowNav]=useState(false)
  const[showSearch,setShowSearch]=useState(false)
  const[showLogin,setShowLogin]=useState(false)
  const [search,setSearch]=useState('')
  const navigate=useNavigate('')
  const dispatch=useDispatch()
  useEffect(()=>{
    const handleScroll=()=>{
      if(window.scrollY>150){
        setShowNav(true)
      }
      if(window.scrollY<100){
        setShowNav(false)  
      }
    }
    handleScroll()
    window.addEventListener('scroll',handleScroll)
    
  },[])
  function handleLogin() {
    window.location.href =
      "https://you.strackit.com/?redirectto="+ HOST;
  }
  const logOut = (e) => {
    Cookies.remove('ualum', { path: '/' });
    Cookies.remove('_ga', { path: '/' });
       window.location.href = HOST;
 };
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const cookieValue = urlParams.get("value");
 
    if (cookieValue) {
      Cookies.set("ualum", decodeURIComponent(cookieValue));
      dispatch(login({ userId: parseInt(cookieValue) })); // userId is extracted from cookieValue
      window.location.href = HOST;
    }
  }, [dispatch]);

  return (
    <>
    <div className=' z-50 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] relative flex justify-between items-center px-5 py-5 mt-10 bg-white mx-20'>
  <div className='text-4xl flex justify-center items-center'><Link to={'/'}>logo</Link></div>
  <div>
    <ul className='flex justify-between items-center gap-4'>
    <Link to={'/'}><li>Home</li></Link> 
    <li onClick={()=>{
      navigate('/')
      searchScroll()
      }} className='cursor-pointer'>Products</li>
    <li>Contact</li>
  
      <li>Blog</li>
    </ul>
  </div>
  <div>
    <ul className='flex justify-between items-center gap-4 '>
    <li   className='text-xl cursor-pointer relative px-3 py-3  hover:bg-[#1d7264] hover:transition-all duration-500  hover:text-white shadow-[0_10px_22px_-5px_rgba(0,0,0,0.3)] ' >
     { showSearch?<IoClose onClick={()=>setShowSearch(!showSearch)} />:<IoSearchOutline  onClick={()=>setShowSearch(!showSearch)}/>}
        <p className={`absolute z-[80] right-0 top-[65px] bg-white  shadow-[0_3px_10px_rgb(0,0,0,0.2)] transition-all duration-500  ${showSearch?" px-4 py-2 ":"h-0 px-0 py-0  overflow-hidden"}`} >  <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
      className='flex'
    >
      <TextField id="outlined-basic" value={search} onChange={(e)=>{
        setSearch(e.target.value)
      }} label="Search" variant="outlined"  InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IoSearchOutline className='cursor-pointer text-xl' onClick={(e)=>{
              e.preventDefault()
              setShowSearch(!showSearch)
              dispatch(addCat(search))
              navigate('/')
              searchScroll()
            }} />
          </InputAdornment>
        ),
      }} />

    </Box>
          </p>
        </li>
      <li onMouseEnter={()=>setShowLogin(true)} onMouseLeave={()=>setShowLogin(false)}   className='text-xl relative px-3 py-3  hover:bg-[#1d7264] hover:transition-all duration-500  hover:text-white shadow-[0_10px_22px_-5px_rgba(0,0,0,0.3)] ' >
        <FaRegUser />
        {showLogin&&<ul  className='absolute shadow-[0_3px_10px_rgb(0,0,0,0.2)]  bg-white text-black right-0 top-[44px] px-8 py-5 gap-3 flex flex-col text-[16px]' >
         <li className='cursor-pointer' onClick={()=>{
          if(Cookies.get('ualum')){
            logOut()
          }else{
            
            handleLogin()
          }
         
          }}> {Cookies.get('ualum')?"Logout":"Login"}</li>
         <li className='cursor-pointer' onClick={()=>handleLogin()}>Register</li>
         <li className='cursor-pointer' onClick={()=>{
          if(Cookies.get('ualum')){
          navigate('/wishlist')
          }else{
            alert('please login to continue')
          }
         }}>WishList</li>
        </ul>}
        </li>
        <Link to={`${document.cookie?'/cart':'/'}`}><li onClick={()=>{
          if(Cookies.get('ualum')){
            navigate('/cart')
          }else{
            alert('login to continue')
          }
          
          }} className='text-xl  px-3 py-3  hover:bg-[#1d7264] hover:transition-all duration-500  hover:text-white shadow-[0_10px_22px_-5px_rgba(0,0,0,0.3)] ' ><IoCartOutline /></li></Link>
    </ul>
  </div>
    </div>
    <div className={`flex fixed top-0 left-0   z-40 py-6 md:py-6  font-bold text-[16px] md:text-xl bg-white text-gray-600 items-center px-4 transition-all duration-1000 w-full md:px-32 justify-between shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] ${showNav?" translate-y-0 h-27 ":"h-0 -translate-y-44  overflow-hidden"}`}>
  <div className='text-4xl flex justify-center items-center'><Link to={'/'}>logo</Link></div>
  <div>
    <ul className='flex justify-between items-center gap-4'>
     <Link to={'/'}><li>Home</li></Link> 
     <li onClick={()=>{
      navigate('/')
      searchScroll()
      }} className='cursor-pointer'>Products</li>
      <li>Contact</li>
      <li>Blog</li>
    </ul>
  </div>
  <div>
    <ul className='flex justify-between items-center gap-4 '>
      <li   className='text-xl cursor-pointer relative px-3 py-3  hover:bg-[#1d7264] hover:transition-all duration-500  hover:text-white shadow-[0_10px_22px_-5px_rgba(0,0,0,0.3)] ' >
     { showSearch?<IoClose onClick={()=>setShowSearch(!showSearch)} />:<IoSearchOutline  onClick={()=>setShowSearch(!showSearch)}/>}
        <p className={`absolute z-[80] right-0 top-[65px] bg-white  shadow-[0_3px_10px_rgb(0,0,0,0.2)] transition-all duration-500  ${showSearch?" px-4 py-2 ":"h-0 px-0 py-0  overflow-hidden"}`} >  <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
      className='flex'
    >
       <TextField id="outlined-basic" value={search} onChange={(e)=>{
        setSearch(e.target.value)
      }} label="Search" variant="outlined"  InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IoSearchOutline className='cursor-pointer text-xl' onClick={(e)=>{
              e.preventDefault()
              setShowSearch(!showSearch)
              dispatch(addCat(search))
              navigate('/')
              searchScroll()
            }} />
          </InputAdornment>
        ),
      }} />
    </Box>
          </p>
        </li>
        <li onMouseEnter={()=>setShowLogin(true)} onMouseLeave={()=>setShowLogin(false)}   className='text-xl relative px-3 py-3  hover:bg-[#1d7264] hover:transition-all duration-500  hover:text-white shadow-[0_10px_22px_-5px_rgba(0,0,0,0.3)] ' >
        <FaRegUser />
        {showLogin&&<ul  className='absolute shadow-[0_3px_10px_rgb(0,0,0,0.2)]  bg-white text-black right-0 top-[44px] px-8 py-5 gap-3 flex flex-col text-[16px]' >
         <li className='cursor-pointer' onClick={()=>{
          if(document.cookie=='ualum'){
            logOut()
          }else{
            
            handleLogin()
          }
         
          }}> {document.cookie?"Logout":"Login"}</li>
         <li className='cursor-pointer' onClick={()=>handleLogin()}>Register</li>
         <li className='cursor-pointer' onClick={()=>{
          if(document.cookie){
  navigate('/wishlist')
          }else{
            alert('please login to continue')
          }
         }}>WishList</li>
        </ul>}
        </li>
        <Link to={`${document.cookie?'/cart':'/'}`}><li onClick={()=>{
          if(Cookies.get('ualum')){
            navigate('/cart')
          }else{
            alert('login to continue')
          }
          
          }} className='text-xl  px-3 py-3  hover:bg-[#1d7264] hover:transition-all duration-500  hover:text-white shadow-[0_10px_22px_-5px_rgba(0,0,0,0.3)] ' ><IoCartOutline /></li></Link>
    </ul>
  </div>
    </div>
    </>
  )
}
