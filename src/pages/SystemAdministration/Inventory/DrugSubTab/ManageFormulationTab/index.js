import React, { useState, useEffect } from "react";
import {TextField,makeStyles, Button, Box, Checkbox, TablePagination} from "@material-ui/core/";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import InventoryNavbar from "../../InventoryNavBar"
import styles from "../../../../Styles";
import DrugSubTab from "../../DrugSubTab"
import { Link } from 'react-router-dom' 
import swal from "sweetalert";
import { useSelector, useDispatch } from 'react-redux'
import { deleteFormulation, } from "../../../../../actions/inventory"
const useStyles = makeStyles(styles);
export default function ManageFormulationTab() {
  const classes = useStyles(); 
  const dispatch = useDispatch();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [CbId, setCbId] = React.useState([]);
  const [search, setSearch] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const isFormulationDelete = useSelector(state => state.inventory.isFormulationDelete)
  const formulationList = useSelector(state => state.inventory.formulationList)
  const [formulationRows, setFormulationRows] = React.useState(formulationList);
  const seachTableContentOfFormulation = () => {
    const filteredRows = formulationList.filter((row) => {
      return row.name.toLowerCase().includes(search.toLowerCase());
    });
    setIsSearch(true)
    setFormulationRows(filteredRows);
  };
  const handleSearch=(event)=>{
    setSearch(event.target.value)
  }
  const handleChangePage = ( event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = ( event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleDelete = (event) => {
   if(CbId.length>0){
    swal({
      title: "Are you sure?",
      text: "Once Delete Formulation, You will not be able to recover this Formulation!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((value) => {
      if(value){
      dispatch(deleteFormulation(CbId))
      swal({
       title: "Thank You",
      text: "Formulation Delete Successfully",
      icon: "success",
      })
    }
   });
  }else {
    swal({
      title: "Please Select Checkbox to Delete",
      icon: "warning",
    })
  }
}
  const handleCheckBox = (event, uuid) => {
    if(event.target.checked){
      CbId.push(uuid)
    }else{
     let index = CbId.indexOf(uuid)
      CbId.splice(index,1)
    }
    setCbId(CbId)
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
    return (
      <>
      <InventoryNavbar />
      <DrugSubTab />
          <div mt={2}>
            <Card >
             <Box className={classes.headerText} >Manage Formulation</Box>
             <Button variant="contained" color="primary"
                 className={classes.customBTN}
                 component={Link}
                 to="/app/system-administration/manage_drug_add_formulation">
                 Add Formulation
                </Button>
              <CardContent>
                <form noValidate id="searchForm">
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexWrap: "wrap",
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
                        onChange={handleSearch}
                        />
                       <Button variant="contained" color="primary" size="large" className={classes.customBTN} onClick={seachTableContentOfFormulation}>
                          Search
                        </Button> 
                    </Box>
                  </div>
                </form>
              </CardContent>
              <Box style={{ fontWeight: 'bold', textTransform: 'uppercase', marginLeft:15}} >List Formulation </Box>
        <form id="formpatientdata" method="post">
          <Table aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Dosage</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Created Date</TableCell>
                <TableCell>Created by</TableCell>
                <TableCell><Button style={{backgroundColor: "red", color:"white"}} variant="contained" onClick={handleDelete} >Delete</Button></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {stableSort(isSearch ? formulationRows : formulationList, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((element,i)=>
                  <TableRow key={element.id} id={element.id}>
                  <TableCell>{element.id}</TableCell>
                  <TableCell  component={Link}
                   to={`/app/system-administration/manage_drug_update_formulation?formulationUuid=${element.uuid}`} >{element.name}</TableCell>
                  <TableCell>{element.dozage}</TableCell>
                  <TableCell>{element.description}</TableCell>
                  <TableCell>{element.createdDate}</TableCell>
                  <TableCell>{element.createdBy}</TableCell>
                  <TableCell><Checkbox className={classes.customCheckbox} onChange={(e)=>handleCheckBox(e, element.uuid)} /></TableCell>
                </TableRow>
                )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={formulationList.length}
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
