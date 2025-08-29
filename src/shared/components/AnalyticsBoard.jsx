import React from 'react'
import { Paper, Typography } from '@mui/material';


const AnalyticsBoard = ({number, text}) => {
  return (
    <Paper
        elevation={1}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 2,
          p: 2,
          minWidth: 220,
          minHeight: 140,
          width: '100%',
        }}
      >
        <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary', fontSize: 20}}>
          {text}
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 700,fontSize: 100 , color: 'green.darken_1' }}>
          {number}
        </Typography>
      </Paper>
  )
}

export default AnalyticsBoard;