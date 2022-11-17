import { createAction } from './createAction'
import {InventoryService} from "../services/data/inventoryService"
import {ADD_STORE,SET_STORE_DETAILS,UPDATE_STORE,DELETE_STORE,
        ADD_ITEM,SET_ITEM_DETAILS,UPDATE_ITEM,DELETE_ITEM,
        SET_CATEGORY_DETAILS,ADD_CATETORY,UPDATE_CATEGORY,DELETE_CATEGORY,
        ADD_UNIT,SET_UNIT_DETAILS,UPDATE_UNIT,DELETE_UNIT,
        SET_SUB_CATEGORY_DETAILS,ADD_SUB_CATETORY,UPDATE_SUB_CATEGORY,DELETE_SUB_CATEGORY,
        ADD_SPECIFICATION,SET_SPECIFICATION_DETAILS,UPDATE_SPEFICIATION,DELETE_SPECIFICATION,
        ADD_DRUG,SET_DRUG_DETAILS,UPDATE_DRUG,DELETE_DRUG,
        ADD_FORMULATION,SET_FORMULATION_DETAILS,UPDATE_FORMULATION,DELETE_FORMULATION,
        SET_ROLE,SET_ATTRIBUTE,SET_PARENT

} from '../constants/action-types'
export const setRole = () => async dispatch => {
        let res = await InventoryService.getRoles()
        dispatch(createAction(SET_ROLE, res.results))
}
export const setAttribute = () => async dispatch => {
        let res = await InventoryService.getAttributes()
        dispatch(createAction(SET_ATTRIBUTE, res))
}
export const setParent = () => async dispatch => {
        let res = await InventoryService.getParents()
        dispatch(createAction(SET_PARENT, res))
}
export const setStoreDetail = () => async dispatch => {
        let res = await InventoryService.getStoreDetails()
        dispatch(createAction(SET_STORE_DETAILS, res))
}
export const addStore = payload => async (dispatch, getState) => {
        let res = await InventoryService.addStore(payload)
        if(!res.error){
        let storeList = getState().inventory.storeList
        storeList.push(res)
        dispatch(createAction(ADD_STORE, storeList))
        }     
}
export const updateStore = payload => async (dispatch, getState) => {
        let res = await InventoryService.updateStore(payload)
        if(!res.error){
        let storeList = getState().inventory.storeList
        let arr = storeList.find(element => element.storeUuid == res.storeUuid)
        let index = storeList.indexOf(arr)
        storeList[index]= res
        dispatch(createAction(UPDATE_STORE, storeList))
        }
}
export const deleteStore = payload => async (dispatch,getState) => {
        let res = await InventoryService.deleteStore(payload)
        if(res.ok){
        let storeList = getState().inventory.storeList
        let arr = storeList.filter(element => !payload.includes(element.storeUuid))
        dispatch(createAction(DELETE_STORE, arr))
        }    
}
//item 
export const setItemDetail = payload =>async dispatch =>{
        let res = await InventoryService.getItemLists()
        dispatch(createAction(SET_ITEM_DETAILS, payload))

}
export const addItem = payload =>async dispatch =>{
        let res = await InventoryService.addItem(payload)
        dispatch(createAction(ADD_ITEM, payload))

}
export const updateItem = payload =>async dispatch =>{
        let res = await InventoryService.updateItem(payload)
        dispatch(createAction(UPDATE_ITEM, payload))

} 
export const deleteItem = payload =>async dispatch =>{
        let res = await InventoryService.deleteItem(payload)
        dispatch(createAction(DELETE_ITEM, payload))
}
// category 
export const setCategoryDetail = payload => async dispatch =>{
        let res = await InventoryService.getDrugCategoryLists()
        dispatch(createAction(SET_CATEGORY_DETAILS, res))
} 
export const addCategory = payload =>async (dispatch, getState) =>{
        let res = await InventoryService.addDrugCategory(payload)
        if(!res.error){
        let categoryList = getState().inventory.categoryList
        categoryList.push(res)
        dispatch(createAction(ADD_CATETORY, categoryList))
        }
} 
export const updateCategory = payload =>async (dispatch, getState) =>{
        let res = await InventoryService.updateDrugCategory(payload)
        if(!res.error){
        let categoryList = getState().inventory.categoryList
        let arr = categoryList.find(element => element.uuid == res.uuid)
        let index = categoryList.indexOf(arr)
        categoryList[index]= res
        dispatch(createAction(UPDATE_CATEGORY, categoryList))
        }
} 
export const deleteCategory = payload =>async (dispatch,getState) =>{
        let res = await InventoryService.deleteDrugCategory(payload)
        if(res.ok){
         let categoryList = getState().inventory.categoryList
         let arr = categoryList.filter(element => !payload.includes(element.uuid))
          dispatch(createAction(DELETE_CATEGORY, arr))
        }
} 
// unit
export const setUnitDetail =() => async dispatch =>{
        let res = await InventoryService.getDrugUnitLists()
        dispatch(createAction(SET_UNIT_DETAILS, res))
} 
export const addUnit = payload => async (dispatch, getState) =>{
        let res= await InventoryService.addDrugUnit(payload)
        if(!res.error){
          let unitList = getState().inventory.unitList
          unitList.push(res)
          dispatch(createAction(ADD_UNIT,unitList ))
        }
} 
export const updateUnit = payload => async (dispatch,getState) =>{
        let res = await InventoryService.updateDrugUnit(payload)
        if(!res.error){
        let unitList = getState().inventory.unitList
        let arr = unitList.find(element => element.uuid == res.uuid)
        let index = unitList.indexOf(arr)
        unitList[index]= res
         dispatch(createAction(UPDATE_UNIT, unitList))
        }
} 
export const deleteUnit = payload =>async  (dispatch, getState) =>{
        let res = await InventoryService.deleteDrugUnit(payload)
        if(res.ok){
         let unitList = getState().inventory.unitList
         let arr = unitList.filter(element => !payload.includes(element.uuid))
         dispatch(createAction(DELETE_UNIT,arr))
        }
   }

// Sub category
export const setSubCategoryDetail = payload => async dispatch =>{
        let res = await InventoryService.getDrugSubCategoryLists()
        dispatch(createAction(SET_SUB_CATEGORY_DETAILS, payload))
}
export const addSubCategory = payload => async dispatch =>{
        let res = await InventoryService.addDrugSubCategory(payload)
        dispatch(createAction(ADD_SUB_CATETORY, payload))

} 
export const updateSubCategory = payload => async dispatch =>{
        let res = await InventoryService.updateDrugSubCategory(payload)
        dispatch(createAction(UPDATE_SUB_CATEGORY, payload))

} 
export const deleteSubCategory = payload => async dispatch =>{
        let res = await InventoryService.deleteDrugSubCategory(payload)
        dispatch(createAction(DELETE_SUB_CATEGORY, payload))

}
// SPECIFICATION
export const setSpecificationDetail = payload => async dispatch =>{
        let res = await InventoryService.getDrugSpecificationtLists
        dispatch(createAction(SET_SPECIFICATION_DETAILS, payload))

} 
export const addSpecification= payload => async dispatch =>{
        let res = await InventoryService.addDrugSpecification(payload)
        dispatch(createAction(ADD_SPECIFICATION, payload))

} 
export const updateSpecification = payload => async dispatch =>{
        let res = await InventoryService.updateDrugSpecification(payload)
        dispatch(createAction(UPDATE_SPEFICIATION, payload))

}
export const deleteSpecification = payload => async dispatch =>{
        let res = await InventoryService.deleteDrugSpecification(payload)
        dispatch(createAction(DELETE_SPECIFICATION, payload))

}

// drug

export const setDrugDetail = () => async dispatch =>{
        let res = await InventoryService.getDrugLists()
        dispatch(createAction(SET_DRUG_DETAILS, res))

} 
export const addDrug = payload => async (dispatch, getState) =>{
        let res = await InventoryService.addDrug(payload)
        if(!res.error){
        let drugList = getState().inventory.drugList
        drugList.push(res)
        dispatch(createAction(ADD_DRUG, drugList))
        }
} 
export const updateDrug = payload =>async (dispatch, getState)=>{
        let res = await InventoryService.updateDrug(payload)
        if(!res.error){
        let drugList = getState().inventory.drugList
        let arr = drugList.find(element => element.uuid == res.uuid)
        let index = drugList.indexOf(arr)
        drugList[index]= res
        dispatch(createAction(UPDATE_DRUG, drugList))
        }

} 
export const deleteDrug = payload =>async (dispatch, getState) =>{
        let res = await InventoryService.deleteDrug(payload)
        if(res.ok){
        let drugList = getState().inventory.drugList
        let arr = drugList.filter(element => !payload.includes(element.uuid))
        dispatch(createAction(DELETE_DRUG, arr))
        }
} 

// FORMULATION
export const setFormulationDetail = () => async dispatch =>{
        let res = await InventoryService.getFormulationLists()
        dispatch(createAction(SET_FORMULATION_DETAILS, res))
} 
export const addFormulation = payload => async (dispatch,getState) => {
        let res = await InventoryService.addFormulation(payload)
        if(!res.error){
        let formulationList = getState().inventory.formulationList
        formulationList.push(res)
        dispatch(createAction(ADD_FORMULATION, formulationList))
        }
}
export const updateFormulation= payload => async (dispatch, getState) => {
        let res = await InventoryService.updateFormulation(payload)
        if(!res.error){
        let formulationList = getState().inventory.formulationList
        let arr = formulationList.find(element => element.uuid == res.uuid)
        let index = formulationList.indexOf(arr)
        formulationList[index]= res
        dispatch(createAction(UPDATE_FORMULATION, formulationList))
        }    
}
export const deleteFormulation = payload => async (dispatch, getState) => {
        let res = await InventoryService.deleteFormulation(payload)
        if(res.ok){
        let formulationList = getState().inventory.formulationList
        let arr = formulationList.filter(element => !payload.includes(element.uuid))
        dispatch(createAction(DELETE_FORMULATION, arr))
        }
}
