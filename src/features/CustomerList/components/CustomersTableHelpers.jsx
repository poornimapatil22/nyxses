// src/features/Dashboard/components/CustomersTableHelpers.jsx
import { useEffect, useState } from "react";
import { muiTheme } from "./../../../shared/themes/muiTheme"; // use MUI theme

// ---------- Format Helpers ----------
export const fmtDate = (ms) =>
  typeof ms === "number" ? new Date(ms).toLocaleDateString() : "—";

export const fmtTime = (ms) =>
  typeof ms === "number"
    ? new Date(ms).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "—";

// ---------- Status Styling ----------
export const STATUS_STYLE = {
  "customer.active": {
    label: "Active",
    color: muiTheme.palette.green.darken_2,
    bg: muiTheme.palette.green.lighten_5,
  },
  "customer.client": {
    label: "Client",
    color: muiTheme.palette.success.main,
    bg: muiTheme.palette.green.lighten_4,
  },
  "customer.new": {
    label: "New",
    color: muiTheme.palette.secondary.main,
    bg: muiTheme.palette.purple.lighten_4,
  },
  "customer.onpremise.trial": {
    label: "On-premise trial",
    color: muiTheme.palette.secondary.main,
    bg: muiTheme.palette.purple.lighten_5,
  },
  "customer.need.followup": {
    label: "Need follow-up",
    color: muiTheme.palette.warning.main,
    bg: muiTheme.palette.grey.lighten_2,
  },
  "customer.followup.sent": {
    label: "Follow-up sent",
    color: muiTheme.palette.info.main,
    bg: muiTheme.palette.grey.lighten_5,
  },
  "customer.pause": {
    label: "Pause",
    color: muiTheme.palette.warning.main,
    bg: muiTheme.palette.orange,
  },
  "customer.no.signin": {
    label: "No sign-in",
    color: muiTheme.palette.grey.darken_2,
    bg: muiTheme.palette.grey.lighten_3,
  },
  "customer.internal.test": {
    label: "Internal test",
    color: muiTheme.palette.grey.darken_4,
    bg: muiTheme.palette.grey.lighten_4,
  },
  "customer.developer": {
    label: "Developer",
    color: muiTheme.palette.green.darken_2,
    bg: muiTheme.palette.green.lighten_4,
  },
  "customer.difficult": {
    label: "Difficult",
    color: muiTheme.palette.warning.main,
    bg: muiTheme.palette.grey.lighten_2,
  },
  "customer.abandon": {
    label: "Abandon",
    color: muiTheme.palette.grey.darken_1,
    bg: muiTheme.palette.grey.lighten_3,
  },
  "customer.denial": {
    label: "Denial",
    color: muiTheme.palette.grey.lighten_2,      // red text
    bg: muiTheme.palette.error.light,     // light red background
  },
  "customer.expired": {
    label: "Expired",
    color:muiTheme.palette.grey.lighten_2,
  bg: muiTheme.palette.error.light ,
  },
};

// ---------- Account Types ----------
export const ACCOUNT_TYPES = [
  { value: "", label: "All Types" },
  { value: "0", label: "Demo" },
  { value: "1", label: "Professional" },
  { value: "2", label: "Enterprise" },
];

// ---------- Status List ----------
export const STATUSES = [
  { value: "", label: "All statuses" },
  ...Object.entries(STATUS_STYLE).map(([value, { label }]) => ({
    value,
    label,
  })),
];

// ---------- Sorting Fields ----------
export const SORT_FIELD_MAP = {
  registered: "registrationTime",
  lastLoginTime: "lastLoginTime",
  expiryTime: "expiryTime",
  deviceLimit: "deviceLimit",
};

// ---------- Debounce Hook ----------
export const useDebounced = (value, delay = 400) => {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
};
