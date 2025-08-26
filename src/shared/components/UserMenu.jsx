import { useState } from "react";
import { Avatar, IconButton, Menu, MenuItem, ListItemIcon } from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/slice/authSlice';

export default function UserMenu({ onLogout }) {
  const user = useSelector((state) => state.auth.user);
  console.log("UserMenu user:", user);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    if (onLogout) onLogout();
  };

  return (
    <>
      <IconButton onClick={handleOpen} sx={{ color: "inherit",display: "flex", alignItems: "center" ,mt: "5",p: 0}}>
        <AccountCircleIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleLogout} sx={{ display: "flex", alignItems: "start",flexDirection: "column",gap: 1 }}>
          <h1>
            hello : {user ? user.data.name : "User"}
          </h1>
        </MenuItem>
        <MenuItem onClick={handleLogout} sx={{ display: "flex", alignItems: "start",flexDirection: "column",gap: 1 }}>
          <h1>
            {user ? user.data.email : "User"}
          </h1>
        </MenuItem>
        <MenuItem onClick={handleLogout} sx={{ display: "flex", alignItems: "start",flexDirection: "column",gap: 1 }}>
          <ListItemIcon sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
            <Logout fontSize="small" />
          Logout
          </ListItemIcon>
        </MenuItem>
        
      </Menu>
    </>
  );
}
