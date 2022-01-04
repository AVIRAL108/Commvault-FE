import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import history from "../../../history";

export default function LabTabs({ tabs }) {
  const [value, setValue] = React.useState(tabs[0].name);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      {/* <IconButton size="small" onClick={() => history.goBack()} color="primary">
        <ArrowBack />
      </IconButton>{" "} */}
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            {tabs.map((tab, index) => {
              return <Tab label={tab.label} key={tab.name} value={tab.name} />;
            })}
          </TabList>
        </Box>
        {tabs.map((tab, index) => {
          return <TabPanel value={tab.name}>{tab.component}</TabPanel>;
        })}
      </TabContext>
    </Box>
  );
}
