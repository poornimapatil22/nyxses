import React, { useEffect } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { totalvendors, selecttotalvendor } from '../slice/vendorSlice';
import AnalyticsBoard from '../../../../shared/components/AnalyticsBoard';
import VendorCharts from './VendorCharts'

const Analytics = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(totalvendors({}));
  }, [dispatch]);
  const total = useSelector(selecttotalvendor).totalItemsCount ?? 0;


  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',          // vertical center
        justifyContent: 'space-between',      // horizontal center
        width: '100%',
        maxHeight: 300,                // give it height so vertical centering works
        // p: 2,
        gap: 2,
      }}
    >
      <AnalyticsBoard number={total} text="Vendors" />
      <AnalyticsBoard number={total} text="Vendors" />
      <AnalyticsBoard number={total} text="Vendors" />
      


    </Box>
  );
};

export default Analytics;
