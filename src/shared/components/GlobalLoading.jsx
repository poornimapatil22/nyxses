import React from 'react'
import { Box, CircularProgress } from '@mui/material';

const GlobalLoading = () => {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
  )
}

export default GlobalLoading;