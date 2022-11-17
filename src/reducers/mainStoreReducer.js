import {SET_VIEW_STOCK_BALANCE_LIST, SET_VIEW_STOCK_BALANCE_DETAIL_LIST, SET_TO_STORE_DETAIL_LIST, SET_DRUG_INDENT_DETAIL_LIST,
        SET_VIEW_STOCK_BALANCE_EXPIRY_LIST, DELETE_VIEW_STOCK_BALANCE_EXPIRY,SET_RECIEPT_LIST, SET_RECIEPT_LIST_DETAIL,
        ADD_RECIEPT,FINISH_RECIEPT_THIS_SLIP,CLEAR_RECIEPT_SLIP,DELETE_RECIEPT_SLIP,
        SET_INDENT_LIST,SET_DRUG_INDENT_LIST 
  } from "../constants/action-types";

  const INITIAL_STATE = {
    viewStockBalanceList:[],
    viewStockBalanceDetailList:[],
    viewStockBalanceExpiryList:[],
    toStoreDetailList:[],
    drugIndentDetailList:[],
    recieptList:[],
    recieptDetailList:[],
    indentList:[],
    drugIndentList:[],
  };
  
  const mainStore = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
      case SET_VIEW_STOCK_BALANCE_LIST:
        return {
          ...state,
          viewStockBalanceList: payload,
        };
        case SET_VIEW_STOCK_BALANCE_DETAIL_LIST:
        return {
          ...state,
          viewStockBalanceDetailList: payload,
        };
        case SET_TO_STORE_DETAIL_LIST:
        return {
          ...state,
          toStoreDetailList: payload,
        };
        case SET_DRUG_INDENT_DETAIL_LIST:
        return {
          ...state,
          drugIndentDetailList: payload,
        };
        case SET_VIEW_STOCK_BALANCE_EXPIRY_LIST:
        return {
          ...state,
          viewStockBalanceExpiryList: payload,
        };
        case DELETE_VIEW_STOCK_BALANCE_EXPIRY:
        return {
          ...state,
          viewStockBalanceExpiryList: payload,
        };
        case SET_RECIEPT_LIST:
        return {
          ...state,
          recieptList: payload,
        };
        case SET_RECIEPT_LIST_DETAIL:
        return {
          ...state,
          recieptDetailList: payload,
        };
        case ADD_RECIEPT:
        return {
          ...state,
          recieptList: payload,
        };
        case FINISH_RECIEPT_THIS_SLIP:
        return {
          ...state,
          recieptList: payload,
        };
        case CLEAR_RECIEPT_SLIP:
        return {
          ...state,
          recieptList: [],
        };
        case DELETE_RECIEPT_SLIP:
        return {
          ...state,
          recieptList: payload,
        };
        case SET_INDENT_LIST:
        return {
          ...state,
          indentList: payload,
        };
        case SET_DRUG_INDENT_LIST:
        return {
          ...state,
          drugIndentList: payload,
        };
      default:
        return state;
    }
  };
  export default mainStore;
  
  