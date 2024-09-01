import React ,{useEffect, useState }from 'react'



import { Cart } from './Cart';
import { useSelector } from 'react-redux'
import { GET_CART } from '../../apollo/Apollo'
import { SHOP_ID } from '../../env'
import { useQuery } from '@apollo/client';
import { Box, Button, TextField } from '@mui/material'
import { Breadcrum } from '../Breadcrum/Breadcrum';
import { useNavigate } from 'react-router-dom';
export const Carts = () => {
 
const navigate =useNavigate()
  const {authState,userId}=useSelector(state=>state.auth)
  const[cart,setCart]=useState([])
  const[total,setTotal]=useState(0)
  const{data,loading,error,refetch}=useQuery(GET_CART, {
    variables: {
      filter: {
        userId: userId,
        shopId: SHOP_ID,
      },
    },
  })
  useEffect(()=>{
    if(data){
      refetch()
   setCart(data.cart)
    }
  },[data])
  useEffect(()=>{
   
    if(cart){
      refetch()
      setTotal(cart.reduce((a,b)=>a += b.prize*b.quantity,0).toLocaleString())
    }
   
  },[cart])
 
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
   <Breadcrum name='Cart' / >
    
     {cart.length?<div className='mt-20 px-32'>


   <div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 text-xl">
                   Remove
                </th>
                <th scope="col" className="px-6 py-3 text-xl">
                    Product Image
                </th>
                <th scope="col" className="px-6 py-3 text-xl">
                    Product name
                </th>
                <th scope="col" className="px-6 py-3 text-xl">
                    Price
                </th>
                <th scope="col" className="px-6 py-3 text-xl">
                    Quantity
                </th>
                <th scope="col" className="px-6 py-3 text-xl">
                    Total
                </th>
            </tr>
        </thead>
        <tbody>
              {cart.map((item,inx)=>{
                return <Cart setCart={setCart} cart={cart} item={item} inx={inx}/>
              })}
           
        </tbody>
    </table>
</div>
<Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Coupon Code" color='success'  variant="outlined" />
      <Button variant="outlined" color='success' sx={{padding:"14px 0px 14px 0px"}} >Apply Code</Button>
    </Box>
   <div className='flex justify-end mb-20'>
   <table className="table-auto ">
  <thead>
    <tr>
    <td className='px-4 py-6 text-xl font-bold' >Cart Totals</td>
  
    </tr>
  </thead>
  <tbody className=' bg-gray-100'>
    <tr className='border-b '>
      <td className='pr-10 pl-5 py-2' >Cart SubTotal</td>
      <td className='  pl-10  pr-5 py-2' >₹{total}</td>
      
    </tr>
    <tr className='border-b '>
      <td className='pr-10 pl-5 py-2' >Shipping and Handing</td>
      <td className='pl-10 pr-5 py-2' >0</td>
      
    </tr>
    <tr className='border-b '>
      <td className='pr-10 pl-5 py-2' >Grand Total</td>
      <td className='pl-10 pr-5 py-2' >₹{total}</td>
      
    </tr>
    <tr className='border-b  '>
      <td colSpan={2} className='pr-10   pl-5 py-2 w-full' ><Button variant='contained' color='success' sx={{marginLeft:"70px"}}>Proceed to checkout</Button></td>
    </tr>
  </tbody>
</table>
   </div>
     </div>:<div className='w-full h-[50vh] flex justify-center flex-col gap-5 items-center'>
      <p className='text-4xl'>Your Cart Is Empty !!</p>
      <Button variant='outlined' color='success' onClick={()=>navigate('/')}>Go To Shop</Button>
      </div>}
   </>
  )
}
