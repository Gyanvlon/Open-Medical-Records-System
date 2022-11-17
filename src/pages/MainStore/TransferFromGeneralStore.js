import React, { useState, useEffect } from "react";
import {TextField,makeStyles,Button,Box,} from "@material-ui/core/";
import styles from "../Styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { useHistory, Link } from "react-router-dom";
import MainStoreSubTab from "./MainStoreSubTab"
import MainStoreTab from "./MainStoreTab"
import InputLabel from '@mui/material/InputLabel';
import MomentUtils from "@date-io/moment";
import {MuiPickersUtilsProvider, KeyboardDatePicker} from "@material-ui/pickers";

const useStyles = makeStyles(styles);
export default function MSTransferFromGeneralStore() {
  const classes = useStyles(); 
    return (
      <>
      <MainStoreTab />
      <MainStoreSubTab />
          <div mt={2}>
            <Card >
             <Box className={classes.headerText} >View Stock Balance</Box>
              <CardContent>
                <form noValidate id="searchForm">
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom:"1%"
                    }}
                  >
                    <FormControl>      
                     <InputLabel id="demo-simple-select-label" >Store</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Category"
                        style={{ width:170}}
                    >
                        <MenuItem value={10}>category 1</MenuItem>
                        <MenuItem value={20}>category 2</MenuItem>
                        <MenuItem value={30}>category 3</MenuItem>
                     </Select>
                   </FormControl>
                   <FormControl>
                     <InputLabel id="demo-simple-select-label">Status Indent</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Category"
                        style={{ width:170}}
                    >
                        <MenuItem value={10}>category 1</MenuItem>
                        <MenuItem value={20}>category 2</MenuItem>
                        <MenuItem value={30}>category 3</MenuItem>
                     </Select>
                   </FormControl>
                      <TextField
                        id="name"
                        name="Name"
                        label="Name"
                        variant="outlined"
                        style={{ width:170}}
                        />
                      <MuiPickersUtilsProvider utils={MomentUtils}>
                        <KeyboardDatePicker
                          name="orderdate"
                          style={{ marginTop: 8, width:170}}
                          disableFuture
                          allowKeyboardControl
                          autoOk
                          inputVariant="outlined"
                          format="DD-MM-yyyy"
                          label="From date"
                          views={["year", "month", "date"]}
                        />
                      </MuiPickersUtilsProvider>
                      <MuiPickersUtilsProvider utils={MomentUtils}>
                        <KeyboardDatePicker
                          name="orderdate"
                          style={{ marginTop: 8, width:170}}
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
                  </div>
                </form>
              </CardContent>
              <Box style={{ fontWeight: 'bold', textTransform: 'uppercase', marginLeft:15}} >View Stock Balance List</Box>
        <form id="formpatientdata" method="post">
          <Table aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>From Store</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Created on</TableCell>
                <TableCell>Status Indent</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>1</TableCell>
                <TableCell component={Link} to="/app/main_store/drug_indent_detail">test</TableCell>
                <TableCell>ABC</TableCell>
                <TableCell>20</TableCell>
                <TableCell></TableCell>

              </TableRow>
              <TableRow>
                <TableCell>2</TableCell>
                <TableCell>2</TableCell>
                <TableCell>test</TableCell>
                <TableCell>ABC</TableCell>
                <TableCell>20</TableCell>
                <TableCell component={Link} to="/app/main_store/indent_process">Process Indent</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </form>
       </Card>
      </div>    
      </>
    );
}
