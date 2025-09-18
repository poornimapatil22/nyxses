
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchallsharedapplications,
  fetchsearchapplication,
  selectsharedapplication,
  selectsharedapplicationloading,
  selectsharedapplicationerror,
} from "../slice/Sharedapplicationslice";

import { Paper, Stack, Typography, Box } from "@mui/material";
import SearchApplication from "./SearchApplication";
import AddApplicationButton from "./AddApplicationButton";
import SharedApplicationsTable from "./SharedApplicationsTable";

const SharedApp = () => {
  const dispatch = useDispatch();
  const slice = useSelector(selectsharedapplication);
  const loading = useSelector(selectsharedapplicationloading);
  const error = useSelector(selectsharedapplicationerror);

  const apps = useMemo(() => {
    if (!slice) return [];
    if (Array.isArray(slice?.sharedapplication?.data)) return slice.sharedapplication.data;
    if (Array.isArray(slice?.sharedapplication)) return slice.sharedapplication;
    if (Array.isArray(slice?.data)) return slice.data;
    return [];
  }, [slice]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchallsharedapplications());
  }, [dispatch]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!search.trim()) {
        dispatch(fetchallsharedapplications());
      } else {
        dispatch(fetchsearchapplication(search));
      }
    }, 300);
    return () => clearTimeout(timeout);
  }, [search, dispatch]);

  return (
    <Paper elevation={0} sx={{ p: 2, borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
        <AddApplicationButton />
        <SearchApplication search={search} setSearch={setSearch} />
        <Box sx={{ flex: 1 }} />
        <Typography variant="body2" color="text.secondary">
          {apps.length} item{apps.length === 1 ? "" : "s"}
        </Typography>
      </Stack>

      <SharedApplicationsTable apps={apps} loading={loading} error={error} />
    </Paper>
  );
};

export default SharedApp;
