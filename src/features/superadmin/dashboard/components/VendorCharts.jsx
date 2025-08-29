// src/features/vendors/components/VendorTimeSeries.jsx
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  Card, CardContent, Typography, Box, Stack, Chip, ToggleButtonGroup, ToggleButton, Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

// Adjust these imports to your actual slice file paths
import {
  selectAllCustomers,
  selectVendorLoading,
  selectVendorError,
} from "../slice/vendorSlice";

function keyForPeriod(dateMs, period) {
  const d = new Date(dateMs);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  if (period === "month") return `${yyyy}-${mm}`; // e.g. 2025-08
  return `${yyyy}-${mm}-${dd}`;                   // e.g. 2025-08-27
}

function prettyLabel(key, period) {
  if (period === "month") {
    const [y, m] = key.split("-").map(Number);
    const d = new Date(y, m - 1, 1);
    return d.toLocaleDateString(undefined, { month: "short", year: "numeric" });
  }
  // day
  const [y, m, d] = key.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  return dt.toLocaleDateString(undefined, { day: "2-digit", month: "short" });
}

export default function VendorTimeSeries() {
  const theme = useTheme();
  const customersState = useSelector(selectAllCustomers);
  const loading = useSelector(selectVendorLoading);
  const error = useSelector(selectVendorError);

  // Normalize to array
  const items = useMemo(() => {
    if (Array.isArray(customersState)) return customersState;
    if (Array.isArray(customersState?.items)) return customersState.items;
    return [];
  }, [customersState]);

  const total = useMemo(() => {
    if (typeof customersState?.totalItemsCount === "number")
      return customersState.totalItemsCount;
    return items.length;
  }, [customersState, items]);

  const [period, setPeriod] = useState("day"); // "day" | "month"

  // Window size (last N units)
  const windowSize = period === "month" ? 12 : 30;

  // Compute per-period counts
  const now = Date.now();

  const expiredNow = useMemo(
    () => items.filter((c) => Number(c?.expiryTime || 0) > 0 && Number(c.expiryTime) <= now).length,
    [items, now]
  );

  const series = useMemo(() => {
    const addedMap = new Map();   // periodKey -> count of new registrations
    const expiredMap = new Map(); // periodKey -> count of expirations (in that period)

    for (const c of items) {
      const rt = Number(c?.registrationTime || 0);
      if (rt > 0) {
        const k = keyForPeriod(rt, period);
        addedMap.set(k, (addedMap.get(k) || 0) + 1);
      }
      const et = Number(c?.expiryTime || 0);
      if (et > 0) {
        const k = keyForPeriod(et, period);
        expiredMap.set(k, (expiredMap.get(k) || 0) + 1);
      }
    }

    // union of all keys
    const keys = Array.from(new Set([...addedMap.keys(), ...expiredMap.keys()])).sort();

    // limit to last N periods
    const slicedKeys = keys.slice(Math.max(0, keys.length - windowSize));

    return slicedKeys.map((k) => ({
      key: k,
      label: prettyLabel(k, period),
      added: addedMap.get(k) || 0,
      expired: expiredMap.get(k) || 0,
    }));
  }, [items, period, windowSize]);

  if (loading) return <Typography>Loading…</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;
  if (!items.length) return <Typography>No data to visualize.</Typography>;

  // Theme colors only
  const colAdded = theme.palette.primary.main;
  const colExpired = theme.palette.error.main;

  return (
    <Box display="grid" gridTemplateColumns={{ xs: "1fr", md: "1fr" }} gap={2}>
      <Card>
        <CardContent>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
            <Typography variant="h6">Customers — New vs Expired</Typography>
            <ToggleButtonGroup
              size="small"
              value={period}
              exclusive
              onChange={(_, val) => { if (val) setPeriod(val); }}
            >
              <ToggleButton value="day">Day</ToggleButton>
              <ToggleButton value="month">Month</ToggleButton>
            </ToggleButtonGroup>
          </Stack>

          <Stack direction="row" spacing={1} sx={{ mb: 1, flexWrap: "wrap" }}>
            <Chip label={`Total: ${total}`} size="small" />
            <Chip label={`Expired (now): ${expiredNow}`} size="small" color="error" />
            <Chip
              label={`Window: last ${windowSize} ${period === "month" ? "months" : "days"}`}
              size="small"
              variant="outlined"
            />
          </Stack>

          <ResponsiveContainer width="100%" height={360}>
            <BarChart data={series} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="added" name="New" stackId="s" fill={colAdded} />
              <Bar dataKey="expired" name="Expired" stackId="s" fill={colExpired} />
            </BarChart>
          </ResponsiveContainer>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body2">
            • <b>New</b>: Counted by <code>registrationTime</code> in the chosen period. <br />
            • <b>Expired</b>: Counted by <code>expiryTime</code> in the chosen period.{" "}
            <i>“Expired (now)”</i> is the number whose <code>expiryTime ≤ now</code>.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
