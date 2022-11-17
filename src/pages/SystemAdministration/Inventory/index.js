import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { Link } from "react-router-dom";
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { inventoryRoutes } from "../../../routes/inventoryroutes";
import { useSelector, useDispatch } from 'react-redux'
import {InventoryService} from "../../../services/data/inventoryService"
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: 10,
  },
  
  title: {
    backgroundColor: "#3EABC1",
    color: "#FFFFFF",
  },
}));
function Inventory() {
    const classes = useStyles();
    const dispatch = useDispatch();
  
    
    return (
      <Card className={classes.root}>
        <CardHeader        
          title="Store Management"
          className={classes.title}
        />
        <CardContent>
        
        {inventoryRoutes.map((prop, key) => {
          return (
            <Typography key={key}> 
                <Button                    
                    component={Link}
                    to={prop.layout + prop.path}                 
                  >
                    {prop.title}
                  </Button>
             </Typography>
          )
        })
          }</CardContent>
      </Card>
    );
}

export default Inventory
