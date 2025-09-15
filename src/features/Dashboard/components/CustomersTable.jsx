
import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  Tooltip,
  Button,
  TablePagination,
  Stack,
  Popover,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Select,
  IconButton,
} from "@mui/material";
import AddRounded from "@mui/icons-material/AddRounded";
import SearchRounded from "@mui/icons-material/SearchRounded";
import FilterListRounded from "@mui/icons-material/FilterListRounded";

import { TableVirtuoso } from "react-virtuoso";
import { useDispatch, useSelector } from "react-redux";
import {
  getallcustomers,
  getfilteredcustomers,
  selectallcustomer,
  selectfilteredcustomer,
  selectcustomerloading,
} from "../slice/Customerslice";

import {
  ACCOUNT_TYPES,
  STATUSES,
  SORT_FIELD_MAP,
  useDebounced,
} from "./CustomersTableHelpers";
import {
  VirtuosoTableComponents,
  fixedHeaderContent,
  rowContent,
} from "./CustomersTableComponents";

export default function CustomersTable() {
  const dispatch = useDispatch();
  const allPayload = useSelector(selectallcustomer);
  const filtPayload = useSelector(selectfilteredcustomer);
  const loading = useSelector(selectcustomerloading);

  const payload = filtPayload ?? allPayload;
  const rows = payload?.data?.items ?? [];
  const totalItemsCount = payload?.data?.totalItemsCount ?? rows.length;

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(50);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounced(search);
  const [accountType, setAccountType] = useState("");
  const [status, setStatus] = useState("");
  const [expiredOnly, setExpiredOnly] = useState(false);
  const [sortKey, setSortKey] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    dispatch(getallcustomers());
  }, [dispatch]);

  const fetchFiltered = React.useCallback(() => {
    const payload = {
      currentPage: page + 1,
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
  }, [
    dispatch,
    page,
    pageSize,
    expiredOnly,
    debouncedSearch,
    accountType,
    status,
    sortKey,
    sortDirection,
  ]);

  useEffect(() => {
    fetchFiltered();
  }, [fetchFiltered]);

  const [anchorEl, setAnchorEl] = useState(null);
  const openFilter = (e) => setAnchorEl(e.currentTarget);
  const closeFilter = () => setAnchorEl(null);
  const filterOpen = Boolean(anchorEl);

  const toggleSort = (key) => {
    if (sortKey !== key) {
      setSortKey(key);
      setSortDirection("asc");
    } else {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
    }
  };

  const start = totalItemsCount === 0 ? 0 : page * pageSize + 1;
  const end = Math.min((page + 1) * pageSize, totalItemsCount);

  return (
    <Paper
      elevation={0}
      sx={{ p: 2, borderRadius: 3, border: "1px solid", borderColor: "divider" }}
    >
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
        <Button variant="outlined" startIcon={<AddRounded />} size="small">
          Add Customer
        </Button>
        <TextField
          size="small"
          placeholder="Search"
          value={search}
          onChange={(e) => {
            setPage(0);
            setSearch(e.target.value);
          }}
          sx={{ width: 320, ml: 1 }}
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

      <Box sx={{ height: 500 }}>
        <TableVirtuoso
          data={rows}
          components={VirtuosoTableComponents}
          fixedHeaderContent={() =>
            fixedHeaderContent(toggleSort, sortKey, sortDirection)
          }
          itemContent={rowContent}
        />
      </Box>

      <TablePagination
        component="div"
        count={totalItemsCount}
        page={page}
        onPageChange={(_, p) => setPage(p)}
        rowsPerPage={pageSize}
        onRowsPerPageChange={(e) => {
          setPage(0);
          setPageSize(parseInt(e.target.value, 10));
        }}
        rowsPerPageOptions={[10, 25, 50, 100]}
      />

      <Popover
        open={filterOpen}
        anchorEl={anchorEl}
        onClose={closeFilter}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
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
      </Popover>
    </Paper>
  );
}