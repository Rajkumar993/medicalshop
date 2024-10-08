import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { GET_TOP_PRODUCT } from '../../apollo/Apollo'
import { SHOP_ID } from '../../env'
import { useSelector } from 'react-redux'
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemButton from '@mui/joy/ListItemButton';
import Typography from '@mui/joy/Typography';
import { Link, useNavigate } from 'react-router-dom'
export const TopProduct = () => {
  const{userId}=useSelector(state=>state.auth)
const navigate =useNavigate()
  const[topProduct,setTopProduct]=useState([])
  const{data,loading,error,refetch}=useQuery(GET_TOP_PRODUCT,{
    variables:{
      filter: {
    shopId: SHOP_ID,
    userId
  }
    }
  })

  useEffect(()=>{
    if(data){
  setTopProduct(data.topProducts.slice(0,5))
    }else{
      // return <p>currently Unavailable</p>
    }
  },[data])
  console.log(topProduct)
  if(loading) {
    return (
   <div className='w-full flex items-center h-screen justify-center '>
   <div className='w-12 h-12 border border-3 rounded-full border-[#1d7264]  border-t-0 animate-spin'>
   
   
   </div>
   </div>
    )
   }
  return (
    <Box
    
    sx={{
      flexGrow: 1,
      display: 'flex',
      justifyContent: 'center',
      gap: 2,
      flexWrap: 'wrap',
      '& > *': { minWidth: 0, flexBasis: 200 },
      position:'absolute',
      right:60,
      top:0,
      padding:"8px"
    }}
  >
    {["lg"].map((size) => (
      <div key={size}>
        <Typography level="body-xs" sx={{ mb: 10 }}>

        </Typography>
        <List
       
          size={size}
          variant="outlined"
          sx={{ width: 300, borderRadius: 'sm' }}
        >
          <ListItem>
            <Typography  className='font-bold text-xl '>
         
             <p className='text-center'> Top Products</p>
            </Typography>
          </ListItem>
          { topProduct.map(pro=>{
           return <ListItem  onClick={()=>{
             
            navigate(`/product/${pro.id}`)
            
           }}>
            <Typography  className='border-b py-4 w-full'>
          <p className='flex  gap-4 items-center'>
          <img  className='w-20 h-20 object-cover' src={`https://s3.ap-south-1.amazonaws.com/business.strackit.com/${pro.featureImage}`} alt="" />
            <p className='text-sm flex flex-col gap-2'>
              {pro.name}
              <p>₹ {pro.prize.toLocaleString()}</p>
              </p>
           
          </p>
          
            </Typography>
          </ListItem>
          })}
          
        </List>
      </div>
    ))}
  </Box>
  )
}
