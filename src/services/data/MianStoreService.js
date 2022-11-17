import { BASE_URL } from "../../utils/constants";
import Cookies from "js-cookie";
export const mainStoreService = {
  getViewStockBalanceList,
  getViewStockBalanceDetailList,
  getStoreDetailList,
  getDrugIndentDetailList,
  getViewStockBalanceExpiryList,
  deleteViewStockBalanceExpiry,
  getRecieptList,
  getRecieptListDetailList,
  addReciept,
  finishRecieptThisSlip,
  clearRecieptSlip,
  deleteRecieptSlip,
  getIndentList,
  getDrugIndentList,
};
async function getViewStockBalanceList() {
    const requestOptions = { method: 'GET'}
    let response = await fetch(BASE_URL +"", requestOptions);
    return response.json();
  }
async function getViewStockBalanceDetailList() {
    const requestOptions = { method: 'GET'}
    let response = await fetch(BASE_URL +"", requestOptions);
    return response.json();
  }
async function getStoreDetailList() {
    const requestOptions = { method: 'GET'}
    let response = await fetch(BASE_URL +"", requestOptions);
    return response.json();
  }
async function getDrugIndentDetailList() {
    const requestOptions = { method: 'GET'}
    let response = await fetch(BASE_URL +"", requestOptions);
    return response.json();
  }
async function getViewStockBalanceExpiryList() {
    const requestOptions = { method: 'GET'}
    let response = await fetch(BASE_URL +"", requestOptions);
    return response.json();
  }async function getRecieptList() {
    const requestOptions = { method: 'GET'}
    let response = await fetch(BASE_URL +"/receiptsToStoreList/receipts", requestOptions);
    return response.json();
  }
async function getRecieptListDetailList() {
    const requestOptions = { method: 'GET'}
    let response = await fetch(BASE_URL +"", requestOptions);
    return response.json();
  }async function getIndentList() {
    const requestOptions = { method: 'GET'}
    let response = await fetch(BASE_URL +"", requestOptions);
    return response.json();
  }
async function getDrugIndentList() {
    const requestOptions = { method: 'GET'}
    let response = await fetch(BASE_URL +"", requestOptions);
    return response.json();
  }
async function addReciept(data) {
    const requestOptions = {
      method: "POST",
      body: JSON.stringify(data),
      headers: { 
      "Content-Type": "application/json",
     },
    };
     let response = await fetch( BASE_URL + "",requestOptions);
     return response.json()
  }
async function finishRecieptThisSlip(data) {
    const requestOptions = {
      method: "POST",
      body: JSON.stringify(data),
      headers: { 
      "Content-Type": "application/json",
     },
    };
     let response = await fetch( BASE_URL + "/manage-store/add-store",requestOptions);
     return response.json()
  }
async function deleteViewStockBalanceExpiry(data) {
    const requestOptions = {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    };
    let response = await fetch(
      BASE_URL + "",
      requestOptions
    );
    return response;
  }
async function clearRecieptSlip(data) {
    const requestOptions = {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    };
    let response = await fetch(
      BASE_URL + "",
      requestOptions
    );
    return response;
  }
async function deleteRecieptSlip(data) {
    const requestOptions = {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    };
    let response = await fetch(
      BASE_URL + "",
      requestOptions
    );
    return response;
  }