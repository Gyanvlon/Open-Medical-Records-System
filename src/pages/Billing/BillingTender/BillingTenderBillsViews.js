import React, { useEffect, useState, useRef } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Avatar from "@material-ui/core/Avatar";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Grid from "@material-ui/core/Grid";
import AccountCircleSharpIcon from "@material-ui/icons/AccountCircleSharp";
import TableRow from "@material-ui/core/TableRow";
import { useReactToPrint } from "react-to-print";

import {
    makeStyles,
    LinearProgress,
    withStyles,
    Box,
    Button,
    TextField,
    Checkbox,
  } from "@material-ui/core/";
  import styles from "./styles";
  import swal from "sweetalert";


  const useStyles = makeStyles(styles);
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#3f51b5",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);
const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
const localstorage_key_isedited = "isedited";


export default function BillingTenderBillsViews({setOpen,open,biilingtableinfo}) {
  const ref = useRef();
  const classes = useStyles();
  const handlePrint = useReactToPrint({
    content: () => ref.current,
  });
    return (
        <form >
            <Dialog
                maxWidth="xl"
                open={open}
                fullWidth
                onClose={()=>setOpen(!open)}
                // fullScreen
                aria-labelledby="max-width-dialog-title"
            >
                <DialogTitle
                    id="max-width-dialog-title"
                    style={{ padding: "5px 24px" }}
                >
                    <h4 style={{ textAlign: "center" }}>
                        <AccountCircleSharpIcon fontSize="large" />
                        Tender Billing Details
                    </h4>
                </DialogTitle>
                <DialogContent dividers ref={ref}>
                    <Card variant="outlined">
                        <CardContent style={{ backgroundColor: "#ecf6ff" }}>
                            <div style={{ width: "100%", marginTop: 10 }}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12} sm={2}>
                                        Driver Id :<strong>{biilingtableinfo?.identifier}</strong>
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        Driver name :
                                        <strong>
                                            {biilingtableinfo?.patientName?.toUpperCase()}
                                        </strong>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        Date : <strong>{biilingtableinfo?.gender}</strong>
                                    </Grid>
                                    <Grid item xs={12} sm={1}>
                                        Bill ID : <strong>{biilingtableinfo?.age}</strong>
                                    </Grid>
                                </Grid>
                            </div>
                        </CardContent>
                    </Card>

                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow >

                                <StyledTableCell style={{ padding: 6, width: "12%", background: "#3EABC1", color: 'white' }}>
                                    Sl No.
                                </StyledTableCell>
                                <StyledTableCell style={{ padding: 6, width: "12%", background: "#3EABC1", color: 'white' }}>
                                    Ambulance Name
                                </StyledTableCell>
                                <StyledTableCell style={{ padding: 6, width: "12%", background: "#3EABC1", color: 'white' }}>
                                    Patient Name
                                </StyledTableCell>
                                <StyledTableCell style={{ padding: 6, width: "12%", background: "#3EABC1", color: 'white' }}>
                                    Receipt Number
                                </StyledTableCell>
                                <StyledTableCell style={{ padding: 6, width: "12%", background: "#3EABC1", color: 'white' }}>
                                    Number Of trip
                                </StyledTableCell>
                                <StyledTableCell style={{ padding: 6, width: "15%", background: "#3EABC1", color: 'white' }}>
                                    Origin
                                </StyledTableCell>
                                <StyledTableCell style={{ padding: 6, width: "12%", background: "#3EABC1", color: 'white' }}>
                                    Destination
                                </StyledTableCell>
                                <StyledTableCell style={{ padding: 6, width: "15%", background: "#3EABC1", color: 'white' }}>
                                    Amount
                                </StyledTableCell>
                                <StyledTableCell style={{ padding: 6, width: "15%", background: "#3EABC1", color: 'white' }}>
                                    Total
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            <StyledTableRow >
                                <StyledTableCell style={{ padding: 12 }}>  fsefwef </StyledTableCell>
                                <StyledTableCell style={{ padding: 12 }}>  fsefwef </StyledTableCell>
                                <StyledTableCell style={{ padding: 12 }}>  fsefwef </StyledTableCell>
                                <StyledTableCell style={{ padding: 12 }}>  <strong>1000</strong> </StyledTableCell>
                                <StyledTableCell style={{ padding: 12 }}>  fsefwef </StyledTableCell>
                                <StyledTableCell style={{ padding: 12 }}>  fsefwef </StyledTableCell>
                                <StyledTableCell style={{ padding: 12 }}>  fsefwef </StyledTableCell>
                                <StyledTableCell style={{ padding: 12 }}>  fsefwef </StyledTableCell>
                                <StyledTableCell style={{ padding: 12 }}>  <strong>1000</strong> </StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                    </Table>
                </DialogContent>

                <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="center"
                    alignItems="center"
                    p={2}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ background: "#3EABC1", color: 'white' }}
                    >
                        Print
                    </Button>
                </Box>
            </Dialog>
        </form>
    )
}
