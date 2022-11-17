export const USER_TOKEN = "authenticatedUser";
export const REMEMBER_ME = "REMEMBER_ME";
export const JSESSIONID = "JSESSIONID";
export const SESSION_TIME_OUT = 1 / 48;
export const PROXY_SERVER = "https://fatidique-choucroute-97606.herokuapp.com/";

//Google Recaptcha V3 keys
export const G_SITE_KEY = "6LcNSo8gAAAAAFjM7ARaoSHRYZZDpApndmbMB3KV";
export const G_SECRET_KEY = "6LcNSo8gAAAAANClee4dz7-14bGkVA0LZWveHWMW";
export const ABDM_Client_Id = "SBX_001530";
export const ABDM_Client_Secret = "448c8543-9028-44a9-a8e7-2b67f6196e39";
export const ABDM_TOKEN_URL =
  process.env.NODE_ENV === "development"
    ? "https://dev.abdm.gov.in/gateway/v0.5"
    : "https://dev.abdm.gov.in/gateway/v0.5";
export const ABDM_URL =
  process.env.NODE_ENV === "development"
    ? "https://healthidsbx.abdm.gov.in/api/v1"
    : "https://healthidsbx.abdm.gov.in/api/v1";
export const localstorage_key = "colorkey";
export const GENERAL_LABORATORY_UUID = "c7387d0f-8116-462a-bd5a-70b9e304bd74";
export const GENERAL_WARDCATEGORYUUID = "073c598b-9e66-4c1d-a833-6557567a599b";
export const MPI_URL =
  process.env.NODE_ENV === "development"
    ? "https://ln3.hispindia.org/openmrs_mpi/ws/rest/v1"
    : "https://ln3.hispindia.org/openmrs_mpi/ws/rest/v1";

export const PRE_NUM = "91";

export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "https://ln3.hispindia.org/openmrs/ws/rest/v1"
    : "https://ln3.hispindia.org/openmrs/ws/rest/v1";

/*Add Adress Hierarcy path provided by new api*/
export const ADRESSBASE_URL_API =
  process.env.NODE_ENV === "development"
    ? "https://ln3.hispindia.org/openmrs/ws/rest/v1"
    : "https://ln3.hispindia.org/openmrs/ws/rest/v1";

//addressapi-new
export const ADRESSBASE_URL_API_New =
  process.env.NODE_ENV === "development"
    ? "https://ln3.hispindia.org/openmrs/ws/hisp/rest"
    : "https://ln3.hispindia.org/openmrs/ws/hisp/rest";

// Concepts
export const HEIGHT = "5090AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
export const WEIGHT = "5089AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
export const BMI = "d7d7dc30-13d5-4661-942e-f69fd1701079";
export const SYSTOLIC = "5085AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
export const DIASTOLIC = "5086AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";

export const CONCEPT_SYMPTOPM = "Symptom";
export const CONCEPT_DIAGNOSIS = "Diagnosis";
export const CONCEPT_PROCEDURE = "Procedure";
export const CONCEPT_INVESTIGATION = "Test";
export const CONCEPT_DRUG = "Drug";
export const CONCEPT_VITAL = "Vital";
export const CONCEPT_OPD_VISIT_OUTCOME_UUID =
  "2da0546f-c201-4885-8a99-b09317894adc";

export const ENCOUNTER_TYPE_VITALS = "Vitals";
export const ENCOUNTER_TYPE_VISIT_NOTE = "Visit Note";
export const ENCOUNTER_TYPE_VISIT_INFO = "Visit Info";
export const ENCOUNTER_TYPE_PATIENT_HISTORY = "Patient History";
export const ENCOUNTER_TYPE_DISCHARGE = "Discharge";
export const ENCOUNTER_TYPE_CHECK_IN = "Check In";

export const VISIT_OUTCOME_CURED = "Cured";
export const VISIT_OUTCOME_REVIEWED = "Reviewed";
export const VISIT_OUTCOME_DIED = "Died";
export const VISIT_OUTCOME_FOLLOW_UP = "Follow Up";
export const VISIT_OUTCOME_ADMIT = "Admit";

export const LOCATION_OUTPATIENT_TAG = "OPD Location";
export const LOCATION_INPATIENT_TAG = "IPD Location";

export const ANSWER_YES = "Yes";

export const HOSPITAL_NAME =
  process.env.NODE_ENV === "development"
    ? "acd05df0-e499-4613-ab8f-818c5470c79e"
    : "acd05df0-e499-4613-ab8f-818c5470c79e";
export const HOSPITAL_DISTRICT =
  process.env.NODE_ENV === "development"
    ? "97941f41-7377-4456-b999-a424ec904796"
    : "64016214-2231-4cf2-9ae1-1c18d4dc1ec0";
export const HIP_ID = "hisp-openmrs";
export const HEALTH_ID = "29d245a2-fdff-4ea0-bffe-f926d4816081";
export const HEALTH_NUMBER = "029ceb40-3837-4a8b-9233-bfd4cb8876c5";
export const AADHAAR = "5429f2ac-9319-481e-a74b-a99abbc419e0";
export const PERSON_UPDATED = "75f95cc0-aff4-4025-9f69-27029d186e95";
export const PATIENT_UPDATED = "7317240c-13c9-4dc0-9c8c-7916d568fc47";
export const MPI_ID = "4ea2ceb4-2edf-454f-af76-ef7e8d777901";
//export const District_Dropdown= "Solan";
//export const REGISTRATION_HOSPITAL_NAME = "RH Solan";
export const District_Dropdown = "Shimla";
export const REGISTRATION_HOSPITAL_NAME = "Deendyal Upadhyay Zonal Hospital";
