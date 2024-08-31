import React from 'react'
import { Banner } from '../navbar/banner/Banner'
import { Category } from '../category/Category'
import { Products } from '../products/Products'

export const Home = () => {
  return (
    <>
      <div className='relative'>
    <Banner/>
   
    </div>
    <Category/>
    <Products/>
    </>
  
  )
}
