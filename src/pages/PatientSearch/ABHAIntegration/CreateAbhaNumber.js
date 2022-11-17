import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import swal from "sweetalert";
import PhoneInput from "react-phone-input-2";
import Mobileotplayout from "./MobileVerification";
import OtpInput from "react-otp-input";
import { verifyAadhaarOtp, generateMobileOTP, generateAadhaarOtp } from "../../../services/data/CreateHealthIdWithAadhaar"

import { GridContainer, GridItem } from "../../../components";
import { Alert } from "@material-ui/lab";

import Loading from "../../loader";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: "relative",
    marginTop: "1rem",
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
    marginBottom: "1.1rem"
  }
}));
function CreateAbhaNumber(props) {
  console.log('props>>>>>>>>>>>', props)
  const { handleNextStep } = props;
  const classes = useStyles();
  const [otpvalue, setOTPvalue] = useState("");
  const [loader, setLoader] = useState(false);
  const [mobile, setMobile] = useState("");
  const [verifiedTxnId, setverifiedTxnId] = useState(props.txnId);
  const [mobileotpvalue, setMobileOTPvalue] = useState(false);
  const [displaylayoutmobile, setdisplaylayoutmobile] = useState(false);
  const handleOTPchange = (otp) => {
    //const { name, value } = e.target;
    setOTPvalue(otp);
  };
  const handlefrmSaubmit = async (e) => {
    setLoader(true);
    var { txnId } = await verifyAadhaarOtp(verifiedTxnId, otpvalue, setLoader);
    if (txnId) {
      console.log(txnId)
      setverifiedTxnId(txnId);
      setMobileOTPvalue(true);
      setLoader(false);
      swal({
        title: "Thank You",
        text: "OTP Verified Succesfully",
        icon: "success",
      }).then((value) => {
        //setPrintData(true);
        setMobileOTPvalue(true);
      });
    } else {
      swal({
        title: "Error",
        text: "Wrong OTP, Please Try Again",
        icon: "error",
      })
    }
  };
  const handlemobilevalidateOtp = async (e) => {
    console.log('mobile.substring(2), verifiedTxnId>>', mobile.substring(2), verifiedTxnId)
    setLoader(true);
    if (mobile !== "") {
      var txnId = await generateMobileOTP(mobile.substring(2), verifiedTxnId, setLoader);
      if (txnId) {
        setLoader(false);
        setverifiedTxnId(txnId);
        setdisplaylayoutmobile(true);
      }else{
        swal({
          title: "Error",
          text: "Failled with error",
          icon: "error",
        })
      }
    }
  };
  const handleReset = async (e) => {

    var res = await generateAadhaarOtp(props.aadhaar, setLoader);
    if (res) {
      setverifiedTxnId(res.txnId);
      setLoader(false);
      swal({
        title: "Thank You",
        text: "OTP sent to your registered Addhaar Mobile No.",
        icon: "success",
      }).then((value) => {
        //setOtpopen(true);
      });

    }

  };
  const handlemobile = async (value) => {
    setMobile(value);
  };

  if (mobileotpvalue === true) {
    return (
      <GridItem item xs={12} sm={12} md={12}>
        {loader && (<Loading loader={loader} />)}
        <Alert severity="success">
          Aadhaar number is successfully verified
        </Alert>
        <Alert severity="info">
          Please enter mobile number where you want to create your Abha Number
        </Alert>
        <GridContainer>
          <GridItem item xs={12} sm={9} md={9}>
            <br />
            <PhoneInput

              inputProps={{
                name: "Phone Number",
              }}
              countryCodeEditable={false}
              inputStyle={{ width: "100%" }}
              country={"in"}
              specialLabel="Phone Number"
              value={''}
              onChange={handlemobile}
              containerClass={classes.field}
            />

          </GridItem>
          <GridItem item xs={12} sm={3} md={3}>
            <br />
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handlemobilevalidateOtp}
              disabled={displaylayoutmobile}
            >
              Go
            </Button>
          </GridItem>
        </GridContainer>
        {displaylayoutmobile && <Mobileotplayout
          phoneNo={mobile.substring(2)}
          mobile={displaylayoutmobile}
          aadhaar={props.aadhaar}
          txnId={verifiedTxnId}
          handleNextStep={handleNextStep}
          comfirmBasicDetaills={props.comfirmBasicDetaills}
        />}
      </GridItem>
    );
  } else {
    return (
      <GridItem item xs={12} sm={12} md={12}>
        <Alert severity="info">
          For Abha Number update please confirm the Aadhaar OTP.
        </Alert>
        <form id="frmotpvalidate">
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
              <br />

              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                disabled={otpvalue.length === 6 ? false : true}
                onClick={handlefrmSaubmit}
              >
                Validate
              </Button>
              <Button
                color="primary"
                className={classes.button}
                disabled={otpvalue.length === 6 ? true : false}
                onClick={handleReset}
              >
                Reset
              </Button>
            </GridItem>
          </GridContainer>

        </form>
      </GridItem>
    );
  }
}
export default CreateAbhaNumber;