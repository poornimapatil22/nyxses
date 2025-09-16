import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchRounded from "@mui/icons-material/SearchRounded";

export default function CustomerSearchBar({ search, setSearch, setPage }) {
  return (
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
  );
}
