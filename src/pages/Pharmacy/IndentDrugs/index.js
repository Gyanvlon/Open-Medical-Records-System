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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
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
export default function IndentDrugs() {
  const classes = useStyles(); 
    return (
      <>
      <PharmacyNavbar />
          <div mt={2}>
            <Card >
             <Box className={classes.headerText} >Indent Drugs</Box>
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
                  <FormControl style={{width:150}}>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Category"
                    >
                        <MenuItem value={10}>category 1</MenuItem>
                        <MenuItem value={20}>category 2</MenuItem>
                        <MenuItem value={30}>category 3</MenuItem>
                     </Select>
                   </FormControl>
                    <Box style={{width:150, marginLeft:15}} className={classes.customBox} >
                      <TextField
                        id="name"
                        name="name"
                        label="name"
                        variant="outlined"
                        />
                    </Box>
                    <Box  className={classes.customBox} style={{marginLeft:15, width:180}}>
                      <MuiPickersUtilsProvider utils={MomentUtils}>
                        <KeyboardDatePicker
                          name="orderdate"
                          disableFuture
                          allowKeyboardControl
                          autoOk
                          inputVariant="outlined"
                          format="DD-MM-yyyy"
                          label="From date"
                          views={["year", "month", "date"]}
                        />
                      </MuiPickersUtilsProvider>
                    </Box>
                    <Box className={classes.customBox} style={{marginLeft:15}} >
                      <MuiPickersUtilsProvider utils={MomentUtils}>
                        <KeyboardDatePicker
                          name="orderdate"
                          disableFuture
                          allowKeyboardControl
                          autoOk
                          inputVariant="outlined"
                          format="DD-MM-yyyy"
                          label="To date"
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
              <Box style={{ fontWeight: 'bold', textTransform: 'uppercase', marginLeft:15}} >Indent Drugs List</Box>
        <form id="formpatientdata" method="post">
          <Table aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Created on</TableCell>
                <TableCell>Indent Status</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>ABC</TableCell>
                <TableCell>20/08/2022</TableCell>
                <TableCell>Done</TableCell>
                <TableCell>Process Indent</TableCell>
              </TableRow>
              <TableRow>
              <TableCell>2</TableCell>
                <TableCell>ABC</TableCell>
                <TableCell>20/08/2022</TableCell>
                <TableCell>Done</TableCell>
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
