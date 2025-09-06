// src/router/AppRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes';
import { ROLES } from '../config/roles';
import { ROUTES } from '../config/routes';
import { useSelector } from 'react-redux';

// PAGES
import Login from '../features/auth/pages/Login';
import DashboardLayout from '../features/DashboardLayout/Components/DashboardLayout';


// TODO: replace these placeholders with your real pages
const Dashboard = () => <h1>not super admin Dashboard</h1>;
const DevicesList = () => <h1>Devices</h1>;
const DeviceDetail = () => <h1>Device Detail</h1>;
const Unauthorized = () => <h1>Unauthorized</h1>;
const NotFound = () => <h1>404 - Not Found</h1>;

export default function AppRoutes() {
  const superAdmin = useSelector((state) => state.auth.superAdmin);
  const user = useSelector((state) => state.auth.user);
  console.log('user:', user);
  console.log('superAdmin:', superAdmin);
  return (
    <Routes>
      {/* Public */}
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.HOME} element={<Login/>} />
      <Route path={ROUTES.UNAUTHORIZED} element={<Unauthorized />} />

      {/* Auth-only (no role restriction) */}
      <Route element={<PrivateRoutes />}>
        { superAdmin ? (
          <Route path={ROUTES.DASHBOARD} element={<DashboardLayout/>} >
               {/* <Route index element={<VendorList />} /> */}
          </Route>
        ): (
          <Route path={ROUTES.DASHBOARD} element={<DashboardLayout/>} />
        )}
      </Route>
      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
