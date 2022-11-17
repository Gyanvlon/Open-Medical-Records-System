import React, { useEffect, useState } from "react";
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
import { putAPI } from "../../../services";
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
function EditBill(props) {
  const classes = useStyles();

  const { patientData, extrainfobill, modalbillinfo } = props;
  //const initialfiterval = modalbillinfo.filter((item) => item.edited === false);
  const [filteredlist, setFilteredlist] = useState(modalbillinfo);
  const [isedited, setIsedited] = useState(false);
  // useEffect(() => {
  //   setFilteredlist());
  // }, []);
  // useEffect(() => {
  //   localStorage.setItem(localstorage_key_isedited, JSON.stringify(filteredlist));
  // }, [filteredlist]);
  const [ischecked, setIschecked] = React.useState([]);
  const [descrptionval, setdescrptionval] = React.useState("");
  const [issubmited, setIssubmited] = React.useState(false);
  const actualInitialamount = modalbillinfo.reduce((acc, item) => {
    if (item.actualAmount !== null) return acc + item.actualAmount;
  }, 0);

  const [initialamount, setInitialAmount] = React.useState(actualInitialamount);
  const [initialwaiver, setInitialWaiverPercentage] = React.useState(
    extrainfobill[0].waiverPercentage
  );
  const amountdeducted = (initialamount * initialwaiver) / 100;
  const newwaveamount = amountdeducted.toFixed();
  const leftamount = parseFloat(initialamount) - parseFloat(newwaveamount);

  const [netamountpayable, setNetamountpayable] = React.useState(leftamount);
  const initialamounttoreturn = modalbillinfo.filter(
    (item) => item.edited === true
  );
  const returnamountinitial = initialamounttoreturn.reduce((acc, item) => {
    return acc + item.actualAmount;
  }, 0);
  const [amounttoreturn, setAmounttoReturn] =
    React.useState(returnamountinitial);
  const [amounttobereturned, setAmounttoReturned] = React.useState(0);

  const handleChangecheckbox = (paramid) => {
    const newlist = [...filteredlist];

    const tofindid = newlist.find(
      (item) => item.patientServiceBillItemId === paramid
    );
    tofindid.edited = !tofindid.edited;

    setFilteredlist(newlist);

    const newdatachecklen = newlist.filter((item) => item.edited === false);
    const amounttoreturn = newlist.filter((item) => item.edited === true);
    setIschecked(amounttoreturn);
    const totalAmount = newdatachecklen.reduce((acc, item) => {
      return acc + item.actualAmount;
    }, 0);
    const returnamount = amounttoreturn.reduce((acc, item) => {
      return acc + item.actualAmount;
    }, 0);
    console.log(totalAmount);
    setInitialAmount(totalAmount);
    setAmounttoReturn(returnamount);
    setAmounttoReturned(returnamount);
    const amountdeducted = (totalAmount * initialwaiver) / 100;
    const newwaveamount = amountdeducted.toFixed();
    const leftamount = parseFloat(totalAmount) - parseFloat(newwaveamount);
    console.log("leftamount", leftamount.toFixed());
    setNetamountpayable(leftamount);
  };
  const handleWaiverChange = (e) => {
    setInitialWaiverPercentage(e.target.value);
    const { value } = e.target;
    const newinitialamount = initialamount;
    const amountdeducted = (newinitialamount * value) / 100;
    const newwaveamount = amountdeducted.toFixed();
    console.log(newwaveamount);
    const leftamount = parseFloat(newinitialamount) - parseFloat(newwaveamount);
    console.log("leftamount", leftamount.toFixed());
    setNetamountpayable(leftamount);
  };
  const handleDescriptionChange = (e) => {
    setdescrptionval(e.target.value);
    // if (e.target.value !== "") {
    //   setErrordesc(true);
    // } else {
    //   setErrordesc(false);
    // }
  };
  const handleEditCheck = async (e) => {
    e.preventDefault();
    setIsedited(false);
    const getidarray = ischecked.map((item) => item.patientServiceBillItemId);

    const endpoint = "/patient-bill-edit/edit";
    const data = {
      billId: extrainfobill[0].billId,
      amount: netamountpayable,
      removableBillItemIds: [...getidarray],
      waiverPercentage: initialwaiver,
      amountToBeReturned: amounttoreturn,
      comment: descrptionval,
    };

    try {
      const getdata = await putAPI(endpoint, data);

      if (getdata !== null) {
        swal("Success", "Succesfully Edited  the service", "success").then(
          () => {
            // const newlist = [...filteredlist];
            // const tofindid = newlist.filter((item) => item.edited === false);

            // setFilteredlist(tofindid);
            setIsedited(true);
            setIssubmited(true);
            props.checkissubmitted(true);
          }
        );
      }
    } catch (e) {
      swal("Error!", "Cannot edited the services", "error");
      setIsedited(false);
    }

    // swal({
    //   title: "Are you sure want to Edit Bill",
    //   text: "Please choose your option from below",
    //   icon: "warning",
    //   buttons: true,
    //   dangerMode: true,
    // }).then(async (willDelete) => {
    //   if (willDelete) {
    //     try {
    //       const getdata = await putAPI(endpoint, data);

    //       if (getdata !== null) {
    //         swal("Success", "Succesfully Edited  the service", "success").then(
    //           () => {
    //             setOpen(false);
    //             setIschecked([]);
    //           }
    //         );
    //       }
    //     } catch (e) {}
    //   } else {
    //   }
    // });
  };
  return (
    <>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell style={{ padding: 6, width: "10%" }}>
              Select
            </StyledTableCell>
            <StyledTableCell style={{ padding: 6, width: "10%" }}>
              Sl No.
            </StyledTableCell>
            <StyledTableCell style={{ padding: 6, width: "25%" }}>
              Service Name
            </StyledTableCell>
            <StyledTableCell style={{ padding: 6, width: "20%" }}>
              Quantity
            </StyledTableCell>
            <StyledTableCell style={{ padding: 6, width: "20%" }}>
              Price(Rs)
            </StyledTableCell>
            <StyledTableCell style={{ padding: 6, width: "30%" }}>
              Amount
            </StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {filteredlist.length > 0 ? (
            filteredlist.map((row, index) => (
              <StyledTableRow key={row.patientServiceBillItemId}>
                <StyledTableCell style={{ padding: 6 }}>
                  <Checkbox
                    checked={row.edited === false ? false : true}
                    onChange={() => {
                      handleChangecheckbox(row.patientServiceBillItemId);
                    }}
                    inputProps={{
                      "aria-label": "primary checkbox",
                    }}
                  />
                </StyledTableCell>
                <StyledTableCell
                  component="th"
                  scope="row"
                  style={{ padding: 6 }}
                  className={
                    row.edited === false
                      ? classes.successColor
                      : classes.errorColor
                  }
                >
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell
                  style={{ padding: 6 }}
                  className={
                    row.edited === false
                      ? classes.successColor
                      : classes.errorColor
                  }
                >
                  {row.name}
                </StyledTableCell>
                <StyledTableCell
                  style={{ padding: 6 }}
                  className={
                    row.edited === false
                      ? classes.successColor
                      : classes.errorColor
                  }
                >
                  {row.edited === true ? (
                    row.quantity
                  ) : (
                    <strong>{row.quantity}</strong>
                  )}
                </StyledTableCell>
                <StyledTableCell
                  style={{ padding: 6 }}
                  className={
                    row.edited === false
                      ? classes.successColor
                      : classes.errorColor
                  }
                >
                  {row.amount}
                </StyledTableCell>
                <StyledTableCell
                  style={{ padding: 6 }}
                  className={
                    row.edited === false
                      ? classes.successColor
                      : classes.errorColor
                  }
                >
                  {row.actualAmount}
                </StyledTableCell>
              </StyledTableRow>
            ))
          ) : (
            // <Box
            //   display="flex"
            //   flexDirection="row"
            //   justifyContent="center"
            //   alignItems="center"
            // >
            //   <span>No Items to Edit</span>
            // </Box>
            <StyledTableRow>
              <StyledTableCell
                style={{ padding: 6, textAlign: "center" }}
                colspan="6"
              >
                <strong>No Items to Edit</strong>
              </StyledTableCell>
            </StyledTableRow>
          )}
          {filteredlist.length > 0 ? (
            <>
              <StyledTableRow>
                <StyledTableCell style={{ padding: 6 }}></StyledTableCell>
                <StyledTableCell style={{ padding: 6 }}></StyledTableCell>
                <StyledTableCell style={{ padding: 6 }}></StyledTableCell>
                <StyledTableCell style={{ padding: 6 }}></StyledTableCell>
                <StyledTableCell style={{ padding: 6 }}>
                  {" "}
                  <strong>Total</strong>
                </StyledTableCell>
                <StyledTableCell style={{ padding: 8 }}>
                  {" "}
                  <strong>{initialamount}</strong>
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell style={{ padding: 6 }}></StyledTableCell>
                <StyledTableCell style={{ padding: 6 }}></StyledTableCell>
                <StyledTableCell style={{ padding: 6 }}></StyledTableCell>
                <StyledTableCell style={{ padding: 6 }}></StyledTableCell>
                <StyledTableCell style={{ padding: 6 }}>
                  {" "}
                  <strong>Wavier(%)</strong>
                </StyledTableCell>
                <StyledTableCell style={{ padding: 6 }}>
                  <TextField
                    id="waiverper"
                    variant="outlined"
                    size="small"
                    name="waiverper"
                    value={initialwaiver}
                    onChange={handleWaiverChange}
                    type="number"
                  />
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell style={{ padding: 6 }}></StyledTableCell>
                <StyledTableCell style={{ padding: 6 }}></StyledTableCell>
                <StyledTableCell style={{ padding: 6 }}></StyledTableCell>
                <StyledTableCell style={{ padding: 6 }}></StyledTableCell>
                <StyledTableCell style={{ padding: 6 }}>
                  {" "}
                  <strong>Net Amount Payable</strong>
                </StyledTableCell>
                <StyledTableCell style={{ padding: 8 }}>
                  {" "}
                  <strong>{netamountpayable}</strong>
                </StyledTableCell>
              </StyledTableRow>
              {!issubmited && (
                <StyledTableRow>
                  <StyledTableCell style={{ padding: 6 }}></StyledTableCell>
                  <StyledTableCell style={{ padding: 6 }}></StyledTableCell>
                  <StyledTableCell style={{ padding: 6 }}></StyledTableCell>
                  <StyledTableCell style={{ padding: 6 }}></StyledTableCell>
                  <StyledTableCell style={{ padding: 6 }}>
                    <strong> Amount to be Returned</strong>
                  </StyledTableCell>
                  <StyledTableCell style={{ padding: 6 }}>
                    {" "}
                    {amounttobereturned}
                  </StyledTableCell>
                </StyledTableRow>
              )}
              {issubmited && (
                <StyledTableRow>
                  <StyledTableCell style={{ padding: 6 }}></StyledTableCell>
                  <StyledTableCell style={{ padding: 6 }}></StyledTableCell>
                  <StyledTableCell style={{ padding: 6 }}></StyledTableCell>
                  <StyledTableCell style={{ padding: 6 }}></StyledTableCell>
                  <StyledTableCell style={{ padding: 6 }}>
                    {" "}
                    <strong>Amount Returned</strong>
                  </StyledTableCell>
                  <StyledTableCell style={{ padding: 6 }}>
                    {" "}
                    <strong>{amounttoreturn}</strong>
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </>
          ) : null}
        </TableBody>
      </Table>
      {ischecked.length && !issubmited ? (
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          marginY={1}
        >
          <span>
            <strong>Comment : </strong>
          </span>
          <TextField
            id="comment"
            name="comment"
            variant="outlined"
            className={classes.field}
            size="small"
            value={descrptionval}
            onChange={handleDescriptionChange}
            error={descrptionval === "" ? true : false}
            helperText={descrptionval === "" ? "This field is tequired" : ""}
          />
        </Box>
      ) : null}
      {filteredlist.length && !issubmited ? (
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
        >
          <Button
            variant="contained"
            color="Primary"
            style={{ marginTop: 4 }}
            disabled={
              ischecked.length ? (descrptionval === "" ? true : false) : false
            }
            onClick={handleEditCheck}
          >
            Submit
          </Button>
        </Box>
      ) : null}
    </>
  );
}

export default EditBill;
