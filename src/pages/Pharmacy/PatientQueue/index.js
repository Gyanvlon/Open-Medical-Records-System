import React, { useState, useEffect } from "react";
import {
  TextField,
  makeStyles,
  Button,
  Box,
  Paper,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Typography,
  useMediaQuery,
  DialogContentText,
  LinearProgress,
  Icon,
  InputAdornment,
} from "@material-ui/core/";
import { DataGrid, GridOverlay } from "@material-ui/data-grid";
import styles from "../../Styles";
import { Alert, Autocomplete } from "@material-ui/lab";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import moment from "moment";
import MomentUtils from "@date-io/moment";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
// import BillingNavbar from "../BillingNavbar";
// import VerticalTabComponent from "../VerticalTabComponent";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { useHistory } from "react-router-dom";
import PharmacyNavbar from "../PharmacyNavBar"
const useStyles = makeStyles(styles);
export default function PatientQueue() {
  const classes = useStyles(); 
    return (
      <>
      <PharmacyNavbar />
          <div mt={2}>
            <Card >
             <Box className={classes.headerText} >Patient Queue</Box>
              <CardContent>
                <form noValidate id="searchForm">
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexWrap: "wrap",
                      // justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom:"1%"
                    }}
                  >
                    <Box className={classes.customBox}>
                      <TextField
                        id="patient_id_name"
                        name="Patient Id/name"
                        label="Patient Id / name"
                        variant="outlined"
                        />
                    </Box>
                    <Box className={classes.customBox} style={{marginLeft:15}}>
                      <MuiPickersUtilsProvider utils={MomentUtils}>
                        <KeyboardDatePicker
                          name="orderdate"
                          disableFuture
                          allowKeyboardControl
                          autoOk
                          inputVariant="outlined"
                          format="DD-MM-yyyy"
                          label="Date"
                          views={["year", "month", "date"]}
                        />
                      </MuiPickersUtilsProvider>
                      <Button variant="contained" color="primary" size="large" className={classes.customBTN}>
                          Search
                        </Button>
                    </Box>
                  </div>
                </form>
              </CardContent>
              <Box style={{ fontWeight: 'bold', textTransform: 'uppercase', marginLeft:15}} >Patient Queue for Drugs Orders</Box>
        <form id="formpatientdata" method="post">
          <Table aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Bill No.</TableCell>
                <TableCell>Identifier</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Issue Date</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Voided By</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>12345</TableCell>
                <TableCell>12345</TableCell>
                <TableCell>test</TableCell>
                <TableCell>20</TableCell>
                <TableCell>20/08/2022</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2</TableCell>
                <TableCell>12345</TableCell>
                <TableCell>12345</TableCell>
                <TableCell>test</TableCell>
                <TableCell>20</TableCell>
                <TableCell>20/08/2022</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </form>
       </Card>
      </div>
          
      </>
    );
  
}
