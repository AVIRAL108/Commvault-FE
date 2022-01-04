import { Send } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import _ from "lodash";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { fileAdd } from "../../../redux/actions/fileupload";

let CrudForm = ({ onSubmit, formFields, edit, values }) => {
  const dispatch =  useDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  useEffect(() => {
    if (edit) {
      const s = _.flatten(formFields);
      s.forEach((field) =>  field.type !== "file" ? setValue(field.name,  values[field.name] ) : undefined );
       const files = s.filter((item) =>  item.type === "file");
       const fileObj  = {}
       files.forEach((file) => Object.assign( fileObj ,  { [file.name] : values[file.name] } ) );
       dispatch(fileAdd(fileObj))
    }
  }, [values, formFields, setValue, edit, dispatch]);
  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <Grid container spacing={3}>
          {_.map(formFields, (v) => {
            return Array.isArray(v) ? (
              _.map(v, (p) => {
                return (
                  <Grid key={p.name} item xs={12} sm={12 / _.size(v)}>
                    <Controller
                      name={p.name}
                      defaultValue={p.defaultValue}
                      control={control}
                      rules={p.rules}
                      render={({ field }) => (
                        <p.component
                          variant={p.variant}
                          type={p.type}
                          label={p.label}
                          rows={p.rows}
                          multiline={p.multiline}
                          options={p.options}
                          errors={errors}
                          field={field}
                          lotties = { p.lottie }
                        />
                      )}
                    />
                  </Grid>
                );
              })
            ) : (
              <Grid key={v.name} item xs={12}>
                <Controller
                  name={v.name}
                  defaultValue={v.defaultValue}
                  control={control}
                  rules={v.rules}
                  render={({ field }) => (
                    <v.component
                      variant={v.variant}
                      type={v.type}
                      rows={v.rows}
                      multiline={v.multiline}
                      label={v.label}
                      errors={errors}
                      field={field}
                      lotties= { v.lottie }

                    />
                  )}
                />
              </Grid>
            );
          })}

          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              endIcon={<Send />}
            >
              {" "}
              SUBMIT{" "}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default CrudForm;
