import DashboardIcon from "@mui/icons-material/DashboardOutlined";
import PersonIcon from "@mui/icons-material/PersonOutline";
import SettingsIcon from "@mui/icons-material/SettingsOutlined";
import SpeedIcon from '@mui/icons-material/Speed';

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: SpeedIcon },
  { to: "/profile", label: "Profile", icon: PersonIcon },
  { to: "/settings", label: "Settings", icon: SettingsIcon },
];

export default nav;
