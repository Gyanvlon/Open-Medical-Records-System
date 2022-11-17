import React, {useRef} from 'react'
import {makeStyles} from "@material-ui/core/";
import styles from "../Styles";
import { Link, useHistory } from 'react-router-dom'
import {TextField,Button,Box,Divider} from "@material-ui/core/";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import swal from "sweetalert";
import { useSelector, useDispatch } from 'react-redux'
import {MuiPickersUtilsProvider, KeyboardDatePicker} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Icon from '@mui/material/Icon';
import { useReactToPrint } from "react-to-print";

const useStyles = makeStyles(styles);
function AddReceipt() {
    const classes = useStyles();
    const history = useHistory();
    const ref = useRef()
    const handleChange = (event)=>{
      console.log("Hey this is event ", event.target.name, event.target.id, event.target.value)
    }
    const handleSubmitBtn = (evt)=>{
      console.log("you press submit btn")
        swal({
          title: "Thank You",
          text: "Item Add Successfully",
          icon: "success",
        });
    }
    const ClearAllSlip = ()=>{
        swal({
            title: "Are you sure?",
            text: "Once Cleared, you will not be able to recover slips!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then((value) => {
            if(value){
            swal({
             title: "Thank You",
            text: "All Slip Clear Successfully",
            icon: "success",
            })
          }
        });
    }
    const ClearSlip = ()=>{
        swal({
            title: "Are you sure?",
            text: "Once Cleared, you will not be able to recover slip!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then((value) => {
            if(value){
            swal({
             title: "Thank You",
            text: "Slip Clear Successfully",
            icon: "success",
            })
          }
        });
    }
    const handlePrint = useReactToPrint({
      content: () => ref.current,
    });
    return (
        <>
        <Icon baseClassName="fas" className="fa-arrow-left" onClick={history.goBack}  />
        <div mt={2}>
            <Card >
             <Box className={classes.headerText} >Add Reciept</Box>
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
                        label="Brand Name"
                        variant="outlined"
                        style={{margin:15}}
                        onChange={handleChange}
                        />
                    <FormControl style={{width:220, margin:15}}>
                     <InputLabel required id="demo-simple-select-label">Formulation</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Formulation"
                        onChange={handleChange}
                    >
                        <MenuItem value={10}>category 1</MenuItem>
                        <MenuItem value={20}>category 2</MenuItem>
                        <MenuItem value={30}>category 3</MenuItem>
                     </Select>
                   </FormControl>
                   <Divider />
                   <TextField
                        id="quantity"
                        name="Quantity"
                        label="Quantity"
                        variant="outlined"
                        style={{margin:15}}
                        onChange={handleChange}
                        />
                        <TextField
                        id="rate"
                        name="Rate"
                        label="Rate"
                        variant="outlined"
                        style={{margin:15}}
                        />
                        <TextField
                        id="vat"
                        name="vat"
                        label="Vat (%)"
                        variant="outlined"
                        style={{margin:15}}
                        onChange={handleChange}
                        />
                        <TextField
                        id="mrp"
                        name="mrp"
                        label="MRP"
                        variant="outlined"
                        style={{margin:15}}
                        onChange={handleChange}
                        />
                        <TextField
                        id="companyName"
                        name="Company Name"
                        label="Comapany Name"
                        variant="outlined"
                        style={{margin:15}}
                        onChange={handleChange}
                        />
                        <TextField
                        id="cd"
                        name="cd"
                        label="CD (%)"
                        variant="outlined"
                        style={{margin:15}}
                        onChange={handleChange}
                        />
                        <TextField
                        id="cgst"
                        name="CGST"
                        label="CGST(%)"
                        variant="outlined"
                        style={{margin:15}}
                        onChange={handleChange}
                        />
                        <TextField
                        id="sgst"
                        name="SGST"
                        label="SGST(%)"
                        variant="outlined"
                        style={{margin:15}}
                        onChange={handleChange}
                        />
                      <MuiPickersUtilsProvider utils={MomentUtils}>
                        <KeyboardDatePicker
                          name="dateOfExpiry"
                          style={{ marginTop: 8, width:230, marginLeft:20 }}
                          disableFuture
                          allowKeyboardControl
                          autoOk
                          inputVariant="outlined"
                          format="DD-MM-yyyy"
                          label="Date of Expiry"
                          views={["year", "month", "date"]}
                        />
                      </MuiPickersUtilsProvider>
                    <Box flexGrow={0.4} className={classes.customBox}>
                      <MuiPickersUtilsProvider utils={MomentUtils}>
                        <KeyboardDatePicker
                          name="dateOfManufacture"
                          style={{ marginTop: 8, width:230, marginRight:30, marginLeft:16 }}
                          disableFuture
                          allowKeyboardControl
                          autoOk
                          inputVariant="outlined"
                          format="DD-MM-yyyy"
                          label="Date of Manufacture"
                          views={["year", "month", "date"]}
                        />
                      </MuiPickersUtilsProvider>
                      <MuiPickersUtilsProvider utils={MomentUtils}>
                        <KeyboardDatePicker
                          name="recieptDate"
                          style={{ marginTop: 8, width:230 }}
                          disableFuture
                          allowKeyboardControl
                          autoOk
                          inputVariant="outlined"
                          format="DD-MM-yyyy"
                          label="Reciept Date"
                          views={["year", "month", "date"]}
                        />
                      </MuiPickersUtilsProvider>
                    </Box> 
                    <Divider />
                       <Button variant="contained" color="primary" size="small" className={classes.customBTN} style={{marginTop:15}} onClick={handleSubmitBtn} >
                          Add Reciept
                        </Button> 
                       <Button variant="contained" size="small" style={{marginLeft:60, marginTop:15, padding:14}}  onClick={history.goBack}>
                          Cancel
                        </Button> 
                          <Button variant="contained" color="primary" size="small" className={classes.customBTN} style={{marginTop:15, marginLeft:240}} component={Link} to="/app/main_store/finish_slip"> 
                              Finish Reciepts This Slip
                              </Button>
                              <Button variant="contained" color="primary" size="small" className={classes.customBTN} style={{marginTop:15}} onClick={ClearAllSlip} >
                              Clear This Slip
                            </Button>
                            <Button variant="contained" color="primary" size="small" className={classes.customBTN} style={{marginTop:15}} onClick={handlePrint} >
                              Print This Slip
                          </Button>
                    </Box>
                  </div>
                </form>
        <form id="formpatientdata" method="post" ref={ref}>
        <Box style={{ fontWeight: 'bold', textTransform: 'uppercase', marginLeft:15}} >Receipt Slip</Box>
          <Table aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.cellStyle}>#</TableCell>
                <TableCell className={classes.cellStyle}>Brand Name</TableCell>
                <TableCell className={classes.cellStyle}>Formulation</TableCell>
                <TableCell className={classes.cellStyle}>Quantity</TableCell>
                <TableCell className={classes.cellStyle}>Rate</TableCell>
                <TableCell className={classes.cellStyle}>Unit Price</TableCell>
                <TableCell className={classes.cellStyle}>Vat (%)</TableCell>
                <TableCell className={classes.cellStyle}>MRP</TableCell>
                <TableCell className={classes.cellStyle}>Batch No</TableCell>
                <TableCell className={classes.cellStyle}>CD (%)</TableCell>
                <TableCell className={classes.cellStyle}>CGST (%)</TableCell>
                <TableCell className={classes.cellStyle}>SGST (%)</TableCell>
                <TableCell className={classes.cellStyle}>Date Of Expiry</TableCell>
                <TableCell className={classes.cellStyle}>Total Amount</TableCell>
                <TableCell className={classes.cellStyle}>Amount After GST</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell className={classes.cellStyle}>1</TableCell>
                <TableCell className={classes.cellStyle} onClick={ClearSlip}>test</TableCell>
                <TableCell className={classes.cellStyle}>123</TableCell>
                <TableCell className={classes.cellStyle}>20</TableCell>
                <TableCell className={classes.cellStyle}>20</TableCell>
                <TableCell className={classes.cellStyle}>20</TableCell>
                <TableCell className={classes.cellStyle}>20</TableCell>
                <TableCell className={classes.cellStyle}>20</TableCell>
                <TableCell className={classes.cellStyle}>20</TableCell>
                <TableCell className={classes.cellStyle}>20</TableCell>
                <TableCell className={classes.cellStyle}>20</TableCell>
                <TableCell className={classes.cellStyle}>20</TableCell>
                <TableCell className={classes.cellStyle}>20/08/2022</TableCell>
                <TableCell className={classes.cellStyle}>20</TableCell>
                <TableCell className={classes.cellStyle}>20</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.cellStyle}>1</TableCell>
                <TableCell className={classes.cellStyle} onClick={ClearSlip}>test</TableCell>
                <TableCell className={classes.cellStyle}>123</TableCell>
                <TableCell className={classes.cellStyle}>20</TableCell>
                <TableCell className={classes.cellStyle}>20</TableCell>
                <TableCell className={classes.cellStyle}>20</TableCell>
                <TableCell className={classes.cellStyle}>20</TableCell>
                <TableCell className={classes.cellStyle}>20</TableCell>
                <TableCell className={classes.cellStyle}>20</TableCell>
                <TableCell className={classes.cellStyle}>20</TableCell>
                <TableCell className={classes.cellStyle}>20</TableCell>
                <TableCell className={classes.cellStyle}>20</TableCell>
                <TableCell className={classes.cellStyle}>20/08/2022</TableCell>
                <TableCell className={classes.cellStyle}>20</TableCell>
                <TableCell className={classes.cellStyle}>20</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </form>
      </CardContent>
     </Card>
    </div>
  </>  
   )
}
export default AddReceipt