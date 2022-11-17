import axios from "axios";
import Cookies from "js-cookie";
import { updateSession } from "../utils/authentication";
import $ from "jquery";
import {
  ABDM_Client_Id,
  ABDM_Client_Secret,
  JSESSIONID,
  BASE_URL,
  ABDM_URL,
  PROXY_SERVER,
  ABDM_TOKEN_URL,
  ADRESSBASE_URL_API,
  MPI_URL,
  ADRESSBASE_URL_API_New,
} from "../utils/constants";
import swal from "sweetalert";
var request = require("request");

export function getOnlineAPI(
  endpoint,
  authorization = Cookies.get(JSESSIONID)
) {
  updateSession();
  const config = {
    headers: {
      Authorization: authorization,
    },
  };
  return axios.get(MPI_URL + endpoint, config);
}

export function geneateABDMToken() {
  var initialBodyPostDataJson = {
    clientId: ABDM_Client_Id,
    clientSecret: ABDM_Client_Secret,
  };
  const success = $.ajax({
    url: PROXY_SERVER + ABDM_TOKEN_URL + "/sessions",
    async: false,
    type: "POST",
    crossDomain: true,
    contentType: "application/json",
    data: JSON.stringify(initialBodyPostDataJson),
    success: function (initialAPIResponse) {
      return initialAPIResponse;
    },
  });
  return success;
}
export async function postABDMReq(url, data) {
  const token = await geneateABDMToken();
  const response = $.ajax({
    url: PROXY_SERVER + ABDM_URL + url,
    async: false,
    type: "POST",
    crossDomain: true,
    contentType: "application/json",
    data: JSON.stringify(data),
    headers: { Authorization: "Bearer " + token.accessToken },
    success: function (response) {
      return JSON.stringify(response);
    },
    error: function (xhr, status, error) {
      var err = JSON.parse(xhr.responseText);
      console.log(err);
      swal({
        title: "Error",
        text: err.details[0] ? err.details[0].message : err.message,
        icon: "error",
      });
    },
  });
  return response;
}
export async function updateABDMReq(url,xtoken, data) {
  const token = await geneateABDMToken();
  const response = $.ajax({
    url: PROXY_SERVER + ABDM_URL + url,
    async: false,
    type: "POST",
    crossDomain: true,
    contentType: "application/json",
    data: JSON.stringify(data),
    headers: { 
      Authorization: "Bearer " + token.accessToken ,
      Accept: "*/*",
      "X-Token": `Bearer ${xtoken}`,
  },
    success: function (response) {
      return JSON.stringify(response);
    },
    error: function (xhr, status, error) {
      var err = JSON.parse(xhr.responseText);
      console.log(err);
      swal({
        title: "Error",
        text: err.details[0] ? err.details[0].message : err.message,
        icon: "error",
      });
    },
  });
  return response;
}
export async function getABDMReq(url, xtoken, responseType) {
  const token = await geneateABDMToken();
  const response = $.ajax({
    url: PROXY_SERVER + ABDM_URL + url,
    async: false,
    type: "GET",
    crossDomain: true,
    contentType: responseType,
    headers: {
      Authorization: "Bearer " + token.accessToken,
      Accept: "*/*",
      "X-Token": `Bearer ${xtoken}`,
    },
    success: function (response) {
      return JSON.stringify(response);
    },
    error: function (xhr, status, error) {
      var err = JSON.parse(xhr.responseText);
      console.log(err);
      swal({
        title: "Error",
        text: err.details[0] ? err.details[0].message : err.message,
        icon: "error",
      });
    },
  });
  return response;
}

export function postReq(url, data, auth, callback) {
  request(
    {
      url: url,
      rejectUnauthorized: false,
      method: "POST",
      json: true, // <--Very important!!!
      body: data,
      headers: {
        authorization: auth,
        "Access-Control-Allow-Origin": "true",
        "content-Type": "application/json",
      },
    },
    function (error, response, body) {
      callback(error, response, body);
    }
  );
}
export function getAPI(endpoint, authorization = Cookies.get(JSESSIONID)) {
  updateSession();
  const config = {
    headers: {
      Authorization: authorization,
    },
  };
  return axios.get(BASE_URL + endpoint, config);
}

export function getaddressAPI(
  endpoint,
  authorization = Cookies.get(JSESSIONID)
) {
  updateSession();
  const config = {
    headers: {
      Authorization: authorization,
    },
  };
  return axios.get(ADRESSBASE_URL_API + endpoint, config);
}

export function getaddressAPINew(
  endpoint,
  authorization = Cookies.get(JSESSIONID)
) {
  updateSession();
  const config = {
    headers: {
      Authorization: authorization,
    },
  };
  return axios.get(ADRESSBASE_URL_API_New + endpoint, config);
}

export function getPatientSearch(
  endpoint,
  authorization = Cookies.get(JSESSIONID)
) {
  updateSession();
  const config = {
    headers: {
      Authorization: authorization,
    },
  };
  return axios.get(ADRESSBASE_URL_API + endpoint, config);
}

export function getImageAPI(endpoint, authorization = Cookies.get(JSESSIONID)) {
  const config = {
    responseType: "blob",
    headers: {
      Authorization: authorization,
    },
  };
  return axios.get(BASE_URL + endpoint, config);
}
export function postCentralAPI(
  endpoint,
  data,
  authorization = Cookies.get(JSESSIONID)
) {
  updateSession();
  const config = {
    headers: {
      Authorization: authorization,
    },
  };
  return axios.post(MPI_URL + endpoint, data, config);
}
export function postAPI(
  endpoint,
  data,
  authorization = Cookies.get(JSESSIONID)
) {
  updateSession();
  const config = {
    headers: {
      Authorization: authorization,
    },
  };
  return axios.post(BASE_URL + endpoint, data, config);
}
export function putAPI(
  endpoint,
  data,
  authorization = Cookies.get(JSESSIONID)
) {
  updateSession();
  const config = {
    headers: {
      Authorization: authorization,
    },
  };
  return axios.put(BASE_URL + endpoint, data, config);
}
export function deleteAPI(endpoint, authorization = Cookies.get(JSESSIONID)) {
  const config = {
    headers: {
      Authorization: authorization,
    },
  };
  return axios.delete(BASE_URL + endpoint, config);
}

/**
 * This function remaps array with a specific field. For example if we want an array to be accessed
 * through the uuid function we pass 'uuid' to fieldToMapWith. This way, each element of an array
 * can be easily accessed because the element is just accessed through the uuid Property.
 * @param {*} array the array containing all elements.
 * @param {*} fieldToMapWith the field to look for in individual elements which will be used as the index
 */
export function remapArrayWithField(array, fieldToMapWith) {
  array.forEach((element) => {
    array[element[fieldToMapWith]] = element;
  });
}
export async function statusAppointment(appointmentId, status) {
  const URL = `/onlineappointment/appointmentstatus?appointment_id=${appointmentId}&status=${status}`;
  try {
    const data = await postCentralAPI(URL);
    return data;
  } catch (error) {
    console.log(error);
  } finally {
    console.log("finished");
  }
}
