import React from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import { ACCOUNT_TYPES, STATUSES } from "./CustomersTableHelpers";

export default function CustomerFilters({
  accountType,
  setAccountType,
  status,
  setStatus,
  expiredOnly,
  setExpiredOnly,
  setPage,
}) {
  return (
    <Box sx={{ p: 2, width: 320 }}>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Filters
      </Typography>

      <Typography variant="caption" color="text.secondary">
        Account Type
      </Typography>
      <Select
        size="small"
        fullWidth
        value={accountType}
        onChange={(e) => {
          setPage(0);
          setAccountType(e.target.value);
        }}
        sx={{ mb: 1 }}
      >
        {ACCOUNT_TYPES.map((o) => (
          <MenuItem key={o.value} value={o.value}>
            {o.label}
          </MenuItem>
        ))}
      </Select>

      <Typography variant="caption" color="text.secondary">
        Status
      </Typography>
      <Select
        size="small"
        fullWidth
        value={status}
        onChange={(e) => {
          setPage(0);
          setStatus(e.target.value);
        }}
        sx={{ mb: 1 }}
      >
        {STATUSES.map((o) => (
          <MenuItem key={o.value} value={o.value}>
            {o.label}
          </MenuItem>
        ))}
      </Select>

      <FormControlLabel
        control={
          <Checkbox
            checked={expiredOnly}
            onChange={(e) => {
              setPage(0);
              setExpiredOnly(e.target.checked);
            }}
            size="small"
          />
        }
        label="Expired only"
      />
    </Box>
  );
}
