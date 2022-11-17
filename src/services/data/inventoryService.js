import { BASE_URL } from "../../utils/constants";
import Cookies from "js-cookie";
export const InventoryService = {
  getStoreDetails,
  getStore,
  addStore,
  updateStore,
  deleteStore,
  getItemLists,
  addItem,
  updateItem,
  deleteItem,
  getFormulationLists,
  getFormulation,
  addFormulation,
  updateFormulation,
  deleteFormulation,
  getDrugUnitLists,
  getDrugUnit,
  addDrugUnit,
  updateDrugUnit,
  deleteDrugUnit,
  getDrugCategoryLists,
  getDrugCategory,
  addDrugCategory,
  updateDrugCategory,
  deleteDrugCategory,
  getDrugSubCategoryLists,
  addDrugSubCategory,
  updateDrugSubCategory,
  deleteDrugSubCategory,
  getDrugLists,
  getDrug,
  addDrug,
  updateDrug,
  deleteDrug,
  getDrugSpecificationtLists,
  addDrugSpecification,
  updateDrugSpecification,
  deleteDrugSpecification,
  getRoles,
  getParents,
  getAttributes,
  searchGenericName,
};
async function getStoreDetails() {
  const requestOptions = { method: 'GET'}
  let response = await fetch(BASE_URL + "/manage-store/all-store-details", requestOptions);
  return response.json();
}
async function getStore(uuid) {
  const requestOptions = { method: 'GET'}
  let response = await fetch(BASE_URL + "/manage-store/store-details?storeUuid="+uuid, requestOptions);
  return response.json();
}
async function getRoles() {
  const requestOptions = { method: 'GET'}
  let response = await fetch(BASE_URL + "/role",requestOptions);
  return response.json();
}
async function getAttributes() {
  const requestOptions = { method: 'GET'}
  let response = await fetch(BASE_URL + "/drug/attributes",requestOptions);
  return response.json();
}
async function getParents() {
  const requestOptions = { method: 'GET'}
  let response = await fetch(BASE_URL + "/manage-store/store-form-details",requestOptions);
  return response.json();
}
async function searchGenericName(value) {
  const requestOptions = { method: 'GET', 
  headers: {
    Authorization: Cookies.get("JSESSIONID"),
  },
   }
  let response = await fetch(BASE_URL + "/drug?q="+value,requestOptions);
  return response.json();
}

async function addStore(data) {
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
async function updateStore(data) {
  const requestOptions = {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  };
  let response = await fetch(
    BASE_URL + "/manage-store/edit-store",
    requestOptions
  );
  return response.json();
}
async function deleteStore(data) {
  const requestOptions = {
    method: "DELETE",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  };
  let response = await fetch(
    BASE_URL + "/manage-store/delete-stores",
    requestOptions
  );
  return response;
}

async function getItemLists() {
  let response = await fetch(BASE_URL + "");
  return JSON.stringify(response);
}
async function addItem(data) {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  };
  let response = await fetch(BASE_URL + "", requestOptions);
  return JSON.stringify(response);
}
async function updateItem(data) {
  const requestOptions = {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  };
  let response = await fetch(BASE_URL + "", requestOptions);
  return JSON.stringify(response);
}
async function deleteItem(data) {
  const requestOptions = {
    method: "DELETE",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  };
  let response = await fetch(BASE_URL + "", requestOptions);
  return JSON.stringify(response);
}

// formulation
async function getFormulationLists() {
  const requestOptions = { method: 'GET'}
  let response = await fetch(
    BASE_URL + "/drug-formulation/all-formulation-details",requestOptions
  );
  return response.json();
}
async function getFormulation(uuid) {
  const requestOptions = { method: 'GET'}
  let response = await fetch(
    BASE_URL + "/drug-formulation/formulation-details?formulationUuid="+uuid,requestOptions
  );
  return response.json();
}
async function addFormulation(data) {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  };
  let response = await fetch(BASE_URL + "/drug-formulation/add-drug-formulation",requestOptions);
  return response.json();
}
async function updateFormulation(data) {
  const requestOptions = {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  };
  let response = await fetch(
    BASE_URL + "/drug-formulation/edit-drug-formulation",
    requestOptions
  );
  return response.json();
}
async function deleteFormulation(data) {
  const requestOptions = {
    method: "DELETE",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  };
  let response = await fetch(
    BASE_URL + "/drug-formulation/delete-drug-formulations",
    requestOptions
  );
  return response;
}

// drug unit
async function getDrugUnitLists() {
  const requestOptions = { method: 'GET'}
  let response = await fetch(BASE_URL + "/drug-unit/all-unit-details", requestOptions);
  return response.json();
}
async function getDrugUnit(uuid) {
  const requestOptions = { method: 'GET'}
  let response = await fetch(BASE_URL + "/drug-unit/unit-details?unitUuid="+uuid, requestOptions);
  return response.json();
}
 async function addDrugUnit(data) {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(data),
    headers: { 
    "Content-Type": "application/json",
   },
  };
   let response = await fetch( BASE_URL + "/drug-unit/add-drug-unit",requestOptions);
   return response.json()
}
async function updateDrugUnit(data) {
  const requestOptions = {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json"},
  };
  let response = await fetch(
    BASE_URL + "/drug-unit/edit-drug-unit",
    requestOptions
  );
  return response.json();
}
async function deleteDrugUnit(data) {
  const requestOptions = {
    method: "DELETE",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  };
  let response = await fetch(BASE_URL + "/drug-unit/delete-drug-units", requestOptions);
  return response;
}
// dru category
async function getDrugCategoryLists() {
  const requestOptions = { method: 'GET'}
  let response = await fetch(BASE_URL + "/drug-category/all-category-details",requestOptions);
  return response.json();
}
async function getDrugCategory(uuid) {
  const requestOptions = { method: 'GET'}
  let response = await fetch(BASE_URL + "/drug-category/category-details?categoryUuid="+uuid,requestOptions);
  return response.json();
}
async function addDrugCategory(data) {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  };
  let response = await fetch(
    BASE_URL + "/drug-category/add-drug-category",
    requestOptions
  );
  return response.json();
}
async function updateDrugCategory(data) {
  const requestOptions = {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  };
  let response = await fetch(
    BASE_URL + "/drug-category/edit-drug-category",
    requestOptions
  );
  return response.json();
}
async function deleteDrugCategory(data) {
  const requestOptions = {
    method: "DELETE",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  };
  let response = await fetch(
    BASE_URL + "/drug-category/delete-drug-categories",
    requestOptions
  );
  return response;
}

//drug
async function getDrugLists() {
    const requestOptions = { method: 'GET'}
    let response = await fetch(BASE_URL + "/drug/all-drug-details",requestOptions);
    return response.json();
  }
  async function getDrug(uuid) {
    const requestOptions = { method: 'GET'}
    let response = await fetch(BASE_URL + "/drug/drug-details?inventoryDrugUuid="+uuid,requestOptions);
    return response.json();
  }
  async function addDrug(data) {
    const requestOptions = {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    };
    let response = await fetch(BASE_URL + "/drug/add-drug", requestOptions);
    return response.json();
  }
  async function updateDrug(data) {
    const requestOptions = {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    };
    let response = await fetch(BASE_URL + "/drug/edit-drug", requestOptions);
    return response.json();
  }
  async function deleteDrug(data) {
    const requestOptions = {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    };
    let response = await fetch(BASE_URL + "/drug/delete-drug", requestOptions);
    return response;
  }

  // sub category 

  async function getDrugSubCategoryLists() {
    let response = await fetch(BASE_URL + "");
    return JSON.stringify(response);
  }
  async function addDrugSubCategory(data) {
    const requestOptions = {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    };
    let response = await fetch(BASE_URL + "", requestOptions);
    return JSON.stringify(response);
  }
  async function updateDrugSubCategory(data) {
    const requestOptions = {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    };
    let response = await fetch(BASE_URL + "", requestOptions);
    return JSON.stringify(response);
  }
  async function deleteDrugSubCategory(data) {
    const requestOptions = {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    };
    let response = await fetch(BASE_URL + "", requestOptions);
    return JSON.stringify(response);
  }

  // specification
  async function getDrugSpecificationtLists() {
    let response = await fetch(BASE_URL + "");
    return JSON.stringify(response);
  }
  async function addDrugSpecification(data) {
    const requestOptions = {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    };
    let response = await fetch(BASE_URL + "", requestOptions);
    return JSON.stringify(response);
  }
  async function updateDrugSpecification(data) {
    const requestOptions = {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    };
    let response = await fetch(BASE_URL + "", requestOptions);
    return JSON.stringify(response);
  }
  async function deleteDrugSpecification(data) {
    const requestOptions = {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    };
    let response = await fetch(BASE_URL + "", requestOptions);
    return JSON.stringify(response);
  }