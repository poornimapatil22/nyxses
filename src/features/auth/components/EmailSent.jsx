// EmailSent.jsx
import React from "react";
import { Paper, Box, Typography, Button } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

const EmailSent = ({ onLogin }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        width: "100%",
        height: "100%",
        maxHeight: 500,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {/* Icon */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <CheckCircleRoundedIcon sx={{ fontSize: 36, color: "success.main" }} />
      </Box>

      {/* Heading */}
      <Typography variant="h4" fontWeight={700}>
        E-mail sent
      </Typography>

      {/* Copy */}
      <Typography variant="body2" color="text.primary" sx={{ maxWidth: 440, opacity: 0.7 }}>
        A password reset link has been sent to your registered email address.
        Please check your inbox (and spam folder) and follow the instructions to
        create a new password.
      </Typography>

      <Typography variant="body2" color="text.primary" sx={{ mt: 1, opacity: 0.58 }}>
        The link will expire in 30 mins. for security purposes.
      </Typography>

      {/* Button */}
      <Box sx={{ mt: 2, display: "flex", justifyContent: "center", width: "100%" }}>
        <Button
          fullWidth
          variant="contained"
          onClick={onLogin}
          sx={{ py: 1.2, borderRadius: 2, bgcolor: "#4f1fbf" }}
        >
          BACK TO LOGIN
        </Button>
      </Box>
    </Paper>
  );
};

export default EmailSent;
