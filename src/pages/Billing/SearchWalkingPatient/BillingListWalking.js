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
import { useParams } from "react-router-dom";
import styles from "./styles";
import { TestOrderDetails } from "../../../services/data";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { DataGrid, GridOverlay } from "@material-ui/data-grid";
import { Alert } from "@material-ui/lab";
import ProcedureInvestigationOrder from "../ProcedureInvestigationOrder";
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
import VoidBill from "./VoidBill";
import EditBill from "./EditBill";
import PrintBill from "./PrintBill";
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
function BillingListWalking(props) {
  const classes = useStyles();
  const ref = useRef();
  const patientData = props.patientData;
  const { id } = props.patientData;
  const [openinvestigation, setOpeninvestigation] = React.useState(false);
  const [answersdata, setAnswersdata] = React.useState([]);
  const [biilingtableinfo, setBillingtableinfo] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [modalbillinfo, setModalbillinfo] = React.useState([]);
  const [extrainfobill, setExtrainfobill] = React.useState([]);
  const [billinfodatainitial, setBillinfodatainitial] = useState([]);
  const [isvoidcheck, setisvoidCheck] = React.useState(false);
  const [isdescrption, setIsdescrption] = React.useState(false);
  const [descrptionval, setdescrptionval] = React.useState("");
  const [errordes, setErrordesc] = React.useState(false);
  const [print, setPrint] = React.useState(false);
  const [editcheck, setEditcheck] = React.useState(false);
  const [voiddetails, setVoiddetails] = React.useState(false);
  const [checkissubmitted, setcheckissubmitted] = React.useState(false);
  const [paramchange, setParamchange] = React.useState(false);
  const [iseditsubmitted, setIseditsubmitted] = React.useState(false);
  useEffect(() => {
    //console.log(moment().format("DD-MM-YYYY"));
    async function fetchData() {
      try {
        const request = await getAPI(
          "/concept?q=General%20Ward&v=custom:(answers:(uuid,display,answers:(uuid,display,datatype:(display),synonyms:(display),answers:(uuid,display,datatype:(display),answers:(uuid,display,datatype:(display),answers:(uuid,display,datatype:(display)))))"
        );
        setAnswersdata(request.data.results[0].answers);
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
    setOpeninvestigation(true);
  };
  const handlePrint = useReactToPrint({
    content: () => ref.current,
    //onAfterPrint: () => handleClose()
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
  const handleCommonAction = (paramtype, e, paramid) => {
    const newdataBill = billinfodatainitial.filter(
      (item) => item.billId === paramid
    );

    setExtrainfobill(newdataBill);
    setModalbillinfo(newdataBill[0].patientServiceBillItemInfo);
    console.log("ggggggccc", newdataBill);
    if (paramtype === "view") {
      setPrint(true);
      setVoiddetails(false);
      setEditcheck(false);
      setOpen(true);
      setParamchange("view");
    } else if (paramtype === "void") {
      setParamchange("void");
      if (newdataBill[0].billVoided === true) {
        setOpen(false);
        swal(
          "Sorry Cannot be voided",
          "This bill is already Voided Previously",
          "warning"
        );
        // e.preventDefault();
      } else {
        swal({
          title: "Are you sure want to Void bill?",
          text: "Please choose your option from below",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            setPrint(false);
            setVoiddetails(true);
            setEditcheck(false);
            setOpen(true);
          } else {
            setOpen(false);
          }
        });
      }
    } else {
      setParamchange("edit");
      if (newdataBill[0].billVoided === true) {
        setOpen(false);
        e.preventDefault();
        swal(
          "Sorry",
          "Cannot be Edited As Bill is already being Voided",
          "warning"
        );
      } else {
        if (newdataBill[0].edited === true) {
          setOpen(false);
          swal(
            "Sorry",
            "Cannot be Edited As Bill is already edited previously",
            "warning"
          );
          e.preventDefault();
        } else {
          setVoiddetails(false);
          setPrint(false);
          setEditcheck(true);
          setOpen(true);
        }
      }
    }
  };
  useEffect(() => {
    async function fetchbillingInfo() {
      try {
        const request = await getAPI(
          `/patientBillingInfoDetails/patient?patientUuid=${id}`
        );

        setBillinfodatainitial(request.data.billingInfoForPatient);
        const patientList = createPatientList(
          request.data.billingInfoForPatient
        );
        setBillingtableinfo(patientList);
      } catch (err) {
        return null;
      }
    }
    fetchbillingInfo();
  }, [id, open]);
  const columns = [
    { field: "id", headerName: "BilllId", width: 130 },
    { field: "description", headerName: "Description", width: 250 },
    {
      field: "datebills",
      headerName: "Date",
      width: 250,
    },
    {
      field: "voidby",
      headerName: "Voided By",
      width: 150,
    },
    {
      field: "checkin",
      headerName: "Actions",
      type: "string",
      width: 250,
      renderCell: (cellValues) => {
        return (
          <>
            <Button
              variant="outlined"
              color="primary"
              onClick={(e) => handleCommonAction("void", e, cellValues.row.id)}
              style={{ marginRight: 4 }}
            >
              Void
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={(e) => handleCommonAction("view", e, cellValues.row.id)}
              style={{ marginRight: 4 }}
            >
              View
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={(e) => handleCommonAction("edit", e, cellValues.row.id)}
            >
              Edit
            </Button>
          </>
        );
      },
    },
  ];

  const handleVoidBillChange = () => {
    setIsdescrption(true);
    setErrordesc(false);
  };
  const handleDescriptionChange = (e) => {
    setdescrptionval(e.target.value);
    if (e.target.value !== "") {
      setErrordesc(true);
    } else {
      setErrordesc(false);
    }
  };
  const handleSubmitVoidcheck = async (e) => {
    e.preventDefault();

    const endpoint = "/patient-bill-edit/void";
    const data = {
      billId: extrainfobill[0].billId,
      amount: extrainfobill[0].amountPayable,
      amountToBeReturned: extrainfobill[0].amountReturned,
      comment: descrptionval,
    };
    try {
      const getdata = await putAPI(endpoint, data);

      if (getdata !== null) {
        setVoiddetails(false);
        setcheckissubmitted(true);
        swal("Good job!", "Voided the Bill Successfully", "success").then(
          () => {
            setOpen(false);
          }
        );
      }
      const datafetch = getdata.data;
      const voidchecknew = datafetch.voided;
    } catch (e) {}
  };

  if (openinvestigation) {
    return (
      <BillingInvestigation
        answersdata={answersdata}
        patientData={props.patientData}
      />
    );
  } else {
    return (
      <>
        <BillingNavbar></BillingNavbar>

        <Box display="flex" flexDirection="row" justifyContent="flex-end">
          <Button
            variant="contained"
            className={classes.button}
            startIcon={<AddIcon />}
            color="secondary"
            onClick={handleAddInput}
          >
            Add New
          </Button>
        </Box>
        <Paper style={{ marginTop: 4 }}>
          <Card className={classes.root}>
            <CardHeader
              title="List Of Bills"
              className={classes.title}
              titleTypographyProps={{ variant: "body1" }}
              style={{ marginTop: 10 }}
            />
            <CardContent>
              <DataGrid
                rows={biilingtableinfo}
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
        {open && (
          // <VoidBill
          //   open={setOpen}
          //   onClose={handleClose}
          //   patientData={patientData}
          //   extrainfobill={extrainfobill}
          // />
          <form>
            <Dialog
              maxWidth="xl"
              open={open}
              fullWidth
              onClose={handleClose}
              // fullScreen
              aria-labelledby="max-width-dialog-title"
            >
              <DialogTitle
                id="max-width-dialog-title"
                style={{ padding: "5px 24px" }}
              >
                <h4 style={{ textAlign: "center" }}>
                  <AccountCircleSharpIcon fontSize="large" />
                  Billing Details
                </h4>
              </DialogTitle>
              <DialogContent dividers ref={ref}>
                <Card variant="outlined">
                  <CardContent style={{ backgroundColor: "#ecf6ff" }}>
                    <div style={{ width: "100%", marginTop: 10 }}>
                      <Grid container spacing={1}>
                        <Grid item xs={12} sm={2}>
                          PatientId :<strong>{patientData.identifier}</strong>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          Name :{" "}
                          <strong>
                            {patientData.patientName.toUpperCase()}
                          </strong>
                        </Grid>
                        <Grid item xs={12} sm={1}>
                          Gender : <strong>{patientData.gender}</strong>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                          Age :<strong>{patientData.age}</strong>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                          BillId :<strong>{extrainfobill[0].billId}</strong>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                          Date :<strong>{extrainfobill[0].billingDate}</strong>
                        </Grid>
                      </Grid>
                    </div>
                  </CardContent>
                </Card>

                {voiddetails && (
                  <VoidBill
                    patientData={patientData}
                    extrainfobill={extrainfobill}
                    modalbillinfo={modalbillinfo}
                    isdescrption={isdescrption}
                    checkissubmitted={checkissubmitted}
                  />
                )}
                {editcheck && (
                  <EditBill
                    patientData={patientData}
                    extrainfobill={extrainfobill}
                    modalbillinfo={modalbillinfo}
                    isdescrption={isdescrption}
                    checkissubmitted={setIseditsubmitted}
                    setOpen={setOpen}
                  />
                )}
                {print && (
                  <PrintBill
                    patientData={patientData}
                    extrainfobill={extrainfobill}
                  />
                )}
              </DialogContent>
              {isdescrption && !print && (
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <span>
                    <strong>Description : </strong>
                  </span>
                  <TextField
                    id="billdescription"
                    name="billdescription"
                    variant="outlined"
                    className={classes.field}
                    size="small"
                    value={descrptionval}
                    onChange={handleDescriptionChange}
                    error={errordes === false ? true : false}
                    helperText={
                      errordes === false ? "This field is required" : ""
                    }
                  />
                </Box>
              )}
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
                p={1}
              >
                {print && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handlePrint}
                    style={{ marginRight: 4 }}
                  >
                    Print
                  </Button>
                )}
                {voiddetails && !isdescrption && (
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginRight: 4 }}
                    onClick={handleVoidBillChange}
                  >
                    Void Bill
                  </Button>
                )}

                {isdescrption === true && !print && (
                  <Button
                    variant="contained"
                    color="Primary"
                    style={{ marginRight: 4 }}
                    disabled={
                      isdescrption === true
                        ? errordes === false
                          ? true
                          : false
                        : false
                    }
                    onClick={handleSubmitVoidcheck}
                  >
                    Submit
                  </Button>
                )}
                {/* {editcheck && (
                  <Button
                    variant="contained"
                    color="Secondary"
                    style={{ marginRight: 4 }}
                    disabled={ischecked.length > 0 ? false : true}
                    onClick={deleteService}
                  >
                    Submit
                  </Button>
                )} */}
              </Box>
            </Dialog>
          </form>
        )}
      </>
    );
  }
}

export default BillingListWalking;
