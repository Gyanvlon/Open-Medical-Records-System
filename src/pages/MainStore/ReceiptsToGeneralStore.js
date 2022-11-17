import React, { useState, useEffect } from "react";
import {TextField,makeStyles,Button,Box, TablePagination} from "@material-ui/core/";
import MainStoreStyle from "./MainStoreStyle";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import { Link } from 'react-router-dom'
import {MuiPickersUtilsProvider, KeyboardDatePicker} from "@material-ui/pickers";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { useHistory } from "react-router-dom";
import MainStoreTab from "./MainStoreTab";
import MainStoreSubTab from "./MainStoreSubTab";
import { useSelector, useDispatch } from 'react-redux'

const useStyles = makeStyles(MainStoreStyle);
export default function MSRecieptsToGeneralStore() {
  const classes = useStyles(); 
  const [open, setOpen] = React.useState(false);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [CbId, setCbId] = React.useState([]);
  const categoryList = useSelector(state => state.inventory.categoryList)
  const [rows, setRows] = React.useState(categoryList);
  const [searched, setSearched] = useState("");
  const [isSearched, setIsSearched] = useState(false);
  const recieptList = useSelector(state => state.mainStore.recieptList)
  console.log('redeeeee',recieptList)
  const seachTableContent = () => {
  const filteredRows = recieptList.filter((row) => {
        return row.name.toLowerCase().includes(searched.toLowerCase());
      });
      setIsSearched(true)
      setRows(filteredRows);
    };
    const handleSearch=(event)=>{
      setSearched(event.target.value)
    }
    const handleChangePage = ( event, newPage) => {
      setPage(newPage);
    };
    const handleChangeRowsPerPage = ( event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
    function descendingComparator(a, b, orderBy) {
      if (b[orderBy] < a[orderBy]) {
        return -1;
      }
      if (b[orderBy] > a[orderBy]) {
        return 1;
      }
      return 0;
    }
    
    function getComparator(order, orderBy) {
      return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
    }
     function stableSort(array, comparator) {
      const stabilizedThis = array.map((el, index) => [el, index]);
      stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
        if (order !== 0) {
          return order;
        }
        return a[1] - b[1];
      });
      return stabilizedThis.map((el) => el[0]);
    }
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    return (
      <>
      <MainStoreTab />
      <MainStoreSubTab />
          <div mt={2}>
            <Card >
             <Box className={classes.headerText} >Manage Receipt Drug</Box>
              <Button variant="contained"
                style={{color: '#fff', marginLeft:15}}
                className={classes.check}
                component={Link}
                to="/app/main_store/add_receipt">
               Add Receipt
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
                      marginBottom:"1%"
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
              <Box style={{ fontWeight: 'bold', textTransform: 'uppercase', marginLeft:15}} >Receipt List</Box>
        <form id="formpatientdata" method="post">
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
               {stableSort(isSearched ? rows : recieptList, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((element, i)=>
                <TableRow>
                <TableCell>{i+1}</TableCell>
                <TableCell component={Link}
                 to={`/app/main_store/receipt_detail?vendorName=${element.companyName}&receiptNumber=${element.receiptNumber}`}>{element.companyName}</TableCell>
                <TableCell>{element.billAmount}</TableCell>
                <TableCell>{element.receiptNumber}</TableCell>
                <TableCell>{element.receiptDate}</TableCell>
              </TableRow>
                )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={recieptList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </form>
       </Card>
      </div>    
      </>
    );
}
