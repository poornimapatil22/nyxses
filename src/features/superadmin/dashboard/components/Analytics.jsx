import React from 'react'
import { Paper } from '@mui/material';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';

const Analytics = () => {
  return (
    <Box
  sx={{
    display: "flex",
    flexDirection: "row",   // ✅ correct spelling
    width: "100%",
    height: "100%",
    maxHeight: 300,
    alignItems: "center",
    justifyContent: "space-between", // or "space-between"
    gap: 2,
  }}
>
  <Paper
    elevation={1}
    sx={{
      display: "flex",              // ✅ must be in sx
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
    //   maxHeight: 300,
      borderRadius: 2,
      p: 2,
    }}
  >
    <Typography variant="h9" sx={{ mb: 2, fontWeight: 300 }}>
      Total Vendors
    </Typography>
    <Typography variant="h1" sx={{ fontWeight: 600 }}>
      1000
    </Typography>
  </Paper>
</Box>

  )
}

export default Analytics;