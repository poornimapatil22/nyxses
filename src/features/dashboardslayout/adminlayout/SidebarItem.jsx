/* eslint-disable no-unused-vars */
import { ListItemButton, ListItemIcon, ListItemText, Tooltip } from "@mui/material";

export default function SidebarItem({ icon: IconComp, label, selected, collapsed, onClick }) {
  return (
    <Tooltip title={collapsed ? label : ""} placement="right">
      <ListItemButton
        onClick={onClick}
        selected={selected}
        sx={{
          minHeight: 48,
          px: 2,
          justifyContent: collapsed ? "center" : "initial",
          "&.Mui-selected": {
            bgcolor: "rgba(74, 24, 161, 0.09)",
            color: "primary.main",
            borderRight: "2px solid",
          },
          "& .MuiListItemIcon-root": {
            color: selected ? "primary.main" : "Text.secondary",
          },
          "&:hover": {
            bgcolor: "rgba(74, 24, 161, 0.09)",
            color: "primary.main",
          },
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: collapsed ? "auto" : 2,
            justifyContent: "center",
          }}
        >
          <IconComp fontSize="small" />
        </ListItemIcon>
        {!collapsed && <ListItemText primary={label} />}
      </ListItemButton>
    </Tooltip>
  );
}
