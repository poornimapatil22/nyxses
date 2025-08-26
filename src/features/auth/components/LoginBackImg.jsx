import bg from "../../../../src/assets/images/login-image.jpg"; // adjust the path
// LoginBackImg.jsx
import React from "react";
import { Box,Typography } from "@mui/material";
import CommentCarousel from "../../../shared/components/CommentCarousel.jsx";
// import bg from "../../assets/images/login-image.jpg"; // adjust path

const MESSAGES = [
  {
    title: "Protect. Monitor. Manage.",
    body:
      "Safeguard your devices with enterprise-grade security, keep a constant watch on",
  },
  {
    title: "Secure by Design.",
    body: "Defense-in-depth architecture with continuous monitoring and automated remediation.",
  },
  {
    title: "Scale with Confidence.",
    body: "Deploy, track, and manage thousands of endpoints from a single console.",
  },
];

export default function LoginBackImg() {
  return (
    <Box
      sx={{
        position: "relative",     // parent for absolute children
        width: "100%",
        height: "100%",
        borderRadius: "24px",
        overflow: "hidden",
      }}
    >
      {/* Static background image */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Optional dark overlay for contrast */}
      <Box sx={{ position: "absolute", inset: 0, bgcolor: "rgba(0,0,0,0.5)" }} />

      <Box
        sx={{
          position: "absolute",
          top: { xs: 16, md: 28 },
          right: { xs: 16, md: 28 },
          maxWidth: 240,
        }}
      >
        <Typography
          variant="body1"
          color="#fff"
          fontWeight={300}
          lineHeight={1.3}
          sx={{ textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}
        >
          One Platform.
          <br />
          Infinite Reach.
        </Typography>
      </Box>

      {/* Only the comment section rotates */}
      <CommentCarousel items={MESSAGES} />
    </Box>
  );
}
