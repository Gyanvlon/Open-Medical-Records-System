import React, { useEffect, useState, useRef } from "react";
import BillingNavbar from "../BillingNavbar";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import {
  makeStyles,
  LinearProgress,
  withStyles,
  Box,
  TextField,
  Checkbox,
} from "@material-ui/core/";
import styles from "./styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { DataGrid, GridOverlay } from "@material-ui/data-grid";
import { Alert } from "@material-ui/lab";
import { getAPI } from "../../../services/index";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import AddIcon from "@material-ui/icons/Add";
import VisibilityIcon from "@material-ui/icons/Visibility";
import BillingInvestigation from "../BillingInvestigation";
import { Link } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Avatar from "@material-ui/core/Avatar";
import { useReactToPrint } from "react-to-print";
import PersonAddRoundedIcon from "@material-ui/icons/PersonAddRounded";
import AccountCircleSharpIcon from "@material-ui/icons/AccountCircleSharp";
import swal from "sweetalert";
import { putAPI } from "../../../services";
import AddNewBillingTenderBills from "./AddNewBillingTenderBills";
import BillingTenderBillsViews from "./BillingTenderBillsViews";
// import AmbulanceBillsView from "./ambulanceBillsView";
// import AddAmbulanceBIlls from "./AddAmbulanceBill";

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


function BillingTenderBillsList(props) {
  const classes = useStyles();
  const ref = useRef();
  const { id } = props?.popupListData;
  const [addBillingTenderPopup, setAddBillingTenderPopup] = React.useState(false);
  const [billsData, setBillsData] = React.useState([]);
  const [biilingtableinfo, setBillingtableinfo] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [extrainfobill, setExtrainfobill] = React.useState([]);
  const [billinfodatainitial, setBillinfodatainitial] = useState([]);
  const [isdescrption, setIsdescrption] = React.useState(false);
  const [descrptionval, setdescrptionval] = React.useState("");
  const [errordes, setErrordesc] = React.useState(false);
  const [print, setPrint] = React.useState(false);
  const [voiddetails, setVoiddetails] = React.useState(false);
  const [checkissubmitted, setcheckissubmitted] = React.useState(false);
  useEffect(() => {
    //console.log(moment().format("DD-MM-YYYY"));
    async function fetchData() {
      try {
        const request = await getAPI(
          "/concept?q=General%20Ward&v=custom:(answers:(uuid,display,answers:(uuid,display,datatype:(display),synonyms:(display),answers:(uuid,display,datatype:(display),answers:(uuid,display,datatype:(display),answers:(uuid,display,datatype:(display)))))"
        );
        setBillsData(request.data.results[0].answers);
      } catch (err) {
        return null;
      }
    }
    fetchData();
  }, []);

  const createPatientList = (results) => {
    const patientList = results.map((result, index) => {
      //console.log(moment(result.birthDate).format());
      return {
        id: result.billId,
        description: result.comment ? result.comment : "N.A.",
        datebills: result.billingDate,
        voidby: result.voidedBy ? result.voidedBy : "N.A.",
      };
    });
    return patientList;
  };

  const handleClose = () => {
    setdescrptionval("");
    setIsdescrption(false);
    setOpen(false);
  };
  const handleAddInput = () => {
    setAddBillingTenderPopup(true);
  };
  const handlePrint = useReactToPrint({
    content: () => ref.current,
  });

  const getFilteredPatientList = (key) => {
    if (key.length >= 3) {
      const newitem = billinfodatainitial.filter((item) =>
        item.billId.toString().includes(key)
      );
      return newitem;
    } else {
      return billinfodatainitial;
    }
  };
  const CustomLoadingOverlay = () => {
    return (
      <GridOverlay>
        <div style={{ position: "absolute", top: 0, width: "100%" }}>
          <LinearProgress />
        </div>
      </GridOverlay>
    );
  };

  const CustomNoRowsOverlay = () => {
    return (
      <GridOverlay>
        <Alert severity="info">
          <strong>No records found.</strong>
        </Alert>
      </GridOverlay>
    );
  };

  const handleCommonAction = (paramid) => {
    console.log('paramid', paramid)
    setOpen(true);
    setBillingtableinfo(paramid);
  };
  // useEffect(() => {
  //   async function fetchbillingInfo() {
  //     try {
  //       const request = await getAPI(
  //         `/patientBillingInfoDetails/patient?patientUuid=${id}`
  //       );

  //       setBillinfodatainitial(request.data.billingInfoForPatient);
  //       const patientList = createPatientList(
  //         request.data.billingInfoForPatient
  //       );
  //       setBillingtableinfo(patientList);
  //     } catch (err) {
  //       return null;
  //     }
  //   }
  //   fetchbillingInfo();
  // }, [id, open]);

  const dummyRow = [
    {
      id: 1,
      slno: 1,
      bill_name: 'premmmmmm',
      checkin: 'yes'
    },
    {
      id: 2,
      slno: 2,
      bill_name: 'premmmmmm',
      checkin: 'yes'
    },
  ]
  // style={{ background: "#3EABC1", color: 'white' ,marginRight: 4}}

  const columns = [
    { field: "slno", headerName: "Sl No.", width: 130 },
    { field: "bill_name", headerName: "Bill Name", width: 500 },

    {
      field: "checkin",
      headerName: "Actions",
      type: "string",
      width: 300,
      renderCell: (cellValues) => {
        // console.log('cellValues', cellValues)
        return (
          <>
            <Button
              variant="outlined"
              color="#3EABC1"
              onClick={(e) => handleCommonAction(cellValues.row)}
              style={{ color: "#3EABC1", borderColor: '#3EABC1', marginRight: 4 }}

            >
              View
            </Button>
          </>
        );
      },
    },
  ];


  if (addBillingTenderPopup) {
    return (
      <AddNewBillingTenderBills
        billsData={billsData}
        patientData={[]}
      />
    )
  } else {
    return (
      <>
        <BillingNavbar></BillingNavbar>

        <Box display="flex" flexDirection="row" justifyContent="flex-end" style={{ marginTop: 6 }}>
          <Button
            variant="contained"
            className={classes.button}
            startIcon={<AddIcon />}
            color="secondary"
            onClick={handleAddInput}
            style={{ background: "#3EABC1", color: 'white' }}
          >
            Add new Tender bill
          </Button>
        </Box>
        <Paper style={{ marginTop: 4 }}>
          <Card className={classes.root}>
            <CardHeader
              title="List of Tender bills"
              className={classes.title}
              titleTypographyProps={{ variant: "body1" }}
              style={{ marginTop: 10 }}
            />
            <CardContent>
              <DataGrid
                rows={dummyRow}
                // rows={biilingtableinfo}
                columns={columns}
                autoHeight
                rowHeight={40}
                headerHeight={40}
                pageSize={10}
                // onCellClick={handleOpenBilling}
                components={{
                  LoadingOverlay: CustomLoadingOverlay,
                  NoRowsOverlay: CustomNoRowsOverlay,
                }}
              />
            </CardContent>
          </Card>
        </Paper>
        {open && <BillingTenderBillsViews setOpen={setOpen} open={open} biilingtableinfo={biilingtableinfo}/> }
      </>
    );
  }
}

export default BillingTenderBillsList;
