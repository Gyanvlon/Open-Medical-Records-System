import React, { useState, useEffect, useRef } from "react";
import {makeStyles,Box,Button} from "@material-ui/core/";
import styles from "../Styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Card from "@material-ui/core/Card";
import { useHistory, Link } from "react-router-dom";
import Icon from '@mui/material/Icon';
import { useReactToPrint } from "react-to-print";
const useStyles = makeStyles(styles);
export default function MSViewStockBalanceDetail() {
  const classes = useStyles(); 
  const history = useHistory();
  const ref = useRef()
  const handlePrint = useReactToPrint({
    content: () => ref.current,
  });
    return (
      <>
        <Icon baseClassName="fas" className="fa-arrow-left" onClick={history.goBack}  />
         <div mt={2}>
         <Box align="right">
           <Button variant="contained" color="primary" size="small" className={classes.customBTN} style={{marginTop:15}} align="right"  onClick={handlePrint}>
            Print
        </Button>
        </Box> 
        <Card >
        <form id="formpatientdata" method="post" ref={ref}>
         <Box style={{ fontWeight: 'bold', textTransform: 'uppercase', marginLeft:15, marginTop:15}} >Detail of Stock Balance of one Drug/Item</Box>
          <Table aria-label="spanning table">
            <TableHead>
              <TableRow>
              <TableCell className={classes.cellStyles}>#</TableCell>
              <TableCell className={classes.cellStyles}>Name</TableCell>
              <TableCell className={classes.cellStyles}>Formulation</TableCell>
              <TableCell className={classes.cellStyles}>Transaction</TableCell>
              <TableCell className={classes.cellStyles}>To Store</TableCell>
              <TableCell className={classes.cellStyles }>Opening Balance</TableCell>
              <TableCell className={classes.cellStyles}>Receipt Qty</TableCell>
              <TableCell className={classes.cellStyles}>Stock Transfer/Issue</TableCell>
              <TableCell className={classes.cellStyles}>Closing Balance</TableCell>
              <TableCell className={classes.cellStyles}>Rate</TableCell>
              <TableCell className={classes.cellStyles}>Unit Price</TableCell>
              <TableCell className={classes.cellStyles}>Vat(%)</TableCell>
              <TableCell className={classes.cellStyles}>MRP</TableCell>
              <TableCell className={classes.cellStyles}>Batch No</TableCell>
              <TableCell className={classes.cellStyles}>CD(%)</TableCell>
              <TableCell className={classes.cellStyles}>CD Amt</TableCell>
              <TableCell className={classes.cellStyles}>CGST(%)</TableCell>
              <TableCell className={classes.cellStyles}>CGST Amt</TableCell>
              <TableCell className={classes.cellStyles}>SGST(%)</TableCell>
              <TableCell className={classes.cellStyles}>SGST Amt</TableCell>
              <TableCell className={classes.cellStyles}>Date of Expiry</TableCell>
              <TableCell className={classes.cellStyles}>Receipt/Issue Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
              <TableCell className={classes.cellStyles}>1</TableCell>
              <TableCell className={classes.cellStyles}>test</TableCell>
              <TableCell className={classes.cellStyles}>Formulation 1</TableCell>
              <TableCell className={classes.cellStyles}>12</TableCell>
              <TableCell className={classes.cellStyles} component={Link} to="/app/main_store/to_store_detail">Pharmacy</TableCell>
              <TableCell className={classes.cellStyles}>12</TableCell>
              <TableCell className={classes.cellStyles}>12</TableCell>
              <TableCell className={classes.cellStyles}>12</TableCell>
              <TableCell className={classes.cellStyles}>12</TableCell>
              <TableCell className={classes.cellStyles}>12</TableCell>
              <TableCell className={classes.cellStyles}>12</TableCell>
              <TableCell className={classes.cellStyles}>12</TableCell>
              <TableCell className={classes.cellStyles}>12</TableCell>
              <TableCell className={classes.cellStyles}>12</TableCell>
              <TableCell className={classes.cellStyles}>12</TableCell>
              <TableCell className={classes.cellStyles}>12</TableCell>
              <TableCell className={classes.cellStyles}>12</TableCell>
              <TableCell className={classes.cellStyles}>12</TableCell>
              <TableCell className={classes.cellStyles}>12</TableCell>
              <TableCell className={classes.cellStyles}>12</TableCell>
              <TableCell className={classes.cellStyles}>20/10/2022</TableCell>
              <TableCell className={classes.cellStyles}>20/10/2022</TableCell>
              </TableRow>
              <TableRow>
              <TableCell className={classes.cellStyles}>1</TableCell>
              <TableCell className={classes.cellStyles}>test</TableCell>
              <TableCell className={classes.cellStyles}>Formulation 2</TableCell>
              <TableCell className={classes.cellStyles}>12</TableCell>
              <TableCell className={classes.cellStyles}>12</TableCell>
              <TableCell className={classes.cellStyles}>12</TableCell>
              <TableCell className={classes.cellStyles}>12</TableCell>
              <TableCell className={classes.cellStyles}>12</TableCell>
              <TableCell className={classes.cellStyles}>12</TableCell>
              <TableCell className={classes.cellStyles}>12</TableCell>
              <TableCell className={classes.cellStyles}>12</TableCell>
              <TableCell className={classes.cellStyles}>12</TableCell>
              <TableCell className={classes.cellStyles}>12</TableCell>
              <TableCell className={classes.cellStyles}>12</TableCell>
              <TableCell className={classes.cellStyles}>12</TableCell>
              <TableCell className={classes.cellStyles}>12</TableCell>
              <TableCell className={classes.cellStyles}>12</TableCell>
              <TableCell className={classes.cellStyles}>12</TableCell>
              <TableCell className={classes.cellStyles}>12</TableCell>
              <TableCell className={classes.cellStyles}>12</TableCell>
              <TableCell className={classes.cellStyles}>20/10/2022</TableCell>
              <TableCell className={classes.cellStyles}>20/10/2022</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </form>
       </Card>
      </div>    
      </>
    );
}
