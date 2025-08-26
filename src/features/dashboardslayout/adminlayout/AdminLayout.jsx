import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  AppBar as MuiAppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer as MuiDrawer,
  IconButton,
  List,
  Toolbar,
  Typography,
  InputBase,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import nav from "./nav.config";
import SidebarItem from "./SidebarItem";
import UserMenu from "../../../shared/components/UserMenu";
import { useDispatch } from "react-redux";
import { performLogout } from "../../auth/slice/authSlice";


const drawerWidth = 201;
const railWidth = 50; // icon rail when collapsed

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: railWidth,
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  })
);

// IMPORTANT: AppBar is constant width – does NOT react to drawer `open`
const AppBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: theme.palette.background.background_Dark,
}));

export default function SuperAdminLayout() {
    const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));

  const [open, setOpen] = React.useState(!isDownMd);
  React.useEffect(() => {
    // collapse on small screens
    setOpen(!isDownMd);
  }, [isDownMd]);

  const handleToggle = () => setOpen((p) => !p);

  // Content left padding changes, but AppBar remains full width
  const contentPl = open ? drawerWidth : railWidth;

  return (
    <Box sx={{ display: "flex", bgcolor: "background.default", minHeight: "100vh" }}>
      <CssBaseline />

      <AppBar position="fixed" elevation={1} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ gap: 2 }}>
          <IconButton color="inherit" edge="start" onClick={handleToggle}>
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>

          {/* Logo + title */}
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            NeoDMS
          </Typography>

          {/* Search */}
          <Box
            sx={{
              mx: 2,
              flex: 1,
              display: "flex",
              alignItems: "center",
              gap: 1,
              px: 2,
              height: 36,
              borderRadius: 2,
              bgcolor: "rgba(255,255,255,0.12)",
            }}
          >
            <SearchIcon fontSize="small" />
            <InputBase
              placeholder="Search"
              sx={{ color: "inherit", width: "100%" }}
              inputProps={{ "aria-label": "search" }}
            />
          </Box>

          {/* Right actions */}
          <IconButton color="inherit"><NotificationsNoneIcon /></IconButton>
          <IconButton color="inherit"><SettingsOutlinedIcon /></IconButton>
          <UserMenu onLogout={() => dispatch(performLogout())} />
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        {/* Spacer for AppBar height */}
        <Toolbar />
        <Divider />

        <List sx={{ pt: 1 }}>
          {nav.map((item) => {
            const Icon = item.icon;
            const selected = location.pathname === item.to;
            return (
              <SidebarItem
                key={item.to}
                icon={Icon}
                label={item.label}
                selected={selected}
                collapsed={!open}
                onClick={() => navigate(item.to)}
              />
            );
          })}
        </List>
      </Drawer>

      {/* MAIN: Only padding-left changes; topbar stays full width */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 9, // Toolbar height spacing
          pl: `${contentPl}px`,
          pr: 3,
          pb: 3,
          transition: (t) =>
            t.transitions.create("padding-left", {
              easing: t.transitions.easing.sharp,
              duration: t.transitions.duration.standard,
            }),
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
