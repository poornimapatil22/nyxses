// src/router/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROUTES } from "../config/routes";
import PrivateRoutes from "./PrivateRoutes";
import { RequireSuperAdmin, RequireAdmin } from "./roleGates";

import Login from "../features/auth/pages/Login";
import DashboardLayout from "../features/DashboardLayout/Components/DashboardLayout";
import Stats from "../features/CustomerAnalytics/components/Stats";
import CustomersTable from "../features/CustomerList/components/CustomersTable";
import SharedApp from "../features/Sharedapplication/components/SharedApp";

// const AppsPage = () => <h1>Apps (Super Admin)</h1>;
const DevicesPage = () => <h1>Devices (Admin)</h1>;
const AdminIndex = () => <h1>Admin Dashboard</h1>;
const Unauthorized = () => <h1>Unauthorized</h1>;
const NotFound = () => <h1>404 - Not Found</h1>;

export default function AppRoutes() {
  const superAdmin = useSelector((s) => !!s.auth?.superAdmin);

  return (
    <Routes>
      {/* Public */}
      <Route path={ROUTES.HOME} element={<Login />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.UNAUTHORIZED} element={<Unauthorized />} />

      {/* Auth-only */}
      <Route element={<PrivateRoutes />}>
        <Route path={ROUTES.DASHBOARD} element={<DashboardLayout />}>
          {/* Index differs by role but tree is stable */}
          <Route index element={superAdmin ? <Stats /> : <AdminIndex />} />

          {/* Super Admin-only */}
          <Route element={<RequireSuperAdmin />}>
            <Route path={ROUTES.CUSTOMERS} element={<CustomersTable />} />{" "}
            {/* /dashboard/customers */}
            <Route path={ROUTES.SHAREDAPPS} element={<SharedApp />} />{" "}
            {/* /dashboard/apps */}
          </Route>

          {/* Admin-only */}
          <Route element={<RequireAdmin />}>
            <Route path={ROUTES.DEVICES} element={<DevicesPage />} />{" "}
            {/* /dashboard/devices */}
          </Route>

          {/* Nested 404 for /dashboard/* */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>

      {/* App-level 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
