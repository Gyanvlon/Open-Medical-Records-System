import React, { useState, useEffect } from "react";
import {
  TextField,
  makeStyles,
  Button,
  Box,
  Checkbox,
  TablePagination
} from "@material-ui/core/";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import InventoryNavbar from "../../InventoryNavBar"
import styles from "../../../../Styles";
import ItemSubTab from "../../ItemSubTab"
import { Link } from 'react-router-dom' 
import swal from "sweetalert";
import { useSelector, useDispatch } from 'react-redux'

const useStyles = makeStyles(styles);
export default function ManageSubCategory() {
  const classes = useStyles(); 
  const [page, setPage] = React.useState(2);
  const isSubCategoryDelete = useSelector(state => state.inventory.isSubCategoryDelete)

    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleChangePage = ( event, newPage) => {
      setPage(newPage);
    };
    const handleChangeRowsPerPage = ( event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
    const handleDelete = (event) => {
     console.log('hey this is delete ')
     if(isSubCategoryDelete){
      swal({
        title: "Thank You",
        text: "Sub Category Delete Successfully",
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
             <Box className={classes.headerText} >Manage Sub Category</Box>
             <Button variant="contained" color="primary"
                 className={classes.customBTN}
                 component={Link}
                 to="/app/system-administration/add_sub_category">
                 Add Sub Category
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
              <Box style={{ fontWeight: 'bold', textTransform: 'uppercase', marginLeft:15}} >List Sub Category </Box>
        <form id="formpatientdata" method="post">
          <Table aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Created Date</TableCell>
                <TableCell>Created by</TableCell>
                <TableCell><Button style={{backgroundColor: "red", color:"white"}} variant="contained" onClick={handleDelete}>Delete</Button></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell component={Link}
                 to="/app/system-administration/update_sub_category">test</TableCell>
                <TableCell>abc</TableCell>
                <TableCell>22/08/2022</TableCell>
                <TableCell>A</TableCell>
                <TableCell><Checkbox className={classes.customCheckbox} onChange={handleCheckBox} /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2</TableCell>
                <TableCell>test</TableCell>
                <TableCell>ABC</TableCell>
                <TableCell>22/08/2022</TableCell>
                <TableCell>A</TableCell>
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
