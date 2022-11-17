import {postABDMReq,updateABDMReq} from "../index";

export async function generateAadhaarOtp (aadhaarNumber,setLoader){
   
    const body = {
        aadhaar: aadhaarNumber,
      }
    try{
        const data = await postABDMReq("/registration/aadhaar/generateOtp", body)
        setLoader(false)
        return data;
    }
    catch(error){
        return error;
    }

}
export async function verifyAadhaarOtp (txntId,otp,setLoader){
    var enOTP = otp;
    console.log(txntId)
    const body = {
      }
      body.otp = enOTP;
      body.txnId = txntId;
      console.log(body)
    try{
        const data = await postABDMReq("/registration/aadhaar/verifyOTP", body)
        setLoader(false);
        return data;
    }
    catch(error){
        return error;
    }
}
export async function generateMobileOTP (mobileNo,txnId,setLoader){
    const body = {
        mobile: mobileNo,
        txnId: txnId
      }
    try{
        const data = await postABDMReq("/registration/aadhaar/generateMobileOTP", body)
        setLoader(false);
        return data;
    }
    catch(error){
        return error;
    }

}
export async function verifyMobileOtp (txntId,otp,setLoader){
    const body = {
        otp: otp,
        txnId: txntId
      }
    try{
        const data = await postABDMReq("/registration/aadhaar/verifyMobileOTP", body)
        setLoader(false);
        return data;
    }
    catch(error){
        return error;
    }
}
export async function createHealthIdWithPreVerifiedAadhaar (txntId,payload,setLoader){
    const body = {
        email: payload.email,
        firstName: payload.firstName,
        healthId: payload.healthId,
        lastName: payload.lastName,
        middleName: "",
        password: payload.password,
        profilePhoto: "",
        txnId: txntId
      }
    try{
        const data = await postABDMReq("/registration/aadhaar/createHealthIdWithPreVerified", body)
        setLoader(false);
        return data;
    }
    catch(error){
        return error;
    }
}
export async function updateProfile (abdm,xtoken,setLoader){
    
    
    try{
        const data = await updateABDMReq("/account/profile",xtoken, abdm)
        setLoader(false);
        return data;
    }
    catch(error){
        return error;
    }
}
