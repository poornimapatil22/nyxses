// src/features/vendors/components/VendorOverviewFlex.jsx
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  Card, CardContent, Typography, Box, Stack, Chip, Divider, Skeleton, Avatar,
} from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from "recharts";

import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ScheduleIcon from "@mui/icons-material/Schedule";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import BarChartIcon from "@mui/icons-material/BarChart";

// adjust paths if needed
import {
  selectAllCustomers,
  selectVendorLoading,
  selectVendorError,
} from "../slice/vendorSlice";

const typeLabel = (n) =>
  n === 0 ? "Demo" : n === 1 ? "Professional" : n === 2 ? "Enterprise" : "Unknown";

/* ---------- shared tile wrapper for FLEX ---------- */
const FlexItem = ({ children }) => (
  <Box
    sx={{
      boxSizing: "border-box",
      // responsive: 1/1 on xs, 1/2 on sm, 1/4 on md+
      flexBasis: { xs: "100%", sm: "50%", md: "25%" },
      maxWidth: { xs: "100%", sm: "50%", md: "25%" },
      flexGrow: 0,
      flexShrink: 0,
      p: 1, // inner gutter between tiles
      minWidth: 0,
    }}
  >
    {children}
  </Box>
);

/* ---------- metric card ---------- */
const MetricCard = ({ icon: Icon, color, label, value, subtitle }) => {
  const theme = useTheme();
  return (
    <Card variant="outlined" sx={{ height: 120, borderRadius: 2, borderColor: "divider" }}>
      <CardContent sx={{ height: "100%", display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar
          variant="rounded"
          sx={{ bgcolor: alpha(color, 0.12), color, width: 44, height: 44 }}
        >
          <Icon />
        </Avatar>
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography variant="overline" sx={{ opacity: 0.8, letterSpacing: 0.6 }}>
            {label}
          </Typography>
          <Typography variant="h5" noWrap>
            {Number.isFinite(value) ? value.toLocaleString() : String(value ?? 0)}
          </Typography>
          {subtitle ? (
            <Typography variant="caption" sx={{ opacity: 0.7 }} noWrap>
              {subtitle}
            </Typography>
          ) : null}
        </Box>
      </CardContent>
    </Card>
  );
};

export default function VendorOverviewFlex() {
  const theme = useTheme();
  const customersState = useSelector(selectAllCustomers);
  const loading = useSelector(selectVendorLoading);
  const error = useSelector(selectVendorError);

  // normalize -> array
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

  const now = Date.now();
  const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getTime();
  const inRange = (ms, start, end) => ms && ms >= start && ms <= end;

  const expiredNow = useMemo(
    () => items.filter((c) => Number(c?.expiryTime || 0) > 0 && Number(c.expiryTime) <= now).length,
    [items, now]
  );
  const activeNow = Math.max(0, total - expiredNow);

  const sevenDays = 7 * 24 * 60 * 60 * 1000;
  const expiring7d = useMemo(
    () =>
      items.filter((c) => {
        const et = Number(c?.expiryTime || 0);
        return et > now && et <= now + sevenDays;
      }).length,
    [items, now, sevenDays]
  );

  const newThisMonth = useMemo(
    () =>
      items.filter((c) => inRange(Number(c?.registrationTime || 0), startOfMonth, now)).length,
    [items, startOfMonth, now]
  );

  const neverLoggedIn = useMemo(
    () => items.filter((c) => !c?.lastLoginTime).length,
    [items]
  );

  const deviceLimits = useMemo(() => {
    const arr = items.map((c) => Number(c?.deviceLimit || 0)).filter((n) => Number.isFinite(n));
    const sum = arr.reduce((a, b) => a + b, 0);
    const avg = arr.length ? sum / arr.length : 0;
    const max = arr.length ? Math.max(...arr) : 0;
    return { avg, max };
  }, [items]);

  const typeCounts = useMemo(() => {
    const m = new Map();
    for (const c of items) {
      const lbl = typeLabel(c?.accountType);
      m.set(lbl, (m.get(lbl) || 0) + 1);
    }
    const base = [
      { name: "Demo", value: m.get("Demo") || 0 },
      { name: "Professional", value: m.get("Professional") || 0 },
      { name: "Enterprise", value: m.get("Enterprise") || 0 },
    ];
    if ((m.get("Unknown") || 0) > 0) base.push({ name: "Unknown", value: m.get("Unknown") || 0 });
    return base;
  }, [items]);

  if (error) return <Typography color="error">Error: {error}</Typography>;

  const col = {
    primary: theme.palette.primary.main,
    secondary: theme.palette.secondary.main,
    success: theme.palette.success.main,
    error: theme.palette.error.main,
    warning: theme.palette.warning.main,
    info: theme.palette.info.main,
  };
  const pieColor = {
    Demo: col.secondary,
    Professional: col.success,
    Enterprise: col.primary,
    Unknown: col.info,
  };

  return (
    <Box sx={{ width: "100%", px: { xs: 1.5, md: 0 }, py: 2 }}>
      {/* ---------- Rows 1 & 2: 4 + 4 metrics (Flex) ---------- */}
      {loading ? (
        <Box sx={{ display: "flex", flexWrap: "wrap", mx: -1 }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <FlexItem key={i}>
              <Skeleton variant="rounded" height={120} />
            </FlexItem>
          ))}
        </Box>
      ) : (
        <>
          {/* Row 1 */}
          <Box sx={{ display: "flex", flexWrap: "wrap", mx: -1 }}>
            <FlexItem>
              <MetricCard
                icon={PeopleAltIcon}
                color={col.primary}
                label="TOTAL CUSTOMERS"
                value={total}
                subtitle={`Active ${activeNow.toLocaleString()} • Expired ${expiredNow.toLocaleString()}`}
              />
            </FlexItem>
            <FlexItem>
              <MetricCard icon={VerifiedUserIcon} color={col.success} label="ACTIVE (NOW)" value={activeNow} />
            </FlexItem>
            <FlexItem>
              <MetricCard icon={EventBusyIcon} color={col.error} label="EXPIRED (NOW)" value={expiredNow} />
            </FlexItem>
            <FlexItem>
              <MetricCard icon={CalendarMonthIcon} color={col.info} label="NEW THIS MONTH" value={newThisMonth} />
            </FlexItem>
          </Box>

          {/* Row 2 */}
          <Box sx={{ display: "flex", flexWrap: "wrap", mx: -1, mt: 1 }}>
            <FlexItem>
              <MetricCard icon={ScheduleIcon} color={col.warning} label="EXPIRING IN 7 DAYS" value={expiring7d} />
            </FlexItem>
            <FlexItem>
              <MetricCard icon={PersonOffIcon} color={col.secondary} label="NEVER LOGGED IN" value={neverLoggedIn} />
            </FlexItem>
            <FlexItem>
              <MetricCard icon={BarChartIcon} color={col.primary} label="AVG DEVICE LIMIT" value={Math.round(deviceLimits.avg)} />
            </FlexItem>
            <FlexItem>
              <MetricCard icon={BarChartIcon} color={col.secondary} label="MAX DEVICE LIMIT" value={deviceLimits.max} />
            </FlexItem>
          </Box>

          {/* ---------- Row 3: full-width donut chart ---------- */}
          <Box sx={{ mt: 2 }}>
            <Card variant="outlined" sx={{ height: { xs: 360, md: 420 }, borderRadius: 2, borderColor: "divider" }}>
              <CardContent sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  alignItems={{ xs: "flex-start", sm: "center" }}
                  justifyContent="space-between"
                  spacing={1}
                >
                  <Typography variant="h6">Customer Type Breakdown</Typography>
                  <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                    {typeCounts.map((t) => (
                      <Chip
                        key={t.name}
                        size="small"
                        label={`${t.name}: ${t.value}`}
                        sx={{ bgcolor: pieColor[t.name], color: "#fff" }}
                      />
                    ))}
                  </Stack>
                </Stack>

                <Box sx={{ flex: 1, minHeight: 260 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={typeCounts}
                        nameKey="name"
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={120}
                        paddingAngle={2}
                        labelLine={false}
                        label={false}
                        isAnimationActive
                      >
                        {typeCounts.map((entry, idx) => (
                          <Cell key={idx} fill={pieColor[entry.name]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>

                <Divider sx={{ mt: 1 }} />
                <Typography variant="body2" sx={{ mt: 1, opacity: 0.75 }}>
                  Type mapping: 0 = Demo, 1 = Professional, 2 = Enterprise.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </>
      )}
    </Box>
  );
}
