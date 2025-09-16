// src/shared/components/Sidebar.jsx
import React, { useEffect, useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  IconButton,
  Tooltip,
  Box,
} from "@mui/material";
import { ExpandLess, ExpandMore, MenuOpen } from "@mui/icons-material";
import { useTheme, alpha } from "@mui/material/styles";
import { NavLink } from "react-router-dom";

const FULL_W = 240;
const MINI_W = 60;

// React Router v6 helper: returns "active" class when current route matches
const navActive = ({ isActive }) => (isActive ? "active" : undefined);

export default function Sidebar({ menuItems }) {
  const theme = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (key) =>
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));

  // Publish width as a CSS var for layouts that want to react
  useEffect(() => {
    const w = collapsed ? `${MINI_W}px` : `${FULL_W}px`;
    document.documentElement.style.setProperty("--neo-sidebar-w", w);
  }, [collapsed]);

  return (
    <Box sx={{ display: {xs:"none",sm:"none",md:"flex"}, height: "100vh" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: collapsed ? MINI_W : FULL_W,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: collapsed ? MINI_W : FULL_W,
            m: "8px",
            height: "calc(100vh - 16px)",
            borderRadius: theme.radius?.sm,
            overflow: "hidden",
            boxSizing: "border-box",
            backgroundColor:
              theme.palette.background?.background_Dark ||
              theme.palette.background.default,
            color: theme.palette.text.primary,
            transition: "width 0.3s",
            p: "10px",
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <img
              src="/neodms icon dark back.svg"
              alt="NeoDMS Logo"
              style={{ display: collapsed ? "block" : "none", width: "100%" }}
            />
          </Box>
        {/* Collapse button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: collapsed ? "center" : "space-between",
            p: 1,
          }}
        >
          {/* Logo */}
          <Box>
            <img
              src="/neo dms logo.svg"
              alt="NeoDMS Logo"
              style={{ display: collapsed ? "none" : "block" }}
            />
          </Box>
          <IconButton
            onClick={() => setCollapsed((v) => !v)}
            sx={{ color: theme.palette.background.paper }}
          >
            <MenuOpen />
          </IconButton>
        </Box>

        {/* Menu */}
        <List sx={{ pt: 0.5, mt: 2, px: collapsed ? 0 : 1 }}>
          {menuItems.map((item) => {
            const hasChildren = Array.isArray(item.children) && item.children.length > 0;
            // Make parent a link ONLY if it has a "to" AND no children (so clicks don’t both navigate and expand)
            const isLink = Boolean(item.to) && !hasChildren;

            return (
              <React.Fragment key={item.label}>
                <Tooltip
                  title={collapsed ? item.label : ""}
                  placement="right"
                  enterDelay={300}
                >
                  <ListItemButton
                    component={isLink ? NavLink : "button"}
                    to={isLink ? item.to : undefined}
                    onClick={!isLink && hasChildren ? () => toggleMenu(item.label) : undefined}
                    // Apply NavLink-only props conditionally
                    {...(isLink ? { end: true, className: navActive } : {})}
                    sx={(t) => ({
                      color: t.palette.grey?.lighten_1 || t.palette.text.secondary,
                      width: "100%",
                      borderRadius: t.radius?.sm,
                      px: collapsed ? 1 : 1.25,
                      "& .MuiListItemText-primary": {
                        fontSize: t.typography.body1.fontSize,
                        fontWeight: 300,
                        fontFamily: t.typography.fontFamily,
                      },
                      "& .MuiListItemIcon-root": {
                        color: t.palette.grey?.lighten_1 || t.palette.text.secondary,
                        minWidth: 40,
                      },
                      "&:hover": {
                        backgroundColor: alpha(t.palette.background.paper, 0.09),
                      },
                      "&.active": {
                        backgroundColor: "rgba(255, 255, 255, 0.03)",
                        backgroundImage:
                          "radial-gradient(circle at center, rgba(184,110,159,0.12) 0%, rgba(102,37,37,0.12) 100%)",
                        backgroundBlendMode: "lighten",
                        color: t.palette.background.paper,
                        "& .MuiListItemIcon-root": {
                          color: t.palette.background.paper,
                        },
                      },
                    })}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    {!collapsed && <ListItemText primary={item.label} />}
                    {!collapsed &&
                      hasChildren &&
                      (openMenus[item.label] ? <ExpandLess /> : <ExpandMore />)}
                  </ListItemButton>
                </Tooltip>

                {/* Submenu */}
                {hasChildren && (
                  <Collapse in={openMenus[item.label]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.children.map((child) => (
                        <Tooltip
                          key={child.label}
                          title={collapsed ? child.label : ""}
                          placement="right"
                          enterDelay={300}
                        >
                          <ListItemButton
                            component={NavLink}
                            to={child.to}
                            end
                            className={navActive}
                            sx={(t) => ({
                              pl: collapsed ? 1.5 : 4,
                              color: t.palette.grey?.lighten_1 || t.palette.text.secondary,
                              borderRadius: t.radius?.sm,
                              "& .MuiListItemIcon-root": {
                                color: t.palette.grey?.lighten_1 || t.palette.text.secondary,
                                minWidth: 40,
                              },
                              "&:hover": {
                                backgroundColor: alpha(t.palette.background.paper, 0.09),
                              },
                              "&.active": {
                                backgroundImage:
                                  "radial-gradient(circle, #B86E9F1A 0%, #6625251A 100%)",
                                color: t.palette.text.primary,
                              },
                            })}
                          >
                            <ListItemIcon>{child.icon}</ListItemIcon>
                            {!collapsed && <ListItemText primary={child.label} />}
                          </ListItemButton>
                        </Tooltip>
                      ))}
                    </List>
                  </Collapse>
                )}
              </React.Fragment>
            );
          })}
        </List>
      </Drawer>
    </Box>
  );
}
