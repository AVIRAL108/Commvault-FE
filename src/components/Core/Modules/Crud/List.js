import { Add } from "@mui/icons-material";
import { Button, Typography, Grid } from "@mui/material";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../../../redux/actions";
import history from "../../../../history";
import SnackBar from "../../../common/Feedbacks/SnackBar";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/system";

const List = ({ name, columns, list, title, filters }) => {
  const dispatch = useDispatch();
  const routerState = history.location.state;
  const routerStateOpen = routerState?.openSnackbar;
  const [err, setErr] = useState({ open: false });
  const routerStateMessage = routerState?.message;
  const routerStateSeverity = routerState?.severity;
  const values = useSelector((state) => state["crud"][name]);
  const [open, setOpen] = useState(routerStateOpen);
  const [data, setData] = useState({
    loading: true,
    rows: [],
    totalRows: 0,
    rowsPerPageOptions: [5, 10, 15],
    pageSize: 5,
    page: 1,
  });
  const handleClose = () => {
    setErr((prev) => ({
      ...prev,
      open: false,
    }));
    return setOpen(false);
  };
  const updateData = (k, v) => setData((prev) => ({ ...prev, [k]: v }));
  useEffect(() => {
    dispatch(
      getData(
        list.config,
        list.method,
        list.type,
        `${list.uri}?&_start=${
            _.values(values?.rowCount) - data.pageSize <=
            (data.page - 1) * data.pageSize
              ? (data.page - 1) * data.pageSize
              : _.values(values?.rowCount) - data.pageSize
           }&_end=${data.pageSize * data.page}`,
        name
      )
    )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    data.page,
    data.pageSize,
    dispatch,
    name,
  ]);
  useEffect(() => {
    updateData("loading", true);

    setTimeout(() => {
      setData((d) => ({
        ...d,
        rowCount: values?.rowCount,
        rows: _.values(values?.list),
        loading: false,
      }));
    }, 400);

    window.history.replaceState(`/${name}`, {});
  }, [name, data.page, data.pageSize, values]);
   return <>  <Grid container>
        <Grid item container xs={7}>
          <Typography variant="h6" component="h2" color="primary">
            {title}
          </Typography>
        </Grid>
        <Grid item container justifyContent="flex-end" xs={5}>
  
          <Button
            variant="contained"
            color="secondary"
            startIcon={<Add />}
            onClick={() => history.push(`/${name}/create`)}
          >
            Create
          </Button>
        </Grid>
      </Grid>

      <Box p={1} sx={{ height: "450px" }}>
        <DataGrid
          rowHeight={50}
          pagination
          paginationMode="server"
          loading={data.loading}
          rowCount={data.rowCount}
          disableColumnFilter
          disableColumnSelector
          rowsPerPageOptions={data.rowsPerPageOptions}
          page={data.page - 1}
          pageSize={data.pageSize}
          rows={data.rows}
          columns={columns}
          onPageChange={(data) => {
            updateData("page", data + 1);
          }}
          onPageSizeChange={(data) => {
            updateData("page", 1);
            updateData("pageSize", data);
          }}
        />
      </Box>
      <SnackBar
        open={open || err.open}
        handleClose={handleClose}
        message={routerStateMessage || err.message}
        severity={routerStateSeverity || "error"}
        time={6000}
      />
      </>
}

export default List;
