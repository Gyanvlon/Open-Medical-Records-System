import React, { useState, useEffect } from "react";
import {TextField,makeStyles,Button,Box,Checkbox} from "@material-ui/core/";
import styles from "../Styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { useHistory, Link } from "react-router-dom";
import MainStoreSubTab from "./MainStoreSubTab"
import MainStoreTab from "./MainStoreTab"

const useStyles = makeStyles(styles);
export default function MSViewStockBalanceExpiry() {
  const classes = useStyles(); 
    return (
      <>
      <MainStoreTab />
      <MainStoreSubTab />
          <div mt={2}>
            <Card >
             <Box className={classes.headerText} >View Stock Balance Expiry</Box>
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
                <FormControl style={{width:220}}>
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
                    <Box  className={classes.customBox} style={{marginLeft:15}}>
                      <TextField
                        id="drug_name"
                        name="Drug name"
                        label="Drug name"
                        variant="outlined"
                        />
                       <Button variant="contained" color="primary" size="large" className={classes.customBTN}>
                          Search
                        </Button> 
                    </Box>
                  </div>
                </form>
              </CardContent>
              <Box style={{ fontWeight: 'bold', textTransform: 'uppercase', marginLeft:15}} >View Stock Balance List</Box>
        <form id="formpatientdata" method="post">
          <Table aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Formulation</TableCell>
                <TableCell>Current QTY</TableCell>
                <TableCell>Re-Order QTY</TableCell>
                <TableCell><Checkbox /> Select All</TableCell>
                <TableCell><Button style={{backgroundColor: "red", color:"white"}} variant="contained">Delete</Button></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell component={Link} to="/app/main_store/view_stock_balance_detail" >test</TableCell>
                <TableCell>category 1</TableCell>
                <TableCell>ABC</TableCell>
                <TableCell>20</TableCell>
                <TableCell>20</TableCell>
                <TableCell><Checkbox /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2</TableCell>
                <TableCell>test</TableCell>
                <TableCell>category 2</TableCell>
                <TableCell>ABC</TableCell>
                <TableCell>20</TableCell>
                <TableCell>20</TableCell>
                <TableCell><Checkbox /></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </form>
       </Card>
      </div>    
      </>
    );
}
