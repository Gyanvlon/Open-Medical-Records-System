import React, { useState, useEffect } from "react";
import {
  TextField,
  makeStyles,
  Box,
  Paper,
  Typography,
  Icon,
  InputAdornment,
  LinearProgress,
  Button,
  Grid,
} from "@material-ui/core/";
import { Alert, Autocomplete } from "@material-ui/lab";

import moment from "moment";
import MomentUtils from "@date-io/moment";
import { getAPI, postAPI, getPatientSearch } from "../../../services";
import { PatientSearchData, TestOrderDetails } from "../../../services/data";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import BillingNavbar from "../BillingNavbar";
import VerticalTabComponent from "../VerticalTabComponent";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { useHistory } from "react-router-dom";
import ListtoOrder from "../ListtoOrder";
import { calculateAge } from "../../../utils/commons";
import searchstyle from "./styles";
import { DataGrid, GridOverlay } from "@material-ui/data-grid";

import CircularProgress from "@material-ui/core/CircularProgress";
import BillingListWalking from "./BillingListWalking";
const useStyles = makeStyles(searchstyle);

function SearchWalkingPatient() {
  const classes = useStyles();
  const [searchKey, setSearchKey] = useState("");
  const [filteredPatientList, setFilteredPatientList] = useState([]);
  const [patientsList, setPatientsList] = useState([]);
  const [showListToOrder, setShowListToOrder] = useState(false);
  const [patientData, setPatientData] = useState([]);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  //setvalue for patientname
  const [patientname, setPatientname] = React.useState("");
  //set searchbutto click
  const [searchbuttonClicked, setSearchButtonClicked] = useState(false);
  const [actualorderdate, setActualOrderdate] = React.useState(
    moment().format("DD-MM-YYYY")
  );
  const [loadercir, setLoadercir] = React.useState(false);
  const calculateAgeFunction = (dateval) => {
    const valueresult = dateval.split("-");
    const dobj = new Date(
      parseInt(valueresult[2]),
      parseInt(valueresult[1]) - 1,
      parseInt(valueresult[0])
    );
    return moment(dobj).format();
  };
  const createPatientList = (results) => {
    const patientList = results.map((result, index) => {
      //console.log(moment(result.birthDate).format());
      return {
        slno: index + 1,
        identifier: result.identifier,
        patientName: result.name,
        gender: result.gender,
        age: result.age,
        phoneno: result.person_attributes["Phone Number*"],
        id: result.uuid,
      };
    });

    return patientList;
  };
  // useEffect(() => {
  //   //console.log(moment().format("DD-MM-YYYY"));
  //   async function fetchData() {
  //     try {
  //       const request = await TestOrderDetails.TestOnlySelectDateFunc(
  //         actualorderdate
  //       );
  //       //console.log(request);
  //       const patientList = createPatientList(
  //         request.testOrderDetails,
  //         actualorderdate
  //       );
  //       setPatientsList(patientList);
  //       setFilteredPatientList(patientList);

  //       setTimeout(() => {
  //         setLoadercir(false);
  //       }, 1000);
  //     } catch (err) {
  //       return null;
  //     }
  //   }
  //   fetchData();
  // }, [actualorderdate]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchKey(value);
    setFilteredPatientList(
      getFilteredPatientList(patientsList, value.toLowerCase())
    );
  };
  const getFilteredPatientList = (parampatientsList, key) => {
    let filteredList =
      key.length >= 3
        ? parampatientsList.filter(
            (item) =>
              item.phoneno !== undefined && item.phoneno.includes(`91${key}`)
          )
        : parampatientsList;

    return filteredList;
    // if (key.length >= 3) {
    //   const newitem = patientsList.filter(
    //     (item) =>
    //       item.phoneno !== undefined && item.phoneno.includes(`91${key}`)
    //   );
    //   return newitem;
    // } else {
    //   return patientsList;
    // }
  };
  const columns = [
    { field: "slno", headerName: "Sl No.", width: 80 },
    { field: "identifier", headerName: "Patient Id", width: 120 },
    {
      field: "patientName",
      headerName: "Patient Name",
      width: 250,
    },
    {
      field: "age",
      headerName: "Age",
      width: 100,
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 120,
    },
    {
      field: "phoneno",
      headerName: "Phone No.",
      width: 180,
    },

    {
      field: "id",
      headerName: "patientUuid",
      width: 220,
      hide: true,
    },
  ];
  const handleOpen = (event) => {
    console.log(event.row);
    setShowListToOrder(true);
    setPatientData(event.row);
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
  const handleDateChange = (date, value) => {
    setActualOrderdate(value);
    setSelectedDate(date);
  };
  const handleNameChange = (e) => {
    //patientname,setPatientname
    setPatientname(e.target.value);
  };
  const handlenameSearch = () => {
    setLoadercir(true);
    setSearchButtonClicked(true);
    //searchbuttonClicked,setSearchButtonClicked
    if (searchKey.length < 3 || searchKey === "") {
      getPatientSearch("/search/patients?name=" + patientname).then(
        (response) => {
          if (response.data !== null) {
            //setPatientsList(response.data);
            const patientList = createPatientList(response.data);
            // let filteredListcheck =
            //   searchKey.length >= 3
            //     ? patientList.filter(
            //         (item) =>
            //           item.phoneno !== undefined &&
            //           item.phoneno.includes(`91${searchKey}`)
            //       )
            //     : patientList;
            setPatientsList(patientList);
            setFilteredPatientList(patientList);
            setLoadercir(false);
          } else {
            setLoadercir(false);
            setPatientsList([]);
          }
        }
      );
    }
    if (searchKey.length >= 3) {
      let filteredListcheck =
        searchKey.length >= 3
          ? patientsList.filter(
              (item) =>
                item.phoneno !== undefined &&
                item.phoneno.includes(`91${searchKey}`)
            )
          : patientsList;
      setPatientsList(filteredListcheck);
      setFilteredPatientList(filteredListcheck);
      setLoadercir(false);
    }
  };
  if (showListToOrder) {
    //return < patientData={patientData} />;
    return <BillingListWalking patientData={patientData} />;
  } else {
    return (
      <>
        <BillingNavbar />
        <VerticalTabComponent />
        <div mt={2}>
          {/* <Typography variant="h5">Search Patient Queue</Typography> */}
          <Card className={classes.root}>
            <CardHeader
              title="Search Patient System"
              className={classes.title}
              titleTypographyProps={{ variant: "body1" }}
            />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={6} sm={6}>
                  {" "}
                  <TextField
                    id="patientname"
                    name="patientname"
                    label="Name/Identifier*"
                    placeholder="Enter Name or Identifier"
                    variant="outlined"
                    value={patientname}
                    className={classes.field}
                    onChange={handleNameChange}
                    fullWidth
                    autoFocus
                    helperText={
                      patientname !== "" ? "" : "This field is required"
                    }
                  />
                </Grid>
                <Grid item xs={6} sm={2}>
                  <p></p>
                  <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    disabled={patientname !== "" ? false : true}
                    onClick={handlenameSearch}
                  >
                    Search
                  </Button>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    id="globalsearch"
                    name="globalsearch"
                    label="Phone"
                    variant="outlined"
                    className={classes.field}
                    onChange={handleChange}
                    // value={patientnameorid}
                    placeholder="Search Your Phone No."
                    type="search"
                    size="medium"
                    autoFocus
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Icon className="fas fa-search" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </div>
        {loadercir ? (
          <Box p={1} display="flex" flexDirection="row" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          searchbuttonClicked === true && (
            <Paper style={{ marginTop: 4 }}>
              <DataGrid
                rows={filteredPatientList}
                loading={loadercir}
                disableColumnMenu
                columns={columns}
                autoHeight
                rowHeight={40}
                headerHeight={40}
                pageSize={5}
                onCellClick={handleOpen}
                components={{
                  LoadingOverlay: CustomLoadingOverlay,
                  NoRowsOverlay: CustomNoRowsOverlay,
                }}
              />
            </Paper>
          )
        )}
      </>
    );
  }
}

export default SearchWalkingPatient;
