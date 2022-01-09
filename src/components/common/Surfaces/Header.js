import { AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";

export default function Header() {
  return (
    <AppBar
      position="absolute"
      color="secondary"
      elevation={0}
      sx={{
        position: "relative",
        borderBottom: (t) => `1px solid ${t.palette.divider}`,
      }}
    >
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap>
          CommVault
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
