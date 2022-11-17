import React from 'react'
import {makeStyles} from "@material-ui/core/";
import styles from "../../../../../Styles";
import { useHistory } from 'react-router-dom';
import {TextField,Button,Box,Divider} from "@material-ui/core/";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import swal from "sweetalert";
import { useSelector, useDispatch } from 'react-redux'
import { addUnit } from "../../../../../../actions/inventory"

const useStyles = makeStyles(styles);
function AddUnit() {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [state, setState] = React.useState({});
  const [enable, setEnable] = React.useState(true);
  const isUnitAdd = useSelector(state => state.inventory.isUnitAdd)
  const handleChange = (event, id)=>{
      if(id=="name"){
        if(event.target.value) setEnable(false)
        else setEnable(true)
      }
    setState({...state,[id]: event.target.value})
  }
  const handleSubmitBtn = (evt)=>{
    dispatch(addUnit(state))
     if(isUnitAdd){
      swal({
        icon: "success",
        title: "Thank You",
        text: "Unit Add Successfully",
      }).then((value) => {
        history.goBack()
      });
     }
  }
    return (
        <>
        <div mt={2}>
            <Card >
             <Box className={classes.headerText} >Add Unit</Box>
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
                        onChange={e=>handleChange(e, "name")}
                        />
                    <Divider />
                   <TextField
                        id="description"
                        name="description"
                        label="Description"
                        variant="outlined"
                        style={{margin:15}}
                        onChange={e=>handleChange(e, "description")}
                        multiline
                        minRows={4}
                        />
                    <Divider />
                       <Button variant="contained" disabled={enable} color="primary" size="small" className={classes.customBTN} style={{marginTop:15}} onClick={handleSubmitBtn}>
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
export default AddUnit