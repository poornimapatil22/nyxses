import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Chip,
  Typography,
  TextField,
  InputAdornment,
  Tooltip,
  Button,
  TablePagination,
  Stack,
  Divider,
  Popover,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Select
} from "@mui/material";
import AddRounded from "@mui/icons-material/AddRounded";
import SearchRounded from "@mui/icons-material/SearchRounded";
import FilterListRounded from "@mui/icons-material/FilterListRounded";
import RemoveRedEyeOutlined from "@mui/icons-material/RemoveRedEyeOutlined";
import MoreVertRounded from "@mui/icons-material/MoreVertRounded";
import ArrowUpwardRounded from "@mui/icons-material/ArrowUpwardRounded";
import ArrowDownwardRounded from "@mui/icons-material/ArrowDownwardRounded";

import { useDispatch, useSelector } from "react-redux";
import {
  getallcustomers,
  getfilteredcustomers,
  selectallcustomer,
  selectfilteredcustomer,
  selectcustomerloading,
} from "../slice/Customerslice";

// ---- helpers ---------------------------------------------------------------

const fmtDate = (ms) =>
  typeof ms === "number" ? new Date(ms).toLocaleDateString() : "—";
const fmtTime = (ms) =>
  typeof ms === "number"
    ? new Date(ms).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "—";

const STATUS_STYLE = {
  "customer.active":       { label: "Active",   color: "success" },
  "customer.new":          { label: "New",      color: "secondary" },
  "customer.expired":      { label: "Expired",  color: "default" },
  "customer.pause":        { label: "Paused",   color: "warning" },
  "customer.denial":       { label: "Denied",   color: "default" },
  "customer.abandon":      { label: "Abandon",  color: "default" },
  "customer.need.followup":{ label: "Follow-up",color: "warning" },
  "customer.followup.sent":{ label: "Follow-up",color: "info" },
  "customer.no.signin":    { label: "No Sign-in", color: "default" },
  "customer.internal.test":{ label: "Internal", color: "default" },
  "customer.client":       { label: "Active",   color: "success" },
  "customer.developer":    { label: "Active",   color: "success" },
  "customer.onpremise.trial": { label: "New",   color: "secondary" },
};

const ACCOUNT_TYPES = [
  { value: "",  label: "All Types" },
  { value: "0", label: "Demo / Trial" },
  { value: "1", label: "Professional" },
  { value: "2", label: "Enterprise" },
];

const STATUSES = [
  { value: "", label: "All Statuses" },
  { value: "customer.active", label: "Active" },
  { value: "customer.new", label: "New" },
  { value: "customer.expired", label: "Expired" },
  { value: "customer.pause", label: "Paused" },
  { value: "customer.denial", label: "Denied" },
  { value: "customer.abandon", label: "Abandon" },
  { value: "customer.need.followup", label: "Need Follow-up" },
  { value: "customer.followup.sent", label: "Follow-up Sent" },
  { value: "customer.no.signin", label: "No Sign-in" },
  { value: "customer.internal.test", label: "Internal Test" },
  { value: "customer.client", label: "Client" },
  { value: "customer.developer", label: "Developer" },
  { value: "customer.onpremise.trial", label: "On-prem Trial" },
];

// Map UI sort key -> API sort field
const SORT_FIELD_MAP = {
  registered: "registrationTime",
  lastLoginTime: "lastLoginTime",
  expiryTime: "expiryTime",
  deviceLimit: "deviceLimit",
};

// debounce
const useDebounced = (value, delay = 400) => {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
};

// ---- component -------------------------------------------------------------

export default function CustomersTable() {
  const dispatch = useDispatch();

  const allPayload   = useSelector(selectallcustomer);
  const filtPayload  = useSelector(selectfilteredcustomer);
  const loading      = useSelector(selectcustomerloading);

  // prefer filtered set when present, else fallback to all
  const payload = filtPayload ?? allPayload;
  const rows = payload?.data?.items ?? [];
  const totalItemsCount = payload?.data?.totalItemsCount ?? rows.length;

  // table state (server-side)
  const [page, setPage] = useState(0);           // zero-based
  const [pageSize, setPageSize] = useState(50);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounced(search);
  const [accountType, setAccountType] = useState(""); // "", "0", "1", "2"
  const [status, setStatus] = useState("");          // "", "customer.active", ...
  const [expiredOnly, setExpiredOnly] = useState(false);
  const [sortKey, setSortKey] = useState("");        // "registered" | "lastLoginTime" | ...
  const [sortDirection, setSortDirection] = useState("asc"); // "asc" | "desc"

  // initial load (unfiltered)
  useEffect(() => {
    dispatch(getallcustomers());
  }, [dispatch]);

  // fire server-side filter/sort/pagination
  const fetchFiltered = React.useCallback(() => {
    const payload = {
      currentPage: page + 1,      // API is 1-based
      pageSize,
      expiredOnly,
      searchValue: debouncedSearch || "",
    };
    if (accountType !== "") payload.accountType = accountType;
    if (status !== "") payload.customerStatus = status;
    if (sortKey) {
      payload.sortValue = SORT_FIELD_MAP[sortKey];
      payload.sortDirection = sortDirection;
    }
    dispatch(getfilteredcustomers(payload));
  }, [dispatch, page, pageSize, expiredOnly, debouncedSearch, accountType, status, sortKey, sortDirection]);

  useEffect(() => {
    fetchFiltered();
  }, [fetchFiltered]);

  // filter popover
  const [anchorEl, setAnchorEl] = useState(null);
  const openFilter = (e) => setAnchorEl(e.currentTarget);
  const closeFilter = () => setAnchorEl(null);
  const filterOpen = Boolean(anchorEl);

  // sorting handler
  const toggleSort = (key) => {
    if (sortKey !== key) {
      setSortKey(key);
      setSortDirection("asc");
    } else {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
    }
  };

  const SortLabel = ({ active, direction }) => (
    <Box component="span" sx={{ display: "inline-flex", verticalAlign: "middle", ml: 0.5 }}>
      {active ? (
        direction === "asc" ? <ArrowUpwardRounded fontSize="inherit" /> : <ArrowDownwardRounded fontSize="inherit" />
      ) : null}
    </Box>
  );

  // header counter text: e.g. "1–50 of 10"
  const start = totalItemsCount === 0 ? 0 : page * pageSize + 1;
  const end = Math.min((page + 1) * pageSize, totalItemsCount);

  return (
    <Paper elevation={0} sx={{ p: 2, borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
        <Button variant="contained" startIcon={<AddRounded />} size="small">
          Add Vendor
        </Button>

        <TextField
          size="small"
          placeholder="Search"
          value={search}
          onChange={(e) => { setPage(0); setSearch(e.target.value); }}
          sx={{ width: 280, ml: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRounded fontSize="small" />
              </InputAdornment>
            ),
          }}
        />

        <Tooltip title="Filters">
          <IconButton onClick={openFilter} size="small">
            <FilterListRounded />
          </IconButton>
        </Tooltip>

        <Box sx={{ flex: 1 }} />

        <Typography variant="body2" color="text.secondary">
          {start}–{end} of {totalItemsCount}
        </Typography>
      </Stack>

      {/* Table */}
      <Box sx={{ overflowX: "auto" }}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ whiteSpace: "nowrap" }}>Vendor Name</TableCell>
              <TableCell>Description</TableCell>

              <TableCell
                sx={{ whiteSpace: "nowrap", cursor: "pointer" }}
                onClick={() => toggleSort("registered")}
              >
                <Box display="inline-flex" alignItems="center">
                  Registered
                  <SortLabel active={sortKey === "registered"} direction={sortDirection} />
                </Box>
              </TableCell>

              <TableCell sx={{ whiteSpace: "nowrap" }}>Registered</TableCell>

              <TableCell>Type</TableCell>

              <TableCell
                sx={{ whiteSpace: "nowrap", cursor: "pointer" }}
                onClick={() => toggleSort("expiryTime")}
              >
                <Box display="inline-flex" alignItems="center">
                  Expires
                  <SortLabel active={sortKey === "expiryTime"} direction={sortDirection} />
                </Box>
              </TableCell>

              <TableCell
                sx={{ whiteSpace: "nowrap", cursor: "pointer" }}
                onClick={() => toggleSort("deviceLimit")}
              >
                <Box display="inline-flex" alignItems="center">
                  Limit
                  <SortLabel active={sortKey === "deviceLimit"} direction={sortDirection} />
                </Box>
              </TableCell>

              <TableCell>Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((c) => {
              const st = STATUS_STYLE[c.customerStatus] || { label: c.customerStatus, color: "default" };
              const typeLabel =
                c.accountType === 0 ? "Demo" : c.accountType === 1 ? "Pro" : c.accountType === 2 ? "Enterprise" : "—";

              return (
                <TableRow key={c.id} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{c.name}</TableCell>
                  <TableCell sx={{ color: "text.secondary" }}>{c.description || "—"}</TableCell>

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
                </TableRow>
              );
            })}

            {rows.length === 0 && !loading && (
              <TableRow>
                <TableCell colSpan={9}>
                  <Box py={6} textAlign="center" color="text.secondary">No results</Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>

      {/* Pagination */}
      <TablePagination
        component="div"
        count={totalItemsCount}
        page={page}
        onPageChange={(_, p) => setPage(p)}
        rowsPerPage={pageSize}
        onRowsPerPageChange={(e) => { setPage(0); setPageSize(parseInt(e.target.value, 10)); }}
        rowsPerPageOptions={[10, 25, 50, 100]}
      />

      {/* Filter popover */}
      <Popover
        open={filterOpen}
        anchorEl={anchorEl}
        onClose={closeFilter}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Box sx={{ p: 2, width: 320 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>Filters</Typography>

          <Typography variant="caption" color="text.secondary">Account Type</Typography>
          <Select
            size="small"
            fullWidth
            value={accountType}
            onChange={(e) => { setPage(0); setAccountType(e.target.value); }}
            sx={{ mb: 1 }}
          >
            {ACCOUNT_TYPES.map((o) => (
              <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>
            ))}
          </Select>

          <Typography variant="caption" color="text.secondary">Status</Typography>
          <Select
            size="small"
            fullWidth
            value={status}
            onChange={(e) => { setPage(0); setStatus(e.target.value); }}
            sx={{ mb: 1 }}
          >
            {STATUSES.map((o) => (
              <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>
            ))}
          </Select>

          <FormControlLabel
            control={
              <Checkbox
                checked={expiredOnly}
                onChange={(e) => { setPage(0); setExpiredOnly(e.target.checked); }}
                size="small"
              />
            }
            label="Expired only"
          />

          <Divider sx={{ my: 1.5 }} />

          <Typography variant="caption" color="text.secondary">Sort</Typography>
          <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
            <Button
              variant={sortKey === "registered" ? "contained" : "outlined"}
              size="small"
              onClick={() => toggleSort("registered")}
            >
              Registered
            </Button>
            <Button
              variant={sortKey === "lastLoginTime" ? "contained" : "outlined"}
              size="small"
              onClick={() => toggleSort("lastLoginTime")}
            >
              Last Login
            </Button>
            <Button
              variant={sortKey === "expiryTime" ? "contained" : "outlined"}
              size="small"
              onClick={() => toggleSort("expiryTime")}
            >
              Expires
            </Button>
            <Button
              variant={sortKey === "deviceLimit" ? "contained" : "outlined"}
              size="small"
              onClick={() => toggleSort("deviceLimit")}
            >
              Limit
            </Button>
          </Stack>
        </Box>
      </Popover>
    </Paper>
  );
}
