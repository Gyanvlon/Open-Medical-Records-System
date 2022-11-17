import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import { patientRoutes } from "../../../routes/patientroutes";
import { getAPI } from "../../../services";
import {
  Typography,
  Button,
  Card,
  CardHeader,
  CardContent,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: 10,
  },
  
  title: {
    backgroundColor: "#3EABC1",
    color: "#FFFFFF",
  },
}));

function PatientMgmt() {
  const classes = useStyles();

  useEffect(() => {
    let url =
      "/concept?q=Consent Type" +
      "&v=custom:(answers:(display, answers:(uuid, display, datatype:(display))))";
    getAPI(url).then(res => {
      console.log("Concept:", res);
    });
  }, []);

  return (
    <Card className={classes.root}>
      <CardHeader
        title="Patient Management"
        className={classes.title}
      />
      <CardContent>
        {patientRoutes.map((prop, key) => (
          <Typography key={key}>
            <Button
              component={Link}
              to={prop.layout + prop.path}
            >
              {prop.title}
            </Button>
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
}

export default PatientMgmt
