import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import TrendingUpRounded from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRounded from "@mui/icons-material/TrendingDownRounded";

const Statscard = ({ items = [], outerElevation = 0, sx }) => {
  const theme = useTheme();
  const formatNumber = (val) =>
    typeof val === "number" ? new Intl.NumberFormat().format(val) : val;

  return (
    <Paper
      elevation={outerElevation}
      sx={{
        p: { xs: 1.5, sm: 2 },
        borderRadius: 2,
        ...(outerElevation === 0 && {
          border: `1px solid ${alpha(theme.palette.common.black, 0.08)}`,
        }),
        ...sx,
      }}
    >
      {/* Flexbox container */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "column" ,md:"row"},
          alignItems: "stretch",
          width: "100%",
        }}
      >
        {items.map((it, idx) => {
          let dir = it.direction;
          if (!dir && typeof it.changeValue === "number") {
            dir = it.changeValue >= 0 ? "up" : "down";
          }
          const isUp = dir !== "down";
          const trendColor = isUp
            ? theme.palette.success?.main || "#1e9e4a"
            : theme.palette.error?.main || "#d32f2f";

          const iconAccent = it.color || theme.palette.primary.main;

          return (
            <React.Fragment key={idx}>
              {/* Divider between cards */}
              {idx !== 0 && (
                <Box
                  sx={{
                    width: "1px",
                    backgroundColor: alpha(theme.palette.text.primary, 0.2),
                    mx: { xs: 1, sm: 2 },
                  }}
                />
              )}

              {/* Card */}
              <Box
                sx={{
                  flex: "1 1 0", // make all cards share available width equally
                  minWidth: 0, // allow shrinking
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gridTemplateRows: "auto auto",
                  columnGap: 1.5,
                  rowGap: 0.75,
                  alignItems: "center",
                  px: { xs: 1, sm: 1.5 },
                }}
              >
                {/* Value */}
                <Typography variant="h4" fontWeight={800} lineHeight={1.2}>
                  {formatNumber(it.value)}
                </Typography>

                {/* Icon */}
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    display: "grid",
                    placeItems: "center",
                    background: `radial-gradient(120% 120% at 30% 25%,
                      ${alpha(iconAccent, 0.2)} 0%,
                      ${alpha(iconAccent, 0.1)} 40%,
                      ${alpha(iconAccent, 0.06)} 70%,
                      ${alpha(iconAccent, 0)} 100%)`,
                    boxShadow: `0 1px 2px ${alpha(iconAccent, 0.25)} inset`,
                  }}
                >
                  <Box sx={{ color: iconAccent, "& svg": { fontSize: 24 } }}>
                    {it.icon}
                  </Box>
                </Box>

                {/* Title */}
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  sx={{ gridColumn: "1 / span 1" }}
                >
                  {it.title}
                </Typography>

                {/* Change line */}
                <Box
                  sx={{
                    gridColumn: "1 / span 2",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mt: 0.5,
                  }}
                >
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      color: trendColor,
                      fontWeight: 600,
                      "& svg": { fontSize: 18 },
                    }}
                  >
                    {isUp ? <TrendingUpRounded /> : <TrendingDownRounded />}
                  </Box>
                  {it.changeValue !== undefined && (
                    <Typography
                      variant="body2"
                      sx={{ color: trendColor, fontWeight: 600 }}
                    >
                      {typeof it.changeValue === "number"
                        ? Math.abs(it.changeValue)
                        : it.changeValue}
                    </Typography>
                  )}
                  {it.changeText && (
                    <Typography variant="body2" color="text.disabled">
                      {it.changeText}
                    </Typography>
                  )}
                </Box>
              </Box>
            </React.Fragment>
          );
        })}
      </Box>
    </Paper>
  );
};

export default Statscard;
