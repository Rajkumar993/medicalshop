import React from 'react'
import { FaHome } from "react-icons/fa";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
export const Breadcrum = ({name}) => {
  const navigate=useNavigate('/')
  function handleClick() {
    navigate('/')
    }
  const breadcrumbs = [
    <Link underline="hover" key="1" color="white" sx={{cursor:"pointer",fontSize:"18px", display:"flex" ,justifyContent:"center",alignItems:"center",gap:1}}  onClick={handleClick}>
     <FaHome/>  Home
    </Link>,
    
    <Typography key="3" sx={{ color: 'white' ,fontSize:"16px"}}>
      {name}
    </Typography>,
  ];
  return (
    <Stack spacing={2} sx={{backgroundColor:"#1d7264",padding:"40px 0px 40px 30px", marginTop:"10px"}}>
    <Breadcrumbs separator="›" color='white' aria-label="breadcrumb">
         {breadcrumbs}
       </Breadcrumbs>
     </Stack>
  )
}
