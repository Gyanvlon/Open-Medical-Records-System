import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import PatientInfosubComponent from "./PatientDashboardSubComponent/PatientInfosubComponent";
import Icon from "@material-ui/core/Icon";
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    color: "#ffff",
    fontSize: 15,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={1}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function PatientDashboard(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Click Here To Open
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            {/* <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="Clinical Dekstop" />
              <Tab label="Daily" />
              <Tab label="Note" />
              <Tab label="Task List" />
              <Tab label="Documents" />
              <Tab label="Encounter Form" />
              <Tab label="Diagonis" />
              <Tab label="Visit Changes" />
              <Tab label="Procedure Charges" />
              <Tab label="Patient Lists" />
              <Tab label="Reports" />
              <Tab label="Work List" />
            </Tabs> */}
            <Typography variant="h6" className={classes.title}>
              {/* <Icon className="fa fa fa-user-md" /> Patient Name :{" "}
              {props.patientData.person.display} */}
              <Icon className="fa fa fa-home" style={{ color: "gold" }} />{" "}
              &nbsp;Welcome To Dashboard
            </Typography>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <TabPanel value={value} index={0}>
          <PatientInfosubComponent
            patientInfoSubcompoent={props.patientData}
            selectedVisit={props.selectedVisit}
          ></PatientInfosubComponent>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        {/* <List>
          <ListItem button>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              primary="Default notification ringtone"
              secondary="Tethys"
            />
          </ListItem>
        </List> */}
      </Dialog>
    </div>
  );
}
