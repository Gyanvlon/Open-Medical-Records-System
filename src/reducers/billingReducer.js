import { SET_BILLINCE_AMBULANCE, SET_LSIT_OF_AMBULANCE } from "../constants/action-types";

const initialState = {
  billingAmbulanceDrivers: [],
  ambulancesLists: [],
};

function billingReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LSIT_OF_AMBULANCE:
      state.ambulancesLists = action.payload;
      return state;
    case SET_BILLINCE_AMBULANCE:
      state.billingAmbulanceDrivers = action.payload;
      return state;
    default:
      return state;
  }
}

export default billingReducer;
