import axios from "axios";
import {postABDMReq} from "../index";

export async function generateOtpMobile (mobileNumber){
    const body = {
        mobile: mobileNumber
      }
    try{
        const data = await postABDMReq("/registration/mobile/generateOtp", body)
        return data;
    }
    catch(error){
        return error;
    }

}
export async function verifyOtpMobile (txntId,otp){
    const body = {
        otp: otp,
        txnId: txntId
      }
    try{
        const data = await postABDMReq("/registration/mobile/verifyOtp", body)
        return data;
    }
    catch(error){
        return error;
    }
}
export async function createHealthIdWithMobile (txntId,token,payload){
    const body = {
        address: "",
        dayOfBirth: payload.dayOfBirth,
        districtCode: "",
        email: payload.email,
        firstName: payload.firstName,
        gender: payload.gender,
        healthId: payload.healthId,
        lastName: payload.lastName,
        middleName: "",
        monthOfBirth: payload.monthOfBirth,
        name: payload.name,
        password: payload.password,
        pincode: 0,
        profilePhoto: "",
        restrictions: "",
        stateCode: "",
        subdistrictCode: "",
        token: token,
        townCode: "",
        txnId: txntId,
        villageCode: "",
        wardCode: "",
        yearOfBirth: payload.yearOfBirth
      }
    try{
        const data = await postABDMReq("/registration/mobile/createHealthId", body)
        return data;
    }
    catch(error){
        return error;
    }
}