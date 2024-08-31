import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { GET_PRODUCTS } from '../../apollo/Apollo';
import { SHOP_ID } from '../../env';
import { IoGrid } from "react-icons/io5";
import { FaList } from "react-icons/fa";

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { ProdutsCard } from './ProdutsCard';
import { TopProduct } from './TopProduct';
export const Products = () => {
  const {authState,userId}=useSelector(state=>state.auth) 
  const {cat}=useSelector(state=>state.category) 
  const[products,setProducts]=useState([]);
  const [view, setView] = React.useState('list');
const[grid,setGrid]=useState(false)
  const handleChange = (event, nextView) => {
  
    setView(nextView);
    if(nextView=='module'){
      setGrid(true)
    }else{
      setGrid(false)
    }
  };
  const {loading,error,data}=useQuery(GET_PRODUCTS,{
    variables:{
      filter:{
        shopId:SHOP_ID,
        userId
      }
    }
  });
  useEffect(()=>{
    if (data) {
      setProducts(data.products); 
      console.log(data)
    }
   
  },[data])
useEffect(()=>{
if(cat){

  setProducts(data.products.filter(pro=>pro.name.toLowerCase().includes(cat.toLowerCase())))
}

},[cat,data])
useEffect(()=>{
if(cat=="All Products" &&data){
  setProducts(data.products); 
}
},[cat,data])

  if(loading) {
    return (
   <div className='w-full flex items-center h-screen justify-center'>
   <div className='w-12 h-12 border border-3 rounded-full border-[#1d7264]  border-t-0 animate-spin'>
   
   
   </div>
   </div>
    )
   }
  return (
    <>
    <div className='w-full pt-10 pl-32 '>
     <div className='flex items-center gap-80  relative'>
     <ToggleButtonGroup
      orientation="horizontal"
      value={view}
      exclusive
      onChange={handleChange}
    
    >
      <ToggleButton value="list"  aria-label="list"  sx={{ 
          '&.Mui-selected': {
            color: '#1d7264',
          }
        }}>
        <IoGrid  className='text-2xl'/>
      </ToggleButton>
      <ToggleButton value="module" aria-label="module"  sx={{ 
          '&.Mui-selected': {
            color: '#1d7264',
          }
        }}>
        <FaList  className='text-2xl' />
      </ToggleButton>
 
    </ToggleButtonGroup>
    <p className='text-5xl'>PRODUCTS</p>
    <TopProduct/>
     </div>
     
    </div>
    <div className={`grid md:mr-80 md:ml-32  mt-10 grid-cols-1 md:grid-cols-2    gap-7 items-center  place-items-center ${grid?"xl:grid-cols-1":"xl:grid-cols-3"}`}>
    {
      products.map(product=>(
           <ProdutsCard key={product.id} grid={grid} product={product}/>

      
      ))
    }
    </div>
    </>
  )
}
