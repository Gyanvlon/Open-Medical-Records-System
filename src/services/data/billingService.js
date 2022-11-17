import { BASE_URL } from "../../utils/constants";


async function getBillingAmbulanceDriver() {
    const requestOptions = { method: 'GET' }
    let response = await fetch(BASE_URL + "/driver/all-drivers", requestOptions);
    return response.json();
}
async function getAmbulanceListInBilling() {
    const requestOptions = { method: 'GET' }
    let response = await fetch(BASE_URL + "/ambulance/all-ambulances", requestOptions);
    return response.json();
}


export const BillingService = {
    getBillingAmbulanceDriver,
    getAmbulanceListInBilling,
};