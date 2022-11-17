import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
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
export default function InventoryNavbar() {
    const classes = useStyles();

    return (
            <>
        <Route
          path="/"
          render={(history) => (
            <AppBar position='relative' style={{background:"#3EABC1"}}>
              <Tabs
                value={
                  history.location.pathname !== "/"
                    ? history.location.pathname
                    : false
                }
                variant="scrollable"
              >
                <Tab
                  value="/app/system-administration/manage_store"
                  label="Manage Store"
                  component={Link}
                  to="/app/system-administration/manage_store"
                  className={classes.hyperlinkcolor}
                />
                <Tab
                  value="/app/system-administration/manage_item"
                  label="Manage Item"
                  component={Link}
                  to="/app/system-administration/manage_item"
                  className={classes.hyperlinkcolor}
                />
                <Tab
                  value="/app/system-administration/manage_drug"
                  label="Manage Drug"
                  component={Link}
                  to="/app/system-administration/manage_drug"
                  className={classes.hyperlinkcolor}
                />
              </Tabs>
            </AppBar>
          )}
        />
        </>
       
    )
}
