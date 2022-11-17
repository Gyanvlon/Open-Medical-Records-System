import { SET_BILLINCE_AMBULANCE, SET_LSIT_OF_AMBULANCE } from "../constants/action-types";


export function addBillingAmbulanceDriver(payload) {
  return { type: SET_BILLINCE_AMBULANCE, payload };
}

export function addBillingAmbulanceList(payload) {
  return { type: SET_LSIT_OF_AMBULANCE, payload };
}