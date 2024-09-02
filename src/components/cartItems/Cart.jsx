import { useMutation } from '@apollo/client'
import { Box, Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ADD_QUANTITY, DELETE_Item } from '../../apollo/Mutation'
import { SHOP_ID } from '../../env'
import { useSelector } from 'react-redux'
import { MdClose } from "react-icons/md";

export const Cart = ({item,inx,setCart,cart}) => {
  const[quantity,setQuantity]=useState(0)
  const[update,setUpdate]=useState(false)
  const {authState,userId}=useSelector(state=>state.auth)
  const [deleteItem, { loading: deleteItemLoading, error: deleteItemError }] =
    useMutation(DELETE_Item);
  const [addQuantity, { loading: addQuantityLoading, error: addQuantityError },] = useMutation(ADD_QUANTITY);
  useEffect(()=>{
    setQuantity(item.quantity)
  },[item])
  const handleQuantity=()=>{
    // setHi(!hi)
  setUpdate(false)
  addQuantity({
    variables:{
      userId,
      productId:item.productId,
      quantity,
      shopId:SHOP_ID,
      update:true
    }
  }).then(res=>(setCart(cart=>cart.map(c=>c.id==res.id?{...c,res}:c)) )).catch(res=>alert('somthing went'))

}
const handleDelete=()=>{
  deleteItem({
    variables: {
      delete: true,
      shopId: SHOP_ID,
      productId:item.productId,
      userId
    },
  }).then(res=>(
      setCart(cart=>cart.filter(c=>c.id !==res.id))
  ))

}

  return (
    <>
 
  <tr key={inx} className="bg-white border-b relative dark:bg-gray-800 dark:border-gray-700">
          <th scope="row" className="px-6 py-4 text-xl">
                 <MdClose className='cursor-pointer' onClick={()=>handleDelete()}/>
                </th>
                <th scope="row" className="md:px-6 md:py-4  font-medium text-gray-900 whitespace-nowrap dark:text-white">
                   <img className='md:w-[150px] w-32 h-32 md:h-[150px] object-cover' src={`https://s3.ap-south-1.amazonaws.com/business.strackit.com/${item.featureImage}`} alt="" />
                </th>
                <th scope="row" className="md:px-6 md:text-xl py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                   {item.name}
                </th>
                <td className="md:px-6 py-4 md:text-xl">
                ₹{item.prize.toLocaleString()}
                </td>
                <td className="px-6 md:text-xl relative py-4 ">
                <div>
                <button className='border w-10 py-4' onClick={()=>{
                   if(quantity){
                    setQuantity(quantity+1)
                    setUpdate(true)
                  }
                }}>+</button><input className='w-12 border text-center  py-4' type="text" value={quantity}/><button className='py-4 border  w-10' onClick={()=>{
                  if(quantity>1){
                    setQuantity(quantity-1)
                    setUpdate(true)
                  }
                }}>-</button>
                </div>
                { update && <Button variant="outlined" color='success' sx={{position:"absolute" ,bottom:10,right:60}} onClick={()=>handleQuantity()}>Update</Button>}
                </td>
                <td className="md:px-6 md:text-xl py-4">
                ₹{((item.prize*quantity).toLocaleString())}
                </td>
               
            </tr>

    </>


  )
}
