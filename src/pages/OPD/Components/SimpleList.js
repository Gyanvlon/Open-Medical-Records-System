import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import Icon from "@material-ui/core/Icon";
import swal from "sweetalert";
import BarChartIcon from "@material-ui/icons/BarChart";
import AssessmentIcon from "@material-ui/icons/Assessment";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000000f7",
    overflow: "auto",
    maxHeight: 520,
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function SimpleList(props) {
  const classes = useStyles();
  const handlelistChange = (e, parameter) => {
    console.log(parameter);
    if (props.griddata.includes(parameter)) {
      swal({
        title: "Component Already Present",
        text: "Please Select Different Component",
        icon: "warning",
      });
    } else {
      props.passfunc([...props.griddata, parameter]);
    }

    // swal({
    //   title: "Want to View this Component?",
    //   text: "Please choose your option from below",
    //   icon: "info",
    //   buttons: true,
    //   dangerMode: true,
    // }).then((willDelete) => {
    //   if (willDelete) {
    //     swal("Component Added Succesefully", {
    //       icon: "success",
    //     });
    //     props.passfunc([...props.griddata, parameter]);
    //   } else {
    //     swal("Component Doesnot Added");

    //   }
    // });
  };
  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem
          button
          onClick={(e) => {
            handlelistChange(e, "Problems And Diagonisis");
          }}
          key="problem"
        >
          <ListItemIcon>
            <Icon className="fa fa-heartbeat" />
          </ListItemIcon>
          <ListItemText primary="Problems &amp; Diagonasis" />
        </ListItem>
        <Divider />
        <ListItem
          button
          onClick={(e) => {
            handlelistChange(e, "Orders");
          }}
        >
          <ListItemIcon>
            <Icon className="fa fa-receipt" />
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItem>
      </List>
      <Divider />

      <List component="nav" aria-label="main mailbox folders">
        <ListItem
          button
          onClick={(e) => {
            handlelistChange(e, "Medications");
          }}
        >
          <ListItemIcon>
            <Icon className="fa fa-plus-circle" />
          </ListItemIcon>
          <ListItemText primary="Medications" />
        </ListItem>
        <Divider />
        <ListItem
          button
          onClick={(e) => {
            handlelistChange(e, "Procedures");
          }}
        >
          <ListItemIcon>
            <Icon className="fa fa-procedures" />
          </ListItemIcon>
          <ListItemText primary="Procedures" />
        </ListItem>
      </List>
      <Divider />
      <List component="nav" aria-label="main mailbox folders">
        <ListItem
          button
          onClick={(e) => {
            handlelistChange(e, "Allergies");
          }}
        >
          <ListItemIcon>
            <Icon className="fa fa fa-user-md" />
          </ListItemIcon>
          <ListItemText primary="Allergies" />
        </ListItem>
      </List>
      <Divider />
      <List component="nav" aria-label="main mailbox folders">
        <ListItem
          button
          onClick={(e) => {
            handlelistChange(e, "Immunizations");
          }}
        >
          <ListItemIcon>
            <Icon className="fa fa fa-vials" />
          </ListItemIcon>
          <ListItemText primary="Immunizations" />
        </ListItem>
        <Divider />
        <ListItem
          button
          onClick={(e) => {
            handlelistChange(e, "Vital signs");
          }}
        >
          <ListItemIcon>
            <Icon className="fa fa-heartbeat" />
          </ListItemIcon>
          <ListItemText primary="Vital signs" />
        </ListItem>
      </List>
      <Divider />
      <List component="nav" aria-label="main mailbox folders">
        <ListItem
          button
          onClick={(e) => {
            handlelistChange(e, "Patient history");
          }}
        >
          <ListItemIcon>
            <Icon className="fa fa-user-plus" />
          </ListItemIcon>
          <ListItemText primary="Patient history" />
        </ListItem>
        <Divider />
        <ListItem
          button
          onClick={(e) => {
            handlelistChange(e, "Discharge Summary");
          }}
        >
          <ListItemIcon>
            <Icon className="fa fa-procedures" />
          </ListItemIcon>
          <ListItemText primary="Discharge Summary" />
        </ListItem>
        <Divider />

        <ListItem
          button
          onClick={(e) => {
            handlelistChange(e, "Rounds Report");
          }}
        >
          <ListItemIcon>
            <AssessmentIcon />
          </ListItemIcon>
          <ListItemText primary="Rounds Report" />
        </ListItem>
      </List>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem
          button
          onClick={(e) => {
            handlelistChange(e, "Intake And Output");
          }}
        >
          <ListItemIcon>
            <Icon className="fa fa-receipt" />
          </ListItemIcon>
          <ListItemText primary="Intake And Output" />
        </ListItem>
        <Divider />
        <ListItem
          button
          onClick={(e) => {
            handlelistChange(e, "Growth Chart");
          }}
        >
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Growth Chart" />
        </ListItem>
      </List>
    </div>
  );
}
