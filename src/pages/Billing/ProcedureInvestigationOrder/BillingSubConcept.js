import React, { useState } from "react";
import { ListItemText, ListItem, List, Checkbox } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import BillingNewTest from "./BillingNewTest";
import { GridContainer, GridItem } from "../../../components";
import ExpandLess from "@material-ui/icons/ArrowRightOutlined";
import ExpandMore from "@material-ui/icons/ArrowDropDownOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginLeft: "80%",
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));
function BillingSubConcept(props) {
  const answers = props.answers;
  const classes = useStyles();
  const btn = props.btnValue;
  const [test, setTest] = React.useState(null);
  const open = props.open;
  const close = props.close;

  const openLabTest = (name) => {
    console.log(btn);
    if (test === name) {
      setTest(null);
    } else {
      setTest(name);
    }
  };

  return (
    <div className={classes.subcontent}>
      {answers.map((item, key) => (
        <BillingNewTest
          answers={item.answers}
          orderDtl={props.orderDtl}
          btnValue={props.btnValue}
          servicdetailsVal={props.servicdetailsVal}
          addNewInvestigation={props.addNewInvestigation}
          //addnewtest={props.addnewtest}
        />
      ))}
    </div>
  );
}

export default BillingSubConcept;
