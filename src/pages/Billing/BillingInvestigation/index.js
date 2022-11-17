import React, { useState, useEffect } from "react";
import BillingNavbar from "../BillingNavbar";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

import { makeStyles } from "@material-ui/core/";
import styles from "./styles";

import DynamicComponent from "./DynamicComponent";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { GENERAL_LABORATORY_UUID } from "../../../utils/constants";

const useStyles = makeStyles(styles);

function BillingInvestigation(props) {
  const classes = useStyles();
  const uuidinitial = GENERAL_LABORATORY_UUID;
  const itenui = props.answersdata.filter((item) => item.uuid === uuidinitial);
  const initialanswersload = itenui[0].answers;
  const [listdata, setlistdata] = React.useState([]);
  const [listcc, stlistcc] = React.useState({});
  const [componentfetch, setComponentfetch] = React.useState(false);
  const [passuuid, setPassuuid] = React.useState(uuidinitial);
  const [answersinner, setanswersinner] = React.useState(initialanswersload);
  const [value, setValue] = React.useState(0);
  const [servicelistdisplay, setServicelistdisplay] = React.useState([]);
  const [initialloaddisplay, setinitialoaddisplay] = React.useState(true);
  const [checkprintdata, setCheckprintdata] = React.useState(true);
  const handlechangedepartment = (e, uid, answersinfo) => {
    console.log(uid);
    setComponentfetch(true);
    setPassuuid(uid);
    setanswersinner(answersinfo);
    setinitialoaddisplay(false);
  };
  const handleprintdatacheck = (param) => {
    if (param !== "") setCheckprintdata(param);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <BillingNavbar />
      <Card className={classes.root}>
        <CardHeader
          title={
            checkprintdata ? "Add New Investigation" : "Print Billing Data"
          }
          className={classes.title}
          titleTypographyProps={{ variant: "body1" }}
          style={{ marginTop: 10 }}
        />
        <CardContent>
          {checkprintdata && (
            <>
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="secondary"
                textColor="primary"
                variant="scrollable"
              >
                {props.answersdata.length > 0 &&
                  props.answersdata.map((list) => (
                    <Tab
                      label={list.display}
                      id={list.uuid}
                      style={{ backgroundColor: "#0096FF", color: "white" }}
                      onClick={(e) => {
                        handlechangedepartment(e, list.uuid, list.answers);
                      }}
                    />
                  ))}
              </Tabs>
            </>
          )}
          <DynamicComponent
            passuuid={passuuid}
            answersactual={props.answersdata}
            answersinner={answersinner}
            initialload={initialloaddisplay}
            servicprop={setServicelistdisplay}
            patientData={props.patientData}
            setprintcheck={setCheckprintdata}
          />
        </CardContent>
      </Card>
    </>
  );
}

export default BillingInvestigation;
