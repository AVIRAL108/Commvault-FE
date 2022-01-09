import { Grid, TextField, Typography } from "@mui/material";
import React from "react";

 const  DeleteDialogContent = ({ serverName, value, onChange }) => {
  return (
    <Grid container>
      <Typography variant="p">
        Do you really want to delete this Server <span style={{ fontWeight : "bold" }}>{serverName}</span> ?
      </Typography>
      <TextField
        size="small"
        fullWidth
        placeholder="Please enter the server name to confirm"
        onChange={onChange}
        value={value}
      />
    </Grid>
  );
}
export default DeleteDialogContent