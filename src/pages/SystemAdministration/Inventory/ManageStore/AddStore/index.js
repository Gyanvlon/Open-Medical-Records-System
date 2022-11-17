
import React from "react";
import {makeStyles} from "@material-ui/core/";
import styles from "../../../../Styles";
import {TextField,Button,Box,FormLabel,FormControlLabel,Radio,Divider,RadioGroup} from "@material-ui/core/";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useHistory } from 'react-router-dom';
import swal from "sweetalert";
import { useSelector, useDispatch } from 'react-redux'
import { addStore } from "../../../../../actions/inventory"
const useStyles = makeStyles(styles);
function AddStore() {
    const classes = useStyles();
    const history = useHistory();
    const [state, setState] = React.useState({});
    const [Enable, setEnable] = React.useState(true);
    const [isMainStore, setIsMainStore] = React.useState('');
    const dispatch = useDispatch();
    // const isStoreAdd = useSelector(state => state.inventory.isStoreAdd)
    const roleList = useSelector(state => state.inventory.roleList)
    const parentList = useSelector(state => state.inventory.parentList)
    const handleChange = (event, id)=>{
      if(id=="isPharmacy"){
        setIsMainStore(event.target.value == "Yes" ? true: false)
        setState({...state,[id]: event.target.value == "Yes" ? true: false})
      } else{
        setState({...state,[id]: event.target.value})
      } 
      if(state.hasOwnProperty("name") && state.hasOwnProperty("code") && state.hasOwnProperty("parentUuid") && state.hasOwnProperty("roleUuid")){
        setEnable(false)
      }else{
        setEnable(true)
      }
    }
    const handleSubmitBtn = ()=>{
       dispatch(addStore(state))
        swal({
          title: "Thank You",
          text: "Store Add Successfully",
          icon: "success",
        }).then((value) => {
          history.goBack()
        });  
    }
    return (
        <>
        <div mt={2}>
            <Card >
             <Box className={classes.headerText} >Add Store</Box>
             <CardContent>
             <form noValidate id="searchForm">
                  <div
                    style={{
                        width: "100%",
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        marginBottom:"1%",
                      }}
                      >
                   <Box  className={classes.customBox} >
                    <FormControl>
                    <RadioGroup
                       row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="Is Pharmacy" style={{marginTop:15}} >
                        <FormLabel row id="isPharmacy" style={{ margin:15}} required >Is Main Store</FormLabel>
                        <FormControlLabel value="Yes"  control={<Radio   className={classes.customCheckbox} onChange={e=>handleChange(e,"isPharmacy")} />} label="Yes" />
                        <FormControlLabel value="No"  control={<Radio  className={classes.customCheckbox} onChange={e=>handleChange(e,"isPharmacy")} />} label="No" />
                        </RadioGroup>
                    </FormControl> 
                     <Divider />
                     {isMainStore !== '' ? isMainStore ? 
                     <Box>
                      <TextField
                        required
                        id="name"
                        name="Name"
                        label="Name"
                        variant="outlined"
                        style={{margin:15}}
                        onChange={e=>handleChange(e, "name")}
                        />
                        <TextField
                        required
                        id="code"
                        name="Store Code"
                        label="Store code"
                        variant="outlined"
                        style={{margin:15}}
                        onChange={e=>handleChange(e, "code")}
                        /> 
                        <Divider />
                   <FormControl style={{width:220, margin:15}}>
                     <InputLabel required id="demo-simple-select-label">Role</InputLabel>
                    <Select
                        id="roleUuid"
                        label="Role"
                        onChange={e=>handleChange(e,"roleUuid")}
                    >
                      {roleList.map(opt =><MenuItem value={opt.uuid} id={opt.uuid}>{opt.display}</MenuItem>)}
                     </Select>
                   </FormControl>
                   </Box> 
                   : 
                   <Box>
                   <TextField
                         required
                         id="name"
                         name="Name"
                         label="Name"
                         variant="outlined"
                         style={{margin:15}}
                         onChange={e=>handleChange(e, "name")}
                         />
                    <TextField
                         required
                         id="code"
                         name="Store Code"
                         label="Store code"
                         variant="outlined"
                         style={{margin:15}}
                         onChange={e=>handleChange(e, "code")}
                         /> 
                         <Divider />
                     <FormControl style={{width:220, margin:15}}>
                      <InputLabel required id="demo-simple-select-label" >Parent</InputLabel>
                     <Select
                         labelId="demo-simple-select-label"
                         id="demo-simple-select"
                         label="Parent"
                         onChange={e=>handleChange(e,"parentUuid")}
                     >
                       {parentList.map(opt =><MenuItem value={opt.storeUuid} id={opt.storeUuid}>{opt.name}</MenuItem>)}
                      </Select>
                    </FormControl>
                    <FormControl style={{width:220, margin:15}}>
                      <InputLabel required id="demo-simple-select-label">Role</InputLabel>
                     <Select
                         id="roleUuid"
                         label="Role"
                         onChange={e=>handleChange(e,"roleUuid")}
                     >
                       {roleList.map(opt =><MenuItem value={opt.uuid} id={opt.uuid}>{opt.display}</MenuItem>)}
                      </Select>
                    </FormControl>
                    </Box>
                    : 
                    ""
                    }
                    <Divider />
                    <Button disabled={Enable} variant="contained" color="primary" size="small" className={classes.customBTN} style={{marginTop:15}} onClick={handleSubmitBtn}>
                          Submit
                        </Button> 
                       <Button variant="contained" size="small" style={{marginLeft:60, marginTop:15, padding:14}} onClick={history.goBack}>
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
export default AddStore