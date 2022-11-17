import React from 'react'
import {makeStyles} from "@material-ui/core/";
import styles from "../../../../../Styles";
import { useHistory } from 'react-router-dom';
import {TextField,Button,Box,Divider,} from "@material-ui/core/";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import swal from "sweetalert";
import { useSelector, useDispatch } from 'react-redux'
import Autocomplete from '@mui/material/Autocomplete';
import {InventoryService } from '../../../../../../services/data/inventoryService';
import { addDrug } from '../../../../../../actions/inventory';
const useStyles = makeStyles(styles);
function AddDrugTab() {
    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();
    const [showReorderQty, setShowReorderQty] = React.useState(false);
    const [state, setState] = React.useState({});
    const [Enable, setEnable] = React.useState(true);
    const [genericName, setGenericName] = React.useState([]);
    // const isDrugAdd = useSelector(state => state.inventory.isDrugAdd)
    const categoryList = useSelector(state => state.inventory.categoryList)
    const unitList = useSelector(state => state.inventory.unitList)
    const attributeList = useSelector(state => state.inventory.attributeList)
    const formulationList = useSelector(state => state.inventory.formulationList)
    const [formState, setFormState] = React.useState({formulation: []});
   const handleFieldChange = event => {
    event.persist();
    setFormState(formState => ({
      ...formState,
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value
    }));
  };
    const handleChange = (event, id)=>{
      if(id=="attributeId"){
        if(event.target.value==1) setShowReorderQty(true)
        else setShowReorderQty(false)
      }
      setState({...state, [id]: event.target.value})
      if(state.hasOwnProperty("name") && state.hasOwnProperty("unitUuid") && state.hasOwnProperty("categoryUuid")){
        setEnable(false)
      }else{
        setEnable(true)
      }
    }
    const SearchGenericName = async (event)=>{
      if(event.target.value){
        let res = await InventoryService.searchGenericName(event.target.value)
        setGenericName(res.results)
      }
    }
    const handleSubmitBtn = ()=>{
      let obj ={
        name:state.name,
        formulationUuids:formState.formulation,
        unitUuid:state.unitUuid,
        categoryUuid:state.categoryUuid,
        attributeId:state.attributeId,
        drugUuid:genericName.find((gn, i)=>i==state.drugUuid).uuid,
        reorderQty: 10
      }
      dispatch(addDrug(obj))
        swal({
          title: "Thank You",
          text: "Drug Add Successfully",
          icon: "success",
        }).then((value) => {
          history.goBack()
        });
    }
    return (
        <>
        <div mt={2}>
            <Card >
             <Box className={classes.headerText} >Add Drug</Box>
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
                      <TextField
                        required
                        id="brandName"
                        name="Brand Name"
                        label="Brand Name"
                        variant="outlined"
                        style={{margin:15}}
                        onChange={e=>handleChange(e, "name")}
                        />
                       <Autocomplete
                        freeSolo
                        id="genericName1"
                        disableClearable
                        onChange={e=>handleChange(e,"drugUuid")}
                        options={genericName.map((option) => option.display)}
                         renderInput={(params) => (
                        <TextField
                          required
                          id="genericName"
                          onChange={SearchGenericName}
                          style={{margin:15, width:230}}
                          variant="outlined"
                          {...params}
                          label="Generic Name"
                          InputProps={{
                            ...params.InputProps,
                            type: 'search',
                          }}
                        />
                      )}
                    />
                    <Divider />
                    <TextField
                      required
                      style={{margin:15, width:230}}
                      select
                      name="formulation"
                      id="formulation"
                      variant="outlined"
                      label="Formulation"
                      SelectProps={{
                        multiple: true,
                        value: formState.formulation,
                        onChange: handleFieldChange
                      }}
                    >
                      {formulationList.map(opt =><MenuItem value={opt.uuid} id={opt.uuid}>{opt.name}</MenuItem>)}
                    </TextField>
                  <FormControl style={{width:220, margin:15}}>
                     <InputLabel required id="demo-simple-select-label">Unit</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="unit"
                        onChange={e=>handleChange(e, "unitUuid")}
                    >
                      {unitList.map(opt =><MenuItem value={opt.uuid} id={opt.uuid}>{opt.name}</MenuItem>)}
                     </Select>
                   </FormControl>
                   <Divider />
                   <FormControl style={{width:220, margin:15}}>
                     <InputLabel required id="demo-simple-select-label">Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Category"
                        onChange={e=>handleChange(e,"categoryUuid")}
                    >
                      {categoryList.map(opt =><MenuItem value={opt.uuid} id={opt.uuid}>{opt.name}</MenuItem>)}
                     </Select>
                   </FormControl>
                   <FormControl style={{width:220, margin:15}}>
                     <InputLabel required id="demo-simple-select-label">Attribute</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Attribute"
                        onChange={e=>handleChange(e, "attributeId")}
                    >
                      {attributeList.map(opt =><MenuItem value={opt.id} id={opt.id}>{opt.name}</MenuItem>)}
                     </Select>
                   </FormControl>
                   
                   {showReorderQty ? <TextField
                        required
                        id="reorderQty"
                        name="Re-order QTY"
                        label="Re-order QTY"
                        variant="outlined"
                        style={{margin:15}}
                        onChange={e=>handleChange(e, "reorderQty")}
                        />: ""}
                    <Divider />
                       <Button  disabled={Enable} variant="contained" color="primary" size="small" className={classes.customBTN} style={{marginTop:15}} onClick={handleSubmitBtn}>
                          Submit
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
export default AddDrugTab