import React from 'react'
import {
    makeStyles,
    List,
    ListSubheader,Checkbox,TextField, Paper} from "@material-ui/core/";
import styles from "../../styles";
import { GridContainer, GridItem } from '../../../../components/Grid';


const useStyles = makeStyles(styles);

function HippaForm(props) {
    const classes = useStyles();
    const {        
        formValues,
      } = props;
    return (
        <Paper className={classes.form}>
        
        
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader id="nested-list-subheader" className={classes.header}>
            HIPAA Release Form
          </ListSubheader>
        }
        className={classes.root} >
      </List>
      <GridContainer >

        <GridItem>
      </GridItem>
      <GridItem>
      Please complete all sections of this HIPAA release form. If any sections are left blank, this form will be invalid and it will not be possible for your health information to be shared as requested.
<br/><b>Section I</b><br/> 
I, &nbsp;<b><TextField  value={formValues["First Name*"] }/></b> , give my permission for &nbsp;<TextField  />
 	to share the information listed in Section II of this document with the person(s) or organization(s) I have specified in Section IV of this document.
      </GridItem>
      <GridItem>
      <b>Section II - Health Information</b><br/>
I would like to give the above healthcare organization permission to: <br/><br/>Tick as appropriate<br/>
               <Checkbox />  Disclose my complete health record including, but not limited to, diagnoses, lab test results, treatment, and billing records for all conditions.

               <br/>Or <br/>
        <Checkbox />       Disclose my complete health record except for the following information 
      </GridItem>
      <GridItem></GridItem>
      <GridItem>
            <Checkbox />Mental health records<br/>
            <Checkbox />Communicable diseases including, but not limited to, HIV and AIDS  <br/>   
            <Checkbox />Alcohol/drug abuse treatment records<br/>
            <Checkbox />Genetic information   <br/>  
            <Checkbox />Other (Specify)<br/>
      </GridItem>
      </GridContainer>
      </Paper>
    );
}

export default HippaForm;
