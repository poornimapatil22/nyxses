import React from 'react'
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { selectAuthLoading } from "../../features/auth/slice/authSlice";
import { useSelector } from "react-redux";

const Loginbutton = ({text}) => {
    const loading = useSelector(selectAuthLoading) && loading ;
  return (
    <Button variant="contained" type='submit' fullWidth size='large' sx={{height:56, fontSize:'1rem'}}>{loading ? <CircularProgress size={22}/>: text} </Button>
  )
}

export default Loginbutton;