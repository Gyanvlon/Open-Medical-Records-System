import { createAction } from './createAction'
import { mainStoreService} from "../services/data/MianStoreService"
import {SET_VIEW_STOCK_BALANCE_LIST, SET_VIEW_STOCK_BALANCE_DETAIL_LIST, SET_TO_STORE_DETAIL_LIST, SET_DRUG_INDENT_DETAIL_LIST,
        SET_VIEW_STOCK_BALANCE_EXPIRY_LIST, DELETE_VIEW_STOCK_BALANCE_EXPIRY,SET_RECIEPT_LIST, SET_RECIEPT_LIST_DETAIL,
        ADD_RECIEPT,FINISH_RECIEPT_THIS_SLIP,CLEAR_RECIEPT_SLIP,DELETE_RECIEPT_SLIP,
        SET_INDENT_LIST,SET_DRUG_INDENT_LIST  
} from '../constants/action-types'
export const setViewStockBalance = () => async dispatch => {
    let res = await mainStoreService.getViewStockBalanceList()
    dispatch(createAction(SET_VIEW_STOCK_BALANCE_LIST, res))
}
export const setViewStockBalanceDetail = () => async dispatch => {
    let res = await mainStoreService.getViewStockBalanceDetailList()
    dispatch(createAction(SET_VIEW_STOCK_BALANCE_DETAIL_LIST, res))
}
export const setStoreDetail = () => async dispatch => {
    let res = await mainStoreService.getStoreDetailList()
    dispatch(createAction(SET_TO_STORE_DETAIL_LIST, res))
}
export const setDrugIndentDetail = () => async dispatch => {
    let res = await mainStoreService.getDrugIndentDetailList()
    dispatch(createAction(SET_DRUG_INDENT_DETAIL_LIST, res))
}
export const setViewStockBalanceExpiry = () => async dispatch => {
    let res = await mainStoreService.getViewStockBalanceExpiryList
    dispatch(createAction(SET_VIEW_STOCK_BALANCE_EXPIRY_LIST, res))
}
export const setReciept = () => async dispatch => {
    let res = await mainStoreService.getRecieptList()
    console.log('jjdjd', res)
    dispatch(createAction(SET_RECIEPT_LIST, res))
}
export const setRecieptDetail = () => async dispatch => {
    let res = await mainStoreService.getRecieptListDetailList()
    dispatch(createAction(SET_RECIEPT_LIST_DETAIL, res))
}
export const setIndent = () => async dispatch => {
    let res = await mainStoreService.getIndentList()
    dispatch(createAction(SET_INDENT_LIST, res))
}
export const setDrugIndent = () => async dispatch => {
    let res = await mainStoreService.getDrugIndentList()
    dispatch(createAction(SET_DRUG_INDENT_LIST, res))
}
export const deleteViewStockBalanceExpiry = payload => async (dispatch,getState) => {
    let res = await mainStoreService.deleteViewStockBalanceExpiry(payload)
    if(res.ok){
    let storeList = getState().mainStore.storeList
    let arr = storeList.filter(element => !payload.includes(element.storeUuid))
    dispatch(createAction(DELETE_VIEW_STOCK_BALANCE_EXPIRY, arr))
    }    
}
export const clearRecieptSlip = payload => async (dispatch,getState) => {
    let res = await mainStoreService.clearRecieptSlip(payload)
    if(res.ok){
    let storeList = getState().inventory.storeList
    let arr = storeList.filter(element => !payload.includes(element.storeUuid))
    dispatch(createAction(CLEAR_RECIEPT_SLIP, arr))
    }    
}
export const deleteRecieptSlip = payload => async (dispatch,getState) => {
    let res = await mainStoreService.deleteRecieptSlip(payload)
    if(res.ok){
    let storeList = getState().inventory.storeList
    let arr = storeList.filter(element => !payload.includes(element.storeUuid))
    dispatch(createAction(DELETE_RECIEPT_SLIP, arr))
    }    
}
export const addReciept = payload => async (dispatch, getState) => {
    let res = await mainStoreService.ADD_RECIEPT(payload)
    if(!res.error){
    let storeList = getState().inventory.storeList
    storeList.push(res)
    dispatch(createAction(ADD_RECIEPT, storeList))
    }     
}
export const finishRecieptThisSlip = payload => async (dispatch, getState) => {
    let res = await mainStoreService.finishRecieptThisSlip(payload)
    if(!res.error){
    let storeList = getState().inventory.storeList
    storeList.push(res)
    dispatch(createAction(FINISH_RECIEPT_THIS_SLIP, storeList))
    }     
}