// src/router/PrivateRoutes.jsx
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ROUTES } from "../config/routes";
import GlobalLoading from "../shared/components/GlobalLoading";

export default function PrivateRoutes() {
  const location = useLocation();
  const { user, loading } = useSelector((s) => s.auth || {});
  if (!user)
    return <Navigate to={ROUTES.LOGIN} replace state={{ from: location }} />;
  if (loading) return <GlobalLoading />;
  return <Outlet />;
}
