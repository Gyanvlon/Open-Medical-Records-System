import React from 'react'
import {makeStyles} from "@material-ui/core/";
import styles from "../Styles";
import { useHistory } from 'react-router-dom';
import {TextField,Button,Box,Divider,} from "@material-ui/core/";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import swal from "sweetalert";
import { useSelector, useDispatch } from 'react-redux'

const useStyles = makeStyles(styles);
function FinshSlip() {
    const history = useHistory();
    const classes = useStyles();
    const handleChange = (event)=>{
      console.log("Hey this is event ", event.target.name, event.target.id, event.target.value)
    }
    const handleSubmitBtn = (evt)=>{
      console.log("you press submit btn")
        swal({
          title: "Thank You",
          text: "Specification Add Successfully",
          icon: "success",
        }).then((value) => {
          history.goBack()
        });
       }
    return (
        <>
        <div mt={2}>
            <Card >
             <Box className={classes.headerText} >Add Description for this slip</Box>
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
                        id="receiptNo"
                        name="Receipt No"
                        label="Receipt No"
                        variant="outlined"
                        style={{margin:15}}
                        onChange={handleChange}
                        />
                    <Divider />
                   <TextField
                        id="billAmount"
                        name="Bill Amount"
                        label="Bill Amount"
                        variant="outlined"
                        style={{margin:15}}
                        onChange={handleChange}
                        />
                      <Divider />
                        <TextField
                        id="nameOfVendor"
                        name="Name of Vendor"
                        label="Name Of Vendor"
                        variant="outlined"
                        style={{margin:15}}
                        onChange={handleChange}
                        />
                    <Divider />
                       <Button variant="contained" color="primary" size="small" className={classes.customBTN} style={{marginTop:15}} onClick={handleSubmitBtn} >
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
export default FinshSlip