import { SET_VIEW_STOCK_BALANCE_EXPIRY,SET_RECEPT_TO_GENRAL_STORE, SET_BILLINCE_AMBULANCE } from "../constants/action-types";

export function addViewStockBalanceExpiry(payload) {
  return { type: SET_VIEW_STOCK_BALANCE_EXPIRY, payload };
}
export function addReceptToGenralStore(payload) {
  return { type: SET_RECEPT_TO_GENRAL_STORE, payload };
}
