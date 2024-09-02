import React, { useEffect, useState } from 'react'
import { Breadcrum } from '../Breadcrum/Breadcrum'
import { useMutation, useQuery } from '@apollo/client'
import { useSelector } from 'react-redux'
import { ADD_TO_CART, DELETE_WISH_LIST } from '../../apollo/Mutation'
import { GET_WHISHLIST } from '../../apollo/Apollo'
import { SHOP_ID } from '../../env'
import { MdClose } from "react-icons/md";
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
export const WishList = () => {
  const {authState,userId}=useSelector(state=>state.auth)
  const navigate=useNavigate()
  const [wishData,setWishData]=useState([])
  const [mutateFunction, { data:Cartdata, loading:Cartloading, error:Carterror }] = useMutation(ADD_TO_CART)
  const [deletelist,{data,error,loading,}]=useMutation
  (DELETE_WISH_LIST)
   const {error:wisherror,loading:wishloading,data:wishdata, refetch} = useQuery( GET_WHISHLIST , {
    variables: {
      filter: {
        userId,
        shopId: SHOP_ID,
      },
      
    },
  
  });
 
  useEffect(()=>{
    refetch()
     if(wishdata){
      setWishData(wishdata.wishlist.filter(li=>li !==null))
     }
  },[wishdata])
  console.log(wishData)
  const handleDelete=(id)=>{
    deletelist({
      variables: {
        delete: true,
        shopId: 347,
        productId:Number(id),
        userId
      },
    }).then(res=>{ 
  
    refetch()
    // alert('item removed from wishlist')
  
      }).catch(err=>{
      console.error(err);
     
  
    })}
    if(loading) {
      return (
     <div className='w-full flex items-center h-screen justify-center'>
     <div className='w-347 h-347 border border-3 rounded-full border-[#1d7264]  border-t-0 animate-spin'>
     
     
     </div>
     </div>
      )
     }
  return (
   
  <>
  <Breadcrum name='Wishlist'/>
    <div className='mt-20 px-32'>
      
     {wishData.length? <div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
             
            </tr>
        </thead>
        <tbody>
              {wishData.map((item,inx)=>{
                return   <tr key={inx} className="bg-white border-b relative dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 text-xl">
                       <MdClose className='cursor-pointer' onClick={()=>handleDelete(item.productId)}/>
                      </th>
                      <th scope="row" className="px-6 py-4  font-medium text-gray-900 whitespace-nowrap dark:text-white">
                         <img className='w-[150px] h-[150px] object-cover' src={`https://s3.ap-south-1.amazonaws.com/business.strackit.com/${item.featureImage}`} alt="" />
                      </th>
                      <th scope="row" className="px-6 text-xl py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                         {item.title}
                      </th>
                      <td className="px-6 py-4 text-xl">
                      ₹{item.prize.toLocaleString()}
                      </td>
                      <td className="px-6 text-xl relative py-4 ">
                      {/* <div>
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
                      </div> */}
                       <Button variant="outlined" color='success'  onClick={()=>{
        if(document.cookie == ''){
          window.alert('Login to Continue');
          return;
        }
        mutateFunction({
          variables: {
            userId,
            productId: Number(item.productId),
            quantity: 1,
            shopId: SHOP_ID,
          },
        }) .then(res=>(
          alert("Added To Cart!")
        )).catch(res=>(
          alert("Item Already Exist!")
        ))
                       }}>Add To Cart</Button>
                    
                      </td>
                      <td className="px-6 text-xl py-4">
                      {/* ₹{((item.prize*quantity).toLocaleString())} */}
                      </td>
                     
                  </tr>
      
              })}
           
        </tbody>
    </table>
     </div>:<div className='w-full h-[50vh] flex justify-center flex-col gap-5 items-center'>
      <p className='text-4xl'>Your WishList Is Empty !!</p>
      <Button variant='outlined' color='success' onClick={()=>navigate('/')}>Go To Shop</Button>
      </div>}
    </div>
  </>
  )
}
