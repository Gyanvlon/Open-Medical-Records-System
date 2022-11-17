import React, { useState, useEffect } from "react";
import {TextField,makeStyles,Button,Box} from "@material-ui/core/";
import styles from "../Styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { useHistory, Link} from "react-router-dom";
import swal from "sweetalert";
import Icon from '@mui/material/Icon';

const useStyles = makeStyles(styles);
export default function IndentProcess() {
  const classes = useStyles();
  const history = useHistory();
  const onRefused = ()=>{
    swal({
        title: "Are you sure?",
        text: "Once Refused Indent, you will not be able to recover this Indent!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((value) => {
        if(value){
        swal({
         title: "Thank You",
        text: "Indent Clear Successfully",
        icon: "success",
        })
      }
    });
  }
    return (
      <>
        <Icon baseClassName="fas" className="fa-arrow-left" onClick={history.goBack}  />
          <div mt={2}>
            <Card >
             <Box className={classes.headerText} >Indent</Box>
              <CardContent>
                <form noValidate id="searchForm">
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexWrap: "wrap",
                      // justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom:"1%"
                    }}
                  >
                    <Box  className={classes.customBox} style={{marginLeft:15}}>
                     <p>Name: Name</p>
                     <p>From Store: Pharmacy</p>
                     <p>Created on: 20/10/2022</p>
                    </Box>
                  </div>
                </form>
              </CardContent>
              <Box style={{ fontWeight: 'bold', textTransform: 'uppercase', marginLeft:15}} >Process Indent 
              <Button variant="contained" color="primary" size="small" className={classes.customBTN} style={{marginTop:15, marginLeft:480}} component={Link} to="/app/main_store/drug_indent_detail"> 
                Transfer
                </Button>
                <Button variant="contained" color="primary" size="small" className={classes.customBTN} style={{marginTop:15}} onClick={onRefused} >
                Refused This Indent
            </Button>
            <Button variant="contained" color="primary" size="small" className={classes.customBTN} style={{marginTop:15}} onClick={history.goBack} >
                Return List
            </Button>
        </Box>
        <form id="formpatientdata" method="post">
          <Table aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Drug</TableCell>
                <TableCell>Formulation</TableCell>
                <TableCell>Quantity Indent</TableCell>
                <TableCell>Quantity Transfer</TableCell>
                <TableCell>Quantity Available</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>test</TableCell>
                <TableCell>formulation 1</TableCell>
                <TableCell>100</TableCell>
                <TableCell><TextField id="outlined-basic" variant="outlined"  style={{width:100}} /></TableCell>
                <TableCell>20</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2</TableCell>
                <TableCell>test</TableCell>
                <TableCell>formulation 2</TableCell>
                <TableCell>100</TableCell>
                <TableCell><TextField id="outlined-basic2" variant="outlined" style={{width:100}} /></TableCell>
                <TableCell>20</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </form>
       </Card>
      </div>    
      </>
    );
}
