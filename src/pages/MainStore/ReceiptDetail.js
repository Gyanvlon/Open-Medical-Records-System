import React, {useRef} from 'react'
import {makeStyles} from "@material-ui/core/";
import styles from "../Styles";
import { useReactToPrint } from "react-to-print";
import { useHistory } from 'react-router-dom';
import {Box,Paper,Button} from "@material-ui/core/";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Icon from '@mui/material/Icon';
const useStyles = makeStyles(styles);
function ReceiptDetail() {
  const classes = useStyles()
  const history = useHistory()
  const ref = useRef()
  const handlePrint = useReactToPrint({
    content: () => ref.current,
  });
 return (
    <div>
        <Icon baseClassName="fas" className="fa-arrow-left" onClick={history.goBack}  />
        <Box align="right">
        <Button variant="contained" color="primary" size="small" className={classes.customBTN} style={{marginTop:15}} onClick={handlePrint} >
            Print Slip
        </Button>
        </Box>
        <Paper className="container" ref={ref}>
        <Box style={{ fontWeight: 'bold', textTransform: 'uppercase', marginLeft:15, paddingTop:10}} >Receipt Slip</Box>
          <Table aria-label="spanning table" style={{marginTop:10}}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.cellStyle}>#</TableCell>
                <TableCell className={classes.cellStyle}>Brand Name</TableCell>
                <TableCell className={classes.cellStyle}>Formulation</TableCell>
                <TableCell className={classes.cellStyle}>Reciept Qty</TableCell>
                <TableCell className={classes.cellStyle}>Rate</TableCell>
                <TableCell className={classes.cellStyle}>Unit Price</TableCell>
                <TableCell className={classes.cellStyle}>Vat (%)</TableCell>
                <TableCell className={classes.cellStyle}>MRP</TableCell>
                <TableCell className={classes.cellStyle}>Batch No</TableCell>
                <TableCell className={classes.cellStyle}>CD (%)</TableCell>
                <TableCell className={classes.cellStyle}>CD Amount</TableCell>
                <TableCell className={classes.cellStyle}>CGST (%)</TableCell>
                <TableCell className={classes.cellStyle}>CGST Amount</TableCell>
                <TableCell className={classes.cellStyle}>SGST (%)</TableCell>
                <TableCell className={classes.cellStyle}>SGST Amount</TableCell>
                <TableCell className={classes.cellStyle}>Date Of Expiry</TableCell>
                <TableCell className={classes.cellStyle}>Total Amount</TableCell>
                <TableCell className={classes.cellStyle}>Amount After GST</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell className={classes.cellStyle}>1</TableCell>
                <TableCell className={classes.cellStyle}>test</TableCell>
                <TableCell className={classes.cellStyle}>123</TableCell>
                <TableCell className={classes.cellStyle}>20</TableCell>
                <TableCell className={classes.cellStyle}>20</TableCell>
                <TableCell className={classes.cellStyle}>20</TableCell>
                <TableCell className={classes.cellStyle}>20</TableCell>
                <TableCell className={classes.cellStyle}>20</TableCell>
                <TableCell className={classes.cellStyle}>20</TableCell>
                <TableCell className={classes.cellStyle}>20</TableCell>
                <TableCell className={classes.cellStyle}>20</TableCell>
                <TableCell className={classes.cellStyle}>20</TableCell>
                <TableCell className={classes.cellStyle}>20</TableCell>
                <TableCell className={classes.cellStyle}>20</TableCell>
                <TableCell className={classes.cellStyle}>20</TableCell>
                <TableCell className={classes.cellStyle}>20/08/2022</TableCell>
                <TableCell className={classes.cellStyle}>20</TableCell>
                <TableCell className={classes.cellStyle}>20</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Box align="right">
             <Box>Total Cash Discount: 00</Box>
             <Box>Total CGST: 00</Box>
             <Box>Total SGST: 00</Box>
             <Box>Total Amount: 00</Box>
             <Box>Total Amount After GST: 00</Box>
        </Box>
      </Paper>
    </div>
   )
}
export default ReceiptDetail