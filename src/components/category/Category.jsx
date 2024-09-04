import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import { GET_CATEGORIES } from '../../apollo/Apollo';
import { SHOP_ID } from '../../env';
import Glider from 'react-glider';
import 'glider-js/glider.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { addCat } from '../../feature/CatSlice';

export const Category = () => {
  const[category,setCategory]=useState([]);
  const {cat}=useSelector(state=>state.category)
  const dispatch=useDispatch();
  const{data,loading,error}=useQuery(GET_CATEGORIES,{
    variables:{
      filter:{
        shopId:SHOP_ID,
        status:1
      }
    }
  })
  useEffect(()=>{
    if(data){
      setCategory(data.categories)
    }
  },[data])
  console.log(category)
  return (
    <div  className='mt-[500px]  container mx-auto px-4 py-10  border-b'>
    <ul className=' flex justify-center mx-4 items-center'>
      
      <Glider
      
  className="glider-container "
  hasArrows
  
  slidesToShow={1}
  slidesToScroll={1}
  responsive={[
    {
      breakpoint: 775,
      settings: {
        slidesToShow: "auto",
        slidesToScroll: "auto",
        itemWidth: 150,
        duration: 0.25,
        
      },
    },
  ]}
>
<li className='text-center font-bold hover:text-[#1d7264]  cursor-pointer'onClick={()=>dispatch(addCat('All Products'))}>All Products</li>
{category.map((li,inx)=>{
       return <li onClick={()=>{
         dispatch(addCat(li.category))
       }} className='text-center  font-bold hover:text-[#1d7264] cursor-pointer py-4'  key={inx}>{li.category}</li>
      })}

</Glider>
   
     
    </ul>
    </div>
  )
}
