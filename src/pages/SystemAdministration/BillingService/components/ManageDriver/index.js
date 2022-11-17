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
import Autocomplete from "@material-ui/lab/Autocomplete";
import Radio from "@material-ui/core/Radio";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { DataGrid, GridOverlay } from "@material-ui/data-grid";
import { Alert } from "@material-ui/lab";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
const useStyles = makeStyles(styles);

function ManageDriver() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("female");
  const [selectedValue, setSelectedValue] = React.useState("no");
  const [isselected, setIsselected] = React.useState(false);
  const initialFormvalue = {
    ambulanceName: "",
    descriptionambulance: "",
    phone: "",
    address: "",
    retiredstatus: selectedValue,
    driverid: "",
  };
  const [formdata, setFormdata] = React.useState(initialFormvalue);
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCommonInput = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };
  const row = [
    {
      id: 123,
      ambulancename: "ddd",
      description: "ddd",
      date: "12-10-2021",
    },
    {
      id: 124,
      ambulancename: "ddd",
      description: "ddd",
      date: "12-10-2022",
    },
  ];
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
    { field: "id", headerName: "Id", width: 130 },
    {
      field: "ambulancename",
      headerName: "Name",
      width: 250,
    },
    { field: "description", headerName: "Description", width: 250 },
    {
      field: "date",
      headerName: "Created Date",
      width: 250,
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
            >
              Edit
            </Button>
          </>
        );
      },
    },
  ];
  function onPhoneChange(value, data, event, formattedValue) {
    const { name } = event.target;
    console.log(value);
  }
  const top100Films = [{ title: "Driving License" }, { title: "Aadhaar" }];
  return (
    <>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader id="nested-list-subheader" className={classes.header}>
            Manage Driver
          </ListSubheader>
        }
        className={classes.root}
      ></List>

      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add New Driver
      </Button>
      <Card className={classes.root} style={{ marginTop: 20 }}>
        {/* <CardHeader title="List Ambulance" className={classes.header} /> */}
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader
              id="nested-list-subheader"
              className={classes.header}
            >
              List Drivers
            </ListSubheader>
          }
          className={classes.root}
        ></List>
        <CardContent>
          <Button variant="contained" color="secondary">
            Delete Selected Drivers
          </Button>
          <DataGrid
            rows={row}
            columns={columns}
            autoHeight
            checkboxSelection
            rowHeight={40}
            headerHeight={40}
            pageSize={5}
            components={{
              LoadingOverlay: CustomLoadingOverlay,
              NoRowsOverlay: CustomNoRowsOverlay,
            }}
            onSelectionModelChange={(itm) => console.log(itm)}
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
                Manage Driver
              </h4>
            </DialogTitle>
            <DialogContent>
              <div style={{ width: "100%" }}>
                <Box display="flex" flexDirection="column" p={1} m={1}>
                  <Box p={1}>
                    <TextField
                      id="ambulanceName"
                      label="Name"
                      // helperText="This field is Required"
                      variant="outlined"
                      fullWidth
                      size="small"
                      name="ambulanceName"
                      value={formdata.ambulanceName}
                      onChange={handleCommonInput}
                    />
                  </Box>
                  <Box p={1}>
                    <Autocomplete
                      id="driverid"
                      options={top100Films}
                      getOptionLabel={(option) => option.title}
                      style={{ width: "100%" }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Driver Id"
                          variant="outlined"
                          name="driverid"
                        />
                      )}
                      onChange={(e, newvalue) => {
                        if (newvalue !== null) {
                          console.log("sssssssssssssssss", newvalue);
                          setFormdata({
                            ...formdata,
                            driverid: newvalue.title,
                          });
                          setIsselected(true);
                        } else {
                          setIsselected(false);
                        }
                      }}
                      fullWidth
                    />
                    {/* <TextField
                      id="descriptionambulance"
                      label="Description"
                      helperText="This field is Required"
                      variant="outlined"
                      fullWidth
                      size="small"
                      value={formdata.descriptionambulance}
                      name="descriptionambulance"
                      onChange={handleCommonInput}
                    /> */}
                  </Box>
                  {isselected && (
                    <Box p={1}>
                      <TextField
                        id={formdata.driverid}
                        label={formdata.driverid}
                        // helperText="This field is Required"
                        variant="outlined"
                        fullWidth
                        size="small"
                        name={formdata.driverid}
                        // onChange={handleCommonInput}
                      />
                    </Box>
                  )}
                  <Box p={1}>
                    <PhoneInput
                      containerStyle={{
                        marginTop: 8,
                        // color: formErrors["Phone Number*"] ? "red" : "rgba(0, 0, 0, 0.54)",
                      }}
                      inputProps={{
                        name: "phone",
                      }}
                      countryCodeEditable={false}
                      inputStyle={{ width: "100%" }}
                      //   inputClass={formErrors["Phone Number*"] && classes.phoneField}
                      country={"in"}
                      specialLabel="Phone Number*"
                      value={formdata["phone"]}
                      onChange={onPhoneChange}
                      //   onBlur={(e, data) =>
                      //     validatePhone(e, data, formValues["Phone Number*"])
                      //   }
                      // containerClass={classes.field}
                    />
                  </Box>
                  <Box p={1}>
                    {" "}
                    <TextField
                      id="addresss"
                      label="Address"
                      // helperText="This field is Required"
                      variant="outlined"
                      fullWidth
                      size="small"
                      value={formdata.address}
                      name="address"
                      onChange={handleCommonInput}
                    />
                  </Box>
                  <Box p={1}>
                    <span htmlFor="">
                      <strong>Retired</strong>
                    </span>
                    <Radio
                      checked={selectedValue === "no"}
                      onChange={handleChange}
                      value="no"
                      name="radio-button-demo"
                      inputProps={{ "aria-label": "no" }}
                    />
                    No
                    <Radio
                      checked={selectedValue === "yes"}
                      onChange={handleChange}
                      value="yes"
                      name="radio-button-demo"
                      inputProps={{ "aria-label": "Yes" }}
                    />
                    Yes
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
    </>
  );
}

export default ManageDriver;
