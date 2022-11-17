import { SET_VIEW_STOCK_BALANCE_EXPIRY, SET_RECEPT_TO_GENRAL_STORE } from "../constants/action-types";

const initialState = {
  viewStockBalanceExpiry: [],
  receptToGenralStoreList: [],
};

function mainStoreReducer(state = initialState, action) {
  switch (action.type) {
    case SET_VIEW_STOCK_BALANCE_EXPIRY:
      state.viewStockBalanceExpiry = action.payload;
      return state;
    case SET_RECEPT_TO_GENRAL_STORE:
      state.receptToGenralStoreList = action.payload;
      return state;
    default:
      return state;
  }
}

export default mainStoreReducer;
