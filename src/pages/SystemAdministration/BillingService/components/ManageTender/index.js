import React from "react";
import {
  makeStyles,
  List,
  ListSubheader,
  LinearProgress,
  Box,
  TextField,
} from "@material-ui/core/";
import styles from "../../styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

import Radio from "@material-ui/core/Radio";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { DataGrid, GridOverlay } from "@material-ui/data-grid";
import { postAPI, getAPI, putAPI } from "../../../../../services";
import { Alert } from "@material-ui/lab";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import { useEffect } from "react";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
const useStyles = makeStyles(styles);

function ManageTender() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("female");
  const [selectedValue, setSelectedValue] = React.useState("no");
  const [resulttabledata, setResulttabledata] = React.useState([]);
  const [deletelist, setDeletelist] = React.useState([]);
  const [openedit, setOpenedit] = React.useState(false);
  const history = useHistory();
  const initialFormvalue = {
    ambulanceName: "",
    descriptionambulance: "",
    retiredstatus: selectedValue,
    uuid: "",
    numberfield: "",
    pricefield: "",
    openingdate: null,
    closingdate: null,
  };
  const [formdata, setFormdata] = React.useState(initialFormvalue);
  const [editformData, setEditformdata] = React.useState(initialFormvalue);
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseedit = () => {
    setOpenedit(false);
  };
  const handleCommonInput = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };
  const handleCommonInputedit = (e) => {
    setEditformdata({ ...editformData, [e.target.name]: e.target.value });
  };

  const CustomLoadingOverlay = () => {
    return (
      <GridOverlay>
        <div style={{ position: "absolute", top: 0, width: "100%" }}>
          <LinearProgress />
        </div>
      </GridOverlay>
    );
  };
  const CustomNoRowsOverlay = () => {
    return (
      <GridOverlay>
        <Alert severity="info">
          <strong>No records found.</strong>
        </Alert>
      </GridOverlay>
    );
  };
  const columns = [
    // { field: "id", headerName: "Sl No.", width: 130 },
    { field: "id", headerName: "id", width: 130 },
    {
      field: "ambulancename",
      headerName: "Name",
      width: 250,
    },
    { field: "description", headerName: "Description", width: 250 },
    {
      field: "date",
      headerName: "Created Date",
      width: 200,
    },
    {
      field: "uuid",
      headerName: "uuid",
      width: 250,
      hide: true,
    },
    {
      field: "retired",
      headerName: "retired",
      width: 250,
      hide: true,
    },
    {
      field: "checkin",
      headerName: "Action",
      type: "string",
      width: 250,
      renderCell: (cellValues) => {
        return (
          <>
            <Button
              variant="outlined"
              color="primary"
              style={{ marginRight: 4 }}
              onClick={(e) => handleCellClick(cellValues.row)}
            >
              Edit
            </Button>
          </>
        );
      },
    },
  ];
  const handleonSubmit = async (e) => {
    const datatosend = {
      name: formdata.ambulanceName,
      description: formdata.descriptionambulance,
      retired: formdata.retiredstatus === "no" ? "false" : "true",
    };
    try {
      const response = await postAPI("/ambulance/addAmbulance", datatosend);
      swal({
        title: "Thank You",
        text: "Item Removed Successfully",
        icon: "success",
      }).then((value) => {
        window.location.reload();
      });
    } catch (e) {
      console.log(e);
    }
  };
  const createdtalist = (paramlist) => {
    const listnew = paramlist.map((item, index) => {
      return {
        id: item.ambulanceId,
        ambulancename: item.name,
        description: item.description,
        date: item.createdDate,
        uuid: item.uuid,
        retired: item.retired,
      };
    });
    return listnew;
  };
  useEffect(() => {
    const getAmbulancedata = async () => {
      const datatofech = await getAPI("/ambulance/allAmbulance");
      console.log(datatofech.data);
      const responsetlist = createdtalist(datatofech.data);
      setResulttabledata(responsetlist);
    };
    getAmbulancedata();
  }, []);

  const handleDelete = async (e) => {
    console.log(deletelist);
    if (deletelist.length === 0) {
      alert("Please select items from list");
    } else {
      const datatosend = deletelist;
      try {
        const response = await putAPI("/ambulance/editAmbulance", datatosend);
        swal({
          title: "Thank You",
          text: "Item Removed Successfully",
          icon: "success",
        }).then((value) => {
          window.location.reload();
        });
      } catch (e) {
        console.log(e);
      }
    }
  };
  const handleCellClick = (param) => {
    console.log(param);

    const { ambulancename, description, retired, uuid } = param;
    setEditformdata({
      ...editformData,
      ambulanceName: ambulancename,
      descriptionambulance: description,
      retired: "false",
      uuid: uuid,
    });
    setOpenedit(true);
    // setOpen(true);
  };
  const handleDateChange = (date, value) => {
    setFormdata({ ...formdata, openingdate: date });
  };
  const handleDateChangeClosing = (date, value) => {
    setFormdata({ ...formdata, closingdate: date });
  };
  const handleonEdit = async (e, uuid) => {
    const datatosend = {
      name: editformData.ambulanceName,
      description: editformData.descriptionambulance,
      retired: "false",
      uuid: uuid,
    };
    try {
      const response = await putAPI("/ambulance/editAmbulance", datatosend);
      swal({
        title: "Thank You",
        text: "Item Edited Successfully",
        icon: "success",
      }).then((value) => {
        window.location.reload();
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader id="nested-list-subheader" className={classes.header}>
            Manage Tender
          </ListSubheader>
        }
        className={classes.root}
      ></List>

      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add New Tender
      </Button>
      <Card className={classes.root} style={{ marginTop: 20 }}>
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader
              id="nested-list-subheader"
              className={classes.header}
            >
              List Tenders
            </ListSubheader>
          }
          className={classes.root}
        ></List>
        <CardContent>
          <Button variant="contained" color="secondary" onClick={handleDelete}>
            Delete Selected Tenders
          </Button>
          <DataGrid
            rows={resulttabledata}
            columns={columns}
            autoHeight
            checkboxSelection
            rowHeight={40}
            headerHeight={40}
            pageSize={10}
            components={{
              LoadingOverlay: CustomLoadingOverlay,
              NoRowsOverlay: CustomNoRowsOverlay,
            }}
            disableSelectionOnClick="true"
            onSelectionModelChange={(item) => {
              const selectedIDs = new Set(item.selectionModel);
              console.log(selectedIDs);
              const selectedRowData = resulttabledata.filter((row) =>
                selectedIDs.has(row.id)
              );

              const newfilterdata = selectedRowData.map((item) => {
                return {
                  ambulancename: item.ambulancename,
                  description: item.description,
                  retired: "false",
                  uuid: item.uuid,
                };
              });
              setDeletelist(newfilterdata);
            }}
            //onCellClick={handleCellClick}
          />
        </CardContent>
      </Card>
      {open && (
        <form>
          <Dialog
            maxWidth="sm"
            open={open}
            fullWidth
            onClose={handleClose}
            // fullScreen
            aria-labelledby="max-width-dialog-title"
          >
            <DialogTitle
              id="max-width-dialog-title"
              style={{ padding: "5px 24px" }}
            >
              <h4 style={{ textAlign: "center", paddingTop: 2 }}>
                Manage Tender
              </h4>
            </DialogTitle>
            <DialogContent>
              <div style={{ width: "100%" }}>
                <Box display="flex" flexDirection="column" p={1} m={1}>
                  <Box p={1}>
                    <TextField
                      id="numberfield"
                      label="Number"
                      variant="outlined"
                      fullWidth
                      size="small"
                      name="numberfield"
                      type="number"
                      value={formdata.numberfield}
                      onChange={handleCommonInput}
                    />
                  </Box>
                  <Box p={1}>
                    <TextField
                      id="ambulanceName"
                      label="Name"
                      variant="outlined"
                      fullWidth
                      size="small"
                      name="ambulanceName"
                      value={formdata.ambulanceName}
                      onChange={handleCommonInput}
                    />
                  </Box>
                  <Box p={1}>
                    {" "}
                    <TextField
                      id="descriptionambulance"
                      label="Description"
                      variant="outlined"
                      fullWidth
                      size="small"
                      value={formdata.descriptionambulance}
                      name="descriptionambulance"
                      onChange={handleCommonInput}
                    />
                  </Box>
                  <Box p={1}>
                    <TextField
                      id="pricefield"
                      label="Price"
                      variant="outlined"
                      fullWidth
                      size="small"
                      name="pricefield"
                      type="number"
                      value={formdata.pricefield}
                      onChange={handleCommonInput}
                    />
                  </Box>
                  <Box p={1}>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <KeyboardDatePicker
                        fullWidth
                        name="openingdate"
                        style={{ marginTop: 8 }}
                        allowKeyboardControl
                        autoOk
                        inputVariant="outlined"
                        openTo="date"
                        format="DD/MM/yyyy"
                        label="Opening Date"
                        views={["year", "month", "date"]}
                        value={formdata["openingdate"]}
                        onChange={handleDateChange}
                        // className={classes.field}
                      />
                    </MuiPickersUtilsProvider>
                  </Box>
                  <Box p={1}>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <KeyboardDatePicker
                        fullWidth
                        name="closingdate"
                        style={{ marginTop: 8 }}
                        allowKeyboardControl
                        autoOk
                        inputVariant="outlined"
                        openTo="date"
                        format="DD/MM/yyyy"
                        label="Closing Date"
                        views={["year", "month", "date"]}
                        value={formdata["closingdate"]}
                        onChange={handleDateChangeClosing}
                        // className={classes.field}
                      />
                    </MuiPickersUtilsProvider>
                  </Box>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="center"
                  p={1}
                  m={1}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginRight: 2 }}
                    onClick={handleonSubmit}
                  >
                    Save
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                </Box>
              </div>
            </DialogContent>
          </Dialog>
        </form>
      )}
      {openedit && (
        <form>
          <Dialog
            maxWidth="sm"
            open={openedit}
            fullWidth
            onClose={handleCloseedit}
            // fullScreen
            aria-labelledby="max-width-dialog-title-2"
          >
            <DialogTitle
              id="max-width-dialog-title-2"
              style={{ padding: "5px 24px" }}
            >
              <h4 style={{ textAlign: "center", paddingTop: 2 }}>
                Edit Details
              </h4>
            </DialogTitle>
            <DialogContent>
              <div style={{ width: "100%" }}>
                <Box display="flex" flexDirection="column" p={1} m={1}>
                  <Box p={1}>
                    <TextField
                      id="ambulanceName"
                      label="Name"
                      helperText="This field is Required"
                      variant="outlined"
                      fullWidth
                      size="small"
                      name="ambulanceName"
                      value={editformData.ambulanceName}
                      onChange={handleCommonInputedit}
                    />
                  </Box>
                  <Box p={1}>
                    {" "}
                    <TextField
                      id="descriptionambulance"
                      label="Description"
                      helperText="This field is Required"
                      variant="outlined"
                      fullWidth
                      size="small"
                      value={editformData.descriptionambulance}
                      name="descriptionambulance"
                      onChange={handleCommonInputedit}
                    />
                  </Box>
                  <Box p={1}></Box>
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="center"
                  p={1}
                  m={1}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginRight: 2 }}
                    onClick={(e) => handleonEdit(e, editformData.uuid)}
                  >
                    Save
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleCloseedit}
                  >
                    Cancel
                  </Button>
                </Box>
              </div>
            </DialogContent>
          </Dialog>
        </form>
      )}
    </>
  );
}

export default ManageTender;
