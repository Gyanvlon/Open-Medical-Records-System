import React, { useEffect, useState } from "react";
import {makeStyles, Checkbox,TablePagination} from "@material-ui/core/";
import styles from "../../../Styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Link } from 'react-router-dom'
import { Button, Box, } from "@material-ui/core/";
import Card from "@material-ui/core/Card";
import swal from "sweetalert";
import InventoryNavbar from "../InventoryNavBar"
import { useSelector, useDispatch } from 'react-redux'
import { deleteStore } from "../../../../actions/inventory"
const useStyles = makeStyles(styles);
function ManageStore() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [CbId, setCbId] = React.useState([]);
    const storeList = useSelector(state => state.inventory.storeList)
    const [rows, setRows] = React.useState(storeList);
    const [searched, setSearched] = useState("");
    const [isSearched, setIsSearched] = useState(false);
    const seachTableContent = () => {
    const filteredRows = storeList.filter((row) => {
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
    const handleDelete = () => {
      if(CbId.length>0){
        swal({
          title: "Are you sure?",
          text: "Once Delete Store, You will not be able to recover this Store!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((value) => {
          if(value){
          dispatch(deleteStore(CbId))
          swal({
           title: "Thank You",
          text: "Store Delete Successfully",
          icon: "success",
          })
       }
       });
      } else {
        swal({
          title: "Please Select Checkbox to Delete",
          icon: "warning",
        })
      }
    };
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
        <div mt={2}>
            <Card >
             <Box className={classes.headerText} >Manage Store</Box>
              <Button variant="contained" color="primary" className={classes.customBTN}
                component={Link}
                 to="/app/system-administration/add_store">
                 Add Store
                </Button>
              <Box style={{ fontWeight: 'bold', textTransform: 'uppercase', marginLeft:15, padding:10}} >List  Store</Box>
        <form id="formpatientdata" method="post">
          <Table aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Store Code</TableCell>
                <TableCell>Parent</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Is Pharmacy</TableCell>
                <TableCell>Created Date</TableCell>
                <TableCell>Created By</TableCell>
                <TableCell><Button style={{backgroundColor: "red", color:"white"}} variant="contained" onClick={handleDelete}>Delete</Button></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {stableSort(isSearched ? rows : storeList, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((ele, i)=>
              <TableRow key={ele.storeUuid}>
                <TableCell>{ele.id}</TableCell>
                <TableCell component={Link}
                   to={`/app/system-administration/update_store?storeUuid=${ele.storeUuid}`}>
                   {ele.name}
                  </TableCell>
                <TableCell>{ele.code}</TableCell>
                <TableCell >{""}</TableCell>
                <TableCell>{ele.roleName}</TableCell>
                <TableCell>{ele.isPharmacy ? "Yes": "No"}</TableCell>
                <TableCell>{ele.createdDate}</TableCell>
                <TableCell>{ele.createdBy}</TableCell>
                <TableCell><Checkbox className={classes.customCheckbox} onChange={e=>handleCheckBox(e, ele.storeUuid)} /></TableCell>
              </TableRow>)}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={storeList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </form>
       </Card>
      </div>
      </>  
   )
}
export default ManageStore