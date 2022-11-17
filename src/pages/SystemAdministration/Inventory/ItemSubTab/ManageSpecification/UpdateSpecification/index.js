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
import { useHistory } from 'react-router-dom';
import {
    TextField,
    Button,
    Box,
    Divider,
  } from "@material-ui/core/";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import swal from "sweetalert";
import { useSelector, useDispatch } from 'react-redux'

const useStyles = makeStyles(styles);
function UpdateSpecification() {
    const history = useHistory();
    const classes = useStyles();
    const isSpecificationUpdate = useSelector(state => state.inventory.isSpecificationUpdate)
    const handleChange = (event)=>{
      console.log("Hey this is event ", event.target.name, event.target.id, event.target.value)
    }
    const handleSubmitBtn = (evt)=>{
      console.log("you press submit btn")
      if(isSpecificationUpdate){
        swal({
          title: "Thank You",
          text: "Specification Update Successfully",
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
             <Box className={classes.headerText} >Update Specification</Box>
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
                        id="description"
                        name="description"
                        label="Description"
                        variant="outlined"
                        style={{margin:15}}
                        onChange={handleChange}
                        />
                    <Divider />
                       <Button variant="contained" color="primary" size="small" className={classes.customBTN} style={{marginTop:15}} onClick={handleSubmitBtn} >
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
export default UpdateSpecification