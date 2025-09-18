// AddApplicationButton.jsx

import React from "react";
import { Button } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

const AddApplicationButton = () => {
  return (
    <Button
  variant="outlined"
  startIcon={<AddRoundedIcon />}
  sx={{
    textTransform: "none",
    height: 40,           // match TextField small size
    ml: 1,                // optional spacing to match search
  }}
>
  Add Application
</Button>

  );
};

export default AddApplicationButton;
