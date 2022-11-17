import React from 'react'
import {
    makeStyles,
    List,
    ListSubheader,Checkbox,TextField, Paper} from "@material-ui/core/";
import styles from "../../styles";
import { GridContainer, GridItem } from '../../../../components/Grid';


const useStyles = makeStyles(styles);

function MedicalForm(props) {
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
            Medical Consent Form
          </ListSubheader>
        }
        className={classes.root} >
      </List>
      <GridContainer >

        <GridItem>
      </GridItem>
      <GridItem>
     
I, &nbsp;<TextField  value={formValues["Relative Name*"] }/> am  a  [Parent/Legal Guardian] of <TextField  value={formValues["First Name*"] }/> born on <TextField  />, 
do hereby consent to the following medical care while said individual is under the care of <TextField /> of <TextField  />
City of 	<TextField />	, State of 	<TextField value={formValues["State"] }/>	:<br/>
      </GridItem>
      <GridItem></GridItem>
      <GridItem>
            <Checkbox />X-ray examination;<br/>
            <Checkbox />Anesthetic; <br/>   
            <Checkbox />Medical, surgical or dental diagnosis or treatment;<br/>
            <Checkbox />Hospital care;   <br/>  
            <Checkbox />Other: <br/>
      </GridItem>
      <GridItem><TextField fullWidth/></GridItem>
      </GridContainer>
      </Paper>
    );
}

export default MedicalForm;
