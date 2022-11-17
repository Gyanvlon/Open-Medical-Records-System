import { useState } from "react";
import {
  makeStyles,
  Button,
  Paper,
} from "@material-ui/core";

import "react-form-builder2/dist/app.css";
import { ReactFormBuilder } from "react-form-builder2";
import "./bootstrap.min.css";
import Swal from "sweetalert";

function FormBuilder() {
  const saveForm = () =>{
    Swal("Please Enter the Form Name:", {
      title: "Patient Consent Form",
      content: "input",
    })
    .then((res) => {
      Swal(`Your Form ${res} has been saved successfully!`, {
        icon: "success",
      }).then((res2) => {
        window.location.reload(false);
      });
      
    })
  }
  return (
    <div>
      <Button color="primary" onClick={() =>saveForm()}>Save Form</Button>
      <ReactFormBuilder />
    </div>
  );
}

export default FormBuilder;
