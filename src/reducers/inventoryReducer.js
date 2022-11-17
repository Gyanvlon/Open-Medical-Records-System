import {
  ADD_STORE,
  SET_STORE_DETAILS,
  UPDATE_STORE,
  DELETE_STORE,
  ADD_ITEM,
  SET_ITEM_DETAILS,
  UPDATE_ITEM,
  DELETE_ITEM,
  SET_CATEGORY_DETAILS,
  ADD_CATETORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  ADD_UNIT,
  SET_UNIT_DETAILS,
  UPDATE_UNIT,
  DELETE_UNIT,
  SET_SUB_CATEGORY_DETAILS,
  ADD_SUB_CATETORY,
  UPDATE_SUB_CATEGORY,
  DELETE_SUB_CATEGORY,
  ADD_SPECIFICATION,
  SET_SPECIFICATION_DETAILS,
  UPDATE_SPEFICIATION,
  DELETE_SPECIFICATION,
  ADD_DRUG,
  SET_DRUG_DETAILS,
  UPDATE_DRUG,
  DELETE_DRUG,
  ADD_FORMULATION,
  SET_FORMULATION_DETAILS,
  UPDATE_FORMULATION,
  DELETE_FORMULATION,
  SET_ROLE,
  SET_ATTRIBUTE,
  SET_PARENT
} from "../constants/action-types";

const INITIAL_STATE = {
  roleList: [],
  parentList: [],
  attributeList: [],
  storeList: [],
  itemList: [],
  categoryList: [],
  unitList: [],
  subCategoryList: [],
  specificationList: [],
  drugList: [],
  formulationList: [],
  isStoreAdd: false,
  isStoreUpdate: false,
  isStoreDelete: false,
  isItemAdd: false,
  isItemUpdate: false,
  isItemDelete: false,
  isDrugAdd: false,
  isDrugUpdate: false,
  isDrugDelete: false,
  isCategoryAdd: false,
  isCategoryUpdate: false,
  isCategoryDelete: false,
  isSubCategoryAdd: false,
  isSubCategoryUpdate: false,
  isSubCategoryDelete: false,
  isUnitAdd: false,
  isUnitUpdate: false,
  isUnitDelete: false,
  isFormulationAdd: false,
  isFormulationUpdate: false,
  isFormulationDelete: false,
  isSpeficationAdd: false,
  isSpeficationUpdate: false,
  isSpeficationDelete: false,
};

const inventory = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SET_ROLE:
      return {
        ...state,
        roleList: payload,
      };
      case SET_PARENT:
        return {
          ...state,
          parentList: payload,
        };
        case SET_ATTRIBUTE:
          return {
            ...state,
            attributeList: payload,
          };
    case SET_STORE_DETAILS:
      return {
        ...state,
        storeList: payload,
      };
    case ADD_STORE:
      return {
        ...state,
        storeList: payload,
        isStoreAdd: true
      };
    case UPDATE_STORE:
      return {
        ...state,
        storeList: payload,
        isStoreUpdate: true
      };
    case DELETE_STORE:
      return {
        ...state,
        storeList: payload,
        isStoreDelete: true
      };
    case SET_ITEM_DETAILS:
      return {
        ...state,
        itemList: [payload],
      };
    case ADD_ITEM:
      return {
        ...state,
        isItemAdd: true
      };
    case UPDATE_ITEM:
      return {
        ...state,
        isItemUpdate: true
      };
    case DELETE_ITEM:
      return {
        ...state,
        isItemDelete: true
      };
    case SET_CATEGORY_DETAILS:
      return {
        ...state,
        categoryList: payload,
      };
    case ADD_CATETORY:
      return {
        ...state,
        categoryList: payload,
        isCategoryAdd: true
      };
    case UPDATE_CATEGORY:
      return {
        ...state,
        isCategoryUpdate: true
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        categoryList: payload,
        isCategoryDelete: true
      };
    case SET_UNIT_DETAILS:
      return {
        ...state,
        unitList: payload,
      };
    case ADD_UNIT:
      return {
        ...state,
        unitList: payload,
        isUnitAdd: true
      };
    case UPDATE_UNIT:
      return {
        ...state,
        unitList: payload,
        isUnitUpdate: true
      };
    case DELETE_UNIT:
      return {
        ...state,
        unitList: payload,
        isUnitDelete: true
      };
    case SET_SUB_CATEGORY_DETAILS:
      return {
        ...state,
        subCategoryList: [payload],
      };
    case ADD_SUB_CATETORY:
      return {
        ...state,
        isSubCategoryAdd: true
      };
    case UPDATE_SUB_CATEGORY:
      return {
        ...state,
        isSubCategoryUpdate: true
      };
    case DELETE_SUB_CATEGORY:
      return {
        ...state,
        isSubCategoryDelete: true
      };
    case SET_SPECIFICATION_DETAILS:
      return {
        ...state,
        specificationList: [payload],
      };
    case ADD_SPECIFICATION:
      return {
        ...state,
        isSpecificationAdd: true
      };
    case UPDATE_SPEFICIATION:
      return {
        ...state,
        isSpecificationUpdate: true
      };
    case DELETE_SPECIFICATION:
      return {
        ...state,
        isSpecificationDelete: true
      };
    case SET_DRUG_DETAILS:
      return {
        ...state,
        drugList: payload,
      };
    case ADD_DRUG:
      return {
        ...state,
        drugList: payload,
        isDrugAdd: true
      };
    case UPDATE_DRUG:
      return {
        ...state,
        drugList: payload,
        isDrugUpdate: true
      };
    case DELETE_DRUG:
      return {
        ...state,
        drugList: payload,
        isDrugDelete: true
      };
    case SET_FORMULATION_DETAILS:
      return {
        ...state,
        formulationList: payload,
      };
    case ADD_FORMULATION:
      return {
        ...state,
        isFormulationAdd: true
      };
    case UPDATE_FORMULATION:
      return {
        ...state,
        isFormulationUpdate: true
      };
    case DELETE_FORMULATION:
      return {
        ...state,
        formulationList: payload,
        isFormulationDelete: true
      };

    default:
      return state;
  }
};
export default inventory;
