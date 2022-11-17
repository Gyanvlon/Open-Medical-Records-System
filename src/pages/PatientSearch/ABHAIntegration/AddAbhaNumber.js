import React, { useState, useRef } from "react";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import swal from "sweetalert";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";

import CreateAbhaNumber from "./CreateAbhaNumber";
import Loading from "../../loader";
import ConfirmBasicDetails from "./ConfirmBasicDetails";
import {
  getCard,
  searchByHealthId,
  initiateAuth,
  confirmHealthIdWithAadhaarOtp,
} from "../../../services/data/SearchHealthId";
import { generateAadhaarOtp } from "../../../services/data/CreateHealthIdWithAadhaar";
import { postAPI, getaddressAPI } from "../../../services";
import { GridContainer, GridItem } from "../../../components";
import { Alert } from "@material-ui/lab";
import OtpInput from "react-otp-input";
import Card from "@material-ui/core/Card";
import Checkbox from "@material-ui/core/Checkbox";
import CardContent from "@material-ui/core/CardContent";
const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: "relative",
    marginTop: "1rem",
  },
  button: {
    margin: theme.spacing(1),
  },
  consent: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 600,
    height: 180,
    overflow: "scroll",
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
const initialSate = {
  "Health Id*": "",
  "Health Password": "",
};
export default function CreateABHA(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  //const { appointmentData, visitData } = data;

  const [agreed, setAgreed] = useState(false);
  const [otpopen, setOtpopen] = useState(false);
  const [isCreateAadhar, setIsCreateAadhar] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loader, setLoader] = useState(false);
  const [dialogLength, setdialogLength] = useState("md");
  const [healthData, setHealthData] = useState([]);
  const [healthId, setHealthId] = useState("");
  const [healthNumber, setHealthNumber] = useState([]);
  const [confirmAadhaarOTP, setConfirmAadhaarOTP] = useState(false);
  const [otpvalue, setOTPvalue] = useState("");
  const [mobileerror, setMobileError] = useState(true);
  const [aadharerror, setAadharerror] = useState(true);
  const [confirmDetails, setConfirmDetails] = useState(false);
  const [mobilevalue, setMobilevalue] = useState("");
  const [aadharvalue, setAadharvalue] = useState("");
  const [formValues, setFormValues] = useState(initialSate);
  const [progressBar, setProgressBar] = useState(false);

  const [state, setState] = React.useState({
    generateVia: "",
    name: "hai",
  });
  const [txnId, setTxnId] = useState("");
  const [photoBlob, setPhotoBlob] = useState("");
  const [phrid, setphrid] = useState("");
  const history = useHistory();
  const ref = useRef();
  const [checkfield, setCheckfield] = useState({
    type: "mobilefield",
  });
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleOTPlayout = async (event) => {
    event.preventDefault();
    setLoader(true);
    setFormSubmitted(true);
    const url = `/search/patients?name=${aadharvalue}`;
    var patientData = await getaddressAPI(url);

    if (patientData && patientData.data.length > 0) {
      setLoader(false);
      swal({
        title: "Warning",
        text: "Aadhaar already exist with other patient",
        icon: "warning",
      });
    } else {
      var res = await generateAadhaarOtp(aadharvalue, setLoader);
      console.log(res);
      if (res) {
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
      }
    }
    setFormSubmitted(false);
  };
  function validateText(e) {
    const { name, value } = e.target;
    if (name.slice(-1) === "*") {
      if (!value || value === "") {
        setFormErrors({ ...formErrors, [name]: "This field is required" });
      } else {
        const errors = formErrors;
        delete errors[name];
        setFormErrors(errors);
      }
    }
  }
  const comfirmBasicDetaills = async (data) => {
    var card = await getCard(data.token, "blob");
    if (card) {
      setPhotoBlob(card);
      setConfirmDetails(true);
      setHealthId(data.healthId);
      setHealthNumber(data.healthIdNumber);
    }
  };

  const handleClose = () => {
    setOpen(false);
    history.push({ pathname: "/app/patient-search" });
  };
  const handlePhrorIdChange = async (e) => {
    setphrid(e.target.value);
  };
  const handleMobileNo = (event) => {
    const { name, value } = event.target;
    if (value.length == 10) {
      setMobileError(false);
    } else {
      setMobileError(true);
    }
    setMobilevalue(value);
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
  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
    console.log(state);

    setCheckfield({ ...checkfield, type: event.target.value });
  };
  const handlePhridautentication = async (e) => {
    e.preventDefault();
    setLoader(true);
    const url = `/search/patients?name=${phrid}`;
    var patientData = await getaddressAPI(url);

    if (patientData && patientData.data.length > 0) {
      setLoader(false);
      swal({
        title: "Warning",
        text: "ABHA Number already exist with other patient",
        icon: "warning",
      });
    } else {
      const res = await searchByHealthId(phrid, setLoader);
      if (res) {
        setLoader(false);
        setHealthData(res);
        setHealthId(res.healthId);
        setHealthNumber(res.healthIdNumber);
        const res2 = await initiateAuth(res.healthId, setLoader);
        if (res2) {
          setOpen(true);
          setConfirmAadhaarOTP(true);
          setTxnId(res2.txnId);
        }
      } else {
        setLoader(false);
      }
    }
  };
  const handleOTPchange = (otp) => {
    setOTPvalue(otp);
  };
  const confirmAddharOTP = async () => {
    setLoader(true);
    var res = await confirmHealthIdWithAadhaarOtp(txnId, otpvalue, setLoader);
    if (res) {
      var card = await getCard(res.token, "blob");
      if (card) {
        setPhotoBlob(card);
        setConfirmDetails(true);
      }
    }
  };
  function onTextChange(e) {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  }
  const addHealthId = async () => {
    setLoader(true);

    var patient = {
      person: {
        attributes: [
          {
            attributeType: "29d245a2-fdff-4ea0-bffe-f926d4816081", //Health Id
            value: healthId,
          },
          {
            attributeType: "029ceb40-3837-4a8b-9233-bfd4cb8876c5", //Health Number
            value: healthNumber,
          },
        ],
      },
    };
    postAPI("/patient/" + props.patientData.uuid, patient).then(
      (patientResponse) => {
        setLoader(false);
        swal({
          title: "Thank You",
          text: "Health Id has been updated",
          icon: "success",
        }).then((value) => {
          window.location.reload(false);
        });
      }
    );
    //}
    setProgressBar(false);
  };
  const handleClickOpen = () => {
    setIsCreateAadhar(true);
    setdialogLength("sm");
  };
  const handleAgree = (event) => {
    setAgreed(event.target.checked);
  };

  return (
    <Dialog
      fullWidth
      maxWidth={dialogLength}
      open={open}
      onClose={handleClose}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      {loader && <Loading loader={loader} />}
      <DialogTitle id="scroll-dialog-title">
        Update Patient Health Id
      </DialogTitle>
      <DialogContent dividers ref={ref}>
        {confirmAadhaarOTP && !confirmDetails && (
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
        {confirmDetails && (
          <ConfirmBasicDetails
            patientData={props.patientData}
            photoBlob={photoBlob}
            formValues={formValues}
            setFormValues={setFormValues}
            onTextChange={onTextChange}
            formErrors={formErrors}
          />
        )}
        {!confirmAadhaarOTP && !isCreateAadhar && !confirmDetails && (
          <GridContainer>
            <GridItem item xs={12} sm={6} md={6}>
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
            </GridItem>
            <GridItem item xs={12} sm={2} md={2}>
              <Button
                variant="contained"
                size="medium"
                color="primary"
                className={classes.margin}
                disabled={progressBar}
                onClick={handlePhridautentication}
              >
                Add
              </Button>
            </GridItem>
            <GridItem item xs={12} sm={1} md={1}>
              <br />
              OR
            </GridItem>
            <GridItem item xs={12} sm={3} md={3}>
              <Button
                variant="contained"
                size="medium"
                color="primary"
                className={classes.margin}
                onClick={handleClickOpen}
              >
                Create Health Id
              </Button>
            </GridItem>
          </GridContainer>
        )}
        {!otpopen && isCreateAadhar && !confirmDetails && (
          <GridContainer>
            <GridItem item xs={12} sm={12} md={12}>
              <Alert severity="info">Please Enter Aadhaar Number</Alert>
              <br />
            </GridItem>

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
              <br />
              <Button
                color="primary"
                variant="contained"
                size="medium"
                type="submit"
                disabled={aadharvalue.length == 12 && agreed ? false : true}
                onClick={handleOTPlayout}
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
                  creation of ABHA number . I understand that my ABHA number can
                  be used and shared for purposes as may be notified by ABDM
                  from time to time including provision of healthcare services.
                  Further, I am aware that my personal identifiable information
                  (Name, Address, Age, Date of Birth, Gender and Photograph) may
                  be made available to the entities working in the National
                  Digital Health Ecosystem (NDHE) which inter alia includes
                  stakeholders and entities such as healthcare professionals
                  (e.g. doctors), facilities (e.g. hospitals, laboratories) and
                  data fiduciaries (e.g. health programmes), which are
                  registered with or linked to the Ayushman Bharat Digital
                  Mission (ABDM), and various processes there under. I authorize
                  NHA to use my Aadhaar number for performing Aadhaar based
                  authentication with UIDAI as per the provisions of the Aadhaar
                  (Targeted Delivery of Financial and other Subsidies, Benefits
                  and Services) Act, 2016 for the aforesaid purpose. I
                  understand that UIDAI will share my e-KYC details, or response
                  of “Yes” with NHA upon successful authentication. I have been
                  duly informed about the option of using other IDs apart from
                  Aadhaar; however, I consciously choose to use Aadhaar number
                  for the purpose of availing benefits across the NDHE. I am
                  aware that my personal identifiable information excluding
                  Aadhaar number / VID number can be used and shared for
                  purposes as mentioned above. I reserve the right to revoke the
                  given consent at any point of time as per provisions of
                  Aadhaar Act and Regulations.
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
        )}
        {otpopen && !confirmDetails && (
          <GridContainer>
            <CreateAbhaNumber
              aadhaar={aadharvalue}
              txnId={txnId}
              comfirmBasicDetaills={comfirmBasicDetaills}
            />
          </GridContainer>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        {confirmDetails && (
          <Button onClick={addHealthId} color="secondary">
            Confirm
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
