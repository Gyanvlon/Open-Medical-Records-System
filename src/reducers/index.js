import { combineReducers } from "redux";
import avatar from "./avatarReducer";
import providers from "./providersReducer";
import locations from "./locationReducer";
import services from "./serviceReducer";
import visits from "./visitsReducer"
import concepts from "./conceptsReducer"
import patient from "./patientReducer"
import appointmentBlockWithTimeSlots from "./appointmentBlockWithTimeSlotReducer";
import encounters from './encountersReducer'
import patientHistory  from "./patientHistoryReducer";
import inventory  from "./inventoryReducer";
import mainStore  from "./mainStoreReducer";


export default combineReducers({
  avatar,
  providers,
  locations,
  services,
  appointmentBlockWithTimeSlots,
  visits,
  concepts,
  patient,
  encounters,
  patientHistory,
  inventory,
  mainStore
});
