import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";
import swal from "sweetalert";
import OtpInput from "react-otp-input";
import {createHealthIdWithPreVerifiedAadhaar,verifyMobileOtp,generateMobileOTP} from "../../../services/data/CreateHealthIdWithAadhaar";
import { CardContent ,CardHeader,} from "@material-ui/core";
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
  alertSpacing :{
    marginBottom:"1.1rem"
  }
}));

function MobileVerification(props) {
  const classes = useStyles();
  const {txnId,handleNextStep} = props;
  const [verifiedTxnId, setverifiedTxnId] = useState("");
  const [mobileOtp, setMobileOtp] = useState("");
  
  const [loader, setLoader] = useState(false);
  const handleOTPchange = async(otp) => {
    setMobileOtp(otp)
  };
  const randomNameGenerator = number => {
    let res = '';
    for(let i = 0; i < number; i++){
       const random = Math.floor(Math.random() * 27);
       res += String.fromCharCode(97 + random);
    };
    return res;
 };
  const handlefrmSaubmit = async(e) => {
    setLoader(true);
      var res = await verifyMobileOtp(txnId,mobileOtp,setLoader);
      if(res){
        setLoader(false);
        setverifiedTxnId(txnId);
        let abdmPayload = {
          email: "",
          firstName: "",
          healthId: "healthid"+randomNameGenerator(6),
          lastName: "",
          middleName: "",
          password: "",
          profilePhoto: "",
        }
        var data = await createHealthIdWithPreVerifiedAadhaar(res.txnId,abdmPayload,setLoader)
        if(data){
          props.comfirmBasicDetaills(data);
          
        }
        //props.comfirmBasicDetaills(txnId);
      }
  };
  const handleReset = async() =>{
      setLoader(true);
      console.log(props.phoneNo);
      var res = await generateMobileOTP(props.phoneNo,txnId,setLoader);
      if(res){
        setLoader(false);
        setverifiedTxnId(res.txnId);
      }
  }
  return (
    <GridItem item xs={12} sm={12} md={12}>
    {loader &&( <Loading loader={loader}/>)}
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
        <br/>
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

export default MobileVerification;
