import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Breadcrum } from '../Breadcrum/Breadcrum';
import { useSelector } from 'react-redux';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_TO_CART, ADD_TO_WHISHLIST } from '../../apollo/Mutation';
import { GET_PRODUCTS } from '../../apollo/Apollo';
import { FaRegHeart } from "react-icons/fa";
import { FaShoppingCart } from 'react-icons/fa';
import { SHOP_ID } from '../../env';
import { TopProduct } from './TopProduct';
import { FaStar } from "react-icons/fa";
import { Button } from '@mui/material';
import Cookies from 'js-cookie'
export const SingleProduct = () => {
  const {authState,userId}=useSelector(state=>state.auth)
  const [product,setProduct]=useState([])
  const [mutateFunction, { data:Cartdata, loading:Cartloading, error:Carterror }] = useMutation(ADD_TO_CART)
  const[mutateWishlist,{ loading:wishLoading}] = useMutation(ADD_TO_WHISHLIST)

  const {id}=useParams()
  const { loading, error, data,refetch } = useQuery(GET_PRODUCTS, {
    variables: {
      filter: {
        shopId: SHOP_ID,
        userId: userId,
      },
    },
  });

  useEffect(()=>{
    refetch()
    if(data){
      console.log(data)
      setProduct(data.products.filter(p=>Number(p.id)==Number(id)))
    
    }
 
  },[data])

  if(loading) {
    return (
   <div className='w-full flex items-center h-screen justify-center '>
   <div className='w-12 h-12 border border-3 rounded-full border-[#1d7264]  border-t-0 animate-spin'>
   
   
   </div>
   </div>
    )
   }

  return (
   <>
   <Breadcrum name='Product Details'/>
    <div className='mt-20 mx-32 '>
    {product.map(pro=>(
<>
<div className='flex flex-col md:flex-row md:gap-4  mb-32  relative'>
<div className='w-full md:w-1/3 flex  relative justify-center'>
     <img className='w-96 h-96 object-cover' src={`https://s3.ap-south-1.amazonaws.com/business.strackit.com/${pro.featureImage}`} alt="" />
    </div>
 <div className='w-full md:w-1/3 flex flex-col gap-10 mt-10 md:mt-0'>
 <p className='text-[#1d7264] flex gap-2 items-center'><FaStar /> (0 Ratings and 0 Reviews)</p>
<div className='w-full flex  md:flex-row flex-col justify-between'>

<p className='text-xl text-center font-bold'>
  {pro.name}
  </p>
  {/* <p className='text-[#23b923] flex gap-2 items-center'><FaStar /> (0 Ratings and 0 Reviews)</p> */}
</div>
 <p className='text-[#1d7264] text-2xl font-bold'> ₹ {(pro.prize).toLocaleString()}</p>
 <div>

  </div> 
 <div className='flex w-full gap-3'>
 <Button variant='outlined' color='success' endIcon={<FaShoppingCart />} onClick={()=>{
   if(!Cookies.get('ualum')){
    window.alert('Login to Continue');
    return;
  }
  mutateFunction({
    variables: {
      userId,
      productId: Number(pro.id),
      quantity: 1,
      shopId: SHOP_ID,
    },
  }).then(res=>alert('Item Added to Cart')).catch(res=>alert('Item Alredy Exist In Cart'))


 }} >Add To Cart</Button>     
 <Button variant='outlined' onClick={()=>{
    if (!Cookies.get('ualum')) {
      window.alert('Login to Continue');
      return;
    }
    mutateWishlist({
      variables: {
        userId,
        productId: Number(pro.id),
        shopId: SHOP_ID,
        delete: false,
      },
    }).then(res=>alert('Item Added to Wishlist')).catch(res=>alert('item alredy exist in wishlist'))
 }} endIcon={<FaRegHeart/>}>Add To WhishList </Button>     
 </div>
 </div>
 <p onClick={()=>window.location.reload()} className='absolute right-0 -top-[100px] '>
  <TopProduct />
  </p>
  
</div> 
<div className='mt-10 w-full'>
  <p className='font-bold text-xl text-[#1d7264] mb-3'>
    Description:
  </p>
<div   className="md:w-1/2 w-full"dangerouslySetInnerHTML={{ __html: pro?.description }}  /> 
</div>
</>

))}

    </div>
    <div>

    </div>
   </>
  )
}
