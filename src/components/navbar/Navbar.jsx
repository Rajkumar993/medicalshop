import React from 'react'

export const Navbar = () => {
  return (
    <div className='container flex justify-between items-center px-32 py-5 mt-10 bg-white mx-auto'>
  <div className='text-4xl flex justify-center items-center'>logo</div>
  <div>
    <ul className='flex justify-between items-center gap-4'>
      <li>Home</li>
      <li>Products</li>
      <li>Contact</li>
      <li>Blog</li>
    </ul>
  </div>
  <div>login</div>
    </div>
  )
}
