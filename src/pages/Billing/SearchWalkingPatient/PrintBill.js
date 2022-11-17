import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {
  makeStyles,
  LinearProgress,
  withStyles,
  Box,
  Button,
  TextField,
  Checkbox,
  Typography,
} from "@material-ui/core/";
import styles from "./styles";
import swal from "sweetalert";
import { getAPI } from "../../../services";
import Collapse from "@material-ui/core/Collapse";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import IconButton from "@material-ui/core/IconButton";
const useStyles = makeStyles(styles);
const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  strikeCommon: {
    textDecoration: "line-through",
  },
  successColor: {
    color: "green",
  },
  errorColor: {
    color: "red",
  },
});
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

function PrintBill(props) {
  const classes = useStyles();
  //   console.log(props);
  const { extrainfobill, patientData } = props;
  const billId = extrainfobill[0].billId;
  const patientId = patientData.id;
  const [billinginfo, setBillingInfo] = useState("");
  const [servicedetails, setServiceDetails] = useState("");
  const [isedited, setIsedited] = useState("");
  const [arraynewval, setArraynewval] = useState([]);
  const [answersdata, setAnswersdata] = React.useState([]);
  const [finalanswerdata, setFinalanswerdata] = React.useState([]);
  useEffect(() => {
    const getPrintParticularId = async () => {
      const response = await getAPI(`/
    patientBillingInfoDetails/patient?patientUuid=${patientId}&billId=${billId}
    `);
      //   console.log(response.data);
      if (response.data !== null) {
        setBillingInfo(response.data.billingInfoForPatient);

        setIsedited(response.data.billingInfoForPatient[0].edited);
        const filtertrueitem =
          response.data.billingInfoForPatient[0].patientServiceBillItemInfo.filter(
            (item) => item.edited === false
          );

        if (response.data.billingInfoForPatient[0].edited === true) {
          if (filtertrueitem !== null) {
            setServiceDetails(filtertrueitem);
            const datafin = filtertrueitem.map(
              (item) => item.parentServicesName
            );
            setArraynewval(datafin);
            console.log(filtertrueitem);
            const newdata = filtertrueitem.reduce(
              (acc, item, currentIndex, arr) => {
                if (acc[item.parentServicesName]) {
                  acc[item.parentServicesName] = ++acc[item.parentServicesName];
                } else {
                  acc[item.parentServicesName] = 1;
                }
                return acc;
              },
              {}
            );
            setFinalanswerdata(Object.keys(newdata));
          }
        } else {
          setServiceDetails(
            response.data.billingInfoForPatient[0].patientServiceBillItemInfo
          );
          const datafin =
            response.data.billingInfoForPatient[0].patientServiceBillItemInfo.map(
              (item) => item.parentServicesName
            );
          setArraynewval(datafin);
          const newdata =
            response.data.billingInfoForPatient[0].patientServiceBillItemInfo.reduce(
              (acc, item, currentIndex, arr) => {
                if (acc[item.parentServicesName]) {
                  acc[item.parentServicesName] = ++acc[item.parentServicesName];
                } else {
                  acc[item.parentServicesName] = 1;
                }
                return acc;
              },
              {}
            );
          setFinalanswerdata(Object.keys(newdata));
        }
      }
    };

    getPrintParticularId();
    async function fetchData() {
      try {
        const request = await getAPI(
          "/concept?q=General%20Ward&v=custom:(answers:(uuid,display,answers:(uuid,display,datatype:(display),synonyms:(display),answers:(uuid,display,datatype:(display),answers:(uuid,display,datatype:(display),answers:(uuid,display,datatype:(display)))))"
        );
        setAnswersdata(request.data.results[0].answers);
        console.log(request.data.results[0].answers);
      } catch (err) {
        return null;
      }
    }
    fetchData();
  }, []);
  function createData(name) {
    // return {
    //   name,
    //   history: [
    //     { date: "2020-01-05", customerId: "11091700", amount: 3 },
    //     { date: "2020-01-02", customerId: "Anonymous", amount: 1 },
    //   ],
    // };
  }

  function Row(props) {
    const { row, servicecheck } = props;
    const [open, setOpen] = React.useState(true);
    const classes = useRowStyles();
    console.log("servicecheck", servicecheck);
    const newfilterdata = servicecheck.filter(
      (item) => item.parentServicesName === row
    );
    return (
      <React.Fragment>
        <TableRow className={classes.root}>
          <TableCell style={{ padding: 0 }}>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row" style={{ paddingLeft: 0 }}>
            <Typography variant="h6" gutterBottom component="div">
              {" "}
              {row}{" "}
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                {/* <Typography variant="h6" gutterBottom component="div">
                History
              </Typography> */}
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ width: "25%" }}>
                        Service Name
                      </TableCell>
                      <TableCell style={{ width: "25%" }}> Quantity</TableCell>
                      <TableCell align="right" style={{ width: "25%" }}>
                        {" "}
                        Price(Rs)
                      </TableCell>
                      <TableCell align="right" style={{ width: "25%" }}>
                        Amount
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {newfilterdata.map((historyRow) => (
                      <TableRow
                        key={historyRow.date}
                        className={
                          extrainfobill[0].billVoided === false
                            ? ""
                            : classes.strikeCommon
                        }
                      >
                        <TableCell component="th" scope="row">
                          {historyRow.name}
                        </TableCell>
                        <TableCell>{historyRow.quantity}</TableCell>
                        <TableCell align="right">{historyRow.amount}</TableCell>
                        <TableCell align="right">
                          {historyRow.actualAmount}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  const rows = [...finalanswerdata];
  console.log("rows@@@@", rows);
  return (
    <>
      <Table className={classes.table} aria-label="customized table">
        {/* <TableHead>
          <TableRow>
            <StyledTableCell style={{ padding: 6, width: "20%" }}>
              Location
            </StyledTableCell>
            <StyledTableCell style={{ padding: 6, width: "20%" }}>
              Sl No.
            </StyledTableCell>
            <StyledTableCell style={{ padding: 6, width: "20%" }}>
              Service Name
            </StyledTableCell>
            <StyledTableCell style={{ padding: 6, width: "20%" }}>
              Quantity
            </StyledTableCell>
            <StyledTableCell style={{ padding: 6, width: "20%" }}>
              Price(Rs)
            </StyledTableCell>
            <StyledTableCell style={{ padding: 6, width: "20%" }}>
              Amount
            </StyledTableCell>
          </TableRow>
        </TableHead> */}
        <TableBody>
          {/* {servicedetails.length > 0
            ? servicedetails.map((row, index) => (
                <Row
                  key={row.patientServiceBillItemId}
                  row={row.parentServicesName}
                  actualrowval={row}
                />
              ))
            : null} */}
          {/* {servicedetails.length > 0
            ? servicedetails.map((row, index) => (
                <>
                  <StyledTableRow>
                    <StyledTableCell style={{ padding: 8 }} colSpan={6}>
                      <strong>{row.parentServicesName}</strong>
                    </StyledTableCell>
                  </StyledTableRow>
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
                      style={{ padding: 6 }}
                    ></StyledTableCell>
                    <StyledTableCell style={{ padding: 6 }}>
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell style={{ padding: 6 }}>
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell style={{ padding: 6 }}>
                      {row.quantity}
                    </StyledTableCell>
                    <StyledTableCell style={{ padding: 6 }}>
                      {row.amount}
                    </StyledTableCell>
                    <StyledTableCell style={{ padding: 6 }}>
                      {row.actualAmount}
                    </StyledTableCell>
                  </StyledTableRow>
                </>
              ))
            : null}

          <StyledTableRow
            className={
              extrainfobill[0].billVoided === false ? "" : classes.strikeCommon
            }
          >
            <StyledTableCell colSpan={4}></StyledTableCell>

            <StyledTableCell style={{ padding: 6 }}>
              <strong>Waiver (%)</strong>
            </StyledTableCell>
            <StyledTableCell style={{ padding: 6 }}>
              <strong>{extrainfobill[0].waiverPercentage} </strong>
            </StyledTableCell>
          </StyledTableRow>

          <StyledTableRow
            className={
              extrainfobill[0].billVoided === false ? "" : classes.strikeCommon
            }
          >
            <StyledTableCell colSpan={4}></StyledTableCell>

            <StyledTableCell style={{ padding: 6 }}>
              <strong>Amount Returned</strong>
            </StyledTableCell>
            <StyledTableCell style={{ padding: 6 }}>
              <strong>{extrainfobill[0].amountReturned} </strong>
            </StyledTableCell>
          </StyledTableRow> */}
          {rows.map((row) => (
            <Row key={row} row={row} servicecheck={servicedetails} />
          ))}

          <TableRow
            className={
              extrainfobill[0].billVoided === false ? "" : classes.strikeCommon
            }
          >
            <TableCell></TableCell>
            <TableCell></TableCell>

            <TableCell align="right">
              <strong>Waiver (%)</strong>
            </TableCell>
            <TableCell align="right">
              <strong>{extrainfobill[0].waiverPercentage} </strong>
            </TableCell>
          </TableRow>

          <TableRow
            className={
              extrainfobill[0].billVoided === false ? "" : classes.strikeCommon
            }
          >
            <TableCell></TableCell>
            <TableCell></TableCell>

            <TableCell align="right">
              <strong>Amount Returned</strong>
            </TableCell>
            <TableCell align="right">
              <strong>{extrainfobill[0].amountReturned} </strong>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}

export default PrintBill;
