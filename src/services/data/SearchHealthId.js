import { getABDMReq, geneateABDMToken, postABDMReq } from "../index";
import axios from "axios";
import { ABDM_URL } from "../../utils/constants";

export async function searchByHealthId(heathId, setLoader = '') {
    const body = {
        healthId: heathId
    }
    try {
        const data = await postABDMReq("/search/searchByHealthId", body)
        setLoader(false);
        return data;
    }
    catch (error) {
        setLoader(false);
        return error;
    }
}
export async function initiateAuth(heathId, setLoader = '') {

    const body = {
        authMethod: 'AADHAAR_OTP',
        healthid: heathId
    }
    try {
        const data = await postABDMReq("/auth/init", body)
        setLoader(false);
        return data;
    }
    catch (error) {
        setLoader(false);
        return error;
    }

}
export async function confirmHealthIdWithAadhaarOtp(txntId, otp, setLoader) {

    const body = {
        otp: otp,
        txnId: txntId
    }
    try {
        const data = await postABDMReq("/auth/confirmWithAadhaarOtp", body)
        setLoader(false);
        return data;
    }
    catch (error) {
        setLoader(false);
        return error;
    }

}
export async function getProfile(token, type) {
    try {
        const data = await getABDMReq("/account/profile", token, type)

        return data;
    }
    catch (error) {
        return error;
    }
}
export async function getPNGCard(token, type) {
    try {
        const data = await getABDMReq("/account/getPngCard", token, type)
        const url = URL.createObjectURL(new Blob([data]))
        return url.blob;
    }
    catch (error) {
        return error;
    }
}
export const getCard = async (token, type) => {
    try {
        // console.log('i am getPngCard')
        // const data = await getABDMReq("/account/getPngCard", token,type)
        // const url = URL.createObjectURL(new Blob([data]))
        // return url.blob;
        const { data } = await geneateABDMToken();
        return new Promise((resolve, reject) => {
            axios
                .get(ABDM_URL+"/account/getPngCard", {
                    headers: {
                        Accept: "application/octet-stream",
                        "X-Token": `Bearer ${token}`,
                        Authorization: `Bearer ${data.accessToken}`
                    },
                    responseType: "blob",
                })
                .then((response) => {
                    const url = URL.createObjectURL(new Blob([response.data]));
                    return resolve(url);
                })
                .catch((error) => {
                    if (error.response && error.response.status !== 401) {

                    }
                });
        });
    }
    catch (error) {
        return error;
    }

    // return new Promise((resolve, reject) => {
    //   axios
    //     .get("https://healthidsbx.abdm.gov.in/api/v1/account/getPngCard", {
    //       headers: {
    //         Accept: "application/octet-stream",
    //         "X-Token": `Bearer ${token}`,
    //         Authorization: `Bearer ${gntoken.accessToken}`
    //       },
    //       responseType: "blob",
    //     })
    //     .then((response) => {
    //       const url = URL.createObjectURL(new Blob([response.data]));
    //       return resolve(url);
    //     })
    //     .catch((error) => {
    //       if (error.response && error.response.status !== 401) {

    //       }
    //     });
    // });
};
