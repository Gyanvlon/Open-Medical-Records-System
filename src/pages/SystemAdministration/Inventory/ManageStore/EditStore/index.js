import React,{useEffect} from 'react'
import { useHistory,useLocation } from 'react-router-dom';
import {makeStyles} from "@material-ui/core/";
import styles from "../../../../Styles";
import {TextField,Button,Box,FormLabel,FormControlLabel,Radio,Divider,RadioGroup} from "@material-ui/core/";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import swal from "sweetalert";
import { useSelector, useDispatch } from 'react-redux'
import { updateStore } from "../../../../../actions/inventory"
import {InventoryService } from '../../../../../services/data/inventoryService';
const useStyles = makeStyles(styles);
function UpdateStore() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const search = useLocation().search;
    const [state, setState] = React.useState({});
    const [isMainStore, setIsMainStore] = React.useState();
    const [isSearched, setIsSearched] = React.useState(true);
    const [enable, setEnable] = React.useState(false);
    const roleList = useSelector(state => state.inventory.roleList)
    const parentList = useSelector(state => state.inventory.parentList)
    useEffect( async ()=>{
      const uuid=new URLSearchParams(search).get("storeUuid");
      let res = await InventoryService.getStore(uuid)
        setState(res)
        setIsSearched(false)
    },[isSearched])
    const handleChange = (event, id)=>{
      if(id=="isPharmacy"){
        setIsMainStore(event.target.value == "Yes" ? true: false)
        setState({...state,[id]: event.target.value == "Yes" ? true: false})
      } else setState({...state,[id]: event.target.value})
      if(state.name =="" || state.code ==""){
        setEnable(true)
      }else{
        setEnable(false)
      }
    }
    const handleSubmitBtn = ()=>{
      let obj = {
        name: state.name,
        code: state.code,
        parentUuid:state.parentUuid,
        roleUuid:state.roleUuid,
        storeUuid:state.storeUuid,
        isPharmacy:state.isPharmacy
      }
      dispatch(updateStore(obj))
        swal({
          title: "Thank You",
          text: "Store Update Successfully",
          icon: "success",
        }).then((value) => {
          history.goBack()
        });
    }
    return (
        <>
        {Object.keys(state).length>0 ?
        <div mt={2}>
            <Card >
             <Box className={classes.headerText} > Update Store</Box>
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
                        name="row-radio-buttons-group" style={{marginTop:15}} >
                        <FormLabel required id="isPharmacy" style={{ margin:15}}>Is Main Store</FormLabel>
                        {state.isPharmacy ?
                        <>
                        <FormControlLabel value="Yes" checked control={<Radio className={classes.customCheckbox} onChange={e=>handleChange(e, "isPharmacy")} />} label="Yes" />
                        <FormControlLabel value="No"  control={<Radio  className={classes.customCheckbox} onChange={e=>handleChange(e, "isPharmacy")} />} label="No" />
                         </>
                        :
                        <>
                        <FormControlLabel value="Yes"  control={<Radio className={classes.customCheckbox} onChange={e=>handleChange(e, "isPharmacy")} />} label="Yes" />
                        <FormControlLabel value="No" checked control={<Radio  className={classes.customCheckbox} onChange={e=>handleChange(e, "isPharmacy")} />} label="No" />
                         </>
                        }
                        </RadioGroup>
                    </FormControl> 
                    <Divider />
                    {state.isPharmacy ?
                      <Box>
                      <TextField
                        required
                        id="name"
                        name="Name"
                        label="Name"
                        variant="outlined"
                        style={{margin:15}}
                        onChange={e=>handleChange(e,"name")}
                        defaultValue={state.name}
                        />
                        <TextField
                        required
                        id="code"
                        name="Store Code"
                        label="Store code"
                        variant="outlined"
                        style={{margin:15}}
                        onChange={e=>handleChange(e,"code")}
                        defaultValue={state.code}
                        /> 
                        <Divider />
                   <FormControl style={{width:220, margin:15}}>
                     <InputLabel required id="demo-simple-select-label">Role</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="role"
                        onChange={e=>handleChange(e,"roleUuid")}  
                        defaultValue={state.roleUuid}
                         >
                      {roleList.map(opt =><MenuItem value={opt.uuid} id={opt.uuid}>{opt.display}</MenuItem>)}
                     </Select>
                   </FormControl>
                   <Divider />
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
                        onChange={e=>handleChange(e,"name")}
                        defaultValue={state.name}
                        />
                        <TextField
                        required
                        id="code"
                        name="Store Code"
                        label="Store code"
                        variant="outlined"
                        style={{margin:15}}
                        onChange={e=>handleChange(e,"code")}
                        defaultValue={state.code}
                        /> 
                        <Divider />
                   <FormControl style={{width:220, margin:15}}>
                     <InputLabel required id="demo-simple-select-label">Role</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="role"
                        onChange={e=>handleChange(e,"roleUuid")}  
                        defaultValue={state.roleUuid}
                         >
                      {roleList.map(opt =><MenuItem value={opt.uuid} id={opt.uuid}>{opt.display}</MenuItem>)}
                     </Select>
                   </FormControl>
                   <FormControl style={{width:220, margin:15}}>
                     <InputLabel required id="demo-simple-select-label">Parent</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Parent"
                        onChange={e=>handleChange(e, "parentUuid")}
                        defaultValue={state.storeUuid}
                         >
                      {parentList.map(opt =><MenuItem value={opt.storeUuid} id={opt.storeUuid}>{opt.name}</MenuItem>)}
                     </Select>
                   </FormControl>
                   <Divider />
                  </Box>
                  }
                    <Button disabled={enable} variant="contained" color="primary" size="small" className={classes.customBTN} style={{marginTop:15}} onClick={handleSubmitBtn} >
                          Update
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
      :"" }
      </>  
   )
}
export default UpdateStore