  import {Box,Typography,AppBar,Tabs,Tab,makeStyles,} from "@material-ui/core";
  import React from "react";
  import PropTypes from "prop-types";
  import styles from "../../../Styles";
  import { Link, Route } from "react-router-dom";
  const useStyles = makeStyles(styles);
  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  export default function ItemSubTab() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    return (
      <div className={classes.root}>
        <Route
          path="/"
          render={(history) => (
            <AppBar position="relative">
              <Tabs
                value={
                  history.location.pathname !== "/"
                    ? history.location.pathname
                    : false
                }
                variant="scrollable"
                className={classes.tabs}
              >
                {console.log(history.location.pathname)}
                <Tab 
                value="/app/system-administration/manage_item"
                label="Manage Item"
                component={Link}
                to="/app/system-administration/manage_item" />
                <Tab
                  value="/app/system-administration/manage_category"
                  label="Manage Category"
                  component={Link}
                  to="/app/system-administration/manage_category"
                />
                <Tab 
                  value="/app/system-administration/manage_unit"
                  label="Manage Unit"
                  component={Link}
                  to="/app/system-administration/manage_unit"
                />
                <Tab
                value="/app/system-administration/manage_sub_category"
                label="Manage Sub Category"
                component={Link}
                to="/app/system-administration/manage_sub_category" />
                <Tab  
                value="/app/system-administration/manage_specification"
                label="Manage Specification"
                component={Link}
                to="/app/system-administration/manage_specification"/>
              </Tabs>
            </AppBar>
          )}
        />
      </div>
    );
  }
  