import React, {useEffect} from 'react'
import {makeStyles} from "@material-ui/core/";
import styles from "../../../../../Styles";
import { useHistory,useLocation } from 'react-router-dom';
import {TextField,Button,Box,Divider,} from "@material-ui/core/";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import swal from "sweetalert";
import { useDispatch,useSelector} from 'react-redux'
import { updateUnit } from '../../../../../../actions/inventory';
import {InventoryService } from '../../../../../../services/data/inventoryService';

const useStyles = makeStyles(styles);
function UpdateUnit() {
  const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();
    const search = useLocation().search;
    const [state, setState] = React.useState({});
    const [enable, setEnable] = React.useState(false);
    const [isSearched, setIsSearched] = React.useState(true);
    const isUnitUpdate = useSelector(state => state.inventory.isUnitUpdate)
    useEffect( async ()=>{
      const uuid=new URLSearchParams(search).get("unitUuid");
      let res = await InventoryService.getDrugUnit(uuid)
        setState(res)
        setIsSearched(false)
    },[isSearched])
    const handleChange = (event)=>{
      if(event.target.id=="name"){
        if(event.target.value) setEnable(false)
        else setEnable(true)
      }
      setState({...state,[event.target.id]: event.target.value})
    }
    const handleSubmitBtn = ()=>{
      let obj = {
        name:state.name,
        description:state.description,
        uuid:state.uuid
      }
      dispatch(updateUnit(obj))
      if(isUnitUpdate){
        swal({
          title: "Thank You",
          text: "Unit Update Successfully",
          icon: "success",
        }).then((value) => {
          history.goBack();
        });
      }
     }
    return (
      <>
      { Object.keys(state).length>0 ? 
      <div mt={2}>
          <Card >
           <Box className={classes.headerText} >Update Unit</Box>
           <CardContent>
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
                      name="Name"
                      label="Name"
                      variant="outlined"
                      style={{margin:15}}
                      defaultValue={state.name}
                      onChange={handleChange}
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
           </CardContent>
     </Card>
    </div> 
    :""}
    </>  
   )
}
export default UpdateUnit