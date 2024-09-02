import React, { useRef, useState } from 'react'
import { Banner } from '../navbar/banner/Banner'
import { Category } from '../category/Category'
import { Products } from '../products/Products'
import { Blog } from '../blog/Blog'

export const Home = ({searchRef,blogRef}) => {

  return (
    <>
      <div className='relative'>
    <Banner/>
   
    </div>
    <Category/>
    <Products searchRef={searchRef} blogRef={blogRef} />
    
    </>
  
  )
}
