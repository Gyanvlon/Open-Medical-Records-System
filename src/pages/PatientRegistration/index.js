import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getAPI,
  postAPI,
  getaddressAPI,
  getaddressAPINew,
} from "../../services/index";
import { Autocomplete } from "@material-ui/lab";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { GridContainer, GridItem } from "../../components/Grid";
import BasicDetails from "./components/Demographics";
import PrintPatientRegistration from "./components/PrintPatientRegistration";
import AvailableTimeSlots from "./components/AvailableTimeSlots";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import moment from "moment";
import swal from "sweetalert";
import PatientConsent from "./components/PatientConsent";
import { getCard } from "../../services/data/SearchHealthId";
import { updateProfile,createHealthIdWithPreVerifiedAadhaar } from "../../services/data/CreateHealthIdWithAadhaar";

import {
  Paper,
  TextField,
  makeStyles,
  useTheme,
  Stepper,
  Step,
  StepButton,
  Button,
  FormHelperText,
  MobileStepper,
} from "@material-ui/core";
import styles from "./styles";
import AutocompleteComponent from "./components/AutocompleteComponent";
import TextFieldComponent from "./components/TextFieldComponent";
import {
  REGISTRATION_HOSPITAL_NAME,
  HOSPITAL_NAME,
  MPI_ID,
  PATIENT_UPDATED,
  PERSON_UPDATED,
  HEALTH_ID,
  HEALTH_NUMBER,
  AADHAAR,
  District_Dropdown,
} from "../../utils/constants";
import Ndhmlayout from "./components/NdhmVerification/Ndhmlayout";

const useStyles = makeStyles(styles);

const initialSate = {
  "First Name*": "",
  "Middle Name": "",
  "Last Name": "",
  "Age*": "",
  "Health Id": "",
  "Health Password": "",
  "Health Number": "",
  "Date of Birth": null,
  "Gender*": null,
  Token: "",
  "Phone Number*": null,
  "Consent Agreement": false,
  "Create Id":false,
  State: "Himachal Pradesh",
  District: District_Dropdown,
};

export default function PatientRegistration() {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [steps, setsteps] = useState(["Health ID", "Demographics"]);
  const [stepsWithContent, setStepsWithContent] = useState();
  const [formValues, setFormValues] = useState(initialSate);
  const [formErrors, setFormErrors] = useState({});
  const [appointmentTypes, setAppointmentTypes] = useState([]);
  const [patientConsentList, setPatientConsentList] = useState([]);
  const [patientConsentStatus, setPatientConsentStatus] = useState([]);
  const [identifier, setIdentifier] = useState("");
console.log('formValues>>>>>>>>>', formValues)
  const [loader, setLoader] = useState(false);
  const [finaltxnId, setFinaltxnId] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [timeSlotsLoading, setTimeSlotsLoading] = useState(false);
  const [personAttributeTypes, setPersonAttributeTypes] = useState();
  const [visitAttributeTypes, setVisitAttributeTypes] = useState();
  const [registrationSuccessData, setRegistrationSuccessData] = useState(null);
  const [addressfields, setaddessfields] = useState([]);
  const [districtfields, setdistrictfields] = useState([]);
  const [cityfields, setcityfields] = useState([]);
  const [stateisselected, setstateisselected] = useState(false);
  const [duplicateAadhar, setDuplicateAadhar] = useState(false);
  useEffect(() => {
    getAPI(
      `/concept?q="Registration Attribute"&v=custom:(answers:(display,answers:(uuid,display,datatype:(display),synonyms:(display),names:(display,conceptNameType),answers:(uuid,display,datatype:(display),names:(display,conceptNameType),answers:(uuid,display,datatype:(display),names:(display,conceptNameType),answers:(uuid,display,datatype:(display),names:(display,conceptNameType)))))`
    )
      .then((response) => {
        const stapsWithContent = response.data.results[0].answers.filter(
          (stepWithContent) =>
            stepWithContent.answers.length >= 1 && stepWithContent
        );
        setsteps([
          "Health ID",
          "Demographics",
          ...stapsWithContent.map((step) => step.display),
        ]);
        //console.log(stapsWithContent)
        setStepsWithContent(stapsWithContent);
      })
      .catch((error) => console.log(error));

    getAPI("/idgen/nextIdentifier?source=1")
      .then((response) => {
        setIdentifier(response.data.results[0].identifierValue);
      })
      .catch((error) => console.log(error));

    getAPI("/appointmentscheduling/appointmenttype?v=custom:(uuid,display)")
      .then((response) => {
        setAppointmentTypes(response.data.results);
      })
      .catch((error) => console.log(error));

    getAPI("/personattributetype?v=custom:(uuid,display)")
      .then((response) => {
        setPersonAttributeTypes(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });

    getAPI("/visitattributetype?v=custom:(uuid,display,datatypeClassname)")
      .then((response) => {
        setVisitAttributeTypes(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });

    const getAddress = async () => {
      const url = `/addresslist?address_name=address-hierarchy`;
      try {
        let address = (await getaddressAPINew(url)).data;
        return address;
      } catch (error) {
        return null;
      }
      //return patient
    };
    getAddress();

    const fetchAddressData = async () => {
      let fetchstateprovience = await getAddress();
      setaddessfields([...fetchstateprovience.state_province]);

      const newarr = fetchstateprovience.state_province.filter((item) => {
        if (item.selected) {
          setdistrictfields([...item.county_district]);
        }
      });
      fetchstateprovience.state_province.map((item) => {
        item.county_district.map((items) => {
          if (items.name === District_Dropdown) {
            setcityfields(items.city_village);
          }
        });
      });
    };
    fetchAddressData();
  }, []);
  function checkIsAdhar(e) {
    console.log(e);
    if (
      e.target.name === "Aadhaar above 10Y*" ||
      e.target.name === "Self Aadhaar*" ||
      e.target.name === "Father Aadhaar*" ||
      e.target.name === "Mother Aadhaar*" ||
      e.target.name === "Guardian Aadhaar*"
    ) {
      if (e.target.value.length > 12) return true;
    } else {
      return false;
    }
  }
  function getStepContent(step) {
    if (step === 0) {
      return (
        <Ndhmlayout
          setFormValues={setFormValues}
          formValues={formValues}
          formErrors={formErrors}
          step={step}
          onPhoneChange={onPhoneChange}
          validatePhone={validatePhone}
          handleNextStep={handleNextStep}
        />
      );
    }
    return (
      <GridContainer>
        {step === 1 ? (
          <BasicDetails
            classes={classes}
            identifier={identifier}
            formErrors={formErrors}PrintPatientRegistration
            formValues={formValues}
            setFormValues={setFormValues}
            onTextChange={onTextChange}
            onPasswordChange={onPasswordChange}
            onAutocompleteChange={onAutocompleteChange}
            onPhoneChange={onPhoneChange}
            onDateOfBirthChange={onDateOfBirthChange}
            validateText={validateText}
            validatePassword={validatePassword}
            validateAutocomplete={validateAutocomplete}
            validatePhone={validatePhone}
          />
        ) : (
          <>
            {stepsWithContent[step - 2].answers.map((element, index) => {
              const { uuid, display, answers, datatype, synonyms, names } =
                element;

              const labelName = getLabelName(names) || display;

              if (!formValues.hasOwnProperty(display)) {
                setFormValues({
                  ...formValues,
                  [display]: datatype.display === "Text" ? "" : null,
                });
              }
              if (datatype.display === "Text") {
                return (
                  <TextFieldComponent
                    key={uuid}
                    display={display}
                    labelName={labelName}
                    formValues={formValues}
                    formErrors={formErrors}
                    classes={classes}
                    autoFocus={index === 0}
                    onTextChange={
                      checkSynonym(synonyms, "email")
                        ? onEmailChange
                        : onTextChange
                    }
                    validateText={
                      checkSynonym(synonyms, "email")
                        ? validateEmail
                        : validateText
                    }
                  />
                );
              }

              if (datatype.display === "Numeric") {
                if (checkSynonym(synonyms, "mobile")) {
                  return (
                    <GridItem key={uuid} item xs={12} sm={6} md={4}>
                      <PhoneInput
                        containerStyle={{
                          marginTop: 8,
                          color: formErrors[display]
                            ? "red"
                            : "rgba(0, 0, 0, 0.54)",
                        }}
                        inputProps={{
                          name: display,
                          autoFocus: index === 0 ? true : false,
                        }}
                        inputStyle={{
                          width: "100%",
                        }}
                        inputClass={formErrors[display] && classes.phoneField}
                        country={"in"}
                        specialLabel={labelName}
                        value={formValues[display]}
                        onChange={onPhoneChange}
                        onBlur={(e, data) =>
                          validatePhone(e, data, formValues[display])
                        }
                        containerClass={classes.field}
                      />
                      <FormHelperText
                        className={classes.phoneFieldHelperText}
                        error
                      >
                        {formErrors[display]}
                      </FormHelperText>
                    </GridItem>
                  );
                }
                return (
                  <GridItem key={uuid} item xs={12} sm={6} md={4}>
                    <TextField
                      type="number"
                      variant="outlined"
                      label={labelName}
                      name={display}
                      value={formValues[display]}
                      autoFocus={index === 0 ? true : false}
                      onChange={onTextChange}
                      className={classes.field}
                      fullWidth
                    />
                  </GridItem>
                );
              }

              if (datatype.display === "Coded") {
                if (display === "State") {
                  return (
                    <React.Fragment>
                      <AutocompleteComponent
                        display={display}
                        labelName={getLabelName(names) || display}
                        answers={addressfields}
                        formErrors={formErrors}
                        formValues={formValues}
                        autoFocus={index === 0}
                        classes={classes}
                        onAutocompleteAddressChange={
                          onAutocompleteAddressChange
                        }
                        validateAutocomplete={validateAutocomplete}
                      />
                    </React.Fragment>
                  );
                } else if (display === "District") {
                  return (
                    <AutocompleteComponent
                      display={display}
                      labelName={getLabelName(names) || display}
                      answers={districtfields}
                      formErrors={formErrors}
                      formValues={formValues}
                      autoFocus={index === 0}
                      classes={classes}
                      onAutocompleteDistrictChange={
                        onAutocompleteDistrictChange
                      }
                      validateAutocomplete={validateAutocomplete}
                    />
                  );
                } else if (display === "Town/City") {
                  return (
                    <AutocompleteComponent
                      display={display}
                      labelName={getLabelName(names) || display}
                      answers={cityfields}
                      formErrors={formErrors}
                      formValues={formValues}
                      autoFocus={index === 0}
                      classes={classes}
                      onAutocompleteChange={onAutocompleteChange}
                      validateAutocomplete={validateAutocomplete}
                    />
                  );
                } else {
                  return (
                    <React.Fragment key={uuid}>
                      <AutocompleteComponent
                        display={display}
                        labelName={getLabelName(names) || display}
                        answers={answers}
                        formErrors={formErrors}
                        formValues={formValues}
                        autoFocus={index === 0}
                        classes={classes}
                        onAutocompleteChange={onAutocompleteChange}
                        validateAutocomplete={validateAutocomplete}
                      />
                      {formValues[display]?.datatype?.display ===
                        "Document" && (
                        <PatientConsent
                          display={formValues[display].display}
                          patientConsentList={patientConsentList}
                          patientConsentStatus={patientConsentStatus}
                          removePatientConsent={removePatientConsent}
                          changeConsentStatus={changeConsentStatus}
                          formValues={formValues}
                        />
                      )}
                      {formValues[display]?.datatype?.display === "Coded" && (
                        <AutocompleteComponent
                          display={formValues[display].display}
                          labelName={
                            getLabelName(formValues[display].names) ||
                            formValues[display].display
                          }
                          answers={formValues[display].answers}
                          formErrors={formErrors}
                          formValues={formValues}
                          autoFocus={true}
                          classes={classes}
                          onAutocompleteChange={onAutocompleteChange}
                          validateAutocomplete={validateAutocomplete}
                        />
                      )}

                      {formValues[display]?.datatype?.display === "Text" && (
                        <TextFieldComponent
                          display={formValues[display].display}
                          labelName={
                            getLabelName(formValues[display].names) ||
                            formValues[display].display
                          }
                          formValues={formValues}
                          formErrors={formErrors}
                          classes={classes}
                          autoFocus={index === 0}
                          onTextChange={onTextChange}
                          validateText={validateText}
                        />
                      )}

                      {formValues[formValues[display]?.display]?.datatype
                        ?.display === "Coded" && (
                        <AutocompleteComponent
                          display={
                            formValues[formValues[display]?.display]?.display
                          }
                          labelName={
                            getLabelName(
                              formValues[formValues[display]?.display]?.names
                            ) ||
                            formValues[formValues[display]?.display]?.display
                          }
                          answers={
                            formValues[formValues[display]?.display]?.answers
                          }
                          formErrors={formErrors}
                          formValues={formValues}
                          autoFocus={true}
                          classes={classes}
                          onAutocompleteChange={onAutocompleteChange}
                          validateAutocomplete={validateAutocomplete}
                        />
                      )}
                      {formValues[formValues[display]?.display]?.datatype
                        ?.display === "Text" && (
                        <TextFieldComponent
                          display={
                            formValues[formValues[display]?.display]?.display
                          }
                          labelName={
                            getLabelName(
                              formValues[formValues[display]?.display]?.names
                            ) ||
                            formValues[formValues[display]?.display]?.display
                          }
                          formValues={formValues}
                          formErrors={formErrors}
                          classes={classes}
                          autoFocus={index === 0}
                          onTextChange={(e) => {
                            console.log(e.target.value);
                            if (checkIsAdhar(e)) return false;
                            onTextChange(e);
                          }}
                          validateText={validateText}
                        />
                      )}
                      {formValues[
                        formValues[formValues[display]?.display]?.display
                      ]?.datatype?.display === "Numeric" && (
                        <TextFieldComponent
                          display={
                            formValues[
                              formValues[formValues[display]?.display]?.display
                            ]?.display
                          }
                          labelName={
                            getLabelName(
                              formValues[
                                formValues[formValues[display]?.display]
                                  ?.display
                              ]?.names
                            ) ||
                            formValues[
                              formValues[formValues[display]?.display]?.display
                            ]?.display
                          }
                          formValues={formValues}
                          formErrors={formErrors}
                          classes={classes}
                          autoFocus={index === 0}
                          onTextChange={onTextChange}
                          validateText={validateText}
                        />
                      )}
                      {formValues[
                        formValues[formValues[display]?.display]?.display
                      ]?.datatype?.display === "Text" && (
                        <TextFieldComponent
                          display={
                            formValues[
                              formValues[formValues[display]?.display]?.display
                            ]?.display
                          }
                          labelName={
                            getLabelName(
                              formValues[
                                formValues[formValues[display]?.display]
                                  ?.display
                              ]?.names
                            ) ||
                            formValues[
                              formValues[formValues[display]?.display]?.display
                            ]?.display
                          }
                          formValues={formValues}
                          formErrors={formErrors}
                          classes={classes}
                          autoFocus={index === 0}
                          onTextChange={(e) => {
                            if (checkIsAdhar(e)) return false;
                            onTextChange(e);
                          }}
                          validateText={validateText}
                        />
                      )}
                    </React.Fragment>
                  );
                }
              }
              return null;
            })}
            {isLastStep() ? (
              <GridItem item xs={12} sm={6} md={4}>
                <Autocomplete
                  id="Department*"
                  options={appointmentTypes}
                  getOptionLabel={(option) => option.display}
                  onChange={(e, newValue) => {
                    onAutocompleteChange("Department*", newValue);
                    getTimeSlots(newValue);
                  }}
                  onBlur={(e) =>
                    validateAutocomplete(
                      "Department*",
                      formValues["Department*"]
                    )
                  }
                  value={formValues["Department*"]}
                  getOptionSelected={(option, value) =>
                    option.uuid === value.uuid
                  }
                  defaultValue={formValues["Department*"]}
                  className={classes.field}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="Department*"
                      label="Department*"
                      variant="outlined"
                      error={formErrors["Department*"] ? true : false}
                      helperText={formErrors["Department*"]}
                    />
                  )}
                />
              </GridItem>
            ) : null}
          </>
        )}
      </GridContainer>
    );
  }

  function getLabelName(names) {
    const shortName = names.filter(
      (name) => name.conceptNameType === "FULLY_SPECIFIED"
    );
    //return shortName.length ? shortName[0].display : null;
    if (shortName.length) {
      if (
        shortName[0].display === "CHC" ||
        shortName[0].display === "PHC" ||
        shortName[0].display === "Sub Centre" ||
        shortName[0].display === "SDH" ||
        shortName[0].display === "Private Institutions"
      ) {
        return "Referral Type";
      } else {
        return shortName[0].display;
      }
    } else {
      return null;
    }
  }
  // function getSpecifiyFielddata(field,obj) {
  //   if(field === 'State')
  //   {
  //     return [...obj.state_province];
  //   }
  //   else if(field === 'District')
  //   {

  //     return [...obj.state_province];
  //   }
  //   else{
  //     let arrvillage=[];
  //     obj.state_province.map((elem)=>{
  //     elem.county_district.map((items)=>{
  //      items.city_village.map((viallage)=>{
  //       arrvillage.push(viallage);
  //      });
  //     });
  //     });
  //     return arrvillage;
  //   }
  // }

  function getTimeSlots(type) {
    setSelectedTimeSlot(null);
    const fromDate = new Date();
    const toDate = new Date(
      fromDate.getFullYear(),
      fromDate.getMonth(),
      fromDate.getDate(),
      23,
      59,
      59
    );
    if (type) {
      setTimeSlotsLoading(true);
      getAPI(
        `/appointmentscheduling/timeslot?appointmentType=${
          type.uuid
        }&fromDate=${fromDate.toISOString()}&toDate=${toDate.toISOString()}&v=default`
      )
        .then((response) => {
          setTimeSlotsLoading(false);
          let res = response.data.results;

          res = res.filter(function (item) {
            return item.appointmentBlock.provider !== null;
          });
          setTimeSlots(res);
        })
        .catch((error) => {
          setTimeSlotsLoading(false);
          console.log(error);
        });
    }
  }

  function onTextChange(e) {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    validateText(e);
  }
  function onPasswordChange(e) {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    validatePassword(e);
  }

  function onEmailChange(e) {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });

    validateEmail(e);
  }
  function removePatientConsent(name) {
    const newList = patientConsentList.filter((item) => item !== name);
    setPatientConsentList(newList);
  }
  function changeConsentStatus(name, status) {
    setPatientConsentStatus(
      patientConsentStatus.filter((item, index) => {
        if (item.name === name) {
          item.value = status;
        }
        return item;
      })
    );
    return patientConsentList;
  }
  function onAutocompleteChange(display, newValue) {
    console.log('display, newValue>>>', display, newValue)
    if (newValue?.datatype?.display === "Document") {
      setFormValues({
        ...formValues,
        [newValue.display]: null,
        [display]: newValue,
      });

      //patientConsentList.push({newValue});
      if (!patientConsentList.includes(newValue.display)) {
        patientConsentList.push(newValue.display);
        const status = { name: newValue.display, value: "Unknown" };
        patientConsentStatus.push(status);
      }

      setPatientConsentList(patientConsentList);
    }
    if (newValue.uuid === "3d16a441-949b-4aac-97f9-977c75a3cfe5") {
      newValue.answers.map((item) => {
        if (
          parseInt(formValues["Age*"].slice(0, -1)) < 10 &&
          item.uuid === "327f7959-0249-4182-aa02-e31be2dfed85"
        ) {
          newValue = item;
          return newValue;
        }
        if (
          parseInt(formValues["Age*"].slice(0, -1)) > 10 &&
          item.uuid === "30dd68b3-955a-4396-b976-44566c8f8ec6"
        ) {
          newValue = item;
          return newValue;
        }
      });
    }
    if (newValue?.datatype?.display === "Coded") {
      setFormValues({
        ...formValues,
        [newValue.display]: null,
        [display]: newValue,
      });
    } else if (newValue?.datatype?.display === "Text") {
      setFormValues({
        ...formValues,
        //[newValue.display]: "",
        [display]: newValue,
      });
    } else {
      setFormValues({ ...formValues, [display]: newValue });
    }

    validateAutocomplete(display, newValue);
  }
  function onAutocompleteAddressChange(display, newValue) {
    setFormValues({ ...formValues, [display]: newValue });
    setstateisselected(true);
    if (newValue?.county_district) {
      setdistrictfields(newValue["county_district"]);
    } else {
    }

    validateAutocomplete(display, newValue);
  }
  function onAutocompleteDistrictChange(display, newValue) {
    setFormValues({ ...formValues, [display]: newValue });
    if (newValue?.city_village) {
      setcityfields(newValue["city_village"]);
    } else {
    }
    validateAutocomplete(display, newValue);
  }
  function onPhoneChange(value, data, event, formattedValue) {
    const { name } = event.target;
    // const rawValue = value.slice(data.dialCode.length);
    setFormValues({ ...formValues, [name]: value });
    validatePhone(event, data, value);
  }

  function onDateOfBirthChange(name, dob) {
    setFormValues({ ...formValues, [name]: dob });
  }

  function validate() {
    let errors = {};
    for (const key in formValues) {
      console.log(key);
      if (Object.hasOwnProperty.call(formValues, key)) {
        if (
          key.slice(-1) === "*" &&
          (!formValues[key] || formValues[key] === "")
        ) {
          errors[key] = "This field is required";
        }
        if (
          key === "Health Password" &&
          formValues["Health Number"] === "" &&
          formValues["Consent Agreement"]
        ) {
          const uppercaseRegExp = /(?=.*?[A-Z])/;
          const lowercaseRegExp = /(?=.*?[a-z])/;
          const digitsRegExp = /(?=.*?[0-9])/;
          const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
          const minLengthRegExp = /.{8,}/;
          const passwordLength = formValues[key].length;
          const uppercasePassword = uppercaseRegExp.test(formValues[key]);
          const lowercasePassword = lowercaseRegExp.test(formValues[key]);
          const digitsPassword = digitsRegExp.test(formValues[key]);
          const specialCharPassword = specialCharRegExp.test(formValues[key]);
          const minLengthPassword = minLengthRegExp.test(formValues[key]);
          if (passwordLength === 0) {
            setFormErrors({ ...formErrors, [key]: "Password is empty" });
          } else if (!uppercasePassword) {
            errors[key] = "At least one Uppercase";
            //errMsg="At least one Uppercase";
          } else if (!lowercasePassword) {
            errors[key] = "At least one Lowercase";
            //errMsg="At least one Lowercase";
          } else if (!digitsPassword) {
            errors[key] = "At least one digit";
            // errMsg="At least one digit";
          } else if (!specialCharPassword) {
            errors[key] = "At least one Special Characters";
            //errMsg="At least one Special Characters";
          } else if (!minLengthPassword) {
            errors[key] = "At least minumum 8 characters";
          } else if (!squencetest(formValues[key])) {
            errors[key] = "Should not contain any squence( like: 123/ 321)";
          }
        }
      }
    }
    return errors;
  }
  function squencetest(s) {
    // Check for sequential numerical characters
    for (var i in s) {
      if (+s[+i + 1] == +s[i] + 1 || +s[i - 1] == +s[i] + 1) return false;
    }
    // Check for sequential alphabetical characters
    for (var j in s)
      if (
        String.fromCharCode(s.charCodeAt(j) + 1) == s[+j + 1] &&
        String.fromCharCode(s.charCodeAt(j) + 2) == s[+j + 2]
      )
        return false;
    return true;
  }
  function validatePasswordExp(name) {}
  function validatePassword(e) {
    const { name, value } = e.target;

    const uppercaseRegExp = /(?=.*?[A-Z])/;
    const lowercaseRegExp = /(?=.*?[a-z])/;
    const digitsRegExp = /(?=.*?[0-9])/;
    const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
    const minLengthRegExp = /.{8,}/;
    const passwordLength = value.length;
    const uppercasePassword = uppercaseRegExp.test(value);
    const lowercasePassword = lowercaseRegExp.test(value);
    const digitsPassword = digitsRegExp.test(value);
    const specialCharPassword = specialCharRegExp.test(value);
    const minLengthPassword = minLengthRegExp.test(value);
    if (passwordLength === 0) {
      setFormErrors({ ...formErrors, [name]: "Password is empty" });
    } else if (!uppercasePassword) {
      setFormErrors({ ...formErrors, [name]: "At least one Uppercase" });
      //errMsg="At least one Uppercase";
    } else if (!lowercasePassword) {
      setFormErrors({ ...formErrors, [name]: "At least one Lowercase" });
      //errMsg="At least one Lowercase";
    } else if (!digitsPassword) {
      setFormErrors({ ...formErrors, [name]: "At least one digit" });
      // errMsg="At least one digit";
    } else if (!specialCharPassword) {
      setFormErrors({
        ...formErrors,
        [name]: "At least one Special Characters",
      });
      //errMsg="At least one Special Characters";
    } else if (!minLengthPassword) {
      setFormErrors({ ...formErrors, [name]: "At least minumum 8 characters" });
      //errMsg="At least minumum 8 characters";
    } else if (!squencetest(value)) {
      setFormErrors({
        ...formErrors,
        [name]: "Should not contain any squence( like: 123/ 321)",
      });
      //errMsg="At least minumum 8 characters";
    } else {
      const errors = formErrors;
      delete errors[name];
      setFormErrors(errors);
    }
  }
  function validateText(e) {
    const { name, value } = e.target;
    console.log(name);
    if (name.slice(-1) === "*") {
      if (!value || value === "") {
        setFormErrors({ ...formErrors, [name]: "This field is required" });
      } else {
        const errors = formErrors;
        delete errors[name];
        setFormErrors(errors);
      }
      if (name === "First Name*" || name === "Relative Name*") {
        validateName(name, value);
      }
      // if (name === "Aadhar*") {
      //   validateAadhar(name, value);
      // }
      if (
        name === "Aadhaar above 10Y*" ||
        name === "Self Aadhaar*" ||
        name === "Father Aadhaar*" ||
        name === "Mother Aadhaar*" ||
        name === "Guardian Aadhaar*"
      ) {
        validateAadhar(name, value);
      }
    }
    if (name === "Middle Name" || name === "Last Name") {
      validateName(name, value);
    }
  }
  function validateName(name, value) {
    //const filterdata= sanitizeHtml(value);

    const regexname = /^[a-zA-Z\s]*$/;
    if (!regexname.test(value)) {
      setFormErrors({ ...formErrors, [name]: "Only alphabets are allowed" });
    } else {
      const errors = formErrors;
      delete errors[name];
      setFormErrors(errors);
    }
  }
  function validateAadhar(name, value) {
    getduplicateAadhar(value);
    if (value.length > 12 || value.length < 12) {
      setFormErrors({ ...formErrors, [name]: "Please Enter only 12 digits" });
    } else if (duplicateAadhar) {
      swal({
        title: "Error",
        text: "Please Enter Unique Aadhar Number",
        icon: "error",
      }).then((value) => {
        setFormErrors({ ...formErrors, [name]: value });
      });
    }
  }
  function getduplicateAadhar(value) {
    const dob = moment(formValues["Date of Birth"]).format("DD-MM-YYYY");
    var url = "/aadhaarValidation/patient?aadhaarNo=" + value + "&dob=" + dob;
    getAPI(url)
      .then((res) => {
        setDuplicateAadhar(false);
      })
      .catch((error) => {
        setDuplicateAadhar(true);
      });
  }
  function validateEmail(e) {
    const { name, value } = e.target;
    const regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/;
    if (value !== "" && !regex.test(value)) {
      setFormErrors({ ...formErrors, [name]: "Invalid email address" });
    } else {
      const errors = formErrors;
      delete errors[name];
      setFormErrors(errors);
    }
  }

  function validateAutocomplete(key, value = null) {
    if (key.slice(-1) === "*") {
      if (value) {
        const errors = formErrors;
        delete errors[key];
        setFormErrors(errors);
      } else {
        setFormErrors({ ...formErrors, [key]: "This field is required" });
      }
    }
  }

  function validatePhone(e, data, value = "91") {
    const { name } = e.target;
    const phoneNumber = value ? value.slice(data.dialCode.length) : "";
    if (phoneNumber === "") {
      setFormErrors({ ...formErrors, [name]: "This field is required" });
    } else if (phoneNumber.length !== 10) {
      setFormErrors({ ...formErrors, [name]: "Invalid phone number" });
    } else {
      const errors = formErrors;
      delete errors[name];
      setFormErrors(errors);
    }
  }

  function checkSynonym(synonyms, synonym) {
    const result = synonyms.filter(
      (synm) => synm.display.toLowerCase() === synonym
    );

    return result.length;
  }

  const totalSteps = () => {
    return steps.length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const handleNext = () => {
    if (activeStep != 0) {
      let errors = validate();
      console.log(errors);
      if (
        Object.keys(errors).length > 0 ||
        Object.keys(formErrors).length > 0
      ) {
        setFormErrors({ ...formErrors, ...errors });
        return;
      }
    }

    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    let errors = validate();
    if (Object.keys(errors).length > 0 || Object.keys(formErrors).length > 0) {
      setFormErrors({ ...formErrors, ...errors });
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleNextStep = (step, txnId, aadhaar, mobile) => {
    step = step + 1;
    setActiveStep(step);
    setFinaltxnId(txnId);
    return;
  };
  const handleStep = (step) => () => {
    let errors = validate();
    if (Object.keys(errors).length > 0 || Object.keys(formErrors).length > 0) {
      setFormErrors({ ...formErrors, ...errors });
      return;
    }
    setActiveStep(step);
  };

  const submitRegistrationForm = async () => {
    let abdmPayload = {
      email: "",
      firstName: formValues["First Name*"],
      healthId: formValues["Health Id"],
      lastName: formValues["Last Name"],
      middleName: "",
    };
    updateProfile(abdmPayload,formValues["Token"],setLoader)
    var abhaData = {
      healthIdNumber: formValues["Health Number"],
      healthId: formValues["Health Id"],
    };
    if (formValues["Token"] !== "") {
      var card = await getCard(formValues["Token"], "blob");
      if (card) {
        abhaData.photoBlob = card;
      }
    } else {
      abhaData.photoBlob = "";
    }
    console.log('abhaData>>>>>>>>>', abhaData)
    if (finaltxnId !== "") {
      let abdmPayload = {
        email: "",
        firstName: formValues["First Name*"],
        healthId: formValues["Health Id"],
        lastName: formValues["Last Name"],
        middleName: "",
        password: formValues["Health Password"],
        profilePhoto: "",
      };

      
      /* const abhares = await createHealthIdWithPreVerifiedAadhaar(finaltxnId,abdmPayload,setLoader);
      if(abhares){
        setFormValues({
          ...formValues,
          "Health Number": abhaData.healthIdNumber,
          "Health Id": abhaData.healthId,
        });
        abhaData.healthIdNumber = abhares.healthIdNumber;
        abhaData.healthId = abhares.healthId;
      }*/
    } else {
      abhaData.healthIdNumber = formValues["Health Number"];
      abhaData.healthId = formValues["Health Id"];
    }
    let patient = {
      person: {
        names: [
          {
            givenName: formValues["First Name*"],
            middleName: formValues["Middle Name"],
            familyName: formValues["Last Name"],
          },
        ],
        gender: formValues["Gender*"].value,
        age: parseInt(formValues["Age*"].slice(0, -1)),
        birthdate: new Date(formValues["Date of Birth"]).toISOString(),
        addresses: [
          {
            preferred: true,
            address1: formValues["Postal Address"],
            cityVillage:
              formValues["Town/City"] === null
                ? ""
                : formValues["Town/City"].name,
            stateProvince: formValues["State"],
            postalCode: formValues["Postal Code"],
          },
        ],
        attributes: [
          {
            attributeType: HOSPITAL_NAME,
            value: REGISTRATION_HOSPITAL_NAME,
          },
          {
            attributeType: PERSON_UPDATED,
            value: "PERNO",
          },
          {
            attributeType: PATIENT_UPDATED,
            value: "PATNO",
          },
          {
            attributeType: MPI_ID,
            value: "NA",
          },
          {
            attributeType: HEALTH_ID,
            value: abhaData.healthId ? abhaData.healthId : "",
          },
          {
            attributeType: HEALTH_NUMBER,
            value: abhaData.healthIdNumber ? abhaData.healthIdNumber : "",
          },
          {
            attributeType: AADHAAR,
            value:
              formValues["Aadhaar above 10Y*"] ||
              formValues["Self Aadhaar*"] ||
              formValues["Father Aadhaar*"] ||
              formValues["Mother Aadhaar*"] ||
              formValues["Guardian Aadhaar*"],
          },

          ...getAttributes(personAttributeTypes),
        ],
      },
      identifiers: [
        {
          identifier: identifier,
          identifierType: "05a29f94-c0ed-11e2-94be-8c13b969e334",
        },
      ],
    };

    let location = timeSlots.filter(
      (element) => selectedTimeSlot === element.uuid
    );

    let visit = {
      visitType: "7b0f5697-27e3-40c4-8bae-f4049abfb4ed",
      location: location[0].appointmentBlock.location.uuid,
      attributes: getAttributes(visitAttributeTypes),
    };

    var qrData = {
      hidn: abhaData.healthIdNumber,
      hid: abhaData.healthId,
      name:
        formValues["First Name*"] +
        " " +
        formValues["Middle Name"] +
        " " +
        formValues["Last Name"],
      gender: formValues["Gender*"].value,
      dob: moment(formValues["Date of Birth"]).format("DD/MM/YYYY"),
      state_name: formValues["State"],
      district_name: formValues["District"],
      mobile: formValues["Phone Number*"],
      address: formValues["Postal Address"],
    };
    postAPI("/patient", patient)
      .then((patientResponse) => {
        visit.patient = patientResponse.data.uuid;
        postAPI("/visit", visit)
          .then((visitResponse) => {
            postAPI("/appointmentscheduling/appointment", {
              appointmentType: formValues["Department*"].uuid,
              patient: patientResponse.data.uuid,
              reason: "New Registration",
              status: "Scheduled",
              timeSlot: selectedTimeSlot,
              visit: visitResponse.data.uuid,
            })
              .then((appointmentResponse) => {
                setRegistrationSuccessData({
                  abhaData: abhaData,
                  appointmentData: appointmentResponse.data,
                  visitData: visitResponse.data,
                  qrData: qrData,
                });
              })
              .catch((appointmentRequestError) => {
                console.log(appointmentRequestError);
              });
          })
          .catch((visitRequestError) => {
            console.log(visitRequestError);
          });
      })
      .catch((patientRequestError) => console.log(patientRequestError));
  };

  const getAttributes = (attributeTypes) => {
    return attributeTypes
      .map((element) => {
        return (
          formValues[element.display] && {
            attributeType: element.uuid,
            value:
              typeof formValues[element.display] === "object"
                ? formValues[element.display]?.display
                : formValues[element.display],
          }
        );
      })
      .filter((element) => element && element);
  };

  return (
    <>
      <MobileStepper
        variant="dots"
        steps={steps.length}
        position="static"
        activeStep={activeStep}
        className={classes.mobileStepper}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === steps.length - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
      <div className={classes.root}>
        <Stepper
          nonLinear
          activeStep={activeStep}
          className={classes.desktopStepper}
        >
          {steps.map((label, index) => {
            const stepProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepButton
                  onClick={handleStep(index)}
                  style={{ paddingTop: 5, paddingBottom: 5 }}
                >
                  {label}
                </StepButton>
                {/* <StepLabel>{label}</StepLabel> */}
              </Step>
            );
          })}
        </Stepper>
        <div>
          {
            <Paper className={classes.paper}>
              {getStepContent(activeStep)}
              {isLastStep() && formValues["Department*"] && (
                <AvailableTimeSlots
                  loading={timeSlotsLoading}
                  timeSlots={timeSlots}
                  classes={classes}
                  selectedTimeSlot={selectedTimeSlot}
                  setSelectedTimeSlot={setSelectedTimeSlot}
                />
              )}
              <GridContainer>
                <GridItem item xs={12} sm={4} md={1}>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                    fullWidth
                  >
                    Back
                  </Button>
                </GridItem>
                <GridItem item xs={12} sm={4} md={1}>
                  <Button
                    color="secondary"
                    component={Link}
                    to="/app/patient-search"
                    className={classes.button}
                    fullWidth
                  >
                    Cancel
                  </Button>
                </GridItem>
                <GridItem item xs={12} sm={4} md={1}>
                  {isLastStep() ? (
                    <Button
                      disabled={
                        Object.keys(formErrors).length > 0 || !selectedTimeSlot
                      }
                      variant="contained"
                      color="primary"
                      onClick={submitRegistrationForm}
                      className={classes.button}
                      fullWidth
                    >
                      Submit
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                      fullWidth
                    >
                      Next
                    </Button>
                  )}
                </GridItem>
              </GridContainer>
            </Paper>
          }
        </div>
      </div>
      {registrationSuccessData && (
        <PrintPatientRegistration data={registrationSuccessData} />
      )}
    </>
  );
}
