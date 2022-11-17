import React, { useState, useEffect } from "react";
import {TextField,makeStyles,Button,Box,Checkbox,TablePagination} from "@material-ui/core/";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Link } from 'react-router-dom' 
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Card from "@material-ui/core/Card";
import swal from "sweetalert";
import { useSelector, useDispatch } from 'react-redux'
import CardContent from "@material-ui/core/CardContent";
import InventoryNavbar from "../InventoryNavBar"
import styles from "../../../Styles";
import ItemSubTab from "../ItemSubTab"
const useStyles = makeStyles(styles);
export default function ManageItem() {
  const classes = useStyles(); 
  const [page, setPage] = React.useState(2);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const isItemDelete = useSelector(state => state.inventory.isItemDelete)
    const handleChangePage = ( event, newPage) => {
      setPage(newPage);
    };
    const handleChangeRowsPerPage = ( event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
    const handleDelete = (event) => {
     console.log('hey this is delete ')
     if(isItemDelete){
      swal({
        title: "Thank You",
        text: "Item Delete Successfully",
        icon: "success",
      })
     }else{
      swal({
        title: "Something went wrong !",
        text: "Please try It again !",
        icon: "warning",
      })
     }
    };
    const handleCheckBox = (event) => {
      console.log('hey this is Checkbox ')
     };
    return (
      <>
      <InventoryNavbar />
      <ItemSubTab />
          <div mt={2}>
            <Card >
             <Box className={classes.headerText} >Manage Item</Box>
             <Button variant="contained" color="primary"
                 className={classes.customBTN}
                 component={Link}
                 to="/app/system-administration/add_item">
                 Add Item
                </Button>
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
                        defaultValue={20}
                    >
                        <MenuItem value={10}>category 1</MenuItem>
                        <MenuItem value={20}>category 2</MenuItem>
                        <MenuItem value={30}>category 3</MenuItem>
                     </Select>
                   </FormControl>
                    <Box  className={classes.customBox} style={{marginLeft:15}}>
                      <TextField
                        id="name"
                        name="Name"
                        label="Name"
                        variant="outlined"
                        />
                       <Button variant="contained" color="primary" size="large" className={classes.customBTN}>
                          Search
                        </Button> 
                    </Box>
                  </div>
                </form>
              </CardContent>
              <Box style={{ fontWeight: 'bold', textTransform: 'uppercase', marginLeft:15}} >List Item</Box>
        <form id="formpatientdata" method="post">
          <Table aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Formulation</TableCell>
                <TableCell>Current QTY</TableCell>
                <TableCell><Button style={{backgroundColor: "red", color:"white"}} variant="contained" onClick={handleDelete}>Delete</Button></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell component={Link}
                 to="/app/system-administration/update_item" >test</TableCell>
                <TableCell>category 1</TableCell>
                <TableCell>ABC</TableCell>
                <TableCell>20</TableCell>
                <TableCell><Checkbox className={classes.customCheckbox} onChange={handleCheckBox} /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2</TableCell>
                <TableCell>test</TableCell>
                <TableCell>category 2</TableCell>
                <TableCell>ABC</TableCell>
                <TableCell>20</TableCell>
                <TableCell><Checkbox className={classes.customCheckbox} /></TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={100}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </form>
       </Card>
      </div>
          
      </>
    );
  
}
