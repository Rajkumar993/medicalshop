import React, { useState } from 'react'
import { Card, CardActionArea, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { FaShoppingCart } from 'react-icons/fa';
import { FaEye } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { ADD_TO_CART, ADD_TO_WHISHLIST } from '../../apollo/Mutation';
import IconButton from '@mui/material/IconButton';
import Cookies from 'js-cookie'


import Stack from '@mui/material/Stack';
import { useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';
import { SHOP_ID } from '../../env';
import { Link, useNavigate } from 'react-router-dom';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));
export const ProdutsCard = ({product,grid}) => {
  const [hovered, setHovered] = useState(false);
  const {authState,userId}=useSelector(state=>state.auth) 
  const[mutateWishlist,{ loading:wishLoading}] = useMutation(ADD_TO_WHISHLIST)
  const[heart,setHeart]=useState(false)
  const navigate=useNavigate() 
   const [open, setOpen] = React.useState(false);
  const [mutateFunction, { data:Cartdata, loading:Cartloading, error:Carterror }] = useMutation(ADD_TO_CART)
 const[qty,setQty]=useState(1)
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>

<Card 
className='  hover:shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]'
    sx={{  width: grid?650:250, position: 'relative' }}
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
  >
    <CardActionArea sx={{display:grid?"flex":"", justifyContent:grid?"start":"",alignItems:grid&&"start", gap:grid?2:null}}>
     
      <CardMedia
      onClick={()=>navigate(`product/${product.id}`)}
      className='hover:scale-105 transition-all duration-500 ease-in'
        component="img"
        sx={{  height: 250, width:250 ,objectFit:"cover"   }}
        image={`https://s3.ap-south-1.amazonaws.com/business.strackit.com/${product.featureImage}`}
        alt="medical"
      />
     
      <CardContent >
        <Typography gutterBottom variant="h5"  component="div">
         <p className='text-[16px] mb-2'>{product.name}</p> 
         <p className='text-[16px] text-[#1d7264]'>₹{product.prize.toLocaleString()}</p>
        {grid && <div className='text-sm mt-4 mb-4'  dangerouslySetInnerHTML={{__html:product.description.slice(0,200)}}/>}
       
            
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
       {grid ?      <Box
       className='shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'
      sx={{
        width:"150px",
        height:"40px",
        alignItems:"center",
        display:"flex",

        gap:2,
      justifyContent:"center"
        
       
      }}
      >
        <FaEye className='text-2xl  hover:text-[#1d7264] cursor-pointer  ' onClick={handleClickOpen} />
       
        <FaShoppingCart className='text-2xl  hover:text-[#1d7264] cursor-pointer ' onClick={()=>{
          if(!Cookies.get('ualum')){
            window.alert('Login to Continue');
            return;
          }
          mutateFunction({
            variables: {
              userId,
              productId: Number(product.id),
              quantity: qty,
              shopId: SHOP_ID,
            },
          }) .then(res=>(
            alert("Added To Cart!")
          )).catch(res=>(
           alert("Item Already Exist!")
          ))
        }} />

      
       {heart?<FaHeart onClick={()=>setHeart(true)} className='text-2xl text-[#1d7264]  cursor-pointer ' />:<FaRegHeart onClick={()=>{
            if (!Cookies.get('ualum')) {
        window.alert('Login to Continue');
        return;
      }
      setHeart(!heart)
      mutateWishlist({
        variables: {
          userId,
          productId: Number(product.id),
          shopId: SHOP_ID,
          delete: false,
        },
      }).then(res=>(
        alert("Added To Wishlist!")
      )).catch(res=>(
        alert("Item Already Exist!")
      ))
      
      
      }} className='text-2xl  hover:text-[#1d7264]  cursor-pointer ' />} 
      </Box>: null}
        </Typography>
      </CardContent>
    </CardActionArea>
  { grid?"": hovered && (
      <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: hovered ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0.9)',
        backgroundColor: 'white',
        display:'flex',
        padding: '8px',
        boxShadow: 3,
        
        gap:3,
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
       
      }}
      >
        <FaEye className='text-2xl  hover:text-[#1d7264] cursor-pointer  ' onClick={handleClickOpen} />
        <FaShoppingCart className='text-2xl  hover:text-[#1d7264] cursor-pointer 'onClick={()=>{
          if(!Cookies.get('ualum')){
            window.alert('Login to Continue');
            return;
          }
          mutateFunction({
            variables: {
              userId,
              productId: Number(product.id),
              quantity: qty,
              shopId: SHOP_ID,
            },
          }) .then(res=>(
            alert("Added To Cart!")
          )).catch(res=>(
           alert("Item Already Exist!")
          ))
        }} />
       {heart?<FaHeart onClick={()=>setHeart(true)} className='text-2xl text-[#1d7264]  cursor-pointer ' />:<FaRegHeart onClick={()=>{
            if (!Cookies.get('ualum')) {
        window.alert('Login to Continue');
        return;
      }
      setHeart(!heart)
      mutateWishlist({
        variables: {
          userId,
          productId: Number(product.id),
          shopId: SHOP_ID,
          delete: false,
        },
      }).then(res=>(
        alert("Added To Wishlist!")
      )).catch(res=>(
        alert("Item Already Exist!")
      ))
      
      
      }} className='text-2xl  hover:text-[#1d7264]  cursor-pointer ' />} 
      </Box>
    )}
  </Card>
  {/* <Button variant="outlined">
        Open dialog
      </Button> */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
     
      >
        <DialogTitle sx={{ m: 0, p: 2 ,}} id="customized-dialog-title">
         {product.name} 
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
     
          })}
        >
         
        </IconButton>
        <DialogContent dividers sx={{display:"flex", gap:4}}>
        <Link to={`/product/${product.id}`}> <Typography gutterBottom>
          <img className=' h-[250px]   object-cover' src={`https://s3.ap-south-1.amazonaws.com/business.strackit.com/${product.featureImage}`} alt="" />
          </Typography></Link>
          
          <Typography gutterBottom sx={{display:"flex", flexDirection:"column",gap:2, padding:"0px 20px 0px 20px"}}>
            <p className='text-xl w-full'>{product.name}</p>
            <p className='text-3xl text-[#1d7264]'>₹{product.prize.toLocaleString()}</p>
            <div className='flex justify-center items-center gap-2'>
                
              <div className='flex justify-between items-center border px-4 py-2 border-1'>
                <button  onClick={()=>setQty(qty=>qty+1)} className='w-full text-xl'>+</button>
              <input value={qty} type='text'  className=' outline-none w-10 text-center'/>
              <button  onClick={()=>{
                if(qty>1){
                  setQty(qty=>qty-1)
                 } 
                 
                

                }  }className='w-full  text-3xl' >-</button>
              </div>
              <Stack direction="row" spacing={2}>
      
             <Button variant="contained" color='success' sx={{width:200, height:50}} startIcon={<FaShoppingCart />} onClick={()=>{
          if(!Cookies.get('ualum')){
            window.alert('Login to Continue');
            return;
          }
          mutateFunction({
            variables: {
              userId,
              productId: Number(product.id),
              quantity: qty,
              shopId: SHOP_ID,
            },
          }) .then(res=>(
            alert("Added To Cart!")
          )).catch(res=>(
           alert("Item Already Exist!")
          ))
        }}>
        Add To Cart
      </Button>
    </Stack>
            </div>
            <p className='flex gap-2 justify-center items-center cursor-pointer'><FaRegHeart onClick={()=>{
            if (!Cookies.get('ualum')) {
        window.alert('Login to Continue');
        return;
      }
      setHeart(!heart)
      mutateWishlist({
        variables: {
          userId,
          productId: Number(product.id),
          shopId: SHOP_ID,
          delete: false,
        },
      }).then(res=>(
        alert("Added To Wishlist!")
      )).catch(res=>(
        alert("Item Already Exist!")
      ))
      
      
      }}/> Add To Wishlist</p>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>

    </>
   
  )
}
