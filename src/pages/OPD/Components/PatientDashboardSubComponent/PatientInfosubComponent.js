import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";

import CloseIcon from "@material-ui/icons/Close";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import SimpleList from "../SimpleList";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import swal from "sweetalert";
import DispalyCardContentGrid from "../../DispalyCardContentGrid";
import Draggable from "react-draggable";
import Button from "@material-ui/core/Button";

import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import NestedDialog from "../NestedDialog";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 1,
    border: "1px dotted #000",
  },
  paper: {
    padding: theme.spacing(1),
    // margin: "auto",
    // maxWidth: 500,
  },
  tabbackgroundcolor: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    backgroundColor: "#3EABC1",
    color: "#FFFFFF",
  },
  appBarModal: {
    position: "relative",
  },
  modaltitle: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

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
const top100Films = [
  { title: "Previous visit or latest visit", year: 1994 },
  { title: "Last 3 months", year: 1972 },
  { title: "Last 6 months", year: 1974 },
  { title: "Last 1 year", year: 2008 },
  { title: "All visits", year: 1957 },
];
const LayoutOptions = [
  { title: "Default Layout", year: 1994 },
  { title: "OPtion1", year: 1972 },
  { title: "OPtion2", year: 1974 },
];
function PatientInfosubComponent(props) {
  console.log(props);
  const classes = useStyles();
  const [tabiinervalue, setTabiinervalue] = React.useState(0);
  const handleInnerTabChange = (event, newValue) => {
    setTabiinervalue(newValue);
  };
  const [tabiinervaluesecond, setTabiinervaluesecond] = React.useState(0);
  const handleInnerTabChangesecond = (event, newValue) => {
    setTabiinervaluesecond(newValue);
  };
  const [tabiinervaluethird, setTabiinervaluethird] = React.useState(0);
  const handleInnerTabChangethird = (event, newValue) => {
    setTabiinervaluethird(newValue);
  };

  const initialState = [
    "Problems And Diagonisis",
    "Vital signs",
    "Medications",
    "Orders",
  ];

  const [openDynamicGrid, setopenDynamicGrid] = React.useState(initialState);
  const [openModal, setOpenModal] = React.useState(false);

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleCloseGrid = (e, indexpassed) => {
    swal({
      title: "Are you sure want to remove Component?",
      text: "Please choose your option from below",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Component Removed Succesefully", {
          icon: "success",
        });
        setopenDynamicGrid(
          openDynamicGrid.filter((item, index) => index !== indexpassed)
        );
        //setOpenGrid(true);
        //setopenDynamicGrid(false);
      } else {
        swal("Component Doesnot Remove");
        setopenDynamicGrid(openDynamicGrid);
        //setopenDynamicGrid(false);
      }
    });
  };

  const getByTitleComponent = (params) => {
    return (
      //<DispalyCardContentGrid propdata={params}></DispalyCardContentGrid>
      <DispalyCardContentGrid propdata={params}></DispalyCardContentGrid>
    );
  };
  // const handleChangeOptionLayout = (param) => {
  //   console.log(param);

  // };
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const handlefullScreen = (e, param) => {
    //setopenDialog(true)
    setOpenModal(true);

    console.log(param);
    // return (
    //   <Dialog
    //     open={openModal}
    //     onClose={handleCloseModal}
    //     TransitionComponent={Transition}
    //   >
    //     <AppBar className={classes.appBarModal}>
    //       <Toolbar>
    //         <IconButton
    //           edge="start"
    //           color="inherit"
    //           onClick={handleCloseModal}
    //           aria-label="close"
    //         >
    //           <CloseIcon />
    //         </IconButton>
    //         <Typography variant="h6" className={classes.modaltitle}>
    //           Sound
    //         </Typography>
    //       </Toolbar>
    //     </AppBar>
    //   </Dialog>
    // );
  };
  const displayFullNameGender = () => {
    if (props.patientInfoSubcompoent.person.gender === "M") {
      return "Male";
    }
    if (props.patientInfoSubcompoent.person.gender === "F") {
      return "Female";
    }
    return "Others";
  };
  return (
    <>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container spacing={3} direction="row">
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="body2">
                    <strong>Identifier: </strong>
                    {props.patientInfoSubcompoent.identifiers[0].identifier}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>D.O.B :</strong> 10-02-1991
                  </Typography>
                </Grid>
                <Grid item></Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="body2">
                    <strong>Name : </strong>{" "}
                    {props.patientInfoSubcompoent.person.display.toUpperCase()}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Attending Doctor :</strong> Dr. XYZ
                  </Typography>
                </Grid>
                <Grid item></Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="body2">
                    <strong>Gender : </strong> {displayFullNameGender()}
                    {/* {props.patientInfoSubcompoent.person.gender} */}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Patient Category :</strong> General
                  </Typography>
                </Grid>
                <Grid item></Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="body2">
                    <strong>Location : </strong>
                    {props.selectedVisit.location}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Alert :</strong> XYZ
                  </Typography>
                </Grid>
                <Grid item></Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Autocomplete
                id="Select Patient"
                options={top100Films}
                getOptionLabel={(option) => option.title}
                style={{ width: 300 }}
                size="small"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Filter"
                    variant="outlined"
                  />
                )}
              />
            </Grid>
          </Grid>
        </Paper>
      </div>
      <Grid container style={{ marginTop: 4 }} spacing={2}>
        {/* <Grid item sm={9}></Grid>
        <Grid item sm={3}>
          <Autocomplete
            id="Select Your Layout"
            options={LayoutOptions}
            getOptionLabel={(option) => option.title}
            style={{ width: 300 }}
            size="small"
            onChange={(e, newValue) => {
              handleChangeOptionLayout(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Your Layout"
                variant="outlined"
              />
            )}
          />
        </Grid> */}
        <Grid item sm={2}>
          <SimpleList
            passfunc={setopenDynamicGrid}
            griddata={openDynamicGrid}
          ></SimpleList>
        </Grid>
        <Grid item sm={10}>
          <Grid container spacing={1} id="containerdiv">
            {openDynamicGrid !== null &&
              openDynamicGrid.map((item, index) => (
                // <Draggable scale={1}>
                <Grid item sm={6} id="">
                  <Card>
                    <CardHeader
                      title={item}
                      className={classes.title}
                      style={{ padding: 5 }}
                      titleTypographyProps={{ variant: "body1" }}
                      action={
                        <>
                          {/* <IconButton
                            color="inherit"
                          
                            aria-label="ddd"
                          >
                            <VisibilityIcon />
                          </IconButton> */}
                          <IconButton
                            color="inherit"
                            onClick={(e) => {
                              handleCloseGrid(e, index);
                            }}
                            aria-label="close"
                          >
                            <CloseIcon />
                          </IconButton>
                        </>
                      }
                    />

                    <CardContent style={{ padding: 3 }}>
                      {getByTitleComponent(item)}
                    </CardContent>
                    {/* <Button
                      size="small"
                      color="secondary"
                      variant="contained"
                      id={`btnfullscrren${item}`}
                      onClick={(e) => {
                        handlefullScreen(e, item);
                      }}
                    >
                      View in Full Screen
                    </Button> */}
                  </Card>
                </Grid>
                // </Draggable>
              ))}
          </Grid>
        </Grid>
      </Grid>
      {openModal && (
        <Dialog
          fullScreen
          open={openModal}
          onClose={handleCloseModal}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBarModal}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleCloseModal}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.modaltitle}>
                Sound
              </Typography>
            </Toolbar>
          </AppBar>
          {getByTitleComponent()}
        </Dialog>
      )}
    </>
  );
}

export default PatientInfosubComponent;
