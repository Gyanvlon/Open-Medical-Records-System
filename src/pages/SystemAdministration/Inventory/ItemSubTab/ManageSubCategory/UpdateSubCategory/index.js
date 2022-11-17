import React from 'react'
import {makeStyles,List,ListSubheader, Checkbox} from "@material-ui/core/";
import styles from "../../../../../Styles";
import { Alert, Autocomplete } from "@material-ui/lab";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Link from '@mui/material/Link';
import { useHistory } from 'react-router-dom';
import {
    TextField,
    Button,
    Box,
    Divider,
  } from "@material-ui/core/";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import swal from "sweetalert";
import { useSelector, useDispatch } from 'react-redux'

const useStyles = makeStyles(styles);
function UpdateSubCategory() {
    const history = useHistory();
    const classes = useStyles();
    const isSubCategoryUpdate = useSelector(state => state.inventory.isSubCategoryUpdate)

    const handleChange = (event)=>{
      console.log("Hey this is event ", event.target.name, event.target.id, event.target.value)
    }
    const handleSubmitBtn = (evt)=>{
      console.log("you press submit btn")
      if(isSubCategoryUpdate){
        swal({
          title: "Thank You",
          text: "Sub Category Update Successfully",
          icon: "success",
        }).then((value) => {
          history.goBack()
        });
       }else{
        swal({
          title: "Something went wrong !",
          text: "Please try It again !",
          icon: "warning",
        })
       }
    }
    return (
        <>
        <div mt={2}>
            <Card >
             <Box className={classes.headerText} >Update Sub Category</Box>
             <CardContent>
             <form noValidate id="searchForm">
                  <div
                    style={{
                        width: "100%",
                        display: "flex",
                        flexWrap: "wrap",
                        // justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom:"1%",
                        // margin:10
                      }}
                  >
                 <Box  className={classes.customBox} >
                    <FormControl style={{width:220, margin:15}}>
                     <InputLabel required id="demo-simple-select-label">Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Category"
                        onChange={handleChange}
                    >
                        <MenuItem value={10}>category 1</MenuItem>
                        <MenuItem value={20}>category 2</MenuItem>
                        <MenuItem value={30}>category 3</MenuItem>
                     </Select>
                   </FormControl>
                   <Divider />
                      <TextField
                        required
                        id="name"
                        name="Name"
                        label="Name"
                        variant="outlined"
                        style={{margin:15}}
                        onChange={handleChange}
                        />
                    <Divider />
                        <TextField
                        required
                        id="code"
                        name="code"
                        label="Code"
                        variant="outlined"
                        style={{margin:15}}
                        onChange={handleChange}
                        />
                    <Divider />
                   <TextField
                        id="description"
                        name="description"
                        label="Description"
                        variant="outlined"
                        style={{margin:15}}
                        onChange={handleChange}
                        />
                    <Divider />
                       <Button variant="contained" color="primary" size="small" className={classes.customBTN} style={{marginTop:15}} onClick={handleSubmitBtn}>
                          Update
                        </Button> 
                       <Button variant="contained" size="small" style={{marginLeft:60, marginTop:15, padding:14}}  onClick={history.goBack}>
                          Cancel
                        </Button> 
                    </Box>
                  </div>
                </form>
             </CardContent>
       </Card>
      </div>
      </>  
   )
}
export default UpdateSubCategory