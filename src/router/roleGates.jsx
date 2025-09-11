// src/router/roleGates.jsx
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "../config/routes";

export function RequireSuperAdmin() {
  const superAdmin = useSelector((s) => !!s.auth?.superAdmin);
  return superAdmin ? (
    <Outlet />
  ) : (
    <Navigate to={ROUTES.UNAUTHORIZED} replace />
  );
}

export function RequireAdmin() {
  const superAdmin = useSelector((s) => !!s.auth?.superAdmin);
  return !superAdmin ? (
    <Outlet />
  ) : (
    <Navigate to={ROUTES.UNAUTHORIZED} replace />
  );
}
