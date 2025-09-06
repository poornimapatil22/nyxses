import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import Alert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { login, selectAuthLoading, selectAuthError } from "../slice/authSlice";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../config/routes";
import Textinput from "../../../shared/components/Textinput";
import Loginbutton from "../../../shared/components/Loginbutton";
import RememberMeSwitch from "../../../shared/components/RememberMeSwitch";
import { useState } from "react";

const Loginform = ({onForgotPassword}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const [form, setForm] = useState({
    login: "",
    password: "",
    remember: false,
  });


  const handleChange = (e, checkedArg) => {
    const { name, type, value, checked } = e.target;
    const nextValue =
      typeof checkedArg === "boolean"
        ? checkedArg
        : type === "checkbox"
        ? checked
        : value;

    setForm((prev) => ({ ...prev, [name]: nextValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hashedform = {
      ...form,
      password: CryptoJS.MD5(form.password).toString().toUpperCase(),
    };

    const result = await dispatch(login(hashedform));
    console.log("Login result:", result);
    if (login.rejected.match(result)) {
      return;
    }
    if (login.fulfilled.match(result)) {
      const from = location.state?.from?.pathname || ROUTES.DASHBOARD;
      navigate(from, { replace: true });
    }
  };

  return (
    <Paper elevation={0} sx={{ padding:3, width: "100%",height:"100%",maxHeight:500, display: "flex", flexDirection: "column", justifyContent:"start" }}>
      <Box>
                  <img
                    src="\src\assets\images\neo dms logo dark.svg"
                    alt="NeoDMS Logo"
                    style={{ maxWidth: "70%", maxHeight: "60%" }}
                  />
                </Box>
      <Typography variant="h2" fontSize={34} sx={{ mt: 0, opacity: 0.87 }}>
        Welcome
      </Typography>
      <Typography
        variant="body2"
        color="text.primary"
        sx={{ mb: 1, mt: 2, opacity: 0.58 }}
      >
        Enter your credentials to access your account
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display:"flex", flexDirection: "column", alignItems: "start", justifyContent:"start", height:"100%" }}>
        {error && (
          <Alert severity="error" sx={{ mt: 2, width: "100%" }}>
            {error}
          </Alert>
        )}
        <Textinput
          id="login"
          name="login"
          label="Login"
          type="text"
          value={form.login}
          onChange={handleChange}
          margin="normal"
          required
        />
        <Textinput
          id="password"
          name="password"
          label="Password"
          type="password"
          value={form.password}
          onChange={handleChange}
          margin="normal"
          required
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: 1,
            mb: 2,
            padding: "0 0 0 10px",
            width: "100%",
          }}
        >
          <RememberMeSwitch checked={form.remember} onChange={handleChange} />
          <Typography
            variant="body2"
            sx={{ cursor: "pointer" }}
            color="primary"
            onClick={onForgotPassword} // Use the passed down function
          >
            FORGOT PASSWORD?
          </Typography>
        </Box>
        <Loginbutton text={"Login"} loading={loading} />
      </Box>
    </Paper>
  );
};

export default Loginform;
