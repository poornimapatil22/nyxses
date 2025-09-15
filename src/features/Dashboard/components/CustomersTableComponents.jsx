
import React from "react";
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
  IconButton,
} from "@mui/material";
import ArrowUpwardRounded from "@mui/icons-material/ArrowUpwardRounded";
import ArrowDownwardRounded from "@mui/icons-material/ArrowDownwardRounded";
import RemoveRedEyeOutlined from "@mui/icons-material/RemoveRedEyeOutlined";
import MoreVertRounded from "@mui/icons-material/MoreVertRounded";

import { fmtDate, fmtTime, STATUS_STYLE } from "./CustomersTableHelpers";

export const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <Box component="div" ref={ref} {...props} />
  )),
  Table: (props) => <Table {...props} stickyHeader size="small" />,
  TableHead: React.forwardRef((props, ref) => <TableHead {...props} ref={ref} />),
  TableRow: React.forwardRef((props, ref) => <TableRow {...props} ref={ref} hover />),
  TableBody: React.forwardRef((props, ref) => <tbody ref={ref} {...props} />),
};

export const SortLabel = ({ active, direction }) => (
  <Box component="span" sx={{ display: "inline-flex", ml: 0.5 }}>
    {active ? (
      direction === "asc" ? (
        <ArrowUpwardRounded fontSize="inherit" />
      ) : (
        <ArrowDownwardRounded fontSize="inherit" />
      )
    ) : null}
  </Box>
);

export const fixedHeaderContent = (toggleSort, sortKey, sortDirection) => (
  <TableRow>
    <TableCell>Customer Name</TableCell>
    <TableCell>Description</TableCell>
    <TableCell onClick={() => toggleSort("registered")} sx={{ cursor: "pointer" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        Registered
        <SortLabel active={sortKey === "registered"} direction={sortDirection} />
      </Box>
    </TableCell>
    <TableCell>Time</TableCell>
    <TableCell>Type</TableCell>
    <TableCell onClick={() => toggleSort("expiryTime")} sx={{ cursor: "pointer" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        Expires
        <SortLabel active={sortKey === "expiryTime"} direction={sortDirection} />
      </Box>
    </TableCell>
    <TableCell onClick={() => toggleSort("deviceLimit")} sx={{ cursor: "pointer" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        Limit
        <SortLabel active={sortKey === "deviceLimit"} direction={sortDirection} />
      </Box>
    </TableCell>
    <TableCell>Status</TableCell>
    <TableCell align="center">Actions</TableCell>
  </TableRow>
);

export const rowContent = (index, c) => {
  const st = STATUS_STYLE[c.customerStatus] || {
    label: c.customerStatus,
    color: "default",
  };
  const typeLabel =
    c.accountType === 0
      ? "Demo"
      : c.accountType === 1
      ? "Pro"
      : c.accountType === 2
      ? "Enterprise"
      : "—";

  return (
    <>
      <TableCell sx={{ fontWeight: "normal" }}>{c.name}</TableCell>
      <TableCell sx={{ color: "text.primary" }}>{c.description || "—"}</TableCell>
      <TableCell>{fmtDate(c.registrationTime)}</TableCell>
      <TableCell>{fmtTime(c.registrationTime)}</TableCell>
      <TableCell>{typeLabel}</TableCell>
      <TableCell>{fmtDate(c.expiryTime)}</TableCell>
      <TableCell>{Number(c.deviceLimit ?? 0)}</TableCell>
      <TableCell>
        <Chip
          label={st.label}
          color={st.color}
          size="small"
          variant={st.color === "default" ? "outlined" : "filled"}
          sx={{ borderRadius: 2 }}
        />
      </TableCell>
      <TableCell align="center">
        <Tooltip title="View">
          <IconButton size="small">
            <RemoveRedEyeOutlined fontSize="small" />
          </IconButton>
        </Tooltip>
        <IconButton size="small">
          <MoreVertRounded fontSize="small" />
        </IconButton>
      </TableCell>
    </>
  );
};