import React, { useState } from "react";
import { Paper, Typography, Box, IconButton, Alert } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Textinput from "../../../shared/components/Textinput";
import Loginbutton from "../../../shared/components/Loginbutton";
import { ForgetPasswordRequest } from "../api/auth.api";

const ForgotPasswordForm = ({ onLogin,onEmailSent }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

  const handleSubmit =async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (!email) {
      setError("Email is required");
      setLoading(false);
      return;
    }
    try{
        const res = await ForgetPasswordRequest(email);
        if (res.data.status === "ERROR") {
            setError("Failed to send email. Please try again.");
            return;
        }else{
            setError(null);
            onEmailSent?.();
            setLoading(false);
        }
    }catch (err) {
        setLoading(false);
        setError(err?.response?.data?.message || err.message || "Failed to send email");
    }finally{
        setLoading(false);
    }
  };

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
        justifyContent: "start",
      }}
    >
      <IconButton aria-label="Back" onClick={onLogin} sx={{width: 40, height: 40,ml: -1.3, mb: 1}}>
        <ArrowBackIcon sx={{color:'black'}}/>
      </IconButton>

      <Typography variant="h4" fontWeight={400} gutterBottom>
        Forgot Password
      </Typography>
      <Typography variant="body2" color="text.primary" sx={{ mb: 2, opacity: 0.58 }}>
        Enter your email id to receive password reset link
      </Typography>

      

      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {error && (
        <Alert severity="error" sx={{ mb: 0, width: "100%" }}>
          {error}
        </Alert>
      )}
        
        <Textinput
          id="email"
          name="email"
          label="Email"
          type="email"
          placeholder="user@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          margin="normal"
        />
        
        <Loginbutton text="Send" loading={loading} />
      </Box>
    </Paper>
  );
};

export default ForgotPasswordForm;
