import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import GlobalLoading from '../shared/components/GlobalLoading';

export default function PrivateRoutes({ allowedRoles }) {
  const { token } = useSelector((state) => state.auth || {}); // safe default
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);

  if (!user && !token) {
    return <Navigate to="/login" replace />;
  }
  if (loading) {
    return <GlobalLoading />;
  }

  return <Outlet />;
}
