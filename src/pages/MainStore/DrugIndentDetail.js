import React, {useRef} from 'react'
import {makeStyles} from "@material-ui/core/";
import styles from "../Styles";
import { useHistory } from 'react-router-dom';
import {Box,Paper,Button} from "@material-ui/core/";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Icon from '@mui/material/Icon';
import { useReactToPrint } from "react-to-print";
const useStyles = makeStyles(styles);
function DrugIndentDetail() {
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
        <Button variant="contained" color="primary" size="small" className={classes.customBTN} style={{marginTop:15}} onClick={handlePrint}  >
            Print
        </Button>
        </Box>
        <Paper className="container" ref={ref}>
        <Box style={{ fontWeight: 'bold', textTransform: 'uppercase', marginLeft:15, paddingTop:10}} >Drug Indent Detail</Box>
          <Table aria-label="spanning table" style={{marginTop:10}}>
            <TableHead>
              <TableRow>
                <TableCell >#</TableCell>
                <TableCell >Name</TableCell>
                <TableCell >Formulation</TableCell>
                <TableCell >Indent Quantity</TableCell>
                <TableCell >Batch No</TableCell>
                <TableCell >MRP</TableCell>
                <TableCell >Date Of Expiry</TableCell>
                <TableCell >Company Name</TableCell>
                <TableCell >Transfer Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell >1</TableCell>
                <TableCell >test</TableCell>
                <TableCell >123</TableCell>
                <TableCell >20</TableCell>
                <TableCell >20</TableCell>
                <TableCell >20</TableCell>
                <TableCell >20/08/2022</TableCell>
                <TableCell >20</TableCell>
                <TableCell >20</TableCell>
              </TableRow>
              <TableRow>
                <TableCell >2</TableCell>
                <TableCell >test</TableCell>
                <TableCell >123</TableCell>
                <TableCell >20</TableCell>
                <TableCell >20</TableCell>
                <TableCell >20</TableCell>
                <TableCell >20/08/2022</TableCell>
                <TableCell >20</TableCell>
                <TableCell >20</TableCell>
              </TableRow>
            </TableBody>
          </Table>
      </Paper>
    </div>
   )
}
export default DrugIndentDetail