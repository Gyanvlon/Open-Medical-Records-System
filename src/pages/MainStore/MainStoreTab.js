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
export default function MainStoreTabs() {
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
                  value="/app/main_store/view_stock_balance"
                  label="Drug"
                  component={Link}
                  to="/app/main_store/view_stock_balance"
                  className={classes.hyperlinkcolor}
                />
                <Tab
                  value="/app/main_store/item"
                  label="Item"
                  component={Link}
                  to="/app/main_store/item"
                  className={classes.hyperlinkcolor}
                />
              </Tabs>
            </AppBar>
          )}
        />
        </>
       
    )
}
