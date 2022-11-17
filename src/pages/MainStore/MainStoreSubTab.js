import {Box,Typography,AppBar,Tabs,Tab,makeStyles,} from "@material-ui/core";
  import React, { useState } from "react";
  import PropTypes from "prop-types";
  import styles from "../Styles";
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
  
  export default function DrugSubTab() {
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
                value="/app/main_store/ms_view_stock_balance"
                label="View Stock Balance"
                component={Link}
                to="/app/main_store/ms_view_stock_balance"/>
                <Tab
                  value="/app/main_store/view_stock_balance_expiry"
                  label="View Stock Balance Expiry"
                  component={Link}
                  to="/app/main_store/view_stock_balance_expiry"
                />
                <Tab 
                  value="/app/main_store/receipts_to_general_store"
                  label="Receipts to General Store"
                  component={Link}
                  to="/app/main_store/receipts_to_general_store"
                />
                <Tab
                value="/app/main_store/transfer_from_general_store"
                label="Transfer from General Store"
                component={Link}
                to="/app/main_store/transfer_from_general_store" />
                
              </Tabs>
            </AppBar>
          )}
        />
      </div>
    );
  }
  