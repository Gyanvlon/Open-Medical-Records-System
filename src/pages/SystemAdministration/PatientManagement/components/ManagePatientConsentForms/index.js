import { useEffect } from "react";
import { getAPI } from "../../../../../services";
import styles from "../../styles";
import FormBuilder from "./FormBuilder";
import {
  makeStyles,
  List,
  ListSubheader,
} from "@material-ui/core";

const useStyles = makeStyles(styles);

function ManagePatientConsentForms() {
  const classes = useStyles();

  useEffect(() => {
    let url =
      "/concept?q=Consent Type" +
      "&v=custom:(answers:(display,answers:(uuid,display,datatype:(uuid,display))))";
    getAPI(url).then(res => {
      let consents = res.data.results[0].answers;
      console.log("Consents:", consents);
    });
  }, []);

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader id="nested-list-subheader" className={classes.header}>
          Manage Patient Consent Forms
        </ListSubheader>
      }
      className={classes.root}
    >
      <FormBuilder />
    </List>
  );
}

export default ManagePatientConsentForms;
