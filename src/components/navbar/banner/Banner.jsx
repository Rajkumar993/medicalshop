import React, { useEffect, useState } from 'react'
import 'glider-js/glider.min.css';
import Glider from 'react-glider';
import { useQuery } from '@apollo/client';
import { SHOP_DETAILS } from '../../../apollo/Apollo';
import { SHOP_ID } from '../../../env';
export const Banner = () => {
  const[banner,setBanner]=useState([])
  const {data,loading,error}=useQuery(SHOP_DETAILS,{
    variables:{
      filter:{
        shopId:SHOP_ID
      }
    }
  })
  useEffect(()=>{
  if(data){
    setBanner(data.banners)
  }

  },[data])
  if(loading) {
    return (
   <div className='w-full flex items-center h-screen justify-center'>
   <div className='w-12 h-12 border border-3 rounded-full border-[#1d7264]  border-t-0 animate-spin'>
   
   
   </div>
   </div>
    )
   }
  return (
    <div className='mx-10 absolute top-24 md:-top-32 left-0 right-0'>
      <Glider
  className="glider-container "

  hasDots
  hasArrows
  slidesToShow={1}
  scrollLock
>
<div>
{banner.map((b,inx)=>(
      <div key={inx} className='w-full  h-full  '>
                <div className=''>
                <img className="" src={ `https://s3.ap-south-1.amazonaws.com/business.strackit.com/${b.image}`} alt="" />
                </div>

      </div>
    ))}

</div>
</Glider>
    </div>
  )
}
