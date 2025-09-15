
import { useEffect, useState } from "react";

export const fmtDate = (ms) =>
  typeof ms === "number" ? new Date(ms).toLocaleDateString() : "—";

export const fmtTime = (ms) =>
  typeof ms === "number"
    ? new Date(ms).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "—";

export const STATUS_STYLE = {
  "customer.active": { label: "Active", color: "success" },
  "customer.client": { label: "Client", color: "success" },
  "customer.new": { label: "New", color: "secondary" },
  "customer.onpremise.trial": { label: "On-premise trial", color: "secondary" },
  "customer.need.followup": { label: "Need follow-up", color: "warning" },
  "customer.followup.sent": { label: "Follow-up sent", color: "info" },
  "customer.pause": { label: "Pause", color: "warning" },
  "customer.no.signin": { label: "No sign-in", color: "default" },
  "customer.internal.test": { label: "Internal test", color: "default" },
  "customer.developer": { label: "Developer", color: "success" },
  "customer.difficult": { label: "Difficult", color: "warning" },
  "customer.abandon": { label: "Abandon", color: "default" },
  "customer.denial": { label: "Denial", color: "default" },
  "customer.expired": { label: "Expired", color: "default" },
};

export const ACCOUNT_TYPES = [
  { value: "", label: "All Types" },
  { value: "0", label: "Demo" },
  { value: "1", label: "Professional" },
  { value: "2", label: "Enterprise" },
];

export const STATUSES = [
  { value: "", label: "All statuses" },
  ...Object.entries(STATUS_STYLE).map(([value, { label }]) => ({
    value,
    label,
  })),
];

export const SORT_FIELD_MAP = {
  registered: "registrationTime",
  lastLoginTime: "lastLoginTime",
  expiryTime: "expiryTime",
  deviceLimit: "deviceLimit",
};

export const useDebounced = (value, delay = 400) => {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
};