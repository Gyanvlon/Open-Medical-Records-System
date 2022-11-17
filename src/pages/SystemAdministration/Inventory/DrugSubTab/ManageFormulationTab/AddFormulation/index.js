import React from 'react'
import {makeStyles} from "@material-ui/core/";
import styles from "../../../../../Styles";
import { useHistory } from 'react-router-dom';
import {TextField,Button,Box,Divider,} from "@material-ui/core/";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import swal from "sweetalert";
import { useSelector, useDispatch } from 'react-redux'
import { addFormulation } from '../../../../../../actions/inventory';

const useStyles = makeStyles(styles);
function AddFormulationTab() {
    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();
    const [enable, setEnable] = React.useState(true);
    const [state, setState] = React.useState({});
    // const isFormulationAdd = useSelector(state => state.inventory.isFormulationAdd)
    const handleChange = (event)=>{
      setState({...state,[event.target.id]: event.target.value })
      if(state.name && state.dozage){
        setEnable(false)
      }else {
        setEnable(true)
      }
     }
    const handleSubmitBtn = ()=>{
      dispatch(addFormulation(state))
        swal({
          title: "Thank You",
          text: "Formulation Add Successfully",
          icon: "success",
        }).then((value) => {
          history.goBack()
        });
    }
    return (
        <>
        <div mt={2}>
            <Card >
             <Box className={classes.headerText} >Add Formulation</Box>
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
                        />
                    <Divider />
                       <Button disabled={enable} variant="contained" color="primary" size="small" className={classes.customBTN} style={{marginTop:15}} onClick={handleSubmitBtn}>
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
export default AddFormulationTab