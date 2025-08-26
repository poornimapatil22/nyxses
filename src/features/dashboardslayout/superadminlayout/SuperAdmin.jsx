import { Box } from '@mui/material';
import React from 'react'
import { Outlet } from 'react-router-dom';

const SuperAdmin = () => {
  return (
    <>
        <Box sx={{width:"100%",height:"100%"}} >
            <Outlet/>
        </Box>
    </>
  )
}

export default SuperAdmin;