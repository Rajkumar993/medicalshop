import React, { useEffect, useState } from 'react'
import { SHOP_ID } from '../../env'
import { useQuery } from '@apollo/client'
import Glider from 'react-glider';
import { MdOutlineDateRange } from "react-icons/md";
import 'glider-js/glider.min.css';
import { GET_BLOGS } from '../../apollo/Apollo';
import { useNavigate } from 'react-router-dom';
export const Blog = ({blogRef}) => {
  const[blog,setBlog]=useState([])
  const{data,loading,error}=useQuery(GET_BLOGS,{
    variables:{
      filter:{
        shopId:SHOP_ID
      }
    }
  })
  const navigate=useNavigate('')

 useEffect(()=>{
  if(data){
    setBlog(data.Blog)
    
  }

 },[data])
  return (
    <div className='mt-20  px-10' ref={blogRef}>
<p className='text-center text-5xl py-10 font-semibold' > Latest Blogs</p>
<Glider
  className="glider-container "
  
  hasDots
  slidesToShow={3}
  skipTrack
>
  <div className="custom-track ">
    {blog.map((b)=>{
      return <div className='m-4  flex flex-col gap-10 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]'>
        <div className='w-full '>
        <img className=' object-cover ' src={`https://s3.ap-south-1.amazonaws.com/business.strackit.com/${b.image}`} alt="" />
        </div>
        <div className='border-b py-4 '><p className='text-center text-2xl cursor-pointer hover:text-[#1d7264]' onClick={()=>navigate(`/blog/${b.id}`)}>{b.title}</p></div>
        <div className='flex justify-between px-5 pb-10 '>
        <p className='font-bold text-[17px] flex items-center gap-2'><MdOutlineDateRange className='text-[#1d7264]'/>{new Date(b.timestamp).toLocaleString()}</p>
        <p className='font-bold text-[#1d7264] text-[17px] cursor-pointer' onClick={()=>navigate(`/blog/${b.id}`)}>READ MORE</p>
        </div>
      </div>
    })}
  </div>
</Glider>
    </div>
  )
}
