import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import BillingTabHomeComponent from '../BillingTabHomeComponent';
// import OpdQue from '../OpdQue';
import {Link,Route} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,

    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    hyperlinkcolor: {
      '&:hover': {
         color: "#fff",
      },
    },
  }));
export default function PharmacyNavbar() {
    const classes = useStyles();

    return (
            <>
        <Route
          path="/"
          render={(history) => (
            <AppBar position='relative'>
              <Tabs
                value={
                  history.location.pathname !== "/"
                    ? history.location.pathname
                    : false
                }
                variant="scrollable"
              >
                <Tab
                  value="/app/pharmacy/home"
                  label="Home"
                  component={Link}
                  to="/app/pharmacy/home"
                  className={classes.hyperlinkcolor}
                />
                <Tab
                  value="/app/pharmacy/patient_queue"
                  label="Patient Queue"
                  component={Link}
                  to="/app/pharmacy/patient_queue"
                  className={classes.hyperlinkcolor}
                />
                <Tab
                  value="/app/pharmacy/issue_drug_to_patient"
                  label="Issue drug to Patient"
                  component={Link}
                  to="/app/pharmacy/issue_drug_to_patient"
                  className={classes.hyperlinkcolor}
                />
                 <Tab
                  value="/app/pharmacy/issue_drug_to_account_return"
                  label="Issue drug to Account/Return"
                  component={Link}
                  to="/app/pharmacy/issue_drug_to_account_return"
                  className={classes.hyperlinkcolor}
                />
                 <Tab
                  value="/app/pharmacy/indent_drugs"
                  label="Indent drugs"
                  component={Link}
                  to="/app/pharmacy/indent_drugs"
                  className={classes.hyperlinkcolor}
                />
                 <Tab
                  value="/app/pharmacy/view_stock_balance"
                  label="View Stock Balance"
                  component={Link}
                  to="/app/pharmacy/view_stock_balance"
                  className={classes.hyperlinkcolor}
                />
                 <Tab
                  value="/app/pharmacy/view_stock_balance_expiry"
                  label="View Stock Balance Expiry"
                  component={Link}
                  to="/app/pharmacy/view_stock_balance_expiry"
                  className={classes.hyperlinkcolor}
                />
                 <Tab
                  value="/app/pharmacy/void_bill"
                  label="Void Bill"
                  component={Link}
                  to="/app/pharmacy/void_bill"
                  className={classes.hyperlinkcolor}
                />
              </Tabs>
            </AppBar>
          )}
        />
        </>
    )
}
