import { ArrowBack } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import history from "../../../../history";
import { postData } from "../../../../redux/actions";
import { clearError } from "../../../../redux/actions/error";
import { store } from "../../../../redux/store";
import SnackBar from "../../../common/Feedbacks/SnackBar";
import CrudForm from "../../../common/Views/CrudForm";

const Edit = (props) => {
  const { location, name, title, formFields, config } = props;
  const dispatch = useDispatch();
  const [err, setErr] = useState({ open: false, message: "" });
  const handleClose = () => {
    return setErr((prev) => ({
      ...prev,
      open: false,
    }));
  };
  const data = useSelector(
    (state) => state.crud[name]["list"][location.match.params.id]
  );
  useEffect(() => {
    return () => dispatch(clearError());
  }, [dispatch]);
  const onSubmit = (values) => {
    dispatch(
      postData(
        config.config,
        config.method,
        config.type,
        config.uri,
        parseInt(location.match.params.id),
        values
      )
    ).then(() => {
      const error = store.getState().error;
      if (error?.message) {
        return setErr((prev) => ({
          ...prev,
          open: true,
          message: error.message,
        }));
      } else {
        return history.push({
          pathname: `/${name}/list`,
          state: {
            openSnackbar: true,
            severity: "success",
            message: `Successfully Updated`,
          },
        });
      }
    });
  };
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);
  return (
    <div>
      <Typography sx={{ pb: 3 }} component="h2" variant="h5" align="left">
        <IconButton
          size="small"
          onClick={() => history.goBack()}
          color="primary"
        >
          <ArrowBack />
        </IconButton>{" "}
        {`${title} Form`}
      </Typography>
      <CrudForm
        values={data}
        formFields={formFields}
        edit={true}
        create={config}
        onSubmit={onSubmit}
      />
      <SnackBar
        handleClose={handleClose}
        severity="error"
        time={7000}
        open={err.open}
        message={err.message}
      />
    </div>
  );
};
export default Edit;
