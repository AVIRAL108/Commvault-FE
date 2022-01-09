import { Grid, Typography } from "@mui/material";
import _ from "lodash";
import { jobBackupDetails, JobsDetailTableColumns } from "../../constants/menu/fileServer";
import BasicTable from "../common/Views/BasicTable";

const JobsDetails = ({ values }) => {
  return (
    <Grid container>
      <Typography variant="h6"> Backup Details </Typography>
        { 
          _.map( jobBackupDetails,  (v) => {
          return  <Grid container spacing={1} key={v.label} padding="10px">
            <Grid item sx={{ fontWeight: "bold" }} xs={12} sm={6}>
              {v.label}
            </Grid>
            <Grid item  xs={12} sm={6}>
              {v.function(values)}
            </Grid>
          </Grid>
          })
        }
      <Typography variant="h6"> Jobs Details </Typography>
       <BasicTable rows={values} columns={JobsDetailTableColumns} />
    </Grid>
  );
};
export default JobsDetails;
