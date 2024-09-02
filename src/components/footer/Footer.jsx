import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { GET_SHOP_ADDRESS } from '../../apollo/Apollo'
import { SHOP_ID } from '../../env'
import { useSelector } from 'react-redux'
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { PiCity } from "react-icons/pi";
import { TbMapPinCode } from "react-icons/tb";
const Footer = ({FooterRef}) => {
  const {userId}=useSelector(state=>state.auth)
  const[add,setAdd]=useState([])
  const {data,loading,error}=useQuery(GET_SHOP_ADDRESS,{
    variables:{
      filter:{
        userId,
        id:SHOP_ID
      }
    }
  })

  useEffect(()=>{
    if(data)
 setAdd(data.shop)

  },[data])
  
  return (
    <div ref={FooterRef} className='w-screen bg-gray-200 mt-20'>
       <div className='py-10 flex flex-col  px-10 gap-10 justify-center'>
       <ul className='flex  flex-col items-center gap-3'>
 {add.map(ad=>{
  return <>
  <li className='flex items-center gap-2'>
    <FaLocationDot/>location : {ad.address}</li>
  <li className='flex items-center gap-2'>
    <PiCity/> City :
     {ad.city}</li>
  <li>Country : {ad.country}</li>
  <li  className='flex items-center gap-2'>
    <TbMapPinCode/>Pincode :
     {ad.pincode}</li>
  <li className='flex items-center gap-2'>
    <FaPhoneAlt/>
    Phone :{ad.phone}</li>
  <li>
    Shop Name :
    {ad.name}</li>
  </>
  
 })}
 </ul>
        
            <h2 className='text-center'>© 2024 Strackit All Rights Reserved</h2>
       </div>
    </div>
  )
}

export default Footer