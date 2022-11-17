import React, { useState } from "react";
import {
  TextField,
  Tooltip,
  Select,
  MenuItem,
  Typography,
  FormHelperText,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { GridItem } from "../../../components/Grid";
import { calculateAge } from "../../../utils/commons";

const genderOptions = [
  { name: "Male", value: "M" },
  { name: "Female", value: "F" },
  { name: "Others", value: "O" },
];

function Demographics(props) {
  const {
    identifier,
    formValues,
    classes,
    onTextChange,
    onAutocompleteChange,
    onPhoneChange,
    setFormValues,
    formErrors,
    validateText,
    validateAutocomplete,
    validatePhone,
  } = props;
  const [error, setError] = useState(false);

  const handleDateChange = (date, value) => {
    let age = undefined;
    if (date?._isValid) {
      console.log(date);
      age = calculateAge(date);
    }

    setFormValues({
      ...formValues,
      "Date of Birth": date,
      "Age*": age ? age : formValues["Age*"],
    });
  };

  const onAgeChange = (e) => {
    const { name, value } = e.target;
    const regex = /^[0-9]+(y|Y|m|M|w|W|d|D)$/;

    setFormValues({ ...formValues, [name]: value });
    validateText(e);

    if (value === "") {
      setError(false);
      return;
    }

    if (!regex.test(value)) {
      setError(true);
      return;
    }

    setError(false);

    const age = value.slice(0, -1);
    const lastCharacter = value[value.length - 1];
    let dob = moment().format("DD/MM/yyyy");

    switch (lastCharacter.toLowerCase()) {
      case "y":
        dob = moment().subtract(age, "years");
        break;
      case "m":
        dob = moment().subtract(age, "months");
        break;
      case "w":
        dob = moment().subtract(age, "weeks");
        break;
      case "d":
        dob = moment().subtract(age, "days");
        break;
      default:
        break;
    }
    setFormValues({
      ...formValues,
      "Age*": value,
      "Date of Birth": new Date(dob),
    });
  };

  return (
    <>
      <GridItem item xs={12} sm={12} md={12}>
        <Typography variant="subtitle1">
          Consent for patient: {identifier}
        </Typography>
      </GridItem>
      <Select
        labelId="consentLabel"
        label="Consent Type"
        value=""
      >
        <MenuItem value="a">Some Consent</MenuItem>
        <MenuItem value="b">Other Consent</MenuItem>
      </Select>
    </>
  );
}

export default Demographics;
