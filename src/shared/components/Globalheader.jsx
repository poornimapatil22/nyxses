// src/shared/components/GlobalHeader.jsx
import React from "react";
import { Box, Typography, IconButton, Avatar, useTheme } from "@mui/material";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import Usericon from "./Usericon";

const HEADER_H = 52; // header height

const GlobalHeader = ({ title = "Dashboard", actions, avatarSrc }) => {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          position: "sticky",
          top: 0,
          width: "100%",
          height: HEADER_H,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2.5,
          borderRadius: theme.radius.sm,
          bgcolor: theme.palette.grey.lighten_2,
          boxShadow: "0 8px 16px rgba(0,0,0,0.06)",
          zIndex: (t) => t.zIndex.appBar, // stay above content
        }}
      >
        <Typography variant="h5" fontWeight={700}>
          {title}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
          

          <IconButton
            size="small"
            sx={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              border: "2px solid rgba(0,0,0,0.3)",
              bgcolor: "transparent",
            }}
          >
            <HelpOutlineRoundedIcon />
          </IconButton>
          <Usericon />
        </Box>
      </Box>

      
    </>
  );
};

export default GlobalHeader;
