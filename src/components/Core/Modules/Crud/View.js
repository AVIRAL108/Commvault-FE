import { ArrowBack, Delete, Warning } from "@mui/icons-material";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import history from "../../../../history";
import { getData, postData } from "../../../../redux/actions";
import DeleteDialogContent from "../../../additionals/fileServer/DeleteDialogContent";
import JobsDetails from "../../../additionals/JobsDetails";
import DialogBox from "../../../common/Feedbacks/DailogBox";

const View = (props) => {
  const { location, name, title, formFields, jobConfig, deleteConfig } = props;
  const [fileServerName, setFileServerName] = useState("");
  const [enableDelete, setEnableDelete] = useState(true);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  const data = useSelector(
    (state) => state.crud[name]["list"][location.match.params.id]
  );
  const flattenValues = _.flatten(formFields);
  const values = flattenValues.map((v) => ({ ...v, value: data[v.name] }));
  const jobsValue = useSelector((state) => state.jobs.list);
  useEffect(() => {
    dispatch(
      getData(
        jobConfig.config,
        jobConfig.method,
        jobConfig.type,
        `${jobConfig.uri}`,
        "jobs",
        { fileServerId: location.match.params.id }
      )
    );
  }, [jobConfig, dispatch, location.match.params.id]);
  const handleServerName = (e) => {
    const value = e.target.value;
    setFileServerName();
    if (value.toLowerCase() === data.name.toLowerCase()) {
      setEnableDelete(false);
    }
  };
  const handleDeleteButton = () => {
    dispatch(
      postData(
        deleteConfig.config,
        deleteConfig.method,
        deleteConfig.type,
        deleteConfig.uri,
        parseInt(location.match.params.id)
      )
    ).then(() =>
      history.push({
        pathname: `/${name}/list`,
        state: {
          openSnackbar: true,
          severity: "success",
          message: `Successfully Deleted`,
        },
      })
    );
  };
  return (
    <>
      <Grid container>
        <Grid item container xs={8} sm={8}>
          <IconButton
            size="small"
            onClick={() => history.goBack()}
            color="primary"
          >
            <ArrowBack />
          </IconButton>{" "}
          <Typography variant="h6" component="h2" color="primary">
            {title}
          </Typography>
        </Grid>
        <Grid item justifyContent="flex-end" container xs={4} sm={4}>
          <Button
            onClick={handleClickOpen}
            size="small"
            color="error"
            variant="contained"
          >
            <Delete />
          </Button>
        </Grid>
        <Typography variant="h6"> General Info</Typography>
        {_.map(values, (v) => {
          return (
            <Grid container spacing={1} key={v.label + v.value} padding="10px">
              <Grid item sx={{ fontWeight: "bold" }} xs={12} sm={6}>
                {v.label}
              </Grid>
              <Grid item xs={12} sm={6}>
                {v.value}
              </Grid>
            </Grid>
          );
        })}
        {jobsValue && jobsValue.length > 0 ? (
          <JobsDetails values={jobsValue} />
        ) : (
          <Grid container justifyContent="center">
            <Warning />
            <Typography variant="p">
              No job scheduled for the File Server
            </Typography>
          </Grid>
        )}
      </Grid>
      <DialogBox
        open={open}
        handleOk={handleDeleteButton}
        enableOk={enableDelete}
        handleClose={handleClose}
        okBtnName="Delete"
        content={
          <DeleteDialogContent
            serverName={data.name}
            onChange={handleServerName}
            value={fileServerName}
          />
        }
        title="Delete File Server"
      />
    </>
  );
};

export default View;
