import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

function BasicDatePicker(props) {
  const { label, field, error } = props;
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        {...field}
        label={label}
        error
        renderInput={(params) => <TextField fullWidth  helperText="Hello"  {...params} />}
      />
    </LocalizationProvider>
  );
}
export default BasicDatePicker;
