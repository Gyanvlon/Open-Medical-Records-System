import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import swal from "sweetalert";
import Mobileotplayout from "./Mobileotplayout";
import OtpInput from "react-otp-input";
import PhoneInput from "react-phone-input-2";
import {verifyAadhaarOtp,generateMobileOTP,generateAadhaarOtp} from "../../../../services/data/CreateHealthIdWithAadhaar"
import { 
  FormHelperText,} from "@material-ui/core";
import moment from "moment";
import Loading from "../../../loader";
import { GridContainer, GridItem } from "../../../../components";
import { Alert } from "@material-ui/lab";
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
  alertSpacing :{
    marginBottom:"1.1rem"
  }
}));
function OtpValidate(props) {
  const {handleNextStep} = props;
  const classes = useStyles();
  const [otpvalue, setOTPvalue] = useState("");
  const [verifiedTxnId, setverifiedTxnId] = useState("");
  const [mobileotpvalue, setMobileOTPvalue] = useState(false);
  const [enableReset, setEnableReset] = useState(false);
  const [loader, setLoader] = useState(false);
  const [displaylayoutmobile, setdisplaylayoutmobile] = useState(false);
  const {
    formValues,
    setFormValues,
    onPhoneChange,
    formErrors,
    validatePhone
  } = props;

  const [txnId, setTxnId] = useState(props.txnId);
  const handleOTPchange = (otp) => {
    //const { name, value } = e.target;
    setOTPvalue(otp);
  };
  const calculateAge = (dob) => {
    var year = dob.split('-')[2]
    var curDate = new Date();
    var calculatedAge = curDate.getFullYear()-year;
    return calculatedAge;
  }
  const handleHAddress = (event) =>{
    setFormValues({
      ...formValues,
      "Health Id": event.target.value,
       });
  }
  const handlefrmSaubmit = async(e) => {
    setLoader(true);
      var res = await verifyAadhaarOtp(txnId,otpvalue,setLoader);
    if(res){
          setLoader(false);
          if(res.healthIdNumber != null){
            var name = res.name;
            var firstName = name.split(" ")[0];
            var lastName = name.split(" ")[name.split(" ").length-1];
            
            var age = calculateAge(res.birthdate);
            if (res.gender === "M") {
              formValues["Gender*"] = { name: "Male", value: res.genderr }
            }
            else if (res.gender === "F") {
              formValues["Gender*"] = { name: "Female", value: res.gender }
            }
            else {
              formValues["Gender*"] = { name: "Others", value: res.gender }
            }
            setFormValues({
              ...formValues,
              "Health Number": res.healthIdNumber,
              "First Name*": firstName,
              "Last Name": lastName,
              "Date of Birth":new Date(moment(res.birthdate).format("DD/MM/yyyy")),
              "Phone Number*":res.mobile,
              "Age*":age+'y'
            });
            props.handleNextStep(0,txnId,"","");
          }
          else{
            setverifiedTxnId(res.txnId);
          setMobileOTPvalue(true);
            swal({
              title: "Thank You",
              text: "OTP Verified Succesfully",
              icon: "success",
            }).then((value) => {
              //setPrintData(true);
              setMobileOTPvalue(true);
            });
          }
          
      }
    
  };
  const handlemobilevalidateOtp = async(e) => {
    setLoader(true);
    console.log(formValues["Phone Number*"])
    
    if(formValues["Phone Number*"] !== ""){
      var mobile = formValues["Phone Number*"].substring(2);
      console.log(mobile);
      var res = await generateMobileOTP(mobile,verifiedTxnId,setLoader);
      if(res){
        setLoader(false);
        setverifiedTxnId(res.txnId);
        setdisplaylayoutmobile(true);
      }
    }
    
  };
  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      setEnableReset(false);
      return true;
    }
   
    return (
      <div className="timer">
        <div className="value">{remainingTime} Sec</div>
      </div>
    );
  };
  const handleReset = async(e) => {

    var res = await generateAadhaarOtp(props.aadhaar,setLoader);
        console.log(res);
        if(res){
          setTxnId(res.txnId);
          setLoader(false);
          swal({
            title: "Thank You",
            text: "OTP sent to your registered Addhaar Mobile No.",
            icon: "success",
          }).then((value) => {       
            //setOtpopen(true);
          });
          setFormValues({
            ...formValues,
            "Aadhaar above 10Y*": props.aadhaar,
            "Self Aadhaar*": props.aadhaar,
            "Father Aadhaar*": props.aadhaar,
            "Mother Aadhaar*": props.aadhaar,
            "Guardian Aadhaar*": props.aadhaar,
          });
      }
   
  };

  if (mobileotpvalue === true) {
    return (
      <GridItem item xs={12} sm={12} md={12}>
       {loader &&( <Loading loader={loader}/>)}
          <Alert severity="success">
            Aadhaar number is successfully verified
          </Alert>
          <Alert severity="info">
          Please enter mobile number where you want to create your Abha Number
          </Alert>
          <GridContainer>
          <GridItem item xs={12} sm={9} md={9}>
          
          </GridItem>
          <GridItem item xs={12} sm={9} md={9}>
          <PhoneInput
          containerStyle={{
            marginTop: 8,
            color: formErrors["Phone Number*"] ? "red" : "rgba(0, 0, 0, 0.54)",
          }}
          inputProps={{
            name: "Phone Number*",
          }}
          countryCodeEditable={false}
          inputStyle={{ width: "100%" }}
          inputClass={formErrors["Phone Number*"] && classes.phoneField}
          country={"in"}
          specialLabel="Phone Number*"
          value={formValues["Phone Number*"]}
          onChange={onPhoneChange}
          onBlur={(e, data) =>
            validatePhone(e, data, formValues["Phone Number*"])
          }
          containerClass={classes.field}
        />
        <FormHelperText className={classes.phoneFieldHelperText} error>
          {formErrors["Phone Number*"]}
        </FormHelperText>        
          </GridItem>
          <GridItem item xs={12} sm={3} md={3}>
          <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handlemobilevalidateOtp}
              disabled={displaylayoutmobile}
            >
              Send
            </Button>
          </GridItem>
          </GridContainer>
        {displaylayoutmobile && 
        <Mobileotplayout
         phoneNo={formValues["Phone Number*"].substring(2)}
          mobile = {displaylayoutmobile} 
          aadhaar={props.aadhaar} 
          txnId = {verifiedTxnId} 
          setFormValues = {setFormValues}
          formValues = {formValues}
          handleNextStep={handleNextStep}/>}
      </GridItem>
    );
  } else {
    return (
      <GridItem item xs={12} sm={12} md={12}>
       {loader &&( <Loading loader={loader}/>)}
      <Alert severity="info">
        For Abha Number creation please confirm the Aadhaar OTP.      
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
            <br/>
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
export default OtpValidate;
