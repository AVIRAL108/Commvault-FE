import { FilterList, RotateLeft, SignalWifi0Bar } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import _ from "lodash";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { getResetValue } from "../../../utils.js";

let FilterForm = ({ onSubmit, formFields, values, onReset }) => {
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  useEffect(() => {
      if(values) { 
        const s = _.flatten(formFields);
        s.forEach((field) =>  setValue(field.name,  values[field.name] ));
      }
  }, [setValue, formFields, values])
const s  =   getResetValue(formFields);
console.log(s)
  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <Grid container sx={{ width :  300 }} spacing={1}>
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
                        />
                      )}
                    />
                  </Grid>
                );
              })
            ) : (
              <Grid key={v.name} item >
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
                      options={v.options}
                      multiline={v.multiline}
                      label={v.label}
                      errors={errors}
                      field={field}
                    />
                  )}
                />
              </Grid>
            );
          })}

          <Grid container justifyContent="flex-end" item xs={12}>
          <Button
              type="button"
              color="secondary"
              onClick={() =>   { 
                onReset();
                reset(s);
              }}
              endIcon={<RotateLeft />}
            >
              {" "}
              Reset{" "}
            </Button>
            <Button
              type="submit"
              endIcon={<FilterList />}
            >
              {" "}
              Filter{" "}
            </Button>
     
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default FilterForm;
