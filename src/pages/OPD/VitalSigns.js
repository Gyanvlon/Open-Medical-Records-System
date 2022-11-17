import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("B.P.", "130 / 120", "156 / 80", "130 / 78", "120 / 110"),
  createData("H.R.", 80, 80, 80, 70),
  createData("B.M.I(Clinical) Kg/m^2", 49.0, 70.0, 44.2, 86.2),
  createData("Weight (Kg)", 60, 50, 90, 80),
  createData("Height / Length(inches)", 60, 60, 60, 60),
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function VitalSigns() {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell style={{ padding: 9 }}>Vitals</StyledTableCell>
            <StyledTableCell align="right" style={{ padding: 9 }}>
              03/03/2022
            </StyledTableCell>
            <StyledTableCell align="right" style={{ padding: 9 }}>
              02/02/2022
            </StyledTableCell>
            <StyledTableCell align="right" style={{ padding: 9 }}>
              12/01/2022
            </StyledTableCell>
            <StyledTableCell align="right" style={{ padding: 9 }}>
              14/01/2021
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell
                component="th"
                scope="row"
                style={{ padding: 6, fontWeight: 800 }}
              >
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right" style={{ padding: 6 }}>
                {row.calories}
              </StyledTableCell>
              <StyledTableCell align="right" style={{ padding: 6 }}>
                {row.fat}
              </StyledTableCell>
              <StyledTableCell align="right" style={{ padding: 6 }}>
                {row.carbs}
              </StyledTableCell>
              <StyledTableCell align="right" style={{ padding: 6 }}>
                {row.protein}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default VitalSigns;
