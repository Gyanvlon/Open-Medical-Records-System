import React, { useState, useEffect } from "react";
import { TextField, makeStyles, Button, Box, Checkbox } from "@material-ui/core/";
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
import { useDispatch, useSelector } from "react-redux";
import { getAPI } from "../../services";
import { addViewStockBalanceExpiry } from "../../actions/mainStoreActions";

const useStyles = makeStyles(styles);
export default function MSViewStockBalanceExpiry() {
  const classes = useStyles();
  const [filter, setFilter]= useState({
    category:'',
    drug_name:''
  })

  //  for search filter 
  const searchFilter=(name, value)=>{
    setFilter({...filter, [name]:value})
  }

  // for redux perpose
  const dispatch = useDispatch()
  const { viewStockBalanceExpiry } = useSelector(state => state.mainStore)

  // for fatching data for list by prem
  async function fetchData() {
    try {
      const request = await getAPI("/viewStockBalanceExpiry/drug");
      dispatch(addViewStockBalanceExpiry(request?.data))
    } catch (err) {
      dispatch(addViewStockBalanceExpiry([]))
      return null;
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

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
                  marginBottom: "1%"
                }}
              >
                <FormControl style={{ width: 220 }}>
                  <InputLabel id="demo-simple-select-label">Category</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Category"
                  >
                  {viewStockBalanceExpiry.map((item, index) => {
                    <MenuItem keys={item.id} value={item.id} onClick={(e)=>searchFilter('category',e.target.value)}>{item?.category}</MenuItem>
                  })}

                  </Select>
                </FormControl>
                <Box className={classes.customBox} style={{ marginLeft: 15 }}>
                  <TextField
                    id="drug_name"
                    name="drug_name"
                    label="Drug name"
                    variant="outlined"
                    onChange={(e)=>searchFilter('drug_name',e.target.value)}

                  />
                  <Button variant="contained" color="primary" size="large" className={classes.customBTN}>
                    Search
                  </Button>
                </Box>
              </div>
            </form>
          </CardContent>
          <Box style={{ fontWeight: 'bold', textTransform: 'uppercase', marginLeft: 15 }} >View Stock Balance List</Box>

          {viewStockBalanceExpiry.length === 0 ? (<TableRow> <TableCell colSpan={6} >no records found</TableCell> </TableRow>)

            : <form id="formpatientdata" method="post">
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
                    <TableCell><Button style={{ backgroundColor: "red", color: "white" }} variant="contained">Delete</Button></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {viewStockBalanceExpiry.map((item, index) => {
                    < TableRow keys={item.id}>
                      <TableCell>{index+1}</TableCell>
                      <TableCell component={Link} to="/app/main_store/view_stock_balance_detail" >{item?.test}</TableCell>
                      <TableCell>{item?.category}</TableCell>
                      <TableCell>ABC</TableCell>
                      <TableCell>20</TableCell>
                      <TableCell>20</TableCell>
                      <TableCell><Checkbox /></TableCell>
                    </TableRow>
                  })}

                  {/* <TableRow>
                  <TableCell>2</TableCell>
                  <TableCell>test</TableCell>
                  <TableCell>category 2</TableCell>
                  <TableCell>ABC</TableCell>
                  <TableCell>20</TableCell>
                  <TableCell>20</TableCell>
                  <TableCell><Checkbox /></TableCell>
                </TableRow> */}
                </TableBody>
              </Table>
            </form>}
        </Card>
      </div>
    </>
  );
}
