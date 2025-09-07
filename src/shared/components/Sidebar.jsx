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
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: collapsed ? MINI_W : FULL_W,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: collapsed ? MINI_W : FULL_W,
            m: "8px", // 8px gap all around
            height: "calc(100vh - 16px)", // account for margins
            borderRadius: theme.radius.sm,
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
        <List sx={{ pt: 0.5,mt:2,px: collapsed ? 0 : 1 }}>
          {menuItems.map((item) => (
            <React.Fragment key={item.label}>
              <Tooltip
                title={collapsed ? item.label : ""}
                placement="right"
                enterDelay={300}
              >
                <ListItemButton
                  component={item.to ? NavLink : "button"}
                  to={item.to || undefined}
                  onClick={
                    item.children ? () => toggleMenu(item.label) : undefined
                  }
                  end
                  sx={(t) => ({
                    color: t.palette.grey.lighten_1,
                    width: "100%",
                    borderRadius: t.radius.sm,
                    px: collapsed ? 1 : 1.25,
                    "& .MuiListItemText-primary": {
                      fontSize: t.typography.body1.fontSize, // ← use theme token
                      fontWeight: 300, // ← medium weight
                      fontFamily: t.typography.fontFamily, // optional, ensures consistency
                    },

                    "& .MuiListItemIcon-root": {
                      color: t.palette.grey.lighten_1,
                      minWidth: 40,
                    },
                    "&:hover": {
                      backgroundColor: alpha(t.palette.background.paper, 0.09),
                    },
                    "&.active": {
                      backgroundColor: "rgba(255, 255, 255, 0.03)", // faint base layer
                      backgroundImage:
                        "radial-gradient(circle at center, rgba(184,110,159,0.12) 0%, rgba(102,37,37,0.12) 100%)",
                      backgroundBlendMode: "lighten", // makes the gradient blend softly
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
                    item.children &&
                    (openMenus[item.label] ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>
              </Tooltip>

              {/* Submenu */}
              {item.children && (
                <Collapse
                  in={openMenus[item.label]}
                  timeout="auto"
                  unmountOnExit
                >
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
                          sx={(t) => ({
                            pl: collapsed ? 1.5 : 4,
                            color: t.palette.grey.lighten_1,
                            borderRadius: t.radius.sm,
                            "& .MuiListItemIcon-root": {
                              color: t.palette.grey.lighten_1,
                              minWidth: 40,
                            },
                            "&:hover": {
                              backgroundColor: alpha(
                                t.palette.background.paper,
                                0.09
                              ),
                            },
                            "&.active": {
                              backgroundImage:
                                "radial-gradient(circle, #B86E9F1A 0%, #6625251A 100%)",
                            },
                          })}
                        >
                          <ListItemIcon>{child.icon}</ListItemIcon>
                          {!collapsed && <ListItemText primary={child.label}  />}
                        </ListItemButton>
                      </Tooltip>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
