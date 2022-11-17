import { getaddressAPI } from "../index";
export class PatientSearchData {
  /**
   * returns all Patient Details List.
   * @param {string} fields given as argument Parameter to search
   */
  static PatientSearchDataFunc = async (arg) => {
    const url = `/search/patients?name=` + arg;
    try {
      let patient = (await getaddressAPI(url)).data;
      return patient;
    } catch (err) {
      return null;
    }
  };
}
