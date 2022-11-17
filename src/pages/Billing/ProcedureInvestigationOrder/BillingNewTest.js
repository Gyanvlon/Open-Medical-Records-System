import React, { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import { Checkbox, makeStyles } from "@material-ui/core";

import { GridContainer, GridItem } from "../../../components";
import swal from "sweetalert";
import { ThemeContext } from "../ProcedureInvestigationOrder";
const useStyles = makeStyles({
  test: {
    padding: 20,
  },
});

function BillingNewTest(props) {
  const classes = useStyles();
  const answers = props.answers;

  const investiList = props.servicdetailsVal;
  // console.log(investiList);
  const selectedList = [];
  for (var i = 0; i <= investiList.length - 1; i++) {
    if (!selectedList.includes(investiList[i].serviceConUuid)) {
      selectedList.push(investiList[i].serviceConUuid);
    }
  }
  //console.log(selectedList)
  const handleCheck = (e, uuid) => {
    if (selectedList.includes(uuid)) {
      // swal({
      //   title: "Are You Sure want to remove",
      //   text: "This Component is added previously",
      //   icon: "info",
      //   buttons: true,
      //   dangerMode: true,
      // }).then((willDelete) => {
      //   console.log(willDelete);
      //   if (willDelete) {
      //     swal("Component Removed Succesfully", {
      //       icon: "success",
      //     });
      //     props.addNewInvestigation(e, uuid);
      //   } else {
      //     swal("Component Does not remove", {
      //       icon: "warning",
      //     });
      //   }
      // });
      // props.addNewInvestigation(e, uuid);
    } else {
      props.addNewInvestigation(e, uuid);
    }
    //props.addNewInvestigation(e, uuid);
  };
  return (
    <>
      {answers.map((item, key) => (
        <Button
          size="medium"
          variant="outlined"
          style={{ color: selectedList.includes(item.uuid) ? "green" : "blue" }}
          color="primary"
          onClick={(e) => handleCheck(e, item.uuid)}
          disabled={selectedList.includes(item.uuid) ? true : false}
        >
          {item.display}
        </Button>
      ))}
    </>
  );
}

export default BillingNewTest;
