import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";
import Checkbox from "@material-ui/core/Checkbox";
import swal from "sweetalert";
import OtpValidate from "./OtpValidate";
import moment from "moment";
import QRCodeScanner from "./QRCodeScanner";
import {
  getProfile,
  getCard,
  getPNGCard,
  searchByHealthId,
  initiateAuth,
  confirmHealthIdWithAadhaarOtp,
} from "../../../../services/data/SearchHealthId";
import { generateAadhaarOtp } from "../../../../services/data/CreateHealthIdWithAadhaar";
import OtpInput from "react-otp-input";
import { GridContainer, GridItem } from "../../../../components";
import { Alert } from "@material-ui/lab";
import { getaddressAPI } from "../../../../services/index";
import Loading from "../../../loader";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { Avatar } from "@material-ui/core";
import { Image } from "@material-ui/icons";
const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: "relative",
    marginTop: "1rem",
  },
  consent: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 600,
    height: 200,
    overflow: "scroll",
  },
  button: {
    margin: theme.spacing(1),
  },
  inputStyle: {
    width: "3rem !important",
    height: "3rem",
    margin: "1rem 1rem 0 0",
    fontSize: "2rem",
    borderRadius: "4px",
    border: "1px solid rgba(0, 0, 0, 0.3)",
  },
  errorStyle: {
    width: "3rem !important",
    height: "3rem",
    margin: "1rem 1rem 0 0",
    fontSize: "2rem",
    borderRadius: "4px",
    border: "1px solid rgba(255, 0, 0)",
  },
  buttonProgress: {
    color: "blue",
    position: "absolute",
    top: "50%",
    left: 40,
    marginTop: -12,
    marginLeft: -12,
  },
  alertSpacing: {
    marginBottom: "1.1rem",
  },
}));
function Ndhmlayout(props) {
  const classes = useStyles();
  const {
    formValues,
    setFormValues,
    formErrors,
    onPhoneChange,
    validatePhone,
  } = props;
  const [open, setOpen] = React.useState(false);
  const [scannerOpen, setScannerOpen] = React.useState(false);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const [isVerifyId, setIsVerifyId] = useState(true);
  const [agreed, setAgreed] = useState(false);
  const [aadharerror, setAadharerror] = useState(true);
  const [confirmAadhaarOTP, setConfirmAadhaarOTP] = useState(false);
  const [aadharvalue, setAadharvalue] = useState("");
  const [otpopen, setOtpopen] = useState(false);
  const [otpvalue, setOTPvalue] = useState("");
  const [phrid, setphrid] = useState("");
  const [txnId, setTxnId] = useState("");
  const [loader, setLoader] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleScannerClose = () => {
    setScannerOpen(false);
  };

  const handleFinished = (mobile) => {
    setOpen(false);
    let step = props.step;
    step++;
    props.handleNextStep(step, txnId, aadharvalue, mobile);
  };

  const handleOTPchange = (otp) => {
    setOTPvalue(otp);
  };
  const handleOTPlayout = async (event) => {
    event.preventDefault();
    setLoader(true);
    setFormSubmitted(true);
    const url = `/search/patients?name=${aadharvalue}`;
    var patientData = await getaddressAPI(url);
/*
    if (patientData && patientData.data.length > 0) {
      setLoader(false);
      swal({
        title: "Warning",
        text: "Aadhaar already exist with other patient",
        icon: "warning",
      });
    } else {*/
      var res = await generateAadhaarOtp(aadharvalue, setLoader);
      console.log(res);
      if (res) {
        console.log(res);
        setTxnId(res.txnId);
        setLoader(false);
        setOtpopen(true);
        swal({
          title: "Thank You",
          text: "OTP sent to your registered Addhaar Mobile No.",
          icon: "success",
        }).then((value) => {
          setOtpopen(true);
        });
        setFormValues({
          ...formValues,
          "Consent Agreement": agreed,
          "Aadhaar above 10Y*": aadharvalue,
          "Self Aadhaar*": aadharvalue,
          "Father Aadhaar*": aadharvalue,
          "Mother Aadhaar*": aadharvalue,
          "Guardian Aadhaar*": aadharvalue,
        });
      //}
    }
  };
  const handleNext = (event) => {
    props.handleNextStep(0, "", "", "");
  };
  const calculateAge = (dob) => {
    var year = dob.split("/")[2];
    var curDate = new Date();
    var calculatedAge = curDate.getFullYear() - year;
    return calculatedAge;
  };
  const changeDateFormat = (dob) => {
    var year = dob.split("/")[2];
    var month = dob.split("/")[1];
    var date = dob.split("/")[0];
    return year + "/" + month + "/" + date;
  };

  function SimpleDialog(props) {
    const classes = useStyles();
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
      onClose(selectedValue);
    };

    const generateQRCodeResponse = async (data) => {
      const url = `/search/patients?name=${data.hidn}`;
      var patientData = await getaddressAPI(url);

      if (patientData && patientData.data.length > 0) {
        setLoader(false);
        swal({
          title: "Warning",
          text: "Health Id already exist with other patient",
          icon: "warning",
        }).then((res) => {
          setScannerOpen(false);
        });
      } else {
        console.log(data);
        var name = data.name;
        var firstName = name.split(" ")[0];
        var lastName = name.split(" ")[name.split(" ").length - 1];

        var age = calculateAge(data.dob);
        if (data.gender === "M") {
          formValues["Gender*"] = { name: "Male", value: data.gender };
        } else if (data.gender === "F") {
          formValues["Gender*"] = { name: "Female", value: data.gender };
        } else {
          formValues["Gender*"] = { name: "Others", value: data.gender };
        }
        setFormValues({
          ...formValues,
          "Consent Agreement": true,
          "Health Number": data.hidn,
          "Health Id": data.hid,
          "First Name*": firstName,
          "Last Name": lastName,
          "Phone Number*": "91" + data.mobile,
          "Age*": age + "y",
          "Date of Birth": changeDateFormat(data.dob),
        });
        handleNext();
      }
    };

    return (
      <Dialog
        fullWidth
        onClose={handleScannerClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <DialogTitle id="simple-dialog-title">Scan Health Id QR</DialogTitle>
        <DialogContent dividers>
          <QRCodeScanner generateQRCodeResponse={generateQRCodeResponse} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }

  SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
  };

  const handleQRScanner = async (event) => {
    setScannerOpen(true);
  };
  const handleAadharChange = async (event) => {
    const { name, value } = event.target;
    if (value.length == 12) {
      setAadharerror(false);
    } else {
      setAadharerror(true);
    }
    setAadharvalue(value);
  };

  const handlePhrorIdChange = async (e) => {
    setphrid(e.target.value);
    setIsVerifyId(false);
  };
  const handlePhridautentication = async (e) => {
    setIsVerifyId(true);
    setLoader(true);
    const url = `/search/patients?name=${phrid}`;
    var patientData = await getaddressAPI(url);

    if (patientData && patientData.data.length > 0) {
      setLoader(false);
      swal({
        title: "Warning",
        text: "Health Id already exist with other patient",
        icon: "warning",
      });
    } else {
      const res = await searchByHealthId(phrid, setLoader);
      if (res) {
        setLoader(false);
        const res2 = await initiateAuth(res.healthId, setLoader);
        if (res2) {
          setOpen(true);
          setConfirmAadhaarOTP(true);
          setTxnId(res2.txnId);
        }
      }
    }
  };
  const handleAgree = (event) => {
    setAgreed(event.target.checked);
  };
  const confirmAddharOTP = async () => {
    setLoader(true);
    var res = await confirmHealthIdWithAadhaarOtp(txnId, otpvalue, setLoader);
    if (res) {
      setLoader(true);
      var profile = await getProfile(
        res.token,
        "application/json;charset=UTF-8"
      );

      if (profile) {
        console.log(profile);
        setLoader(false);
        setAgreed(true);
        props.handleNextStep(0, "", "", "");
        if (profile.gender === "M") {
          formValues["Gender*"] = { name: "Male", value: profile.gender };
        } else if (profile.gender === "F") {
          formValues["Gender*"] = { name: "Female", value: profile.gender };
        } else {
          formValues["Gender*"] = { name: "Others", value: profile.gender };
        }
        setAgreed(true);
        setFormValues({
          ...formValues,
          "Consent Agreement": true,
          "First Name*": profile.firstName,
          "Last Name": profile.lastName,
          "Health Id": profile.healthId,
          "Health Number": profile.healthIdNumber,
          "Date of Birth":
            profile.yearOfBirth +
            "/" +
            profile.monthOfBirth +
            "/" +
            profile.dayOfBirth,
          "Age*":
            calculateAge(
              moment(
                profile.dayOfBirth +
                  "/" +
                  profile.monthOfBirth +
                  "/" +
                  profile.yearOfBirth
              ).format("DD/MM/yyyy")
            ) + "y",
          "Phone Number*": "91" + profile.mobile,
        });
      }
    }
  };

  return (
    <>
      {loader && <Loading loader={loader} />}
      <div className={classes.root}>
        <form>
          <Grid container spacing={3} className={classes.customMargin}>
            <Grid item sm={1} xs={12}>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleQRScanner}
              >
                Scan QR
              </Button>
              <SimpleDialog open={scannerOpen} onClose={handleScannerClose} />
            </Grid>
            <Grid item sm={5} xs={12}>
              <TextField
                name="ABHA Address/ ABHA Number"
                variant="outlined"
                label="ABHA Address/ ABHA Number"
                autoFocus
                fullWidth
                placeholder="Enter ABHA Address/ Number"
                value={phrid}
                onChange={handlePhrorIdChange}
              />
            </Grid>

            <Grid item sm={2} xs={12}>
              <Button
                variant="contained"
                size="medium"
                color="primary"
                className={classes.margin}
                disabled={isVerifyId ? true : false}
                onClick={handlePhridautentication}
              >
                Verify
              </Button>
            </Grid>
            <Grid item sm={1} xs={12}>
              <Button
                variant="Outlined"
                size="medium"
                color="secondary"
                className={classes.margin}
              >
                or
              </Button>
            </Grid>
            <Grid item sm={3} xs={12}>
              <Button
                variant="contained"
                size="medium"
                color="primary"
                className={classes.margin}
                onClick={handleClickOpen}
              >
                Create ABHA Number
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle id="form-dialog-title"></DialogTitle>
        <DialogContent dividers>
          {confirmAadhaarOTP && (
            <>
              <Alert severity="info">Please Verify your Aadhaar OTP</Alert>
              <GridContainer>
                <GridItem item xs={12} sm={9} md={9}>
                  <OtpInput
                    value={otpvalue}
                    numInputs={6}
                    separator=" "
                    label="OTP"
                    name="otp"
                    onChange={handleOTPchange}
                    errorStyle={classes.errorStyle}
                    inputStyle={classes.inputStyle}
                  />
                </GridItem>
                <GridItem item xs={12} sm={3} md={3}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    disabled={otpvalue.length === 6 ? false : true}
                    onClick={confirmAddharOTP}
                  >
                    Validate
                  </Button>
                </GridItem>
              </GridContainer>
            </>
          )}
          {open && !otpopen && !confirmAadhaarOTP && (
            <form id="frmgenerateOTP" onSubmit={handleOTPlayout}>
              <Alert severity="info">Please Enter Aadhaar Number</Alert>
              <br />
              <GridContainer>
                <GridItem item xs={12} sm={9} md={9}>
                  <TextField
                    name="txtadhaar"
                    label="Aadhaar"
                    variant="outlined"
                    autoFocus
                    fullWidth
                    id="txtadhaar"
                    placeholder="Enter Your Aadhaar Number"
                    inputProps={{ maxLength: 12 }}
                    error={aadharerror === true ? true : false}
                    helperText={
                      aadharerror === true
                        ? "Please Enter 12 Digits Aadhaar Number"
                        : ""
                    }
                    value={aadharvalue}
                    onChange={handleAadharChange}
                  />
                </GridItem>
                <GridItem item xs={12} sm={3} md={3}>
                  <Button
                    color="primary"
                    variant="contained"
                    size="medium"
                    type="submit"
                    disabled={aadharvalue.length == 12 && agreed ? false : true}
                  >
                    Submit
                  </Button>
                </GridItem>
                <GridItem item xs={12} sm={12} md={12}>
                  <Card className={classes.consent}>
                    <CardContent>
                      I, hereby declare that I am voluntarily sharing my Aadhaar
                      Number and demographic information issued by UIDAI, with
                      National Health Authority (NHA) for the sole purpose of
                      creation of ABHA number . I understand that my ABHA number
                      can be used and shared for purposes as may be notified by
                      ABDM from time to time including provision of healthcare
                      services. Further, I am aware that my personal
                      identifiable information (Name, Address, Age, Date of
                      Birth, Gender and Photograph) may be made available to the
                      entities working in the National Digital Health Ecosystem
                      (NDHE) which inter alia includes stakeholders and entities
                      such as healthcare professionals (e.g. doctors),
                      facilities (e.g. hospitals, laboratories) and data
                      fiduciaries (e.g. health programmes), which are registered
                      with or linked to the Ayushman Bharat Digital Mission
                      (ABDM), and various processes there under. I authorize NHA
                      to use my Aadhaar number for performing Aadhaar based
                      authentication with UIDAI as per the provisions of the
                      Aadhaar (Targeted Delivery of Financial and other
                      Subsidies, Benefits and Services) Act, 2016 for the
                      aforesaid purpose. I understand that UIDAI will share my
                      e-KYC details, or response of “Yes” with NHA upon
                      successful authentication. I have been duly informed about
                      the option of using other IDs apart from Aadhaar; however,
                      I consciously choose to use Aadhaar number for the purpose
                      of availing benefits across the NDHE. I am aware that my
                      personal identifiable information excluding Aadhaar number
                      / VID number can be used and shared for purposes as
                      mentioned above. I reserve the right to revoke the given
                      consent at any point of time as per provisions of Aadhaar
                      Act and Regulations.
                    </CardContent>
                  </Card>
                </GridItem>
                <GridItem item xs={12} sm={12} md={12}>
                  <Checkbox
                    checked={agreed}
                    onChange={handleAgree}
                    color="primary"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />{" "}
                  I Agree
                </GridItem>
              </GridContainer>
            </form>
          )}
          {otpopen && (
            <GridContainer>
              <OtpValidate
                setFormValues={setFormValues}
                formValues={formValues}
                formErrors={formErrors}
                onPhoneChange={onPhoneChange}
                validatePhone={validatePhone}
                aadhaar={aadharvalue}
                txnId={txnId}
                handleFinished={handleFinished}
                handleNextStep={props.handleNextStep}
              />
            </GridContainer>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Ndhmlayout;
