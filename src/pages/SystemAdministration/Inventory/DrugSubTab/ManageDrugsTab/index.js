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
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import InventoryNavbar from "../../InventoryNavBar"
import styles from "../../../../Styles";
import DrugSubTab from "../../DrugSubTab"

const useStyles = makeStyles(styles);
export default function ManageDrugsTab() {
  const classes = useStyles(); 
  const [page, setPage] = React.useState(2);
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
  };
  const handleCheckBox = (event) => {
    console.log('hey this is Checkbox ')
   };
    return (
      <>
      <InventoryNavbar />
      <DrugSubTab />
          <div mt={2}>
            <Card >
             <Box className={classes.headerText} >Manage Drug</Box>
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
              <Box style={{ fontWeight: 'bold', textTransform: 'uppercase', marginLeft:15}} >List Drug</Box>
        <form id="formpatientdata" method="post">
          <Table aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Brand Name</TableCell>
                <TableCell>Generic Name</TableCell>
                <TableCell>Formulation</TableCell>
                <TableCell>Unit Category</TableCell>
                <TableCell>Attribute</TableCell>
                <TableCell>Created Date</TableCell>
                <TableCell>Created by</TableCell>
                <TableCell><Button style={{backgroundColor: "red", color:"white"}} variant="contained" onClick={handleDelete}>Delete</Button></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>test</TableCell>
                <TableCell>abc</TableCell>
                <TableCell>ABC</TableCell>
                <TableCell>aaa</TableCell>
                <TableCell>aaa</TableCell>
                <TableCell>aaa</TableCell>
                <TableCell>aaa</TableCell>
                <TableCell><Checkbox className={classes.customCheckbox} onChange={handleCheckBox} /></TableCell>
                
              </TableRow>
              <TableRow>
                <TableCell>2</TableCell>
                <TableCell>test</TableCell>
                <TableCell>abc</TableCell>
                <TableCell>ABC</TableCell>
                <TableCell>aaa</TableCell>
                <TableCell>aaa</TableCell>
                <TableCell>aaa</TableCell>
                <TableCell>aaa</TableCell>
                <TableCell>aaa</TableCell>
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
