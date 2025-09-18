// SearchApplication.jsx

import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchRounded from "@mui/icons-material/SearchRounded";

const SearchApplication = ({ search, setSearch }) => {
  return (
    <TextField
      size="small"
      placeholder="Search "
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      sx={{ width: 310, ml: 1 ,}}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchRounded fontSize="small" />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchApplication;
