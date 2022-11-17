import React from "react";
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
  TextField,
  Checkbox,
} from "@material-ui/core/";
import styles from "./styles";
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
function VoidBill(props) {
  const classes = useStyles();
  console.log(props);
  const { patientData, extrainfobill, modalbillinfo } = props;
  //const ref = useRef();
  return (
    <Table className={classes.table} aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell style={{ padding: 6, width: "10%" }}>
            Sl No.
          </StyledTableCell>
          <StyledTableCell style={{ padding: 6, width: "25%" }}>
            Service Name
          </StyledTableCell>
          <StyledTableCell style={{ padding: 6, width: "20%" }}>
            Quantity
          </StyledTableCell>
          <StyledTableCell style={{ padding: 6, width: "30%" }}>
            Price(Rs)
          </StyledTableCell>
          <StyledTableCell style={{ padding: 6, width: "20%" }}>
            Amount
          </StyledTableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {modalbillinfo.length > 0 ? (
          modalbillinfo.map((row, index) => (
            <>
              <StyledTableRow
                key={row.patientServiceBillItemId}
                className={
                  extrainfobill[0].billVoided === false
                    ? ""
                    : classes.strikeCommon
                }
              >
                <StyledTableCell
                  component="th"
                  scope="row"
                  style={{ padding: 8 }}
                >
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell style={{ padding: 8 }}>
                  <strong>{row.name}</strong>
                </StyledTableCell>
                <StyledTableCell style={{ padding: 8 }}>
                  {" "}
                  {row.quantity}
                </StyledTableCell>
                <StyledTableCell style={{ padding: 8 }}>
                  {row.amount}
                </StyledTableCell>
                <StyledTableCell style={{ padding: 8 }}>
                  {row.actualAmount}
                </StyledTableCell>
              </StyledTableRow>
            </>
          ))
        ) : (
          <div style={{ width: "100%" }}>
            <Box
              display="flex"
              justifyContent="center"
              m={1}
              p={1}
              bgcolor="background.paper"
            >
              <Box p={1} bgcolor="grey.300">
                No Records Found
              </Box>
            </Box>
          </div>
        )}
        <StyledTableRow
          className={
            extrainfobill[0].billVoided === false ? "" : classes.strikeCommon
          }
        >
          <StyledTableCell style={{ padding: 8 }}></StyledTableCell>
          <StyledTableCell style={{ padding: 8 }}></StyledTableCell>
          <StyledTableCell style={{ padding: 8 }}></StyledTableCell>
          <StyledTableCell style={{ padding: 8 }}>
            {" "}
            <strong>Total</strong>
          </StyledTableCell>
          <StyledTableCell style={{ padding: 8 }}>
            {" "}
            <strong>{extrainfobill[0].actualAmount} </strong>
          </StyledTableCell>
        </StyledTableRow>
        {props.isdescrption ? (
          <StyledTableRow>
            <StyledTableCell style={{ padding: 8 }}></StyledTableCell>
            <StyledTableCell style={{ padding: 8 }}></StyledTableCell>
            <StyledTableCell style={{ padding: 8 }}></StyledTableCell>
            <StyledTableCell style={{ padding: 8 }}>
              {" "}
              <strong>
                {" "}
                {props.checkissubmitted
                  ? "Amount Returned"
                  : "Amount to be Returned"}
              </strong>
            </StyledTableCell>
            <StyledTableCell style={{ padding: 8 }}>
              {" "}
              <strong> {extrainfobill[0].actualAmount} </strong>
            </StyledTableCell>
          </StyledTableRow>
        ) : null}
        {/* {props.checkissubmitted && (
          <StyledTableRow>
            <StyledTableCell style={{ padding: 8 }}></StyledTableCell>
            <StyledTableCell style={{ padding: 8 }}></StyledTableCell>
            <StyledTableCell style={{ padding: 8 }}></StyledTableCell>
            <StyledTableCell style={{ padding: 8 }}>
              {" "}
              <strong>Amount Returned</strong>
            </StyledTableCell>
            <StyledTableCell style={{ padding: 8 }}>
              {" "}
              <strong> {extrainfobill[0].actualAmount} </strong>
            </StyledTableCell>
          </StyledTableRow>
        )} */}

        {/* <StyledTableRow>
          <StyledTableCell style={{ padding: 8 }}></StyledTableCell>
          <StyledTableCell style={{ padding: 8 }}></StyledTableCell>
          <StyledTableCell style={{ padding: 8 }}></StyledTableCell>
          <StyledTableCell style={{ padding: 8 }}>
            {" "}
            <strong> Waiver Percentage</strong>
          </StyledTableCell>
          <StyledTableCell style={{ padding: 8 }}>
            {" "}
            <strong> {extrainfobill[0].waiverPercentage} </strong>
          </StyledTableCell>
        </StyledTableRow> */}
      </TableBody>
    </Table>
  );
}

export default VoidBill;
