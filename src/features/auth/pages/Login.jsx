import React from "react";
import LoginLayout from "../components/LoginLayout";
import { useSelector } from "react-redux";
import { selectIsAuthed, selectAuthLoading } from "../slice/authSlice";
import { ROUTES } from "../../../config/routes";
import { Box, CircularProgress } from "@mui/material";
import { Navigate, useLocation } from "react-router-dom";
import GlobalLoading from './../../../shared/components/GlobalLoading';

export default function Login() {
  const isAuthed = useSelector(selectIsAuthed);
  const loading = useSelector(selectAuthLoading); // optional: avoid flicker while checking
  const location = useLocation();


  if (loading) {
    return (
      <GlobalLoading/>
    );
  }

  if (isAuthed) {
    const from = location.state?.from?.pathname || ROUTES.DASHBOARD;
    return <Navigate to={from} replace />;
  }


  return (
      <LoginLayout />
  );
}
