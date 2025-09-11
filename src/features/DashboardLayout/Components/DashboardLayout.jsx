// src/App.jsx
import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import Sidebar from "../../../shared/components/Sidebar";
import Globalheader from "../../../shared/components/Globalheader";
import { Box } from "@mui/system";


import DashboardIcon from "@mui/icons-material/Dashboard";
import AppsIcon from "@mui/icons-material/Apps";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { theme } from './../../../shared/themes/theme';


// super admin and admin imports
import { useSelector } from "react-redux";

// stats import
import { Outlet } from "react-router-dom";

// pass menu via props (icons + optional children)
const SMENU = [
  { label: "Dashboard", icon: <DashboardIcon />, to: "/dashboard" },
  { label: "Customers", icon: <AppsIcon />, to: "customers" },
  { label: "Shared Apps", icon: <AppsIcon />
  },
  { label: "Settings", icon: <SettingsIcon />, to: "/settings" },
  { label: "Notification", icon: <NotificationsIcon />, to: "/notifications" },
];

const AMENU = [
  { label: "Dashboard", icon: <DashboardIcon />, to: "/dashboard" },
  {
    label: "Devices",
    icon: <AppsIcon />,
    children: [{ label: "Vendors", icon: <DashboardIcon />, to: "/apps/vendors" },
    { label: "Devices", icon: <AppsIcon />, to: "/apps/devices" },
    ]
  },
  { label: "Settings", icon: <SettingsIcon />, to: "/settings" },
  { label: "Notification", icon: <NotificationsIcon />, to: "/notifications" },
]


export default function App() {
  const superAdmin = useSelector((state) => state.auth.superAdmin);

  const MENU = superAdmin ? SMENU : AMENU;
  return (
    <Box sx={{ display: "flex", height: "100vh", width: "100%",backgroundColor:"#ffffffff",gap:1,padding:"8px",overflow:"hidden" }}>
      <Sidebar menuItems={MENU} />
        
        <Box sx={{ display: "flex",backgroundColor:"#ffffffff",flexDirection: "column",gap:1, flexGrow: 1, p: 0, overflowY: "auto", borderRadius: theme.radius.sm ,scrollbarWidth: "none",position:"relative" }}>
            <Globalheader />
            <CssBaseline />
            <Outlet />
        </Box>
    </Box>
  );
}
