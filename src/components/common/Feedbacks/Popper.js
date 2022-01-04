import * as React from "react";
import Popover from "@mui/material/Popover";
import { IconButton } from "@mui/material";
import { FilterAlt } from "@mui/icons-material";
import { Box } from "@mui/system";
import FilterForm from "../Views/FilterForm";

export default function BasicPopover({ filters, onSubmit, values , onReset}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <IconButton aria-describedby={id} onClick={handleClick}>
        <FilterAlt />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        
        }}
      >
        <Box sx={{m : 2}}>
        <FilterForm onReset={onReset}  onSubmit={onSubmit} values={values} formFields={filters} />
        </Box> 
      </Popover>
    </div>
  );
}
