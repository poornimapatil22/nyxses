// import React from 'react'
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchAllCustomers, selectAllCustomers, selectVendorLoading, selectVendorError } from '../slice/vendorSlice';
// import { useEffect } from 'react';
// import { Box } from '@mui/material';

// // icons
// import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
// import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
// import MoreVertIcon from '@mui/icons-material/MoreVert';


// const VendorList = () => {
//     const dispatch = useDispatch();
//     const customers = useSelector(selectAllCustomers);
//     const loading = useSelector(selectVendorLoading);
//     const error = useSelector(selectVendorError);
//     useEffect(() => {
//         dispatch(fetchAllCustomers());
//     }, [dispatch]);

// const fmt = (dt) => {
//   // expects ISO or epoch; falls back to raw
//   try {
//     if (!dt) return '—';
//     const d = new Date(dt);
//     if (isNaN(d.getTime())) return String(dt);
//     const yyyy = d.getFullYear();
//     const mm = String(d.getMonth() + 1).padStart(2, '0');
//     const dd = String(d.getDate()).padStart(2, '0');
//     const hh = String(d.getHours()).padStart(2, '0');
//     const mi = String(d.getMinutes()).padStart(2, '0');
//     return `${yyyy}-${mm}-${dd} ${hh}:${mi}`;
//   } catch {
//     return String(dt);
//   }
// };

// const status = (status) =>{
//     try{
//         if(!status) return '_';
//         if(status === "customer.followup.sent")return 'followup sent';
//         if(status === "customer.internal.test") return 'internal test';
//     }
//     catch{
//         return status;
//     }

// }


//   return (
//     <>
//     <div>
//         {loading && <p>Loading...</p>}
//         {error && <p>Error: {error}</p>}
//         <ul>
//             {customers.map((cust) => (
//                 <Box key={cust.id} sx={{display:"flex" ,justifyContent:"space-around" ,border:"solid 1px blue",margin:"10px"}}>
//                 <li >{cust.name}</li>
//                 <li >{cust.description}</li>
//                 <li >{fmt(cust.registrationTime || cust.registeredAt)}</li>
//                 <li>{cust.accountType}</li>
//                 <li >{fmt(cust.expiryTime || cust.expiryTime)}</li>
//                 <li >{cust.deviceLimit}</li>
//                 <li >{status(cust.customerStatus)}</li>
//                 <li className='flex w-auto'> <RemoveRedEyeIcon color="action" />
//                 <SupervisedUserCircleIcon color='action'/>
//                 <MoreVertIcon color='action'/></li>
//                 </Box>
//             ))}
//         </ul>
//     </div>
//     </>
//   )
// }

// export default VendorList;


import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '@emotion/react';
import {
  fetchAllCustomers,
  selectAllCustomers,
  selectVendorLoading,
  selectVendorError,
} from '../slice/vendorSlice';

import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Tooltip,
  Typography,
  CircularProgress,
} from '@mui/material';

// icons
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Analytics from './Analytics';

const fmt = (dt) => {
  try {
    if (!dt) return '—';
    const d = new Date(dt);
    if (isNaN(d.getTime())) return String(dt);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const hh = String(d.getHours()).padStart(2, '0');
    const mi = String(d.getMinutes()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd} ${hh}:${mi}`;
  } catch {
    return String(dt);
  }
};

// map backend status -> display + color
const statusChip = (status) => {
  const raw = String(status || '').toLowerCase();

  // your custom aliases
  if (raw === 'customer.followup.sent') {
    return <Chip label="Followup sent" size="small" sx={{ fontWeight: 500 }} />;
  }
  if (raw === 'customer.internal.test') {
    return <Chip label="Internal test" size="small" sx={{ fontWeight: 500 }} />;
  }
  if (raw=== 'customer.new'){
    return <Chip label="new" size="small" sx={{ fontWeight: 500 }} />;
  }
};

const type = (type) => {
    if(type === 0){
        return 'Demo';
    }else if(type === 1){
        return 'Professional';
    }else if (type === 2){
        return 'Enterprise';
    }
}

const VendorList = () => {
    const theme = useTheme();
  const dispatch = useDispatch();
  const customersRaw = useSelector(selectAllCustomers);
  const loading = useSelector(selectVendorLoading);
  const error = useSelector(selectVendorError);

  useEffect(() => {
    dispatch(fetchAllCustomers());
  }, [dispatch]);

  // always an array so .map never explodes
  const customers = useMemo(() => (Array.isArray(customersRaw) ? customersRaw : []), [customersRaw]);

  return (
    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Analytics />
      {loading && (
        <Box sx={{ py: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress size={22} />
          <Typography sx={{ ml: 2 }}>Loading…</Typography>
        </Box>
      )}

      {!loading && error && (
        <Paper sx={{ p: 2, color: 'error.main', fontWeight: 500 }}>
          Error: {String(error)}
        </Paper>
      )}

      {!loading && !error && (
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow
                sx={{
                  '& th': {
                    backgroundColor: (t) => t.palette.grey[100],
                    fontWeight: 600,
                    color: theme.palette.primary.main,
                    whiteSpace: 'nowrap',
                  },
                  
                }}
              >
                <TableCell>Vendor Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="center">Registered</TableCell>
                <TableCell align="center">Type</TableCell>
                <TableCell align="center">Expires</TableCell>
                <TableCell align="center">Limit</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {customers.map((cust, idx) => {
                const key = cust.id ?? cust.customerId ?? idx;

                return (
                  <TableRow
                    key={key}
                    hover
                    sx={{
                      '& td': { borderBottomColor: 'divider',fontWeight:'400', color: theme.palette.grey.darken_3 },
                    }}
                  >
                    <TableCell sx={{ fontWeight: 500 }}>{cust.name || '—'}</TableCell>
                    <TableCell>{cust.description || '—'}</TableCell>

                    {/* Two "Registered" columns as in the screenshot */}
                    <TableCell align="center">
                      {fmt(cust.registrationTime || cust.registeredAt)}
                    </TableCell>

                    <TableCell align="center">{type(cust.accountType)}</TableCell>
                    <TableCell align="center">{fmt(cust.expiryTime || cust.expiresAt)}</TableCell>
                    <TableCell align="center">{cust.deviceLimit ?? cust.limit ?? '—'}</TableCell>
                    <TableCell align="center">{statusChip(cust.customerStatus || cust.status)}</TableCell>

                    <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>
                      <Tooltip title="View">
                        <IconButton size="small">
                          <RemoveRedEyeIcon fontSize="small" color="action" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Users">
                        <IconButton size="small">
                          <SupervisedUserCircleIcon fontSize="small" color="action" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="More">
                        <IconButton size="small">
                          <MoreVertIcon fontSize="small" color="action" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}

              {customers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} align="center" sx={{ py: 6, color: 'text.secondary' }}>
                    No vendors found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default VendorList;
