import React,{useEffect} from 'react'
import {makeStyles} from "@material-ui/core/";
import styles from "../../../../../Styles";
import { useHistory,useLocation } from 'react-router-dom';
import {TextField,Button,Box,Divider,} from "@material-ui/core/";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import swal from "sweetalert";
import { useSelector, useDispatch } from 'react-redux'
import {InventoryService } from '../../../../../../services/data/inventoryService';
import { updateCategory } from '../../../../../../actions/inventory';
const useStyles = makeStyles(styles);
function UpdateCategory() {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const search = useLocation().search;
  const [state, setState] = React.useState({});
  const [isSearched, setIsSearched] = React.useState(true);
  const [enable, setEnable] = React.useState(true);
  const isCategoryUpdate = useSelector(state => state.inventory.isCategoryUpdate)
  useEffect( async ()=>{
    const uuid=new URLSearchParams(search).get("categoryUuid");
    let res = await InventoryService.getDrugCategory(uuid)
      setState(res)
      setIsSearched(false)
      if(state.name){
        setEnable(false)
      }
  },[isSearched])
  const handleChange = (event)=>{
    if(event.target.id =="name"){
      if(event.target.value) setEnable(false)
      else setEnable(true)
    }
    setState({...state, [event.target.id]:event.target.value})
  }
  const handleSubmitBtn = (evt)=>{
    let obj = {
      name:state.name,
      description:state.description,
      uuid:state.uuid
    }
    dispatch(updateCategory(obj))
    if(isCategoryUpdate){
      swal({
        title: "Thank You",
        text: "Category Update Successfully",
        icon: "success",
      }).then((value) => {
        history.goBack()
      });
    }
  }
    return (
      <>
      { Object.keys(state).length>0 ? 
      <div mt={2}>
          <Card >
           <Box className={classes.headerText} >Update Category</Box>
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
                      name="Name"
                      label="Name"
                      variant="outlined"
                      style={{margin:15}}
                      onChange={handleChange}
                      defaultValue={state.name}
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
                     <Button variant="contained" size="small" style={{marginLeft:60, marginTop:15, padding:14}}  onClick={history.goBack}>
                        Cancel
                      </Button> 
                  </Box>
                </div>
              </form>
           </CardContent>
     </Card>
    </div>
    : 
    ""}
    </>  
   )
}
export default UpdateCategory