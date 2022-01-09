import React, { useEffect, useState } from "react";
import { IconButton, Typography } from "@mui/material";
import CrudForm from "../../../common/Views/CrudForm";
import { ArrowBack } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { postData } from "../../../../redux/actions";
import history from "../../../../history";
import { store } from "../../../../redux/store";
import SnackBar from "../../../common/Feedbacks/SnackBar";
import { clearError } from "../../../../redux/actions/error";

export default function Create({ name, title, config, formFields }) {
  const dispatch = useDispatch();
  const [ err, setErr ] =  useState({  open : false ,  message : ""});
  const handleClose  = () => { 
    return setErr((prev) => ({
      ...prev,
      open :  false
    }))
}
  const onSubmit = (data) => {
    dispatch(
      postData(
        config.config,
        config.method,
        config.type,
        config.uri,
        null,
        data
      )
    ).then(() => {
      const error  =  store.getState().error;
      if(error?.message) { 
      return  setErr((prev) => ({ 
          ...prev,
          open  :  true,
          message :  error.message
        }))
      }
      else { 
      return history.push({
        pathname: `/${name}/list`,
        state: {
          openSnackbar: true,
          severity: "success",
          message: `Successfully created`,
        },
      });
    }
    })
    .catch((err) =>   { throw err } )
    ;
  };
  useEffect(() => { 
    return  () =>  {
      dispatch(clearError());
    }
  
   
   }, [dispatch])
  return (
    <>
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
      <CrudForm formFields={formFields}  config={config} onSubmit={onSubmit} />
      <SnackBar handleClose={handleClose} severity="error" time={7000} open={err.open} message={err.message} />

    </>
  );
}
