import React from "react";
import { Paper, Box, Typography, useTheme } from "@mui/material";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
  ReferenceArea,
} from "recharts";

// small tooltip card
const TooltipCard = ({ active, label, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <Box
      sx={{
        px: 1.25,
        py: 1,
        bgcolor: "background.paper",
        borderRadius: 1,
        boxShadow: 2,
        border: (t) => `1px solid ${t.palette.divider}`,
      }}
    >
      <Typography variant="caption" sx={{ fontWeight: 700 }}>
        {label}
      </Typography>
      {payload.map((p) => (
        <Box
          key={p.dataKey}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mt: 0.5,
            color: p.stroke,
          }}
        >
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              bgcolor: p.stroke,
              flexShrink: 0,
            }}
          />
          <Typography variant="body2">
            {p.name}: <b>{p.value}</b>
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

/**
 * Props:
 * - data: [{ month: 'Jan', onboarded: 53, expired: 26 }, ...]
 * - xKey: string (default 'month')
 * - onboardedKey: string (default 'onboarded')
 * - expiredKey: string (default 'expired')
 * - title: string
 * - height: number (default 340)
 * - colors: { onboarded?: string, expired?: string }
 * - highlight: { x1: any, x2: any }   // e.g. { x1: 'Aug', x2: 'Sep' }
 */
export default function TrendChart({
  data = [],
  xKey = "month",
  onboardedKey = "onboarded",
  expiredKey = "expired",
  title = "Vendor Onboarding Trend",
  height = 340,
  colors = {},
  highlight,
}) {
  const theme = useTheme();
  const cOn = colors.onboarded || "#10B981"; // green-teal
  const cEx = colors.expired || "#6366F1";   // indigo

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 1.5, sm: 2 },
        borderRadius: 2,
        border: (t) => `1px solid ${t.palette.divider}`,
        bgcolor: "background.paper",
        width: "100%",
        display:{xs:"none",  sm: "none", md: "block" },
      }}
    >
      {title && (
        <Typography variant="h5" sx={{ mb: 1 }}>
          {title}
        </Typography>
      )}

      <Box sx={{ width: "100%", height }}>
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 12, right: 24, bottom: 8, left: 0 }}>
            <CartesianGrid stroke={theme.palette.action.disabledBackground} vertical={false} />
            <XAxis
              dataKey={xKey}
              tick={{ fill: theme.palette.text.secondary }}
              axisLine={{ stroke: theme.palette.divider }}
              tickLine={false}
              interval={0}
              height={30}
            />
            <YAxis
              tick={{ fill: theme.palette.text.secondary }}
              axisLine={{ stroke: theme.palette.divider }}
              tickLine={false}
            />

            {/* Optional shaded month band */}
            {/* {highlight?.x1 && highlight?.x2 && (
              <ReferenceArea
                x1={highlight.x1}
                x2={highlight.x2}
                fill={cEx}
                fillOpacity={0.06}
                strokeOpacity={0}
              />
            )} */}

            <Tooltip content={<TooltipCard />} />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              wrapperStyle={{ paddingBottom: 12 }}
              formatter={(v) =>
                <span style={{ color: theme.palette.text.secondary }}>{v}</span>
              }
            />

            <Line
              type="monotone"
              dataKey={onboardedKey}
              name="Customer Onboarded"
              stroke={cOn}
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
            <Line
              type="monotone"
              dataKey={expiredKey}
              name="Customer Expired"
              stroke={cEx}
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
}
