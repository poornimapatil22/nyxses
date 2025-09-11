// // src/config/routes.js
// export const ROUTES = {
//   LOGIN: '/login',
//   UNAUTHORIZED: '/unauthorized',   // not '*'
//   DASHBOARD: '/dashboard',
//   HOME: '/',
//   DEVICES: '/devices',
//   DEVICE_DETAIL: '/devices/:id',
//   CUSTOMER: 'customers',           // <-- relative child of /dashboard
//   // If you prefer absolute instead: CUSTOMER: '/dashboard/customers'
// };


// src/config/routes.js
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  UNAUTHORIZED: '/unauthorized',
  // child route strings stay relative:
  CUSTOMERS: 'customers',
  APPS: 'apps',
  DEVICES: 'devices',
};
