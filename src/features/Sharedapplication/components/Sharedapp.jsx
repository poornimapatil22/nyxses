import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchallsharedapplications,
  fetchsearchapplication,
  selectsharedapplication,
  selectsharedapplicationloading,
  selectsharedapplicationerror,
} from "../slice/Sharedapplicationslice";

import {
  Paper, Stack, Button, TextField, InputAdornment, Tooltip, IconButton,
  Typography, Box, Table, TableHead, TableRow, TableCell, TableBody, Avatar
} from "@mui/material";
import AddRounded from "@mui/icons-material/AddRounded";
import SearchRounded from "@mui/icons-material/SearchRounded";
import FilterListRounded from "@mui/icons-material/FilterListRounded";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Sharedapp = () => {
  const dispatch = useDispatch();
  const slice = useSelector(selectsharedapplication);          // your slice selector
  const loading = useSelector(selectsharedapplicationloading);
  const error = useSelector(selectsharedapplicationerror);

  // Robustly normalize array from various payload shapes:
  const apps = useMemo(() => {
    if (!slice) return [];
    // if you stored the whole server object in state.sharedapplication
    if (Array.isArray(slice?.sharedapplication?.data)) return slice.sharedapplication.data;
    // if you stored only the array
    if (Array.isArray(slice?.sharedapplication)) return slice.sharedapplication;
    // if reducer mounted differently
    if (Array.isArray(slice?.data)) return slice.data;
    return [];
  }, [slice]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchallsharedapplications());
  }, [dispatch]);

  // simple search: empty => fetch all, non-empty => search
  useEffect(() => {
    const t = setTimeout(() => {
      if (!search.trim()) {
        dispatch(fetchallsharedapplications());
      } else {
        dispatch(fetchsearchapplication(search));
      }
    }, 300);
    return () => clearTimeout(t);
  }, [search, dispatch]);

  // dummy filter button (no-op for now)
  const openFilter = () => {};

  const handlechange = (value) =>{ setSearch(value);}

  const total = apps.length;

  return (
    <Paper elevation={0} sx={{ p: 2, borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
        <Button variant="contained" startIcon={<AddRounded />} size="small">
          Add Application
        </Button>

        <TextField
          size="small"
          placeholder="Search application name or package…"
          value={search}
          onChange={(e) => handlechange(e.target.value)}
          sx={{ width: 320, ml: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRounded fontSize="small" />
              </InputAdornment>
            ),
          }}
        />

        <Box sx={{ flex: 1 }} />

        <Typography variant="body2" color="text.secondary">
          {total} item{total === 1 ? "" : "s"}
        </Typography>
      </Stack>

      <Box sx={{ overflowX: "auto" }}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Icon</TableCell>
              <TableCell>Application Name</TableCell>
              <TableCell>Package ID</TableCell>
              <TableCell>URL</TableCell>
              <TableCell>Version</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {apps.map((app) => (
              <TableRow key={app.id} hover>
                <TableCell>
                  {app.showIcon ? (
                    <Avatar
                      variant="rounded"
                      src={app.iconId ? `/rest/public/icon/${app.iconId}` : undefined}
                      sx={{ width: 32, height: 32 }}
                    />
                  ) : (
                    <Avatar variant="rounded" sx={{ width: 32, height: 32, bgcolor: "grey.200", color: "grey.700" }}>
                      {app.name?.charAt(0)}
                    </Avatar>
                  )}
                </TableCell>

                <TableCell sx={{ fontWeight: 500 }}>{app.name}</TableCell>
                <TableCell sx={{ color: "text.secondary" }}>{app.pkg}</TableCell>

                <TableCell sx={{ maxWidth: 160, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {app.url || "—"}
                </TableCell>

                <TableCell>{app.version || "—"}</TableCell>

                <TableCell align="center">
                  <Tooltip title="Edit">
                    <IconButton size="small">
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton size="small" color="error">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}

            {!loading && apps.length === 0 && (
              <TableRow>
                <TableCell colSpan={6}>
                  <Box py={6} textAlign="center" color="text.secondary">
                    {error?.message || "No applications found"}
                  </Box>
                </TableCell>
              </TableRow>
            )}

            {loading && (
              <TableRow>
                <TableCell colSpan={6}>
                  <Box py={6} textAlign="center" color="text.secondary">
                    Loading…
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
    </Paper>
  );
};

export default Sharedapp;
