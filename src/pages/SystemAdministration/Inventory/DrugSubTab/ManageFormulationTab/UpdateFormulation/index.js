import React, {useEffect} from 'react'
import {makeStyles,List,ListSubheader, Checkbox} from "@material-ui/core/";
import styles from "../../../../../Styles";
import { useHistory, useLocation } from 'react-router-dom';
import {TextField,Button,Box,Divider} from "@material-ui/core/";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import swal from "sweetalert";
import { useSelector, useDispatch } from 'react-redux'
import {InventoryService } from '../../../../../../services/data/inventoryService';
import { updateFormulation } from '../../../../../../actions/inventory';
const useStyles = makeStyles(styles);
function UpdateFormulationTab() {
    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();
    const search = useLocation().search;
    const [state, setState] = React.useState({});
    const [isSearched, setIsSearched] = React.useState(true);
    const [enable, setEnable] = React.useState(false);
    // const isFormulationUpdate = useSelector(state => state.inventory.isFormulationUpdate)
    useEffect( async ()=>{
      const uuid=new URLSearchParams(search).get("formulationUuid");
      let res = await InventoryService.getFormulation(uuid)
        setState(res)
        setIsSearched(false)
    },[isSearched])
    const handleChange = (event)=>{
      setState({...state, [event.target.id]:event.target.value})
      if(state.name && state.dozage){
        setEnable(false)
      }
      if(state.name == "" && state.dozage == ""){
        setEnable(true)
      }
    }
    const handleSubmitBtn = (evt)=>{
      let obj = {
        name:state.name,
        dozage:state.dozage,
        description:state.description,
        uuid:state.uuid
      }
      dispatch(updateFormulation(obj))
        swal({
          title: "Thank You",
          text: "Formulation Update Successfully",
          icon: "success",
        }).then((value) => {
          history.goBack()
        });
    }
    return (
        <>
        { Object.keys(state).length>0 ? 
        <div mt={2}>
            <Card >
             <Box className={classes.headerText} >Update Formulation</Box>
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
                        id="name"
                        name="Formulation"
                        label="Formulation"
                        variant="outlined"
                        style={{margin:15}}
                        onChange={handleChange}
                        defaultValue={state.name}
                        />
                    <Divider />
                     <TextField
                        required
                        id="dozage"
                        name="Dosage"
                        label="Dosage"
                        variant="outlined"
                        style={{margin:15}}
                        onChange={handleChange}
                        defaultValue={state.dozage}
                        />
                    <Divider />
                   <TextField
                        multiline
                        minRows={4}
                        id="description"
                        name="description"
                        label="Description"
                        variant="outlined"
                        style={{margin:15}}
                        onChange={handleChange}
                        defaultValue={state.description}
                        />
                    <Divider />
                       <Button disabled={enable} variant="contained" color="primary" size="small" className={classes.customBTN} style={{marginTop:15}} onClick={handleSubmitBtn}>
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
      : ""}
      </>  
   )
}
export default UpdateFormulationTab