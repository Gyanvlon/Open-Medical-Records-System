import React, { useState, useEffect } from "react";
import { TextField, makeStyles, Button, Box } from "@material-ui/core/";
import MainStoreStyle from "./MainStoreStyle";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import { Link } from 'react-router-dom'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { useHistory } from "react-router-dom";
import MainStoreTab from "./MainStoreTab";
import MainStoreSubTab from "./MainStoreSubTab";
import { useDispatch, useSelector } from "react-redux";
import { addReceptToGenralStore } from "../../actions/mainStoreActions";
import { getAPI } from '../../services'

const useStyles = makeStyles(MainStoreStyle);

export default function MSRecieptsToGeneralStore() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  // API by prem
  const dispatch = useDispatch()
  const { receptToGenralStoreList } = useSelector(state => state.mainStore)

  // for fatching data for list by prem
  async function fetchData() {
    try {
      const request = await getAPI("/receiptsToStoreList/receipts");
      dispatch(addReceptToGenralStore(request?.data))
    } catch (err) {
      dispatch(addReceptToGenralStore([]))
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
          <Box className={classes.headerText} >Manage Receipt Drug</Box>
          <Button variant="contained"
            style={{ color: '#fff', marginLeft: 15 }}
            className={classes.check}
            component={Link}
            to="/app/main_store/add_receipt">
            Add Reciept
          </Button>
          <CardContent>
            <form noValidate id="searchForm">
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1%"
                }}
              >
                <Box flexGrow={0.5} className={classes.customBox}>
                  <TextField
                    id="vendor_name"
                    name="Vendor Name/(Description)"
                    label="Vendor Name/(Description)"
                    variant="outlined"
                  />
                </Box>
                <Box flexGrow={0.4} className={classes.customBox}>
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <KeyboardDatePicker
                      name="orderdate"
                      style={{ marginTop: 8 }}
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
                <Box flexGrow={0.4} className={classes.customBox} >
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <KeyboardDatePicker
                      name="orderdate"
                      style={{ marginTop: 8 }}
                      disableFuture
                      allowKeyboardControl
                      autoOk
                      inputVariant="outlined"
                      format="DD-MM-yyyy"
                      label="To date"
                      views={["year", "month", "date"]}
                    />
                  </MuiPickersUtilsProvider>
                </Box>
                <Box flexGrow={0.5} className={classes.customBox}>
                  <Button variant="contained" color="primary" size="large" className={classes.customBTN}>
                    Search
                  </Button>
                </Box>
              </div>
            </form>
          </CardContent>

          <Box style={{ fontWeight: 'bold', textTransform: 'uppercase', marginLeft: 15 }} >Receipt List</Box>

          {receptToGenralStoreList.length === 0 ? (<TableRow> <TableCell colSpan={6} >no records found</TableCell> </TableRow>)

            : <form id="formpatientdata" method="post">
              <Table aria-label="spanning table">
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Vendor Name/(Description)</TableCell>
                    <TableCell>Bill Amount</TableCell>
                    <TableCell>Receipt No</TableCell>
                    <TableCell>Created on</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {receptToGenralStoreList.map((item, index) => {
                  return  <TableRow>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell component={Link}
                      to="/app/main_store/receipt_detail">{item.companyName}</TableCell>
                    <TableCell>{item?.billAmount}</TableCell>
                    <TableCell>{item?.receiptNumber}</TableCell>
                    <TableCell>{item?.receiptDate}</TableCell>
                  </TableRow>
                  })}

                </TableBody>
              </Table>
            </form>}
        </Card>
      </div>
    </>
  );
}
