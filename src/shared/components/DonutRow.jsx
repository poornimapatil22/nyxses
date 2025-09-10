// src/shared/components/DonutRow.jsx
import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

/**
 * DonutRow
 * props:
 *  - title?: string
 *  - charts: Array<{
 *      total: number|string;
 *      slices: Array<{ name: string; value: number; color?: string }>;
 *      legend?: boolean;  // default true
 *    }>
 *  - height?: number  (default 220)
 *  - gap?: number     (MUI spacing units, default 3)
 */
export default function DonutRow({
  title = "Subscription",
  charts = [],
  height = 220,
  gap = 3,
  sx,
}) {
  const theme = useTheme();

  const formatNumber = (val) =>
    typeof val === "number" ? new Intl.NumberFormat().format(val) : val;

  const colorPalette = [
    "#EF4444",
    "#F59E0B",
    "#22C55E",
    "#6366F1",
    "#A78BFA",
    "#94A3B8",
    "#F472B6",
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 1.5, sm: 2 },
        borderRadius: 2,
        border: (t) => `1px solid ${t.palette.divider}`,
        bgcolor: "background.paper",
        ...sx,
      }}
    >
      <Typography variant="h5" sx={{ mb: 1 }}>
        {title}
      </Typography>

      {/* Wrap only on sm & md; keep single row on xs and lg+ */}
      <Box
        sx={{
          display: "flex",
          flexWrap: { xs: "wrap", sm: "wrap", md: "wrap", lg: "nowrap" },
          gap,
          alignItems: "stretch",
        }}
      >
        {charts.map((chart, idx) => {
          // overlay disc size based on provided height
          const discSize = Math.max(48, Math.round(height * 0.28)); // px
          const textSize = Math.max(14, Math.round(height * 0.12));

          return (
            <Box
              key={idx}
              sx={{
                flex: {
                  xs: "1 1 50%",     // equal share (no wrap)
                  sm: "1 1 50%",   // 2 per row on sm
                  md: "1 1 50%",   // 2 per row on md
                  lg: "1 1 0",     // back to single row on lg+
                },
                minWidth: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* Chart wrapper must be relative so the center overlay can sit exactly in the middle */}
              <Box sx={{ width: "100%", height, position: "relative" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    {/* Tooltip must float above the overlay */}
                    <Tooltip
                      wrapperStyle={{ zIndex: 3 }} // <-- on top of overlay
                      contentStyle={{
                        borderRadius: 8,
                        borderColor: theme.palette.divider,
                      }}
                      formatter={(value, name) => [value, name]}
                    />
                    <Pie
                      data={chart.slices}
                      dataKey="value"
                      nameKey="name"
                      innerRadius="62%"
                      outerRadius="92%"
                      startAngle={90}
                      endAngle={-270}
                      stroke={theme.palette.background.paper}
                      strokeWidth={2}
                      paddingAngle={0}
                    >
                      {chart.slices.map((s, i) => (
                        <Cell
                          key={i}
                          fill={s.color || colorPalette[i % colorPalette.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>

                {/* Center number overlay (below tooltip, above arcs) */}
                <Box
                  sx={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    pointerEvents: "none",
                    zIndex: 1, // <-- below tooltip
                  }}
                >
                  <Box
                    sx={{
                      width: discSize,
                      height: discSize,
                      borderRadius: "50%",
                      bgcolor: theme.palette.background.paper,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 800,
                        fontSize: textSize,
                        lineHeight: 1,
                        color: theme.palette.text.primary,
                      }}
                    >
                      {formatNumber(chart.total)}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Per-chart legend */}
              {(chart.legend ?? true) && (
                <Box
                  sx={{
                    mt: 1,
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    columnGap: 2.5,
                    rowGap: 0.5,
                  }}
                >
                  {chart.slices.map((s, i) => (
                    <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: "3px",
                          bgcolor:
                            s.color || colorPalette[i % colorPalette.length],
                          boxShadow: `0 0 0 1px ${alpha("#000", 0.15)} inset`,
                          flexShrink: 0,
                        }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {s.name}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
}
