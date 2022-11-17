import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import OtpInput from "react-otp-input";
import { createHealthIdWithPreVerifiedAadhaar, verifyMobileOtp, generateMobileOTP } from "../../../../services/data/CreateHealthIdWithAadhaar";
import moment from "moment";
import { Alert } from "@material-ui/lab";
import { GridContainer, GridItem } from "../../../../components";
import Loading from "../../../loader";
import swal from "sweetalert";

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

function Mobileotplayout(props) {
  console.log('props>>>>>>>>>', props)
  const classes = useStyles();

  const {
    txnId,
    handleNextStep,
    formValues,
    setFormValues,
  } = props;
  const [verifiedTxnId, setverifiedTxnId] = useState("");
  const [mobileOtp, setMobileOtp] = useState("");
  const [loader, setLoader] = useState(false);
  const handleOTPchange = async (otp) => {
    setMobileOtp(otp)
  };
  const calculateAge = (dob) => {
    var year = dob.split('/')[2]
    var curDate = new Date();
    var calculatedAge = curDate.getFullYear() - year;
    return calculatedAge;
  }

  const randomNameGenerator = number => {
    let res = '';
    for (let i = 0; i < number; i++) {
      const random = Math.floor(Math.random() * 27);
      res += String.fromCharCode(97 + random);
    };
    return res;
  };
  const handlefrmSaubmit = async (e) => {
    //const { name, value } = e.target;
    setLoader(true);
    var res = await verifyMobileOtp(txnId, mobileOtp, setLoader);
    console.log('res', res)
    if (res?.data) {
      setverifiedTxnId(res?.data?.txnId);
      let abdmPayload = {
        email: "",
        firstName: "",
        healthId: "",
        lastName: "",
        middleName: "",
        password: "",
        profilePhoto: "",
      }
      var {data} = await createHealthIdWithPreVerifiedAadhaar(res.data?.txnId, abdmPayload, setLoader)
      if (data) {
        if (data.gender === "M") {
          formValues["Gender*"] = { name: "Male", value: data.gender }
        }
        else if (data.gender === "F") {
          formValues["Gender*"] = { name: "Female", value: data.gender }
        }
        else {
          formValues["Gender*"] = { name: "Others", value: data.gender }
        }
        let createId = true;
        if (data.healthId !== "" && data.healthId !== null) {
          createId = false;
        }
        setFormValues({
          ...formValues,
          "Token": data.token,
          "Create Id": createId,
          "Health Number": data.healthIdNumber,
          "Health Id": data.healthId !== "" && data.healthId !== null ? data.healthId : data.firstName + data.yearOfBirth,
          "First Name*": data.firstName,
          "Last Name": data.lastName,
          "Date of Birth": data.yearOfBirth + "/" + data.monthOfBirth + "/" + data.dayOfBirth,
          "Phone Number*": "91" + data.mobile,
          "Age*": calculateAge(moment(data.dayOfBirth + "/" + data.monthOfBirth + "/" + data.yearOfBirth).format("DD/MM/yyyy")) + "y"
        });
        setLoader(false);
        handleNextStep(0, txnId, props.mobile, props.aadhaar);
      }else{
        setLoader(false);
        swal({
          title: "Error",
          text: "Wrong OTP, Please Try Again",
          icon: "error",
        })
      }

    }
    else{
      setLoader(false)
      swal({
        title: "Error",
        text: "Wrong OTP, Please Try Again",
        icon: "error",
      })
    }
  };
  const handleReset = async () => {
    setLoader(true);
    //var mobile = formValues["Phone Number*"].substring(2);
    var res = await generateMobileOTP(props.phoneNo, txnId, setLoader);
    if (res) {
      setLoader(false);
      setverifiedTxnId(res?.data?.txnId);
      //setdisplaylayoutmobile(true);
    }
  }
  return (

    <GridItem item xs={12} sm={12} md={12}>
      {loader && (<Loading loader={loader} />)}
      <Alert severity="info">
        Please confirm the mobile OTP.
      </Alert>
      <form id="frmotpvalidate">
        <GridContainer>
          <GridItem item xs={12} sm={9} md={9}>
            <OtpInput
              value={mobileOtp}
              numInputs={6}
              separator=" "
              label="OTP"
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
              disabled={mobileOtp.length === 6 ? false : true}
              onClick={handlefrmSaubmit}
            >
              Validate
            </Button>
            <Button
              color="primary"
              className={classes.button}
              disabled={mobileOtp.length === 6 ? true : false}
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

export default Mobileotplayout;
