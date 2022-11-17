import React from 'react'
import {makeStyles} from "@material-ui/core/";
import styles from "../../../../Styles";
import { useHistory } from 'react-router-dom';
import {TextField,Button,Box,Divider,} from "@material-ui/core/";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import swal from "sweetalert";
import { useSelector, useDispatch } from 'react-redux'

const useStyles = makeStyles(styles);
function UpdateItem() {
    const history = useHistory();
    const classes = useStyles();
    const isItemUpdate = useSelector(state => state.inventory.isItemUpdate)
    const handleChange = (event)=>{
      console.log("Hey this is event ", event.target.name, event.target.id, event.target.value)
    }
    const handleSubmitBtn = (evt)=>{
      console.log("you press submit btn")
      if(isItemUpdate){
        swal({
          title: "Thank You",
          text: "Item Update Successfully",
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
        {/* <InventoryNavbar /> */}
        <div mt={2}>
            <Card >
             <Box className={classes.headerText} >Update Item</Box>
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
                    <FormControl style={{width:220, margin:15}}>
                     <InputLabel required id="demo-simple-select-label">Unit</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="unit"
                        onChange={handleChange}
                    >
                        <MenuItem value={10}>category 1</MenuItem>
                        <MenuItem value={20}>category 2</MenuItem>
                        <MenuItem value={30}>category 3</MenuItem>
                     </Select>
                   </FormControl>
                   <Divider />
                   <TextField
                        id="specification"
                        name="specification"
                        label="Specification"
                        variant="outlined"
                        style={{margin:15}}
                        onChange={handleChange}
                        />
                   <FormControl style={{width:220, margin:15}}>
                     <InputLabel required id="demo-simple-select-label">Sub Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Sub Category"
                    >
                        <MenuItem value={10}>category 1</MenuItem>
                        <MenuItem value={20}>category 2</MenuItem>
                        <MenuItem TextareaAutosizevalue={30}>category 3</MenuItem>
                     </Select>
                   </FormControl>
                   <Divider />
                   <FormControl style={{width:220, margin:15}}>
                     <InputLabel required id="demo-simple-select-label">Attribute</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Attribute"
                        onChange={handleChange}
                    >
                        <MenuItem value={10}>category 1</MenuItem>
                        <MenuItem value={20}>category 2</MenuItem>
                        <MenuItem value={30}>category 3</MenuItem>
                     </Select>
                   </FormControl> 
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
export default UpdateItem