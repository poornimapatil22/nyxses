// import { useSelector } from 'react-redux';
// import { Navigate, Outlet, useLocation } from 'react-router-dom';
// import GlobalLoading from '../shared/components/GlobalLoading';
// import { ROUTES } from '../config/routes';

// export default function PrivateRoutes({ allowedRoles }) {
//   const location = useLocation();
//   const { token, user, loading } = useSelector((s) => s.auth || {});

//   // 1) If no token, redirect immediately (absolute path)
//   if (!token) {
//     return <Navigate to={ROUTES.LOGIN} replace state={{ from: location }} />;
//   }

//   // 2) While resolving user, show loader (but only after we know we have a token)
//   if (loading) {
//     return <GlobalLoading />;
//   }

//   // 3) Optional: role-based check (if you use it)
//   // if (allowedRoles?.length) {
//   //   const isSuperAdmin = !!user?.data?.superAdmin;
//   //   const role = user?.data?.role ?? user?.role;
//   //   const authorized =
//   //     allowedRoles.includes(role) ||
//   //     (isSuperAdmin && allowedRoles.includes('SUPER_ADMIN'));

//   //   if (!authorized) {
//   //     return <Navigate to={ROUTES.UNAUTHORIZED} replace />;
//   //   }
//   // }

//   return <Outlet />;
// }



// src/router/PrivateRoutes.jsx
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ROUTES } from '../config/routes';
import GlobalLoading from '../shared/components/GlobalLoading';

export default function PrivateRoutes() {
  const location = useLocation();
  const { user, loading } = useSelector((s) => s.auth || {});
  if (!user) return <Navigate to={ROUTES.LOGIN} replace state={{ from: location }} />;
  if (loading) return <GlobalLoading />;
  return <Outlet />;
}
